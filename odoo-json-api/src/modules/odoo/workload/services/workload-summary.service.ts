import { Injectable } from '@nestjs/common';
import {
  OdooJson2Service,
  OdooSearchReadParams,
} from '../../common/services/odoo-json-2.service';
import { ListWorkloadSummaryDto, listWorkloadSummarySchema } from '../dtos/list-workload-summary.dto';

@Injectable()
export class WorkloadSummaryService {
  constructor(private readonly odooJson2Service: OdooJson2Service) {}

  async execute(query: ListWorkloadSummaryDto) {
    const parsedQuery = listWorkloadSummarySchema.parse(query);
    const { dateFrom, dateTo, projectId } = parsedQuery;

    // 1. Fetch all active employees (including user_id)
    const employeeDomain: [string, string, unknown][] = [['active', '=', true]];
    const employees = await this.odooJson2Service.searchRead('hr.employee', {
      fields: ['id', 'name', 'work_email', 'user_id'],
      domain: employeeDomain,
    });

    // 2. Fetch planning slots for the period
    const slotDomain: [string, string, unknown][] = [
      ['start_datetime', '>=', `${dateFrom} 00:00:00`],
      ['end_datetime', '<=', `${dateTo} 23:59:59`],
    ];
    if (projectId) {
      slotDomain.push(['project_id', '=', projectId]);
    }

    const slots = await this.odooJson2Service.searchRead('planning.slot', {
      fields: [
        'id',
        'name',
        'employee_id',
        'start_datetime',
        'end_datetime',
        'allocated_percentage',
      ],
      domain: slotDomain,
    });

    // 3. Fetch tasks with deadlines in the period
    const taskDomain: [string, string, unknown][] = [
      ['date_deadline', '>=', dateFrom],
      ['date_deadline', '<=', dateTo],
      ['user_ids', '!=', false],
    ];
    if (projectId) {
      taskDomain.push(['project_id', '=', projectId]);
    }

    const tasks = await this.odooJson2Service.searchRead('project.task', {
      fields: [
        'id',
        'name',
        'user_ids',
        'allocated_hours',
        'effective_hours',
        'date_deadline',
      ],
      domain: taskDomain,
    });

    // 4. Aggregate data
    const workloadMap = new Map<number, any>();
    const userToEmployeeMap = new Map<number, number>();

    // Initialize with all employees
    employees.forEach((emp: any) => {
      workloadMap.set(emp.id, {
        employeeId: emp.id,
        employeeName: emp.name,
        employeeEmail: emp.work_email,
        totalAllocatedHours: 0,
        workload: [], // Combination of slots and tasks
      });

      const userId = Array.isArray(emp.user_id) ? emp.user_id[0] : emp.user_id;
      if (userId) {
        userToEmployeeMap.set(userId, emp.id);
      }
    });

    // Add slots to aggregation
    slots.forEach((slot: any) => {
      const empId = Array.isArray(slot.employee_id) ? slot.employee_id[0] : slot.employee_id;
      if (empId && workloadMap.has(empId)) {
        const workload = workloadMap.get(empId);
        
        const start = new Date(slot.start_datetime);
        const end = new Date(slot.end_datetime);
        const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        const allocatedHours = (durationHours * (slot.allocated_percentage || 100)) / 100;

        workload.totalAllocatedHours += Number(allocatedHours.toFixed(2));
        workload.workload.push({
          type: 'planning_slot',
          id: slot.id,
          name: slot.name || 'Slot de Planejamento',
          start: slot.start_datetime,
          end: slot.end_datetime,
          hours: Number(allocatedHours.toFixed(2)),
          percentage: slot.allocated_percentage,
        });
      }
    });

    // Add tasks to aggregation
    tasks.forEach((task: any) => {
      const userIds = Array.isArray(task.user_ids) ? task.user_ids : [];
      userIds.forEach((userId: number) => {
        const empId = userToEmployeeMap.get(userId);
        if (empId && workloadMap.has(empId)) {
          const workload = workloadMap.get(empId);
          
          // If task has multiple users, divide the allocated hours
          const hoursPerUser = (task.allocated_hours || 0) / userIds.length;
          
          workload.totalAllocatedHours += Number(hoursPerUser.toFixed(2));
          workload.workload.push({
            type: 'task',
            id: task.id,
            name: task.name,
            deadline: task.date_deadline,
            plannedHours: Number(hoursPerUser.toFixed(2)),
            effectiveHours: Number((task.effective_hours / userIds.length).toFixed(2)),
          });
        }
      });
    });

    return {
      period: { from: dateFrom, to: dateTo },
      data: Array.from(workloadMap.values())
        .filter((emp: any) => emp.totalAllocatedHours > 0 || emp.workload.length > 0)
        .sort((a, b) => b.totalAllocatedHours - a.totalAllocatedHours),
    };
  }
}

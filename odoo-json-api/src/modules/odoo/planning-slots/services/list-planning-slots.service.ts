import { Injectable } from '@nestjs/common';
import {
  OdooJson2Service,
  OdooSearchReadParams,
} from '../../common/services/odoo-json-2.service';
import {
  ListPlanningSlotsDto,
  listPlanningSlotsSchema,
} from '../dtos/list-planning-slots.dto';

@Injectable()
export class ListPlanningSlotsService {
  constructor(private readonly odooJson2Service: OdooJson2Service) {}

  async execute(query: ListPlanningSlotsDto) {
    const parsedQuery = listPlanningSlotsSchema.parse(query);
    const domain: [string, string, unknown][] = [];

    if (parsedQuery.projectId) {
      domain.push(['project_id', '=', parsedQuery.projectId]);
    }

    if (parsedQuery.taskId) {
      domain.push(['task_id', '=', parsedQuery.taskId]);
    }

    if (parsedQuery.employeeId) {
      domain.push(['employee_id', '=', parsedQuery.employeeId]);
    }

    if (parsedQuery.resourceId) {
      domain.push(['resource_id', '=', parsedQuery.resourceId]);
    }

    if (parsedQuery.dateFrom) {
      domain.push(['start_datetime', '>=', `${parsedQuery.dateFrom} 00:00:00`]);
    }

    if (parsedQuery.dateTo) {
      domain.push(['end_datetime', '<=', `${parsedQuery.dateTo} 23:59:59`]);
    }

    const odooSearchParams: OdooSearchReadParams = {
      fields: [
        'id',
        'name',
        'employee_id',
        'resource_id',
        'start_datetime',
        'end_datetime',
        'task_id',
        'allocated_percentage',
      ],
      domain,
      limit: parsedQuery.limit,
      offset: parsedQuery.offset,
      order: parsedQuery.order ?? 'start_datetime asc',
    };

    const data = await this.odooJson2Service.searchRead(
      'planning.slot',
      odooSearchParams,
    );

    return {
      data,
    };
  }
}

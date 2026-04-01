import { Injectable } from '@nestjs/common';
import {
  OdooJson2Service,
  OdooSearchReadParams,
} from '../../common/services/odoo-json-2.service';
import {
  ListTimesheetsDto,
  listTimesheetsSchema,
} from '../dtos/list-timesheets.dto';

@Injectable()
export class ListTimesheetsService {
  constructor(private readonly odooJson2Service: OdooJson2Service) {}

  async execute(query: ListTimesheetsDto) {
    const parsedQuery = listTimesheetsSchema.parse(query);
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

    if (parsedQuery.userId) {
      domain.push(['user_id', '=', parsedQuery.userId]);
    }

    if (parsedQuery.dateFrom) {
      domain.push(['date', '>=', parsedQuery.dateFrom]);
    }

    if (parsedQuery.dateTo) {
      domain.push(['date', '<=', parsedQuery.dateTo]);
    }

    const odooSearchParams: OdooSearchReadParams = {
      fields: ['id', 'name', 'date', 'unit_amount', 'employee_id', 'user_id', 'task_id', 'project_id', 'description'],
      domain,
      limit: parsedQuery.limit || 50,
      offset: parsedQuery.offset,
      order: parsedQuery.order ?? 'date desc',
    };

    const data = await this.odooJson2Service.searchRead(
      'account.analytic.line',
      odooSearchParams,
    );

    return {
      data,
    };
  }
}

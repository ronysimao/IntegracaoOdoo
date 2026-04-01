import { Injectable } from '@nestjs/common';
import {
  OdooJson2Service,
  OdooSearchReadParams,
} from '../../common/services/odoo-json-2.service';
import { ListTasksDto, listTasksSchema } from '../dtos/list-tasks.dto';

@Injectable()
export class ListTasksService {
  constructor(private readonly odooJson2Service: OdooJson2Service) {}

  async execute(query: ListTasksDto) {
    const parsedQuery = listTasksSchema.parse(query);
    const domain: [string, string, unknown][] = [];

    if (parsedQuery.projectId) {
      domain.push(['project_id', '=', parsedQuery.projectId]);
    }

    if (parsedQuery.stageId) {
      domain.push(['stage_id', '=', parsedQuery.stageId]);
    }

    if (parsedQuery.userId) {
      domain.push(['user_ids', 'in', [parsedQuery.userId]]);
    }

    if (parsedQuery.search) {
      domain.push(['name', 'ilike', parsedQuery.search]);
    }

    if (parsedQuery.dateFrom) {
      domain.push(['date_deadline', '>=', parsedQuery.dateFrom]);
    }

    if (parsedQuery.dateTo) {
      domain.push(['date_deadline', '<=', parsedQuery.dateTo]);
    }

    const odooSearchParams: OdooSearchReadParams = {
      fields: [
        'id',
        'name',
        'project_id',
        'user_ids',
        'stage_id',
        'date_deadline',
        'allocated_hours',
        'effective_hours',
      ],
      domain,
      limit: parsedQuery.limit,
      offset: parsedQuery.offset,
      order: parsedQuery.order ?? 'id desc',
    };

    const data = await this.odooJson2Service.searchRead(
      'project.task',
      odooSearchParams,
    );

    return {
      data,
    };
  }
}

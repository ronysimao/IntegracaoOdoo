import { Injectable } from '@nestjs/common';
import {
  OdooJson2Service,
  OdooSearchReadParams,
} from '../../common/services/odoo-json-2.service';
import {
  ListTaskStagesDto,
  listTaskStagesSchema,
} from '../dtos/list-task-stages.dto';

@Injectable()
export class ListTaskStagesService {
  constructor(private readonly odooJson2Service: OdooJson2Service) {}

  async execute(query: ListTaskStagesDto) {
    const parsedQuery = listTaskStagesSchema.parse(query);
    const domain: [string, string, unknown][] = [];

    if (parsedQuery.projectId) {
      domain.push(['project_ids', 'in', [parsedQuery.projectId]]);
    }

    if (parsedQuery.search) {
      domain.push(['name', 'ilike', parsedQuery.search]);
    }

    const odooSearchParams: OdooSearchReadParams = {
      fields: ['id', 'name'],
      domain,
      limit: parsedQuery.limit,
      offset: parsedQuery.offset,
      order: parsedQuery.order ?? 'sequence asc',
    };

    const data = await this.odooJson2Service.searchRead(
      'project.task.type',
      odooSearchParams,
    );

    return {
      data,
    };
  }
}

import { Injectable } from '@nestjs/common';
import {
  OdooJson2Service,
  OdooSearchReadParams,
} from '../../common/services/odoo-json-2.service';
import { ListProjectsDto, listProjectsSchema } from '../dtos/list-projects.dto';

@Injectable()
export class ListProjectsService {
  constructor(private readonly odooJson2Service: OdooJson2Service) {}

  async execute(query: ListProjectsDto) {
    const parsedQuery = listProjectsSchema.parse(query);
    const domain: [string, string, unknown][] = [];

    if (parsedQuery.search) {
      domain.push(['name', 'ilike', parsedQuery.search]);
    }

    const odooSearchParams: OdooSearchReadParams = {
      fields: ['id', 'name'],
      domain,
      limit: parsedQuery.limit,
      offset: parsedQuery.offset,
      order: parsedQuery.order ?? 'id desc',
    };

    const data = await this.odooJson2Service.searchRead(
      'project.project',
      odooSearchParams,
    );

    return { data };
  }
}

import { Injectable } from '@nestjs/common';
import {
  OdooJson2Service,
  OdooSearchReadParams,
} from '../../common/services/odoo-json-2.service';
import {
  ListEmployeesDto,
  listEmployeesSchema,
} from '../dtos/list-employees.dto';

@Injectable()
export class ListEmployeesService {
  constructor(private readonly odooJson2Service: OdooJson2Service) {}

  async execute(query: ListEmployeesDto) {
    const parsedQuery = listEmployeesSchema.parse(query);
    const domain: [string, string, unknown][] = [];

    if (parsedQuery.search) {
      domain.push(['name', 'ilike', parsedQuery.search]);
    }

    const odooSearchParams: OdooSearchReadParams = {
      fields: ['id', 'name', 'email'],
      domain,
      limit: parsedQuery.limit,
      offset: parsedQuery.offset,
      order: parsedQuery.order ?? 'name asc',
    };

    const data = await this.odooJson2Service.searchRead(
      'hr.employee',
      odooSearchParams,
    );

    return {
      data,
    };
  }
}

import { Injectable } from '@nestjs/common';
import {
  OdooJson2Service,
  OdooSearchReadParams,
} from '../../common/services/odoo-json-2.service';
import {
  ListModelFieldsDto,
  OdooModelParamDto,
  listModelFieldsSchema,
  odooModelParamSchema,
} from '../dtos/list-model-fields.dto';

@Injectable()
export class ListModelFieldsService {
  constructor(private readonly odooJson2Service: OdooJson2Service) {}

  async execute(params: OdooModelParamDto, query: ListModelFieldsDto) {
    const parsedParams = odooModelParamSchema.parse(params);
    const parsedQuery = listModelFieldsSchema.parse(query);
    const domain: [string, string, unknown][] = [
      ['model', '=', parsedParams.model],
    ];

    if (parsedQuery.search) {
      domain.push(['name', 'ilike', parsedQuery.search]);
    }

    const odooSearchParams: OdooSearchReadParams = {
      domain,
      fields: [
        'name',
        'field_description',
        'ttype',
        'relation',
        'required',
        'readonly',
        'store',
      ],
      limit: parsedQuery.limit,
      offset: parsedQuery.offset,
      order: parsedQuery.order ?? 'name asc',
    };

    const data = await this.odooJson2Service.searchRead(
      'ir.model.fields',
      odooSearchParams,
    );

    return { data };
  }
}

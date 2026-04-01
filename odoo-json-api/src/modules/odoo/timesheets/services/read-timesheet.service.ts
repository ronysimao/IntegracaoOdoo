import { Injectable, NotFoundException } from '@nestjs/common';
import {
  OdooJson2Service,
  OdooSearchReadParams,
} from '../../common/services/odoo-json-2.service';
import {
  ReadTimesheetDto,
  readTimesheetSchema,
} from '../dtos/read-timesheet.dto';

@Injectable()
export class ReadTimesheetService {
  constructor(private readonly odooJson2Service: OdooJson2Service) {}

  async execute(params: ReadTimesheetDto) {
    const parsedParams = readTimesheetSchema.parse(params);

    const odooSearchParams: OdooSearchReadParams = {
      domain: [['id', '=', parsedParams.id]],
      limit: 1,
    };

    const timesheets = await this.odooJson2Service.searchRead(
      'account.analytic.line',
      odooSearchParams,
    );

    const timesheet = timesheets[0];

    if (!timesheet) {
      throw new NotFoundException(
        'O apontamento informado não foi localizado.',
      );
    }

    return timesheet;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import {
  OdooJson2Service,
  OdooSearchReadParams,
} from '../../common/services/odoo-json-2.service';
import { ReadEmployeeDto, readEmployeeSchema } from '../dtos/read-employee.dto';

@Injectable()
export class ReadEmployeeService {
  constructor(private readonly odooJson2Service: OdooJson2Service) {}

  async execute(params: ReadEmployeeDto) {
    const parsedParams = readEmployeeSchema.parse(params);

    const odooSearchParams: OdooSearchReadParams = {
      domain: [['id', '=', parsedParams.id]],
      limit: 1,
    };

    const employees = await this.odooJson2Service.searchRead(
      'hr.employee',
      odooSearchParams,
    );

    const employee = employees[0];

    if (!employee) {
      throw new NotFoundException(
        'O colaborador informado não foi localizado.',
      );
    }

    return employee;
  }
}

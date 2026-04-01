import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { ReadEmployeeDto } from '../dtos/read-employee.dto';
import { ReadEmployeeService } from '../services/read-employee.service';
import { ApiReadEmployeeSwagger } from '../swagger/read-employee.swagger';

@Controller('odoo/employees')
@ApiTags('Employees')
export class ReadEmployeeController {
  constructor(private readonly readEmployeeService: ReadEmployeeService) {}

  @Get(':id')
  @ApiReadEmployeeSwagger()
  async execute(@Param() params: ReadEmployeeDto) {
    return await this.readEmployeeService.execute(params);
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { ListEmployeesDto } from '../dtos/list-employees.dto';
import { ListEmployeesService } from '../services/list-employees.service';
import { ApiListEmployeesSwagger } from '../swagger/list-employees.swagger';

@Controller('odoo/employees')
@ApiTags('Employees')
export class ListEmployeesController {
  constructor(private readonly listEmployeesService: ListEmployeesService) {}

  @Get()
  @ApiListEmployeesSwagger()
  async execute(@Query() queryParams: ListEmployeesDto) {
    return await this.listEmployeesService.execute(queryParams);
  }
}

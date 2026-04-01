import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { ListTasksDto } from '../dtos/list-tasks.dto';
import { ListTasksService } from '../services/list-tasks.service';
import { ApiListTasksSwagger } from '../swagger/list-tasks.swagger';

@Controller('odoo/tasks')
@ApiTags('Tasks')
export class ListTasksController {
  constructor(private readonly listTasksService: ListTasksService) {}

  @Get()
  @ApiListTasksSwagger()
  async execute(@Query() queryParams: ListTasksDto) {
    return await this.listTasksService.execute(queryParams);
  }
}

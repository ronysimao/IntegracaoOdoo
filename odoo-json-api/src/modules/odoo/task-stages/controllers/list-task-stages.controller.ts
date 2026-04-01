import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { ListTaskStagesDto } from '../dtos/list-task-stages.dto';
import { ListTaskStagesService } from '../services/list-task-stages.service';
import { ApiListTaskStagesSwagger } from '../swagger/list-task-stages.swagger';

@Controller('odoo/task-stages')
@ApiTags('Tasks')
export class ListTaskStagesController {
  constructor(private readonly listTaskStagesService: ListTaskStagesService) {}

  @Get()
  @ApiListTaskStagesSwagger()
  async execute(@Query() queryParams: ListTaskStagesDto) {
    return await this.listTaskStagesService.execute(queryParams);
  }
}

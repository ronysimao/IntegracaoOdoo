import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { ReadTaskDto } from '../dtos/read-task.dto';
import { ReadTaskService } from '../services/read-task.service';
import { ApiReadTaskSwagger } from '../swagger/read-task.swagger';

@Controller('odoo/tasks')
@ApiTags('Tasks')
export class ReadTaskController {
  constructor(private readonly readTaskService: ReadTaskService) {}

  @Get(':id')
  @ApiReadTaskSwagger()
  async execute(@Param() params: ReadTaskDto) {
    return await this.readTaskService.execute(params);
  }
}

import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { ReadTaskStageDto } from '../dtos/read-task-stage.dto';
import { ReadTaskStageService } from '../services/read-task-stage.service';
import { ApiReadTaskStageSwagger } from '../swagger/read-task-stage.swagger';

@Controller('odoo/task-stages')
@ApiTags('Tasks')
export class ReadTaskStageController {
  constructor(private readonly readTaskStageService: ReadTaskStageService) {}

  @Get(':id')
  @ApiReadTaskStageSwagger()
  async execute(@Param() params: ReadTaskStageDto) {
    return await this.readTaskStageService.execute(params);
  }
}

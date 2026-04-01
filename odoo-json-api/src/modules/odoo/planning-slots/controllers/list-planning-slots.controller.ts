import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { ListPlanningSlotsDto } from '../dtos/list-planning-slots.dto';
import { ListPlanningSlotsService } from '../services/list-planning-slots.service';
import { ApiListPlanningSlotsSwagger } from '../swagger/list-planning-slots.swagger';

@Controller('odoo/planning-slots')
@ApiTags('Planning')
export class ListPlanningSlotsController {
  constructor(
    private readonly listPlanningSlotsService: ListPlanningSlotsService,
  ) {}

  @Get()
  @ApiListPlanningSlotsSwagger()
  async execute(@Query() queryParams: ListPlanningSlotsDto) {
    return await this.listPlanningSlotsService.execute(queryParams);
  }
}

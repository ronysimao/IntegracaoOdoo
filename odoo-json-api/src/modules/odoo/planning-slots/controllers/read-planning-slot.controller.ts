import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { ReadPlanningSlotDto } from '../dtos/read-planning-slot.dto';
import { ReadPlanningSlotService } from '../services/read-planning-slot.service';
import { ApiReadPlanningSlotSwagger } from '../swagger/read-planning-slot.swagger';

@Controller('odoo/planning-slots')
@ApiTags('Planning')
export class ReadPlanningSlotController {
  constructor(
    private readonly readPlanningSlotService: ReadPlanningSlotService,
  ) {}

  @Get(':id')
  @ApiReadPlanningSlotSwagger()
  async execute(@Param() params: ReadPlanningSlotDto) {
    return await this.readPlanningSlotService.execute(params);
  }
}

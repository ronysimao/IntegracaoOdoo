import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { ListTimesheetsDto } from '../dtos/list-timesheets.dto';
import { ListTimesheetsService } from '../services/list-timesheets.service';
import { ApiListTimesheetsSwagger } from '../swagger/list-timesheets.swagger';

@Controller('odoo/timesheets')
@ApiTags('Timesheets')
export class ListTimesheetsController {
  constructor(private readonly listTimesheetsService: ListTimesheetsService) {}

  @Get()
  @ApiListTimesheetsSwagger()
  async execute(@Query() queryParams: ListTimesheetsDto) {
    return await this.listTimesheetsService.execute(queryParams);
  }
}

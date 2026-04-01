import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { ReadTimesheetDto } from '../dtos/read-timesheet.dto';
import { ReadTimesheetService } from '../services/read-timesheet.service';
import { ApiReadTimesheetSwagger } from '../swagger/read-timesheet.swagger';

@Controller('odoo/timesheets')
@ApiTags('Timesheets')
export class ReadTimesheetController {
  constructor(private readonly readTimesheetService: ReadTimesheetService) {}

  @Get(':id')
  @ApiReadTimesheetSwagger()
  async execute(@Param() params: ReadTimesheetDto) {
    return await this.readTimesheetService.execute(params);
  }
}

import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { ListTimesheetsController } from './controllers/list-timesheets.controller';
import { ReadTimesheetController } from './controllers/read-timesheet.controller';
import { ListTimesheetsService } from './services/list-timesheets.service';
import { ReadTimesheetService } from './services/read-timesheet.service';

@Module({
  imports: [CommonModule],
  controllers: [ListTimesheetsController, ReadTimesheetController],
  providers: [ListTimesheetsService, ReadTimesheetService],
})
export class TimesheetsModule {}

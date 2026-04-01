import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EmployeesModule } from './employees/employees.module';
import { MetadataModule } from './metadata/metadata.module';
import { PlanningSlotsModule } from './planning-slots/planning-slots.module';
import { ProjectsModule } from './projects/projects.module';
import { TaskStagesModule } from './task-stages/task-stages.module';
import { TasksModule } from './tasks/tasks.module';
import { TimesheetsModule } from './timesheets/timesheets.module';
import { WorkloadModule } from './workload/workload.module';

@Module({
  imports: [
    AuthModule,
    MetadataModule,
    ProjectsModule,
    TasksModule,
    TaskStagesModule,
    TimesheetsModule,
    EmployeesModule,
    PlanningSlotsModule,
    WorkloadModule,
  ],
})
export class OdooModule {}

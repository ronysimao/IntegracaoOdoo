import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { ListTasksController } from './controllers/list-tasks.controller';
import { ReadTaskController } from './controllers/read-task.controller';
import { ListTasksService } from './services/list-tasks.service';
import { ReadTaskService } from './services/read-task.service';

@Module({
  imports: [CommonModule],
  controllers: [ListTasksController, ReadTaskController],
  providers: [ListTasksService, ReadTaskService],
})
export class TasksModule {}

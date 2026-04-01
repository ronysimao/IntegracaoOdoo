import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { ListTaskStagesController } from './controllers/list-task-stages.controller';
import { ReadTaskStageController } from './controllers/read-task-stage.controller';
import { ListTaskStagesService } from './services/list-task-stages.service';
import { ReadTaskStageService } from './services/read-task-stage.service';

@Module({
  imports: [CommonModule],
  controllers: [ListTaskStagesController, ReadTaskStageController],
  providers: [ListTaskStagesService, ReadTaskStageService],
})
export class TaskStagesModule {}

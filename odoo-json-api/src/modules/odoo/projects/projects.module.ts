import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { ListProjectsController } from './controllers/list-projects.controller';
import { ReadProjectController } from './controllers/read-project.controller';
import { ListProjectsService } from './services/list-projects.service';
import { ReadProjectService } from './services/read-project.service';

@Module({
  imports: [CommonModule],
  controllers: [ListProjectsController, ReadProjectController],
  providers: [ListProjectsService, ReadProjectService],
})
export class ProjectsModule {}

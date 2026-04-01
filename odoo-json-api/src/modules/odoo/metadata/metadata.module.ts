import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { ListModelFieldsController } from './controllers/list-model-fields.controller';
import { ListModelFieldsService } from './services/list-model-fields.service';

@Module({
  imports: [CommonModule],
  controllers: [ListModelFieldsController],
  providers: [ListModelFieldsService],
})
export class MetadataModule {}

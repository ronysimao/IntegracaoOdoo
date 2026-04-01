import { Module } from '@nestjs/common';
import { WorkloadController } from './controllers/workload.controller';
import { WorkloadSummaryService } from './services/workload-summary.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [WorkloadController],
  providers: [WorkloadSummaryService],
  exports: [WorkloadSummaryService],
})
export class WorkloadModule {}

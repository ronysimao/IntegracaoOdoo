import { Controller, Get, Query } from '@nestjs/common';
import { WorkloadSummaryService } from '../services/workload-summary.service';
import type { ListWorkloadSummaryDto } from '../dtos/list-workload-summary.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Odoo / Workload')
@Controller('odoo/workload')
export class WorkloadController {
  constructor(private readonly workloadSummaryService: WorkloadSummaryService) {}

  @Get('summary')
  @ApiOperation({ summary: 'List workload summary for a specific period' })
  @ApiResponse({ status: 200, description: 'Workload summary retrieved successfully' })
  async summary(@Query() query: ListWorkloadSummaryDto) {
    return this.workloadSummaryService.execute(query);
  }
}

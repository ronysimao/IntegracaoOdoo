import { Injectable, NotFoundException } from '@nestjs/common';
import {
  OdooJson2Service,
  OdooSearchReadParams,
} from '../../common/services/odoo-json-2.service';
import {
  ReadTaskStageDto,
  readTaskStageSchema,
} from '../dtos/read-task-stage.dto';

@Injectable()
export class ReadTaskStageService {
  constructor(private readonly odooJson2Service: OdooJson2Service) {}

  async execute(params: ReadTaskStageDto) {
    const parsedParams = readTaskStageSchema.parse(params);

    const odooSearchParams: OdooSearchReadParams = {
      domain: [['id', '=', parsedParams.id]],
      limit: 1,
    };

    const taskStages = await this.odooJson2Service.searchRead(
      'project.task.type',
      odooSearchParams,
    );

    const taskStage = taskStages[0];

    if (!taskStage) {
      throw new NotFoundException('A etapa informada não foi localizada.');
    }

    return taskStage;
  }
}

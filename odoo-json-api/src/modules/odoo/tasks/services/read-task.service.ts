import { Injectable, NotFoundException } from '@nestjs/common';
import {
  OdooJson2Service,
  OdooSearchReadParams,
} from '../../common/services/odoo-json-2.service';
import { ReadTaskDto, readTaskSchema } from '../dtos/read-task.dto';

@Injectable()
export class ReadTaskService {
  constructor(private readonly odooJson2Service: OdooJson2Service) {}

  async execute(params: ReadTaskDto) {
    const parsedParams = readTaskSchema.parse(params);

    const odooSearchParams: OdooSearchReadParams = {
      domain: [['id', '=', parsedParams.id]],
      limit: 1,
    };

    const tasks = await this.odooJson2Service.searchRead(
      'project.task',
      odooSearchParams,
    );

    const task = tasks[0];

    if (!task) {
      throw new NotFoundException('A tarefa informada não foi localizada.');
    }

    return task;
  }
}

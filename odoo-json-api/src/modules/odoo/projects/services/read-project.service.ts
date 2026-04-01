import { Injectable, NotFoundException } from '@nestjs/common';
import {
  OdooJson2Service,
  OdooSearchReadParams,
} from '../../common/services/odoo-json-2.service';
import { ReadProjectDto, readProjectSchema } from '../dtos/read-project.dto';

@Injectable()
export class ReadProjectService {
  constructor(private readonly odooJson2Service: OdooJson2Service) {}

  async execute(params: ReadProjectDto) {
    const parsedParams = readProjectSchema.parse(params);

    const odooSearchParams: OdooSearchReadParams = {
      domain: [['id', '=', parsedParams.id]],
      limit: 1,
    };

    const projects = await this.odooJson2Service.searchRead(
      'project.project',
      odooSearchParams,
    );

    const project = projects[0];

    if (!project) {
      throw new NotFoundException('O projeto informado não foi localizado.');
    }

    return project;
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { ListProjectsDto } from '../dtos/list-projects.dto';
import { ListProjectsService } from '../services/list-projects.service';
import { ApiListProjectsSwagger } from '../swagger/list-projects.swagger';

@Controller('odoo/projects')
@ApiTags('Projects')
export class ListProjectsController {
  constructor(private readonly listProjectsService: ListProjectsService) {}

  @Get()
  @ApiListProjectsSwagger()
  async execute(@Query() queryParams: ListProjectsDto) {
    return await this.listProjectsService.execute(queryParams);
  }
}

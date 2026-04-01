import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { ReadProjectDto } from '../dtos/read-project.dto';
import { ReadProjectService } from '../services/read-project.service';
import { ApiReadProjectSwagger } from '../swagger/read-project.swagger';

@Controller('odoo/projects')
@ApiTags('Projects')
export class ReadProjectController {
  constructor(private readonly readProjectService: ReadProjectService) {}

  @Get(':id')
  @ApiReadProjectSwagger()
  async execute(@Param() params: ReadProjectDto) {
    return await this.readProjectService.execute(params);
  }
}

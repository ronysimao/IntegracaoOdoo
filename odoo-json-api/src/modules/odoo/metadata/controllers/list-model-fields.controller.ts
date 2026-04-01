import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type {
  ListModelFieldsDto,
  OdooModelParamDto,
} from '../dtos/list-model-fields.dto';
import { ListModelFieldsService } from '../services/list-model-fields.service';
import { ApiListModelFieldsSwagger } from '../swagger/list-model-fields.swagger';

@Controller('odoo/metadata')
@ApiTags('Metadata')
export class ListModelFieldsController {
  constructor(
    private readonly listModelFieldsService: ListModelFieldsService,
  ) {}

  @Get('models/:model/fields')
  @ApiListModelFieldsSwagger()
  async execute(
    @Param() params: OdooModelParamDto,
    @Query() queryParams: ListModelFieldsDto,
  ) {
    return await this.listModelFieldsService.execute(params, queryParams);
  }
}

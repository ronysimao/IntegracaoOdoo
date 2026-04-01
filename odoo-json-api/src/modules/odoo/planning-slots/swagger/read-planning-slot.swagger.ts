import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

export const ApiReadPlanningSlotSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Consulta um slot de planejamento por ID',
    }),
    ApiParam({
      name: 'id',
      required: true,
      type: Number,
      description: 'ID numérico do slot de planejamento no Odoo.',
      example: 210,
    }),
    ApiOkResponse({
      description: 'Slot de planejamento retornado com sucesso.',
    }),
  );

import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

export const ApiReadTimesheetSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Consulta um apontamento por ID',
    }),
    ApiParam({
      name: 'id',
      required: true,
      type: Number,
      description: 'ID numérico do apontamento no Odoo.',
      example: 451,
    }),
    ApiOkResponse({
      description: 'Apontamento retornado com sucesso.',
    }),
  );

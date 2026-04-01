import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

export const ApiReadEmployeeSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Consulta um colaborador por ID',
    }),
    ApiParam({
      name: 'id',
      required: true,
      type: Number,
      description: 'ID numérico do colaborador no Odoo.',
      example: 123,
    }),
    ApiOkResponse({
      description: 'Colaborador retornado com sucesso.',
    }),
  );

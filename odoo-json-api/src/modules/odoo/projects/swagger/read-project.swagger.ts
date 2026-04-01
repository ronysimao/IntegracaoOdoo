import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

export const ApiReadProjectSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Consulta um projeto por ID',
    }),
    ApiParam({
      name: 'id',
      required: true,
      type: Number,
      description: 'ID numérico do projeto no Odoo.',
      example: 55,
    }),
    ApiOkResponse({
      description: 'Projeto retornado com sucesso.',
    }),
  );

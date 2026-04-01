import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

export const ApiReadTaskSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Consulta uma tarefa por ID',
    }),
    ApiParam({
      name: 'id',
      required: true,
      type: Number,
      description: 'ID numérico da tarefa no Odoo.',
      example: 98,
    }),
    ApiOkResponse({
      description: 'Tarefa retornada com sucesso.',
    }),
  );

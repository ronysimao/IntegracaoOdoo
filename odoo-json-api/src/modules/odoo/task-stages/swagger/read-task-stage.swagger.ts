import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

export const ApiReadTaskStageSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Consulta uma etapa de tarefa por ID',
    }),
    ApiParam({
      name: 'id',
      required: true,
      type: Number,
      description: 'ID numérico da etapa no Odoo.',
      example: 12,
    }),
    ApiOkResponse({
      description: 'Etapa retornada com sucesso.',
    }),
  );

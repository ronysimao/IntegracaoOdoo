import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

export const ApiListTaskStagesSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Lista etapas de tarefas do Odoo',
      description:
        'Retorna etapas de tarefas com paginação, ordenação, filtro por projeto e busca textual.',
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      description:
        'Quantidade máxima de registros retornados. Valor entre 1 e 100. Padrão: 20.',
      example: 20,
    }),
    ApiQuery({
      name: 'offset',
      required: false,
      type: Number,
      description:
        'Quantidade de registros ignorados no início da lista. Padrão: 0.',
      example: 0,
    }),
    ApiQuery({
      name: 'order',
      required: false,
      type: String,
      description:
        'Critério de ordenação no formato do Odoo, como "sequence asc".',
      example: 'sequence asc',
    }),
    ApiQuery({
      name: 'projectId',
      required: false,
      type: Number,
      description: 'ID do projeto para filtrar etapas vinculadas.',
      example: 45,
    }),
    ApiQuery({
      name: 'search',
      required: false,
      type: String,
      description: 'Texto para busca parcial no nome da etapa.',
      example: 'Em andamento',
    }),
    ApiOkResponse({
      description: 'Lista de etapas retornada com sucesso.',
    }),
  );

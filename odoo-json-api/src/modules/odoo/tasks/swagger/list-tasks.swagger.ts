import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

export const ApiListTasksSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Lista tarefas do Odoo',
      description:
        'Retorna tarefas com paginação e filtros por projeto, etapa, usuário, busca textual e intervalo de prazo.',
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
        'Critério de ordenação no formato do Odoo, como "id desc" ou "name asc".',
      example: 'id desc',
    }),
    ApiQuery({
      name: 'projectId',
      required: false,
      type: Number,
      description: 'ID do projeto para filtrar tarefas.',
      example: 45,
    }),
    ApiQuery({
      name: 'stageId',
      required: false,
      type: Number,
      description: 'ID da etapa para filtrar tarefas.',
      example: 7,
    }),
    ApiQuery({
      name: 'userId',
      required: false,
      type: Number,
      description: 'ID do usuário responsável para filtrar tarefas.',
      example: 16,
    }),
    ApiQuery({
      name: 'search',
      required: false,
      type: String,
      description: 'Texto para busca parcial no nome da tarefa.',
      example: 'Integração',
    }),
    ApiQuery({
      name: 'dateFrom',
      required: false,
      type: String,
      description: 'Data inicial do prazo no formato AAAA-MM-DD.',
      example: '2026-03-01',
    }),
    ApiQuery({
      name: 'dateTo',
      required: false,
      type: String,
      description: 'Data final do prazo no formato AAAA-MM-DD.',
      example: '2026-03-31',
    }),
    ApiOkResponse({
      description: 'Lista de tarefas retornada com sucesso.',
    }),
  );

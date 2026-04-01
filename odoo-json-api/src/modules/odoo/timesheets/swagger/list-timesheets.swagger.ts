import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

export const ApiListTimesheetsSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Lista apontamentos de horas do Odoo',
      description:
        'Retorna apontamentos com paginação e filtros por projeto, tarefa, colaborador, usuário e intervalo de datas.',
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
        'Critério de ordenação no formato do Odoo, como "date desc" ou "date asc".',
      example: 'date desc',
    }),
    ApiQuery({
      name: 'projectId',
      required: false,
      type: Number,
      description: 'ID do projeto para filtrar apontamentos.',
      example: 45,
    }),
    ApiQuery({
      name: 'taskId',
      required: false,
      type: Number,
      description: 'ID da tarefa para filtrar apontamentos.',
      example: 120,
    }),
    ApiQuery({
      name: 'employeeId',
      required: false,
      type: Number,
      description: 'ID do colaborador para filtrar apontamentos.',
      example: 8,
    }),
    ApiQuery({
      name: 'userId',
      required: false,
      type: Number,
      description: 'ID do usuário para filtrar apontamentos.',
      example: 16,
    }),
    ApiQuery({
      name: 'dateFrom',
      required: false,
      type: String,
      description: 'Data inicial no formato AAAA-MM-DD.',
      example: '2026-03-01',
    }),
    ApiQuery({
      name: 'dateTo',
      required: false,
      type: String,
      description: 'Data final no formato AAAA-MM-DD.',
      example: '2026-03-31',
    }),
    ApiOkResponse({
      description: 'Lista de apontamentos retornada com sucesso.',
    }),
  );

import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

export const ApiListEmployeesSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Lista colaboradores do Odoo',
      description:
        'Retorna colaboradores com suporte a paginação, ordenação e filtro por nome.',
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
        'Critério de ordenação no formato do Odoo, como "name asc" ou "id desc".',
      example: 'name asc',
    }),
    ApiQuery({
      name: 'search',
      required: false,
      type: String,
      description: 'Texto para busca parcial no nome do colaborador.',
      example: 'João',
    }),
    ApiOkResponse({
      description: 'Lista de colaboradores retornada com sucesso.',
    }),
  );

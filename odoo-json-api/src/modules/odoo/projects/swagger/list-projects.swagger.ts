import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

export const ApiListProjectsSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Lista projetos do Odoo',
      description:
        'Retorna projetos com suporte a paginação, ordenação e filtro textual.',
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
      name: 'search',
      required: false,
      type: String,
      description: 'Texto para busca parcial no nome do projeto.',
      example: 'Implementação',
    }),
    ApiOkResponse({
      description: 'Lista de projetos retornada com sucesso.',
    }),
  );

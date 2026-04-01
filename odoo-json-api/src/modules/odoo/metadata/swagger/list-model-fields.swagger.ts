import { applyDecorators } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

export const ApiListModelFieldsSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Lista campos de um modelo técnico do Odoo',
      description:
        'Retorna metadados de campos do modelo informado, com suporte a paginação, ordenação e busca por nome técnico do campo.',
    }),
    ApiParam({
      name: 'model',
      required: true,
      type: String,
      description:
        'Nome técnico do modelo do Odoo. Aceita letras, números, ponto e sublinhado.',
      example: 'project.task',
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
      description: 'Texto para busca parcial no nome técnico do campo.',
      example: 'date',
    }),
    ApiOkResponse({
      description: 'Lista de campos do modelo retornada com sucesso.',
    }),
  );

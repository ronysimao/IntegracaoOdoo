import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export const ApiAuthenticateSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Autentica um usuário no Odoo via JSON-RPC',
      description:
        'Realiza autenticação usando base de dados, login e senha, retornando os dados de sessão do Odoo.',
    }),
    ApiBody({
      description: 'Credenciais necessárias para autenticar no Odoo.',
      schema: {
        type: 'object',
        properties: {
          database: {
            type: 'string',
            description: 'Base de dados do Odoo.',
            example: 'fsimonettizen-asisto-odoo-19-main-24850879',
          },
          login: {
            type: 'string',
            description: 'Login do usuário no Odoo.',
            example: 'usuario@asisto.com.br',
          },
          password: {
            type: 'string',
            description: 'Senha do usuário no Odoo.',
            example: 'MinhaSenhaSegura123',
          },
        },
        required: ['database', 'login', 'password'],
      },
    }),
    ApiOkResponse({
      description: 'Sessão autenticada retornada pelo Odoo.',
    }),
  );

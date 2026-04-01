import {
  Inject,
  Injectable,
  BadGatewayException,
  UnauthorizedException,
} from '@nestjs/common';
import { isAxiosError } from 'axios';
import type { AxiosInstance } from 'axios';
import {
  extractOdooJsonRpcAxiosDetail,
  extractOdooJsonRpcDetail,
  isOdooJsonRpcUnauthorized,
} from '../../../../http/external-http.errors';
import { ODOO_JSON_RPC_HTTP_CLIENT } from '../../../../http/external-http.tokens';
import { authenticateSchema } from '../dtos/authenticate.dto';
import type { AuthenticateDto } from '../dtos/authenticate.dto';

type OdooAuthenticateResponse = {
  error?: unknown;
  result?: unknown;
};

@Injectable()
export class AuthenticateService {
  constructor(
    @Inject(ODOO_JSON_RPC_HTTP_CLIENT)
    private readonly odooJsonRpcHttpClient: AxiosInstance,
  ) {}

  async execute(payload: AuthenticateDto) {
    const { database, login, password } = authenticateSchema.parse(payload);

    try {
      const { data } =
        await this.odooJsonRpcHttpClient.post<OdooAuthenticateResponse>(
          '/web/session/authenticate',
          {
            id: 1,
            jsonrpc: '2.0',
            method: 'call',
            params: {
              db: database,
              login,
              password,
            },
          },
        );

      if (data?.error) {
        const detail = extractOdooJsonRpcDetail(data);

        if (isOdooJsonRpcUnauthorized(data)) {
          throw new UnauthorizedException(detail);
        }

        throw new BadGatewayException(detail);
      }

      if (typeof data?.result === 'undefined') {
        throw new BadGatewayException(
          'O Odoo não retornou os dados da sessão autenticada.',
        );
      }

      return data.result;
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof BadGatewayException
      ) {
        throw error;
      }

      if (
        isAxiosError(error) &&
        isOdooJsonRpcUnauthorized(error.response?.data, error.response?.status)
      ) {
        throw new UnauthorizedException(extractOdooJsonRpcAxiosDetail(error));
      }

      throw new BadGatewayException(extractOdooJsonRpcAxiosDetail(error));
    }
  }
}

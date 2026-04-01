import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { isAxiosError } from 'axios';
import type { AxiosInstance } from 'axios';
import { ODOO_JSON_2_HTTP_CLIENT } from '../../../../http/external-http.tokens';

type OdooJson2ErrorPayload = {
  arguments?: unknown[];
  message?: string;
  name?: string;
};

type OdooDomainCondition = [string, string, unknown];

export type OdooSearchReadParams = {
  context?: Record<string, unknown>;
  domain?: OdooDomainCondition[];
  fields?: string[];
  limit?: number;
  offset?: number;
  order?: string;
};

@Injectable()
export class OdooJson2Service {
  constructor(
    @Inject(ODOO_JSON_2_HTTP_CLIENT)
    private readonly odooJson2HttpClient: AxiosInstance,
  ) {}

  async searchRead<T>(model: string, params: OdooSearchReadParams) {
    try {
      const { data } = await this.odooJson2HttpClient.post<T[]>(
        `/${model}/search_read`,
        params,
      );

      return data;
    } catch (error) {
      throw this.mapJson2Error(error);
    }
  }

  private mapJson2Error(error: unknown) {
    if (!isAxiosError(error)) {
      return new BadGatewayException('Erro desconhecido ao consultar o Odoo.');
    }

    const payload = error.response?.data as OdooJson2ErrorPayload | undefined;
    const message = payload?.message?.trim();
    const errorName = payload?.name?.trim();
    const suffix = [errorName, error.response?.status]
      .filter(Boolean)
      .join(', ');

    if (message && suffix) {
      return new BadGatewayException(`${message} (${suffix})`);
    }

    if (message) {
      return new BadGatewayException(message);
    }

    return new BadGatewayException(
      error.message || 'Erro desconhecido ao consultar o Odoo.',
    );
  }
}

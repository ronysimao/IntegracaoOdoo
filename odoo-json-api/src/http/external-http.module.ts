import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import axios from 'axios';
import {
  ODOO_JSON_2_HTTP_CLIENT,
  ODOO_JSON_RPC_HTTP_CLIENT,
} from './external-http.tokens';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: ODOO_JSON_RPC_HTTP_CLIENT,
      useFactory: (configService: ConfigService) => {
        return axios.create({
          baseURL: configService.get<string>('ODOO_JSON_RPC_API_URL'),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: ODOO_JSON_2_HTTP_CLIENT,
      useFactory: (configService: ConfigService) => {
        const apiKey = configService.get<string>('ODOO_JSON_2_API_KEY');
        const database = configService.get<string>('ODOO_JSON_2_DATABASE');
        const userAgent =
          configService.get<string>('ODOO_JSON_2_USER_AGENT') ??
          'asisto-metrics-backend';

        return axios.create({
          baseURL: configService.get<string>('ODOO_JSON_2_API_URL'),
          headers: {
            'Content-Type': 'application/json',
            ...(apiKey ? { Authorization: `bearer ${apiKey}` } : {}),
            ...(database ? { 'X-Odoo-Database': database } : {}),
            'User-Agent': userAgent,
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [ODOO_JSON_RPC_HTTP_CLIENT, ODOO_JSON_2_HTTP_CLIENT],
})
export class ExternalHttpModule {}

import { Module } from '@nestjs/common';
import { ExternalHttpModule } from '../../../http/external-http.module';
import { OdooJson2Service } from './services/odoo-json-2.service';

@Module({
  imports: [ExternalHttpModule],
  providers: [OdooJson2Service],
  exports: [OdooJson2Service],
})
export class CommonModule {}

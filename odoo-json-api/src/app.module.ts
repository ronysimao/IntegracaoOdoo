import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OdooModule } from './modules/odoo/odoo.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), OdooModule],
})
export class AppModule {}

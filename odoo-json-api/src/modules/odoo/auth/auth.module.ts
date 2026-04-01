import { Module } from '@nestjs/common';
import { ExternalHttpModule } from '../../../http/external-http.module';
import { AuthenticateController } from './controllers/authenticate.controller';
import { AuthenticateService } from './services/authenticate.service';

@Module({
  imports: [ExternalHttpModule],
  controllers: [AuthenticateController],
  providers: [AuthenticateService],
})
export class AuthModule {}

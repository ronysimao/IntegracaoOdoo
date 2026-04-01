import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { AuthenticateDto } from '../dtos/authenticate.dto';
import { AuthenticateService } from '../services/authenticate.service';
import { ApiAuthenticateSwagger } from '../swagger/authenticate.swagger';

@Controller('odoo/authenticate')
@ApiTags('Auth')
export class AuthenticateController {
  constructor(private readonly authenticateService: AuthenticateService) {}

  @Post()
  @ApiAuthenticateSwagger()
  async execute(@Body() body: AuthenticateDto) {
    return await this.authenticateService.execute(body);
  }
}

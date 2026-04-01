import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Odoo JSON API')
    .setDescription('API para testes das rotas de integração com o Odoo.')
    .setVersion('1.0.0')
    .addTag('Auth')
    .addTag('Projects')
    .addTag('Tasks')
    .addTag('Timesheets')
    .addTag('Planning')
    .addTag('Employees')
    .addTag('Metadata')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

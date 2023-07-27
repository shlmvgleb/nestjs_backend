import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './utils/filters/http-exception.filter';
import { ValidationError } from 'class-validator';
import { errorFormatter } from './utils/helpers/validation-error.formatter';
import { ValidationException } from './utils/exceptions/validation.exception';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const PORT = configService.get('port', 3000);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errorFormatter(errors);
        return new ValidationException(messages);
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .addBearerAuth({
      type: 'http',
    })
    .setTitle('Nestjs ecommerce project')
    .setDescription('REST API for ecommerce owners')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => {
    logger.log('Server started on port ' + PORT);
  });
}
bootstrap();

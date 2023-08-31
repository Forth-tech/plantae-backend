import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { init, Handlers } from '@sentry/node';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { SentryInterceptor } from './core/interceptors/sentry.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  init({
    dsn: 'https://c856deb1dcd7ee680a1708feb8dfe9a6@o4505796257972224.ingest.sentry.io/4505796264263680',
  });
  app.use(Handlers.requestHandler());
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalInterceptors(new SentryInterceptor());
  await app.listen(3000);
}
bootstrap();

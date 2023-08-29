import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaDataServiceModule } from './frameworks/data-services/prisma.module';
import { UserController } from './controllers/user.controller';
import { UserUseCasesModule } from './use-cases/user/user-use-case.module';
import { PassportServiceModule } from './frameworks/auth-services.ts/passport/passport-service.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    PrismaDataServiceModule,
    PassportServiceModule,
    UserUseCasesModule,
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: (req, res) => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}

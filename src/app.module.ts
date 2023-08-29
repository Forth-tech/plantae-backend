import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaDataServiceModule } from './frameworks/data-services/prisma.module';
import { UserController } from './controllers/user.controller';
import { UserUseCasesModule } from './use-cases/user/user-use-case.module';
import { PassportServiceModule } from './frameworks/auth-services.ts/passport/passport-service.module';

@Module({
  imports: [PrismaDataServiceModule, PassportServiceModule, UserUseCasesModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}

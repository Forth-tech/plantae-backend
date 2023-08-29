import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaDataServiceModule } from './frameworks/data-services/prisma.module';
import { UserController } from './controllers/user.controller';
import { UserUseCasesModule } from './use-cases/user/user-use-case.module';

@Module({
  imports: [PrismaDataServiceModule, UserUseCasesModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}

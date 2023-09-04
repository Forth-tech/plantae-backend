import { Module } from '@nestjs/common';
import { PrismaDataServiceModule } from 'src/frameworks/data-services/prisma.module';
import { UserFactoryService } from './user-factory.service';
import { UserUseCases } from './user.use-case';
import { PassportServiceModule } from 'src/frameworks/auth-services/passport/passport-service.module';

@Module({
  imports: [PrismaDataServiceModule, PassportServiceModule],
  providers: [UserFactoryService, UserUseCases],
  exports: [UserFactoryService, UserUseCases],
})
export class UserUseCasesModule {}

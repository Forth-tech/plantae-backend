import { Module } from '@nestjs/common';
import { IAuthServices } from 'src/core/abstracts/auth-services.abstract';
import { PassportService } from './passport-service.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { PrismaDataServiceModule } from 'src/frameworks/data-services/prisma.module';

@Module({
  imports: [PrismaDataServiceModule, PassportModule],
  providers: [
    {
      provide: IAuthServices,
      useClass: PassportService,
    },
    LocalStrategy,
  ],
  exports: [IAuthServices],
})
export class PassportServiceModule {}

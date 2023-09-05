import { Module } from '@nestjs/common';
import { IAuthServices } from 'src/core/abstracts/auth-services.abstract';
import { PassportService } from './passport-service.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { PrismaDataServiceModule } from 'src/frameworks/data-services/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/core/constants';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PrismaDataServiceModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1m' },
    }),
  ],
  providers: [
    {
      provide: IAuthServices,
      useClass: PassportService,
    },
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [IAuthServices],
})
export class PassportServiceModule {}

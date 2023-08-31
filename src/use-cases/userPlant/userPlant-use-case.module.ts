import { Module } from '@nestjs/common';
import { PrismaDataServiceModule } from '../../frameworks/data-services/prisma.module';
import { UserPlantFactoryService } from './userPlant-factory.service';
import { UserPlantUseCases } from './userPlant.use-case';

@Module({
  imports: [PrismaDataServiceModule],
  providers: [UserPlantFactoryService, UserPlantUseCases],
  exports: [UserPlantFactoryService, UserPlantUseCases],
})
export class UserPlantUseCasesModule {}

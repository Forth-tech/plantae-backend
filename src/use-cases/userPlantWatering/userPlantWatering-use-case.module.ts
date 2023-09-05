import { Module } from '@nestjs/common';
import { PrismaDataServiceModule } from '../../frameworks/data-services/prisma.module';
import { UserPlantWateringFactoryService } from './userPlantWatering.factory';
import { UserPlantWateringUseCases } from './userPlantWatering.use-case';

@Module({
  imports: [PrismaDataServiceModule],
  providers: [UserPlantWateringFactoryService, UserPlantWateringUseCases],
  exports: [UserPlantWateringFactoryService, UserPlantWateringUseCases],
})
export class UserPlantWateringUseCasesModule {}

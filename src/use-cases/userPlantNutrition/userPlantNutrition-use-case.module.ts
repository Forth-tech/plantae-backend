import { Module } from '@nestjs/common';
import { PrismaDataServiceModule } from '../../frameworks/data-services/prisma.module';
import { UserPlantNutritionFactoryService } from './userPlantNutrition.factory';
import { UserPlantNutritionUseCases } from './userPlantNutrition.use-case';

@Module({
  imports: [PrismaDataServiceModule],
  providers: [UserPlantNutritionFactoryService, UserPlantNutritionUseCases],
  exports: [UserPlantNutritionFactoryService, UserPlantNutritionUseCases],
})
export class UserPlantNutritionUseCasesModule {}

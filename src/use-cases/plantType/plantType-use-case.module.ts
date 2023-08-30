import { PrismaDataServiceModule } from 'src/frameworks/data-services/prisma.module';
import { PlantTypeFactory } from './plantType-factory.service';
import { PlantTypeUseCases } from './plantType.use-case';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaDataServiceModule],
  providers: [PlantTypeFactory, PlantTypeUseCases],
  exports: [PlantTypeFactory, PlantTypeUseCases],
})
export class PlantTypeUseCasesModule {}

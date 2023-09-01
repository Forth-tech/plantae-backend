import { PrismaDataServiceModule } from 'src/frameworks/data-services/prisma.module';
import { UserPlantNotesFactoryService } from './userPlantNotes-factory.service';
import { UserPlantNotesUseCases } from './userPlantNotes.use-case';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaDataServiceModule],
  providers: [UserPlantNotesFactoryService, UserPlantNotesUseCases],
  exports: [UserPlantNotesFactoryService, UserPlantNotesUseCases],
})
export class UserPlantNotesUseCasesModule {}

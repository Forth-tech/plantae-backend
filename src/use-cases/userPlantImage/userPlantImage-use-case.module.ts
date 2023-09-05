import { Module } from '@nestjs/common';
import { PrismaDataServiceModule } from '../../frameworks/data-services/prisma.module';
import { UserPlantImageUseCases } from './userPlantImage.use-case';
import { ImageUploaderModule } from 'src/services/image-services/image-uploader.module';

@Module({
  imports: [PrismaDataServiceModule, ImageUploaderModule],
  providers: [UserPlantImageUseCases],
  exports: [UserPlantImageUseCases],
})
export class UserPlantImageUseCasesModule {}

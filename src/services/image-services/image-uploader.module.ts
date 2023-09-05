import { Module } from '@nestjs/common';
import { S3UploaderServiceModule } from '../../frameworks/image-services/s3-uploader/s3Uploader.module';

@Module({
  imports: [S3UploaderServiceModule],
  exports: [S3UploaderServiceModule],
})
export class ImageUploaderModule {}

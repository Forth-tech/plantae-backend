import { Module } from '@nestjs/common';
import { S3UploaderService } from './s3Uploader.service';

@Module({
  imports: [S3UploaderService],
  exports: [S3UploaderService],
})
export class S3UploaderModule {}

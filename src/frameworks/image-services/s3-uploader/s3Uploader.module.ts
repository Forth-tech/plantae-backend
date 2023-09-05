import { Module } from '@nestjs/common';
import { S3UploaderService } from './s3Uploader.service';
import { IUploaderService } from 'src/core/abstracts/uploader-services.abstract';

@Module({
  providers: [
    {
      provide: IUploaderService,
      useClass: S3UploaderService,
    },
  ],
  exports: [IUploaderService],
})
export class S3UploaderServiceModule {}

import { S3 } from 'aws-sdk';
import { IUploaderService } from 'src/core/abstracts/uploader-services.abstract';

export class S3UploaderService extends IUploaderService {
  params: S3.PutObjectRequest;
  s3: S3;
  constructor() {
    super();
    this.params = {
      Bucket: process.env.S3_BUCKET ? process.env.S3_BUCKET : '',
      Key: '',
      ACL: 'public-read',
      ContentDisposition: 'inline',
    };

    this.s3 = new S3({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    });
  }

  async fileUpload(
    ID_User: string,
    file: Express.Multer.File,
  ): Promise<S3.ManagedUpload.SendData | null> {
    const { originalname, buffer, mimetype } = file;

    this.params.Key = `/${ID_User}/${originalname}`;
    this.params.Body = buffer;
    this.params.ContentType = mimetype;

    try {
      const s3Response = await this.s3.upload(this.params).promise();
      return s3Response;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

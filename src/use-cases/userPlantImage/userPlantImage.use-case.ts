import { Injectable } from '@nestjs/common';
import { IUploaderService } from '../../core/abstracts/uploader-services.abstract';
import { PrismaService } from '../../frameworks/data-services/prisma.service';
import { S3 } from 'aws-sdk';
import { UserPlantImage } from '../../core/entities/userPlantImage.entity';

@Injectable()
export class UserPlantImageUseCases {
  constructor(
    private dataService: PrismaService,
    private uploaderService: IUploaderService,
  ) {}

  async uploadUserPlantImage(
    ID_UserPLant: string,
    ID_User: string,
    image: Express.Multer.File,
  ): Promise<UserPlantImage | null> {
    const userPlant = await this.dataService.userPlant.findUnique({
      where: {
        ID_UserPLant: ID_UserPLant,
        ID_User: ID_User,
      },
    });

    if (!userPlant) return null;

    const s3Response: S3.ManagedUpload.SendData =
      await this.uploaderService.fileUpload(ID_User, image);

    return await this.dataService.userPlantImage.create({
      data: {
        userPlant: {
          connect: { ID_UserPLant: ID_UserPLant },
        },
        imageUrl: s3Response.Location.toString(),
      },
    });
  }

  async getUserPlantImagesByPlantId(
    ID_UserPlant: string,
    ID_User: string,
  ): Promise<UserPlantImage[] | null> {
    return await this.dataService.userPlantImage.findMany({
      where: {
        userPlant: {
          ID_User: ID_User,
          ID_UserPLant: ID_UserPlant,
        },
      },
    });
  }
}

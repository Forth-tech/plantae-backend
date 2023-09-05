import { Injectable } from '@nestjs/common';
import { UserPlantWatering } from 'src/core/entities/userPlantWatering.entity';
import { PrismaService } from 'src/frameworks/data-services/prisma.service';

@Injectable()
export class UserPlantWateringUseCases {
  constructor(private dataService: PrismaService) {}

  async getUserPlantWateringByUserPlant(
    userPlant: string,
    ID_User: string,
  ): Promise<UserPlantWatering[] | null> {
    const userPlantWatering = await this.dataService.userPlantWatering.findMany(
      {
        where: {
          userPlant: { ID_UserPLant: userPlant, ID_User: ID_User },
        },
      },
    );

    return userPlantWatering;
  }

  async createUserPlantWatering(
    userPlantWatering: UserPlantWatering,
  ): Promise<UserPlantWatering | null> {
    if (
      userPlantWatering.volume <= 0 ||
      userPlantWatering.date.getTime() - new Date().getTime() > 10 * 60 * 1000
    ) {
      return null;
    }
    const createdUserPlantWatering =
      await this.dataService.userPlantWatering.create({
        data: {
          userPlant: {
            connect: { ID_UserPLant: userPlantWatering.ID_UserPlant },
          },
          volume: userPlantWatering.volume,
          date: userPlantWatering.date,
        },
      });

    return createdUserPlantWatering;
  }
}

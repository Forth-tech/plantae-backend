import { Injectable } from '@nestjs/common';
import { UserPlant } from '../../core/entities/userPlant.entity';
import { PrismaService } from '../../frameworks/data-services/prisma.service';

@Injectable()
export class UserPlantUseCases {
  constructor(private dataServices: PrismaService) {}

  async getUserPlantById(id: string): Promise<UserPlant | null> {
    return await this.dataServices.userPlant.findUnique({
      where: { ID_UserPLant: id },
      include: {
        feeding: true,
        watering: true,
      },
    });
  }

  async getUserPlants(id: string): Promise<UserPlant[]> {
    return await this.dataServices.userPlant.findMany({
      where: { ID_User: id },
      include: {
        feeding: true,
        watering: true,
      },
    });
  }

  async createPlantType(userPlant: UserPlant): Promise<UserPlant> {
    const createdUserPlant = await this.dataServices.userPlant.create({
      data: {
        name: userPlant.name,
        purchasedDate: userPlant.purchasedDate,
        watering: {
          create: {
            period: userPlant.watering.period,
            volume: userPlant.watering.volume,
          },
        },
        feeding: {
          create: {
            period: userPlant.feeding.period,
            quantity: userPlant.feeding.quantity,
          },
        },
        user: {
          connect: { id: userPlant.ID_User },
        },
        plantType: {
          connect: { ID_PlantType: userPlant.ID_PlantType },
        },
      },
      include: {
        feeding: true,
        watering: true,
      },
    });

    return createdUserPlant;
  }
}

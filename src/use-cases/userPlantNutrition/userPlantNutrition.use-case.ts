import { Injectable } from '@nestjs/common';
import { UserPlantNutrition } from 'src/core/entities/userPlantNutrition.entity';
import { PrismaService } from 'src/frameworks/data-services/prisma.service';

@Injectable()
export class UserPlantNutritionUseCases {
  constructor(private dataService: PrismaService) {}

  async getUserPlantNutritionByUserPlant(
    userPlant: string,
    ID_User: string,
  ): Promise<UserPlantNutrition[] | null> {
    const userPlantNutrition =
      await this.dataService.userPlantNutrition.findMany({
        where: {
          userPlant: { ID_UserPLant: userPlant, ID_User: ID_User },
        },
      });

    return userPlantNutrition;
  }

  async createUserPlantNutrition(
    userPlantNutrition: UserPlantNutrition,
  ): Promise<UserPlantNutrition | null> {
    if (
      userPlantNutrition.quantity <= 0 ||
      userPlantNutrition.date.getTime() - new Date().getTime() > 10 * 60 * 1000
    ) {
      return null;
    }
    const createdUserPlantNutrition =
      await this.dataService.userPlantNutrition.create({
        data: {
          userPlant: {
            connect: { ID_UserPLant: userPlantNutrition.ID_UserPlant },
          },
          quantity: userPlantNutrition.quantity,
          date: userPlantNutrition.date,
        },
      });

    return createdUserPlantNutrition;
  }
}

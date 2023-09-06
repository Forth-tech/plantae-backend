import { Injectable } from '@nestjs/common';
import { CreateUserPlantNutritionDto } from '../../core/dtos/userPlantNutrition.dto';
import { UserPlantNutrition } from '../../core/entities/userPlantNutrition.entity';

@Injectable()
export class UserPlantNutritionFactoryService {
  createNewUserPlantNutrition(
    ID_UserPlant: string,
    createUserPlantNutritionDto: CreateUserPlantNutritionDto,
  ): UserPlantNutrition {
    const newUserPlantNutrition = new UserPlantNutrition();

    newUserPlantNutrition.ID_UserPlant = ID_UserPlant;
    newUserPlantNutrition.date = createUserPlantNutritionDto.date;
    newUserPlantNutrition.quantity = createUserPlantNutritionDto.quantity;

    return newUserPlantNutrition;
  }
}

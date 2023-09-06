import { PartialType } from '@nestjs/mapped-types';
import { UserPlantNutrition } from '../entities/userPlantNutrition.entity';

export class CreateUserPlantNutritionDto {
  date: Date;
  quantity: number;
}

export class UpdateUserPlantNutritionDto extends PartialType(
  CreateUserPlantNutritionDto,
) {}

export class CreateUserPlantNutritionResponseDto {
  success: boolean;
  plantNutrition: UserPlantNutrition;
}

export class GetUserPlantNutritionsResponseDto {
  success: boolean;
  plantNutritions: UserPlantNutrition[];
}

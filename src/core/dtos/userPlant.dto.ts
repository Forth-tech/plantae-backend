import { IsDate, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Watering } from '../entities/watering.entity';
import { Feeding } from '../entities/feeding.entity';
import { PartialType } from '@nestjs/mapped-types';
import { UserPlant } from '../entities/userPlant.entity';

export class CreateUserPlantDto {
  @IsString()
  @IsNotEmpty()
  ID_plantType: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  purchasedDate: Date | null;

  @IsObject()
  @IsNotEmpty()
  watering: Watering;

  @IsObject()
  @IsNotEmpty()
  feeeding: Feeding;
}

export class UpdateUserPlantDto extends PartialType(CreateUserPlantDto) {}

export class CreateUserPlantResponseDto {
  success: boolean;
  userPlant: Partial<UserPlant>;
}

export class GetUserPlantByIdResponseDto extends CreateUserPlantResponseDto {}

export class GetUserPlantsResponseDto {
  success: boolean;
  userPlants: Partial<UserPlant>[];
}

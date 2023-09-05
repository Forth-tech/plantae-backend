import { PartialType } from '@nestjs/mapped-types';
import { UserPlantWatering } from '../entities/userPlantWatering.entity';

export class CreateUserPlantWateringDto {
  date: Date;
  volume: number;
}

export class UpdateUserPlantWateringDto extends PartialType(
  CreateUserPlantWateringDto,
) {}

export class CreateUserPlantWateringResponseDto {
  success: boolean;
  plantWatering: UserPlantWatering;
}

export class GetUserPlantWateringsResponseDto {
  success: boolean;
  plantWaterings: UserPlantWatering[];
}

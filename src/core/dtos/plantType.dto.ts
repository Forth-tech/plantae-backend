import { IsArray, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { PlantTypePopularName } from '../entities/plantTypePopularName.entity';
import { PartialType } from '@nestjs/mapped-types';
import { PlantType } from '../entities/plantType.entity';

export class CreatePlantTypeDto {
  @IsString()
  @IsNotEmpty()
  scientificName: string;

  @IsArray()
  popularNames: PlantTypePopularName[];

  @IsUrl()
  imageUrl: string;
}

export class UpdatePlantTypeDto extends PartialType(CreatePlantTypeDto) {}

export class CreatePlantTypeResponseDto {
  success: boolean;

  plantType: Partial<PlantType>;
}

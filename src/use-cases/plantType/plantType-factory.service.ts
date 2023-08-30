import { Injectable } from '@nestjs/common';
import { CreatePlantTypeDto } from 'src/core/dtos/plantType.dto';
import { PlantType } from '../../core/entities/plantType.entity';

@Injectable()
export class PlantTypeFactory {
  createNewPlantType(plantTypeDto: CreatePlantTypeDto): PlantType {
    const newPlantType = new PlantType();

    newPlantType.imageUrl = plantTypeDto.imageUrl;
    newPlantType.scientificName = plantTypeDto.scientificName;
    newPlantType.popularNames = plantTypeDto.popularNames;

    return newPlantType;
  }
}

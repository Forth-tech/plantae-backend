import { Injectable } from '@nestjs/common';
import { CreateUserPlantDto } from '../../core/dtos/userPlant.dto';
import { UserPlant } from '../../core/entities/userPlant.entity';

@Injectable()
export class UserPlantFactoryService {
  createNewUserPlant(
    ID_User: string,
    createUserPlantDto: CreateUserPlantDto,
  ): UserPlant {
    const newUserPlant = new UserPlant();

    newUserPlant.ID_User = ID_User;
    newUserPlant.feeding = createUserPlantDto.feeeding;
    newUserPlant.watering = createUserPlantDto.watering;
    newUserPlant.name = createUserPlantDto.name;
    newUserPlant.purchasedDate = createUserPlantDto.purchasedDate;
    newUserPlant.ID_PlantType = createUserPlantDto.ID_plantType;

    return newUserPlant;
  }
}

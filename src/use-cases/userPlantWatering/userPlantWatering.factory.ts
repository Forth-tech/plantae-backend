import { Injectable } from '@nestjs/common';
import { CreateUserPlantWateringDto } from '../../core/dtos/userPlantWatering.dto';
import { UserPlantWatering } from '../../core/entities/userPlantWatering.entity';

@Injectable()
export class UserPlantWateringFactoryService {
  createNewUserPlantWatering(
    ID_UserPlant: string,
    createUserPlantWateringDto: CreateUserPlantWateringDto,
  ): UserPlantWatering {
    const newUserPlantWatering = new UserPlantWatering();

    newUserPlantWatering.ID_UserPlant = ID_UserPlant;
    newUserPlantWatering.date = createUserPlantWateringDto.date;
    newUserPlantWatering.volume = createUserPlantWateringDto.volume;

    return newUserPlantWatering;
  }
}

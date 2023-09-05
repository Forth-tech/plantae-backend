import { UserPlantImage } from '../entities/userPlantImage.entity';

export class GetUserPlantImageResponseDto {
  success: boolean;
  plantImages: UserPlantImage[];
}

export class CreateUserPlantImageResponseDto {
  success: boolean;
  plantImage: UserPlantImage;
}

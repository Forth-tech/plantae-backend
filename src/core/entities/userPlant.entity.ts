import { Feeding } from './feeding.entity';
import { Watering } from './watering.entity';

export class UserPlant {
  purchasedDate: Date | null;
  name: string;
  ID_User: string;
  ID_PlantType: string;
  ID_Feeding: string | null;
  ID_Watering: string | null;
  feeding: Feeding;
  watering: Watering;
}

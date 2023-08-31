import { WateringPeriod } from '@prisma/client';

export class Watering {
  period: WateringPeriod;
  volume: number;
  ID_Watering: string | null;
}

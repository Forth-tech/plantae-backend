import { FeedingPeriod } from '@prisma/client';

export class Feeding {
  quantity: number;
  period: FeedingPeriod;
  ID_Feeding: string | null;
}

import { PlantTypePopularName } from './plantTypePopularName.entity';

export class PlantType {
  ID_PlantType: string | undefined;
  scientificName: string;
  imageUrl: string | null;
  popularNames: PlantTypePopularName[];
}

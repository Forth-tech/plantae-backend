import { PlantTypePopularName } from './plantTypePopularName.entity';

export class PlantType {
  ID_PlantType: string;
  scientificName: string;
  imageUrl: string | null;
  popularNames: PlantTypePopularName[];
}

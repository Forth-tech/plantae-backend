import { Injectable } from '@nestjs/common';
import { PlantType } from '../../core/entities/plantType.entity';
import { PrismaService } from '../../frameworks/data-services/prisma.service';

@Injectable()
export class PlantTypeUseCases {
  constructor(private dataServices: PrismaService) {}

  async getPlantTypeById(id: string): Promise<PlantType | null> {
    return await this.dataServices.plantType.findUnique({
      where: { ID_PlantType: id },
      select: {
        ID_PlantType: true,
        scientificName: true,
        imageUrl: true,
        popularNames: {
          select: {
            ID_PlantTypePopularName: true,
            popularName: true,
          },
        },
      },
    });
  }

  async createPlantType(plantType: PlantType): Promise<PlantType> {
    const createdPlantType = await this.dataServices.plantType.create({
      data: {
        scientificName: plantType.scientificName,
        imageUrl: plantType.imageUrl,
        popularNames: {
          createMany: { data: plantType.popularNames },
        },
      },
      select: {
        ID_PlantType: true,
        scientificName: true,
        imageUrl: true,
        popularNames: {
          select: {
            ID_PlantTypePopularName: true,
            popularName: true,
          },
        },
      },
    });

    return createdPlantType;
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { PlantTypeFactory } from './plantType-factory.service';
import { CreatePlantTypeDto } from '../../core/dtos/plantType.dto';

describe('PlantTypeFactoryService', () => {
  let service: PlantTypeFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlantTypeFactory],
    }).compile();

    service = module.get<PlantTypeFactory>(PlantTypeFactory);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create planttype', () => {
    const plantDto = new CreatePlantTypeDto();
    plantDto.scientificName = 'testing 123';
    plantDto.popularNames = [
      { popularName: 'test1', ID_PlantTypePopularName: undefined },
      { popularName: 'test2', ID_PlantTypePopularName: undefined },
    ];

    const plantType = service.createNewPlantType(plantDto);
    expect(plantType).toBeDefined();
    expect(plantType.ID_PlantType).toBeUndefined();
    expect(plantType.imageUrl).toBeUndefined();
    expect(plantType.scientificName).toBe(plantDto.scientificName);
  });
});

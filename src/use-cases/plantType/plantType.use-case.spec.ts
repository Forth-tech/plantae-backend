import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PlantTypeUseCases } from './plantType.use-case';
import { PrismaService } from '../../frameworks/data-services/prisma.service';

describe('PlantTypeUseCaseService', () => {
  let service: PlantTypeUseCases;
  let databaseService: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlantTypeUseCases,
        { provide: PrismaService, useValue: mockDeep<PrismaService>() },
      ],
    }).compile();

    service = module.get<PlantTypeUseCases>(PlantTypeUseCases);
    databaseService = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('GET by id should return null if does not exist', async () => {
    databaseService.plantType.findUnique.mockResolvedValueOnce(null);
    const plantType = await service.getPlantTypeById('123');

    expect(plantType).toBeNull();
  });
});

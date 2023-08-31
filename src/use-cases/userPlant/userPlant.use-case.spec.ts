import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { UserPlantUseCases } from './userPlant.use-case';
import { PrismaService } from '../../frameworks/data-services/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserPlantUseCasesService', () => {
  let service: UserPlantUseCases;
  let databaseService: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPlantUseCases,
        { provide: PrismaService, useValue: mockDeep<PrismaService>() },
      ],
    }).compile();

    service = module.get<UserPlantUseCases>(UserPlantUseCases);
    databaseService = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('GET by id should return null if does not exist', async () => {
    databaseService.userPlant.findUnique.mockResolvedValueOnce(null);
    const userPlant = await service.getUserPlantById('123');

    expect(userPlant).toBeNull();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../frameworks/data-services/prisma.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { UserPlantNotesUseCases } from './userPlantNotes.use-case';

describe('UserPlantNotesUseCasesService', () => {
  let service: UserPlantNotesUseCases;
  let databaseService: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPlantNotesUseCases,
        {
          provide: PrismaService,
          useValue: mockDeep<PrismaService>(),
        },
      ],
    }).compile();

    service = module.get<UserPlantNotesUseCases>(UserPlantNotesUseCases);
    databaseService = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(databaseService).toBeDefined();
  });

  it('GetById should return null if does not exist', async () => {
    databaseService.userPlantNote.findUnique.mockResolvedValueOnce(null);
    const userPlantNote = await service.getUserPlantNoteById('123', '123');

    expect(userPlantNote).toBeNull();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UserPlantNotesFactoryService } from './userPlantNotes-factory.service';
import { CreateUserPlantNoteDto } from '../../core/dtos/userPlantNotes.dto';
import { UserPlantNotes } from '../../core/entities/userPlantNotes.entity';

describe('UserPlantNotesFactoryService', () => {
  let service: UserPlantNotesFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPlantNotesFactoryService],
    }).compile();

    service = module.get<UserPlantNotesFactoryService>(
      UserPlantNotesFactoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generat a UserPlantNote', () => {
    const userPlantNoteDto = new CreateUserPlantNoteDto();
    const ID_UserPlant = 'Test';

    userPlantNoteDto.note = 'Testing';
    userPlantNoteDto.date = new Date();

    const userPlantNote = service.createNewUserPlantNote(
      ID_UserPlant,
      userPlantNoteDto,
    );

    expect(userPlantNote).toBeInstanceOf(UserPlantNotes);
    expect(userPlantNote.ID_UserPlant).toBe(ID_UserPlant);
  });
});

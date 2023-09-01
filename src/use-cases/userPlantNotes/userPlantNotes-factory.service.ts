import { Injectable } from '@nestjs/common';
import { UserPlantNotes } from '../../core/entities/userPlantNotes.entity';
import { CreateUserPlantNoteDto } from 'src/core/dtos/userPlantNotes.dto';

@Injectable()
export class UserPlantNotesFactoryService {
  createNewUserPlantNote(
    ID_UserPlant: string,
    createUserPlantNoteDto: CreateUserPlantNoteDto,
  ): UserPlantNotes {
    const newUserPlantNote = new UserPlantNotes();

    newUserPlantNote.ID_UserPlant = ID_UserPlant;
    newUserPlantNote.date = createUserPlantNoteDto.date;
    newUserPlantNote.note = createUserPlantNoteDto.note;

    return newUserPlantNote;
  }
}

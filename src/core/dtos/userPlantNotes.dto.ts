import { PartialType } from '@nestjs/mapped-types';
import { UserPlantNotes } from '../entities/userPlantNotes.entity';

export class CreateUserPlantNoteDto {
  date: Date;
  note: string;
}

export class UpdateUserPlantNoteDto extends PartialType(
  CreateUserPlantNoteDto,
) {}

export class GetUserPlantNoteResponseDto {
  success: boolean;
  plantNote: UserPlantNotes;
}

export class CreateUserPlantNoteResponseDto extends GetUserPlantNoteResponseDto {}

export class GetUserPlantNotesResponseDto {
  success: boolean;
  plantNotes: UserPlantNotes[];
}

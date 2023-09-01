import { Injectable } from '@nestjs/common';
import { UserPlantNotes } from '../../core/entities/userPlantNotes.entity';
import { PrismaService } from '../../frameworks/data-services/prisma.service';

@Injectable()
export class UserPlantNotesUseCases {
  constructor(private dataService: PrismaService) {}

  async getUserPlantNoteById(
    id: string,
    ID_user: string,
  ): Promise<UserPlantNotes | null> {
    const userPlantNote = await this.dataService.userPlantNote.findUnique({
      where: { ID_UserPlantNote: id },
      include: {
        userPlant: {
          select: {
            ID_User: true,
          },
        },
      },
    });

    if (userPlantNote?.userPlant.ID_User !== ID_user) {
      return null;
    }

    return userPlantNote;
  }

  async getUserPlantNotesByUser(user: string): Promise<UserPlantNotes[]> {
    return await this.dataService.userPlantNote.findMany({
      where: {
        userPlant: {
          ID_User: user,
        },
      },
      include: {
        userPlant: false,
      },
    });
  }

  async getUserPlantNotesByUserPlant(
    userPlant: string,
    ID_user: string,
  ): Promise<UserPlantNotes[] | null> {
    const userPlantNote = await this.dataService.userPlantNote.findMany({
      where: {
        userPlant: {
          ID_UserPLant: userPlant,
        },
      },
      include: {
        userPlant: {
          select: {
            ID_User: true,
          },
        },
      },
    });

    if (
      userPlantNote.length > 0 &&
      userPlantNote[0].userPlant.ID_User !== ID_user
    ) {
      return null;
    }

    return userPlantNote;
  }

  async createUserPlantNote(
    userPlantNote: UserPlantNotes,
  ): Promise<UserPlantNotes | null> {
    if (
      userPlantNote.note.length === 0 ||
      userPlantNote.date.getTime() - new Date().getTime() > 10 * 60 * 1000
    ) {
      return null;
    }

    const createdUserPlantNote = await this.dataService.userPlantNote.create({
      data: {
        note: userPlantNote.note,
        date: userPlantNote.date,
        userPlant: {
          connect: { ID_UserPLant: userPlantNote.ID_UserPlant },
        },
      },
      include: {
        userPlant: false,
      },
    });

    return createdUserPlantNote;
  }
}

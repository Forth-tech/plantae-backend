import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  CreateUserPlantNoteDto,
  CreateUserPlantNoteResponseDto,
  GetUserPlantNoteResponseDto,
  GetUserPlantNotesResponseDto,
} from 'src/core/dtos/userPlantNotes.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { UserPlantNotesFactoryService } from 'src/use-cases/userPlantNotes/userPlantNotes-factory.service';
import { UserPlantNotesUseCases } from 'src/use-cases/userPlantNotes/userPlantNotes.use-case';

@Controller('/user/plant')
export class UserPlantController {
  constructor(
    private userPlantNotesUseCase: UserPlantNotesUseCases,
    private userPlantNotesFactory: UserPlantNotesFactoryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/note/:id')
  async getUserPlantNoteById(@Param('id') id: string, @Req() req) {
    const getUserPlantNoteResponse = new GetUserPlantNoteResponseDto();

    try {
      const userPlantNote =
        await this.userPlantNotesUseCase.getUserPlantNoteById(id, req.user.id);

      if (!userPlantNote) {
        getUserPlantNoteResponse.success = false;
      } else {
        getUserPlantNoteResponse.success = true;
        getUserPlantNoteResponse.plantNote = userPlantNote;
      }
    } catch (error) {
      getUserPlantNoteResponse.success = false;
    }

    return getUserPlantNoteResponse;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/note')
  async getUserPlantNoteByUser(
    @Req() req,
  ): Promise<GetUserPlantNotesResponseDto> {
    const getUserPlantNoteResponse = new GetUserPlantNotesResponseDto();

    try {
      const userPlantNote =
        await this.userPlantNotesUseCase.getUserPlantNotesByUser(req.user.id);

      getUserPlantNoteResponse.success = true;
      getUserPlantNoteResponse.plantNotes = userPlantNote;
    } catch (error) {
      getUserPlantNoteResponse.success = false;
    }

    return getUserPlantNoteResponse;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/note')
  async getUserPlantNoteByUserPlant(
    @Param('id') id: string,
    @Req() req,
  ): Promise<GetUserPlantNotesResponseDto> {
    const getUserPlantNoteResponse = new GetUserPlantNotesResponseDto();

    try {
      const userPlantNote =
        await this.userPlantNotesUseCase.getUserPlantNotesByUserPlant(
          id,
          req.user.id,
        );

      if (!userPlantNote) {
        getUserPlantNoteResponse.success = false;
      } else {
        getUserPlantNoteResponse.success = true;
        getUserPlantNoteResponse.plantNotes = userPlantNote;
      }
    } catch (error) {
      getUserPlantNoteResponse.success = false;
    }

    return getUserPlantNoteResponse;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/note')
  async createUserPlantNote(
    @Param('id') id: string,
    @Body() body: CreateUserPlantNoteDto,
    @Req() req,
  ) {
    const createUserPlantNoteResponse = new CreateUserPlantNoteResponseDto();

    try {
      const userPlantNoteFact =
        await this.userPlantNotesFactory.createNewUserPlantNote(id, body);
      const userPlantNote =
        await this.userPlantNotesUseCase.createUserPlantNote(userPlantNoteFact);
      if (!userPlantNote) {
        createUserPlantNoteResponse.success = false;
      } else {
        createUserPlantNoteResponse.success = true;
        createUserPlantNoteResponse.plantNote = userPlantNote;
      }
    } catch (error) {
      createUserPlantNoteResponse.success = false;
    }
    return createUserPlantNoteResponse;
  }
}

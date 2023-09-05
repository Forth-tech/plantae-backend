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
import {
  CreateUserPlantWateringDto,
  CreateUserPlantWateringResponseDto,
  GetUserPlantWateringsResponseDto,
} from 'src/core/dtos/userPlantWatering.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { UserPlantNotesFactoryService } from 'src/use-cases/userPlantNotes/userPlantNotes-factory.service';
import { UserPlantNotesUseCases } from 'src/use-cases/userPlantNotes/userPlantNotes.use-case';
import { UserPlantWateringFactoryService } from 'src/use-cases/userPlantWatering/userPlantWatering.factory';
import { UserPlantWateringUseCases } from 'src/use-cases/userPlantWatering/userPlantWatering.use-case';

@Controller('/user/plant')
export class UserPlantController {
  constructor(
    private userPlantNotesUseCase: UserPlantNotesUseCases,
    private userPlantNotesFactory: UserPlantNotesFactoryService,
    private userPlantWateringUseCase: UserPlantWateringUseCases,
    private userPlantWateringFactory: UserPlantWateringFactoryService,
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
        this.userPlantNotesFactory.createNewUserPlantNote(id, body);
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

  @UseGuards(JwtAuthGuard)
  @Get('/:id/watering')
  async getUserPlantWaterings(@Param('id') id: string, @Req() req) {
    const getUserPlantWateringResponse = new GetUserPlantWateringsResponseDto();

    try {
      const userPlantWatering =
        await this.userPlantWateringUseCase.getUserPlantWateringByUserPlant(
          id,
          req.user.id,
        );
      if (userPlantWatering) {
        getUserPlantWateringResponse.success = true;
        getUserPlantWateringResponse.plantWaterings = userPlantWatering;
      } else {
        getUserPlantWateringResponse.success = false;
      }
    } catch (error) {
      getUserPlantWateringResponse.success = false;
    }

    return getUserPlantWateringResponse;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/watering')
  async createUserPlantWatering(
    @Param('id') id: string,
    @Body() body: CreateUserPlantWateringDto,
    @Req() req,
  ) {
    const createUserPlantWateringResponse =
      new CreateUserPlantWateringResponseDto();

    try {
      const userPlantWatering =
        this.userPlantWateringFactory.createNewUserPlantWatering(id, body);
      const createdUserPlantWatering =
        await this.userPlantWateringUseCase.createUserPlantWatering(
          userPlantWatering,
        );
      if (createdUserPlantWatering) {
        createUserPlantWateringResponse.success = true;
        createUserPlantWateringResponse.plantWatering =
          createdUserPlantWatering;
      } else {
        createUserPlantWateringResponse.success = false;
      }
    } catch (error) {
      createUserPlantWateringResponse.success = false;
    }

    return createUserPlantWateringResponse;
  }
}

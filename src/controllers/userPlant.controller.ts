import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  CreateUserPlantImageResponseDto,
  GetUserPlantImageResponseDto,
} from 'src/core/dtos/userPlantImage.dto';
import {
  CreateUserPlantNoteDto,
  CreateUserPlantNoteResponseDto,
  GetUserPlantNoteResponseDto,
  GetUserPlantNotesResponseDto,
} from 'src/core/dtos/userPlantNotes.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { UserPlantImageUseCases } from 'src/use-cases/userPlantImage/userPlantImage.use-case';
import { UserPlantNotesFactoryService } from 'src/use-cases/userPlantNotes/userPlantNotes-factory.service';
import { UserPlantNotesUseCases } from 'src/use-cases/userPlantNotes/userPlantNotes.use-case';

@Controller('/user/plant')
export class UserPlantController {
  constructor(
    private userPlantNotesUseCase: UserPlantNotesUseCases,
    private userPlantNotesFactory: UserPlantNotesFactoryService,
    private userPlantImageUseCase: UserPlantImageUseCases,
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
  @Post('/:id/image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadPlantImage(
    @Param('id') id: string,
    @Req() req,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/jpeg' })],
      }),
    )
    image: Express.Multer.File,
  ) {
    const createPlantImageResponse = new CreateUserPlantImageResponseDto();

    try {
      const userPlantImage =
        await this.userPlantImageUseCase.uploadUserPlantImage(
          id,
          req.user.id,
          image,
        );
      if (userPlantImage) {
        createPlantImageResponse.success = true;
        createPlantImageResponse.plantImage = userPlantImage;
      } else {
        createPlantImageResponse.success = false;
      }
    } catch (error) {
      createPlantImageResponse.success = false;
    }
    return createPlantImageResponse;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/image')
  async getPlantImages(@Param('id') id: string, @Req() req) {
    const getUserPlantImages = new GetUserPlantImageResponseDto();

    try {
      const userPlantImage =
        await this.userPlantImageUseCase.getUserPlantImagesByPlantId(
          id,
          req.user.id,
        );
      if (userPlantImage) {
        getUserPlantImages.success = true;
        getUserPlantImages.plantImages = userPlantImage;
      } else {
        getUserPlantImages.success = false;
      }
    } catch (error) {
      getUserPlantImages.success = false;
    }
    return getUserPlantImages;
  }
}

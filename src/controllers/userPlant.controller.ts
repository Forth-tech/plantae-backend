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
} from '../core/dtos/userPlantImage.dto';
import {
  CreateUserPlantNoteDto,
  CreateUserPlantNoteResponseDto,
  GetUserPlantNoteResponseDto,
  GetUserPlantNotesResponseDto,
} from '../core/dtos/userPlantNotes.dto';
import {
  CreateUserPlantWateringDto,
  CreateUserPlantWateringResponseDto,
  GetUserPlantWateringsResponseDto,
} from '../core/dtos/userPlantWatering.dto';
import { JwtAuthGuard } from '../core/guards/jwt-auth.guard';
import { UserPlantImageUseCases } from '../use-cases/userPlantImage/userPlantImage.use-case';
import { UserPlantNotesFactoryService } from '../use-cases/userPlantNotes/userPlantNotes-factory.service';
import { UserPlantNotesUseCases } from '../use-cases/userPlantNotes/userPlantNotes.use-case';
import { UserPlantWateringFactoryService } from '../use-cases/userPlantWatering/userPlantWatering.factory';
import { UserPlantWateringUseCases } from '../use-cases/userPlantWatering/userPlantWatering.use-case';
import {
  CreateUserPlantNutritionDto,
  CreateUserPlantNutritionResponseDto,
  GetUserPlantNutritionsResponseDto,
} from 'src/core/dtos/userPlantNutrition.dto';
import { UserPlantNutritionUseCases } from 'src/use-cases/userPlantNutrition/userPlantNutrition.use-case';
import { UserPlantNutritionFactoryService } from 'src/use-cases/userPlantNutrition/userPlantNutrition.factory';

@Controller('/user/plant')
export class UserPlantController {
  constructor(
    private userPlantNotesUseCase: UserPlantNotesUseCases,
    private userPlantNotesFactory: UserPlantNotesFactoryService,
    private userPlantImageUseCase: UserPlantImageUseCases,
    private userPlantWateringUseCase: UserPlantWateringUseCases,
    private userPlantWateringFactory: UserPlantWateringFactoryService,
    private userPlantNutritionUseCase: UserPlantNutritionUseCases,
    private userPlantNutritionFactory: UserPlantNutritionFactoryService,
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

  @Get('/:id/nutrition')
  async getUserPlantNutritions(@Param('id') id: string, @Req() req) {
    const getUserPlantNutritionResponse =
      new GetUserPlantNutritionsResponseDto();

    try {
      const userPlantNutrition =
        await this.userPlantNutritionUseCase.getUserPlantNutritionByUserPlant(
          id,
          req.user.id,
        );
      if (userPlantNutrition) {
        getUserPlantNutritionResponse.success = true;
        getUserPlantNutritionResponse.plantNutritions = userPlantNutrition;
      } else {
        getUserPlantNutritionResponse.success = false;
      }
    } catch (error) {
      getUserPlantNutritionResponse.success = false;
    }

    return getUserPlantNutritionResponse;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/nutrition')
  async createUserPlantNutrition(
    @Param('id') id: string,
    @Body() body: CreateUserPlantNutritionDto,
    @Req() req,
  ) {
    const createUserPlantNutritionResponse =
      new CreateUserPlantNutritionResponseDto();

    try {
      const userPlantNutrition =
        this.userPlantNutritionFactory.createNewUserPlantNutrition(id, body);
      const createdUserPlantNutrition =
        await this.userPlantNutritionUseCase.createUserPlantNutrition(
          userPlantNutrition,
        );
      if (createdUserPlantNutrition) {
        createUserPlantNutritionResponse.success = true;
        createUserPlantNutritionResponse.plantNutrition =
          createdUserPlantNutrition;
      } else {
        createUserPlantNutritionResponse.success = false;
      }
    } catch (error) {
      createUserPlantNutritionResponse.success = false;
    }

    return createUserPlantNutritionResponse;
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { IAuthServices } from '../core/abstracts/auth-services.abstract';
import {
  CreateUserDto,
  CreateUserResponseDto,
  LoginUserDto,
  LoginUserResponseDto,
} from '../core/dtos/user.dto';
import {
  CreateUserPlantDto,
  CreateUserPlantResponseDto,
  GetUserPlantByIdResponseDto,
  GetUserPlantsResponseDto,
} from '../core/dtos/userPlant.dto';
import { JwtAuthGuard } from '../core/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../core/guards/local-auth.guard';
import { UserFactoryService } from '../use-cases/user/user-factory.service';
import { UserUseCases } from '../use-cases/user/user.use-case';
import { UserPlantFactoryService } from '../use-cases/userPlant/userPlant-factory.service';
import { UserPlantUseCases } from '../use-cases/userPlant/userPlant.use-case';

@Controller('/user')
export class UserController {
  constructor(
    private userUseCases: UserUseCases,
    private userFactoryService: UserFactoryService,
    private userPlantUseCases: UserPlantUseCases,
    private userPlantFactoryService: UserPlantFactoryService,
    private authService: IAuthServices,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getById(@Request() req) {
    return this.userUseCases.getUserById(req.user.id);
  }

  @Post()
  async createUser(
    @Body() userDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    const createUserResponse = new CreateUserResponseDto();

    try {
      const user = await this.userFactoryService.createNewUser(userDto);
      const createdUser = await this.userUseCases.createUser(user);

      createUserResponse.success = true;
      createUserResponse.user = createdUser;
    } catch (error) {
      createUserResponse.success = false;
    }

    return createUserResponse;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Body() body: LoginUserDto,
    @Request() req,
  ): Promise<LoginUserResponseDto> {
    const loginUserRespon = new LoginUserResponseDto();

    try {
      const { access_token } = await this.authService.login(req.user);
      loginUserRespon.user = req.user;
      loginUserRespon.success = true;
      loginUserRespon.access_token = access_token;
    } catch (error) {
      loginUserRespon.success = false;
    }
    return loginUserRespon;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/plant')
  async createUserPlant(
    @Body() body: CreateUserPlantDto,
    @Request() req,
  ): Promise<CreateUserPlantResponseDto> {
    const createUserPlantResponse = new CreateUserPlantResponseDto();

    try {
      const userPlant = this.userPlantFactoryService.createNewUserPlant(
        req.user.id,
        body,
      );
      const createdUserPlant = await this.userPlantUseCases.createPlantType(
        userPlant,
      );

      createUserPlantResponse.success = true;
      createUserPlantResponse.userPlant = createdUserPlant;
    } catch (error) {
      createUserPlantResponse.success = false;
    }

    return createUserPlantResponse;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/plant/:id')
  async getUserPlantById(
    @Param('id') id: string,
    @Request() req,
  ): Promise<GetUserPlantByIdResponseDto> {
    const getPlantUserResponse = new GetUserPlantByIdResponseDto();

    try {
      const userPlant = await this.userPlantUseCases.getUserPlantById(id);

      if (!userPlant || userPlant?.ID_User === req.user.id) {
        getPlantUserResponse.success = false;
      } else {
        getPlantUserResponse.success = true;
        getPlantUserResponse.userPlant = userPlant;
      }
    } catch (error) {
      getPlantUserResponse.success = false;
    }

    return getPlantUserResponse;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/plant')
  async getUserPlants(@Request() req): Promise<GetUserPlantsResponseDto> {
    const getPlantUserResponse = new GetUserPlantsResponseDto();

    try {
      const userPlant = await this.userPlantUseCases.getUserPlants(req.user.id);

      getPlantUserResponse.success = true;
      getPlantUserResponse.userPlants = userPlant;
    } catch (error) {
      getPlantUserResponse.success = false;
    }

    return getPlantUserResponse;
  }
}

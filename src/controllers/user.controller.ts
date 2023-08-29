import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { IAuthServices } from 'src/core/abstracts/auth-services.abstract';
import {
  CreateUserDto,
  CreateUserResponseDto,
  LoginUserDto,
  LoginUserResponseDto,
} from 'src/core/dtos/user.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/core/guards/local-auth.guard';
import { UserFactoryService } from 'src/use-cases/user/user-factory.service';
import { UserUseCases } from 'src/use-cases/user/user.use-case';

@Controller('/user')
export class UserController {
  constructor(
    private userUseCases: UserUseCases,
    private userFactoryService: UserFactoryService,
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
}

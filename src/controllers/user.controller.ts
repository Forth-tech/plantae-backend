import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  CreateUserDto,
  CreateUserResponseDto,
  LoginUserDto,
  LoginUserResponseDto,
} from 'src/core/dtos/user.dto';
import { LocalAuthGuard } from 'src/core/guards/local-auth.guard';
import { UserFactoryService } from 'src/use-cases/user/user-factory.service';
import { UserUseCases } from 'src/use-cases/user/user.use-case';

@Controller('/user')
export class UserController {
  constructor(
    private userUseCases: UserUseCases,
    private userFactoryService: UserFactoryService,
  ) {}

  @Get(':id')
  async getById(@Param('id') id: any) {
    return this.userUseCases.getUserById(id);
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
      loginUserRespon.user = req.user;
      loginUserRespon.success = true;
    } catch (error) {
      loginUserRespon.success = false;
    }
    return loginUserRespon;
  }
}

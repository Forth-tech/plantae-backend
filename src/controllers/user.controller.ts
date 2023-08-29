import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto, CreateUserResponseDto } from 'src/core/dtos/user.dto';
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
}

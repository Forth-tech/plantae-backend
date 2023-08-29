import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { CreateUserDto } from 'src/core/dtos/user.dto';
import { User } from 'src/core/entities/user.entity';

@Injectable()
export class UserFactoryService {
  async createNewUser(createUserDto: CreateUserDto) {
    const newUser = new User();

    newUser.email = createUserDto.email;
    newUser.firstName = createUserDto.firstName;
    newUser.lastName = createUserDto.lastName;

    newUser.hash = await genSalt();
    newUser.hashedPass = await hash(createUserDto.password, newUser.hash);

    return newUser;
  }
}

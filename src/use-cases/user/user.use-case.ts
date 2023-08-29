import { Injectable } from '@nestjs/common';
import { IAuthServices } from 'src/core/abstracts/auth-services.abstract';
import { User } from 'src/core/entities/user.entity';
import { PrismaService } from 'src/frameworks/data-services/prisma.service';

@Injectable()
export class UserUseCases {
  constructor(
    private dataServices: PrismaService,
    private authServices: IAuthServices,
  ) {}

  getUserById(id: any): Promise<User> {
    return this.dataServices.user.findUnique({ where: { id: id } });
  }

  getUserByEmail(email: string): Promise<User> {
    return this.dataServices.user.findUnique({ where: { email: email } });
  }

  async createUser(user: User): Promise<User> {
    const createdUser = await this.dataServices.user.create({ data: user });

    return createdUser;
  }

  updateUser(userId: string, user: User): Promise<User> {
    return this.dataServices.user.update({ where: { id: userId }, data: user });
  }

  async login(user: User, password: string): Promise<User | null> {
    try {
      const loggedIn = await this.authServices.validateUser(
        user.hashedPass,
        password,
      );

      if (loggedIn) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
}

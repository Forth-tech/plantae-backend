import { Injectable } from '@nestjs/common';
import { User } from 'src/core/entities/user.entity';
import { PrismaService } from 'src/frameworks/data-services/prisma.service';

@Injectable()
export class UserUseCases {
  constructor(private dataServices: PrismaService) {}

  getUserById(id: any): Promise<User> {
    return this.dataServices.user.findUnique({ where: { id: id } });
  }

  async createUser(user: User): Promise<User> {
    const createdUser = await this.dataServices.user.create({ data: user });

    return createdUser;
  }

  updateUser(userId: string, user: User): Promise<User> {
    return this.dataServices.user.update({ where: { id: userId }, data: user });
  }
}

import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { IAuthServices } from 'src/core/abstracts/auth-services.abstract';
import { PrismaService } from 'src/frameworks/data-services/prisma.service';

@Injectable()
export class PassportService implements IAuthServices {
  constructor(private dataService: PrismaService) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.dataService.user.findUnique({
      where: { email: username },
    });
    if (await compare(password, user.hashedPass)) {
      const { hashedPass, hash, ...result } = user;
      return result;
    }
    return null;
  }
}

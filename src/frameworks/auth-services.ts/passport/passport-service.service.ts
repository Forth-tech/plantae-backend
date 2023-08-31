import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { IAuthServices } from 'src/core/abstracts/auth-services.abstract';
import { PrismaService } from 'src/frameworks/data-services/prisma.service';

@Injectable()
export class PassportService implements IAuthServices {
  constructor(
    private dataService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.dataService.user.findUnique({
      where: { email: username },
    });
    if (user && (await compare(password, user.hashedPass))) {
      const { hashedPass, hash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any): Promise<any> {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

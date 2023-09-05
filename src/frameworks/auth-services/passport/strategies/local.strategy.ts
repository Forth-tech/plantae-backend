import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthServices } from 'src/core/abstracts/auth-services.abstract';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: IAuthServices) {
    super({ usernameField: 'email' });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

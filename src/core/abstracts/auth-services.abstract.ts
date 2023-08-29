export abstract class IAuthServices {
  abstract validateUser(hashPassword: string, password: string): Promise<boolean>;

  abstract login(user: any): Promise<any>;
}

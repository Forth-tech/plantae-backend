export abstract class IAuthServices {
  abstract validateUser(hashPassword: string, password: string): Promise<boolean>;
}

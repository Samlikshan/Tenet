import bcrypt from "bcrypt";
import { IBcryptProvider } from "../../domain/interfaces/services/IBcryptProvider";
import { injectable } from "inversify";

@injectable()
export class BcryptProvider implements IBcryptProvider {
  private readonly bcryptSaltRound: number;

  constructor() {
    this.bcryptSaltRound = Number(process.env.BCRYPT_SALT_ROUND) as number;
  }

  hash(string: string): Promise<string> {
    return bcrypt.hash(string, this.bcryptSaltRound);
  }

  compare(stringA: string, stringB: string): Promise<boolean> {
    return bcrypt.compare(stringA, stringB);
  }
}

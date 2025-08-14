import { inject, injectable } from "inversify";
import { IUserRepository } from "../../domain/interfaces/respositories/IUserRepository";
import TYPES from "../../infrastructure/types";
import { IBcryptProvider } from "../../domain/interfaces/services/IBcryptProvider";

@injectable()
export class RegisterUserUseCase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(TYPES.IBcryptService) private bcryptService: IBcryptProvider,
  ) {}
  async execute(username: string, email: string, password: string) {
    const isExistingEmail = await this.userRepository.findByEmail(email);

    if (isExistingEmail) {
      throw new Error("Email already exisit");
    }
    const hashedPassword = await this.bcryptService.hash(password);
    await this.userRepository.create(username, email, hashedPassword);
    return { message: "Registration Successfull" };
  }
}

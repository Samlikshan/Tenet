import { inject, injectable } from "inversify";
import { IUserRepository } from "../../domain/interfaces/respositories/IUserRepository";
import TYPES from "../../infrastructure/types";
import { IBcryptProvider } from "../../domain/interfaces/services/IBcryptProvider";
import { IJwtService } from "../../domain/interfaces/services/IJwtService";

@injectable()
export class LoginUserUseCase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(TYPES.IBcryptService) private bcryptService: IBcryptProvider,
    @inject(TYPES.IJwtService) private jwtService: IJwtService,
  ) {}
  async execute(
    email: string,
    password: string,
  ): Promise<{ message: string; accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findUser(email);

    if (!user) {
      throw new Error("User not found");
    }

    const isPassword = await this.bcryptService.compare(
      password,
      user.password,
    );

    if (!isPassword) {
      throw new Error("Invalid Cred");
    }

    const accessToken = this.jwtService.generateAccessToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });

    const refreshToken = this.jwtService.generateRefreshToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });

    return { message: "Successfull", accessToken, refreshToken };
  }
}

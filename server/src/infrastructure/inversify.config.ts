import TYPES from "./types";
import AuthController from "../presentation/controllers/Auth/AuthController";
import { Container } from "inversify";
import { IUserRepository } from "../domain/interfaces/respositories/IUserRepository";
import { UserRepository } from "./prisma/Repository/UserRepository";
import { RegisterUserUseCase } from "../application/auth/RegisterUserUseCase";
import { BcryptProvider } from "./externalServices/BcryptProvider";
import { LoginUserUseCase } from "../application/auth/LoginUserUseCase";
import { JwtService } from "./externalServices/JwtProvider";
import { AuthMiddleware } from "../presentation/middlewares/authMiddleware";

const container = new Container();

container
  .bind<IUserRepository>(TYPES.IUserRepository)
  .to(UserRepository)
  .inSingletonScope();

container
  .bind<LoginUserUseCase>(TYPES.LoginUserUseCase)
  .to(LoginUserUseCase)
  .inSingletonScope();

container
  .bind<RegisterUserUseCase>(TYPES.RegisterUserUseCase)
  .to(RegisterUserUseCase)
  .inSingletonScope();

container
  .bind<AuthController>(TYPES.AuthController)
  .to(AuthController)
  .inSingletonScope();

container.bind<JwtService>(TYPES.IJwtService).to(JwtService).inSingletonScope();

container
  .bind<BcryptProvider>(TYPES.IBcryptService)
  .to(BcryptProvider)
  .inSingletonScope();

container
  .bind<AuthMiddleware>(TYPES.IAuthMiddleware)
  .to(AuthMiddleware)
  .inSingletonScope();

export { container };

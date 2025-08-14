import { NextFunction, Request, Response } from "express";
import { RegisterUserUseCase } from "../../../application/auth/RegisterUserUseCase";
import { inject, injectable } from "inversify";
import TYPES from "../../../infrastructure/types";
import { LoginUserUseCase } from "../../../application/auth/LoginUserUseCase";

@injectable()
export default class AuthController {
  constructor(
    @inject(TYPES.RegisterUserUseCase)
    private registerUserUseCase: RegisterUserUseCase,
    @inject(TYPES.LoginUserUseCase) private loginUserUseCase: LoginUserUseCase,
  ) {}

  async register(req: Request, res: Response, next: NextFunction) {
    const { username, email, password } = req.body;

    try {
      const response = await this.registerUserUseCase.execute(
        username,
        email,
        password,
      );

      res.status(200).json({ message: response.message });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const { message, accessToken, refreshToken } =
        await this.loginUserUseCase.execute(email, password);

      const isProduction = process.env.NODE_ENV === "production";

      if (accessToken) {
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: isProduction,
          sameSite: "strict",
          maxAge: 15 * 60 * 1000,
        });
      }

      if (refreshToken) {
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: isProduction,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
      }

      res.status(200).json({ message, accessToken });
    } catch (error) {
      next(error);
    }
  }
}

import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IJwtService } from "../../domain/interfaces/services/IJwtService";
import TYPES from "../../infrastructure/types";

@injectable()
export class AuthMiddleware {
  private readonly accessTokenSecret: string;

  constructor(@inject(TYPES.IJwtService) private jwtService: IJwtService) {
    this.accessTokenSecret = process.env.JWT_ACCESS_SECRET as string;
  }

  validateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken } = req.cookies;

      if (!accessToken) {
        return res.status(401).json({ message: "Forbidden access" });
      }

      this.jwtService.verifyToken(accessToken, this.accessTokenSecret);

      //const decoded = this.jwtService.decode(accessToken);

      next();
    } catch {
      return res.status(403).json({ message: "Forbidden access" });
    }
  }
}

import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../../entities/User";

export interface IJwtService {
  generateAccessToken(user: Pick<IUser, "id" | "email" | "username">): string;
  generateRefreshToken(user: Pick<IUser, "id" | "email" | "username">): string;
  verifyToken(token: string, tokenSecret: string): string | JwtPayload;
  decode(token: string): string | JwtPayload;
}

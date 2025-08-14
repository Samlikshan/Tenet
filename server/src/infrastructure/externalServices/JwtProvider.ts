import JWT, { JwtPayload, SignOptions } from "jsonwebtoken";
import { IJwtService } from "../../domain/interfaces/services/IJwtService";
import { IUser } from "../../domain/entities/User";
import { injectable } from "inversify";

@injectable()
export class JwtService implements IJwtService {
  private readonly accessTokenSecret: string;
  private readonly refreshTokenSecret: string;

  constructor() {
    this.accessTokenSecret = process.env.JWT_ACCESS_SECRET as string;
    this.refreshTokenSecret = process.env.JWT_REFRESH_SECRET as string;
  }

  generateAccessToken(user: Pick<IUser, "id" | "email" | "username">): string {
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    const options: SignOptions = {
      expiresIn: "15m",
    };

    return JWT.sign(payload, this.accessTokenSecret, options);
  }

  generateRefreshToken(user: Pick<IUser, "id" | "email" | "username">): string {
    return JWT.sign(
      { id: user.id, email: user.email, username: user.username },
      this.refreshTokenSecret,
      { expiresIn: "7d" },
    );
  }

  verifyToken(token: string, secret: string): string | JwtPayload {
    return JWT.verify(token, secret);
  }

  decode(token: string): string | JwtPayload {
    return JWT.decode(token);
  }
}

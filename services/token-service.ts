import jwt from "jsonwebtoken";
import {
  JWT_ACCESS_TOKEN_SECRET as accessTokenSecret,
  JWT_REFRESH_TOKEN_SECRET as refreshTokenSecret,
} from "../utils";

interface IPayload {
  _id: object;
  isArtist: boolean;
}

class TokenService {
  generateTokens(payload: IPayload) {
    const accessToken = jwt.sign(payload, accessTokenSecret as string, {
      expiresIn: "60s",
    });

    const refreshToken = jwt.sign(payload, refreshTokenSecret as string, {
      expiresIn: "1y",
    });

    return { accessToken, refreshToken };
  }
}

export default new TokenService();

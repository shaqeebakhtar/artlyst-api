import jwt from "jsonwebtoken";
import {
  JWT_ACCESS_TOKEN_SECRET as accessTokenSecret,
  JWT_REFRESH_TOKEN_SECRET as refreshTokenSecret,
} from "../config";
import { TokenModel } from "../models";
import ErrorService from "./error-service";

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

  verifyAccessToken(token: string) {
    return jwt.verify(token, accessTokenSecret as string);
  }

  verifyRefreshToken(token: string) {
    return jwt.verify(token, refreshTokenSecret as string);
  }

  async storeRefreshToken(token: string, userId: object) {
    try {
      await TokenModel.create({ token, userId });
    } catch (error) {
      throw new Error();
    }
  }

  async findRefreshToken(token: string, userId: object) {
    try {
      return await TokenModel.findOne({ token, userId });
    } catch (error) {
      throw new Error();
    }
  }

  async updateRefreshToken(token: string, userId: object) {
    try {
      await TokenModel.findOneAndUpdate({ userId }, { token });
    } catch (error) {
      throw new Error();
    }
  }

  async deleteRefreshToken(token: string) {
    try {
      await TokenModel.deleteOne({ token });
    } catch (error) {
      throw new Error();
    }
  }
}

export default new TokenService();

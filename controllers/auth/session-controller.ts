import type { NextFunction, Request, Response } from "express";
import {
  ErrorService,
  hashService,
  tokenService,
  userService,
} from "../../services";
import { IUser } from "../../interfaces";

class SessionController {
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password }: IUser = req.body;

    if (!email || !password) {
      return next(ErrorService.validation("All fields are required"));
    }

    let user;
    try {
      // check if email exists
      user = await userService.findUser({ email });
      if (!user) {
        return next(ErrorService.wrongCredentials());
      }

      // check if password matches
      const match = await hashService.checkPassword(password, user.password);

      if (!match) {
        return next(ErrorService.wrongCredentials());
      }
    } catch (error) {
      return next(error);
    }

    // then generate tokens
    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id,
      isArtist: user.isArtist,
    });

    await tokenService.storeRefreshToken(refreshToken, user._id);

    res.cookie("access_token", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });

    res.cookie("refresh_token", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({ accessToken, refreshToken });
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    const { refreshToken: refreshTokenFromCookie } = req.cookies;

    if (!refreshTokenFromCookie) {
      return next(ErrorService.unauthorized("Invalid refresh token"));
    }

    // delete refresh token from db
    await tokenService.deleteRefreshToken(refreshTokenFromCookie);

    // clear cookie in the web
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    res.status(200).json({ user: null });
  }
}

export default new SessionController();

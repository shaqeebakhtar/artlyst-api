import type { NextFunction, Request, Response } from "express";
import { ErrorService, tokenService, userService } from "../../services";
import { JwtPayload } from "jsonwebtoken";
import { UserDto } from "../../dtos";

class RefreshController {
  async refersh(req: Request, res: Response, next: NextFunction) {
    const { refreshToken: refreshTokenFromCookie } = req.cookies;

    // verify refresh token
    let userData;
    try {
      userData = tokenService.verifyRefreshToken(
        refreshTokenFromCookie
      ) as JwtPayload;
    } catch (error) {
      return next(ErrorService.unauthorized("Invalid refresh token"));
    }

    // check if token in db
    try {
      const token = await tokenService.findRefreshToken(
        refreshTokenFromCookie,
        userData._id
      );
      if (!token) {
        return next(ErrorService.unauthorized("Invalid refresh token"));
      }
    } catch (error) {
      return next(error);
    }

    // check if user is in db
    let user;
    try {
      user = await userService.findUser({ _id: userData._id });
      if (!user) {
        return next(ErrorService.notFound("User not found"));
      }
    } catch (error) {
      return next(error);
    }

    // generate new tokens
    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: userData._id,
      isArtist: userData.isArtist,
    });

    // update the new tokens in db
    await tokenService.updateRefreshToken(refreshToken, userData._id);

    // set back the new tokens
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

    const userDto = new UserDto(user);
    res.status(200).json({ userDto });
  }
}

export default new RefreshController();

import type { Response, NextFunction } from "express";
import { ErrorService, tokenService } from "../services";
import { JwtPayload } from "jsonwebtoken";

const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  // check if accessToken is in req
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return next(ErrorService.unauthorized());
  }

  try {
    // verify the accessToken
    const userData = tokenService.verifyAccessToken(accessToken) as JwtPayload; // returns { _id, isArtist }
    if (!userData) {
      return next(ErrorService.unauthorized());
    }

    // set user data in the request
    req.user = userData;

    next();
  } catch (error) {
    return next(error);
  }
};

export default authMiddleware;

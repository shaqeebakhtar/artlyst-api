import { Response, NextFunction } from "express";
import { ErrorService, tokenService } from "../services";

const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  // check if accessToken is in req
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return next(ErrorService.unauthorized());
  }

  try {
    // verify the accessToken
    const userData = tokenService.verifyAccessToken(accessToken); // returns { _id, isArtist }
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

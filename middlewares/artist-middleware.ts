import type { Response, NextFunction } from "express";
import { ErrorService } from "../services";

const artistMiddleware = (req: any, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(ErrorService.accessForbidden());
  }

  next();
};

export default artistMiddleware;

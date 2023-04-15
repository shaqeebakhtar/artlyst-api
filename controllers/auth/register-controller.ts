import type { Request, Response, NextFunction } from "express";
import ErrorService from "../../services/error-service";
interface IUser {
  name: string;
  email: string;
  password: string;
}

class RegisterController {
  async register(req: Request, res: Response, next: NextFunction) {
    // else create the user
    // generate jwt tokens

    // verify request
    const { name, email, password }: IUser = req.body;

    if (!name || !email || !password) {
      return next(ErrorService.validation("all fields are required"));
    }

    // check if user is already present in the db
    try {
    } catch (error) {
      return next(error);
    }

    return res.status(200).json({ message: "user created successfully" });
  }
}

export default new RegisterController();

import type { Request, Response, NextFunction } from "express";
import ErrorService from "../../services/error-service";
import userService from "../../services/user-service";
import UserDto from "../../dtos/user-dto";
interface IUser {
  name: string;
  email: string;
  password: string;
  isArtist?: boolean;
}

class RegisterController {
  async register(req: Request, res: Response, next: NextFunction) {
    // verify request
    const { name, email, password }: IUser = req.body;

    if (!name || !email || !password) {
      return next(ErrorService.validation("all fields are required"));
    }

    // check if user is already present in the db
    let user;
    try {
      user = await userService.findUser({ email });

      if (!user) {
        // else create the user
        user = await userService.createUser({ name, email, password });
      }
    } catch (error) {
      return next(error);
    }

    // generate jwt tokens
    const userDto = new UserDto(user);
    res.status(200).json(userDto);
  }
}

export default new RegisterController();

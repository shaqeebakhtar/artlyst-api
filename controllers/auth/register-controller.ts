import type { Request, Response, NextFunction } from "express";
import { ErrorService } from "../../services";
import { userService } from "../../services";
import { UserDto } from "../../dtos";
import bcrypt from "bcrypt";
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
      return next(ErrorService.validation("All fields are required"));
    }

    // check if user is already present in the db
    try {
      const exists = await userService.alreadyExists({ email });
      if (exists) {
        return next(ErrorService.alreadyExists("Email already in use"));
      }
    } catch (error) {
      return next(error);
    }

    // hash the password
    const hashedPass = await bcrypt.hash(password, 10);

    // else create a new user
    let user;
    try {
      user = await userService.createUser({
        name,
        email,
        password: hashedPass,
      });
    } catch (error) {
      return next(error);
    }

    // generate jwt tokens
    const userDto = new UserDto(user);
    res.status(200).json(userDto);
  }
}

export default new RegisterController();

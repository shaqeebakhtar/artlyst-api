import type { Request, Response, NextFunction } from "express";
import {
  ErrorService,
  userService,
  hashService,
  tokenService,
} from "../../services";
import { UserDto } from "../../dtos";
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
    const hashedPass = await hashService.hashPassword(password);

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

    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id,
      isArtist: user.isArtist,
    });

    // generate jwt tokens
    const userDto = new UserDto(user);
    res.status(200).json({ accessToken, refreshToken });
  }
}

export default new RegisterController();

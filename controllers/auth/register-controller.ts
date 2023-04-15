import { Request, Response } from "express";

interface IUser {
  name: string;
  email: string;
  password: string;
}

class RegisterController {
  register(req: Request, res: Response) {
    const { name, email, password }: IUser = req.body;

    if (!name || !email || !password) {
      res.status(422).json({ message: "all fields are required!" });
    }

    res.status(200).json({ message: "user created successfully" });
  }
}

export default new RegisterController();

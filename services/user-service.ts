import { IUser, IUserFilter } from "../interfaces";
import { UserModel } from "../models";

class UserService {
  async createUser(data: IUser) {
    const user = await UserModel.create(data);
    return user;
  }

  async findUser(filter: IUserFilter) {
    const user = await UserModel.findOne(filter);
    return user;
  }

  async alreadyExists(filter: IUserFilter) {
    const user = await UserModel.exists(filter);
    return user;
  }
}

export default new UserService();

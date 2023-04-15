import UserModel from "../models/user-model";
interface IUser {
  name: string;
  email: string;
  password: string;
  isArtist?: boolean;
}
interface IUserFilter {
  name?: string;
  email?: string;
}

class UserService {
  async createUser(data: IUser) {
    const user = await UserModel.create(data);
    return user;
  }

  async findUser(filter: IUserFilter) {
    const user = await UserModel.findOne(filter);
    return user;
  }
}

export default new UserService();

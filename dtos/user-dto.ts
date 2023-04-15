interface IUser {
  _id: object;
  name: string;
  email: string;
  password: string;
  isArtist?: boolean;
}

class UserDto {
  id;
  name;
  email;
  isArtist;
  constructor(user: IUser) {
    this.id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.isArtist = user.isArtist;
  }
}

export default UserDto;

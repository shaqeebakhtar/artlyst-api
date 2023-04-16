class ErrorService extends Error {
  status: number;
  constructor(status: number, msg: string) {
    super();
    this.status = status;
    this.message = msg;
  }

  static validation(message: string) {
    return new ErrorService(422, message);
  }

  static alreadyExists(message: string) {
    return new ErrorService(409, message);
  }

  static wrongCredentials(message: string = "Email or password is incorrect") {
    return new ErrorService(401, message);
  }
}

export default ErrorService;

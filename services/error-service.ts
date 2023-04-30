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

  static unauthorized(message: string = "You are not authorized to access") {
    return new ErrorService(401, message);
  }

  static accessForbidden(message: string = "You don't have right permissions") {
    return new ErrorService(403, message);
  }

  static notFound(message: string) {
    return new ErrorService(404, message);
  }

  static serverError(message: string = "Internal server error") {
    return new ErrorService(500, message);
  }
}

export default ErrorService;

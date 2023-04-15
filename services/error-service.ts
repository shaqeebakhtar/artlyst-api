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
}

export default ErrorService;

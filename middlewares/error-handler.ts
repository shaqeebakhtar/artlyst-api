import { ErrorRequestHandler } from "express";
import { DEBUG_MODE } from "../utils";
import ErrorService from "../services/error-service";

interface IErrorData {
  message: string;
  originalError?: string;
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode: number = 500;
  let errorData: IErrorData = {
    message: "internal server error",
    ...(DEBUG_MODE === "true" && { originalError: err.message }),
  };

  if (err instanceof ErrorService) {
    statusCode = err.status;
    errorData = {
      message: err.message,
    };
  }

  return res.status(statusCode).json(errorData);
};

export default errorHandler;
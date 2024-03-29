import { ErrorRequestHandler } from "express";
import { DEBUG_MODE } from "../config";
import { ErrorService } from "../services";
import { IErrorData } from "../interfaces";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode: number = 500;
  let errorData: IErrorData = {
    message: "Internal server error",
    ...(DEBUG_MODE === "true" && { originalError: err.message }),
  };

  if (err instanceof ErrorService) {
    statusCode = err.status;
    errorData = {
      message: err.message,
    };
  }

  if (err instanceof Error) {
    errorData = {
      message: err.message,
    };
  }

  return res.status(statusCode).json(errorData);
};

export default errorHandler;

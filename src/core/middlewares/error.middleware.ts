import { NextFunction, Request, Response } from "express";
import { HTTPStatusCodes } from "../constants";
import { ResponseModel } from "../models/response.model";
import { unknownExceptionHandler } from "../utilities/exception_handler";
import { datetimeString, stringifyJson } from "../utilities/utilities";

export const errorMiddleware = (
  error: ResponseModel,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`🕒 ${datetimeString()} 🚀 Error: logging`, stringifyJson(error));
  try {
    res.status(error.status || HTTPStatusCodes.INTERNAL_SERVER_ERROR).json(error);
  } catch (error) {
    res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json(unknownExceptionHandler());
  }
};

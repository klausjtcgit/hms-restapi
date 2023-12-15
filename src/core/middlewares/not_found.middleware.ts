import { NextFunction, Request, Response } from "express";
import { ErrorTypes } from "../constants";
import { HTTPStatusCodes } from "../constants";
import { DefaultException } from "../exceptions/default_exception";
import { ResponseModel } from "../models/response.model";

export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const error: ResponseModel = new ResponseModel({
      success: false,
      status: HTTPStatusCodes.NOT_FOUND,
      result: {
        errors: [
          new DefaultException({
            type: ErrorTypes.NOT_FOUND,
            message: `The requested route (${req.originalUrl}) could not be found in the system.`,
            details: {
              suggestions: [
                "check the method used [GET, POST, PATCH, PUT, DELETE, ...]",
                `check for spelling error on the url='${req.originalUrl}'`,
              ],
            },
          }),
        ],
      },
    });

    next(error);
  } catch (error) {
    next(error);
  }
};

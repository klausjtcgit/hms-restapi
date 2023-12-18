import { NextFunction, Request, Response } from "express";
import { isEmpty } from "../utilities/utilities";
import {
  unauthenticatedExceptionHandler,
  unauthorizedExceptionHandler,
} from "../utilities/exception_handler";
import jwt, { Secret } from "jsonwebtoken";
import { TOKEN_KEY } from "../configuration";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const accessToken =
      req.body.accessToken ||
      req.query.accessToken ||
      req.headers["authorization"]?.split(" ")[1] ||
      req.headers["x-access-token"];

    if (isEmpty(accessToken)) unauthorizedExceptionHandler();
    else {
      const decoded = jwt.verify(accessToken, TOKEN_KEY as Secret);

      req.body["$decoded"] = decoded;
      next();
    }
  } catch (error) {
    unauthenticatedExceptionHandler(
      "❗ Expired or invalid accessToken was given. please provide the correct access token or login again and try."
    );
  }
};

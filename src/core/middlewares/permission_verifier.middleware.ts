import { NextFunction, Request, Response } from "express";
import {
  globalExceptionHandler,
  unauthorizedExceptionHandler,
} from "../utilities/exception_handler";
import { EmployeePermissions } from "../constants";
import jwt, { Secret } from "jsonwebtoken";
import { TOKEN_KEY } from "../configuration";
import { IEmployee } from "../../resources/employees/models/employee.model";

export const permissionVerifierMiddleware = (requiredPermissions: EmployeePermissions[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const accessToken =
        req.body.accessToken ||
        req.query.accessToken ||
        req.headers["authorization"]?.split(" ")[1] ||
        req.headers["x-access-token"];

      const decoded = jwt.verify(accessToken, TOKEN_KEY as Secret) as IEmployee;
      const notPermitted: EmployeePermissions[] = [];

      requiredPermissions.forEach((requiredPermission: EmployeePermissions) => {
        if (!decoded.permissions.includes(requiredPermission))
          notPermitted.push(requiredPermission);
      });

      if (notPermitted.length === 0) next();
      else {
        unauthorizedExceptionHandler(
          `❗ Current logged-in employee [name='${decoded.firstName} ${decoded.lastName}', _id: '${decoded._id}'] don't have all the required permission to perform and access this resource.`,
          { notPermitted }
        );
      }
    } catch (error) {
      globalExceptionHandler(error, next);
    }
  };
};

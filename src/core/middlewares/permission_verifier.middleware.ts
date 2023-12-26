import { NextFunction, Request, Response } from "express";
import {
  globalExceptionHandler,
  unauthorizedExceptionHandler,
} from "../utilities/exception_handler";
import { EmployeePermissions } from "../constants";

export const permissionVerifierMiddleware = (requiredPermissions: EmployeePermissions[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const decoded = req.body.$decoded;
      const notPermitted: EmployeePermissions[] = [];

      requiredPermissions.forEach((requiredPermission: EmployeePermissions) => {
        if (!decoded.permissions.includes(requiredPermission))
          notPermitted.push(requiredPermission);
      });

      if (notPermitted.length === 0) next();
      else {
        unauthorizedExceptionHandler(
          `❗ Current logged-in employee [name='${req.body.$decoded.firstName} ${req.body.$decoded.lastName}', _id: '${req.body.$decoded._id}'] don't have all the required permission to perform and access this resource.`,
          { notPermitted }
        );
      }
    } catch (error) {
      globalExceptionHandler(error, next);
    }
  };
};

import { NextFunction, Request, Response } from "express";
import {
  globalExceptionHandler,
  unauthorizedExceptionHandler,
} from "../utilities/exception_handler";
import { EEmployeePermission } from "../../resources/employees/models/employee.model";

export const permissionVerifierMiddleware = (requiredPermissions: EEmployeePermission[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const decoded = req.body.$decoded;
      const notPermitted: EEmployeePermission[] = [];

      requiredPermissions.forEach((requiredPermission: EEmployeePermission) => {
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

import { NextFunction, Request, Response } from "express";
import { ErrorTypes, HTTPStatusCodes } from "../../../core/constants";
import { ResponseModel } from "../../../core/models/response.model";
import { IEmployee } from "../models/employee.model";
import { EmployeeService } from "../services/employee.service";
import {
  globalExceptionHandler,
  unknownExceptionHandler,
  validationExceptionHandler,
} from "../../../core/utilities/exception_handler";
import { isEmpty } from "../../../core/utilities/utilities";
import { ValidationException } from "../../../core/exceptions/validation_exception";

export class EmployeeController {
  public employeeService = new EmployeeService();

  public registerEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee: IEmployee = await this.employeeService.create(req.body as IEmployee);

      if (employee) {
        res.status(201).json(
          new ResponseModel({
            success: true,
            status: HTTPStatusCodes.CREATED,
            result: { data: { insertedEmployee: employee, _id: employee._id } },
          })
        );
      } else {
        unknownExceptionHandler("employee");
      }
    } catch (error) {
      globalExceptionHandler(error, next);
    }
  };

  public findEmployees = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employees: IEmployee[] = await this.employeeService.find(req.query);

      res.status(200).json(
        new ResponseModel({
          success: true,
          status: HTTPStatusCodes.OK,
          result: { data: { employees: employees } },
        })
      );
    } catch (error) {
      globalExceptionHandler(error, next);
    }
  };

  public findEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee: IEmployee = await this.employeeService.findById(
        req.params._id?.toString() ?? ""
      );

      res.status(200).json(
        new ResponseModel({
          success: true,
          status: HTTPStatusCodes.OK,
          result: { data: { employee: employee } },
        })
      );
    } catch (error) {
      globalExceptionHandler(error, next);
    }
  };

  public findEmployeeByIds = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (typeof req.query._ids === "undefined") {
        validationExceptionHandler([
          new ValidationException({
            type: ErrorTypes.MISSING_DATA,
            field: "request.query._ids",
            message: "Missing required field: '_ids'",
            value: req.query._ids,
          }),
        ]);
      } else {
        const _ids: string[] = [];

        if (Array.isArray(req.query._ids)) {
          req.query._ids.forEach((_id: any) => {
            _ids.push(_id.toString());
          });
        } else _ids.push(req.query._ids.toString());

        const employees: IEmployee[] = await this.employeeService.findByIds(_ids);

        res.status(200).json(
          new ResponseModel({
            success: true,
            status: HTTPStatusCodes.OK,
            result: { data: { employees: employees } },
          })
        );
      }
    } catch (error) {
      globalExceptionHandler(error, next);
    }
  };

  // TODO write separate controller for password & code updater with higher permission.
  // TODO write another controller to updated many employees at once
  public updateEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee: IEmployee = await this.employeeService.updateById(
        req.params._id?.toString() ?? "",
        req.body
      );

      res.status(200).json(
        new ResponseModel({
          success: true,
          status: HTTPStatusCodes.OK,
          result: { data: { employee: employee } },
        })
      );
    } catch (error) {
      globalExceptionHandler(error, next);
    }
  };
}

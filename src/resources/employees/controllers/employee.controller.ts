import { NextFunction, Request, Response } from "express";
import { HTTPStatusCodes } from "../../../core/constants";
import { ResponseModel } from "../../../core/models/response.model";
import { IEmployee } from "../models/employee.model";
import { EmployeeService } from "../services/employee.service";
import {
  globalExceptionHandler,
  unknownExceptionHandler,
} from "../../../core/utilities/exception_handler";
import { queryToMongoQuery } from "../../../core/utilities/conversion_helpers";

export class EmployeeController {
  public employeeService = new EmployeeService();

  public registerEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee: IEmployee = await this.employeeService.create({
        ...req.body,
        createdBy: req.body.employee__id,
      } as IEmployee);
      const { code, password, ...sanitizedEmployee } = employee.toObject();

      if (employee) {
        res.status(201).json(
          new ResponseModel({
            success: true,
            status: HTTPStatusCodes.CREATED,
            result: { data: { insertedEmployee: sanitizedEmployee, _id: employee._id } },
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
      const employees: IEmployee[] = await this.employeeService.find(queryToMongoQuery(req.query));

      const sanitizedEmployees: any[] = employees.map((employee: IEmployee) => {
        const { code, password, ...sanitizedEmployee } = employee.toObject();
        return sanitizedEmployee;
      });

      res.status(200).json(
        new ResponseModel({
          success: true,
          status: HTTPStatusCodes.OK,
          result: {
            data: {
              length: employees.length,
              employees: sanitizedEmployees,
            },
          },
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
      const { code, password, ...sanitizedEmployee } = employee.toObject();

      res.status(200).json(
        new ResponseModel({
          success: true,
          status: HTTPStatusCodes.OK,
          result: { data: { employee: sanitizedEmployee } },
        })
      );
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
        { ...req.body, updatedBy: req.body.employee__id }
      );
      const { code, password, ...sanitizedEmployee } = employee.toObject();

      res.status(200).json(
        new ResponseModel({
          success: true,
          status: HTTPStatusCodes.OK,
          result: { data: { employee: sanitizedEmployee } },
        })
      );
    } catch (error) {
      globalExceptionHandler(error, next);
    }
  };
}

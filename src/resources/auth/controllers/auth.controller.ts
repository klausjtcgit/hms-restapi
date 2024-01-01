import { NextFunction, Request, Response } from "express";
import { HTTPStatusCodes } from "../../../core/constants";
import { ResponseModel } from "../../../core/models/response.model";
import {
  globalExceptionHandler,
  validationExceptionHandler,
} from "../../../core/utilities/exception_handler";
import { IEmployee } from "../../employees/models/employee.model";
import { AuthService } from "../services/auth.service";
import { ValidationException } from "../../../core/exceptions/validation_exception";
import { ErrorTypes } from "../../../core/constants";
import { isEmpty } from "../../../core/utilities/utilities";

export class AuthController {
  public authService = new AuthService();

  public simpleLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.code) {
        const result: { employee: IEmployee; accessToken: string } =
          await this.authService.simpleLogin(req.body.code as string);

        res.status(200).json(
          new ResponseModel({
            success: true,
            status: HTTPStatusCodes.OK,
            result: {
              data: {
                employee: { ...result.employee, password: "********", code: "*****" },
                accessToken: result.accessToken,
              },
            },
          })
        );
      } else
        validationExceptionHandler([
          new ValidationException({
            type: ErrorTypes.MISSING_DATA,
            message: `Missing required field: 'code'`,
            field: "request.body.code",
            value: req.body.code,
          }),
        ]);
    } catch (error) {
      globalExceptionHandler(error, next);
    }
  };

  public advanceLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const invalids: ValidationException[] = [];

      if (isEmpty(req.body.password))
        invalids.push(
          new ValidationException({
            type: ErrorTypes.MISSING_DATA,
            message: `Missing required field: 'password'`,
            field: "request.body.password",
            value: req.body.password,
          })
        );

      if (isEmpty(req.body.phone))
        invalids.push(
          new ValidationException({
            type: ErrorTypes.MISSING_DATA,
            message: `Missing required field: 'phone'`,
            field: "request.body.phone",
            value: req.body.phone,
          })
        );

      if (invalids.length === 0) {
        const result: { employee: IEmployee; accessToken: string } =
          await this.authService.advanceLogin({
            phone: req.body.phone,
            password: req.body.password,
          });

        res.status(200).json(
          new ResponseModel({
            success: true,
            status: HTTPStatusCodes.OK,
            result: {
              data: {
                employee: { ...result.employee, password: "********", code: "*****" },
                accessToken: result.accessToken,
              },
            },
          })
        );
      } else validationExceptionHandler(invalids);
    } catch (error) {
      globalExceptionHandler(error, next);
    }
  };

  public somethingSecure = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(
        new ResponseModel({
          success: true,
          status: HTTPStatusCodes.OK,
          result: { data: { verified: "👍", decoded: req.body.employee__id } },
        })
      );
    } catch (error) {
      globalExceptionHandler(error, next);
    }
  };
}

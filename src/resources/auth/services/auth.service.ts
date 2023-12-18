import { IAuthService } from "../../../core/interfaces/auth_service.interface";
import {
  notFoundExceptionHandler,
  unauthenticatedExceptionHandler,
} from "../../../core/utilities/exception_handler";
import jwt, { Secret } from "jsonwebtoken";
import { EmployeeModel, IEmployee } from "../../employees/models/employee.model";
import { TOKEN_KEY } from "../../../core/configuration";

export class AuthService implements IAuthService {
  simpleLogin = async (code: string): Promise<{ employee: IEmployee; accessToken: string }> => {
    {
      const employee = await EmployeeModel.findOne({ code });

      if (!employee) notFoundExceptionHandler("employee", { code: code });
      else {
        let accessToken: string = jwt.sign(employee.toObject(), TOKEN_KEY as Secret, {
          expiresIn: "6hr",
        });

        return {
          employee: employee,
          accessToken: accessToken,
        };
      }
    }
  };

  advanceLogin = async ({
    phone,
    password,
  }: {
    phone: string;
    password: string;
  }): Promise<{ employee: IEmployee; accessToken: string }> => {
    {
      const employee = await EmployeeModel.findOne({ phone });

      if (!employee) notFoundExceptionHandler("employee", { phone: phone });
      else {
        if (!(await employee.matchPassword(password)))
          unauthenticatedExceptionHandler(
            "❌ Incorrect password was received. please provide the correct password 🙂."
          );
        else {
          const accessToken: string = jwt.sign(employee.toObject(), TOKEN_KEY as Secret, {
            expiresIn: "6hr",
          });

          return {
            employee: employee,
            accessToken: accessToken,
          };
        }
      }
    }
  };

  //   TODO implement this feature before production. PLEASE 🙏
  changePassword = async (_id: string, newPassword: string): Promise<IEmployee> => {
    {
      const employee = await EmployeeModel.findById(_id);

      if (!employee) notFoundExceptionHandler("employee", { _id: _id });
      else return employee;
    }
  };
}

import { IEmployee } from "../../resources/employees/models/employee.model";

export interface IAuthService {
  simpleLogin: (code: string) => Promise<{
    employee: IEmployee;
    accessToken: string;
  }>;

  advanceLogin: ({
    phone,
    password,
  }: {
    phone: string;
    password: string;
  }) => Promise<{
    employee: IEmployee;
    accessToken: string;
  }>;

  changePassword: (_id: string, newPassword: string) => Promise<IEmployee>;
}

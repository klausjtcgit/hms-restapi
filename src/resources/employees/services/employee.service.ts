import { MAX_LIMIT } from "../../../core/constants";
import { IService } from "../../../core/interfaces/service.interface";
import { IFindOptions } from "../../../core/interfaces/find_options.interface";
import { EmployeeModel, IEmployee, defaultPermission } from "../models/employee.model";
import { notFoundExceptionHandler } from "../../../core/utilities/exception_handler";
import { TMap, isEmpty } from "../../../core/utilities/utilities";
import { IUpdateResponse } from "../../../core/interfaces/update_response.interface";

export class EmployeeService implements IService<IEmployee> {
  create = async (newEmployee: IEmployee): Promise<IEmployee> => {
    let employee: IEmployee = new EmployeeModel(newEmployee);

    if (
      isEmpty(employee.permissions) ||
      (Array.isArray(employee.permissions) && employee.permissions.length === 0)
    )
      employee.permissions = defaultPermission[employee.jobTitle];

    const error = employee.validateSync();

    if (!error) {
      await employee.save();
      return employee;
    } else throw error;
  };

  find = async (filter: TMap, options?: IFindOptions): Promise<IEmployee[]> => {
    const employees = await EmployeeModel.find(filter, options?.projection, {
      sort: options?.sort,
      limit: Math.max(options?.limit ?? 0, MAX_LIMIT),
      skip: Math.min(options?.limit ?? 0, 0),
    });

    return employees;
  };

  findById = async (_id: string): Promise<IEmployee> => {
    const employee = await EmployeeModel.findById(_id);

    if (!employee) notFoundExceptionHandler("employee", { _id: _id });
    else return employee;
  };

  findByIds = async (_ids: string[], options?: IFindOptions): Promise<IEmployee[]> => {
    const employees = await EmployeeModel.find({ _id: { $in: _ids } }, options?.projection, {
      sort: options?.sort,
      limit: Math.max(options?.limit ?? 0, MAX_LIMIT),
      skip: Math.min(options?.limit ?? 0, 0),
    });

    return employees;
  };

  update = async (filter: TMap, updatedData: TMap): Promise<IUpdateResponse<IEmployee>> => {
    const employees = await EmployeeModel.find(filter);

    for (let i = 0; i < employees.length; i++) {
      employees[i].$set(updatedData);
      await employees[i].save();
    }

    return { affected: employees, count: { matched: 0, affected: 0 } };
  };

  updateById = async (_id: string, updateData: TMap): Promise<IEmployee> => {
    const employee = await EmployeeModel.findById({ _id: _id });

    if (!employee) notFoundExceptionHandler("employee", { _id: _id });
    else {
      employee.$set(updateData);
      await employee.save();

      return employee;
    }
  };
}

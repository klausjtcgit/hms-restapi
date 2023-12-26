import { Router } from "express";
import { IRoute } from "../../../core/interfaces/routes.interface";
import { EmployeeController } from "../controllers/employee.controller";
import { authMiddleware } from "../../../core/middlewares/auth.middleware";
import { permissionVerifierMiddleware } from "../../../core/middlewares/permission_verifier.middleware";
import { EmployeePermissions } from "../../../core/constants";

export class EmployeeRoute implements IRoute {
  public path = "";
  public router = Router();
  public employeesController = new EmployeeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/`,
      authMiddleware,
      permissionVerifierMiddleware([EmployeePermissions.registerEmployee]),
      this.employeesController.registerEmployee
    );
    this.router.get(
      [`${this.path}/`, `${this.path}/_ids/`],
      this.employeesController.findEmployees
    );
    this.router.get(`${this.path}/_id/:_id/`, this.employeesController.findEmployeeById);
    this.router.patch(
      `${this.path}/:_id/`,
      authMiddleware,
      permissionVerifierMiddleware([
        EmployeePermissions.updateEmployeeInfo,
        EmployeePermissions.updateEmployeePermissions,
      ]),
      this.employeesController.updateEmployeeById
    );
  }
}

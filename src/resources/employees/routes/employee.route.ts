import { Router } from "express";
import { IRoute } from "../../../core/interfaces/routes.interface";
import { EmployeeController } from "../controllers/employee.controller";

export class EmployeeRoute implements IRoute {
  public path = "";
  public router = Router();
  public employeesController = new EmployeeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/`, this.employeesController.registerEmployee);
    this.router.get(`${this.path}/`, this.employeesController.findEmployees);
    this.router.get(`${this.path}/_ids/`, this.employeesController.findEmployeeByIds);
    this.router.get(`${this.path}/:_id/`, this.employeesController.findEmployeeById);
    this.router.patch(`${this.path}/:_id/`, this.employeesController.updateEmployeeById);
  }
}

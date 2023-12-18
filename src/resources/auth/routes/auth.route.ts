import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { IRoute } from "../../../core/interfaces/routes.interface";
import { authMiddleware } from "../../../core/middlewares/auth.middleware";
import { permissionVerifierMiddleware } from "../../../core/middlewares/permission_verifier.middleware";
import { EEmployeePermission } from "../../employees/models/employee.model";

export class AuthRoute implements IRoute {
  public path = "";
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login/`, this.authController.simpleLogin);
    this.router.post(`${this.path}/login/simple/`, this.authController.simpleLogin);
    this.router.post(`${this.path}/login/advance/`, this.authController.advanceLogin);
    this.router.post(
      `${this.path}/somethingSecure/`,
      authMiddleware,
      permissionVerifierMiddleware([EEmployeePermission.verifyPayment]),
      this.authController.somethingSecure
    );
  }
}

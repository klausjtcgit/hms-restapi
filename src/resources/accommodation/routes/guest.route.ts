import { Router } from "express";
import { IRoute } from "../../../core/interfaces/routes.interface";
import { GuestController } from "../controllers/guest.controller";
import { authMiddleware } from "../../../core/middlewares/auth.middleware";
import { permissionVerifierMiddleware } from "../../../core/middlewares/permission_verifier.middleware";
import { EmployeePermissions } from "../../../core/constants";

export class GuestRoute implements IRoute {
  public path = "/guests";
  public router = Router();
  public guestsController = new GuestController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/`,
      authMiddleware,
      permissionVerifierMiddleware([EmployeePermissions.registerGuest]),
      this.guestsController.registerGuest
    );
    this.router.get([`${this.path}/`, `${this.path}/_ids/`], this.guestsController.findGuests);
    this.router.get(`${this.path}/_id/:_id/`, this.guestsController.findGuestById);
    this.router.patch(
      `${this.path}/:_id/`,
      authMiddleware,
      permissionVerifierMiddleware([EmployeePermissions.updateGuestInfo]),
      this.guestsController.updateGuestById
    );
  }
}

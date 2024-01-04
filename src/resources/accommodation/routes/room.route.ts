import { Router } from "express";
import { IRoute } from "../../../core/interfaces/routes.interface";
import { RoomController } from "../controllers/room.controller";
import { authMiddleware } from "../../../core/middlewares/auth.middleware";
import { permissionVerifierMiddleware } from "../../../core/middlewares/permission_verifier.middleware";
import { EmployeePermissions } from "../../../core/constants";

export class RoomRoute implements IRoute {
  public path = "/rooms";
  public router = Router();
  public roomsController = new RoomController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/`,
      authMiddleware,
      permissionVerifierMiddleware([EmployeePermissions.createRoom]),
      this.roomsController.createRoom
    );
    this.router.get([`${this.path}/`, `${this.path}/_ids/`], this.roomsController.findRooms);
    this.router.get(`${this.path}/_id/:_id/`, this.roomsController.findRoomById);
    this.router.patch(
      `${this.path}/`,
      authMiddleware,
      permissionVerifierMiddleware([EmployeePermissions.updateRoomInfo]),
      this.roomsController.updateRooms
    );
    this.router.patch(
      `${this.path}/:_id/`,
      authMiddleware,
      permissionVerifierMiddleware([EmployeePermissions.updateRoomInfo]),
      this.roomsController.updateRoomById
    );
  }
}

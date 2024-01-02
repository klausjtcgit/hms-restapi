import { Router } from "express";
import { IRoute } from "../../../core/interfaces/routes.interface";
import { GuestRoute } from "./guest.route";

export class AccommodationIndexRoute implements IRoute {
  public path = "/accommodation";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(`${this.path}/`, new GuestRoute().router);
  }
}

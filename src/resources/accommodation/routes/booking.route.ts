import { Router } from "express";
import { IRoute } from "../../../core/interfaces/routes.interface";
import { BookingController } from "../controllers/booking.controller";
import { authMiddleware } from "../../../core/middlewares/auth.middleware";
import { permissionVerifierMiddleware } from "../../../core/middlewares/permission_verifier.middleware";
import { EmployeePermissions } from "../../../core/constants";

export class BookingRoute implements IRoute {
  public path = "/bookings";
  public router = Router();
  public bookingsController = new BookingController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/`,
      authMiddleware,
      permissionVerifierMiddleware([EmployeePermissions.bookingARoom]),
      this.bookingsController.bookingARoom
    );
    this.router.get([`${this.path}/`, `${this.path}/_ids/`], this.bookingsController.findBookings);
    this.router.get(`${this.path}/_id/:_id/`, this.bookingsController.findBookingById);
    this.router.patch(
      `${this.path}/`,
      authMiddleware,
      permissionVerifierMiddleware([EmployeePermissions.updateBookingInfo]),
      this.bookingsController.updateBookings
    );
    this.router.patch(
      `${this.path}/:_id/`,
      authMiddleware,
      permissionVerifierMiddleware([EmployeePermissions.updateBookingInfo]),
      this.bookingsController.updateBookingById
    );
  }
}

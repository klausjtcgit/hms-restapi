import { NextFunction, Request, Response } from "express";
import { HTTPStatusCodes } from "../../../core/constants";
import { ResponseModel } from "../../../core/models/response.model";
import { IBooking } from "../models/booking.model";
import { BookingService } from "../services/booking.service";
import {
  globalExceptionHandler,
  unknownExceptionHandler,
} from "../../../core/utilities/exception_handler";
import { queryToMongoQuery } from "../../../core/utilities/conversion_helpers";

export class BookingController {
  public bookingService = new BookingService();

  public bookingARoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const booking: IBooking = await this.bookingService.create({
        ...req.body,
        createdBy: req.body.employee__id,
      } as IBooking);

      if (booking) {
        res.status(201).json(
          new ResponseModel({
            success: true,
            status: HTTPStatusCodes.CREATED,
            result: { data: { insertedBooking: booking, _id: booking._id } },
          })
        );
      } else {
        unknownExceptionHandler("booking");
      }
    } catch (error) {
      globalExceptionHandler(error, next);
    }
  };

  public findBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookings: IBooking[] = await this.bookingService.find(queryToMongoQuery(req.query));

      res.status(200).json(
        new ResponseModel({
          success: true,
          status: HTTPStatusCodes.OK,
          result: {
            data: {
              length: bookings.length,
              bookings: bookings,
            },
          },
        })
      );
    } catch (error) {
      globalExceptionHandler(error, next);
    }
  };

  public findBookingById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const booking: IBooking = await this.bookingService.findById(
        req.params._id?.toString() ?? ""
      );

      res.status(200).json(
        new ResponseModel({
          success: true,
          status: HTTPStatusCodes.OK,
          result: { data: { booking: booking } },
        })
      );
    } catch (error) {
      globalExceptionHandler(error, next);
    }
  };

  public updateBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { rate, ...update } = req.body;

      const bookings = await this.bookingService.update(queryToMongoQuery(req.query), {
        ...update,
        updatedBy: req.body.employee__id,
        updatedAt: new Date(),
      });

      res.status(200).json(
        new ResponseModel({
          success: true,
          status: HTTPStatusCodes.OK,
          result: { data: { bookings: bookings } },
        })
      );
    } catch (error) {
      globalExceptionHandler(error, next);
    }
  };

  public updateBookingById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { rate, ...update } = req.body;

      const booking: IBooking = await this.bookingService.updateById(
        req.params._id?.toString() ?? "",
        {
          ...update,
          updatedBy: req.body.employee__id,
          updatedAt: new Date(),
        }
      );

      res.status(200).json(
        new ResponseModel({
          success: true,
          status: HTTPStatusCodes.OK,
          result: { data: { booking: booking } },
        })
      );
    } catch (error) {
      globalExceptionHandler(error, next);
    }
  };
}

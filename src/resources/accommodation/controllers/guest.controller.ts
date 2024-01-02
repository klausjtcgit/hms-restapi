import { NextFunction, Request, Response } from "express";
import { HTTPStatusCodes } from "../../../core/constants";
import { ResponseModel } from "../../../core/models/response.model";
import { IGuest } from "../models/guest.model";
import { GuestService } from "../services/guest.service";
import {
  globalExceptionHandler,
  unknownExceptionHandler,
} from "../../../core/utilities/exception_handler";
import { queryToMongoQuery } from "../../../core/utilities/conversion_helpers";

export class GuestController {
  public guestService = new GuestService();

  public registerGuest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const guest: IGuest = await this.guestService.create({
        ...req.body,
        createdBy: req.body.employee__id,
      } as IGuest);

      if (guest) {
        res.status(201).json(
          new ResponseModel({
            success: true,
            status: HTTPStatusCodes.CREATED,
            result: { data: { insertedGuest: guest, _id: guest._id } },
          })
        );
      } else {
        unknownExceptionHandler("guest");
      }
    } catch (error) {
      globalExceptionHandler(error, next);
    }
  };

  public findGuests = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const guests: IGuest[] = await this.guestService.find(queryToMongoQuery(req.query));

      res.status(200).json(
        new ResponseModel({
          success: true,
          status: HTTPStatusCodes.OK,
          result: {
            data: {
              length: guests.length,
              guests: guests,
            },
          },
        })
      );
    } catch (error) {
      globalExceptionHandler(error, next);
    }
  };

  public findGuestById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const guest: IGuest = await this.guestService.findById(req.params._id?.toString() ?? "");

      res.status(200).json(
        new ResponseModel({
          success: true,
          status: HTTPStatusCodes.OK,
          result: { data: { guest: guest } },
        })
      );
    } catch (error) {
      globalExceptionHandler(error, next);
    }
  };

  public updateGuestById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const guest: IGuest = await this.guestService.updateById(req.params._id?.toString() ?? "", {
        ...req.body,
        updatedBy: req.body.employee__id,
      });

      res.status(200).json(
        new ResponseModel({
          success: true,
          status: HTTPStatusCodes.OK,
          result: { data: { guest: guest } },
        })
      );
    } catch (error) {
      globalExceptionHandler(error, next);
    }
  };
}

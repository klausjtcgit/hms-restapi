import { NextFunction, Request, Response } from "express";
import { HTTPStatusCodes, RoomTypes } from "../../../core/constants";
import { ResponseModel } from "../../../core/models/response.model";
import { IRoom } from "../models/room.model";
import { RoomService } from "../services/room.service";
import {
  globalExceptionHandler,
  unknownExceptionHandler,
} from "../../../core/utilities/exception_handler";
import { queryToMongoQuery } from "../../../core/utilities/conversion_helpers";

export class RoomController {
  public roomService = new RoomService();

  public createRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const room: IRoom = await this.roomService.create({
        ...req.body,
        createdBy: req.body.employee__id,
      } as IRoom);

      if (room) {
        res.status(201).json(
          new ResponseModel({
            success: true,
            status: HTTPStatusCodes.CREATED,
            result: { data: { insertedRoom: room, _id: room._id } },
          })
        );
      } else {
        unknownExceptionHandler("room");
      }
    } catch (error) {
      globalExceptionHandler(error, next);
    }
  };

  public findRooms = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rooms: IRoom[] = await this.roomService.find(queryToMongoQuery(req.query));

      res.status(200).json(
        new ResponseModel({
          success: true,
          status: HTTPStatusCodes.OK,
          result: {
            data: {
              length: rooms.length,
              rooms: rooms,
            },
          },
        })
      );
    } catch (error) {
      globalExceptionHandler(error, next);
    }
  };

  public findRoomById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const room: IRoom = await this.roomService.findById(req.params._id?.toString() ?? "");

      res.status(200).json(
        new ResponseModel({
          success: true,
          status: HTTPStatusCodes.OK,
          result: { data: { room: room } },
        })
      );
    } catch (error) {
      globalExceptionHandler(error, next);
    }
  };

  public updateRooms = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rooms = await this.roomService.update(queryToMongoQuery(req.query), {
        ...req.body,
        updatedBy: req.body.employee__id,
        updatedAt: new Date(),
      });

      res.status(200).json(
        new ResponseModel({
          success: true,
          status: HTTPStatusCodes.OK,
          result: { data: { rooms: rooms } },
        })
      );
    } catch (error) {
      globalExceptionHandler(error, next);
    }
  };

  public updateRoomById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const room: IRoom = await this.roomService.updateById(req.params._id?.toString() ?? "", {
        ...req.body,
        updatedBy: req.body.employee__id,
        updatedAt: new Date(),
      });

      res.status(200).json(
        new ResponseModel({
          success: true,
          status: HTTPStatusCodes.OK,
          result: { data: { room: room } },
        })
      );
    } catch (error) {
      globalExceptionHandler(error, next);
    }
  };
}

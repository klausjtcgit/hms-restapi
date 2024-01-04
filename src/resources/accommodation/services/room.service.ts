import { MAX_LIMIT } from "../../../core/constants";
import { IService } from "../../../core/interfaces/service.interface";
import { RoomFilterModel, RoomModel, IRoom } from "../models/room.model";
import { notFoundExceptionHandler } from "../../../core/utilities/exception_handler";
import { TMap } from "../../../core/utilities/utilities";
import { IUpdateResponse } from "../../../core/interfaces/update_response.interface";
import { FindQueryModel } from "../../../core/models/find_query.model";

export class RoomService implements IService<IRoom> {
  create = async (newRoom: IRoom): Promise<IRoom> => {
    let room: IRoom = new RoomModel(newRoom);

    const error = room.validateSync();

    if (!error) {
      await room.save();
      return room;
    } else throw error;
  };

  find = async (query: FindQueryModel): Promise<IRoom[]> => {
    const rooms = await RoomModel.find(new RoomFilterModel(query.filter ?? {}).toMongoFilter())
      .limit(query.options?.limit ?? MAX_LIMIT)
      .skip(query.options?.skip ?? 0)
      .sort(query.options?.sort ?? {})
      .select(query.fields ?? {});

    return rooms;
  };

  findById = async (_id: string): Promise<IRoom> => {
    const room = await RoomModel.findById(_id);

    if (!room) notFoundExceptionHandler("room", { _id: _id });
    else return room;
  };

  update = async (query: FindQueryModel, updatedData: TMap): Promise<IUpdateResponse<IRoom>> => {
    const rooms = await RoomModel.find(new RoomFilterModel(query.filter ?? {}).toMongoFilter());
    let affectedCount: number = 0;

    for (let i = 0; i < rooms.length; i++) {
      rooms[i].$set(updatedData);
      if (
        Object.keys(rooms[i].getChanges().$set!).filter(
          (_) => _ !== "updatedAt" && _ !== "updatedBy"
        ).length
      ) {
        await rooms[i].save();
        affectedCount += 1;
      }
    }

    return { affected: rooms, count: { matched: rooms.length, affected: affectedCount } };
  };

  updateById = async (_id: string, updateData: TMap): Promise<IRoom> => {
    const room = await RoomModel.findById({ _id: _id });

    if (!room) notFoundExceptionHandler("room", { _id: _id });
    else {
      const _room = room;
      room.$set(updateData);
      if (
        Object.keys(room.getChanges().$set!).filter((_) => _ !== "updatedAt" && _ !== "updatedBy")
          .length
      ) {
        await room.save();
      }

      return room;
    }
  };
}

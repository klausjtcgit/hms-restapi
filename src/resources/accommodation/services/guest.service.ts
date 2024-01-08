import { MAX_LIMIT } from "../../../core/constants";
import { IService } from "../../../core/interfaces/service.interface";
import { GuestFilterModel, GuestModel, IGuest } from "../models/guest.model";
import { notFoundExceptionHandler } from "../../../core/utilities/exception_handler";
import { TMap } from "../../../core/utilities/utilities";
import { IUpdateResponse } from "../../../core/interfaces/update_response.interface";
import { FindQueryModel } from "../../../core/models/find_query.model";

export class GuestService implements IService<IGuest> {
  create = async (newGuest: IGuest): Promise<IGuest> => {
    let guest: IGuest = new GuestModel(newGuest);

    const error = guest.validateSync();

    if (!error) {
      await guest.save();
      return guest;
    } else throw error;
  };

  find = async (query: FindQueryModel): Promise<IGuest[]> => {
    const guests = await GuestModel.find(new GuestFilterModel(query.filter ?? {}).toMongoFilter())
      .limit(query.options?.limit ?? MAX_LIMIT)
      .skip(query.options?.skip ?? 0)
      .sort(query.options?.sort ?? {})
      .select(query.fields ?? {});

    return guests;
  };

  findById = async (_id: string): Promise<IGuest> => {
    const guest = await GuestModel.findById(_id);

    if (!guest) notFoundExceptionHandler("guest", { _id: _id });
    else return guest;
  };

  update = async (query: FindQueryModel, updatedData: TMap): Promise<IUpdateResponse<IGuest>> => {
    const guests = await GuestModel.find(new GuestFilterModel(query.filter ?? {}).toMongoFilter());
    let affectedCount: number = 0;

    for (let i = 0; i < guests.length; i++) {
      guests[i].$set(updatedData);
      if (
        Object.keys(guests[i].getChanges().$set!).filter(
          (_) => _ !== "updatedAt" && _ !== "updatedBy"
        ).length
      ) {
        await guests[i].save();
        affectedCount += 1;
      }
    }

    return { affected: guests, count: { matched: guests.length, affected: affectedCount } };
  };

  updateById = async (_id: string, updateData: TMap): Promise<IGuest> => {
    const guest = await GuestModel.findById({ _id: _id });

    if (!guest) notFoundExceptionHandler("guest", { _id: _id });
    else {
      const _guest = guest;
      guest.$set(updateData);
      if (
        Object.keys(guest.getChanges().$set!).filter((_) => _ !== "updatedAt" && _ !== "updatedBy")
          .length
      ) {
        await guest.save();
      }

      return guest;
    }
  };
}

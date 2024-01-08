import { MAX_LIMIT } from "../../../core/constants";
import { IService } from "../../../core/interfaces/service.interface";
import { BookingFilterModel, BookingModel, IBooking } from "../models/booking.model";
import { notFoundExceptionHandler } from "../../../core/utilities/exception_handler";
import { TMap } from "../../../core/utilities/utilities";
import { IUpdateResponse } from "../../../core/interfaces/update_response.interface";
import { FindQueryModel } from "../../../core/models/find_query.model";

export class BookingService implements IService<IBooking> {
  create = async (newBooking: IBooking): Promise<IBooking> => {
    let booking: IBooking = new BookingModel(newBooking);

    const error = booking.validateSync();

    if (!error) {
      await booking.save();
      return booking;
    } else throw error;
  };

  find = async (query: FindQueryModel): Promise<IBooking[]> => {
    const bookings = await BookingModel.find(
      new BookingFilterModel(query.filter ?? {}).toMongoFilter()
    )
      .limit(query.options?.limit ?? MAX_LIMIT)
      .skip(query.options?.skip ?? 0)
      .sort(query.options?.sort ?? {})
      .select(query.fields ?? {});

    return bookings;
  };

  findById = async (_id: string): Promise<IBooking> => {
    const booking = await BookingModel.findById(_id);

    if (!booking) notFoundExceptionHandler("booking", { _id: _id });
    else return booking;
  };

  update = async (query: FindQueryModel, updatedData: TMap): Promise<IUpdateResponse<IBooking>> => {
    const bookings = await BookingModel.find(
      new BookingFilterModel(query.filter ?? {}).toMongoFilter()
    );
    let affectedCount: number = 0;

    for (let i = 0; i < bookings.length; i++) {
      bookings[i].$set(updatedData);
      if (
        Object.keys(bookings[i].getChanges().$set!).filter(
          (_) => _ !== "updatedAt" && _ !== "updatedBy"
        ).length
      ) {
        await bookings[i].save();
        affectedCount += 1;
      }
    }

    return { affected: bookings, count: { matched: bookings.length, affected: affectedCount } };
  };

  updateById = async (_id: string, updateData: TMap): Promise<IBooking> => {
    const booking = await BookingModel.findById({ _id: _id });

    if (!booking) notFoundExceptionHandler("booking", { _id: _id });
    else {
      const _booking = booking;
      booking.$set(updateData);
      if (
        Object.keys(booking.getChanges().$set!).filter(
          (_) => _ !== "updatedAt" && _ !== "updatedBy"
        ).length
      ) {
        await booking.save();
      }

      return booking;
    }
  };
}

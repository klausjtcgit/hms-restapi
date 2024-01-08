import { Document, Model, Schema, Types, model } from "mongoose";
import { TMap, isEmpty, isUndefined } from "../../../core/utilities/utilities";
import { TFilterValue } from "../../../core/models/find_query.model";
import { MarketSources, MealPlans } from "../../../core/constants";
import { EmployeeModel } from "../../employees/models/employee.model";
import { GuestModel } from "./guest.model";
import { RoomModel } from "./room.model";

export interface IBooking extends Document {
  receptionId: Types.ObjectId;
  guestId: Types.ObjectId;
  payerId: Types.ObjectId;
  roomId: Types.ObjectId;
  bookedAt?: Date;
  occupiedDate: Date;
  checkIn: Date;
  checkOut?: Date;
  pax: number;
  rate: number;
  balance: number;
  mealPlan: MealPlans;
  mealPrice?: number;
  marketSource: MarketSources;
  commission?: Types.ObjectId;
  note?: string;
  updatedAt?: Date;
  updatedBy?: Types.ObjectId;
  deleted: boolean;
}

interface IBookingQueryHelpers {}
interface IBookingMethods {}
interface IBookingModel extends Model<IBooking, IBookingQueryHelpers, IBookingMethods> {}

const bookingSchema = new Schema<IBooking, IBookingModel, IBookingMethods, IBookingQueryHelpers>({
  receptionId: { type: Schema.Types.ObjectId, required: true, ref: EmployeeModel },
  guestId: { type: Schema.Types.ObjectId, required: true, ref: GuestModel },
  payerId: { type: Schema.Types.ObjectId, required: true, ref: GuestModel },
  roomId: { type: Schema.Types.ObjectId, required: true, ref: RoomModel },
  occupiedDate: { type: Date, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date },
  pax: { type: Number, required: true },
  rate: { type: Number, required: true },
  balance: { type: Number, required: true },
  mealPlan: { type: String, required: true, enum: Object.values(MealPlans) },
  mealPrice: { type: Number },
  marketSource: { type: String, required: true, enum: Object.values(MarketSources) },
  commission: { type: Schema.Types.ObjectId, ref: RoomModel },
  note: { type: String },
  bookedAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
  updatedBy: { type: Schema.Types.ObjectId, ref: EmployeeModel },
  deleted: { type: Boolean, default: false },
});

// TODO: added pre function that checks if guestId, roomId, employee with that _id really do exist

export const BookingModel = model<IBooking, IBookingModel, IBookingQueryHelpers>(
  "Booking",
  bookingSchema
);

export class BookingFilterModel {
  public _ids?: string[];
  public guestId?: string;
  public payerId?: string;
  public roomId?: string;
  public occupiedDate?: Record<string, Date>;
  public checkIn?: Record<string, Date>;
  public rate?: Record<string, number>;
  public balance?: Record<string, number>;
  public mealPlan?: string;
  public marketSource?: string;
  public commission?: string;

  constructor(_: {
    _ids?: TFilterValue;
    guestId?: TFilterValue;
    payerId?: TFilterValue;
    roomId?: TFilterValue;
    occupiedDate?: TFilterValue;
    checkIn?: TFilterValue;
    rate?: TFilterValue;
    balance?: TFilterValue;
    mealPlan?: TFilterValue;
    marketSource?: TFilterValue;
    commission?: TFilterValue;
  }) {
    this._ids = isUndefined(_._ids)
      ? undefined
      : _._ids!.equal
      ? Array.isArray(_._ids!.equal)
        ? _._ids!.equal
        : _._ids!.equal.split(",")
      : undefined;
    this.guestId = isUndefined(_.guestId) ? undefined : _.guestId!.equal;
    this.payerId = isUndefined(_.payerId) ? undefined : _.payerId!.equal;
    this.roomId = isUndefined(_.roomId) ? undefined : _.roomId!.equal;

    if (!isUndefined(_.occupiedDate)) {
      this.occupiedDate = {};

      if (!isEmpty(_.occupiedDate?.equal)) this.occupiedDate.$eq = new Date(_.occupiedDate!.equal!);
      if (!isEmpty(_.occupiedDate?.gt)) this.occupiedDate.$gt = new Date(_.occupiedDate!.gt!);
      if (!isEmpty(_.occupiedDate?.lt)) this.occupiedDate.$lt = new Date(_.occupiedDate!.lt!);
      if (!isEmpty(_.occupiedDate?.gte)) this.occupiedDate.$gte = new Date(_.occupiedDate!.gte!);
      if (!isEmpty(_.occupiedDate?.lte)) this.occupiedDate.$lte = new Date(_.occupiedDate!.lte!);
    }

    if (!isUndefined(_.checkIn)) {
      this.checkIn = {};

      if (!isEmpty(_.checkIn?.equal)) this.checkIn.$eq = new Date(_.checkIn!.equal!);
      if (!isEmpty(_.checkIn?.gt)) this.checkIn.$gt = new Date(_.checkIn!.gt!);
      if (!isEmpty(_.checkIn?.lt)) this.checkIn.$lt = new Date(_.checkIn!.lt!);
      if (!isEmpty(_.checkIn?.gte)) this.checkIn.$gte = new Date(_.checkIn!.gte!);
      if (!isEmpty(_.checkIn?.lte)) this.checkIn.$lte = new Date(_.checkIn!.lte!);
    }

    if (!isUndefined(_.rate)) {
      this.rate = {};

      if (!isEmpty(_.rate?.equal)) this.rate.$eq = Number(_.rate!.equal!);
      if (!isEmpty(_.rate?.gt)) this.rate.$gt = Number(_.rate!.gt!);
      if (!isEmpty(_.rate?.lt)) this.rate.$lt = Number(_.rate!.lt!);
      if (!isEmpty(_.rate?.gte)) this.rate.$gte = Number(_.rate!.gte!);
      if (!isEmpty(_.rate?.lte)) this.rate.$lte = Number(_.rate!.lte!);
    }

    if (!isUndefined(_.balance)) {
      this.balance = {};

      if (!isEmpty(_.balance?.equal)) this.balance.$eq = Number(_.balance!.equal!);
      if (!isEmpty(_.balance?.gt)) this.balance.$gt = Number(_.balance!.gt!);
      if (!isEmpty(_.balance?.lt)) this.balance.$lt = Number(_.balance!.lt!);
      if (!isEmpty(_.balance?.gte)) this.balance.$gte = Number(_.balance!.gte!);
      if (!isEmpty(_.balance?.lte)) this.balance.$lte = Number(_.balance!.lte!);
    }

    this.mealPlan = isUndefined(_.mealPlan) ? undefined : _.mealPlan!.equal;
    this.marketSource = isUndefined(_.marketSource) ? undefined : _.marketSource!.equal;
    this.commission = isUndefined(_.commission) ? undefined : _.commission!.equal;
  }

  toMongoFilter(): TMap {
    let filter: TMap = {};

    if (!isEmpty(this._ids)) filter._id = { $in: this._ids };
    if (!isEmpty(this.guestId)) filter.guestId = this.guestId;
    if (!isEmpty(this.payerId)) filter.payerId = this.payerId;
    if (!isEmpty(this.roomId)) filter.roomId = this.roomId;
    if (!isEmpty(this.occupiedDate)) filter.occupiedDate = this.occupiedDate;
    if (!isEmpty(this.checkIn)) filter.checkIn = this.checkIn;
    if (!isEmpty(this.rate)) filter.rate = this.rate;
    if (!isEmpty(this.balance)) filter.balance = this.balance;
    if (!isEmpty(this.mealPlan)) filter.mealPlan = this.mealPlan;
    if (!isEmpty(this.marketSource)) filter.marketSource = this.marketSource;
    if (!isEmpty(this.commission)) filter.commission = this.commission;

    return filter;
  }
}

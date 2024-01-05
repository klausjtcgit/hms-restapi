import { Document, Model, Schema, Types, model } from "mongoose";
import { TMap, isEmpty, isUndefined, toRegex } from "../../../core/utilities/utilities";
import { TFilterValue } from "../../../core/models/find_query.model";
import { EmployeeModel } from "../../employees/models/employee.model";

export interface IGuest extends Document {
  firstName: string;
  lastName: string;
  middleName?: string;
  phone: string;
  email?: string;
  identification: string;
  nationality: string;
  balance: number;
  isActive: boolean;
  isGroup: boolean;
  createdAt: Date;
  createdBy: Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: Types.ObjectId;
  deleted: boolean;
}

interface IGuestQueryHelpers {}
interface IGuestMethods {}
interface IGuestModel extends Model<IGuest, IGuestQueryHelpers, IGuestMethods> {}

const guestSchema = new Schema<IGuest, IGuestModel, IGuestMethods, IGuestQueryHelpers>({
  firstName: { type: String, required: true, lowercase: true },
  lastName: { type: String, required: true, lowercase: true },
  middleName: { type: String, lowercase: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String },
  identification: { type: String, required: true },
  nationality: { type: String, required: true },
  balance: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  isGroup: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  createdBy: { type: Schema.Types.ObjectId, ref: EmployeeModel },
  updatedAt: { type: Date, default: new Date() },
  updatedBy: { type: Schema.Types.ObjectId, ref: EmployeeModel },
  deleted: { type: Boolean, default: false },
});

export const GuestModel = model<IGuest, IGuestModel, IGuestQueryHelpers>("Guest", guestSchema);

export class GuestFilterModel {
  public searchString?: string;
  public _ids?: string[];
  public name?: string;
  public phone?: string;
  public email?: string;
  public balance?: any;
  public isActive?: boolean;
  public isGroup?: boolean;

  constructor(_: {
    searchString?: TFilterValue;
    _ids?: TFilterValue;
    name?: TFilterValue;
    phone?: TFilterValue;
    email?: TFilterValue;
    balance?: TFilterValue;
    isActive?: TFilterValue;
    isGroup?: TFilterValue;
  }) {
    this.searchString = isUndefined(_.searchString) ? undefined : toRegex(_.searchString!.equal);
    this._ids = isUndefined(_._ids)
      ? undefined
      : _._ids!.equal
      ? Array.isArray(_._ids!.equal)
        ? _._ids!.equal
        : _._ids!.equal.split(",")
      : undefined;
    this.name = isUndefined(_.name) ? undefined : toRegex(_.name!.equal);
    this.phone = isUndefined(_.phone) ? undefined : toRegex(_.phone!.equal);
    this.email = isUndefined(_.email) ? undefined : toRegex(_.email!.equal);

    if (!isUndefined(_.balance)) {
      this.balance = {};

      if (!isEmpty(_.balance?.equal)) this.balance.$eq = Number(_.balance!.equal);
      if (!isEmpty(_.balance?.gt)) {
        this.balance.$gt = Number(_.balance!.gt);
      }
      if (!isEmpty(_.balance?.lt)) this.balance.$lt = Number(_.balance!.lt);
      if (!isEmpty(_.balance?.gte)) this.balance.$gte = Number(_.balance!.gte);
      if (!isEmpty(_.balance?.lte)) this.balance.$lte = Number(_.balance!.lte);
    }

    this.isActive = isUndefined(_.isActive) ? undefined : Boolean(_.isActive!.equal);
    this.isGroup = isUndefined(_.isActive) ? undefined : Boolean(_.isActive!.equal);
  }

  toMongoFilter(): TMap {
    let filter: TMap = {};

    if (!isEmpty(this.searchString)) {
      filter.$or = [
        { firstName: { $regex: this.searchString } },
        { lastName: { $regex: this.searchString } },
        { middleName: { $regex: this.searchString } },
        { phone: { $regex: this.searchString } },
        { email: { $regex: this.searchString } },
      ];
    } else {
      if (!isEmpty(this.name))
        filter.$or = [
          { firstName: { $regex: this.name } },
          { lastName: { $regex: this.name } },
          { middleName: { $regex: this.name } },
        ];

      if (!isEmpty(this._ids)) filter._id = { $in: this._ids };
      if (!isEmpty(this.phone)) filter.phone = { $regex: this.phone };
      if (!isEmpty(this.email)) filter.email = { $regex: this.email };
      if (!isEmpty(this.balance)) filter.balance = this.balance;
      if (!isEmpty(this.isActive)) filter.isActive = this.isActive;
      if (!isEmpty(this.isGroup)) filter.isGroup = this.isGroup;
    }

    if (!isEmpty(this.balance)) {
    }

    return filter;
  }
}

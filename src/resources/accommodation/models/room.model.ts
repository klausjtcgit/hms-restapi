import { Document, Model, Schema, Types, model } from "mongoose";
import { TMap, isEmpty, isUndefined } from "../../../core/utilities/utilities";
import { TFilterValue } from "../../../core/models/find_query.model";
import { OccupancyStatuses, RoomTypes } from "../../../core/constants";
import { EmployeeModel } from "../../employees/models/employee.model";

export interface IRoom extends Document {
  number: string;
  type: RoomTypes;
  floor: string;
  occupancy: OccupancyStatuses;
  isClean: boolean;
  OOO: boolean;
  problems: string[];
  createdAt: Date;
  createdBy: Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: Types.ObjectId;
  deleted: boolean;
}

interface IRoomQueryHelpers {}
interface IRoomMethods {}
interface IRoomModel extends Model<IRoom, IRoomQueryHelpers, IRoomMethods> {}

const roomSchema = new Schema<IRoom, IRoomModel, IRoomMethods, IRoomQueryHelpers>({
  number: { type: String, required: true, lowercase: true },
  type: { type: String, required: true, enum: Object.values(RoomTypes) },
  floor: { type: String, required: true },
  occupancy: { type: String, required: true, enum: Object.values(OccupancyStatuses) },
  isClean: { type: Boolean },
  OOO: { type: Boolean, default: true },
  problems: { type: [String], default: [] },
  createdAt: { type: Date, default: new Date() },
  createdBy: { type: Schema.Types.ObjectId, ref: EmployeeModel },
  updatedAt: { type: Date, default: new Date() },
  updatedBy: { type: Schema.Types.ObjectId, ref: EmployeeModel },
  deleted: { type: Boolean, default: false },
});

export const RoomModel = model<IRoom, IRoomModel, IRoomQueryHelpers>("Room", roomSchema);

export class RoomFilterModel {
  public _ids?: string[];
  public number?: string;
  public type?: string;
  public floor?: string;
  public occupancy?: string;
  public isClean?: boolean;
  public OOO?: boolean;
  public problems?: any;

  constructor(_: {
    _ids?: TFilterValue;
    number?: TFilterValue;
    type?: TFilterValue;
    floor?: TFilterValue;
    occupancy?: TFilterValue;
    isClean?: TFilterValue;
    OOO?: TFilterValue;
    problems?: TFilterValue;
  }) {
    this._ids = isUndefined(_._ids)
      ? undefined
      : _._ids!.equal
      ? Array.isArray(_._ids!.equal)
        ? _._ids!.equal
        : _._ids!.equal.split(",")
      : undefined;
    this.number = isUndefined(_.number) ? undefined : _.number!.equal;
    this.type = isUndefined(_.type) ? undefined : _.type!.equal;
    this.floor = isUndefined(_.floor) ? undefined : _.floor!.equal;
    this.occupancy = isUndefined(_.occupancy) ? undefined : _.occupancy!.equal;
    this.isClean = isUndefined(_.isClean) ? undefined : Boolean(_.isClean!.equal);
    this.OOO = isUndefined(_.OOO) ? undefined : Boolean(_.OOO!.equal);
    this.problems = isUndefined(_.problems) ? undefined : _.occupancy!.equal;
  }

  toMongoFilter(): TMap {
    let filter: TMap = {};

    if (!isEmpty(this._ids)) filter._id = { $in: this._ids };
    if (!isEmpty(this.number)) filter.number = this.number;
    if (!isEmpty(this.type)) filter.type = this.type;
    if (!isEmpty(this.floor)) filter.floor = this.floor;
    if (!isEmpty(this.occupancy)) filter.occupancy = this.occupancy;
    if (!isEmpty(this.isClean)) filter.isClean = this.isClean;
    if (!isEmpty(this.OOO)) filter.OOO = this.OOO;
    if (!isEmpty(this.problems)) filter.problems = { $in: this.problems };

    return filter;
  }
}

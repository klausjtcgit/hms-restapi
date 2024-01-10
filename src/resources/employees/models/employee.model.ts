import {
  Document,
  HydratedDocument,
  Model,
  QueryWithHelpers,
  Schema,
  Types,
  model,
} from "mongoose";
import { compare, genSaltSync, hashSync } from "bcryptjs";
import { TMap, isEmpty, isUndefined, toRegex } from "../../../core/utilities/utilities";
import { EmployeePermissions, JobTitles } from "../../../core/constants";
import { TFilterValue } from "../../../core/models/find_query.model";
import { toBoolean } from "../../../core/utilities/conversion_helpers";

export interface IEmployee extends Document {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  jobTitle: JobTitles;
  code: string;
  password: string;
  email?: string;
  isActive: boolean;
  permissions: EmployeePermissions[];
  createdAt: Date;
  createdBy: Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: Types.ObjectId;
  deleted: boolean;
}

interface IEmployeeQueryHelpers {
  byCode(
    code: string
  ): QueryWithHelpers<
    HydratedDocument<IEmployee>[],
    HydratedDocument<IEmployee>,
    IEmployeeQueryHelpers
  >;
  byPhone(
    phone: string
  ): QueryWithHelpers<
    HydratedDocument<IEmployee>[],
    HydratedDocument<IEmployee>,
    IEmployeeQueryHelpers
  >;
}

interface IEmployeeMethods {
  matchPassword(password: string): Promise<boolean>;
}

interface IEmployeeModel extends Model<IEmployee, IEmployeeQueryHelpers, IEmployeeMethods> {}

const employeeSchema = new Schema<
  IEmployee,
  IEmployeeModel,
  IEmployeeMethods,
  IEmployeeQueryHelpers
>({
  firstName: { type: String, required: true, lowercase: true },
  lastName: { type: String, required: true, lowercase: true },
  middleName: { type: String, lowercase: true },
  phone: { type: String, required: true, unique: true },
  jobTitle: {
    type: String,
    enum: Object.values(JobTitles),
    required: true,
  },
  code: { type: String, required: true, unique: true, match: /^\d{4,10}$/ },
  password: { type: String, required: true },
  email: { type: String },
  isActive: { type: Boolean, default: true },
  permissions: {
    type: [
      {
        type: String,
        enum: Object.values(EmployeePermissions),
      },
    ],
    required: true,
  },
  createdAt: { type: Date, default: new Date() },
  createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },
  updatedAt: { type: Date, default: new Date() },
  updatedBy: { type: Schema.Types.ObjectId, ref: "Employee" },
  deleted: { type: Boolean, default: false },
});

employeeSchema.query.byCode = function byCode(
  this: QueryWithHelpers<any, HydratedDocument<IEmployee>, IEmployeeQueryHelpers>,
  code: string
) {
  return this.find({ code: code });
};

employeeSchema.query.byPhone = function byCode(
  this: QueryWithHelpers<any, HydratedDocument<IEmployee>, IEmployeeQueryHelpers>,
  phone: string
) {
  return this.find({ phone: phone });
};

employeeSchema.method(
  "matchPassword",
  async function matchPassword(password: string): Promise<boolean> {
    try {
      return await compare(password, this.password);
    } catch (error) {
      throw error;
    }
  }
);

employeeSchema.pre(/^(save|updateOne)$/, { document: true }, async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await genSaltSync(10);
    const hashed = await hashSync(this.password, salt);
    this.password = hashed;
    next();
  } else {
    return next();
  }
});

export const EmployeeModel = model<IEmployee, IEmployeeModel, IEmployeeQueryHelpers>(
  "Employee",
  employeeSchema
);

export class EmployeeFilterModel {
  public searchString?: string;
  public _ids?: string[];
  public name?: string;
  public phone?: string;
  public jobTitle?: string;
  public isActive?: boolean;

  constructor(_: {
    searchString?: TFilterValue;
    _ids?: TFilterValue;
    name?: TFilterValue;
    phone?: TFilterValue;
    jobTitle?: TFilterValue;
    isActive?: TFilterValue;
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
    this.jobTitle = isUndefined(_.jobTitle) ? undefined : toRegex(_.jobTitle!.equal);
    this.isActive = isUndefined(_.isActive) ? undefined : toBoolean(_.isActive!.equal);
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
      if (!isEmpty(this.jobTitle)) filter.jobTitle = { $regex: this.jobTitle };
      if (!isEmpty(this.isActive)) filter.isActive = this.isActive;
    }

    return filter;
  }
}

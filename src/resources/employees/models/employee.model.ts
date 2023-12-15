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

export enum EJobTitles {
  generalManager = "general manager",
  supervisor = "supervisor",
  accommodationSupervisor = "accommodation supervisor",
  reception = "reception",
  housekeeper = "housekeeper",
  security = "security",
  restaurantSupervisor = "restaurant supervisor",
  cashier = "cashier",
  waiter = "waiter",
  chef = "chef",
  cook = "cook",
  steward = "steward",
  trainee = "trainee",
  handyman = "handyman",
  storekeeper = "storekeeper",
  softwareAdmin = "software admin",
}

export const EmployeeRoleMapping: Record<string, EJobTitles> = {
  "general manager": EJobTitles.generalManager,
  supervisor: EJobTitles.supervisor,
  "accommodation supervisor": EJobTitles.accommodationSupervisor,
  reception: EJobTitles.reception,
  housekeeper: EJobTitles.housekeeper,
  security: EJobTitles.security,
  "restaurant supervisor": EJobTitles.restaurantSupervisor,
  cashier: EJobTitles.cashier,
  waiter: EJobTitles.waiter,
  chef: EJobTitles.chef,
  cook: EJobTitles.cook,
  steward: EJobTitles.steward,
  trainee: EJobTitles.trainee,
  handyman: EJobTitles.handyman,
  storekeeper: EJobTitles.storekeeper,
  "software admin": EJobTitles.softwareAdmin,
};

export enum EEmployeePermission {
  registerGuest = "register guest",
  updateGuestInfo = "update guest info",
  createRoom = "create room",
  updateRoomInfo = "update room info",
  updateRoomStatus = "update room status",

  bookingARoom = "booking a room",
  giftBookingARoom = "gift booking a room",
  voidBookingARoom = "void booking a room",
  updateBookingInfo = "update booking info",
  updateBookingPrice = "update booking price",

  acceptAccommodationPayment = "accept accommodation payment",
  updateAccommodationPayment = "update accommodation payment",

  makeMenu = "make menu",
  updateMenu = "update menu",
  updateMenuPrice = "update menu price",

  viewMyOrder = "post order",
  viewAllOrder = "post order",
  postOrder = "post order",
  updateOrder = "update order",
  updateAllOrder = "update all order",
  giftOrder = "gift order",
  voidOrder = "void order",
  transferOrder = "transfer order",

  acceptRestaurantPayment = "accept restaurant payment",
  updateRestaurantPayment = "update restaurant payment",

  addItemToInventory = "add item to inventory",
  updateItemInfo = "update item info",

  makeMenuVsRecipe = "make menu vs recipe",
  spoilageMiscellaneousUsage = "spoilage miscellaneous usage",

  issueItem = "issue item",
  updateIssue = "update issue",

  purchaseItem = "purchase item",
  updatePurchase = "update purchase",

  registerEmployee = "register employee",
  updateEmployeeInfo = "update employee info",
  updateEmployeePermission = "update employee permission",

  addExpense = "add expense",
  updateExpense = "update expense",

  verifyPayment = "verify payment",
  generateMyReport = "generate my report",
  generateAccommodationReport = "generate accommodation report",
  generateRestaurantReport = "generate restaurant report",
  generateInventoryReport = "generate inventory report",
  generateGeneralReport = "generate general report",
}

export let defaultPermission: Record<string, EEmployeePermission[]> = {
  "general manager": [
    EEmployeePermission.registerGuest,
    EEmployeePermission.updateGuestInfo,

    EEmployeePermission.createRoom,
    EEmployeePermission.updateRoomInfo,
    EEmployeePermission.updateRoomStatus,

    EEmployeePermission.bookingARoom,
    EEmployeePermission.giftBookingARoom,
    EEmployeePermission.voidBookingARoom,
    EEmployeePermission.updateBookingInfo,
    EEmployeePermission.updateBookingPrice,

    EEmployeePermission.acceptAccommodationPayment,
    EEmployeePermission.updateAccommodationPayment,

    EEmployeePermission.makeMenu,
    EEmployeePermission.updateMenu,
    EEmployeePermission.updateMenuPrice,

    EEmployeePermission.viewMyOrder,
    EEmployeePermission.viewAllOrder,
    EEmployeePermission.postOrder,
    EEmployeePermission.updateOrder,
    EEmployeePermission.updateAllOrder,
    EEmployeePermission.giftOrder,
    EEmployeePermission.voidOrder,
    EEmployeePermission.transferOrder,

    EEmployeePermission.acceptRestaurantPayment,
    EEmployeePermission.updateRestaurantPayment,

    EEmployeePermission.addItemToInventory,
    EEmployeePermission.updateItemInfo,

    EEmployeePermission.makeMenuVsRecipe,
    EEmployeePermission.spoilageMiscellaneousUsage,

    EEmployeePermission.issueItem,
    EEmployeePermission.updateIssue,

    EEmployeePermission.purchaseItem,
    EEmployeePermission.updatePurchase,

    EEmployeePermission.registerEmployee,
    EEmployeePermission.updateEmployeeInfo,
    EEmployeePermission.updateEmployeePermission,

    EEmployeePermission.addExpense,
    EEmployeePermission.updateExpense,

    EEmployeePermission.verifyPayment,
    EEmployeePermission.generateMyReport,
    EEmployeePermission.generateAccommodationReport,
    EEmployeePermission.generateRestaurantReport,
    EEmployeePermission.generateInventoryReport,
    EEmployeePermission.generateGeneralReport,
  ],
  supervisor: [
    EEmployeePermission.registerGuest,
    EEmployeePermission.updateGuestInfo,

    EEmployeePermission.createRoom,
    EEmployeePermission.updateRoomInfo,
    EEmployeePermission.updateRoomStatus,

    EEmployeePermission.bookingARoom,
    EEmployeePermission.giftBookingARoom,
    EEmployeePermission.voidBookingARoom,
    EEmployeePermission.updateBookingInfo,
    EEmployeePermission.updateBookingPrice,

    EEmployeePermission.acceptAccommodationPayment,
    EEmployeePermission.updateAccommodationPayment,

    EEmployeePermission.makeMenu,
    EEmployeePermission.updateMenu,
    EEmployeePermission.updateMenuPrice,

    EEmployeePermission.viewMyOrder,
    EEmployeePermission.viewAllOrder,
    EEmployeePermission.postOrder,
    EEmployeePermission.updateOrder,
    EEmployeePermission.updateAllOrder,
    EEmployeePermission.giftOrder,
    EEmployeePermission.voidOrder,
    EEmployeePermission.transferOrder,

    EEmployeePermission.acceptRestaurantPayment,
    EEmployeePermission.updateRestaurantPayment,

    EEmployeePermission.addItemToInventory,
    EEmployeePermission.updateItemInfo,

    EEmployeePermission.makeMenuVsRecipe,
    EEmployeePermission.spoilageMiscellaneousUsage,

    EEmployeePermission.issueItem,
    EEmployeePermission.updateIssue,

    EEmployeePermission.purchaseItem,
    EEmployeePermission.updatePurchase,

    EEmployeePermission.registerEmployee,
    EEmployeePermission.updateEmployeeInfo,

    EEmployeePermission.addExpense,
    EEmployeePermission.updateExpense,

    EEmployeePermission.generateMyReport,
    EEmployeePermission.generateAccommodationReport,
    EEmployeePermission.generateRestaurantReport,
    EEmployeePermission.generateInventoryReport,
  ],
  "accommodation supervisor": [
    EEmployeePermission.registerGuest,
    EEmployeePermission.updateGuestInfo,

    EEmployeePermission.createRoom,
    EEmployeePermission.updateRoomInfo,
    EEmployeePermission.updateRoomStatus,

    EEmployeePermission.bookingARoom,
    EEmployeePermission.giftBookingARoom,
    EEmployeePermission.voidBookingARoom,
    EEmployeePermission.updateBookingInfo,
    EEmployeePermission.updateBookingPrice,

    EEmployeePermission.acceptAccommodationPayment,
    EEmployeePermission.updateAccommodationPayment,

    EEmployeePermission.registerEmployee,
    EEmployeePermission.updateEmployeeInfo,

    EEmployeePermission.addExpense,
    EEmployeePermission.updateExpense,

    EEmployeePermission.generateMyReport,
    EEmployeePermission.generateAccommodationReport,
    EEmployeePermission.generateInventoryReport,
  ],
  reception: [
    EEmployeePermission.registerGuest,
    EEmployeePermission.updateGuestInfo,

    EEmployeePermission.createRoom,
    EEmployeePermission.updateRoomInfo,
    EEmployeePermission.updateRoomStatus,

    EEmployeePermission.bookingARoom,
    EEmployeePermission.voidBookingARoom,
    EEmployeePermission.updateBookingInfo,
    EEmployeePermission.updateBookingPrice,

    EEmployeePermission.acceptAccommodationPayment,
    EEmployeePermission.updateAccommodationPayment,

    EEmployeePermission.addExpense,
    EEmployeePermission.updateExpense,

    EEmployeePermission.generateMyReport,
    EEmployeePermission.generateAccommodationReport,
  ],
  housekeeper: [
    EEmployeePermission.createRoom,
    EEmployeePermission.updateRoomInfo,
    EEmployeePermission.updateRoomStatus,

    EEmployeePermission.generateMyReport,
  ],
  security: [
    EEmployeePermission.createRoom,
    EEmployeePermission.updateRoomInfo,
    EEmployeePermission.updateRoomStatus,

    EEmployeePermission.generateMyReport,
  ],
  "restaurant supervisor": [
    EEmployeePermission.makeMenu,
    EEmployeePermission.updateMenu,
    EEmployeePermission.updateMenuPrice,

    EEmployeePermission.viewMyOrder,
    EEmployeePermission.viewAllOrder,
    EEmployeePermission.postOrder,
    EEmployeePermission.updateOrder,
    EEmployeePermission.updateAllOrder,
    EEmployeePermission.giftOrder,
    EEmployeePermission.voidOrder,
    EEmployeePermission.transferOrder,

    EEmployeePermission.acceptRestaurantPayment,
    EEmployeePermission.updateRestaurantPayment,

    EEmployeePermission.addItemToInventory,
    EEmployeePermission.updateItemInfo,

    EEmployeePermission.makeMenuVsRecipe,
    EEmployeePermission.spoilageMiscellaneousUsage,

    EEmployeePermission.issueItem,
    EEmployeePermission.updateIssue,

    EEmployeePermission.purchaseItem,
    EEmployeePermission.updatePurchase,

    EEmployeePermission.registerEmployee,
    EEmployeePermission.updateEmployeeInfo,

    EEmployeePermission.addExpense,
    EEmployeePermission.updateExpense,

    EEmployeePermission.generateMyReport,
    EEmployeePermission.generateRestaurantReport,
    EEmployeePermission.generateInventoryReport,
  ],
  cashier: [
    EEmployeePermission.makeMenu,
    EEmployeePermission.updateMenu,
    EEmployeePermission.updateMenuPrice,

    EEmployeePermission.viewMyOrder,
    EEmployeePermission.viewAllOrder,
    EEmployeePermission.postOrder,
    EEmployeePermission.updateOrder,
    EEmployeePermission.updateAllOrder,
    EEmployeePermission.giftOrder,
    EEmployeePermission.voidOrder,
    EEmployeePermission.transferOrder,

    EEmployeePermission.acceptRestaurantPayment,
    EEmployeePermission.updateRestaurantPayment,

    EEmployeePermission.addExpense,
    EEmployeePermission.updateExpense,

    EEmployeePermission.generateMyReport,
    EEmployeePermission.generateRestaurantReport,
  ],
  waiter: [
    EEmployeePermission.viewMyOrder,
    EEmployeePermission.postOrder,
    EEmployeePermission.updateOrder,
    EEmployeePermission.updateAllOrder,
    EEmployeePermission.giftOrder,
    EEmployeePermission.voidOrder,
    EEmployeePermission.transferOrder,

    EEmployeePermission.acceptRestaurantPayment,
    EEmployeePermission.updateRestaurantPayment,

    EEmployeePermission.generateMyReport,
  ],
  chef: [
    EEmployeePermission.viewMyOrder,
    EEmployeePermission.viewAllOrder,

    EEmployeePermission.addItemToInventory,
    EEmployeePermission.updateItemInfo,

    EEmployeePermission.makeMenuVsRecipe,
    EEmployeePermission.spoilageMiscellaneousUsage,

    EEmployeePermission.generateMyReport,
    EEmployeePermission.generateInventoryReport,
  ],
  cook: [
    EEmployeePermission.viewMyOrder,
    EEmployeePermission.viewAllOrder,

    EEmployeePermission.addItemToInventory,
    EEmployeePermission.updateItemInfo,

    EEmployeePermission.makeMenuVsRecipe,
    EEmployeePermission.spoilageMiscellaneousUsage,

    EEmployeePermission.generateMyReport,
    EEmployeePermission.generateInventoryReport,
  ],
  steward: [
    EEmployeePermission.viewMyOrder,
    EEmployeePermission.viewAllOrder,

    EEmployeePermission.spoilageMiscellaneousUsage,

    EEmployeePermission.generateMyReport,
  ],
  trainee: [
    EEmployeePermission.viewMyOrder,
    EEmployeePermission.postOrder,
    EEmployeePermission.updateOrder,

    EEmployeePermission.acceptRestaurantPayment,
    EEmployeePermission.updateRestaurantPayment,

    EEmployeePermission.generateMyReport,
  ],
  handyman: [EEmployeePermission.updateRoomInfo, EEmployeePermission.generateMyReport],
  storekeeper: [
    EEmployeePermission.makeMenu,
    EEmployeePermission.updateMenu,
    EEmployeePermission.updateMenuPrice,

    EEmployeePermission.viewMyOrder,
    EEmployeePermission.viewAllOrder,

    EEmployeePermission.addItemToInventory,
    EEmployeePermission.updateItemInfo,

    EEmployeePermission.makeMenuVsRecipe,
    EEmployeePermission.spoilageMiscellaneousUsage,

    EEmployeePermission.issueItem,
    EEmployeePermission.updateIssue,

    EEmployeePermission.purchaseItem,
    EEmployeePermission.updatePurchase,

    EEmployeePermission.addExpense,
    EEmployeePermission.updateExpense,

    EEmployeePermission.generateMyReport,
    EEmployeePermission.generateRestaurantReport,
    EEmployeePermission.generateInventoryReport,
  ],
  "software admin": [
    EEmployeePermission.registerGuest,
    EEmployeePermission.updateGuestInfo,

    EEmployeePermission.createRoom,
    EEmployeePermission.updateRoomInfo,
    EEmployeePermission.updateRoomStatus,

    EEmployeePermission.bookingARoom,
    EEmployeePermission.giftBookingARoom,
    EEmployeePermission.voidBookingARoom,
    EEmployeePermission.updateBookingInfo,
    EEmployeePermission.updateBookingPrice,

    EEmployeePermission.acceptAccommodationPayment,
    EEmployeePermission.updateAccommodationPayment,

    EEmployeePermission.makeMenu,
    EEmployeePermission.updateMenu,
    EEmployeePermission.updateMenuPrice,

    EEmployeePermission.viewMyOrder,
    EEmployeePermission.viewAllOrder,
    EEmployeePermission.postOrder,
    EEmployeePermission.updateOrder,
    EEmployeePermission.updateAllOrder,
    EEmployeePermission.giftOrder,
    EEmployeePermission.voidOrder,
    EEmployeePermission.transferOrder,

    EEmployeePermission.acceptRestaurantPayment,
    EEmployeePermission.updateRestaurantPayment,

    EEmployeePermission.addItemToInventory,
    EEmployeePermission.updateItemInfo,

    EEmployeePermission.makeMenuVsRecipe,
    EEmployeePermission.spoilageMiscellaneousUsage,

    EEmployeePermission.issueItem,
    EEmployeePermission.updateIssue,

    EEmployeePermission.purchaseItem,
    EEmployeePermission.updatePurchase,

    EEmployeePermission.registerEmployee,
    EEmployeePermission.updateEmployeeInfo,
    EEmployeePermission.updateEmployeePermission,

    EEmployeePermission.addExpense,
    EEmployeePermission.updateExpense,

    EEmployeePermission.verifyPayment,
    EEmployeePermission.generateMyReport,
    EEmployeePermission.generateAccommodationReport,
    EEmployeePermission.generateRestaurantReport,
    EEmployeePermission.generateInventoryReport,
    EEmployeePermission.generateGeneralReport,
  ],
};

export interface IEmployee extends Document {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  jobTitle: EJobTitles;
  code: string;
  password: string;
  email?: string;
  isActive: boolean;
  permissions: EEmployeePermission[];
  createdAt: Date;
  createdBy: Types.ObjectId;
  updatedAt?: Date;
  updatedBy?: Types.ObjectId;
  deleted: boolean;
  outdated: boolean;
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

interface IEmployeeModel extends Model<IEmployee, IEmployeeQueryHelpers, IEmployeeMethods> {
  fromJsonString(name: string): Promise<HydratedDocument<IEmployee, IEmployeeMethods>>;
}

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
    enum: Object.values(EJobTitles),
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
        enum: Object.values(EEmployeePermission),
      },
    ],
    required: true,
  },
  createdAt: { type: Date, default: new Date() },
  createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },
  updatedAt: { type: Date, default: new Date() },
  updatedBy: { type: Schema.Types.ObjectId, ref: "Employee" },
  deleted: { type: Boolean, default: false },
  outdated: { type: Boolean, default: false },
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

employeeSchema.static("fromJsonString", function fromJsonString(json: string) {
  return this.create(JSON.parse(json));
});

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

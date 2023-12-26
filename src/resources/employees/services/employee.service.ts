import { EmployeePermissions, MAX_LIMIT } from "../../../core/constants";
import { IService } from "../../../core/interfaces/service.interface";
import { EmployeeFilterModel, EmployeeModel, IEmployee } from "../models/employee.model";
import { notFoundExceptionHandler } from "../../../core/utilities/exception_handler";
import { TMap, isEmpty } from "../../../core/utilities/utilities";
import { IUpdateResponse } from "../../../core/interfaces/update_response.interface";
import { FindQueryModel } from "../../../core/models/find_query.model";

export let defaultPermission: Record<string, EmployeePermissions[]> = {
  "general manager": [
    EmployeePermissions.registerGuest,
    EmployeePermissions.updateGuestInfo,

    EmployeePermissions.createRoom,
    EmployeePermissions.updateRoomInfo,
    EmployeePermissions.updateRoomStatus,

    EmployeePermissions.bookingARoom,
    EmployeePermissions.giftBookingARoom,
    EmployeePermissions.voidBookingARoom,
    EmployeePermissions.updateBookingInfo,
    EmployeePermissions.updateBookingPrice,

    EmployeePermissions.acceptAccommodationPayment,
    EmployeePermissions.updateAccommodationPayment,

    EmployeePermissions.makeMenu,
    EmployeePermissions.updateMenu,
    EmployeePermissions.updateMenuPrice,

    EmployeePermissions.viewMyOrder,
    EmployeePermissions.viewAllOrder,
    EmployeePermissions.postOrder,
    EmployeePermissions.updateOrder,
    EmployeePermissions.updateAllOrder,
    EmployeePermissions.giftOrder,
    EmployeePermissions.voidOrder,
    EmployeePermissions.transferOrder,

    EmployeePermissions.acceptRestaurantPayment,
    EmployeePermissions.updateRestaurantPayment,

    EmployeePermissions.addItemToInventory,
    EmployeePermissions.updateItemInfo,

    EmployeePermissions.makeMenuVsRecipe,
    EmployeePermissions.spoilageMiscellaneousUsage,

    EmployeePermissions.issueItem,
    EmployeePermissions.updateIssue,

    EmployeePermissions.purchaseItem,
    EmployeePermissions.updatePurchase,

    EmployeePermissions.registerEmployee,
    EmployeePermissions.updateEmployeeInfo,
    EmployeePermissions.updateEmployeePermissions,

    EmployeePermissions.addExpense,
    EmployeePermissions.updateExpense,

    EmployeePermissions.verifyPayment,
    EmployeePermissions.generateMyReport,
    EmployeePermissions.generateAccommodationReport,
    EmployeePermissions.generateRestaurantReport,
    EmployeePermissions.generateInventoryReport,
    EmployeePermissions.generateGeneralReport,
  ],
  supervisor: [
    EmployeePermissions.registerGuest,
    EmployeePermissions.updateGuestInfo,

    EmployeePermissions.createRoom,
    EmployeePermissions.updateRoomInfo,
    EmployeePermissions.updateRoomStatus,

    EmployeePermissions.bookingARoom,
    EmployeePermissions.giftBookingARoom,
    EmployeePermissions.voidBookingARoom,
    EmployeePermissions.updateBookingInfo,
    EmployeePermissions.updateBookingPrice,

    EmployeePermissions.acceptAccommodationPayment,
    EmployeePermissions.updateAccommodationPayment,

    EmployeePermissions.makeMenu,
    EmployeePermissions.updateMenu,
    EmployeePermissions.updateMenuPrice,

    EmployeePermissions.viewMyOrder,
    EmployeePermissions.viewAllOrder,
    EmployeePermissions.postOrder,
    EmployeePermissions.updateOrder,
    EmployeePermissions.updateAllOrder,
    EmployeePermissions.giftOrder,
    EmployeePermissions.voidOrder,
    EmployeePermissions.transferOrder,

    EmployeePermissions.acceptRestaurantPayment,
    EmployeePermissions.updateRestaurantPayment,

    EmployeePermissions.addItemToInventory,
    EmployeePermissions.updateItemInfo,

    EmployeePermissions.makeMenuVsRecipe,
    EmployeePermissions.spoilageMiscellaneousUsage,

    EmployeePermissions.issueItem,
    EmployeePermissions.updateIssue,

    EmployeePermissions.purchaseItem,
    EmployeePermissions.updatePurchase,

    EmployeePermissions.registerEmployee,
    EmployeePermissions.updateEmployeeInfo,

    EmployeePermissions.addExpense,
    EmployeePermissions.updateExpense,

    EmployeePermissions.generateMyReport,
    EmployeePermissions.generateAccommodationReport,
    EmployeePermissions.generateRestaurantReport,
    EmployeePermissions.generateInventoryReport,
  ],
  "accommodation supervisor": [
    EmployeePermissions.registerGuest,
    EmployeePermissions.updateGuestInfo,

    EmployeePermissions.createRoom,
    EmployeePermissions.updateRoomInfo,
    EmployeePermissions.updateRoomStatus,

    EmployeePermissions.bookingARoom,
    EmployeePermissions.giftBookingARoom,
    EmployeePermissions.voidBookingARoom,
    EmployeePermissions.updateBookingInfo,
    EmployeePermissions.updateBookingPrice,

    EmployeePermissions.acceptAccommodationPayment,
    EmployeePermissions.updateAccommodationPayment,

    EmployeePermissions.registerEmployee,
    EmployeePermissions.updateEmployeeInfo,

    EmployeePermissions.addExpense,
    EmployeePermissions.updateExpense,

    EmployeePermissions.generateMyReport,
    EmployeePermissions.generateAccommodationReport,
    EmployeePermissions.generateInventoryReport,
  ],
  reception: [
    EmployeePermissions.registerGuest,
    EmployeePermissions.updateGuestInfo,

    EmployeePermissions.createRoom,
    EmployeePermissions.updateRoomInfo,
    EmployeePermissions.updateRoomStatus,

    EmployeePermissions.bookingARoom,
    EmployeePermissions.voidBookingARoom,
    EmployeePermissions.updateBookingInfo,
    EmployeePermissions.updateBookingPrice,

    EmployeePermissions.acceptAccommodationPayment,
    EmployeePermissions.updateAccommodationPayment,

    EmployeePermissions.addExpense,
    EmployeePermissions.updateExpense,

    EmployeePermissions.generateMyReport,
    EmployeePermissions.generateAccommodationReport,
  ],
  housekeeper: [
    EmployeePermissions.createRoom,
    EmployeePermissions.updateRoomInfo,
    EmployeePermissions.updateRoomStatus,

    EmployeePermissions.generateMyReport,
  ],
  security: [
    EmployeePermissions.createRoom,
    EmployeePermissions.updateRoomInfo,
    EmployeePermissions.updateRoomStatus,

    EmployeePermissions.generateMyReport,
  ],
  "restaurant supervisor": [
    EmployeePermissions.makeMenu,
    EmployeePermissions.updateMenu,
    EmployeePermissions.updateMenuPrice,

    EmployeePermissions.viewMyOrder,
    EmployeePermissions.viewAllOrder,
    EmployeePermissions.postOrder,
    EmployeePermissions.updateOrder,
    EmployeePermissions.updateAllOrder,
    EmployeePermissions.giftOrder,
    EmployeePermissions.voidOrder,
    EmployeePermissions.transferOrder,

    EmployeePermissions.acceptRestaurantPayment,
    EmployeePermissions.updateRestaurantPayment,

    EmployeePermissions.addItemToInventory,
    EmployeePermissions.updateItemInfo,

    EmployeePermissions.makeMenuVsRecipe,
    EmployeePermissions.spoilageMiscellaneousUsage,

    EmployeePermissions.issueItem,
    EmployeePermissions.updateIssue,

    EmployeePermissions.purchaseItem,
    EmployeePermissions.updatePurchase,

    EmployeePermissions.registerEmployee,
    EmployeePermissions.updateEmployeeInfo,

    EmployeePermissions.addExpense,
    EmployeePermissions.updateExpense,

    EmployeePermissions.generateMyReport,
    EmployeePermissions.generateRestaurantReport,
    EmployeePermissions.generateInventoryReport,
  ],
  cashier: [
    EmployeePermissions.makeMenu,
    EmployeePermissions.updateMenu,
    EmployeePermissions.updateMenuPrice,

    EmployeePermissions.viewMyOrder,
    EmployeePermissions.viewAllOrder,
    EmployeePermissions.postOrder,
    EmployeePermissions.updateOrder,
    EmployeePermissions.updateAllOrder,
    EmployeePermissions.giftOrder,
    EmployeePermissions.voidOrder,
    EmployeePermissions.transferOrder,

    EmployeePermissions.acceptRestaurantPayment,
    EmployeePermissions.updateRestaurantPayment,

    EmployeePermissions.addExpense,
    EmployeePermissions.updateExpense,

    EmployeePermissions.generateMyReport,
    EmployeePermissions.generateRestaurantReport,
  ],
  waiter: [
    EmployeePermissions.viewMyOrder,
    EmployeePermissions.postOrder,
    EmployeePermissions.updateOrder,
    EmployeePermissions.updateAllOrder,
    EmployeePermissions.giftOrder,
    EmployeePermissions.voidOrder,
    EmployeePermissions.transferOrder,

    EmployeePermissions.acceptRestaurantPayment,
    EmployeePermissions.updateRestaurantPayment,

    EmployeePermissions.generateMyReport,
  ],
  chef: [
    EmployeePermissions.viewMyOrder,
    EmployeePermissions.viewAllOrder,

    EmployeePermissions.addItemToInventory,
    EmployeePermissions.updateItemInfo,

    EmployeePermissions.makeMenuVsRecipe,
    EmployeePermissions.spoilageMiscellaneousUsage,

    EmployeePermissions.generateMyReport,
    EmployeePermissions.generateInventoryReport,
  ],
  cook: [
    EmployeePermissions.viewMyOrder,
    EmployeePermissions.viewAllOrder,

    EmployeePermissions.addItemToInventory,
    EmployeePermissions.updateItemInfo,

    EmployeePermissions.makeMenuVsRecipe,
    EmployeePermissions.spoilageMiscellaneousUsage,

    EmployeePermissions.generateMyReport,
    EmployeePermissions.generateInventoryReport,
  ],
  steward: [
    EmployeePermissions.viewMyOrder,
    EmployeePermissions.viewAllOrder,

    EmployeePermissions.spoilageMiscellaneousUsage,

    EmployeePermissions.generateMyReport,
  ],
  trainee: [
    EmployeePermissions.viewMyOrder,
    EmployeePermissions.postOrder,
    EmployeePermissions.updateOrder,

    EmployeePermissions.acceptRestaurantPayment,
    EmployeePermissions.updateRestaurantPayment,

    EmployeePermissions.generateMyReport,
  ],
  handyman: [EmployeePermissions.updateRoomInfo, EmployeePermissions.generateMyReport],
  storekeeper: [
    EmployeePermissions.makeMenu,
    EmployeePermissions.updateMenu,
    EmployeePermissions.updateMenuPrice,

    EmployeePermissions.viewMyOrder,
    EmployeePermissions.viewAllOrder,

    EmployeePermissions.addItemToInventory,
    EmployeePermissions.updateItemInfo,

    EmployeePermissions.makeMenuVsRecipe,
    EmployeePermissions.spoilageMiscellaneousUsage,

    EmployeePermissions.issueItem,
    EmployeePermissions.updateIssue,

    EmployeePermissions.purchaseItem,
    EmployeePermissions.updatePurchase,

    EmployeePermissions.addExpense,
    EmployeePermissions.updateExpense,

    EmployeePermissions.generateMyReport,
    EmployeePermissions.generateRestaurantReport,
    EmployeePermissions.generateInventoryReport,
  ],
  "software admin": [
    EmployeePermissions.registerGuest,
    EmployeePermissions.updateGuestInfo,

    EmployeePermissions.createRoom,
    EmployeePermissions.updateRoomInfo,
    EmployeePermissions.updateRoomStatus,

    EmployeePermissions.bookingARoom,
    EmployeePermissions.giftBookingARoom,
    EmployeePermissions.voidBookingARoom,
    EmployeePermissions.updateBookingInfo,
    EmployeePermissions.updateBookingPrice,

    EmployeePermissions.acceptAccommodationPayment,
    EmployeePermissions.updateAccommodationPayment,

    EmployeePermissions.makeMenu,
    EmployeePermissions.updateMenu,
    EmployeePermissions.updateMenuPrice,

    EmployeePermissions.viewMyOrder,
    EmployeePermissions.viewAllOrder,
    EmployeePermissions.postOrder,
    EmployeePermissions.updateOrder,
    EmployeePermissions.updateAllOrder,
    EmployeePermissions.giftOrder,
    EmployeePermissions.voidOrder,
    EmployeePermissions.transferOrder,

    EmployeePermissions.acceptRestaurantPayment,
    EmployeePermissions.updateRestaurantPayment,

    EmployeePermissions.addItemToInventory,
    EmployeePermissions.updateItemInfo,

    EmployeePermissions.makeMenuVsRecipe,
    EmployeePermissions.spoilageMiscellaneousUsage,

    EmployeePermissions.issueItem,
    EmployeePermissions.updateIssue,

    EmployeePermissions.purchaseItem,
    EmployeePermissions.updatePurchase,

    EmployeePermissions.registerEmployee,
    EmployeePermissions.updateEmployeeInfo,
    EmployeePermissions.updateEmployeePermissions,

    EmployeePermissions.addExpense,
    EmployeePermissions.updateExpense,

    EmployeePermissions.verifyPayment,
    EmployeePermissions.generateMyReport,
    EmployeePermissions.generateAccommodationReport,
    EmployeePermissions.generateRestaurantReport,
    EmployeePermissions.generateInventoryReport,
    EmployeePermissions.generateGeneralReport,
  ],
};

export class EmployeeService implements IService<IEmployee> {
  create = async (newEmployee: IEmployee): Promise<IEmployee> => {
    let employee: IEmployee = new EmployeeModel(newEmployee);

    if (
      isEmpty(employee.permissions) ||
      (Array.isArray(employee.permissions) && employee.permissions.length === 0)
    )
      employee.permissions = defaultPermission[employee.jobTitle];

    const error = employee.validateSync();

    if (!error) {
      await employee.save();
      return employee;
    } else throw error;
  };

  find = async (query: FindQueryModel): Promise<IEmployee[]> => {
    const employees = await EmployeeModel.find(
      new EmployeeFilterModel(query.filter ?? {}).toMongoFilter()
    )
      .limit(query.options?.limit ?? MAX_LIMIT)
      .skip(query.options?.skip ?? 0)
      .sort(query.options?.sort ?? {})
      .select(query.fields ?? {});

    return employees;
  };

  findById = async (_id: string): Promise<IEmployee> => {
    const employee = await EmployeeModel.findById(_id);

    if (!employee) notFoundExceptionHandler("employee", { _id: _id });
    else return employee;
  };

  update = async (
    query: FindQueryModel,
    updatedData: TMap
  ): Promise<IUpdateResponse<IEmployee>> => {
    const employees = await EmployeeModel.find(query);

    for (let i = 0; i < employees.length; i++) {
      employees[i].$set(updatedData);
      await employees[i].save();
    }

    return { affected: employees, count: { matched: 0, affected: 0 } };
  };

  updateById = async (_id: string, updateData: TMap): Promise<IEmployee> => {
    const employee = await EmployeeModel.findById({ _id: _id });

    if (!employee) notFoundExceptionHandler("employee", { _id: _id });
    else {
      employee.$set(updateData);
      await employee.save();

      return employee;
    }
  };
}

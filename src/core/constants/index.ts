export const MAX_LIMIT = 50;

export enum JobTitles {
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
export const JobTitlesMapping: Record<string, JobTitles> = {
  "general manager": JobTitles.generalManager,
  supervisor: JobTitles.supervisor,
  "accommodation supervisor": JobTitles.accommodationSupervisor,
  reception: JobTitles.reception,
  housekeeper: JobTitles.housekeeper,
  security: JobTitles.security,
  "restaurant supervisor": JobTitles.restaurantSupervisor,
  cashier: JobTitles.cashier,
  waiter: JobTitles.waiter,
  chef: JobTitles.chef,
  cook: JobTitles.cook,
  steward: JobTitles.steward,
  trainee: JobTitles.trainee,
  handyman: JobTitles.handyman,
  storekeeper: JobTitles.storekeeper,
  "software admin": JobTitles.softwareAdmin,
};

export enum EmployeePermissions {
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

  viewMyOrder = "view my order",
  viewAllOrder = "view all order",
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
  updateEmployeePermissions = "update employee permission",

  addExpense = "add expense",
  updateExpense = "update expense",

  verifyPayment = "verify payment",
  generateMyReport = "generate my report",
  generateAccommodationReport = "generate accommodation report",
  generateRestaurantReport = "generate restaurant report",
  generateInventoryReport = "generate inventory report",
  generateGeneralReport = "generate general report",
}
export const EmployeePermissionsMapping: Record<string, EmployeePermissions> = {
  "register guest": EmployeePermissions.registerGuest,
  "update guest info": EmployeePermissions.updateGuestInfo,
  "create room": EmployeePermissions.createRoom,
  "update room info": EmployeePermissions.updateRoomInfo,
  "update room status": EmployeePermissions.updateRoomStatus,

  "booking a room": EmployeePermissions.bookingARoom,
  "gift booking a room": EmployeePermissions.giftBookingARoom,
  "void booking a room": EmployeePermissions.voidBookingARoom,
  "update booking info": EmployeePermissions.updateBookingInfo,
  "update booking price": EmployeePermissions.updateBookingPrice,

  "accept accommodation payment": EmployeePermissions.acceptAccommodationPayment,
  "update accommodation payment": EmployeePermissions.updateAccommodationPayment,

  "make menu": EmployeePermissions.makeMenu,
  "update menu": EmployeePermissions.updateMenu,
  "update menu price": EmployeePermissions.updateMenuPrice,

  "view my order": EmployeePermissions.viewMyOrder,
  "view all order": EmployeePermissions.viewAllOrder,
  "post order": EmployeePermissions.postOrder,
  "update order": EmployeePermissions.updateOrder,
  "update all order": EmployeePermissions.updateAllOrder,
  "gift order": EmployeePermissions.giftOrder,
  "void order": EmployeePermissions.voidOrder,
  "transfer order": EmployeePermissions.transferOrder,

  "accept restaurant payment": EmployeePermissions.acceptRestaurantPayment,
  "update restaurant payment": EmployeePermissions.updateRestaurantPayment,

  "add item to inventory": EmployeePermissions.addItemToInventory,
  "update item info": EmployeePermissions.updateItemInfo,

  "make menu vs recipe": EmployeePermissions.makeMenuVsRecipe,
  "spoilage miscellaneous usage": EmployeePermissions.spoilageMiscellaneousUsage,

  "issue item": EmployeePermissions.issueItem,
  "update issue": EmployeePermissions.updateIssue,

  "purchase item": EmployeePermissions.purchaseItem,
  "update purchase": EmployeePermissions.updatePurchase,

  "register employee": EmployeePermissions.registerEmployee,
  "update employee info": EmployeePermissions.updateEmployeeInfo,
  "update employee permission": EmployeePermissions.updateEmployeePermissions,

  "add expense": EmployeePermissions.addExpense,
  "update expense": EmployeePermissions.updateExpense,

  "verify payment": EmployeePermissions.verifyPayment,
  "generate my report": EmployeePermissions.generateMyReport,
  "generate accommodation report": EmployeePermissions.generateAccommodationReport,
  "generate restaurant report": EmployeePermissions.generateRestaurantReport,
  "generate inventory report": EmployeePermissions.generateInventoryReport,
  "generate general report": EmployeePermissions.generateGeneralReport,
};

export enum RoomTypes {
  single = "single",
  double = "double",
  twin = "twin",
  triple = "triple",
  deluxe = "deluxe",
  family = "family",
  executive = "executive",
}
export const RoomTypesMapping: Record<string, RoomTypes> = {
  single: RoomTypes.single,
  double: RoomTypes.double,
  twin: RoomTypes.twin,
  triple: RoomTypes.triple,
  deluxe: RoomTypes.deluxe,
  family: RoomTypes.family,
  executive: RoomTypes.executive,
};

export enum OccupancyStatuses {
  vacant = "vacant",
  checkIn = "check-in",
  occupied = "occupied",
  checkOut = "check-out",
  reserved = "reserved",
  blocked = "blocked",
  maintenance = "maintenance",
}
export const OccupancyStatusesMapping: Record<string, OccupancyStatuses> = {
  vacant: OccupancyStatuses.vacant,
  "check-in": OccupancyStatuses.checkIn,
  occupied: OccupancyStatuses.occupied,
  "check-out": OccupancyStatuses.checkOut,
  reserved: OccupancyStatuses.reserved,
  blocked: OccupancyStatuses.blocked,
  maintenance: OccupancyStatuses.maintenance,
};

export enum MealPlans {
  roomOnly = "room only",
  breakfast = "breakfast",
  halfBoard = "half board",
  fullBoard = "full board",
  custom = "custom",
}
export const MealPlansMapping: Record<string, MealPlans> = {
  "room only": MealPlans.roomOnly,
  breakfast: MealPlans.breakfast,
  "half board": MealPlans.halfBoard,
  "full board": MealPlans.fullBoard,
  custom: MealPlans.custom,
};

export enum MarketSources {
  walkIn = "walk-in",
  online = "online",
  agent = "agent",
  others = "others",
}
export const MarketSourcesMapping: Record<string, MarketSources> = {
  "walk-in": MarketSources.walkIn,
  online: MarketSources.online,
  agent: MarketSources.agent,
  others: MarketSources.others,
};

export enum ErrorTypes {
  UNAUTHENTICATED = "unauthenticated",
  UNAUTHORIZED = "unauthorized",
  NOT_FOUND = "not found",
  DUPLICATED = "duplicated",
  INVALID_DATA = "invalid data",
  MISSING_DATA = "missing data",
  UNKNOWN = "unknown",
  INTERNAL_ERROR = "internal error",
}

export enum HTTPStatusCodes {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  MULTI_STATUS = 207,
  MULTIPLE_CHOICES = 300,
  MOVED_PERMANENTLY = 301,
  MOVED_TEMPORARILY = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  USE_PROXY = 305,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  REQUEST_TOO_LONG = 413,
  REQUEST_URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  REQUESTED_RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  IM_A_TEAPOT = 418,
  INSUFFICIENT_SPACE_ON_RESOURCE = 419,
  METHOD_FAILURE = 420,
  MISDIRECTED_REQUEST = 421,
  UNPROCESSABLE_ENTITY = 422,
  LOCKED = 423,
  FAILED_DEPENDENCY = 424,
  PRECONDITION_REQUIRED = 428,
  TOO_MANY_REQUESTS = 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
  UNAVAILABLE_FOR_LEGAL_REASONS = 451,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
  INSUFFICIENT_STORAGE = 507,
  NETWORK_AUTHENTICATION_REQUIRED = 511,
}

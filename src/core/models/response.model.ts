import { HTTPStatusCodes } from "../constants";
import { DefaultException } from "../exceptions/default_exception";
import { ValidationException } from "../exceptions/validation_exception";

interface IResponse {
  success: boolean;
  status: HTTPStatusCodes;
  result?: {
    data?: any;
    errors?: (DefaultException | ValidationException)[];
  };
  meta?: any;
}

export class ResponseModel implements IResponse {
  public success;
  public result;
  public status;
  public meta;

  constructor({ success, status, result, meta }: IResponse) {
    this.success = success;
    this.status = status;
    this.result = result;
    this.meta = meta;
  }
}

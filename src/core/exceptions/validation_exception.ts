import { ErrorTypes } from "../constants";
import { DefaultException } from "./default_exception";

interface IValidationError {
  type: ErrorTypes;
  message: string;
  field: string;
  value: any;
  details?: any;
}

export class ValidationException
  extends DefaultException
  implements IValidationError
{
  public type: ErrorTypes;
  public message: string;
  public field: string;
  public value: any;
  public details?: any;

  constructor({ type, message, field, value, details }: IValidationError) {
    super({ type, message, details });
    this.type = type;
    this.message = message;
    this.field = field;
    this.value = value;
    this.details = details;
  }
  toJSON() {
    return {
      type: this.type,
      message: this.message,
      field: this.field,
      value: this.value,
      details: this.details,
    };
  }
}

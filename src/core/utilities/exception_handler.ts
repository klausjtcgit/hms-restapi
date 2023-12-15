import { NextFunction } from "express";
import { ErrorTypes } from "../constants";
import { DefaultException } from "../exceptions/default_exception";
import { ResponseModel } from "../models/response.model";
import { HTTPStatusCodes } from "../constants";
import { ValidationException } from "../exceptions/validation_exception";
import { isEmpty } from "./utilities";

export function globalExceptionHandler(error: any, next: NextFunction) {
  console.log(
    "🚀 ~ file: exception_handler.ts:10 ~ globalExceptionHandler ~ error:",
    JSON.stringify(error)
  );
  let _error: ResponseModel;

  if (error.result && error.result.errors) {
    _error = { ...error, meta: { ...error } };
  } else {
    let _status: HTTPStatusCodes =
      error.status ?? HTTPStatusCodes.INTERNAL_SERVER_ERROR;
    let _type: ErrorTypes = error.type ?? ErrorTypes.INTERNAL_ERROR;
    let _message =
      error.message ||
      "😅 Whoopsie Daisy! Something unknown has happened. try refreshing 🔄.";
    let _validationException: ValidationException[] = [];

    if (error.status) _status = error.status;
    else if (error.code === 11000) {
      _status = HTTPStatusCodes.CONFLICT;
      const key = Object.keys(error.keyValue)[0];

      _validationException.push(
        new ValidationException({
          type: ErrorTypes.DUPLICATED,
          message: `Duplicated entry for the unique field: '${key}'`,
          value: error.keyValue[key],
          field: key,
        })
      );
    } else if (!isEmpty(error.errors)) {
      _status = HTTPStatusCodes.UNPROCESSABLE_ENTITY;
      Object.keys(error.errors).forEach((key: string) => {
        _validationException.push(
          new ValidationException({
            type:
              error.errors[key].kind === "required"
                ? ErrorTypes.MISSING_DATA
                : ErrorTypes.INVALID_DATA,
            message:
              error.errors[key].kind === "required"
                ? `Missing required field: '${key}'`
                : error.errors[key].name === "CastError"
                ? `Invalid datatype for the field: '${key}'. Expected '${error.errors[key].kind}' but received ${error.errors[key].valueType}.`
                : `Invalid field: '${key}'. Make sure to provide a valid data`,
            field: key,
            value:
              error.errors[key].kind === "required"
                ? null
                : error.errors[key].value,
          })
        );
        error.errors[key];
      });
    }

    _error = new ResponseModel({
      success: false,
      status: _status,
      result: {
        errors: !_validationException.length
          ? [
              new DefaultException({
                type: _type,
                message: _message,
                details: error.details,
              }),
            ]
          : _validationException,
      },
    });
  }

  // _error.meta = error;

  next(_error);
}

export function notFoundExceptionHandler(
  resource: string,
  filter?: any
): never {
  throw new ResponseModel({
    success: false,
    status: HTTPStatusCodes.NOT_FOUND,
    result: {
      errors: [
        new DefaultException({
          type: ErrorTypes.NOT_FOUND,
          message: `🤷‍♂️ We couldn't find any ${resource} that matches the given filter in our database 🥀. Please double-check your filter criteria or try a different request.`,
          details: {
            filter: filter,
            resource: resource,
          },
        }),
      ],
    },
  });
}

export function validationExceptionHandler(
  invalids: ValidationException[]
): never {
  throw new ResponseModel({
    success: false,
    status: HTTPStatusCodes.UNPROCESSABLE_ENTITY,
    result: {
      errors: invalids,
    },
  });
}

export function unauthenticatedExceptionHandler(message?: string): never {
  throw new ResponseModel({
    success: false,
    status: HTTPStatusCodes.UNAUTHORIZED,
    result: {
      errors: [
        new DefaultException({
          type: ErrorTypes.UNAUTHORIZED,
          message:
            message ||
            `🚫 Unauthorized access. You don't have the necessary permissions to access this resource.`,
          details: {
            suggestions: [
              "Make sure you have the necessary permissions for this action.",
              "Ensure that you are logged in with the correct account.",
              "Review the documentation for proper authentication steps.",
              "If you believe this is an error, contact support for further assistance.",
            ],
          },
        }),
      ],
    },
  });
}

export function unauthorizedExceptionHandler(message?: string): never {
  throw new ResponseModel({
    success: false,
    status: HTTPStatusCodes.UNAUTHORIZED,
    result: {
      errors: [
        new DefaultException({
          type: ErrorTypes.UNAUTHENTICATED,
          message:
            message ||
            `🔒 Authentication required to access the requested resource, please send request with accessToken.`,
          details: {
            suggestions: [
              "Make sure to have accesskey, then get your accesskey by logging in",
              "if you don't have an account at all pleas contact the admin/support team go register a new account.",
              "Check if your account has been temporarily suspended or disabled. If so contact you supervisor/admin",
            ],
          },
        }),
      ],
    },
  });
}

export function unknownExceptionHandler(message?: string): never {
  throw new ResponseModel({
    success: false,
    status: HTTPStatusCodes.INTERNAL_SERVER_ERROR,
    result: {
      errors: [
        new DefaultException({
          type: ErrorTypes.UNKNOWN,
          message:
            message ||
            `😲 An unknown error occurred while processing your request. Please try again later or contact support for assistance.`,
        }),
      ],
    },
  });
}

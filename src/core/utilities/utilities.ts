import jwt, { Secret } from "jsonwebtoken";
import { TOKEN_KEY } from "../configuration";

/**
 * @method isEmpty
 * @param { Any } value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: any): boolean => {
  if (value == null) {
    return true;
  } else if (typeof value !== "number" && value === "") {
    return true;
  } else if (typeof value === "object") {
    if (Array.isArray(value)) return !value.length;
    else return !Object.keys(value).length;
  } else {
    return false;
  }
};

export type DatetimeStringStyle = "full" | "long" | "medium" | "short";

/**
 * @method datetimeString
 * @param { Date } date - Default new Date()
 * @param { DatetimeStringStyle } style - the datetime string style Default medium
 * @returns {string} string
 * @description converts datetime to string base on given style
 */
export const datetimeString = (
  date: Date = new Date(),
  style: DatetimeStringStyle | "timestamp" = "medium"
): string => {
  if (style === "timestamp") return date.getTime().toLocaleString();
  else
    return date.toLocaleString("en-US", {
      dateStyle: style,
      timeStyle: style,
      hour12: false,
    });
};

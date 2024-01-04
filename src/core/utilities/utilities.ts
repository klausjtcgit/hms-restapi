export type TMap = Record<string, any>;

export const isEmpty = (value: any): boolean => {
  return value == null || value === "" || (typeof value === "object" && !Object.keys(value).length);
};

export const isUndefined = (value: any): boolean => {
  return value === undefined;
};

export const stringifyJson = (json: object): string => {
  let stringJson = JSON.stringify(json);

  stringJson = stringJson
    .split("")
    .map((_) => {
      if (_ === "{") return "{ ";
      else if (_ === ":") return ": ";
      else if (_ === ",") return ", ";
      else return _;
    })
    .join("");

  return stringJson;
};

export const toRegex = (value: string | undefined): string | undefined => {
  if (value === undefined) return undefined;
  else
    return `^.*${value
      .split("")
      .map((_) => _ + ".*")
      .join("")}$`;
};

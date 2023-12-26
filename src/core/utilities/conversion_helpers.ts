import { MAX_LIMIT } from "../constants";
import { FindQueryModel } from "../models/find_query.model";
import { isEmpty } from "./utilities";

export const toNumber = (potentialNumber: any): number | undefined => {
  return Number(potentialNumber) || undefined;
};

export const to = (potentialNumber: any): number | undefined => {
  return Number(potentialNumber) || undefined;
};

export const toDatetime = (potentialNumber: any): Date | undefined => {
  const _date = new Date(Date.parse(potentialNumber));
  return isNaN(_date.getTime()) ? undefined : _date;
};

export const queryToMongoQuery = (query: any): FindQueryModel => {
  const _limit: number = toNumber(query.limit) ?? MAX_LIMIT;
  const _skip: number = toNumber(query.skip) ?? 0;

  const _fieldsValue = !isEmpty(query.fields) && query.fields.startsWith("-") ? 0 : 1;
  const _fields: Record<string, 0 | 1> | undefined = isEmpty(query.fields)
    ? undefined
    : Object.fromEntries(
        String(
          query.fields.startsWith("+") || query.fields.startsWith("-")
            ? query.fields.slice("1")
            : query.fields
        )
          .split(",")
          .map((field: string) => [field, _fieldsValue])
          .filter((_) => _[0] !== "")
      );

  const _sort: Record<string, -1 | 1> | undefined = isEmpty(query.sort)
    ? undefined
    : Object.fromEntries(
        query.sort.split(",").map((field: string) => {
          if (field.includes("-")) return [field.slice(1), -1];
          else if (field.includes("+")) return [field.slice(1), 1];
          else return [field, 1];
        })
      );

  const _filter = Object.fromEntries(
    Object.entries(query).filter(([key]) => !["fields", "sort", "limit", "skip"].includes(key))
  );

  return new FindQueryModel({
    filter: _filter,
    fields: _fields,
    options: {
      sort: _sort,
      limit: _limit,
      skip: _skip,
    },
  });
};

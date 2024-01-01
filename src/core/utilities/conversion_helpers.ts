import { MAX_LIMIT } from "../constants";
import { FindQueryModel, TFilterValue } from "../models/find_query.model";
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
  let _limit: number | undefined;
  let _skip: number | undefined;
  let _fields: Record<string, 0 | 1> | undefined;
  let _sort: Record<string, -1 | 1> | undefined;
  let _filter: Record<string, TFilterValue> | undefined;

  _limit = toNumber(query.limit) ?? MAX_LIMIT;
  _skip = toNumber(query.skip) ?? 0;

  const _fieldsValue = !isEmpty(query.fields) && query.fields.startsWith("-") ? 0 : 1;
  _fields = isEmpty(query.fields)
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
  _sort = isEmpty(query.sort)
    ? undefined
    : Object.fromEntries(
        query.sort.split(",").map((field: string) => {
          if (field.includes("-")) return [field.slice(1), -1];
          else if (field.includes("+")) return [field.slice(1), 1];
          else return [field, 1];
        })
      );

  _filter = Object.fromEntries(
    Object.entries(query).reduce((accumulated: [string, TFilterValue][], [key, value]) => {
      if (!["fields", "sort", "limit", "skip"].includes(key)) {
        let _index = accumulated.findIndex((field) => field[0] === key);

        if (_index === -1) {
          accumulated.push([key.split(/[><!]/)[0], {}]);

          _index = accumulated.length - 1;
        }

        if (key.endsWith(">")) {
          accumulated[_index][1].gte = value as string;
        } else if (key.endsWith("<")) {
          accumulated[_index][1].lte = value as string;
        } else if (key.endsWith("!")) {
          accumulated[_index][1].not = value as string;
        } else if (key.includes(">")) {
          accumulated[_index][1].gt = key.split(">")[1];
        } else if (key.includes("<")) {
          accumulated[_index][1].lt = key.split("<")[1];
        } else if (key.includes("!")) {
          accumulated[_index][1].not = key.split("!")[1];
        } else accumulated[_index][1].equal = value as string;
      }

      return accumulated;
    }, [] as [string, TFilterValue][])
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

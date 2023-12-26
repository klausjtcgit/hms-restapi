import { FindQueryModel } from "../models/find_query.model";
import { TMap } from "../utilities/utilities";
import { IUpdateResponse } from "./update_response.interface";

export interface IService<T> {
  create: (newDocument: T) => Promise<T>;

  find: (query: FindQueryModel) => Promise<T[]>;

  findById: (_id: string) => Promise<T>;

  update: (query: FindQueryModel, updatedData: TMap) => Promise<IUpdateResponse<T>>;

  updateById: (_id: string, updateData: TMap) => Promise<T>;

  delete?: (query: FindQueryModel) => Promise<IUpdateResponse<T>>;

  deleteById?: (_id: string) => Promise<T>;
}

import { TMap } from "../utilities/utilities";
import { IFindOptions } from "./find_options.interface";
import { IUpdateResponse } from "./update_response.interface";

export interface IService<T> {
  create: (newDocument: T) => Promise<T>;

  find: (filter: TMap, options?: IFindOptions) => Promise<T[]>;

  findById: (_id: string) => Promise<T>;

  findByIds: (_ids: string[], options?: IFindOptions) => Promise<T[]>;

  update: (filter: TMap, updatedData: TMap) => Promise<IUpdateResponse<T>>;

  updateById: (_id: string, updateData: TMap) => Promise<T>;

  delete?: (filter: TMap) => Promise<IUpdateResponse<T>>;

  deleteById?: (_id: string) => Promise<T>;
}

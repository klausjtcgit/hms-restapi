export interface IFindQuery {
  filter?: Record<string, any>;
  fields?: Record<string, 0 | 1>;
  options?: {
    sort?: Record<string, -1 | 1>;
    limit?: number;
    skip?: number;
  };
}

export class FindQueryModel implements IFindQuery {
  public filter?;
  public fields?;
  public options?;

  constructor({ filter, fields, options }: IFindQuery) {
    this.filter = filter;
    this.fields = fields;
    this.options = options;
  }
}

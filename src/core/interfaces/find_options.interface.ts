export interface IFindOptions {
  projection?: string[] | undefined;
  sort?: Record<string, 0 | 1> | undefined;
  limit?: number | undefined;
  skip?: number | undefined;
}

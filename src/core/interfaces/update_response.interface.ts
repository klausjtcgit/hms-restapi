// service_update_response.interface.ts

export interface IUpdateResponse<T> {
  affected: T[];
  count: {
    matched: number;
    affected: number;
  };
}

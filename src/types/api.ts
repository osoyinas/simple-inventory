export interface Response {
  status: string;
  message: string;
  data?: unknown;
}

export interface PersonsResponse {
  status: string;
  persons: Person[];
}

export interface Person {
  id: number;
  name: string;
}

export enum SORT_BY {
  none = 'none',
  id = 'id',
  name = 'name',
}
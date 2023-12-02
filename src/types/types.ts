export interface Response {
  status: string;
  message: string;
  data?: unknown;
}

export interface Person {
  id: number;
  name: string;
}

export interface Material {
  id: number;
  name: string;
  units: string;
  available_amount: number;
  absolute_amount: number;

}

export enum SORT_BY {
  none = 'none',
  id = 'id',
  name = 'name',
}
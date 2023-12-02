export interface Response {
  status: string;
  message: string;
  data?: unknown;
}

export type Item = Material | Person;


export interface Person {
  id: number;
  name: string;
}

export interface Material {
  id: number;
  name: string;
  units: string;
  available_quantity: number;
  total_quantity: number;

}

export enum SORT_BY {
  none = 'none',
  id = 'id',
  name = 'name',
  available_quantity = 'quantity',
  total_quantity = 'totalQuantity',
  units = 'units'
}
export interface Response<T> {
  status: string;
  message: string;
  data?: T;
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
  available_amount?: number;
  absolute_amount: number;
}

export enum SORT_BY {
  none = 'none',
  id = 'id',
  name = 'name',
  available_quantity = 'quantity',
  total_quantity = 'totalQuantity',
  units = 'units'
}

export interface header {
  name: string;
}
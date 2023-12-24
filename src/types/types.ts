import { ReactNode } from "react";

export interface Response<T> {
  status: string;
  message: string;
  data?: T;
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

export interface Option {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  name: string;
}

export enum UNIT {
  unit = 'uds',
  meter = 'm',
  centimeter = 'cm',
  milimeter = 'mm',
  kg = 'kg',
  l = 'l',
  m2 = 'm2',
}

export interface FormField<T> {
  label: string;
  key: keyof T;
  type?: string;
  options?: Option[];
}

export interface TableField<T> {
  key: keyof T;
  className?: string;
  logic?: (value: T) => ReactNode;
}
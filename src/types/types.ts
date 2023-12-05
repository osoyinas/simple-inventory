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

export interface FormField<T> {
  label: string;
  key: keyof T;
  type?: string;
}

export interface TableField<T> {
  key: keyof T;
  className?: string;
  logic?: (value: T) => ReactNode;
}
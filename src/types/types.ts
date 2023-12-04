export interface Response<T> {
  status: string;
  message: string;
  data?: T;
}

export type Item = Material | Person | Work | Movement;


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


export interface Work {
  id: number;
  name: string;
  start_date: Date;
  status: STATUS;
  description: string;

}

export interface Movement {
  id : number;
  id_person: number;
  id_material: number;
  id_work: number;
  units: number;
  date: Date;
  type: MOVEMENT_TYPE;
}

export enum SORT_BY {
  none = 'none',
  id = 'id',
  name = 'name',
  available_quantity = 'quantity',
  total_quantity = 'totalQuantity',
  units = 'units'
}

export enum STATUS {
  pending = 'PENDING',
  done = 'DONE',	
}

export enum MOVEMENT_TYPE {
  in = 'IN',	
  out = 'OUT',
}

export interface header {
  name: string;
}
export interface Field {
  label: string;
  name: string;
  type?: string;
  value?: string;
}
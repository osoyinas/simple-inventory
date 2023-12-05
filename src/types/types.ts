export interface Response<T> {
  status: string;
  message: string;
  data?: T;
}

export interface Item {
  id: number;
}

export interface Person extends Item  {
  name: string;

}

export interface Material extends Item{
  name: string;
  units: string;
  available_amount?: number;
  absolute_amount: number;
}


export interface Work extends Item{
  name: string;
  startDate: Date;
  status: STATUS;
  description: string;

}

export interface Movement extends Item{
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
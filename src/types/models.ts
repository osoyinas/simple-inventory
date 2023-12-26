export interface Item {
  id: number;
}

export interface Person extends Item {
  name: string;
}

export interface Material extends Item {
  name: string;
  units: string;
  available_amount?: number;
  absolute_amount: number;
  description?: string;
}

export interface Work extends Item {
  name: string;
  start_date: Date;
  status: STATUS;
  description?: string;
}

export interface Movement extends Item {
  person_id: number;
  material_id: number;
  work_id: number;
  amount: number;
  date: Date;
  type: MOVEMENT_TYPE;
  person_name: string;
  material_name: string;
  material_units: string;
  work_name: string;
  description?: string;
}

export enum STATUS {
  pending = "PENDING",
  done = "DONE",
}

export enum MOVEMENT_TYPE {
  in = "IN",
  out = "OUT",
}

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
}

export interface Work extends Item {
  name: string;
  start_date: Date;
  status: STATUS;
  description: string;
}

export interface Movement extends Item {
  id_person: number;
  id_material: number;
  id_work: number;
  amount: number;
  date: Date;
  type: MOVEMENT_TYPE;
  person_name: string;
  material_name: string;
  work_name: string;
}

export enum STATUS {
  pending = "PENDING",
  done = "DONE",
}

export enum MOVEMENT_TYPE {
  in = "IN",
  out = "OUT",
}

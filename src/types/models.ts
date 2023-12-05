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

// [
//   {
//       "id": 3,
//       "id_person": 1,
//       "id_material": 7,
//       "id_work": 1,
//       "units": 10,
//       "date": "2023-01-06",
//       "type": "IN",
//       "person_name": "John Doe",
//       "material_name": "Tornillos",
//       "work_name": "Work 1"
//   }
// ]
export interface Movement extends Item {
  id_person: number;
  id_material: number;
  id_work: number;
  units: number;
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

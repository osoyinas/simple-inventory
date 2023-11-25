export interface Response {
  status: string;
  message: string;
}

export interface PersonsResponse {
    status: string;
    persons: Person[];
}

export interface Person {
  id?:string;
  name: string;
}
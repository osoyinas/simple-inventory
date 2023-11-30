export interface Response {
  status: string;
  message: string;
  data?: unknown;
}

export interface PersonsResponse {
  status: string;
  persons: Person[];
}

export interface Person {
  id?: string;
  name: string;
}

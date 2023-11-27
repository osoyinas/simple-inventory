import { PersonsResponse, Person, Response } from "@/types/api";

export function getPersons(): Promise<PersonsResponse> {
  return new Promise((resolve, reject) => {
    window.ipcRenderer.send("getPersons");
    window.ipcRenderer.on("getPersonsResponse", (_event, payload) => {
      if (payload.status === "error") {
        reject(payload.message);
      } else {
        resolve(payload);
      }
    });
  });
}

export function addPerson(person: Person): Promise<Response> {
  return new Promise((resolve, reject) => {
    window.ipcRenderer.send("addPerson", person);
    window.ipcRenderer.on("addPersonResponse", (_event, payload) => {
      if (payload.status === "error") {
        reject(payload);
      } else {
        resolve(payload);
      }
    });
  });
}

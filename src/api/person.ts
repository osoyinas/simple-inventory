import {PersonsResponse, Person, Response} from "@/types/api";

export function getPersons(): Promise<PersonsResponse> {
    return new Promise((resolve) => {
      window.ipcRenderer.send("getPersons");
      window.ipcRenderer.on("getPersonsResponse", (_event, payload) => {
        resolve(payload);
      });
    });
  }


export function addPerson(person: Person): Promise<Response> {
return new Promise((resolve) => {
    window.ipcRenderer.send("addPerson", person);
    window.ipcRenderer.on("addPersonResponse", (_event, payload) => {
    resolve(payload);
    });
});
}
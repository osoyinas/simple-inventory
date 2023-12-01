import { PersonsResponse, Response } from "@/types/api";

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

export function addPerson({name}: {name:string}): Promise<Response> {
    return new Promise((resolve, reject) => {
        window.ipcRenderer.send("addPerson", {name});
        window.ipcRenderer.on("addPersonResponse", (_event, payload) => {
            if (payload.status === "error") {
                reject(payload);
            } else {
                resolve(payload);
            }
        });
    });
}

export function deletePerson(personId: number): Promise<Response> {
    return new Promise((resolve, reject) => {
        window.ipcRenderer.send("deletePerson", {id: personId});
        window.ipcRenderer.on("deletePersonResponse", (_event, payload) => {
            if (payload.status === "error") {
                reject(payload);
            } else {
                resolve(payload);
            }
        });
    });
}
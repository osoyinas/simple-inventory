import { Person, Response } from "@/types/types";

export function getPersons(): Promise<Response<Person[]>> {
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

export function addPerson({name}: {name:string}): Promise<Response<Person>> {
    return new Promise((resolve, reject) => {
        window.ipcRenderer.send("addPerson", {name});
        window.ipcRenderer.on("addPersonResponse", (_event, payload) => {
            if (payload.status === "error") {
                reject(payload);
            } else {
                resolve(payload.data);
            }
        });
    });
}

export function getPerson(id:number): Promise<Response<Person>> {
    return new Promise((resolve, reject) => {
        console.log("PERSON ID: ", id);
        window.ipcRenderer.send("getPerson", {id});
        window.ipcRenderer.on("getPersonResponse", (_event, payload) => {
            if (payload.status === "error") {
                reject(payload.message);
            } else {
                resolve(payload.data);
            }
        });
    });

}

export function updatePerson(person:Person): Promise<Response<Person>> {
    return new Promise((resolve, reject) => {
        window.ipcRenderer.send("updatePerson", person);
        window.ipcRenderer.on("updatePersonResponse", (_event, payload) => {
            if (payload.status === "error") {
                reject(payload);
            } else {
                resolve(payload.data);
            }
        });
    });
}
export function deletePerson(personId: number): Promise<Response<Person>> {
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
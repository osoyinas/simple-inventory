import { Response } from "@/types/types";
import { Movement } from "@/types/models";

export function getMovements(): Promise<Response<Movement[]>> {
    return new Promise((resolve, reject) => {
        window.ipcRenderer.send("getMovements");
        window.ipcRenderer.on("getMovementsResponse", (_event, payload) => {
            if (payload.status === "error") {
                reject(payload.message);
            } else {
                resolve(payload);
            }
        });
    });
}

export function addMovement(data: Movement): Promise<Response<Movement>> {
    return new Promise((resolve, reject) => {
        window.ipcRenderer.send("addMovement", data);
        window.ipcRenderer.on("addMovementResponse", (_event, payload) => {
            if (payload.status === "error") {
                reject(payload.message);
            } else {
                resolve(payload);
            }
        });
    });
}

export function deleteMovement(id: number): Promise<Response<Movement>> {
    return new Promise((resolve, reject) => {
        window.ipcRenderer.send("deleteMovement", id);
        window.ipcRenderer.on("deleteMovementResponse", (_event, payload) => {
            if (payload.status === "error") {
                reject(payload.message);
            } else {
                resolve(payload);
            }
        });
    });
}

export function updateMovement(data: Movement): Promise<Response<Movement>> {
    return new Promise((resolve, reject) => {
        window.ipcRenderer.send("updateMovement", data);
        window.ipcRenderer.on("updateMovementResponse", (_event, payload) => {
            if (payload.status === "error") {
                reject(payload.message);
            } else {
                resolve(payload);
            }
        });
    });
}  
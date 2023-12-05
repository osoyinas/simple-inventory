import { Response } from "@/types/types";
import { Work } from "@/types/models";

export function getWorks(): Promise<Response<Work[]>> {
    return new Promise((resolve, reject) => {
        window.ipcRenderer.send("getWorks");
        window.ipcRenderer.on("getWorksResponse", (_event, payload) => {
            if (payload.status === "error") {
                reject(payload.message);
            } else {
                resolve(payload);
            }
        });
    });
}

export function addWork(work:Work): Promise<Response<Work>> {
    return new Promise((resolve, reject) => {
        window.ipcRenderer.send("addWork", work);
        window.ipcRenderer.on("addWorkResponse", (_event, payload) => {
            if (payload.status === "error") {
                reject(payload);
            } else {
                resolve(payload.data);
            }
        });
    });
}

export function deleteWork(workId: number): Promise<Response<Work>> {
    return new Promise((resolve, reject) => {
        window.ipcRenderer.send("deleteWork", {id: workId});
        window.ipcRenderer.on("deleteWorkResponse", (_event, payload) => {
            if (payload.status === "error") {
                reject(payload);
            } else {
                resolve(payload);
            }
        });
    });
}
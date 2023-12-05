import { Movement, Response } from "@/types/types";

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
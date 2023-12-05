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
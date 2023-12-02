import { Response } from "@/types/types";

export function getMaterials(): Promise<Response> {
    return new Promise((resolve, reject) => {
        window.ipcRenderer.send("getMaterials");
        window.ipcRenderer.on("getMaterialsResponse", (_event, payload) => {
            if (payload.status === "error") {
                reject(payload.message);
            } else {
                resolve(payload);
            }
        });
    });
}
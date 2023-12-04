import { Material, Response } from "@/types/types";

export function getMaterials(): Promise<Response<Material[]>> {
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


export function addMaterial({name, units, absolute_amount}:{name:string, units:string, absolute_amount:number}): Promise<Response<Material>> {
    return new Promise((resolve, reject) => {
        window.ipcRenderer.send("addMaterial", {name, units, absolute_amount});
        window.ipcRenderer.on("addMaterialResponse", (_event, payload) => {
            if (payload.status === "error") {
                reject(payload.message);
            } else {
                resolve(payload);
            }
        });
    });
}

export function deleteMaterial(id:number): Promise<Response<Material>> {
    return new Promise((resolve, reject) => {
        window.ipcRenderer.send("deleteMaterial", {id});
        window.ipcRenderer.on("deleteMaterialResponse", (_event, payload) => {
            if (payload.status === "error") {
                reject(payload.message);
            } else {
                resolve(payload);
            }
        });
    });
}
import { Response } from "@/types/types";
import { Material } from "@/types/models";

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


export function addMaterial(material : Material): Promise<Response<Material>> {
    return new Promise((resolve, reject) => {
        window.ipcRenderer.send("addMaterial", material);
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

export function getMaterial(id:number): Promise<Response<Material>> {
    return new Promise((resolve, reject) => {
        window.ipcRenderer.send("getMaterial", {id});
        window.ipcRenderer.on("getMaterialResponse", (_event, payload) => {
            if (payload.status === "error") {
                reject(payload.message);
            } else {
                resolve(payload);
            }
        });
    });
}

export function updateMaterial(material:Material): Promise<Response<Material>> {
    return new Promise((resolve, reject) => {
        window.ipcRenderer.send("updateMaterial", material);
        window.ipcRenderer.on("updateMaterialResponse", (_event, payload) => {
            if (payload.status === "error") {
                reject(payload.message);
            } else {
                resolve(payload);
            }
        });
    });
}
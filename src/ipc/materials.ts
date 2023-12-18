import { ipcMain, IpcMainEvent } from "electron";
import { executeQuery } from "../models/database";
import { Material } from "@/types/models";

export function setupMaterialsListeners() {
    ipcMain.on("getMaterials", (event: IpcMainEvent) => {
        executeQuery("SELECT * FROM Material")
            .then((materials) => {
                event.reply("getMaterialsResponse", {
                    status: "success",
                    data: materials,
                });
            })
            .catch((error) => {
                event.reply("getMaterialsResponse", {
                    status: "error",
                    message: error,
                });
            });
    });

    ipcMain.on("getMaterial", (event: IpcMainEvent, data: { id: number }) => {
        executeQuery(`SELECT * FROM Material WHERE id = '${data.id}';`)
            .then((material) => {
                event.reply("getMaterialResponse", {
                    status: "success",
                    data: material,
                });
            })
            .catch((error) => {
                event.reply("getMaterialResponse", {
                    status: "error",
                    message: error,
                });
            });
    });
    ipcMain.on("addMaterial", (event: IpcMainEvent, data: Material) => {
        executeQuery(
            `INSERT INTO Material (name, units, absolute_amount, available_amount ) VALUES ('${data.name}', '${data.units}', ${data.absolute_amount}, ${data.absolute_amount} );`
        )
            .then(() => {
                event.reply("addMaterialResponse", {
                    status: "success",
                    message: "Material añadido de forma exitosa.",
                });
            })
            .catch((error) => {
                event.reply("addMaterialResponse", {
                    status: "error",
                    message: error,
                });
            });
    });

    ipcMain.on(
        "updateMaterial",
        (
            event: IpcMainEvent,
            data: { id: number; name: string; units: string; absolute_amount: number }
        ) => {
            executeQuery(
                `UPDATE Material SET name = '${data.name}', units = '${data.units}', absolute_amount = ${data.absolute_amount} WHERE id = '${data.id}';`
            )
                .then(() => {
                    return executeQuery(
                        `SELECT * FROM Material WHERE id = '${data.id}';`
                    );
                })
                .then((result) => {
                    event.reply("updateMaterialResponse", {
                        status: "success",
                        message: "Material actualizado de forma exitosa.",
                        data: result,
                    });
                })
                .catch((error) => {
                    event.reply("updateMaterialResponse", {
                        status: "error",
                        message: error,
                    });
                });
        }
    );
    ipcMain.on("deleteMaterial", (event: IpcMainEvent, data: { id: number }) => {
        executeQuery(`DELETE FROM Material WHERE id = '${data.id}';`)
            .then(() => {
                event.reply("deleteMaterialResponse", {
                    status: "success",
                    message: "Material eliminado de forma exitosa.",
                });
            })
            .catch((error) => {
                event.reply("deleteMaterialResponse", {
                    status: "error",
                    message: error,
                });
            });
    });
}
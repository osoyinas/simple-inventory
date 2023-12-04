// ipcHandler.ts
import { ipcMain, IpcMainEvent } from "electron";
import { executeQuery } from "../models/database";
import { Material, Work } from "@/types/types";

function setupIPCListeners() {
    setupPersonsListeners();
    setupMaterialsListeners();
    setupWorksListeners();
}

export { setupIPCListeners };

function setupPersonsListeners() {
    ipcMain.on("getPersons", (event: IpcMainEvent) => {

        executeQuery("SELECT * FROM Person")
            .then((users) => {
                event.reply("getPersonsResponse", {
                    status: "success",
                    data: users,
                });
            })
            .catch((error) => {
                event.reply("getPersonsResponse", { status: "error", message: error });
            });
    });

    ipcMain.on("addPerson", (event: IpcMainEvent, data: { name: string }) => {
        executeQuery(`INSERT INTO Person (name) VALUES ('${data.name}');`)
            .then(() => {
                return executeQuery(
                    `SELECT * FROM Person WHERE id = last_insert_rowid();`
                );
            })
            .then((result) => {
                event.reply("addPersonResponse", {
                    status: "success",
                    message: "Persona añadida de forma exitosa.",
                    data: result,
                });
            })
            .catch((error) => {
                event.reply("addPersonResponse", { status: "error", message: error });
            });
    });

    ipcMain.on("deletePerson", (event: IpcMainEvent, data: { id: number }) => {
        executeQuery(`DELETE FROM Person WHERE id = '${data.id}';`)
            .then(() => {
                event.reply("deletePersonResponse", {
                    status: "success",
                    message: "Persona eliminada de forma exitosa.",
                });
            })
            .catch((error) => {
                event.reply("deletePersonResponse", {
                    status: "error",
                    message: error,
                });
            });
    });
}

function setupMaterialsListeners() {
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

    ipcMain.on(
        "addMaterial",
        (
            event: IpcMainEvent,
            data: Material
        ) => {
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

function setupWorksListeners() {
    ipcMain.on("getWorks", (event: IpcMainEvent) => {

        executeQuery("SELECT * FROM Work")
            .then((works) => {
                event.reply("getWorksResponse", { status: "success", data: works });
            })
            .catch((error) => {
                event.reply("getWorksResponse", { status: "error", message: error });
            });
    });

    ipcMain.on(
        "addWork",
        (
            event: IpcMainEvent,
            data: Work
        ) => {
            executeQuery(
                `INSERT INTO Work (name, start_date, status, description) VALUES ('${data.name}', '${data.start_date}', '${data.status}', '${data.description}');`
            )
                .then(() => {
                    event.reply("addMaterialResponse", {
                        status: "success",
                        message: "Obra añadida de forma exitosa.",
                    });
                })
                .catch((error) => {
                    event.reply("addMaterialResponse", {
                        status: "error",
                        message: error,
                    });
                });
        }
    );

    ipcMain.on("getPersonsFromWork", 
        (event: IpcMainEvent, data: { id: number }) => {
            executeQuery(`SELECT * FROM Person WHERE id IN (SELECT id_person FROM Movement WHERE id_work = ${data.id});`)
                .then((persons) => {
                    event.reply("getPersonsFromWorkResponse", { status: "success", persons: persons });
                })
                .catch((error) => {
                    event.reply("getPersonsFromWorkResponse", { status: "error", message: error });
                });
        });
}

import { ipcMain, IpcMainEvent } from "electron";
import { executeQuery } from "../models/database";

export function setupPersonsListeners() {
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

    ipcMain.on("getPerson", (event: IpcMainEvent, data: { id: number }) => {
        executeQuery(`SELECT * FROM Person WHERE id = '${data.id}';`)
            .then((user) => {
                event.reply("getPersonResponse", {
                    status: "success",
                    data: user,
                });
            })
            .catch((error) => {
                event.reply("getPersonResponse", { status: "error", message: error });
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

    ipcMain.on(
        "updatePerson",
        (event: IpcMainEvent, data: { id: number; name: string }) => {
            executeQuery(
                `UPDATE Person SET name = '${data.name}' WHERE id = '${data.id}';`
            )
                .then(() => {
                    return executeQuery(`SELECT * FROM Person WHERE id = '${data.id}';`);
                })
                .then((result) => {
                    event.reply("updatePersonResponse", {
                        status: "success",
                        message: "Persona actualizada de forma exitosa.",
                        data: result,
                    });
                })
                .catch((error) => {
                    event.reply("updatePersonResponse", {
                        status: "error",
                        message: error,
                    });
                });
        }
    );
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
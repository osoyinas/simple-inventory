import { ipcMain, IpcMainEvent } from "electron";
import { executeQuery } from "../models/database";
import { Item, Person } from "@/types/models";

export function setupPersonsListeners() {
    //Get persons
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

    //Get person
    ipcMain.on("getPerson", (event: IpcMainEvent, data: Item) => {
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

    //Add person
    ipcMain.on("addPerson", (event: IpcMainEvent, data: Person) => {
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

    //Update person
    ipcMain.on("updatePerson", (event: IpcMainEvent, data: Person) => {
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

    //Delete person
    ipcMain.on("deletePerson", (event: IpcMainEvent, data: Item) => {
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
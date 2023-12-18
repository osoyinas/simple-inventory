import { ipcMain, IpcMainEvent } from "electron";
import { executeQuery } from "../models/database";
import { Work } from "@/types/models";

export function setupWorksListeners() {
    ipcMain.on("getWorks", (event: IpcMainEvent) => {
        executeQuery("SELECT * FROM Work")
            .then((works) => {
                event.reply("getWorksResponse", { status: "success", data: works });
            })
            .catch((error) => {
                event.reply("getWorksResponse", { status: "error", message: error });
            });
    });

    ipcMain.on("addWork", (event: IpcMainEvent, data: Work) => {
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
    });
    ipcMain.on(
        "updateWork",
        (
            event: IpcMainEvent,
            data: {
        id: number;
        name: string;
        start_date: Date;
        status: string;
        description: string;
      }
        ) => {
            executeQuery(
                `UPDATE Work SET name = '${data.name}', start_date = '${data.start_date}', status = '${data.status}', description = '${data.description}' WHERE id = '${data.id}';`
            )
                .then(() => {
                    return executeQuery(`SELECT * FROM Work WHERE id = '${data.id}';`);
                })
                .then((result) => {
                    event.reply("updateWorkResponse", {
                        status: "success",
                        message: "Obra actualizada de forma exitosa.",
                        data: result,
                    });
                })
                .catch((error) => {
                    event.reply("updateWorkResponse", {
                        status: "error",
                        message: error,
                    });
                });
        }
    );

    ipcMain.on("getWork", (event: IpcMainEvent, data: { id: number }) => {
        executeQuery(`SELECT * FROM Work WHERE id = '${data.id}';`)
            .then((work) => {
                event.reply("getWorkResponse", { status: "success", data: work });
            })
            .catch((error) => {
                event.reply("getWorkResponse", { status: "error", message: error });
            });
    });
    ipcMain.on("deleteWork", (event: IpcMainEvent, data: { id: number }) => {
        executeQuery(`DELETE FROM Work WHERE id = '${data.id}';`)
            .then(() => {
                event.reply("deleteWorkResponse", {
                    status: "success",
                    message: "Obra eliminada de forma exitosa.",
                });
            })
            .catch((error) => {
                event.reply("deleteWorkResponse", {
                    status: "error",
                    message: error,
                });
            });
    });

    ipcMain.on(
        "getPersonsFromWork",
        (event: IpcMainEvent, data: { id: number }) => {
            executeQuery(
                `SELECT * FROM Person WHERE id IN (SELECT id_person FROM Movement WHERE id_work = ${data.id});`
            )
                .then((persons) => {
                    event.reply("getPersonsFromWorkResponse", {
                        status: "success",
                        persons: persons,
                    });
                })
                .catch((error) => {
                    event.reply("getPersonsFromWorkResponse", {
                        status: "error",
                        message: error,
                    });
                });
        }
    );
}
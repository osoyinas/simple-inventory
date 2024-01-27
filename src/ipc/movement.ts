import { ipcMain, IpcMainEvent } from "electron";
import { executeQuery } from "../models/database";
import { Movement } from "@/types/models";

export function setupMovementsListeners() {
    ipcMain.on("getMovements", (event: IpcMainEvent) => {
        executeQuery("SELECT * FROM MovementInfo")
            .then((movements) => {
                event.reply("getMovementsResponse", {
                    status: "success",
                    data: movements,
                });
            })
            .catch((error) => {
                event.reply("getMovementsResponse", {
                    status: "error",
                    message: error,
                });
            });
    });

    ipcMain.on("addMovement", (event: IpcMainEvent, data: Movement) => {
        executeQuery(
            `INSERT INTO Movement (material_id, work_id, amount, date, type, description) VALUES (${data.material_id}, ${data.work_id}, ${data.amount}, '${data.date}', '${data.type}', '${data.description}')`
        )
            .then((result) => {
                event.reply("addMovementResponse", {
                    status: "success",
                    data: result,
                });
            })
            .catch((error) => {
                event.reply("addMovementResponse", {
                    status: "error",
                    message: error,
                });
            });
    },
    );

    ipcMain.on("deleteMovement", (event: IpcMainEvent, id: number) => {
        executeQuery(`DELETE FROM Movement WHERE id = ${id}`)
            .then((result) => {
                event.reply("deleteMovementResponse", {
                    status: "success",
                    data: result,
                });
            })
            .catch((error) => {
                event.reply("deleteMovementResponse", {
                    status: "error",
                    message: error,
                });
            });
    });

    ipcMain.on("updateMovement", (event: IpcMainEvent, data: Movement) => {
        executeQuery(
            `UPDATE Movement SET material_id = ${data.material_id}, work_id = ${data.work_id}, amount = ${data.amount}, date = '${data.date}', type = '${data.type}', description='${data.description??""}'  WHERE id = ${data.id}`
        )
            .then((result) => {
                event.reply("updateMovementResponse", {
                    status: "success",
                    data: result,
                });
            })
            .catch((error) => {
                event.reply("updateMovementResponse", {
                    status: "error",
                    message: error,
                });
            });
    });
}
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
            `INSERT INTO Movement (person_id, material_id, work_id, amount, date, type) VALUES (${data.person_id}, ${data.material_id}, ${data.work_id}, ${data.amount}, '${data.date}', '${data.type}')`
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
    },);
}
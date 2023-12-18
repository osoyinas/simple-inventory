import { ipcMain, IpcMainEvent } from "electron";
import { executeQuery } from "../models/database";

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
}
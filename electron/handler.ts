// ipcHandler.ts
import { setupPersonsListeners } from "../src/ipc/person";
import { setupMaterialsListeners } from "../src/ipc/material";
import { setupWorksListeners } from "../src/ipc/work";
import { setupMovementsListeners } from "../src/ipc/movement";
import { BrowserWindow } from "electron";

export function setupIPCListeners() {
    setupPersonsListeners();
    setupMaterialsListeners();
    setupWorksListeners();
    setupMovementsListeners();
}

export function sendUpdateToRenderer(window: BrowserWindow, version: string) {
    window.webContents.send('update-available', version)
}

export function sendNotUpdateToRenderer(window: BrowserWindow) {
    window.webContents.send('update-not-available')
}


export function sendProgressToRenderer(window: BrowserWindow, progress: number) {
    window.webContents.send('download-progress', progress)
}







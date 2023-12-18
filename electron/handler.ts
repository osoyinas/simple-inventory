// ipcHandler.ts
import { setupPersonsListeners } from "../src/ipc/person";
import { setupMaterialsListeners } from "../src/ipc/material";
import { setupWorksListeners } from "../src/ipc/work";
import { setupMovementsListeners } from "../src/ipc/movement";

export function setupIPCListeners() {
    console.log("seteando listeners");
    setupPersonsListeners();
    setupMaterialsListeners();
    setupWorksListeners();
    setupMovementsListeners();
}










// ipcHandler.ts

import { setupPersonsListeners } from "@/ipc/persons";
import { setupMaterialsListeners } from "@/ipc/materials";
import { setupWorksListeners } from "@/ipc/works";
import { setupMovementsListeners } from "@/ipc/movements";

export function setupIPCListeners() {
    setupPersonsListeners();
    setupMaterialsListeners();
    setupWorksListeners();
    setupMovementsListeners();
}










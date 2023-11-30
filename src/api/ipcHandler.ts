// ipcHandler.ts
import { ipcMain, IpcMainEvent } from "electron";
import { executeQuery } from "../models/database";
function setupIPCListeners() {
  setupPersonsListeners();
  setupMaterialsListeners();
  setupWorksListeners();
}

export { setupIPCListeners };

function setupPersonsListeners() {
  ipcMain.on("getPersons", (event: IpcMainEvent) => {
    // Lógica para obtener usuarios de la base de datos u otro lugar
    // const users = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }, { id: 3, name: 'User 3' }, { id: 4, name: 'User 4' }];
    executeQuery("SELECT * FROM Person")
      .then((users) => {
        event.reply("getPersonsResponse", {
          status: "success",
          persons: users,
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
          person: result,
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
    // Lógica para obtener usuarios de la base de datos u otro lugar
    // const users = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }, { id: 3, name: 'User 3' }, { id: 4, name: 'User 4' }];
    executeQuery("SELECT * FROM Material")
      .then((materials) => {
        event.reply("getMaterialsResponse", {
          status: "success",
          materials: materials,
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
      data: { name: string; available_amount: number; description: string }
    ) => {
      executeQuery(
        `INSERT INTO Material (name, available_amount, description) VALUES ('${data.name}', ${data.available_amount}, '${data.description}');`
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
}

function setupWorksListeners() {
  ipcMain.on("getWorks", (event: IpcMainEvent) => {
    // Lógica para obtener usuarios de la base de datos u otro lugar
    // const users = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }, { id: 3, name: 'User 3' }, { id: 4, name: 'User 4' }];
    executeQuery("SELECT * FROM Work")
      .then((works) => {
        event.reply("getWorksResponse", { status: "success", works: works });
      })
      .catch((error) => {
        event.reply("getWorksResponse", { status: "error", message: error });
      });
  });

  ipcMain.on(
    "addWork",
    (
      event: IpcMainEvent,
      data: {
        name: string;
        start_date: string;
        status: string;
        description: string;
      }
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

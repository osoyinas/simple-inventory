// ipcHandler.ts
import { ipcMain, IpcMainEvent } from 'electron';
import { executeQuery } from '../models/database';
function setupIPCListeners() {
  ipcMain.on('getUsers', (event: IpcMainEvent) => {
    // Lógica para obtener usuarios de la base de datos u otro lugar
    // const users = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }, { id: 3, name: 'User 3' }, { id: 4, name: 'User 4' }];
    executeQuery('SELECT * FROM Persona').then((users) => {
      event.reply('usersResponse', users);
    }).catch((error) => {
      console.log("Error: ", error);
    });
    
  });

  ipcMain.on('addUser', (_event: IpcMainEvent, data: {id:number, name:string}) => {
    executeQuery(`INSERT INTO Persona (id, name) VALUES (${data.id}, '${data.name}');`).catch((error) => {
      console.log("Error: ", error);
    });
  });
}

export { setupIPCListeners };

// // INSERT INTO Personas (id, nombre) VALUES (1, 'Persona 1');
// INSERT INTO Personas (id, nombre) VALUES (2, 'Persona 2');
// INSERT INTO Personas (id, nombre) VALUES (3, 'Persona 3');
// INSERT INTO Personas (id, nombre) VALUES (4, 'Persona 4');
// INSERT INTO Personas (id, nombre) VALUES (5, 'Persona 5');
// INSERT INTO Personas (id, nombre) VALUES (6, 'Persona 6');
// INSERT INTO Personas (id, nombre) VALUES (7, 'Persona 7');
// INSERT INTO Personas (id, nombre) VALUES (8, 'Persona 8');
// INSERT INTO Personas (id, nombre) VALUES (9, 'Persona 9');
// // INSERT INTO Personas (id, nombre) VALUES (10, 'Persona 10');
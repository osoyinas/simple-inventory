// ipcHandler.ts
import { ipcMain, IpcMainEvent } from 'electron';
import { executeQuery } from '../models/database';
function setupIPCListeners() {
  setupPersonsListeners();
  setupMaterialsListeners();
}

export { setupIPCListeners };



function setupPersonsListeners() {
  ipcMain.on('getPersons', (event: IpcMainEvent) => {
    // Lógica para obtener usuarios de la base de datos u otro lugar
    // const users = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }, { id: 3, name: 'User 3' }, { id: 4, name: 'User 4' }];
    executeQuery('SELECT * FROM Person').then((users) => {
      event.reply('getPersonsResponse', {status: 'success', persons: users});
    }).catch((error) => {
      event.reply('getPersonsResponse', {status: 'failed', message: error});

    });
    
  });

  ipcMain.on('addPerson', (event: IpcMainEvent, data: { name:string }) => {
    executeQuery(`INSERT INTO Person (name) VALUES ('${data.name}');`)
    .then(() => {
      event.reply('addPersonResponse', {status: 'success', message: 'Persona añadida de forma exitosa.'});
    })
    .catch((error) => {
      event.reply('addPersonResponse', {status: 'failed', message: error});

    });
  });
}


function setupMaterialsListeners() {
  ipcMain.on('getMaterials', (event: IpcMainEvent) => {
    // Lógica para obtener usuarios de la base de datos u otro lugar
    // const users = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }, { id: 3, name: 'User 3' }, { id: 4, name: 'User 4' }];
    executeQuery('SELECT * FROM Material').then((materials) => {
      event.reply('getMaterialsResponse', {status: 'success', materials: materials});
    }).catch((error) => {
      event.reply('getMaterialsResponse', {status: 'failed', message: error});

    });
    
  });

  ipcMain.on('addMaterial', (event: IpcMainEvent, data: { name:string, available_amount: number, description: string}) => {
    executeQuery(`INSERT INTO Material (name, available_amount, description) VALUES ('${data.name}', ${data.available_amount}, '${data.description}');`)
    .then(() => {
      event.reply('addMaterialResponse', {status: 'success', message: 'Material añadido de forma exitosa.'});
    })
    .catch((error) => {
      event.reply('addMaterialResponse', {status: 'failed', message: error});
    });
  });
}
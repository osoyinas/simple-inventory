// ipcHandler.ts
import { ipcMain, IpcMainEvent } from 'electron';

function setupIPCListeners() {
  ipcMain.on('getUsers', (event: IpcMainEvent) => {
    // Lógica para obtener usuarios de la base de datos u otro lugar
    const users = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }, { id: 3, name: 'User 3' }, { id: 4, name: 'User 4' }];
    event.reply('usersResponse', users);
  });

  // Puedes agregar más listeners según tus necesidades
}

export { setupIPCListeners };

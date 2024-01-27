import { app, BrowserWindow, Menu } from "electron";
import path from "node:path";
import { setupIPCListeners } from "./handler";
import { closeDatabase } from "../src/models/database";
import { autoUpdater } from 'electron-updater';


autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
    ? process.env.DIST
    : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
    win = new BrowserWindow({
        icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
        width: 1280,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    }
    );
    const defaultMenu = Menu.getApplicationMenu();
    // defaultMenu?.append(new MenuItem(menuTemplate[0]));

    win.setMenu(defaultMenu);
    // Test active push message to Renderer-process.
    win.webContents.on("did-finish-load", () => {
        win?.webContents.send("main-process-message", new Date().toLocaleString());
    });

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL);
    } else {
    // win.loadFile('dist/index.html')
        win.loadFile(path.join(process.env.DIST, "index.html"));
    }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    closeDatabase();
    if (process.platform !== "darwin") {
        app.quit();
        win = null;
    }
});

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.whenReady().then(() => {
    autoUpdater.checkForUpdates();
    setupIPCListeners();
    createWindow();
});

autoUpdater.on('checking-for-update', () => {
    console.log('Checking for update...');
});

autoUpdater.on('update-available', () => {
    console.log('Update available. Downloading...');
    autoUpdater.downloadUpdate();
});

autoUpdater.on('update-downloaded', () => {
    console.log('Update downloaded. Installing...');
    autoUpdater.quitAndInstall();
});

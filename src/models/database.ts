import sqlite3 = require("sqlite3");
import fs = require('fs');
import { app } from 'electron';


import path = require('path');
const dataPath = path.join(app.getPath('appData'), 'InventarioData');
if (!fs.existsSync(dataPath)) {
    // Crea el directorio si no existe
    fs.mkdirSync(dataPath, { recursive: true });
}
const databasePath = path.join(dataPath, 'database.db');

const db = new sqlite3.Database(databasePath, (err: Error | null) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to the SQLite database.");
        // Ejecuta el archivo inic.sql al inicio
        const sqlFile = fs.readFileSync("resources/data/inic.sql", 'utf8');
        db.exec(sqlFile, (err: Error | null) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("Tables created successfully.");
            }
        });

        // const sqlDataFile = fs.readFileSync("data/data.sql", 'utf8');
        // db.exec(sqlDataFile, (err: Error | null) => {
        //     if (err) {
        //         console.error(err.message);
        //     } else {
        //         console.log("Tables created successfully.");
        //     }
        // });
    }
});

export function executeQuery(query: string): Promise<never[]> {
    return new Promise((resolve, reject) => {

        db.all(query, (err: Error | null, rows: never[]) => {
            if (err) {
                console.log(err);
                reject(err.message);
            }
            resolve(rows);
        });
    });
}

export function closeDatabase(): void {
    db.close((err: Error | null) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Closed the database connection.");
        }
    });
}
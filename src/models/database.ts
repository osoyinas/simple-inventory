import sqlite3 = require("sqlite3");

export function initializeDatabase(): void {
  const db = new sqlite3.Database("./database.db", (err: Error | null) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQlite database.");
  });

  const createTables = `
      CREATE TABLE IF NOT EXISTS Persona (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS Objeto (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS Obra (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
      );
    `;

  db.exec(createTables, (err: Error | null) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Tables created successfully.");
  });

  db.close((err: Error | null) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close the database connection.");
  });
}

export function executeQuery(query: string): Promise<never[]> {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('./database.db', (err: Error | null) => {
      if (err) {
        reject(err.message);
      }
    });

    db.all(query, (err: Error | null, rows: never[]) => {
      if (err) {
        reject(err.message);
      }
      resolve(rows);
    });

    db.close((err: Error | null) => {
      if (err) {
        reject(err.message);
      }
    });
  });
}
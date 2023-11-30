import sqlite3 = require("sqlite3");

export function initializeDatabase(): void {
  const db = new sqlite3.Database("./database.db", (err: Error | null) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQlite database.");
  });

  const createTables = `
CREATE TABLE IF NOT EXISTS Person (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Material (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    available_amount INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Work (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    start_date DATE,
    end_date DATE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS Movement (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_person INT,
    id_material INT,
    id_work INT,
    amount INT,
    fecha DATE,
    type VARCHAR(5) CHECK(type IN ('IN', 'OUT')) NOT NULL,
    FOREIGN KEY (id_person) REFERENCES Person(id) ON DELETE CASCADE,
    FOREIGN KEY (id_material) REFERENCES Material(id) ON DELETE CASCADE,
	 FOREIGN KEY (id_work) REFERENCES Work(id) ON DELETE CASCADE
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
    const db = new sqlite3.Database("./database.db", (err: Error | null) => {
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

CREATE TABLE IF NOT EXISTS Person (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Material (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL,
  units VARCHAR(255) NOT NULL,
  absolute_amount INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Work (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL,
  start_date DATE,
  status VARCHAR(50) CHECK (status IN ('PENDING', 'DONE')),
  description TEXT
);

CREATE TABLE IF NOT EXISTS Movement (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_person INT,
  id_material INT,
  id_work INT,
  amount INT,
  date DATE,
  type VARCHAR(3) CHECK (type IN ('IN', 'OUT')) NOT NULL,
  FOREIGN KEY (id_person) REFERENCES Person(id),
  FOREIGN KEY (id_material) REFERENCES Material(id),
  FOREIGN KEY (id_work) REFERENCES Work(id)
);

CREATE VIEW MaterialView AS
SELECT 
    m.id,
    m.name,
    m.units,
    m.absolute_amount + COALESCE(SUM(CASE WHEN mov.type = 'IN' THEN mov.amount ELSE -mov.amount END), 0) AS available_amount
FROM 
    Material m
LEFT JOIN 
    Movement mov ON m.id = mov.id_material
GROUP BY 
    m.id, m.name, m.units, m.absolute_amount;

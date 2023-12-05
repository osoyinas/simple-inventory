-- Crear la tabla Person
CREATE TABLE IF NOT EXISTS Person (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL
);

-- Crear la tabla Material
CREATE TABLE IF NOT EXISTS Material (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    units VARCHAR(255) NOT NULL,
    absolute_amount INT NOT NULL,
    available_amount INT NOT NULL CHECK (available_amount >= 0)
);

-- Crear la tabla Work
CREATE TABLE IF NOT EXISTS Work (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    start_date DATE,
    status VARCHAR(50) CHECK (status IN ('PENDING', 'DONE')),
    description TEXT
);

-- Crear la tabla Movement
CREATE TABLE IF NOT EXISTS Movement (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_person INT,
    id_material INT,
    id_work INT,
    units INT NOT NULL CHECK (units > 0),
    date DATE,
    type VARCHAR(3) CHECK (type IN ('IN', 'OUT')) NOT NULL,
    FOREIGN KEY (id_person) REFERENCES Person(id),
    FOREIGN KEY (id_material) REFERENCES Material(id),
    FOREIGN KEY (id_work) REFERENCES Work(id)
);

-- Crear un trigger para verificar las transacciones de salida
CREATE TRIGGER IF NOT EXISTS check_outbound
BEFORE INSERT ON Movement
WHEN NEW.type = 'OUT'
BEGIN
    SELECT CASE WHEN (SELECT available_amount FROM Material WHERE id = NEW.id_material) < NEW.units
                THEN RAISE(ABORT, 'Cantidad no disponible') 
                ELSE 0
           END;
END;

-- Crear un trigger para actualizar la cantidad disponible después de una transacción
CREATE TRIGGER IF NOT EXISTS update_available_amount
AFTER INSERT ON Movement
BEGIN
    UPDATE Material
    SET available_amount = available_amount + CASE WHEN NEW.type = 'IN' THEN NEW.units ELSE -NEW.units END
    WHERE id = NEW.id_material;
END;

-- Crea una view que obtenga toda la info de un movement, como el nombre del material, la persona y el trabajo

CREATE VIEW IF NOT EXISTS MovementInfo AS
SELECT Movement.id, Movement.id_person, Movement.id_material, Movement.id_work, Movement.units, Movement.date, Movement.type, Person.name AS person_name, Material.name AS material_name, Work.name AS work_name
FROM Movement
INNER JOIN Person ON Movement.id_person = Person.id
INNER JOIN Material ON Movement.id_material = Material.id
INNER JOIN Work ON Movement.id_work = Work.id;

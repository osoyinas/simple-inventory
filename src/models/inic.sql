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
    person_id INT,
    material_id INT,
    work_id INT,
    amount INT NOT NULL CHECK (amount > 0),
    date DATE,
    type VARCHAR(3) CHECK (type IN ('IN', 'OUT')) NOT NULL,
    FOREIGN KEY (person_id) REFERENCES Person(id),
    FOREIGN KEY (material_id) REFERENCES Material(id),
    FOREIGN KEY (work_id) REFERENCES Work(id)
);

-- Trigger para verificar las transacciones de salida
CREATE TRIGGER IF NOT EXISTS check_outbound
BEFORE INSERT ON Movement
WHEN NEW.type = 'OUT'
BEGIN
    SELECT CASE WHEN (SELECT available_amount FROM Material WHERE id = NEW.material_id) < NEW.amount
                THEN RAISE(ABORT, 'Cantidad no disponible') 
                ELSE 0
           END;
END;

CREATE TRIGGER IF NOT EXISTS check_material_update
BEFORE UPDATE ON Material
WHEN (NEW.absolute_amount < NEW.available_amount)
BEGIN
    UPDATE Material SET available_amount = NEW.absolute_amount WHERE id = NEW.id;
END;


CREATE TRIGGER IF NOT EXISTS check_inbound_increase
BEFORE INSERT ON Movement
WHEN NEW.type = 'IN' AND (SELECT absolute_amount FROM Material WHERE id = NEW.material_id) < NEW.amount + (SELECT available_amount FROM Material WHERE id = NEW.material_id)
BEGIN
    UPDATE Material SET absolute_amount = absolute_amount + NEW.amount WHERE id = NEW.material_id;
END;

-- Crear un trigger para actualizar la cantidad disponible después de una transacción
CREATE TRIGGER IF NOT EXISTS update_available_amount
AFTER INSERT ON Movement
BEGIN
    UPDATE Material
    SET available_amount = available_amount + CASE WHEN NEW.type = 'IN' THEN NEW.amount ELSE -NEW.amount END
    WHERE id = NEW.material_id;
END;

-- Crea una view que obtenga toda la info de un movement, como el nombre del material, la persona y el trabajo

CREATE VIEW IF NOT EXISTS MovementInfo AS
SELECT Movement.id, Movement.person_id, Movement.material_id, Movement.work_id, Movement.amount, Movement.date, Movement.type, Person.name AS person_name, Material.name AS material_name, Material.units as material_units, Work.name AS work_name
FROM Movement
INNER JOIN Person ON Movement.person_id = Person.id
INNER JOIN Material ON Movement.material_id = Material.id
INNER JOIN Work ON Movement.work_id = Work.id;
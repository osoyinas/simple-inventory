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
    available_amount INT NOT NULL CHECK (available_amount >= 0),
    description TEXT
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
    description TEXT,
    type VARCHAR(3) CHECK (type IN ('IN', 'OUT')) NOT NULL,
    FOREIGN KEY (person_id) REFERENCES Person(id),
    FOREIGN KEY (material_id) REFERENCES Material(id),
    FOREIGN KEY (work_id) REFERENCES Work(id)
);



-- Trigger para verificar las transacciones de salida
CREATE TRIGGER IF NOT EXISTS check_outbound_insert
BEFORE INSERT ON Movement
WHEN NEW.type = 'OUT'
BEGIN
    SELECT RAISE(ABORT, 'Cantidad del movimiento sobrepasa la cantidad disponible del material')
    WHERE (SELECT available_amount FROM Material WHERE id = NEW.material_id) < NEW.amount;
END;

CREATE TRIGGER IF NOT EXISTS check_outbound_update
BEFORE UPDATE ON Movement
WHEN NEW.type = 'OUT'
BEGIN
    SELECT RAISE(ABORT, 'Cantidad del movimiento sobrepasa la cantidad disponible del material')
    WHERE (SELECT available_amount FROM Material WHERE id = NEW.material_id) < NEW.amount;
END;


-- Trigger para verificar que no sobrepasa la cantidad absoluta
CREATE TRIGGER IF NOT EXISTS check_inbound_increase_insert
BEFORE INSERT ON Movement
WHEN NEW.type = 'IN' AND (SELECT absolute_amount FROM Material WHERE id = NEW.material_id) < NEW.amount + (SELECT available_amount FROM Material WHERE id = NEW.material_id)
BEGIN
    SELECT RAISE(ABORT, 'Cantidad del movimiento sobrepasa la cantidad total del material');
END;

-- Trigger para verificar que no sobrepasa la cantidad absoluta
CREATE TRIGGER IF NOT EXISTS check_inbound_increase_update
BEFORE UPDATE ON Movement
WHEN NEW.type = 'IN' AND (SELECT absolute_amount FROM Material WHERE id = NEW.material_id) < NEW.amount + (SELECT available_amount FROM Material WHERE id = NEW.material_id)
BEGIN
    SELECT RAISE(ABORT, 'Cantidad del movimiento sobrepasa la cantidad total del material');
END;


-- Trigger para actualizar la cantidad disponible después de una transacción
CREATE TRIGGER IF NOT EXISTS update_available_amount_insert
AFTER INSERT ON Movement
BEGIN
    UPDATE Material
    SET available_amount = available_amount + CASE WHEN NEW.type = 'IN' THEN NEW.amount ELSE -NEW.amount END
    WHERE id = NEW.material_id;
END;

CREATE TRIGGER IF NOT EXISTS update_available_amount_update
AFTER UPDATE ON Movement
BEGIN
    UPDATE Material
    SET available_amount = available_amount + CASE WHEN NEW.type = 'IN' THEN NEW.amount ELSE -NEW.amount END
    WHERE id = NEW.material_id;
END;


CREATE TRIGGER IF NOT EXISTS update_available_amount_delete
AFTER DELETE ON Movement
BEGIN
    UPDATE Material
    SET available_amount = available_amount + CASE WHEN OLD.type = 'IN' THEN -OLD.amount ELSE +OLD.amount END
    WHERE id = OLD.material_id;
END;

-- View para obtener toda la info de un movimiento
CREATE VIEW IF NOT EXISTS MovementInfo AS
SELECT Movement.id, Movement.person_id, Movement.material_id, Movement.work_id, Movement.amount, Movement.date, Movement.type, Person.name AS person_name, Material.name AS material_name, Material.units as material_units, Work.name AS work_name, Movement.description
FROM Movement
INNER JOIN Person ON Movement.person_id = Person.id
INNER JOIN Material ON Movement.material_id = Material.id
INNER JOIN Work ON Movement.work_id = Work.id;
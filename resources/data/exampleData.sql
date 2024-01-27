-- Insertar datos de ejemplo en la tabla Person
INSERT OR IGNORE INTO Person (name, movement_id) VALUES
    ('John Doe'),
    ('Jane Smith'),
    ('Bob Johnson'),
    ('Alice Williams'),
    ('Charlie Brown'),
    ('Emma Davis'),
    ('Frank White'),
    ('Grace Taylor'),
    ('Henry Harris'),
    ('Isabel Robinson'),
    ('Jack Miller'),
    ('Karen Wilson'),
    ('Liam Moore'),
    ('Olivia Lee'),
    ('Patrick Turner');

-- Insertar datos de ejemplo en la tabla Material
INSERT OR IGNORE INTO Material (name, units, absolute_amount, available_amount) VALUES
    ('Wood', 'kg', 100, 100),
    ('Steel', 'kg', 200, 200),
    ('Concrete', 'kg', 300, 300),
    ('Glass', 'kg', 50, 50),
    ('Brick', 'pcs', 500, 500),
    ('Plastic', 'kg', 150, 150),
    ('Cement', 'kg', 200, 200),
    ('Aluminum', 'kg', 100, 100),
    ('Copper', 'kg', 50, 50),
    ('Paper', 'kg', 120, 120),
    ('Fabric', 'meters', 80, 80),
    ('Rubber', 'kg', 70, 70),
    ('Paint', 'liters', 50, 50),
    ('Wire', 'meters', 100, 100),
    ('Nails', 'pcs', 200, 200);

-- Insertar datos de ejemplo en la tabla Work
INSERT OR IGNORE INTO Work (name, start_date, status, description) VALUES
    ('Build House', '2023-01-01', 'PENDING', 'Construct a new residential building'),
    ('Renovate Office', '2023-02-15', 'PENDING', 'Upgrade and modernize office space'),
    ('Install Windows', '2023-03-10', 'DONE', 'Replace old windows with new energy-efficient ones'),
    ('Paint Walls', '2023-04-05', 'PENDING', 'Interior painting of rooms'),
    ('Repair Roof', '2023-05-20', 'PENDING', 'Fix leaks and damages on the roof'),
    ('Landscaping', '2023-06-15', 'PENDING', 'Create a beautiful garden'),
    ('Assemble Furniture', '2023-07-01', 'DONE', 'Set up new furniture in office'),
    ('Paving Driveway', '2023-08-10', 'PENDING', 'Install a new driveway pavement'),
    ('Electrical Wiring', '2023-09-05', 'PENDING', 'Rewire electrical systems in the building'),
    ('Plumbing Installation', '2023-10-20', 'PENDING', 'Install new plumbing fixtures'),
    ('Roof Insulation', '2023-11-15', 'PENDING', 'Add insulation to the roof for energy efficiency'),
    ('Flooring Installation', '2023-12-01', 'PENDING', 'Install new flooring throughout the building'),
    ('HVAC System Upgrade', '2024-01-10', 'PENDING', 'Upgrade heating, ventilation, and air conditioning systems'),
    ('Construct Fence', '2024-02-05', 'PENDING', 'Build a perimeter fence around the property'),
    ('Install Solar Panels', '2024-03-20', 'PENDING', 'Add solar panels for renewable energy');

-- Insertar datos de ejemplo en la tabla Movement
INSERT INTO Movement (person_id, material_id, work_id, amount, date, type) VALUES
    (1, 1, 10, '2023-01-02', 'OUT'),
    (2, 2, 15, '2023-02-16', 'OUT'),
    (3, 3, 8, '2023-03-11', 'OUT'),
    (4, 4, 5, '2023-04-06', 'OUT'),
    (5, 5, 12, '2023-05-21', 'OUT'),
    (6, 6, 7, '2023-06-16', 'OUT'),
    (7, 7, 20, '2023-07-02', 'OUT'),
    (8, 8, 10, '2023-08-11', 'OUT'),
    (9, 9, 15, '2023-09-06', 'OUT'),
    (10, 10, 8, '2023-10-21', 'OUT'),
    (11, 11, 10, '2023-11-16', 'OUT'),
    (12, 12, 5, '2023-12-02', 'OUT'),
    (13, 13, 15, '2024-01-11', 'OUT'),
    (14, 14, 7, '2024-02-06', 'OUT'),
    (15, 15, 12, '2024-03-21', 'OUT');
INSERT INTO department (id, department_name)
  VALUES
    (1, 'Management'),
    (2, 'Sales'),
    (3, 'Accounting'),
    (4, 'Product Oversight'),
    (5, 'Reception'),
    (6, 'Temps'),
    (7, 'Warehouse'),
    (8, 'Corporate & HR'),
    (9, 'Former');

  INSERT INTO jobrole (id, title, salary, department_id)
    VALUES
      (1, 'Regional Manager', 135000, 1),
      (2, 'Assistant Regional Manager', 90000, 1),
      (3, 'Receptionist', 32000, 5),
      (4, 'Sales Rep', 74000, 2),
      (5, 'Senior Accountant', 72000, 3),
      (6, 'Accountant', 67000, 3),
      (7, 'Supplier Relations Rep', 98000, 4),
      (8, 'Customer Service Rep', 43000, 4),
      (9, 'Quality Assurance Rep', 41000, 4),
      (10, 'Temp', 28000, 6),
      (11, 'CEO', 800000, 8),
      (12, 'HR Rep', 45000, 8),
      (13, 'Director of Sales', 430000, 8),
      (14, 'CFO', 1200000, 8),
      (15, 'Warehouse Dock Worker', 39000, 7),
      (16, 'Warehouse Foreman', 27000, 7);


  INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
    VALUES
      (1, 'Michael','Scott', 1, 14),
      (2, 'Karen', 'Filippelli', 4, 1),
      (3, 'Pam', 'Halbert', 4, 1),
      (4, 'Jim','Halpert', 4, 1),
      (5, 'Dwight','Schrute', 2, 1),
      (6, 'Andy','Bernard', 4, 1),
      (7, 'Stanley','Hudson', 4, 1),
      (8, 'Phyllis','Lapin-Vance', 4, 1),
      (9, 'Angela','Martin', 5, 1),
      (10, 'Kevin','Malone', 6, 9),
      (11, 'Kelly','Kapoor', 8, 1),
      (12, 'Creed','Bratton', 9, 1),
      (13, 'Erin', 'Hannon', 3, 1),
      (14, 'Ryan','Howard', 10, 1),
      (15, 'Darryl','Philbin', 16, 1),
      (16, 'Gabe','Lewis', 10, 1),
      (17, 'Toby','Flenderson', 12, 19),
      (18, 'Holly','Flax', 12, 19),
      (19, 'Jan','Levinson', 13, 20),
      (20, 'David','Wallace', 14, NULL),
      (21, 'Roy','Anderson', 15, 1);
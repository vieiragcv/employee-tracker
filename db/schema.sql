DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS jobrole;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
  id INT PRIMARY KEY,
  department_name VARCHAR(30)
);

CREATE TABLE jobrole (
  id INT PRIMARY KEY,
  title VARCHAR(50),
  salary DECIMAL,
  department_id INT
);

CREATE TABLE employee (
  id INT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT
);
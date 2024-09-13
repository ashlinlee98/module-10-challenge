-- view_departments
SELECT * FROM departments;

-- view_roles
SELECT * FROM roles;

-- view_employees
SELECT * FROM employees;

-- add_department
INSERT INTO departments (name)
VALUES ($1);

-- add_role
INSERT INTO roles (title, salary, department_id)
VALUES ($1, $2, $3);

-- add_employee
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ($1, $2, $3, $4);

-- update_employee_role
UPDATE employees
SET role_id = $1
WHERE id = $2;
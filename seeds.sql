-- Seed Departments
INSERT INTO departments (name) VALUES
('Human Resources'),
('Accounting'),
('Marketing');

-- Seed Roles
INSERT INTO roles (title, salary, department_id) VALUES
('HR Manager', 60000, 1),
('Recruiter', 50000, 1),
('Software Engineer', 80000, 2),
('Frontend Developer', 75000, 2),
('Backend Developer', 75000, 2),
('Marketing Specialist', 55000, 3);

-- Seed Employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Alice', 'Johnson', 3, NULL),
('Bob', 'Williams', 4, 3),
('Charlie', 'Brown', 5, 3),
('Dave', 'Wilson', 6, NULL),
('Emily', 'Davis', 1, 1),
('Frank', 'Miller', 2, 1),
('Grace', 'Lee', 3, 4),
('Henry', 'Walker', 4, 5),
('Ivy', 'Hall', 5, 5),
('Jack', 'Allen', 6, 7),
('Karen', 'Young', 3, 8),
('Leo', 'Scott', 4, 9),
('Mia', 'Green', 5, 10);
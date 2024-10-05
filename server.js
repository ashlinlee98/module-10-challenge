import inquirer from 'inquirer';
import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const pool = new Pool(
  {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
  });

pool.connect()
  .then(() => console.log('Connected to the courses_db database!'))
  .catch(err => console.error('Connection error', err.stack));

// Start the prompt
function showMenu(){
  inquirer.prompt([{
    type: 'list',
    name: 'menu',
    message: 'What would you like to do? (use arrow keys)',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Quit',
    ],
  }])
    .then((answers) => {
      if (answers.menu === 'View all departments') {
        pool.query('SELECT * FROM departments', (err, { rows }) => {
          if (err) {
            console.error(err);
          } else {
            console.log(rows);
            showMenu();
          }
        });
      }
      else if (answers.menu === 'View all roles') {
        pool.query('SELECT * FROM roles', (err, { rows }) => {
          if (err) {
            console.error(err);
          } else {
            console.log(rows);
            showMenu();
          }
        });
      }
      else if (answers.menu === 'View all employees') {
        pool.query('SELECT * FROM employees', (err, { rows }) => {
          if (err) {
            console.error(err);
          } else {
            console.log(rows);
            showMenu();
          }
        });
      }
      else if (answers.menu === 'Add a department') {
        addNewDepartment();
      }
      else if (answers.menu === 'Add a role') {
        addNewRole();
      }
      else if (answers.menu === 'Add an employee') {
        addNewEmployee();
      }
      else if (answers.menu === 'Update an employee role') {
        updateEmployeeRole();
      }
      else if (answers.menu === 'Quit') {
        console.log('Exiting application...');
        pool.end();
        process.exit(0);
      }
    });
}

showMenu();

function addNewDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the new department:',
      },
    ])
    .then((response) => {
      pool.query('INSERT INTO departments (name) VALUES ($1)', [response.departmentName], (err, result) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Department ${response.departmentName} has been added`);
        }
        showMenu();
      });
    });
}

function addNewEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter the first name of the new employee:',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter the last name of the new employee:',
      },
      {
        type: 'input',
        name: 'roleId',
        message: 'Enter the role id of the new employee:',
      },
      {
        type: 'input',
        name: 'managerId',
        message: 'Enter the manager id of the new employee:',
      },
    ])
    .then((response) => {
      pool.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4);',
        [response.firstName, response.lastName, response.roleId, response.managerId], (err, result) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`Employee ${response.firstName} ${response.lastName} has been added`);
          }
          showMenu();
        });
    });
}

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'newRole',
        message: 'Enter the id of the role you want to assign:',
      },
      {
        type: 'input',
        name: 'updateEmployee',
        message: 'Enter the id of the employee you want to update:',
      },
    ])
    .then((response) => {
      pool.query('UPDATE employees SET role_id = $1 WHERE id = $2;',
        [response.newRole, response.updateEmployee], (err, result) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`Employee ${response.updateEmployee} now has role ${response.newRole}`);
          }
          showMenu();
        });
    });
};

function addNewRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'roleTitle',
        message: 'Enter the title of the new role:',
      },
      {
        type: 'input',
        name: 'roleSalary',
        message: 'Enter the salary of the new role:',
      },
      {
        type: 'input',
        name: 'deptId',
        message: 'Enter the department id of the new role:',
      },
    ])
    .then((response) => {
      pool.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)',
        [response.roleTitle, response.roleSalary, response.deptId], (err, result) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`Role ${response.roleTitle} has been added`);
          }
          showMenu();
        });
    });
}
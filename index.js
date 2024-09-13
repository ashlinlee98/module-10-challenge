import inquirer from 'inquirer';

inquirer
      .prompt([
        {
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
          ],
        },
      ])
      .then((answers) => {

      }
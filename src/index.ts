//Make a function to initiate the server, use inquirer inside the function
import inquirer from 'inquirer';

inquirer
  .prompt([
    {
        type: 'list',
        message: 'What do you want to do?',
        name: 'options',
        choices: [
            'View all departments', 
            'View all roles', 
            'View all employees', 
            'Add a department',
             'Add a role', 
             'Add an employee', 
             'Update an employee role'
            ]
}
    /* Pass your questions in here */
  ])
  .then((answers) => {
    if (answers.options === 'View all departments') {
        console.table(departments);
    } else if (answers.options === 'View all roles') {
        console.table(roles);
    } else if (answers.options === 'View all employees') {
        console.table(employees);
    } else if (answers.options === 'Add a department') {
        inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the department?',
                name: 'department'
            }
        ])
        .then((answers) => {
            departments.push(answers.department);
            console.table(departments);
        })
    } else if (answers.options === 'Add a role') {
        inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the role?',
                name: 'role'
            }
        ])
        .then((answers) => {
            roles.push(answers.role);
            console.table(roles);
        })
    } else if (answers.options === 'Add an employee') {
        inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the employee?',
                name: 'employee'
            }
        ])
        .then((answers) => {
            employees.push(answers.employee);
            console.table(employees);
        })
    } else if (answers.options === 'Update an employee role') {
       inquirer
       .prompt([
            {
                type: 'input',
                message: 'What is the name of the employee you want to update?',
                name: 'employee'
            },
            {
                type: 'input',
                message: 'What is the new role of the employee?',
                name: 'role'
            }
       ]) 
         .then((answers) => {
              employees.push(answers.employee);
              roles.push(answers.role);
              console.table(employees joined roles);
         })
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
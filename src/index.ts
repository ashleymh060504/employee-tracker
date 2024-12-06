//Make a function to initiate the server, use inquirer inside the function
import dotenv from 'dotenv';
import inquirer from 'inquirer';
import pg from 'pg';
import { pool, queryETdb } from './connection.js';



const viewDepartments = async () => {
    try {
        const query = 'SELECT * FROM departments';
        const res = await queryETdb(query, []);
        if (res) {
            console.table(res.rows);
        } else {
            console.error('No results returned from the query.');
        }
    } catch (error) {
        console.error('Error fetching departments', error);
    }
  }  
const viewRoles = async () => {
    try {
        const query = 'SELECT * FROM roles';
        const res = await queryETdb(query, []);
        if (res) {
            console.table(res.rows);
        } else {
            console.error('No results returned from the query.');
        }
  } catch (error) {
      console.error('Error fetching roles', error);
  }
}
const viewEmployees = async () => {
    try {
        const query = 'SELECT * FROM employees';
        const res = await queryETdb(query, []);
        if (res) {
            console.table(res.rows);
        } else {
            console.error('No results returned from the query.');
        }
  } catch (error) {
      console.error('Error fetching employees', error);
  }
}
const addDepartment = async (department: string) => {
    try {
        const query = 'INSERT INTO departments (name) VALUES ($1)';
        const values = [department];
        await queryETdb(query, values);
  } catch (error) {
        console.error('Error adding department', error);
    }
}
const addRole = async (role: string) => {
    try {
        const query = 'INSERT INTO roles (title) VALUES ($1)';
        const values = [role];
        await queryETdb(query, values);
  } catch (error) {
        console.error('Error adding role', error);
    }
}
const addEmployee = async (employee: string) => {
    try {
        const query = 'INSERT INTO employees (name) VALUES ($1)';
        const values = [employee];
        await queryETdb(query, values);
  } catch (error) {
        console.error('Error adding employee', error);
    }
}
const updateEmployeeRole = async (employee: string, role: string) => {
    try {
        const query = 'UPDATE employees SET role_id = $1 WHERE name = $2';
        const values = [role, employee];
        await queryETdb(query, values);
  } catch (error) {
        console.error('Error updating employee role', error);
    }
}

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
        viewDepartments();
    } else if (answers.options === 'View all roles') {
        viewRoles();
    } else if (answers.options === 'View all employees') {
        viewEmployees();
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
            // departments.push(answers.department);
            addDepartment(answers.department);
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
            // roles.push(answers.role);
            addRole(answers.role);
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
            // employees.push(answers.employee);
            addEmployee(answers.employee);
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
            //   employees.push(answers.employee);
            //   roles.push(answers.role);
              updateEmployeeRole(answers.employee, answers.role);
         })
    // Use user feedback for... whatever!!
  }
    });
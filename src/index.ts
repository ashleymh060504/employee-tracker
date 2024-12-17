//Make a function to initiate the server, use inquirer inside the function
import dotenv from 'dotenv';
import inquirer from 'inquirer';
import pg from 'pg';
import { pool, connectToDb } from './connection.js';
import test from 'node:test';
import { get } from 'http';

const client = await pool.connect();

const queryETdb = async (query: string, values: any[]) => {
    const client = await pool.connect();
    try {
      const result = await client.query(query, values);
      return result;
    } catch (err) {
      console.log(err);
    } finally {
      client.release();
    }
  };

const getEmployees = async () => {
    const res = await client.query ('select id, firstName, lastName from employees');
    return res.rows.map(row => ({
        name: `${row.firstName} ${row.lastName}`,
        value: row.id,
    }))
};
getEmployees();

const employeeChoices = await getEmployees();

const getRoles = async () => {
    const res = await client.query ('select job_title from roles');
    return res.rows.map(row => ({
        name: row.job_title,
        value: row.job_title,
    }))
};

const employeeRoles = await getRoles();

const viewDepartments = async () => {
    try {
        const query = 'SELECT * FROM "departments";';
        const res = await queryETdb(query, []);
        if (res) {
            console.table(res.rows);
        } else {
            console.error('No results returned from the query.');
        }
    } catch (error) {
        console.error('Error fetching departments', error);
    } finally {startCli();
    }
};  
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
    } finally {startCli();
    }
};
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
    } finally {startCli();
    }
};
const addDepartment = async (department: string) => {
    try {
        const query = 'INSERT INTO departments (department_name) VALUES ($1)';
        const values = [department];
        await queryETdb(query, values);
    } catch (error) {
        console.error('Error adding department', error);
    } finally {startCli();
    }
};
const addRole = async (job_title: string, role_salary: number, department_id: number) => {
    try {
        const query = 'INSERT INTO roles (job_title, role_salary, department_id) VALUES ($1, $2, $3)';
        const values = [job_title, role_salary, department_id];
        await queryETdb(query, values);
    } catch (error) {
        console.error('Error adding role', error);
    } finally {startCli();
    }
};
const addEmployee = async (firstName: string, lastName: string, role_id: number, manager_id: any, salary: number) => {
    try {
        console.log(manager_id);
        const query = 'INSERT INTO employees (firstName, lastName, role_id, manager_id, salary) VALUES ($1, $2, $3, $4, $5)';
        const values = [firstName, lastName, role_id, manager_id, salary];
        await queryETdb(query, values);
    } catch (error) {
        console.error('Error adding employee', error);
    } finally {startCli();
    }
};
const updateEmployeeRole = async (selected_employee: string, role: string) => {
    try {
        const query = 'UPDATE employees SET role_id = $1 WHERE name = $2';
        const values = [role, selected_employee];
        await queryETdb(query, values);
    } catch (error) {
        console.error('Error updating employee role', error);
    } finally {startCli();
    }
};

function startCli(): void {
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
                'Update an employee role',
                'Exit'
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
                    name: 'job_title'
                },
                {
                    type: 'input',
                    message: 'What is the salary of the role?',
                    name: 'role_salary'
                },
                {
                    type: 'input',
                    message: 'What is the department id of the role?',
                    name: 'department_id'
                }
            ])
            .then((answers) => {
            // roles.push(answers.role);
                addRole(answers.job_title, answers.role_salary, answers.department_id);
            })
        } else if (answers.options === 'Add an employee') {
            inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is the first name of the employee?',
                    name: 'firstName'
                },
                {
                    type: 'input',
                    message: 'What is the last name of the employee?',
                    name: 'lastName'
                },
                {
                    type: 'number',
                    message: 'What is the role id of the new employee?',
                    name: 'role_id'
                },
                {
                    type: 'input',
                    message: 'What is the manager id of the new employee?',
                    name: 'manager_id',
                },
                {
                    type: 'number',
                    message: 'What is the salary of the new employee?',
                    name: 'salary'
                }
            ])
            .then((answers) => {
            // employees.push(answers.employee);
                if (answers.manager_id === '') {
                    answers.manager_id = null;
                }
                addEmployee(answers.firstName, answers.lastName, answers.role_id, answers.manager_id, answers.salary);
            })
        } else if (answers.options === 'Update an employee role') {
        inquirer
        .prompt([
                {
                    type: 'list',
                    message: 'Select the employee you want to update',
                    name: 'selected_employee',
                    choices: [employeeChoices]
                },
                {
                    type: 'list',
                    message: 'What is the new role of this employee?',
                    name: 'role',
                    choices: [employeeRoles]
                },
        ]) 
            .then((answers) => {
            //   employees.push(answers.employee);
            //   roles.push(answers.role);
                updateEmployeeRole(answers.selected_employee, answers.role);
            })
    // Use user feedback for... whatever!!
        } else if (answers.options === 'Exit') {
            process.exit();
        }
    })};

startCli();
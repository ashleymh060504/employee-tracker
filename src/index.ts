import dotenv from 'dotenv';
import inquirer from 'inquirer';
import { Client } from 'pg';
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
async function getEmployees(): Promise<{name: string, value: number}[]> {
    const query = 'SELECT id, first_name, last_name from employees';
    const res = await client.query(query);
    const rows = res.rows;
    return rows.map(row => {
        return {
            name: row.first_name + ' ' + row.last_name,
            value: row.id
        }
    });
}
async function getRoles(): Promise<{name: string, value: number}[]> {
    const query = 'SELECT id, title FROM roles';
    const res = await client.query(query);
    const rows = res.rows;
    return rows.map(row => {
        return {
            name: row.title,
            value: row.id
        }
    });
}
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
        const query = 'INSERT INTO departments (name) VALUES ($1)';
        const values = [department];
        await queryETdb(query, values);
    } catch (error) {
        console.error('Error adding department', error);
    } finally {startCli();
    }
};
const addRole = async (title: string, salary: number, department_id: number) => {
    try {
        const query = 'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)';
        const values = [title, salary, department_id];
        await queryETdb(query, values);
    } catch (error) {
        console.error('Error adding role', error);
    } finally {startCli();
    }
};
const addEmployee = async (first_name: string, last_name: string, role_id: number, manager_id: any, salary: number) => {
    try {
        console.log(manager_id);
        const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id, salary) VALUES ($1, $2, $3, $4, $5)';
        const values = [first_name, last_name, role_id, manager_id, salary];
        await queryETdb(query, values);
    } catch (error) {
        console.error('Error adding employee', error);
    } finally {startCli();
    }
};
const updateEmployeeRole = async (selected_employee: string, role: string) => {
    try {
        // const query = `UPDATE employees e SET e.role_id = (SELECT r.id FROM roles r WHERE r.title = $1) WHERE e.first_name || ' ' || e.last_name = $2;`;
        const query = `UPDATE employees SET role_id = $1 WHERE id = $2;`
        const values = [role, selected_employee];
        await queryETdb(query, values);
    } catch (error) {
        console.error('Error updating employee role', error);
    } finally {startCli();
    }
};

async function startCli(): Promise<void> {
    const employeeChoices = await getEmployees();
    const employeeRoles = await getRoles();
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
                    name: 'title'
                },
                {
                    type: 'input',
                    message: 'What is the salary of the role?',
                    name: 'salary'
                },
                {
                    type: 'input',
                    message: 'What is the department id of the role?',
                    name: 'department_id'
                }
            ])
            .then((answers) => {
            // roles.push(answers.role);
                addRole(answers.title, answers.salary, answers.department_id);
            })
        } else if (answers.options === 'Add an employee') {
            inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is the first name of the employee?',
                    name: 'first_name'
                },
                {
                    type: 'input',
                    message: 'What is the last name of the employee?',
                    name: 'last_name'
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
                addEmployee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id, answers.salary);
            })
        } else if (answers.options === 'Update an employee role') {
        inquirer
        .prompt([
                {
                    type: 'list',
                    message: 'Select the employee you want to update',
                    name: 'selected_employee',
                    choices: employeeChoices
                },
                {
                    type: 'list',
                    message: 'What is the new role of this employee?',
                    name: 'role',
                    choices: employeeRoles
                },
        ]) 
            .then((answers) => {
                updateEmployeeRole(answers.selected_employee, answers.role);
            })
 
        } else if (answers.options === 'Exit') {
            process.exit();
        }
    })};

startCli();


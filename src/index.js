"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const connection_js_1 = require("./connection.js");
const viewDepartments = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'SELECT * FROM departments';
        const res = yield (0, connection_js_1.queryETdb)(query, []);
        console.table(res.rows);
    }
    catch (error) {
        console.error('Error fetching departments', error);
    }
});
const viewRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'SELECT * FROM roles';
        const res = yield (0, connection_js_1.queryETdb)(query, []);
        console.table(res.rows);
    }
    catch (error) {
        console.error('Error fetching roles', error);
    }
});
const viewEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'SELECT * FROM employees';
        const res = yield (0, connection_js_1.queryETdb)(query, []);
        console.table(res.rows);
    }
    catch (error) {
        console.error('Error fetching employees', error);
    }
});
const addDepartment = (department) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'INSERT INTO departments (name) VALUES ($1)';
        const values = [department];
        yield (0, connection_js_1.queryETdb)(query, values);
    }
    catch (error) {
        console.error('Error adding department', error);
    }
});
const addRole = (role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'INSERT INTO roles (title) VALUES ($1)';
        const values = [role];
        yield (0, connection_js_1.queryETdb)(query, values);
    }
    catch (error) {
        console.error('Error adding role', error);
    }
});
const addEmployee = (employee) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'INSERT INTO employees (name) VALUES ($1)';
        const values = [employee];
        yield (0, connection_js_1.queryETdb)(query, values);
    }
    catch (error) {
        console.error('Error adding employee', error);
    }
});
const updateEmployeeRole = (employee, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'UPDATE employees SET role_id = $1 WHERE name = $2';
        const values = [role, employee];
        yield (0, connection_js_1.queryETdb)(query, values);
    }
    catch (error) {
        console.error('Error updating employee role', error);
    }
});
inquirer_1.default
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
    }
    else if (answers.options === 'View all roles') {
        viewRoles();
    }
    else if (answers.options === 'View all employees') {
        viewEmployees();
    }
    else if (answers.options === 'Add a department') {
        inquirer_1.default
            .prompt([
            {
                type: 'input',
                message: 'What is the name of the department?',
                name: 'department'
            }
        ])
            .then((answers) => {
            departments.push(answers.department);
            addDepartment(answers.department);
        });
    }
    else if (answers.options === 'Add a role') {
        inquirer_1.default
            .prompt([
            {
                type: 'input',
                message: 'What is the name of the role?',
                name: 'role'
            }
        ])
            .then((answers) => {
            roles.push(answers.role);
            addRole(answers.role);
        });
    }
    else if (answers.options === 'Add an employee') {
        inquirer_1.default
            .prompt([
            {
                type: 'input',
                message: 'What is the name of the employee?',
                name: 'employee'
            }
        ])
            .then((answers) => {
            employees.push(answers.employee);
            addEmployee(answers.employee);
        });
    }
    else if (answers.options === 'Update an employee role') {
        inquirer_1.default
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
            updateEmployeeRole(answers.employee, answers.role);
        });
        // Use user feedback for... whatever!!
    }
});

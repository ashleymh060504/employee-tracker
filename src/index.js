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
const connection_ts_1 = __importDefault(require("/Users/ashleyhayes/Bootcamp/homework/employee-tracker/src/connection.ts"));
const queryETdb = (query, values) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connection_ts_1.default.connect();
    try {
        const res = yield client.query(query, values);
        return res;
    }
    catch (err) {
        console.log(err);
    }
    finally {
        client.release();
    }
});
const viewDepartments = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM departments';
    const res = yield queryETdb(query, []);
    console.table(res.rows);
});
const viewRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM roles';
    const res = yield queryETdb(query, []);
    console.table(res.rows);
});
const viewEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM employees';
    const res = yield queryETdb(query, []);
    console.table(res.rows);
});
const addDepartment = (department) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'INSERT INTO departments (name) VALUES ($1)';
    const values = [department];
    yield queryETdb(query, values);
});
const addRole = (role) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'INSERT INTO roles (title) VALUES ($1)';
    const values = [role];
    yield queryETdb(query, values);
});
const addEmployee = (employee) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'INSERT INTO employees (name) VALUES ($1)';
    const values = [employee];
    yield queryETdb(query, values);
});
const updateEmployeeRole = (employee, role) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'UPDATE employees SET role_id = $1 WHERE name = $2';
    const values = [role, employee];
    yield queryETdb(query, values);
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

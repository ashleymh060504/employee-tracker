create database employee_tracker_db;

\c employee_tracker_db;

create table departments (
    department_id int primary key,
    department_name varchar(30) not null
);

create table roles (
    role_id int primary key,
    job_title varchar(30) not null,
    role_salary decimal(10, 2),
    department_name varchar(30) not null,
    foreign key (department_name) references departments(department_name)
);

create table employees (
    employee_id int primary key,
    employee_firstName varchar(30) not null,
    employee_lastName varchar(30) not null,
    employee_role varchar(30) not null,
    department_name varchar(30) not null,
    employee_salary decimal(10, 2),
    manager varchar(30),
    foreign key (employee_role) references roles(job_title),
    foreign key (department_name) references departments(department_name)
);


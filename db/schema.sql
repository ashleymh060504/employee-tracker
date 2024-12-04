drop database if exists employee_tracker_db;
create database employee_tracker_db;

\c employee_tracker_db;

create table departments (
    id serial primary key,
    department_name varchar(30) not null
);

create table roles (
    id serial primary key,
    job_title varchar(30) not null,
    role_salary decimal(10, 2),
    department_id integer not null,
    foreign key (department_id) references departments(id)
);

create table employees (
    id serial primary key,
    firstName varchar(30) not null,
    lastName varchar(30) not null,
    role_id integer not null,
    salary decimal(10, 2),
    manager_id integer,
    foreign key (role_id) references roles(id),
    foreign key (manager_id) references employees(id)
);


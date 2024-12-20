drop database if exists employee_tracker_db;
create database employee_tracker_db;

\c employee_tracker_db;

create table departments (
    id serial primary key,
    name varchar(30) not null
);

create table roles (
    id serial primary key,
    title varchar(30) not null,
    salary decimal(10, 2),
    department_id integer not null,
    foreign key (department_id) references departments(id) on delete cascade
);

create table employees (
    id serial primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id integer not null,
    salary decimal(10, 2),
    manager_id integer,
    foreign key (role_id) references roles(id) on delete cascade,
    foreign key (manager_id) references employees(id) on delete set null
);



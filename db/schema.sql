create database emplopyee_tracker_db;

\c employee_tracker_db;

create table employees (
    employee_id int primary key,
    employee_name varchar(30),
    employee_role varchar(30),
    department varchar(30),
);


insert into departments (department_name) 
values  ('HR'), 
        ('Finance'), 
        ('IT');

insert into roles (role_title, role_salary, department_name)
values ('Manager', 100000.00, 'HR'),
       ('Assistant Manager', 80000.00, 'HR'),
       ('HR Specialist', 60000.00, 'HR'),
       ('Manager', 100000.00, 'Finance'),
       ('Assistant Manager', 80000.00, 'Finance'),
       ('Finance Specialist', 60000.00, 'Finance'),
       ('Manager', 100000.00, 'IT'),
       ('Assistant Manager', 80000.00, 'IT'),
       ('IT Specialist', 60000.00, 'IT');

insert into employees (
    employee_firstName, 
    employee_lastName, 
    employee_role, 
    department_name, 
    employee_salary, 
    manager) 
values ('Liam', 'Carter', 'Manager', 'HR', 100000.00, NULL),
       ('Olivia', 'Smith', 'Assistant Manager', 'HR', 80000.00, 'Liam Carter'),
       ('Noah', 'Johnson', 'HR Specialist', 'HR', 60000.00, 'Olivia Smith'),
       ('Emma', 'Williams', 'Manager', 'Finance', 100000.00, NULL),
       ('William', 'Brown', 'Assistant Manager', 'Finance', 80000.00, 'Emma Williams'),
       ('Ava', 'Jones', 'Finance Specialist', 'Finance', 60000.00, 'William Brown'),
       ('James', 'Garcia', 'Manager', 'IT', 100000.00, NULL),
       ('Isabella', 'Martinez', 'Assistant Manager', 'IT', 80000.00, 'James Garcia'),
       ('Logan', 'Rodriguez', 'IT Specialist', 'IT', 60000.00, 'Isabella Martinez');


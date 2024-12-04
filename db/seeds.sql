insert into departments (department_name) 
values  ('HR'), 
        ('Finance'), 
        ('IT');

insert into roles (job_title, role_salary, department_id)
values ('Manager', 100000.00, 1),
       ('Assistant Manager', 80000.00, 1),
       ('HR Specialist', 60000.00, 1),
       ('Manager', 100000.00, 2),
       ('Assistant Manager', 80000.00, 2),
       ('Finance Specialist', 60000.00, 2),
       ('Manager', 100000.00, 3),
       ('Assistant Manager', 80000.00, 3),
       ('IT Specialist', 60000.00, 3);

insert into employees (
    firstName, 
    lastName, 
    role_id, 
    salary, 
    manager_id) 
values ('Liam', 'Carter', 1, 100000.00, NULL),
       ('Olivia', 'Smith', 2, 80000.00, 1)
    
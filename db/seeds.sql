insert into departments (department_name) 
values  ('HR'), 
        ('Finance'), 
        ('IT');

insert into roles (job_title, role_salary, department_id)
values ('HR Manager', 100000.00, 1),
       ('HR Assistant Manager', 80000.00, 1),
       ('HR Specialist', 60000.00, 1),
       ('Finance Manager', 100000.00, 2),
       ('Finance Assistant Manager', 80000.00, 2),
       ('Finance Specialist', 60000.00, 2),
       ('IT Manager', 100000.00, 3),
       ('IT Assistant Manager', 80000.00, 3),
       ('IT Specialist', 60000.00, 3);

insert into employees (
    firstName, 
    lastName, 
    role_id, 
    salary, 
    manager_id) 
values ('Liam', 'Carter', 1, 100000.00, NULL),
       ('Olivia', 'Smith', 2, 80000.00, 1),
       ('Noah', 'Johnson', 3, 60000.00, 2),
       ('Emma', 'Williams', 4, 100000.00, NULL),
       ('Aiden', 'Jones', 5, 80000.00, 4),
       ('Sophia', 'Brown', 6, 60000.00, 5),
       ('Lucas', 'Davis', 7, 100000.00, NULL),
       ('Mia', 'Miller', 8, 80000.00, 7),
       ('Ethan', 'Wilson', 9, 60000.00, 8);
    
INSERT INTO department (name)
VALUES  ("Sales"),
        ("Marketing"),
        ("Human Resources"),
        ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Lead", 20000, 1),
        ("Salesperson", 10000, 1),
        ("Marketing Manager", 30000, 2),
        ("Marketing Assistant", 15000, 2),
        ("HR Manager", 20000, 3),
        ("Talent Acquisition", 10000, 3),
        ("Software Engineer", 40000, 4),
        ("Scrum Master", 50000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Isaias", "Reyes", 3, null),
        ("Nicolas", "Eguiarte", 4, 1),
        ("Karla", "Reyes", 1, null),
        ("Areida", "Leon", 2, 3),
        ("Isaac", "Reyes", 7, 6),
        ("Nicolas", "Reyes", 8, null),
        ("Analy", "Reyes", 5, 7),
        ("Alonso", "Reyes", 6, null);
INSERT INTO department (id, name)
VALUES  (1, "Sales"),
        (2, "Marketing"),
        (3, "Human Resources"),
        (4, "Engineering");

INSERT INTO role (id, title, salary, department_id)
VALUES  (1, "Sales Lead", "Sales", 20000, 1),
        (2, "Salesparson", "Sales", 10000, 1),
        (3, "Marketing Manager", "Marketing", 30000, 2),
        (4, "Marketing Assistant", "Marketing", 15000, 2),
        (5, "HR Manager", "Human Resources", 20000, 3),
        (6, "Talent Acquisition", "Human Resources", 10000, 3),
        (7, "Software Engineer", "Engineering", 40000, 4),
        (8, "Scrum Master", "Engineering", 50000, 4);
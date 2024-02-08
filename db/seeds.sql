INSERT INTO departments (name)
VALUES  ('Logistics'),
        ('Security'),
        ('Support'),
        ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES  ('Wizard', 2500, 1),
        ('Woodland Monarch', 8000, 1),
        ('Ranger', 4650, 2),
        ('Warrior', 1400, 2),
        ('Companion', 5000, 3),
        ('Ring-bearer', 0, 3),
        ('Monarch', 8000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ('Gandalf', 'TheGray', 1, NULL),
        ('Galadriel', 'Lady', 2, 1),
        ('Aragorn', 'SonOfArathorn', 3, NULL),
        ('Gimli', 'SonOfGloin', 4, 3),
        ('Legolas', 'Sylvester', 4, 3),
        ('Boromir', 'Gondorian', 4, 3),
        ('Frodo', 'Baggins', 6, 3),
        ('Samwise', 'Gamgee', 5, 7),
        ('Meriadoc', 'Brandybuck', 5, 7),
        ('Peregrin', 'Took', 5, 7),
        ('Elrond', 'Peredhel', 7, NULL),
        ('Theoden', 'Ednew', 7, NULL);
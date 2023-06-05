-- Populate the Department Table
INSERT INTO department (name)
VALUES ('Allergy'), ('Biology'), ('Chemistry'), ("Cytology"), ("Genetics"), ("Histopathology"), ('Immunology'), ('Microbiology'), ('Molecular Biology');

-- Populate the Role Table
INSERT INTO role (title, salary, department_id)
VALUES ('Department Head', 120000, 1), ('Researcher Scientist', 110000, 2), ('Laboratory Technician', 100000, 3), ('Data Analyst', 80000, 4), ('Research Assistant', 70000, 5), ('Technician Assitant', 50000, 6);

-- Populate the Employee Table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Yuki', 'Ye', 1, null), ('Danny', 'Huang', 2, 1), ('Jack', 'Chen', 3, 2), ('Chris', 'Yang', 4, 2), ('Max', 'Lin', 2, 1), ('Miaoxin', 'Chen', 5, 5);
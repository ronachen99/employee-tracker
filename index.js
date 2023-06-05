const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const table = require('console.table');
const { menu, department } = require('./questions.js');

async function main() {
    try {
        const db = await mysql.createConnection(
            {
                host: 'localhost',
                user: 'root',
                password: 'tuzichen',
                database: 'awesome_laboratory_db'
            },
            console.log(`╰[⎚ ◡ ⎚]╯ Connected to the Awesome Laboratory Database`)
        );

        const data = await inquirer.prompt(menu);
        switch (data.menuOption) {
            case 'View all Departments':
                viewDepartments(db);
                break;
            case 'View all Roles':
                viewRoles(db);
                break;
            case 'View all Employees':
                viewEmployees(db);
                break;
            case 'Add a Department':
                addDepartment(db);
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update an Employee Role':
                updateRole();
                break;
            case 'Exit':
                return process.exit();
        }

    } catch (error) {
        console.log(`୧(ಥ ⌓ ̅ಥ)୨ ${error.message}`);
        return main();
    }
};

async function viewDepartments(db) {
    [rows, fields] = await db.query('SELECT id AS ID, name AS DEPARTMENT FROM department')
    console.table(rows);
    main();
}

async function viewRoles(db) {
    [rows, fields] = await db.query('SELECT r.id AS ID, r.title AS ROLE, r.salary AS SALARY, d.name AS DEPARTMENT FROM role AS r LEFT JOIN department AS d ON r.department_id = d.id')
    console.table(rows);
    main();
}

async function viewEmployees(db) {
    [rows, fields] = await db.query('SELECT e.id AS ID, e.first_name AS FIRSTNAME, e.last_name AS LASTNAME, r.title AS POSITION, d.name AS DEPARTMENT, CONCAT(m.first_name, " ", m.last_name) AS MANAGER FROM employee AS e LEFT JOIN role AS r ON e.role_id = r.id INNER JOIN department AS d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id')
    console.table(rows);
    main();
}

async function addDepartment(db) {
    const data = await inquirer.prompt(department);
    db.query(`INSERT INTO department (name) VALUES ('${data.departmentName}')`);
    viewDepartments(db);
}

main();
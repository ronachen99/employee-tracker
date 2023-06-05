const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const options = require('./options.js');
const table = require('console.table')

async function main() {
    try {
        const db = await mysql.createConnection(
            {
                host: 'localhost',
                user: 'root',
                password: 'tuzichen',
                database: 'awesome_laboratory_db'
            },
            console.log(`╰[⎚ ◡ ⎚]╯ Main Menu:`)
        );

        let [rows, fields] = [];

        const data = await inquirer.prompt(options);
        switch (data.option) {
            case 'View all Departments':
                [rows, fields] = await db.query('SELECT id AS ID, name AS DEPARTMENT FROM department')
                console.table(rows);
                main();
                break;
            case 'View all Roles':
                [rows, fields] = await db.query('SELECT r.id AS ID, r.title AS ROLE, r.salary AS SALARY, d.name AS DEPARTMENT FROM role AS r LEFT JOIN department AS d ON r.department_id = d.id')
                console.table(rows);
                main();
                break;
            case 'View all Employees':
                [rows, fields] = await db.query('SELECT e.id AS ID, e.first_name AS FIRSTNAME, e.last_name AS LASTNAME, r.title AS POSITION, d.name AS DEPARTMENT, CONCAT(m.first_name, " ", m.last_name) AS MANAGER FROM employee AS e LEFT JOIN role AS r ON e.role_id = r.id INNER JOIN department AS d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id')
                console.table(rows); 
                main(); break;
            case 'Add a Department':
                addDepartment();
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

main();

// concat(first_name," ", last_name) as MANAGER 
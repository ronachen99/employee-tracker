const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const table = require('console.table');
const { menu, department, role, employee, roleUpdate } = require('./questions.js');

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
                addRole(db);
                break;
            case 'Add an Employee':
                addEmployee(db);
                break;
            case 'Update an Employee Role':
                updateRole(db);
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
    [departments] = await db.query('SELECT id AS ID, name AS DEPARTMENT FROM department');
    console.table(departments);
    await main();
}

async function viewRoles(db) {
    [roles] = await db.query('SELECT r.id AS ID, title AS ROLE, salary AS SALARY, name AS DEPARTMENT FROM role AS r JOIN department AS d ON r.department_id = d.id');
    console.table(roles);
    await main();
}

async function viewEmployees(db) {
    [employees] = await db.query('SELECT e.id AS ID, e.first_name AS "FIRST NAME", e.last_name AS "LAST NAME", title AS POSITION, name AS DEPARTMENT, CONCAT(m.first_name, " ", m.last_name) AS MANAGER FROM employee AS e JOIN role AS r ON e.role_id = r.id JOIN department AS d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id');
    console.table(employees);
    await main();
}

async function addDepartment(db) {
    try {
        const data = await inquirer.prompt(department);
        await db.query(`INSERT INTO department (name) VALUES ('${data.departmentName}')`);
        await viewDepartments(db);
    } catch (error) {
        console.log(`୧(ಥ ⌓ ̅ಥ)୨ ${error.message}`);
        await addDepartment(db);
    }
}

async function addRole(db) {
    try {
        const [departments] = await db.query('SELECT id AS value, name FROM department');
        const data = await inquirer.prompt(role(departments));
        await db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${data.roleName}', ${data.salary}, ${data.roleDepartment})`);
        await viewRoles(db);
    } catch (error) {
        console.log(`୧(ಥ ⌓ ̅ಥ)୨ ${error.message}`);
        await addRole(db);
    }
}

async function addEmployee(db) {
    try {
        const [roles] = await db.query('SELECT id AS value, title AS name FROM role');
        const [managers] = await db.query('SELECT CONCAT(first_name, " ", last_name) AS name, id AS value from employee');
        let managerOptions = [{ value: null, name: "No Manager Specified" }, ...managers];
        const data = await inquirer.prompt(employee(roles, managerOptions));
        await db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${data.firstName}', '${data.lastName}', ${data.role_id}, ${data.manager_id})`);
        await viewEmployees(db);
    } catch (error) {
        console.log(`୧(ಥ ⌓ ̅ಥ)୨ ${error.message}`);
        await addEmployee(db);
    }
}

async function updateRole(db) {
    try {
        const [employees] = await db.query('SELECT CONCAT(first_name, " ", last_name) AS name, id AS value from employee');
        const [roles] = await db.query('SELECT id AS value, title AS name FROM role');
        const data = await inquirer.prompt(roleUpdate(employees, roles));
        await db.query(`UPDATE employee SET role_id = ${data.updatedRole} WHERE id = ${data.employeeID}`)
        console.log('⸂⸂⸜(രᴗര๑)⸝⸃⸃ updated')
        await viewEmployees();
    } catch (error) {
        console.log(`୧(ಥ ⌓ ̅ಥ)୨ ${error.message}`);
        await updateRole(db);
    }
}

main();
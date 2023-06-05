// Import Required Dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const table = require('console.table');
const { menu, department, role, employee, roleUpdate } = require('./questions.js');

// Main Menu Function: that displays the main menu with options for the user to choose from in the terminal
async function main() {
    try {
        // Connect to the database
        const db = await mysql.createConnection(
            {
                host: 'localhost',
                user: 'root',
                // Add MySQL password here
                password: 'tuzichen',
                database: 'awesome_laboratory_db'
            },
            console.log(`╰[⎚ ◡ ⎚]╯ Connected to the Awesome Laboratory Database`)
        );
        // Switch case that calls the function based on the user's chosen option
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

// View Departments Function: that view all departments
async function viewDepartments(db) {
    [departments] = await db.query('SELECT id AS ID, name AS DEPARTMENT FROM department');
    console.table(departments);
    await main();
}

// View Roles Function: that view all roles/positions
async function viewRoles(db) {
    [roles] = await db.query('SELECT r.id AS ID, title AS ROLE, salary AS SALARY, name AS DEPARTMENT FROM role AS r JOIN department AS d ON r.department_id = d.id');
    console.table(roles);
    await main();
}

// View Employees Function: that view all employees
async function viewEmployees(db) {
    [employees] = await db.query('SELECT e.id AS ID, e.first_name AS "FIRST NAME", e.last_name AS "LAST NAME", title AS POSITION, name AS DEPARTMENT, CONCAT(m.first_name, " ", m.last_name) AS MANAGER FROM employee AS e JOIN role AS r ON e.role_id = r.id JOIN department AS d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id');
    console.table(employees);
    await main();
}

// Add Department Function: adds a new department based on user input
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

// Add Role Function: adds a new role based on user inputs and option
async function addRole(db) {
    try {
        // Gets the most updated department array, and set aliases as name and value for inquirer
        const [departments] = await db.query('SELECT id AS value, name FROM department');
        // Pass it to the role prompt in the questions.js
        const data = await inquirer.prompt(role(departments));
        // Take the user input and insert the value as a new row in the role table
        await db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${data.roleName}', ${data.salary}, ${data.roleDepartment})`);
        await viewRoles(db);
    } catch (error) {
        console.log(`୧(ಥ ⌓ ̅ಥ)୨ ${error.message}`);
        await addRole(db);
    }
}

// Add Employee Function: adds a new employee based on user inputs and options
async function addEmployee(db) {
    try {
        // Gets the most updated roles and managers array, and set aliases as name and value for inquirer
        const [roles] = await db.query('SELECT id AS value, title AS name FROM role');
        const [managers] = await db.query('SELECT CONCAT(first_name, " ", last_name) AS name, id AS value from employee');
        // Use spread to add the null option into the manager array
        let managerOptions = [{ value: null, name: "No Manager Specified" }, ...managers];
        // Pass it to the employee prompt in the questions.js
        const data = await inquirer.prompt(employee(roles, managerOptions));
        // Take the user input and insert the value as a new row in the employee table
        await db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${data.firstName}', '${data.lastName}', ${data.role_id}, ${data.manager_id})`);
        await viewEmployees(db);
    } catch (error) {
        console.log(`୧(ಥ ⌓ ̅ಥ)୨ ${error.message}`);
        await addEmployee(db);
    }
}
// Update Role Function: updates the employee with a new role
async function updateRole(db) {
    try {
        // Gets the most updated employees and roles array, and set aliases as name and value for inquirer
        const [employees] = await db.query('SELECT CONCAT(first_name, " ", last_name) AS name, id AS value from employee');
        const [roles] = await db.query('SELECT id AS value, title AS name FROM role');
        // Pass it to the role update prompt in the questions.js
        const data = await inquirer.prompt(roleUpdate(employees, roles));
        // Take the user input and update the role_id as the new selected role id form the inquirer
        await db.query(`UPDATE employee SET role_id = ${data.updatedRole} WHERE id = ${data.employeeID}`);
        console.log('⸂⸂⸜(രᴗര๑)⸝⸃⸃ updating...');
        await viewEmployees();
    } catch (error) {
        console.log(`୧(ಥ ⌓ ̅ಥ)୨ ${error.message}`);
        await updateRole(db);
    }
}

main();
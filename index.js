const inquirer = require('inquirer');
const mysql = require('mysql2');
const options = require('./options.js')

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'tuzichen',
    database: 'awesome_laboratory_db'
  },
  console.log(`╰[⎚ ◡ ⎚]╯ Trying to connect to the awesome_laboratory_db database.`)
);

db.connect((error) => {
    if (error) {
        console.log(`୧(ಥ ⌓ ̅ಥ)୨ ${error.message}`);
    } 
    else {
        console.log (`ᕙ[⎚ ◡ ⎚]ᕗ Connected to the awesome_laboratory_db database.`);
        userOption();
    }
}
)

const userOption = async () => {
    try {
        const data = await inquirer.prompt(options);
        switch (data.option) {
            case 'View all Departments':
                viewDepartments();
            break;
            case 'View all Roles':
                viewRoles();
            break;
            case 'View all Employees':
                viewEmployees();
            break;
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
        }
    } catch (error) {
        console.log(error);
    }
}


const menu = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit'],
        name: 'menuOption'
    }
]

const department = [
    {
        type: 'input',
        message: 'Enter department name:',
        name: 'departmentName'
    }
]

const role = [
    {
        type: 'input',
        message: 'Enter job title:',
        name: 'roleName'
    },
    {
        type: 'input',
        message: 'Enter salary:',
        name: 'salary',
        validate: input => {
            if (isNaN(input) === false) return true;
            return "Please enter a valid number";
        }
    },
    {
        type: 'list',
        message: 'Select the department it belongs to:',
        choices: [],
        name: 'roleDepartment'
    }
]
module.exports = { menu, department, role };
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

const role = (departmentChoices) => [
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
        choices: departmentChoices,
        name: 'roleDepartment'
    }
]

const employee = (roleChoices, managerChoices) => [
    {
        type: 'input',
        message: 'Enter first name:',
        name: 'firstName'
    },
    {
        type: 'input',
        message: 'Enter last name:',
        name: 'lastName',
    },
    {
        type: 'list',
        message: 'Select the role of the employee:',
        choices: roleChoices,
        name: 'role_id'
    },
    {
        type: 'list',
        message: 'Select the manager of the employee, if any:',
        choices: managerChoices,
        name: 'manager_id'
    }
]

const roleUpdate = (employeeChoices, roleChoices) => [
    {
        type: 'list',
        message: 'Select the employee:',
        choices: employeeChoices,
        name: 'employeeID'
    },
    {
        type: 'list',
        message: 'Select the new role:',
        choices: roleChoices,
        name: 'updatedRole'
    }
]

module.exports = { menu, department, role, employee, roleUpdate};
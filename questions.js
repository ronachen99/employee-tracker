const menu = [
    {
        type:'list',
        message:'What would you like to do?',
        choices:['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit'],
        name:'menuOption'
    }
]

const department = [
    {
        type:'input',
        message:'Enter department name:',
        name:'departmentName'
    }
]
module.exports = {menu, department};
const inquirer = require('inquirer');
const db = require('./db');
const cTable = require('console.table');
const { query } = require('./db/connection');
const { getNames, getDepartments } = require('./db');

//Inquirer start questions
const startApp = () => {
  return inquirer
  .prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
    }])
    .then(choiceSelected => {
      switch (choiceSelected.choice) {
        case "View All Employees": db.allEmployees()
        .then(([data, index]) => {
          console.table(data)
          startApp();
        })
        break;
        case "Add Employee": addEmployee();
        break;
        case "Update Employee Role": updateRole();
        break;
        case "View All Roles": db.viewRoles()
        .then(([data, index]) => {
          console.table(data)
          startApp();
        })
        break;
        case "Add Role": addRole();
        break;
        case "View All Departments": db.viewDepartments()
        .then(([data, index]) => {
          console.table(data)
          startApp();
        })
        break;
        case "Add Department": addDepartment();
      }
    });
};

startApp();

// Inquirer questions to AddEmployee function
const addEmployee = async () =>{
  let roleNames = await db.getRoles();
  let empManager = await db.getManager();
  return inquirer
  .prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Please enter first name'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Please enter last name'
    },
    {
      type: 'list',
      name: 'role',
      message: 'Please enter employee role',
      choices: roleNames
    },
    {
      type: 'list',
      name: 'emp_manager',
      message: 'Please enter employee manager',
      choices: empManager
    }
  ])
  .then(() => {
  startApp();
  })
};

// Function to add new department
const addDepartment = () =>{
  return inquirer
  .prompt([
    {
      type: 'input',
      name: 'department',
      message: 'Enter name of the new department: '
    }
  ])
  .then(({ department }) => {
  db.saveDepartment(department);
  console.log("New department Saved!")
  startApp();
  })
};

// Function to add new role
const addRole = async () =>{
  let departmentNames = await db.getDepartments();
  let allDepartments = departmentNames.map(x => x.map(x => x.name));
  return inquirer
  .prompt([
    {
      type: 'input',
      name: 'role',
      message: 'Enter name of the new role'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter salary of the role'
    },
    {
      type: 'list',
      name: 'department',
      message: 'Select the department',
      choices: allDepartments[0]
    }
  ])
  .then(({ role, salary, department }) => {
  db.saveRole(role, salary, department);
  console.log("New role saved!")
  startApp();
  })
};

const updateRole = async () => {
  let employeeList = await db.getNames();
  let roleNames = await db.getRoles();
  console.log(employeeList)
  console.log(roleNames)
  return inquirer
  .prompt([
    {
      type: 'list',
      name: 'employee',
      message: 'Which employee do you want to update?',
      choices: employeeList
    },
    {
      type: 'list',
      name: 'role',
      message: 'Which role do you want to assign to the selected employee?',
      choices: roleNames
    }
  ])
  .then(({ employee, role }) => {
    db.updateEmployeeRole(employee, role);
    console.log("Role updated!")
    startApp();
  })
}

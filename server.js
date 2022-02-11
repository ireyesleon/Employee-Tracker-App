const inquirer = require('inquirer');
const db = require('./db');
const cTable = require('console.table');

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
const addEmployee = () =>{
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
      type: 'input',
      name: 'role',
      message: 'Please enter employee role'
    },
    {
      type: 'input',
      name: 'emp_manager',
      message: 'Please enter employee manager'
    }
  ])
  .then(() => {
  startApp();
  })
};

const addDepartment = () =>{
  return inquirer
  .prompt([
    {
      type: 'input',
      name: 'department',
      message: 'Enter name of the new department'
    }
  ])
  .then(() => {
  startApp();
  })
};

const addRole = () =>{
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
      type: 'input',
      name: 'department',
      message: 'Enter the name of the deparment'
    }
  ])
  .then(() => {
  startApp();
  })
};


// Function to remove employee
// function removeEmployee() {
//   db.allEmployeees()
//   .then()
// }
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
const addEmployee = async () =>{
  let roleNames = await db.getRoles();
  let allRoles = roleNames[0].map(x => ({
    name: x.title,
    value: x.id
  }));
  let employeeList = await db.getNames();
  let allEmployees = employeeList[0].map(x => ({
    name: x.full_name,
    value: x.id
  }));
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
      choices: allRoles
    },
    {
      type: 'list',
      name: 'emp_manager',
      message: 'Please enter employee manager',
      choices: allEmployees
    }
  ])
  .then(({ first_name, last_name, role, emp_manager }) => {
  db.newEmployee(first_name, last_name, role, emp_manager);
  console.log("New employee added!")
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
  let allDepartments = departmentNames[0].map(x => ({
    name: x.name,
    value: x.id
  }));
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
      choices: allDepartments
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
  let allEmployees = employeeList[0].map(x => ({
    name: x.full_name,
    value: x.id
  }));
  let roleNames = await db.getRoles();
  let allRoles = roleNames[0].map(x => ({
    name: x.title,
    value: x.id
  }));
  console.log(allRoles)
  return inquirer
  .prompt([
    {
      type: 'list',
      name: 'employee',
      message: 'Which employee do you want to update?',
      choices: allEmployees
    },
    {
      type: 'list',
      name: 'role',
      message: 'Which role do you want to assign to the selected employee?',
      choices: allRoles
    }
  ])
  .then(({ role, employee }) => {
    db.saveEmployeeRole(role, employee);
    console.log("Role updated!")
    startApp();
  })
}

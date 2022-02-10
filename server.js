const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

//Inquirer questions
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
        case "View All Employees": allEmployeees();
        break;
        case "Add Employee": addEmployee();
        break;
        case "Update Employee Role": updateRole();
        break;
        case "View All Roles": viewRoles();
        break;
        case "Add Role": addRole();
        break;
        case "View All Departments": viewDepartments();
        break;
        case "Add Deparment": addDeparment();
        break;
      }
    });
};

startApp();
const connection = require('./connection');

class db {
    constructor(connection) {
        this.connection = connection;
    }

// Function to display all employees
allEmployees() {
    return this.connection.promise().query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id"
    )
}

// Function to display all departments
viewDepartments() {
    return this.connection.promise().query(
        "SELECT department.id, department.name AS department FROM department"
    )
}

// Function to display all roles
viewRoles() {
    return this.connection.promise().query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role AS role JOIN department ON department.id = role.department_id"
    )
}

// Function to save a new department
saveDepartment(department) {
    return this.connection.promise().query(
        "INSERT INTO department (name) VALUES (?)", department
    )
}

// Function to save a new role
saveRole(role, salary, department) {
    return this.connection.promise().query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [role, salary, department]
    )
}

// Function to display all departments in inquirer
getDepartments() {
    return this.connection.promise().query(
        "SELECT name FROM department"
    )
}

// Function to display all employees in inquirer
getNames() {
    return this.connection.promise().query(
        "SELECT CONCAT (first_name, ' ', last_name) FROM employee"
    )
}

// Function to display all roles in inquirer
getRoles() {
    return this.connection.promise().query(
        "SELECT title FROM role"
    )
}

// Function to display all managers in inquirer
getManager() {
    return this.connection.promise().query(
        "SELECT name FROM employee"
    )
}

// Function to update employee role
saveEmployeeRole(employee, role) {
    return this.connection.promise().query(
        "UPDATE employee SET role_id = ? WHERE id = ?", employee, role
    )
}



}

module.exports = new db(connection);
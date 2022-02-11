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

viewDepartments() {
    return this.connection.promise().query(
        "SELECT department.id, department.name AS department FROM department"
    )
}

viewRoles() {
    return this.connection.promise().query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role AS role JOIN department ON department.id = role.department_id"
    )
}
}

module.exports = new db(connection);
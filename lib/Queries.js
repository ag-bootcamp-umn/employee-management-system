const db = require('../config/connect');
const Prompter = require('./Prompter');

const prompter = new Prompter();

class Queries {
    constructor() {

    }

    async viewTable(input) {
        try {
          const data = await queries.selectAll(input);
          console.table(data);
        } catch (err) {
          console.log(err);
        }
      }

    selectAll(input) {
        return new Promise((resolve, reject) => {
          db.query(`SELECT * FROM ${input};`, (err, data) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
      }
      
    //   selectCol(table, col) {
    //     return new Promise((resolve, reject) => {
    //       db.query(`SELECT ${col} FROM ${table};`, (err, data) => {
    //         if (err) {
    //           console.log(err);
    //           reject(err);
    //         } else {
    //           resolve(data);
    //         }
    //       });
    //     });
    //   }
      
    //   selectColWhere(table, col, where) {
    //     return new Promise((resolve, reject) => {
    //       db.query(`SELECT ${col} FROM ${table} WHERE ${where};`, (err, data) => {
    //         if (err) {
    //           console.log(err);
    //           reject(err);
    //         } else {
    //           resolve(data);
    //         }
    //       });
    //     });
    //   }

    async addDepartment() {
        const input = await prompter.inputPrompt("Enter Department Name");
        db.query(`INSERT INTO departments (name) VALUES (?)`, input, (err, data) => {
          if (err) console.log(err.message);
          console.log("Successfully added department.");
        });
      }
    
    async addEmployee() {
        // declare empty object for new employee
        let newEmployee = {};
        // Get the roles and managers
        const roles = await this.selectAll("roles");
        const managers = await this.selectAll("employees");
        // Create prompt choices variables
        const roleTitles = roles.map((el) => el.title);
        const managerNames = managers.map((el) => `${el.first_name} ${el.last_name}`);
        // GET USER INPUT
        newEmployee.first_name = await prompter.inputPrompt(
          "Enter new employee first name."
        );
        newEmployee.last_name = await prompter.inputPrompt(
          "Enter new employee last name"
        );  
        const inputRole = await prompter.listPrompt({
          msg: "Select a role for the new employee",
          opts: roleTitles,
        });
        newEmployee.role_id = roles.filter((role) => role.title === inputRole)[0].id;
        const inputManager = await prompter.listPrompt({
          msg: "Select a manager for the new employee",
          opts: managerNames,
        });
        newEmployee.manager_id = managers.filter(
          (mgr) => mgr.first_name === inputManager.split(" ")[0]
        )[0].id;
      
        //  push to database
        db.query(
            `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?);`,
            [newEmployee.first_name, newEmployee.last_name, newEmployee.role_id, newEmployee.manager_id],
            (err, data) => {
              if (err) console.log(err.message);
              console.log("Successfully added role.");
            }
          );
      }

      async addRole() {
        // SIMILAR LOGIC AS addEmployee function
        const newRole = {};
        const depts = await this.selectAll("departments");
        const deptNames = depts.map( el => el.name);
        newRole.title = await prompter.inputPrompt(
            "Enter role title."
        );
        newRole.salary = await prompter.numberPrompt(
            "Enter role salary."
        );
        const department = await prompter.listPrompt({
            msg: "Enter the department for this role.",
            opts: deptNames,
        });
        newRole.department_id = depts.filter(
            (dept) => dept.name === department
        )[0].id;
        console.log(newRole);
        db.query(
            `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);`,
            [newRole.title, newRole.salary, newRole.department_id],
            (err, data) => {
              if (err) console.log(err.message);
              console.log("Successfully added role.");
            }
          );
      }

      async updateEmployeeRole(){
        const update = {};
        // Get employees and roles
        const employees = await this.selectAll("employees");
        const roles = await this.selectAll("roles");

        const employeeNames = employees.map( el => `${el.first_name} ${el.last_name}`);
        const roleTitles = roles.map((el) => el.title);
        // select employee
        let name = await prompter.listPrompt({
            msg: "Which employee do you wish to change?",
            opts: employeeNames
        });
        name = name.split(" ")[0];
        // chose new role
        const role = await prompter.listPrompt({
            msg: "Select new role for the employee",
            opts: roleTitles
        });
        const role_id = roles.filter(
            (r) => r.title === role
        )[0].id;
        // update DB
        db.query(
            `UPDATE employees SET role_id = ? WHERE first_name = ?;`,
            [role_id, name], (err, data) => {
                if (err) console.log(err.message);
                console.log("Successfully added role.");
              }
        )
      }
    
}

module.exports = Queries;
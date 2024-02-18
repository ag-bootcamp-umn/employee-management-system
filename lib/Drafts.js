const db = require("../config/connect");
const inquirer = require("inquirer");

const Prompter = require("./Prompter");

const prompter = new Prompter();

function selectAll(input) {
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

async function addRole() {
  // Create array for the role and variable for departments
  const role = {};

    getFromList('departments', 'department').id;
  

  // query to get all departments
  async function getFromList(where, ref) {
    try {
      const list = await selectAll(where);
      const selection = await prompter.listPrompt({
        msg: `Add the ${ref}`,
        opts: list,
      });
      console.log(selection);
      const selection_id = list.find(el => el.name === selection).id;
      console.log(selection_id);
      console.log(role);
      role.department_id = selection_id;
    } catch (err) {
      console.log("Error:", err);
    }
  }

  // // Have user select a department for the role
  // async function getDept(input) {
  //   const dept = await prompter.listPrompt({msg: 'Add the department', opts: input});
  //   role.id = departments.find(el => el.name === dept).id;
  //   getRoleTitle();
  // }
  // // Get user input for name and salary
  // async function getRoleTitle() {
  //   const title = await prompter.inputPrompt('Enter role title');
  //   role.title = title;
  //   getRoleSalary();
  // }

  // async function getRoleSalary() {
  //   const salary = await prompter.numberPrompt('Enter salary');
  //   role.salary = salary;
  //   inputRole()
  // }

  // // Throw it all into the database
  // async function inputRole() {
  //   db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);`, [role.title, role.salary, role.id], (err, data) => {
  //     if (err) console.log(err.message);
  //     console.log('Successfully added role.');
  //   });
  // }
}
addRole();

const db = require("./config/connect");
const inquirer = require("inquirer");

const Prompter = require("./lib/Prompter");
const Queries = require("./lib/Queries");

const prompter = new Prompter();
const queries = new Queries();

async function viewTable(input) {
  try {
    const data =  await selectAll(input);
    console.table(data);
  } catch (err) {
    console.log(err)
  }
}

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

// function addDepartment() {
//   prompter.inputPrompt("Enter Department Name").then((data) => {
//     const sql = `INSERT INTO departments (name) VALUES (?)`;
//     db.query(sql, data.result, (err, result) => {
//       console.log("success");
//     });
//   });
// }

async function addDepartment() {
  const input = await prompter.inputPrompt('Enter Department Name');
  db.query(`INSERT INTO departments (name) VALUES (?)`, input, (err, data) => {
    if (err) console.log(err.message);
    console.log('Successfully added department.');
  });
}

async function addRole() {
  // Create array for the role and variable for departments
  const role = {};
  let departments;
  // query to get all departments
  try {
    const depts = await selectAll('departments');
    // const deptNames = depts.map(dept => dept.name);
    departments = depts
    getDept(departments);
    return depts;
  } catch (err) {
    console.log('Error:', err);
  }
  // Have user select a department for the role
  async function getDept(input) {
    const dept = await prompter.listPrompt({msg: 'Add the department', opts: input});
    role.id = departments.find(el => el.name === dept).id;
    getRoleTitle();
  }
  // Get user input for name and salary
  async function getRoleTitle() {
    const title = await prompter.inputPrompt('Enter role title');
    role.title = title;
    getRoleSalary();
  }
  
  async function getRoleSalary() {
    const salary = await prompter.numberPrompt('Enter salary');
    role.salary = salary;
    inputRole() 
  }

  // Throw it all into the database
  async function inputRole() {
    db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);`, [role.title, role.salary, role.id], (err, data) => {
      if (err) console.log(err.message);
      console.log('Successfully added role.');
    });
  }
}
// addRole();


async function mainMenuSelection() {
  const selection = await prompter.listPrompt(prompter.mainMenuQuery);
  switch (selection) {
    case "View all departments":
      viewTable("departments");
      break;

    case "View all roles":
      viewTable("roles");
      break;

    case "View all employees":
      viewTable("employees");
      break;

    case "Add a department":
      addDepartment();
      break;

    case "Add a role":
      addRole();
      break;

    case 'Add an employee':
      console.log("five");
      break;

    case 6:
      console.log("six");
      break;

    default:
      break;
  }
}

mainMenuSelection();
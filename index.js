// const db = require("./config/connect");

const Prompter = require("./lib/Prompter");
const Queries = require("./lib/Queries");

const prompter = new Prompter();
const queries = new Queries();

// async function viewTable(input) {
//   try {
//     const data = await queries.selectAll(input);
//     console.table(data);
//   } catch (err) {
//     console.log(err);
//   }
// }

async function mainMenuSelection() {
  const selection = await prompter.listPrompt(prompter.mainMenuQuery);
  switch (selection) {
    case "View all departments":
      queries.viewTable("departments");
      break;

    case "View all roles":
      queries.viewTable("roles");
      break;

    case "View all employees":
      queries.viewTable("employees");
      break;

    case "Add a department":
      queries.addDepartment();
      break;

    case "Add a role":
      queries.addRole();
      break;

    case "Add an employee":
      queries.addEmployee();
      break;

    case "Update an employee role":
      queries.updateEmployeeRole();
      break;

    default:
      break;
  }
}

// mainMenuSelection();
queries.updateEmployeeRole();
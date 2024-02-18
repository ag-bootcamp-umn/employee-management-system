const Prompter = require("./lib/Prompter");
const Queries = require("./lib/Queries");

const prompter = new Prompter();
const queries = new Queries();

async function mainMenuSelection() {
  const selection = await prompter.listPrompt(prompter.mainMenuQuery);
  switch (selection) {
    case "View all departments":
      queries.viewTable("departments", followUp);
      break;

    case "View all roles":
      queries.viewTable("roles", followUp);
      break;

    case "View all employees":
      queries.viewTable("employees", followUp);
      break;

    case "Add a department":
      queries.addDepartment(followUp);
      break;

    case "Add a role":
      queries.addRole(followUp);
      break;

    case "Add an employee":
      queries.addEmployee(followUp);
      break;

    case "Update an employee role":
      queries.updateEmployeeRole(followUp);
      break;

    case "Exit":
      process.exit();
      break;

    default:
      break;
  }
}

function followUp() {
  setTimeout( async () => {
      const nextStep = await prompter.listPrompt({
          msg:"What would you like to do next?",
          opts: ["Another task", "Exit"]
      });
      if (nextStep === "Another task") {
        mainMenuSelection();
      } else {
        process.exit();
      }
  }, 1000);
}

mainMenuSelection();
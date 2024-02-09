const db = require('./config/connect');
const inquirer = require("inquirer")

const Prompter = require('./lib/Prompter');

const prompter = new Prompter();

async function init() {
    const userSelection = await prompter.listPrompt(prompter.main.message, prompter.main.choices);
    console.log(userSelection);
    return userSelection;
}


init()


// const queryParams = {
    
// }

// Takes in data and displays as table
function displayTable(data) {
    console.table(data);
}

async function viewAllEmployees() {
    const employees = await getList('employees');
    displayTable(employees);
}

async function addNewEmployees() {
    // ask for name
    // ask for email
    const departments = await getList('departments')
    const chosenDept = displayList(deparments)

    const roles = await getList('roles')
    const chosenRole = displayList(roles)
}

////////////////////////////////////////////////
///////////////// FUNCTIONS ////////////////////
////////////////////////////////////////////////
async function listPrompt(msg, opts) {
    const { result } = await inquirer.prompt([
        {
            type: "list",
            message: msg,
            choices: opts,
            name: "result"
        }
    ]);
    return result;
}

async function retrieve(table) {
    db.query(`SELECT * FROM ${table}`, (err, data) => {
        if (err) console.log(err);
        console.log(data);
        return data;
        console.log(data);
    })
}

function sortResponse(selection) {
    switch (selection) {
        case 0:
            console.log('zero');
            break;
    
        case 1:
            console.log('one');
            break;
    
        case 2:
            console.log('two');
            break;
    
        case 3:
            console.log('three');
            break;
    
        case 4:
            console.log('four');
            break;
    
        case 5:
            console.log('five');
            break;
    
        case 6:
            console.log('six');
            break;
    
        default:
            break;
    }
}

async function addRole() {
    const depts = await selectAll('departments', (err, data) => {
      if (err) {
        console.log('Error:', err);
      } else {
        return data.map(dept => dept.name);
      }
    });
    console.log(depts);
  }
  addRole();
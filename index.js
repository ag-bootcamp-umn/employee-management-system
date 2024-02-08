const db = require('./config/connect');
const inquirer = require("inquirer")

const Prompter = require('./lib/Prompter');
const Queries = require('./lib/Queries');

const prompter = new Prompter();
const queries = new Queries();

// const mainMenuQuery = {
//     msg: 'SELECT AN ACTION.',
//     opts: [
//         {name: 'View all departments', value: 0},
//         {name: 'View all roles', value: 1},
//         {name: 'View all employees', value: 2},
//         {name: 'Add a department', value: 3},
//         {name: 'Add a role', value: 4},
//         {name: 'Add an employee', value: 5},
//         {name: 'Update an employee role', value: 6},
//     ],
// }

function viewDepartments() {
    const table = queries.retrieve('departments')
    .then(() => console.log(table));
}

async function mainMenuSelection() {
    const selection = await prompter.listPrompt(prompter.mainMenuQuery);
    switch (selection) {
        case 'View all departments':
            // query mysql for the departments table
            // display it
            viewDepartments();
            break;
    
        case 'View all roles':
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

mainMenuSelection();
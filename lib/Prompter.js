const inquirer = require("inquirer");
const db = require('../config/connect');


class Prompter {
    constructor() {
        this.mainMenuQuery = {
            msg: 'SELECT AN ACTION.',
            opts: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
            ],
        }
    }
    
    async listPrompt({msg, opts}) {
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
    
    async inputPrompt(msg) {
        const {result} = await inquirer.prompt([
            {
                type: "input",
                message: msg,
                name: "result"
            }
        ]);
        return result;
    }


}

module.exports = Prompter;
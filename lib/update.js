let fs = require("fs");
let axios =  require("axios");
let chalk = require("chalk");
let ora = require("ora");
let clear = require("clear");
const { exec } = require("child_process");

let spinner;

module.exports = {
    async default(args) {
        clear();
        try {
            console.log("");
            console.log(chalk`== {bold Updating clinicTools CLI} ==`)
            console.log("");
            spinner = ora(`Installing package`).start();
            await new Promise((resolve, reject) => {
                exec(`npm install -g git+https://github.com/clinicTools/clt-cli.git`, (error, stdout, stderr) => {
                    resolve(stdout);
                });
            });
            spinner.succeed();
            console.log("")
            console.log(chalk`{green.bold Update executed successfully!}`)
            console.log("")
        } catch {
            spinner.fail();
            console.log("")
            console.log(chalk`{red.bold Error in update see above!}`)
            console.log("")
        }
        
    },
    async help() {

    },
    async description() {
        return "        updates the clt-cli to latest version"
    }
}
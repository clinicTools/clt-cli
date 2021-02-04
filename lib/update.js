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
            await downloadUpdate();
            spinner = ora(`Installing package`).start();
            await new Promise((resolve, reject) => {
                exec(`npm install -g ${__dirname}/../_temp/update.tar.gz --force`, (error, stdout, stderr) => {
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

async function downloadUpdate() {
    spinner = ora("Creating temporary path").start();
    await fs.promises.rmdir(__dirname + "/../_temp/", {recursive: true});
    await fs.promises.mkdir(__dirname + "/../_temp/");
    spinner.succeed()
    let writer = fs.createWriteStream(__dirname + "/../_temp/update.tar.gz");
    spinner = ora("Downloading new version").start();
    let response = await axios.get("https://github.com/clinicTools/clt-cli/tarball/main", {
        responseType: 'stream',
        headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
        }
    });

    return await new Promise((resolve, reject) => {
        response.data.pipe(writer);
        let error = null;
        writer.on('error', err => {
            spinner.fail()
            error = err;
            writer.close();
            reject(err);
        });
        writer.on('close', () => {
            if (!error) {
                spinner.succeed();
                resolve(true);
            }
        });
    });
}
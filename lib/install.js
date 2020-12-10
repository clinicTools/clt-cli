let chalk = require("chalk");
let path = require('path');
let cltDir = path.join(require("os").homedir(), ".clt", "build");
let fs = require("fs");
let axios = require("axios");
let extract = require('extract-zip');
let ora = require("ora");
let clear = require("clear")
let { exec } = require("child_process");

module.exports = {
    async default(args) {
        clear();
        console.log(chalk`\n== {bold Installing PatientView.Server {green v3.0.2}} ==\n`)
        await downloadUpdate("app", "3.0.2");
        console.log("");
        await downloadUpdate("data", "3.0.2");
        
        console.log(chalk`\n{green.bold Installed successfully, happy coding!\n}`)
    },
    async help() {

    }
}

//

async function downloadUpdate(name, version) {
    let spinner = ora(`Creating ${name} path`).start();
    await fs.promises.rmdir(path.join(cltDir, name), {recursive: true});
    await fs.promises.mkdir(path.join(cltDir, name), {recursive: true});
    spinner.succeed();

    let writer = fs.createWriteStream(path.join(cltDir, name, "install.zip"));
    spinner = ora(`Downloading ${name}`).start();
    let response = await axios.get(`https://github.com/clinicTools/clt-cli/releases/download/${version}/${name}.zip`, {
        responseType: 'stream'
    });

    await new Promise((resolve, reject) => {
        response.data.pipe(writer);
        let error = null;
        writer.on('error', err => {
            spinner.fail();
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
    
    
    await extract(path.join(cltDir, name, "install.zip"), {dir: path.join(cltDir, name)});
    spinner.succeed();
    
    await new Promise((resolve, reject) => {
        spinner = ora(`Installing ${name} dependencies`).start();
        exec(`npm install`, {
            cwd: path.join(cltDir, name)
        }, (error, stdout, stderr) => {
            resolve(stdout);
        });
    });
    spinner.succeed();
}
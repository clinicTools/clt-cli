let chalk = require("chalk");
let path = require('path');
let cltDir = path.join(require("os").homedir(), ".clt", "build");
let fs = require("fs");
let axios = require("axios");
let extract = require('extract-zip');
let ora = require("ora");
let clear = require("clear")
let { exec } = require("child_process");
let inquirer = require("inquirer");

module.exports = {
    async default(args) {
        let allRel = await axios.get("https://api.github.com/repos/clinicTools/clt-cli/releases");
        let releases = []
        for(let i = 0; i < allRel.data.length; i++) {
            let release = allRel.data[i];
            releases.push(release.tag_name);
        }
        let version;
        let askVersion = true;

        if(args._.length > 1) {
            if(releases.includes(args._[1])) {
                askVersion = false;
                version = args._[1];
            } else {
                console.log(chalk`\n{red Version {bold v${args._[1]}} not avaiable}\n`)
            }
            
        }

        if(askVersion) {
            let a = await inquirer.prompt([{
                type: 'list',
                name: 'version',
                message: 'Select version to install',
                choices: releases,
            }]);
            version = a.version;
        }

        
        clear();
        console.log(chalk`\n== {bold Installing PatientView dev package {green v${version}}} ==\n`)
        await downloadUpdate("app", version);
        console.log("");
        await downloadUpdate("data", version);
        
        console.log(chalk`\n{green.bold Installed successfully, happy coding 🧑🏻‍💻!\n}`)
    },
    async help() {

    },
    async description() {
        return "       downloads and installs the latest Server Version"
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
    
    spinner = ora(`Extracting ${name}`).start();
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
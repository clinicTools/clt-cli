let chalk = require("chalk");
let path = require('path');
let cltDir = path.join(require("os").homedir(), ".clt", "build");
let fs = require("fs");
let axios = require("axios");
let extract = require('extract-zip');
let { exec } = require("child_process");

module.exports = {
    async default(args) {
        console.log(chalk`\n== {bold Installing PatientView.Server {green v3.0.2}} ==\n`)
        await downloadUpdate("app", "3.0.2");
        console.log("");
        await downloadUpdate("data", "3.0.2");
        
    },
    async help() {

    }
}

//

async function downloadUpdate(name, version) {
    console.log(chalk`   {cyan → Creating ${name} path}`);
    await fs.promises.rmdir(path.join(cltDir, name), {recursive: true});
    await fs.promises.mkdir(path.join(cltDir, name), {recursive: true});

    let writer = fs.createWriteStream(path.join(cltDir, name, "install.zip"));
    console.log(chalk`   {cyan → Downloading ${name}}`)
    let response = await axios.get(`https://github.com/clinicTools/clt-cli/releases/download/${version}/${name}.zip`, {
        responseType: 'stream'
    });

    await new Promise((resolve, reject) => {
        response.data.pipe(writer);
        let error = null;
        writer.on('error', err => {
            console.log(chalk`   {red → DownloadError}`)
            error = err;
            writer.close();
            reject(err);
        });
        writer.on('close', () => {
            if (!error) {
                console.log(chalk`   {cyan → Downloaded}`)
                resolve(true);
            }
        });
    });
    console.log(chalk`   {cyan → Extracting ${name}}`);
    await extract(path.join(cltDir, name, "install.zip"), {dir: path.join(cltDir, name)});

    
    await new Promise((resolve, reject) => {
        console.log(chalk`   {cyan → Installing ${name} dependencies}`);
        exec(`npm install`, {
            cwd: path.join(cltDir, name)
        }, (error, stdout, stderr) => {
            resolve(stdout);
        });
    });
    console.log(chalk`   {cyan → Installed}`)
}
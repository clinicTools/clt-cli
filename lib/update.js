let fs = require("fs");
let axios =  require("axios");
let chalk = require("chalk");
const { exec } = require("child_process");

module.exports = {
    async default(args) {
        try {
            console.log("");
            console.log(chalk`== {bold Updating clinicTools CLI} ==`)
            console.log("");
            await downloadUpdate();
            await new Promise((resolve, reject) => {
                console.log(chalk`   {cyan → Installing package}`)
                exec(`npm install -g ${__dirname}/../_temp/update.tar.gz --force`, (error, stdout, stderr) => {
                    resolve(stdout);
                });
            });
            console.log("")
            console.log(chalk` {green Update executed successfully!}`)
            console.log("")
        } catch {
            console.log("")
            console.log(chalk` {red Error in update see above!}`)
            console.log("")
        }
        
    },
    async help() {

    }
}

async function downloadUpdate() {
    console.log(chalk`   {cyan → Creating temporary path}`)
    await fs.promises.rmdir(__dirname + "/../_temp/", {recursive: true});
    await fs.promises.mkdir(__dirname + "/../_temp/");

    let writer = fs.createWriteStream(__dirname + "/../_temp/update.tar.gz");
    console.log(chalk`   {cyan → Downloading new version}`)
    let response = await axios.get("https://github.com/clinicTools/clt-cli/tarball/main", {
        responseType: 'stream'
    });

    return await new Promise((resolve, reject) => {
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
}
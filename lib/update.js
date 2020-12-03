let fs = require("fs");
let axios =  require("axios");
let chalk = require("chalk");
const { exec } = require("child_process");

module.exports = {
    async default(args) {
        try {
            console.log(chalk` == Updating clinicTools CLI ==`)
            console.log("");
            await downloadUpdate();
            await new Promise((resolve, reject) => {
                exec(`npm install -g ${__dirname}/../_temp/update.tar.gz --force`, (error, stdout, stderr) => {
                    if (error) {
                        console.log(error.message);
                        //reject(error.message);
                        //return;
                    }
                    if(stdout) {
                        console.log(stdout);
                        reject(stdout);
                        return;
                    }
                    resolve(stdout);
                });
            });
            console.log(chalk`{green Update executed successfully!}`)
        } catch {
            console.log(chalk`{red Error in update see above!}`)
        }
        
    },
    async help() {

    }
}

async function downloadUpdate() {
    console.log(chalk`{green - Creating TempPath}`)
    await fs.promises.mkdir(__dirname + "/../_temp/");

    let writer = fs.createWriteStream(__dirname + "/../_temp/update.tar.gz");
    console.log(chalk`{green - Downloading new version}`)
    let response = await axios.get("https://github.com/clinicTools/clt-cli/tarball/main", {
        responseType: 'stream'
    });

    return await new Promise((resolve, reject) => {
        response.data.pipe(writer);
        let error = null;
        writer.on('error', err => {
            console.log(chalk`{red - DownloadError}`)
            error = err;
            writer.close();
            reject(err);
        });
        writer.on('close', () => {
            if (!error) {
                console.log(chalk`{green - Downloaded}`)
                resolve(true);
            }
        });
    });
}
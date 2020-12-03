//npm install -g https://github.com/clinicTools/clt-cli/tarball/master

let fs = require("fs");
let progress = require("cli-progress");
let axios =  require("axios");
const { exec } = require("child_process");




module.exports = {
    async default(args) {
        await downloadUpdate();
        await new Promise((resolve, reject) => {
            exec(`npm install -g ${__dirname}/../_temp/update.tar.gz`, (error, stdout, stderr) => {
                if (error) {
                    reject(error.message);
                    return;
                }
                if (stderr) {
                    reject(stderr);
                    return;
                }
                resolve(stdout);
            });
        });
    }
}

async function downloadUpdate() {
    
    await fs.promises.mkdir(__dirname + "/../_temp/");
    let writer = fs.createWriteStream(__dirname + "/../_temp/update.tar.gz");
    let response = await axios.get("https://github.com/clinicTools/clt-cli/tarball/main", {
        responseType: 'stream'
    });

    return await new Promise((resolve, reject) => {
        response.data.pipe(writer);
        let error = null;
        writer.on('error', err => {
            error = err;
            writer.close();
            reject(err);
        });
        writer.on('close', () => {
            if (!error) {
                resolve(true);
            }
        });
    });
}
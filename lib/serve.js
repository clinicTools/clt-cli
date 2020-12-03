let fs = require('fs-extra'); 
let chalk = require("chalk");

module.exports = {
    async default(args) {
        if(!await fileExists("./package.json")) {
            console.log(chalk`\n{bold.red This seems not to be a project directory, we can't find the package.json!}\n`)
            return;
        }
        let package;
        try {
            package = await fs.readJSON("./package.json");
        } catch {
            console.log(chalk`\n{bold.red Houston, we can't read the package.json. Is there a JSON format problem?}\n`);
            return;
        }
        if(package.base !== "PatientView") {
            console.log(chalk`\n{bold.red Sorry, unkown <<base>> in package.json}\n`);
            //return;
        }
        
        await fs.promises.rmdir(__dirname + "/../build/app/src", {recursive: true});
        await fs.promises.mkdir(__dirname + "/../build/app/src");

        await fs.copy("./", __dirname + "/../build/app/src");

    },
    async help() {

    }
}

async function fileExists(file) {
    return await fs.promises.access(file, fs.constants.F_OK).then(() => true).catch(() => false)
}
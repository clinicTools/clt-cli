let os = require("os");
let fs = require("fs");
let path = require("path");
let chalk = require("chalk");
let configFile = path.join(os.homedir(), ".clt.json")
let settings = {}

module.exports = {
    async default(args) {
        
        if(!fileExists(configFile)) {
            await saveSettings();
        }
        settings = JSON.parse(await fs.promises.readFile(configFile))

        if(args._.includes("show")) {
            console.log(chalk`{bold dataServers}:  ${settings.servers.join(",")}`);
            console.log(chalk`{bold user}:         ${settings.user}`);
            console.log(chalk``);
            
            return;
        }

        if(args.user) {
            settings.user = args.user
            await saveSettings();
        }
        if(args.servers) {
            settings.servers = args.servers.split(",")
            await saveSettings();
        }
    },
    async help() {

    },
    async description() {
        return "        change/list clt-cli configuration"
    }
}

async function fileExists(file) {
    return await fs.promises.access(file, fs.constants.F_OK).then(() => true).catch(() => false)
}
async function saveSettings() {
    await fs.promises.writeFile(configFile, JSON.stringify(settings));
}
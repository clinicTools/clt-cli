let os = require("os");
let fs = require("fs");
let path = require("path");
let configFile = path.join(os.homedir(), ".clt.json")
let settings = {}

module.exports = {
    async default(args) {
        if(!fileExists(configFile)) {
            await saveSettings();
        }
        if(args.buildserver) {
            settings.buildserver = args.buildserver
            await saveSettings();
        }
        if(args.user) {
            settings.user = args.user
            await saveSettings();
        }
    },
    async help() {

    }
}

async function fileExists(file) {
    return await fs.promises.access(file, fs.constants.F_OK).then(() => true).catch(() => false)
}
async function saveSettings() {
    await fs.promises.writeFile(configFile, JSON.stringify(settings));
}
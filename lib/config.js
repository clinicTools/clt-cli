let os = require("os");
let fs = require("fs");
let path = require("path");
let configFile = path.join(os.homedir(), ".clt.json")

module.exports = {
    async default(args) {
        if(!fileExists(configFile)) {
            fs.promises.writeFile(configFile, JSON.stringify({}));
        }
        if(args.buildserver) {
            fs.promises.writeFile(configFile, JSON.stringify({buildserver: args.buildserver}));
        }
    },
    async help() {

    }
}

async function fileExists(file) {
    return await fs.promises.access(file, fs.constants.F_OK).then(() => true).catch(() => false)
}
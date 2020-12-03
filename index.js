#! /usr/bin/env node
let args = require("minimist")(process.argv.slice(2));
let axios = require("axios").default
let version = require(__dirname + "/version.json").version;

(async () => {
    console.log(version)

    if (args._[0] == "config") {
        await require(__dirname + "/lib/config.js")(args);
    } else if (args._[0] == "serve") {
        await require(__dirname + "/lib/serve.js")(args);
    } else if (args._[0] == "publish") {
        await require(__dirname + "/lib/publish.js")(args);
    } else if (args._[0] == "build") {
        await require(__dirname + "/lib/build.js")(args);
    } else if (args._[0] == "update") {
        await require(__dirname + "/lib/update.js")(args);
    }
    
})();

/*
https://raw.githubusercontent.com/clinicTools/clt-cli/main/index.js
*/
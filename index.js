#! /usr/bin/env node
let args = require("minimist")(process.argv.slice(2));

(async () => {
    if (args._[0] == "config") {
        await require(__dirname + "/lib/config.js")(args);
    } else if (args._[0] == "serve") {
        await require(__dirname + "/lib/serve.js")(args);
    } else if (args._[0] == "publish") {
        await require(__dirname + "/lib/publish.js")(args);
    } else if (args._[0] == "build") {
        await require(__dirname + "/lib/build.js")(args);
    }
    process.exit();
})();

#! /usr/bin/env node
let args = require("minimist")(process.argv.slice(2));
let axios = require("axios").default
let chalk = require("chalk");
let version = require(__dirname + "/version.json").version;

(async () => {
    await updateCheck()

    if (["config", "serve", "publish", "build", "update"].includes(args._[0])) {
        await require(`${__dirname}/lib/${args._[0]}.js`).default(args);
    } else {
        console.error(chalk`{red Command unknown:} command`);
    }
})();

async function updateCheck() {
    try {
        let res = await axios.get("https://raw.githubusercontent.com/clinicTools/clt-cli/main/version.json");
        
        let onlineVersion = res.data.version;
        if (version !== onlineVersion) {
            console.log(require("boxen")(
                chalk`Update available {dim ${version}} → {green ${onlineVersion}}` + "\n" +
                chalk`Run {cyan clt update} to update`
                , 
                {
                    padding: 1,
                    margin: 1,
                    align: 'center',
                    borderColor: 'yellow',
                    borderStyle: 'round'
                }
            ));
        }
    } catch {}
}
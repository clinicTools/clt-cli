#! /usr/bin/env node
let args = require("minimist")(process.argv.slice(2));
let axios = require("axios").default
let chalk = require("chalk");
let version = require(__dirname + "/package.json").version;
let commands = ["build", "config", "publish", "serve", "update", "install"];

(async () => {
    if(args.v || args._.length == 0) {
        console.log(require("boxen")(
            chalk`clinicTools CLI` + "\n" +
            chalk`v{bold ${version}}` + "\n" +
            chalk`© ${new Date().getFullYear()} clinicTools GmbH`
            , {
                padding: 1,
                margin: 1,
                align: 'left',
                borderColor: 'yellow',
                borderStyle: 'round'
            }
        ));
        return;
    }
    if(args._[0] !== "update") {
        await updateCheck();
    }
    if (commands.includes(args._[0])) {
        await require(`${__dirname}/lib/${args._[0]}.js`).default(args);
    } else {
        console.error(chalk`{red Command unknown:} ${process.argv.slice(2).join(" ")}`);
    }
})();

async function updateCheck() {
    try {
        let res = await axios.get("https://raw.githubusercontent.com/clinicTools/clt-cli/main/package.json", {
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
            }
        });
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
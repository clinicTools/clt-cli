let chalk = require("chalk");
let path = require("path");
let cltDir = path.join(require("os").homedir(), ".clt");
let fs = require("fs");
let axios = require("axios");
let extract = require("extract-zip");
let ora = require("ora");
let clear = require("clear");
let { exec } = require("child_process");
let inquirer = require("inquirer");

module.exports = {
  async default(args) {
    let module = "cli";
    let version = "latest";

    if (args._.length > 1) {
      let mv = args._[1].split("@");
      module = mv[0];
      if (mv.length > 1) {
        version = mv[1];
      }
    } else {
      console.log(chalk`\n{red There's no module in the args}\n`);
      return;
    }

    let avaiableVersions = await axios.get(
      `https://dev.clinic.tools/${module}/versions.json`
    );

    if (version === "latest") {
      version = avaiableVersions.data.latest;
    }

    if (!avaiableVersions.data.other.includes(version)) {
      console.log(chalk`\n{red Version {bold v${version}} not avaiable}`);
      return;
    }

    clear();
    console.log(
      chalk`\n== {bold Installing ${module}@{green v${version}}} ==\n`
    );
    await downloadUpdate(module, version);
    console.log(
      chalk`\n{green.bold Installed successfully, happy coding 🧑🏻‍💻!\n}`
    );
  },
  async help() {},
  async description() {
    return "       downloads and installs the latest Server Version";
  },
};

//

async function downloadUpdate(name, version) {
  let spinner = ora(`Creating ${name} path`).start();
  try {
    await fs.promises.rm(path.join(cltDir, name + "_temp"), {
      recursive: true,
    });
  } catch {}

  await fs.promises.mkdir(path.join(cltDir, name + "_temp"), {
    recursive: true,
  });
  await fs.promises.mkdir(path.join(cltDir, name), { recursive: true });
  spinner.succeed();

  let writer = fs.createWriteStream(path.join(cltDir, name, "install.zip"));
  spinner = ora(`Downloading ${name}`).start();
  let response = await axios.get(
    `https://dev.clinic.tools/${name}/v${version}.zip`,
    {
      responseType: "stream",
    }
  );

  await new Promise((resolve, reject) => {
    response.data.pipe(writer);
    let error = null;
    writer.on("error", (err) => {
      spinner.fail();
      error = err;
      writer.close();
      reject(err);
    });
    writer.on("close", () => {
      if (!error) {
        spinner.succeed();
        resolve(true);
      }
    });
  });

  spinner = ora(`Installing ${name}`).start();
  await extract(path.join(cltDir, name, "install.zip"), {
    dir: path.join(cltDir, name + "_temp"),
  });
  spinner.succeed();
}

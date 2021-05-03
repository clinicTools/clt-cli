let fs = require("fs-extra");
let chalk = require("chalk");
let path = require("path");
let cltDir = path.join(require("os").homedir(), ".clt");
let { spawn } = require("child_process");

module.exports = {
  async default(args) {
    if (!(await fileExists("./package.json"))) {
      console.log(
        chalk`\n{bold.red This seems not to be a project directory, we can't find the package.json!}\n`
      );
      return;
    }
    let package;
    try {
      package = await fs.readJSON("./package.json");
    } catch {
      console.log(
        chalk`\n{bold.red Houston, we can't read the package.json. Is there a JSON format problem?}\n`
      );
      return;
    }
    if (package.base === undefined) {
      console.log(
        chalk`\n{bold.red Sorry, <<base>> is not set in package.json. Is this a clt project?}\n`
      );
      return;
    }
    if (!["patientView", "documentGenerator"].includes(package.base)) {
      console.log(chalk`\n{bold.red Sorry, unkown <<base>> in package.json}\n`);
      return;
    }

    let commandPath = path.join(cltDir, package.base, "dev.bat");
    if (await fileExists(commandPath)) {
      spawn(commandPath, {
        cwd: process.cwd(),
        stdio: [process.stdin, process.stdout, process.stderr],
        shell: true,
        windowsHide: true,
      });
    } else {
      console.log(
        chalk`\n{bold.red Sorry, dev command not possible in this project!}\n`
      );
      return;
    }
  },
  async help() {},
  async description() {
    return "         starts a debug server";
  },
};

async function fileExists(file) {
  return await fs.promises
    .access(file, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
}

let repo = require(__dirname + "/_repo.js");

module.exports = async (args) => {
    await repo.checkDir();
    await repo.downloadFromServer();
    await repo.extractFile();
    await repo.extractCheckFiles();
    await repo.removeArchive();
}
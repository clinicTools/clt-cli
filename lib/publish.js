let repo = require("_repo.js");

module.exports = async (args) => { 
    await repo.downloadFromServer();   
}
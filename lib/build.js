let q = require('inquirer');
let repo = require(__dirname + "/_repo.js");
let path = require("path")

module.exports = async (args) => {
    let result = await dircompare.compare("./.clt", ".", {compareSize: true, compareContent: true});
    
    result = result.diffSet.filter((entry) => { return entry.state != "equal" && !entry.relativePath.startsWith("/.clt") && !(entry.relativePath == "/" && entry.name2 == ".clt") });

    let files = [];
    files.push(new q.Separator(" == Files added   =="));
    result.forEach((e) => {
        if(e.state == "right" && e.type1 == "missing") {
            e.type = "added";
            files.push({"name": "+ ." + path.join(e.relativePath, e.name2), "value": e})
        }
    });

    files.push(new q.Separator(" == Files deleted =="));
    result.forEach((e) => {
        if(e.state == "left" && e.type2 == "missing") {
            e.type = "deleted";
            files.push({"name": "- ." + path.join(e.relativePath, e.name1), "value": e})
        }
    });
    
    files.push(new q.Separator(" == Files changed =="));
    result.forEach((e) => {
        if(e.state == "distinct") {
            e.type = "changed";
            files.push({"name": "! ." + path.join(e.relativePath, e.name1), "value": e})
        }
    });

    

    result = await q.prompt({
        "type": "checkbox"
        ,"name": "files"
        ,"message": "Files to commit"
        ,choices: files
    });
    
    if(result.files.length == 0) {
        console.log("No files selected");
        return;
    }

    let deletedFiles = [];
    let allFiles = [];
    let dependingFiles = [];

    result.files.forEach((e) => {
        if(e.type == "deleted") {
            deletedFiles.push(path.join(e.relativePath, e.name1))
            allFiles.push(path.join(e.relativePath, e.name1))
        } else if(e.type == "added") {
            allFiles.push(path.join(e.relativePath, e.name2))
        } else {
            allFiles.push(path.join(e.relativePath, e.name1))
        }
    });

    let commitMessage = await q.prompt({
        "type": "input"
        ,"name": "commitMessage"
        ,"message": "Enter commit message:"
    });

    await repo.uploadNewConfig({
         message: commitMessage.commitMessage
        ,files: allFiles
        ,deleted: deletedFiles
        ,depending: dependingFiles
    });
    
}

const fs = require('fs');
var sleep = require('system-sleep');
var shell = require('shelljs');

let arquivoResetado = false;
let jafoi = false;

var utilWriteScriptPro = {

    resetarArquivo: function(){
        arquivoResetado = false;
    }, 

    escreverArquivo: function(txtArquivo){
        //sleep(15);
        createFolderIfDoesntExist(basePath + "scriptprotest/" + escolherPasta() + pathPastaPai);

        addFileAndFullPathToGlobal(escolherPasta() + pathPastaPai + filename + escolherNome());

        if(!arquivoResetado){
            fs.open(basePath + "scriptprotest/" + escolherPasta() + pathPastaPai + filename + escolherNome(), "w", function(err) {
                if(err) {
                    return console.log(err);
                }
            }); 
            arquivoResetado = true;
        }
        //console.log(txtArquivo);
        fs.appendFile(basePath + "scriptprotest/" + escolherPasta() + pathPastaPai + filename + escolherNome(), txtArquivo, function(err) {
            if(err) {
                return console.log(err);
            }
            arquivoResetado = false;
        }); 
    }

}

function escolherNome(){
    let finalFileName = ".js";
    switch(finalNameAtual){
        case "MODEL":
            return finalModelName + finalFileName;
        case "FILTER":
            return finalFilterName + finalFileName;
        case "CONTROLLER":
            return finalControllerName + finalFileName;
        case "SERVICE":
            return finalServiceName + finalFileName;
        case "SQLREP":
            return finalSqlRepName + finalFileName;
        case "SQLSELECT":
            return finalSqlSelectName + finalFileName;
        case "SQLINSERT":
            return finalSqlInsertName + finalFileName;
        case "SQLUPDATE":
            return finalSqlUpdateName + finalFileName;
        case "SQLDELET":
            return finalSqlDeletName + finalFileName;
        default:
            return;
    }
}

function escolherPasta(){
    switch(finalNameAtual){
        case "MODEL":
            return pathFileModel;
        case "FILTER":
            return pathFileFilter;
        case "CONTROLLER":
            return pathFileController;
        case "SERVICE":
            return pathFileService;
        case "SQLREP":
            return pathFileSqlRep;
        case "SQLSELECT":
            return pathFileSelect;
        case "SQLINSERT":
            return pathFileInsert;
        case "SQLUPDATE":
            return pathFileUpdate;
        case "SQLDELET":
            return pathFileDelet;
        default:
            return;
    }
}

function createFolderIfDoesntExist(fullPath){
    console.log("teste -> " + fullPath);
    shell.mkdir('-p', fullPath);
}

function addFileAndFullPathToGlobal(fullpath){
    //fullpath = fullpath.substr(1, fullpath.length);

    //regra pessoal para não ficar arvore grande
    //fullpath = fullpath.substr(fullpath.indexOf("scriptprotest"), fullpath.length);
    //regra pessoal para não ficar arvore grande

    newFilesFolders.push(fullpath);
}

module.exports = utilWriteScriptPro;

const fs = require('fs');
var sleep = require('system-sleep');

let arquivoResetado = false;


var utilWriteScriptPro = {

    resetarArquivo: function(){
        arquivoResetado = false;
    }, 

    escreverArquivo: function(txtArquivo){
        //sleep(15);
        if(!arquivoResetado){
            fs.open(basePath + folder + filename + escolherNome(), "w", function(err) {
                if(err) {
                    return console.log(err);
                }
            }); 
            arquivoResetado = true;
        }
        //console.log(txtArquivo);
        fs.appendFile(basePath + folder + filename + escolherNome(), txtArquivo, function(err) {
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

module.exports = utilWriteScriptPro;
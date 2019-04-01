
const fs = require('fs');
var sleep = require('system-sleep');

let arquivoResetado = false;


var utilWriteScriptPro = {

    resetarArquivo: function(){
        arquivoResetado = false;
    }, 

    escreverArquivo: function(str = ""){
        sleep(15);
        if(!arquivoResetado){
            fs.open(basePath + folder + filename + escolherNome(), "w", function(err) {
                if(err) {
                    return console.log(err);
                }
            }); 
            arquivoResetado = true;
        }
        
        fs.appendFile(basePath + folder + filename + escolherNome(), "\n" + str , function(err) {
            if(err) {
                return console.log(err);
            }
        }); 
    }

}

function escolherNome(){
    let finalFileName = ".js";
    if(finalNameAtual == "MODEL"){
        return finalModelName + finalFileName;
    }else if(finalNameAtual == "FILTER"){
        return finalFilterName + finalFileName;
    }else if(finalNameAtual == "CONTROLLER"){
        return finalControllerName + finalFileName;
    }else if(finalNameAtual == "SERVICE"){
        return finalServiceName + finalFileName;
    }else if(finalNameAtual == "SQLREP"){
        return finalSqlRepName + finalFileName;
    }else if(finalNameAtual == "SQLSELECT"){
        return finalSqlSelectName + finalFileName;
    }else if(finalNameAtual == "SQLINSERT"){
        return finalSqlInsertName + finalFileName;
    }else if(finalNameAtual == "SQLUPDATE"){
        return finalSqlUpdateName + finalFileName;
    }else if(finalNameAtual == "SQLDELET"){
        return finalSqlDeletName + finalFileName;
    }
}

module.exports = utilWriteScriptPro;
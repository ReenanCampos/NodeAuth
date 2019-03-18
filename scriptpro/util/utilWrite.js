
const fs = require('fs');
var sleep = require('system-sleep');

let arquivoResetado = false;
const finalFileName = "";

var utilWriteScriptPro = {

    escreverArquivo: function(str = ""){
        sleep(15);
        if(!arquivoResetado){
            fs.open(basePath + folder + filename, "w", function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file has been cleaned");
            }); 
            arquivoResetado = true;
        }

        if(finalNameAtual == "MODEL"){
            finalFileName = finalModelName;
        }else if(finalNameAtual == "FILTER"){
            finalFileName = finalFilterName;
        }else if(finalNameAtual == "CONTROLLER"){
            finalFileName = finalControllerName;
        }else if(finalNameAtual == "SERVICE"){
            finalFileName = finalServiceName;
        }

        fs.appendFile(basePath + folder + filename + finalFileName, "\n" + str , function(err) {
            if(err) {
                return console.log(err);
            }
        }); 
    }

}

module.exports = utilWriteScriptPro;

const utilWrite = require("./utilWrite");
const tab = "    ";

var utilScriptPro = {

    print: function print(tabs=0, str = ""){
        let strFinal = "";
        for(let i=0; i<tabs; i++) strFinal += tab;
        strFinal += str
    
        // Escreve no arquivo
        if(arquivoOuTerminal === "ARQ"){
            utilWrite.escreverArquivo(strFinal);
            return;
        }
    
        // Escreve no terminal
        if(arquivoOuTerminal === "TER"){
            console.log(strFinal);
        }
        
    },

    verifyType: function verifyType(tipoColuna){
        if(tipoColuna == "char" || tipoColuna == "varchar"
        || tipoColuna == "blob" || tipoColuna == "text"
        || tipoColuna == "tinyblob" || tipoColuna == "tinytext"
        || tipoColuna == "mediumblob" || tipoColuna == "mediumtext"
        || tipoColuna == "longblob" || tipoColuna == "longtext"
        || tipoColuna == "enum"){
            return "''";
        }
        if(tipoColuna == "int" || tipoColuna == "tinyint"
        || tipoColuna == "smallint" || tipoColuna == "mediumint"
        || tipoColuna == "bigint"){
            return "0";
        }
        if(tipoColuna == "float" || tipoColuna == "double"
        || tipoColuna == "decimal"){
            return "0.0";
        }

        if(tipoColuna == "datetime"){
            return "moment('1970-01-01 00:00:01')";
        }

        if(tipoColuna == "date"){
            return "moment('1970-01-01')";
        }

        if(tipoColuna == "timestamp"){
            return "moment('1970-01-01 00:00:01')";
        }

        if(tipoColuna == "time"){
            return "moment('00:00:01')";
        }

    },

    capitalize: function capitalize (str) {
        if (typeof str !== 'string') return ''
        return str.charAt(0).toUpperCase() + str.slice(1)
    },

}

module.exports = utilScriptPro;
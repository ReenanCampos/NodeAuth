
const utilWrite = require("./utilWrite");
const tab = "    ";

var utilScriptPro = {

    print: function print(tabs=0, str = ""){
        let strFinal = "";
        for(let i=0; i<tabs; i++) strFinal += tab;
        strFinal += str
    
        // Escreve no terminal
        if(arquivoOuTerminal === "TER"){
            console.log(strFinal);
        }
        
        // Escreve no arquivo
        if(arquivoOuTerminal === "ARQ"){
            switch(finalNameAtual){
                case "MODEL":
                    txtFileModel += "\n" + strFinal;
                    break;
                case "FILTER":
                    txtFileFilter += "\n" + strFinal;
                    break;
                case "CONTROLLER":
                    txtFileController += "\n" + strFinal;
                    break;
                case "SERVICE":
                    txtFileService += "\n" + strFinal;
                    break;
                case "SQLREP":
                    txtFileSqlRep += "\n" + strFinal;
                    break;
                case "SQLSELECT":
                    txtFileSelect += "\n" + strFinal;
                    break;
                case "SQLINSERT":
                    txtFileInsert += "\n" + strFinal;
                    break;
                case "SQLUPDATE":
                    txtFileUpdate += "\n" + strFinal;
                    break;
                case "SQLDELET":
                    txtFileDelet += "\n" + strFinal;
                    break;
                default:
                    break;
            }
            return;
        }

    },

    escreverArquivo: function escreverArquivo(){
        switch(finalNameAtual){
            case "MODEL":
            utilWrite.escreverArquivo(txtFileModel);
                break;
            case "FILTER":
            utilWrite.escreverArquivo(txtFileFilter);
                break;
            case "CONTROLLER":
            utilWrite.escreverArquivo(txtFileController);
                break;
            case "SERVICE":
            utilWrite.escreverArquivo(txtFileService);
                break;
            case "SQLREP":
            utilWrite.escreverArquivo(txtFileSqlRep);
                break;
            case "SQLSELECT":
            utilWrite.escreverArquivo(txtFileSelect);
                break;
            case "SQLINSERT":
            utilWrite.escreverArquivo(txtFileInsert);
                break;
            case "SQLUPDATE":
            utilWrite.escreverArquivo(txtFileUpdate);
                break;
            case "SQLDELET":
            utilWrite.escreverArquivo(txtFileDelet);
                break;
            default:
                break;
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
            return "''";
            //! Cancelado por enquanto 01/04/2019
            return "moment('1970-01-01 00:00:01')";
        }

        if(tipoColuna == "date"){
            return "''";
            //! Cancelado por enquanto 01/04/2019
            return "moment('1970-01-01')";
        }

        if(tipoColuna == "timestamp"){
            return "''";
            //! Cancelado por enquanto 01/04/2019
            return "moment('1970-01-01 00:00:01')";
        }

        if(tipoColuna == "time"){
            return "''";
            //! Cancelado por enquanto 01/04/2019
            return "moment('00:00:01')";
        }

    },

    capitalize: function capitalize (str) {
        if (typeof str !== 'string') return ''
        return str.charAt(0).toUpperCase() + str.slice(1)
    },

    resetarArquivo: function(){
        utilWrite.resetarArquivo();
    }
}

module.exports = utilScriptPro;
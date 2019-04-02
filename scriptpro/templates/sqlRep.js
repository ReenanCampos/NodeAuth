
const util = require("../util/util");

var sqlRepScriptPro = {

    useTemplate: function (tableName, results, queries) {

        finalNameAtual = "SQLREP";
        util.resetarArquivo();
        if (queries.default) {

            usarDefault(tableName, results);

        } else {

            //TODO Loop com as queries
                    
            util.print(0, "");
            util.print(0, "//! Consultas");
            util.print(0, "");
            util.print(0, "");
            util.print(0, "//! Operações");
            util.print(0, "");
            util.print(0, "");
            util.print(0, "//* Exports");
            util.print(0, "module.exports = {");
            util.print(0, ",}");
            util.print(0, "");
        }
        
        util.escreverArquivo();
        finalNameAtual = "";
    }

}

// gera os metodos: SelectByFilter, SelectAll, Insert, Update, Delet
function usarDefault(tableName, results) {
    util.print(0, "");
    util.print(0, "");
    util.print(0, "");
    util.print(0, "//! Consultas");
    util.print(0, "var SelectByFilter = require('./selectByFilter')");
    util.print(0, "");
    util.print(0, "");
    util.print(0, "//! Operações");
    util.print(0, "var Insert = require('./Insert')");
    util.print(0, "var Update = require('./Update')");
    util.print(0, "var Delet = require('./Delet')");
    util.print(0, "");
    util.print(0, "");
    util.print(0, "//* Exports");
    util.print(0, "module.exports = {");
    util.print(1, " SelectByFIlter");
    util.print(1, ",Insert");
    util.print(1, ",Update");
    util.print(1, ",Delet");
    util.print(0, ",}");
    util.print(0, "");
}

module.exports = sqlRepScriptPro;

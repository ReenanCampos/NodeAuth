
const util = require("../util/util");

var serviceScriptPro = {

    useTemplate: function (tableName, results, queries) {

        finalNameAtual = "SERVICE";
        util.resetarArquivo();


        util.print(0, "const moment = require('moment');");
        util.print(0, "moment.locale('pt-BR');");
        util.print(0, "let db = require('../dbConnection');");
        util.print(0, "const util = require('../util/util');");
        util.print(0, "const " + tableName + " = require('../models/" + tableName + finalModelName + "');");
        util.print(0, "const " + tableName + finalSqlRepName + " = require('../sqlrep/" + util.capitalize(tableName) + "/" + tableName + finalServiceName + "');");
        util.print(0, "");

        util.print(0, "var " + tableName + finalServiceName + " = {");
        util.print(0, "");

        if (queries.default) {

            usarDefault(tableName, results);

        }
        
        /* for (metodo in queries.apis) {

            util.print(1, "," + metodo.nome + " function(req, res, next){");
            if (metodo.tipoMetodo == "consulta") {

                util.print(2, tableName + finalServiceName + "." + metodo.nome + "(req, res);");

            } else if (metodo.tipoMetodo == "operacao") {

                util.print(2, "var entity = new " + tableName + "(req.body, true)");
                util.print(2, "//entity.validarEntidade();");
                util.print(2, "if(filter.validacao.valido){");
                util.print(3, tableName + finalServiceName + "." + metodo.nome + "req, res, entity);");
                util.print(2, "}else{");
                util.print(3, "newError(res, entity.validacao.msgErro, 400);");
                util.print(2, "}");

            } else if (metodo.tipoMetodo == "filtro") {

                util.print(2, "var filter = new " + tableName + finalFilterName + "(req.body)");
                util.print(2, "if(filter.validacao.existe){");
                util.print(3, tableName + finalServiceName + "." + metodo.nome + "(req, res, filter);");
                util.print(2, "}else{");
                util.print(3, "newError(res, entity.validacao.msgErro, 400);");
                util.print(2, "}");

            }
            util.print(1, "}");
            util.print(0, "");
        } */
       

        util.print(0, "}");
        util.print(0, "");
        util.print(0, "module.exports = " + tableName + finalServiceName + ";");
        util.print(0, "");

        finalNameAtual = "";

    }

}

// gera os metodos: SelectByFilter, SelectAll, Insert, Update, Delet
function usarDefault(tableName, results) {

    util.print(1, "selectByFilter: function(req, res){");
    util.print(2, "var results = db.query( " + tableName + finalSqlRepName + ".SelectByFilter.SelectByFilter,");
    util.print(3, "function (error, results, fields) {");
    util.print(3, "");
    util.print(4, "if (error) { util.newError(res, error.message, 400); return; }");
    util.print(4, "");
    util.print(4, "var resultJson = util.convertJson(results);");
    util.print(4, "");
    util.print(4, "util.newResposta(res, resultJson);");
    util.print(3, "});");
    util.print(1, "},");


    util.print(1, "insert: function(req, res, entity){");
    util.print(2, "var results = db.query( " + tableName + finalSqlRepName + ".Insert.Insert,");
    let columnsStrInsert = "";
    for (let i = 0; i < results.length; i++) {
        if (i != 0) {
            columnsStrInsert += "entity." + results[i].COLUMN_NAME;
            if (i + 1 != results.length) {
                columnsStrInsert += ", ";
            } else {
                columnsStrInsert += "]";
            }
        } else {
            columnsStrInsert += "[entity.id, ";
        }
    }
    util.print(3, columnsStrInsert + ",");
    util.print(3, "function (error, results, fields) {");
    util.print(3, "");
    util.print(4, "if (error) {util.newError(res, error.message, 400); return; }");
    util.print(3, "");
    util.print(4, "var resultJson = util.convertJson(results);");
    util.print(4, "util.newResposta(res, entity.id);");
    util.print(3, "});");
    util.print(2, "},");


    util.print(1, "update: function(req, res, entity){");
    util.print(2, "var results = db.query( " + tableName + finalSqlRepName + ".Update.Update,");
    let columnsStrUpdate = "";
    for (let i = 0; i < results.length; i++) {
        if (i != 0) {
            if (i == 1) columnsStrUpdate += "[";
            columnsStrUpdate += "entity." + results[i].COLUMN_NAME;
            if (i + 1 != results.length) {
                columnsStrUpdate += ", ";
            } else {
                columnsStrUpdate += ", entity.id]"
            }
        }
    }
    util.print(3, columnsStrUpdate + ",");
    util.print(3, "function (error, results, fields) {");
    util.print(3, "");
    util.print(4, "if (error) {util.newError(res, error.message, 400); return; }");
    util.print(3, "");
    util.print(3, "if (!results.affectedRows) { util.newError(res, 'Nenhuma linha afetada', 400); return; }");
    util.print(3, "");
    util.print(4, "var resultJson = util.convertJson(results);");
    util.print(4, "util.newResposta(res, entity.id);");
    util.print(3, "});");
    util.print(2, "},");


    util.print(1, "delet: function(req, res, entity){");
    util.print(2, "var results = db.query( " + tableName + finalSqlRepName + ".Delet.Delet,");
    util.print(3, "[entity.id],");
    util.print(3, "function (error, results, fields) {");
    util.print(3, "");
    util.print(4, "if (error) {util.newError(res, error.message, 400); return; }");
    util.print(3, "");
    util.print(3, "if (!results.affectedRows) { util.newError(res, 'Nenhuma linha afetada', 400); return; }");
    util.print(3, "");
    util.print(4, "var resultJson = util.convertJson(results);");
    util.print(4, "util.newResposta(res, entity.id);");
    util.print(3, "});");
    util.print(2, "},");

}

module.exports = serviceScriptPro;


const util = require("../util/util");

var sqlRepScriptPro = {

    useTemplate: function (tableName, results, queries) {
        filename = "";
        if (queries.default) {

            usarDefault(tableName, results);

        } else {
        
        
        }
        
        filename = tableName;
        finalNameAtual = "";
    }

}

// gera os metodos: SelectByFilter, SelectAll, Insert, Update, Delet
function usarDefault(tableName, results) {

    sqlSelectFilter(tableName, results);
    util.escreverArquivo();

    sqlInsert(tableName, results);
    util.escreverArquivo();

    sqlUpdate(tableName, results);
    util.escreverArquivo();

    sqlDelet(tableName, results);
    util.escreverArquivo();
    
}

//TODO Tem que adicionar o esquema de filtro
//? Precisa saber como funciona passar parametros para o SqlRep e gerar o filtro !
function sqlSelectFilter(tableName, results, filter){
    finalNameAtual = "SQLSELECT";
    util.resetarArquivo();

    util.print(0, "const util = require('../../util/util');");
    util.print(0, "const moment = require('moment');");
    util.print(0, "");
    util.print(0, "module.exports = {");
    util.print(1, "SelectByFilter: function SelectAll(filter){");
    util.print(2, "var statement = '';");
    util.print(2, "statement += 'SELECT';");
    util.print(2, "statement += ' id';");
    for (let i = 1; i < results.length; i++) {
        util.print(2, "statement += ' ," + results[i].COLUMN_NAME + "';");
    }
    util.print(2, "statement += ' FROM Usuario';");
    util.print(2, "");

    util.print(2, "if(filter != undefined){");
    util.print(3, "let whereUsado = false, usarAnd = false;");
    util.print(3, "if(!util.isUndefinedOrEmpty(filter.id)){");
    util.print(4, "if(!whereUsado){ statement += ' WHERE'; whereUsado = true; }");
    util.print(4, "statement += ' Usuario.id = ' + filter.id;");
    util.print(4, "usarAnd = true;");
    util.print(3, "}");
    for (let i = 1; i < results.length; i++) {
        util.print(3, "if(!util.isUndefinedOrEmpty(filter."+results[i].COLUMN_NAME+")){");
        util.print(4, "if(!whereUsado){ statement += ' WHERE'; whereUsado = true; }");
        util.print(4, "if(usarAnd){ statement += ' AND'; }");
        if(results[i].DATA_TYPE == "char" || results[i].DATA_TYPE == "varchar"){
            util.print(4, "statement += \" "+tableName+"."+results[i].COLUMN_NAME+" like '%\" + filter."+results[i].COLUMN_NAME+" + \"%'\";");

        }else if (results[i].DATA_TYPE == "tinyint" || results[i].DATA_TYPE == "int"
            || results[i].DATA_TYPE == "smallint" || results[i].DATA_TYPE == "mediumint"
            || results[i].DATA_TYPE == "bigint"
            || results[i].DATA_TYPE == "float" || results[i].DATA_TYPE == "double"
            || results[i].DATA_TYPE == "decimal"){
            util.print(4, "statement += \" "+tableName+"."+results[i].COLUMN_NAME+" = \" + filter."+results[i].COLUMN_NAME+";");

        }else if(results[i].DATA_TYPE == "datetime" || results[i].DATA_TYPE == "date"
            || results[i].DATA_TYPE == "timestamp" || results[i].DATA_TYPE == "time"){
            util.print(4, "statement += \" "+tableName+"."+results[i].COLUMN_NAME+" = \" + filter."+results[i].COLUMN_NAME+";");
            util.print(4, "statement += \" DATE_FORMAT("+tableName+"."+results[i].COLUMN_NAME+", '%d-%m-%Y') = DATE_FORMAT('\" + moment(filter."+results[i].COLUMN_NAME+").format(\"YYYY/MM/DD\") + \"', '%d-%m-%Y')\";");

        }   
        util.print(4, "usarAnd = true;");
        util.print(3, "}");
        
    }
    util.print(2, "}");
    util.print(2, "return statement;");
    util.print(1, "}");
    util.print(0, "};");

/*
TODO Select comum
    util.print(1, "SELECT");
    for (let i = 0; i < results.length; i++) {
        if(results[i].COLUMN_NAME != "id") util.print(2, "," + results[i].COLUMN_NAME + " = ?");
        else util.print(2, " " + results[i].COLUMN_NAME);
    }
    util.print(1, "FROM");
    util.print(2, tableName + ";");
*/

}

function sqlInsert(tableName, results){
    finalNameAtual = "SQLINSERT";
    util.resetarArquivo();        
    templateInicial("Insert");
    util.print(1, "INSERT INTO "+ tableName +" (");
    for (let i = 0; i < results.length; i++) {
        if(results[i].COLUMN_NAME != "id") util.print(2, "," + results[i].COLUMN_NAME);
    }
    util.print(1, ") VALUES (");
    for (let i = 0; i < results.length; i++) {
        if(results[i].COLUMN_NAME != "id") util.print(2, ",?");
    }
    util.print(1, ");");
    templateFinal();
}

function sqlUpdate(tableName, results){
    finalNameAtual = "SQLUPDATE";
    util.resetarArquivo();        
    templateInicial("Update");
    util.print(1, "UPDATE");
    util.print(2, tableName);
    util.print(1, "SET");
    for (let i = 0; i < results.length; i++) {
        if(results[i].COLUMN_NAME != "id"){
            if(i != 1) util.print(2, "," + results[i].COLUMN_NAME + " = ?");
            else util.print(2, " " + results[i].COLUMN_NAME + " = ?");
        }
    }
    util.print(1, "WHERE");
    util.print(2, "id = ?;");
    templateFinal();
}

function sqlDelet(tableName, results){
    finalNameAtual = "SQLDELET";
    util.resetarArquivo();        
    templateInicial("Delet");
    util.print(1, "DELETE FROM");
    util.print(2, tableName);
    util.print(1, "WHERE");
    util.print(2, "id = ?;");
    templateFinal();
}

function templateInicial(nomeArquivo){
    util.resetarArquivo();
    util.print(0, "module.exports = {");
    util.print(0, nomeArquivo + ": `");
}

function templateFinal(){
    util.print(0, "`}");
    util.print(0, "");
}
module.exports = sqlRepScriptPro;

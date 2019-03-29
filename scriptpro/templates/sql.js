
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
    sqlInsert(tableName, results);
    sqlUpdate(tableName, results);
    sqlDelet(tableName, results);
}

//TODO Tem que adicionar o esquema de filtro
//? Precisa saber como funciona passar parametros para o SqlRep e gerar o filtro !
function sqlSelectFilter(tableName, results, filter){
    finalNameAtual = "SQLSELECT";
    util.resetarArquivo();        
    templateInicial("Select");
    util.print(1, "SELECT")
    for (let i = 0; i < results.length; i++) {
        if(results[i].COLUMN_NAME != "id") util.print(2, "," + results[i].COLUMN_NAME + " = ?");
        else util.print(2, " " + results[i].COLUMN_NAME);
    }
    util.print(1, "FROM");
    util.print(2, tableName + ";");
    templateFinal();
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

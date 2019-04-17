
const util = require("../util/util");

var controllerScriptPro = {

    useTemplate: function(tableName, queries){

        finalNameAtual = "CONTROLLER";
        util.resetarArquivo();
        util.print(0, "const " + tableName + finalFilterName + " = require('../../" + pathFileFilter + pathPastaPai + tableName + finalFilterName + "');");
        util.print(0, "const " + tableName + " = require('../../" + pathFileModel + pathPastaPai + tableName + finalModelName + "');");
        util.print(0, "const " + tableName + finalServiceName + " = require('../../" + pathFileService + pathPastaPai + tableName + finalServiceName + "');");
        util.print(0, "const util = require('../../../util/util');");
        util.print(0, "");
        util.print(0, "var " + tableName + finalControllerName + " = {");
        util.print(0, "");
        
        if(queries.default){

            usarDefault(tableName);

        }

        for(metodo in queries.api){
            
            util.print(1, "," + metodo.nome + " function(req, res, next){");
            if(metodo.tipoMetodo == "consulta"){
                
                util.print(2, tableName + finalServiceName + "." + metodo.nome + "(req, res);");

            }else if(metodo.tipoMetodo == "operacao"){
                
                util.print(2, "var entity = new " + tableName + "(req.body, true)");
                util.print(2, "//entity.validarEntidade();");
                util.print(2, "if(entity.validacao.valido){");
                util.print(3, tableName + finalServiceName + "." + metodo.nome + "req, res, entity);");
                util.print(2, "}else{");
                util.print(3, "newError(res, entity.validacao.msgErro, 400);");
                util.print(2, "}");
                
            }else if(metodo.tipoMetodo == "filtro"){
                
                util.print(2, "var filter = new " + tableName + finalFilterName + "(req.body)");
                util.print(2, "if(filter.validacao.existe){");
                util.print(3, tableName + finalServiceName + "." + metodo.nome + "(req, res, filter);");
                util.print(2, "}else{");
                util.print(3, "newError(res, entity.validacao.msgErro, 400);");
                util.print(2, "}");

            }
            util.print(1, "},");
            util.print(0, "");
        }

        util.print(0, "}");
        util.print(0, "");
        util.print(0, "module.exports = " + tableName + finalControllerName + ";");

        util.escreverArquivo();
        finalNameAtual = "";

    }
    
}

// gera os metodos: SelectByFilter, SelectAll, Insert, Update, Delet
function usarDefault(tableName) {

    util.print(1, "selectByFilter: function(req, res, next){");
    util.print(2, "var filter = new " + tableName + finalFilterName + "(req.body)");
    util.print(2, "if(filter.validacao.existe){");
    util.print(3, tableName + finalServiceName + ".selectByFilter(req, res, filter);");
    util.print(2, "}else{");
    util.print(3, "newError(res, entity.validacao.msgErro, 400);");
    util.print(2, "}");
    util.print(1, "},");
    util.print(0, "");

    util.print(1, "insert: function(req, res, next){");
    util.print(2, "var entity = new " + tableName + "(req.body, true)");
    util.print(2, "entity.validarEntidadeInsert();");
    util.print(2, "if(entity.validacao.valido){");
    util.print(3, tableName + finalServiceName + ".insert(req, res, entity);");
    util.print(2, "}else{");
    util.print(3, "newError(res, entity.validacao.msgErro, 400);");
    util.print(2, "}");
    util.print(1, "},");
    util.print(0, "");

    util.print(1, "update: function(req, res, next){");
    util.print(2, "var entity = new " + tableName + "(req.body, true)");
    util.print(2, "entity.validarEntidadeUpdate();");
    util.print(2, "if(entity.validacao.valido){");
    util.print(3, tableName + finalServiceName + ".update(req, res, entity);");
    util.print(2, "}else{");
    util.print(3, "newError(res, entity.validacao.msgErro, 400);");
    util.print(2, "}");
    util.print(1, "},");
    util.print(0, "");

    util.print(1, "delet: function(req, res, next){");
    util.print(2, "var entity = new " + tableName + "(req.body, true)");
    util.print(2, "entity.validarEntidadeDelet();");
    util.print(2, "if(entity.validacao.valido){");
    util.print(3, tableName + finalServiceName + ".delet(req, res, entity);");
    util.print(2, "}else{");
    util.print(3, "newError(res, entity.validacao.msgErro, 400);");
    util.print(2, "}");
    util.print(1, "},");
    util.print(0, "");

}

module.exports = controllerScriptPro;
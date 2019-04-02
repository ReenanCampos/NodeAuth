
const util = require("../util/util");

var filterScriptPro = {

    useTemplate: function(tableName, results){
        
        finalNameAtual = "FILTER";
        util.resetarArquivo();
        util.print(0, "const moment = require('moment');");
        util.print(0, "moment.locale('pt-BR');");
        util.print(0, "");
        util.print(0, "//! Construtor");
        util.print(0, "function " + tableName + finalFilterName + "(entity, validar=false) {");
        util.print(1, "this.validacao = {valido: false, msgErro: ['Não validado ainda']};");
        util.print(0, "");
        util.print(1, "if(entity != undefined){");

        for(let i=0; i < results.length; i++){
            util.print(2,"this." + results[i].COLUMN_NAME + " = entity." + results[i].COLUMN_NAME + " || " + util.verifyType(results[i].DATA_TYPE) + ";");
        }

        util.print(1, "}");
        util.print(0, "");
        util.print(1, "if(validar) this.validarFiltro(entity);");
        util.print(0, "}");
        util.print(0, "");

        util.print(0, tableName + finalFilterName + ".prototype ={");
        util.print(1, tableName + finalFilterName + ": null");
        util.print(0, "}");
        util.print(0, "");

        let columnsStrID = "";
        let columnsStr = "";
        for(let i=0; i < results.length; i++){

            if(results[i].COLUMN_NAME == "id"){
                columnsStrID += results[i].COLUMN_NAME + "=" + util.verifyType(results[i].DATA_TYPE);
            }else{
                columnsStrID += results[i].COLUMN_NAME;
            }

            if(i+1 != results.length){
                columnsStrID += ", ";
            }
        }

        for(let i=0; i < results.length; i++){
            columnsStr += results[i].COLUMN_NAME;
            if(i+1 != results.length){
                columnsStr += ", ";
            }
        }

        util.print(0, tableName + finalFilterName + ".new = function(" + columnsStrID + "){");
        util.print(1, "return new this(" + columnsStr + ");");
        util.print(0, "}");
        util.print(0, "");

        util.print(0, "//! Getters & Setters");
        for(let i=0; i < results.length; i++){

            util.print(0, tableName + finalFilterName + ".prototype.get" + util.capitalize(results[i].COLUMN_NAME) + " = function(){" + 
                " return this." + results[i].COLUMN_NAME + ";" + 
                " }");
            
            util.print(0, tableName + finalFilterName + ".prototype.set" + util.capitalize(results[i].COLUMN_NAME) + " = function(" + results[i].COLUMN_NAME + "){" + 
                " this." + results[i].COLUMN_NAME + " = " + results[i].COLUMN_NAME + 
                " }");
        }

        util.print(0, "");
        util.print(0, "//! Validadores");
        util.print(0, tableName + finalFilterName + ".prototype.validarFiltro = function(filter) {");
        util.print(1, "var valido = true;");
        util.print(1, "var msgErro = [];");
        util.print(1, "var keyNames = Object.keys(filter);");
        util.print(1, "");
        util.print(1, "for(var i in keyNames){");
        for(let i=0; i < results.length; i++){
            if(i==0){
                util.print(2, "if(keyNames[i] != '" + results[i].COLUMN_NAME + "'");
            }else if(i+1 == results.length){
                util.print(2, "&& keyNames[i] != '" + results[i].COLUMN_NAME + "'){");
            }else {
                util.print(2, "&& keyNames[i] != '" + results[i].COLUMN_NAME + "'");
            }
        }
        util.print(3, "msgErro.push('Campo [' + keyNames[i] + '] inválido para esse filtro');");
        util.print(2, "}");
        util.print(1, "}");
        util.print(2, "if(msgErro.length == 0){");
        util.print(2, "//* Vazio / Undefined");
        util.print(2, "if(this === undefined){");
        util.print(3, "msgErro.push('Entidade inválida');");
        util.print(2, "}");
        util.print(1, "}");
        util.print(1, "");
        util.print(1, "if(msgErro.length > 0) valido = false;");
        util.print(1, "this.validacao = {valido: valido, msgErro: msgErro};");
        util.print(0, "};");
        util.print(0, "");
        util.print(0, "//! Export");
        util.print(0, "module.exports = " + tableName + finalFilterName + ";");

        util.escreverArquivo();
        finalNameAtual = "";

    }
    
}


module.exports = filterScriptPro;
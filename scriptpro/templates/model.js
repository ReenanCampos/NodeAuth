
const util = require("../util/util");

var modelScriptPro = {

    useTemplate: function(tableName, results){

        finalNameAtual = "MODEL";

        util.print(0, "const moment = require('moment');");
        util.print(0, "moment.locale('pt-BR');");
        util.print(0, "");
        util.print(0, "//! Construtor");
        util.print(0, "function " + tableName + "(entity, validar=false) {");
        util.print(1, "this.validacao = {valido: false, msgErro: ['Não validado ainda']};");
        
        for(let i=0; i < results.length; i++){
            util.print(1,"this." + results[i].COLUMN_NAME + " = " + util.verifyType(results[i].DATA_TYPE) + ";");
        }

        util.print(1, "this.roles = [];");
        util.print(0, "");
        util.print(1, "if(entity != undefined){");

        for(let i=0; i < results.length; i++){
            util.print(2,"this." + results[i].COLUMN_NAME + " = entity." + results[i].COLUMN_NAME + " || " + util.verifyType(results[i].DATA_TYPE) + ";");
        }

        util.print(1, "}");
        util.print(0, "");
        util.print(1, "if(validar) this.validarEntidade();");
        util.print(0, "}");
        util.print(0, "");

        util.print(0, tableName + ".prototype ={");
        util.print(1, tableName + ": null");
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

        util.print(0, tableName + ".new = function(" + columnsStrID + "){");
        util.print(1, "return new this(" + columnsStr + ");");
        util.print(0, "}");
        util.print(0, "");

        util.print(0, "//! Getters & Setters");
        for(let i=0; i < results.length; i++){

            util.print(0, tableName + ".protoype.get" + util.capitalize(results[i].COLUMN_NAME) + " = function(){" + 
                " return this." + results[i].COLUMN_NAME + ";" + 
                " }");
            
            util.print(0, tableName + ".protoype.set" + util.capitalize(results[i].COLUMN_NAME) + " = function(" + results[i].COLUMN_NAME + "){" + 
                " this." + results[i].COLUMN_NAME + " = " + results[i].COLUMN_NAME + 
                " }");
        }

        util.print(0, tableName + ".protoype.get" + "Valido" + " = function(){" + 
            " return this." + "valido" + ";" + 
            " }");

        util.print(0, tableName + ".protoype.set" + "Valido" + " = function(" + "valido"+ "){" + 
            " this." + "valido" + " = " + "valido" + 
            " }");
        util.print(0, "");

        util.print(0, "//! Úteis");
        util.print(0, tableName + ".prototype.equals = function(other){");
        for(let i=0; i < results.length; i++){

            if(i == 0){ // Primeiro
                util.print(1, "return other.get" + util.capitalize(results[i].COLUMN_NAME) + "() == this.get" + util.capitalize(results[i].COLUMN_NAME) + "()");
            } else if(i+1 == results.length){ // Ultimo
                util.print(2, "&& other.get" + util.capitalize(results[i].COLUMN_NAME) + "() == this.get" + util.capitalize(results[i].COLUMN_NAME) + "();");
            } else { // Meio
                util.print(2, "&& other.get" + util.capitalize(results[i].COLUMN_NAME) + "() == this.get" + util.capitalize(results[i].COLUMN_NAME) + "()");
            }
        }
        util.print(0, "}");
        util.print(0, "");

        util.print(0, "//! Validadores");
        
        util.print(0, tableName + ".prototype.validarEntidade = function(){");
        util.print(1, "var valido = true;");
        util.print(1, "var msgErro = [];");
        util.print(1, "");
        util.print(1, "//* Vazio / Undefined");
        util.print(1, "if(this === undefined){ msgErro.push('Entidade Inválida'); }");
        
        // Loop de undefined
        for(let i=0; i < results.length; i++){
            util.print(1, "if(this." + results[i].COLUMN_NAME + " === undefined){ msgErro.push('Campo " + util.capitalize(results[i].COLUMN_NAME) + " não pode ser vazio !'); }");
        }
        util.print(1, "");

        /*
        // Loop de vazio
        // for(let i=0; i < results.length; i++){
        //     if(results.DATA_TYPE == "varchar"){

        //     }
        //     util.print(1, "if(this." + results[i].COLUMN_NAME + " === undefined){ msgErro.push('Campo " + util.capitalize(results[i].COLUMN_NAME) + " precisa ser preenchido !'); }");
        // }*/
        
        // Loop de tamanho
        for(let i=0; i < results.length; i++){
            util.print(1, "if(this." + results[i].COLUMN_NAME + ".length < 3){ msgErro.push('Campo " + util.capitalize(results[i].COLUMN_NAME) + " possui menos de 3 caracteres !'); }");
        }
        util.print(1, "");

        util.print(1, "if(msgErro.length > 0) valido = false;");
        util.print(1, "this.validacao = {valido: valido, msgErro: msgErro};");
        util.print(0, "};");
        util.print(0, "");
        
        util.print(0, tableName + ".prototype.validarEntidadeInsert = function(){");
        util.print(1, "");
        util.print(1, "var valido = true;");
        util.print(1, "var msgErro = [];");
        util.print(1, "");
        util.print(1, "//TODO Código de validação para INSERT");
        util.print(1, "");
        util.print(1, "if(msgErro.length > 0) valido = false;");
        util.print(1, "this.validacao.valido = valido;");
        util.print(1, "this.validacao.msgErro = this.validacao.msgErro.concat(msgErro)");
        util.print(0, "}");

        util.print(0, tableName + ".prototype.validarEntidadeUpdate = function(){");
        util.print(1, "");
        util.print(1, "var valido = true;");
        util.print(1, "var msgErro = [];");
        util.print(1, "");
        util.print(1, "//TODO Código de validação para UPDATE");
        util.print(1, "");
        util.print(1, "if(msgErro.length > 0) valido = false;");
        util.print(1, "this.validacao.valido = valido;");
        util.print(1, "this.validacao.msgErro = this.validacao.msgErro.concat(msgErro)");
        util.print(0, "}");

        util.print(0, tableName + ".prototype.validarEntidadeDelet = function(){");
        util.print(1, "");
        util.print(1, "var valido = true;");
        util.print(1, "var msgErro = [];");
        util.print(1, "");
        util.print(1, "//TODO Código de validação para DELET");
        util.print(1, "");
        util.print(1, "if(msgErro.length > 0) valido = false;");
        util.print(1, "this.validacao.valido = valido;");
        util.print(1, "this.validacao.msgErro = this.validacao.msgErro.concat(msgErro)");
        util.print(0, "}");

        util.print(0, "//! Export");
        util.print(0, "module.exports = " + tableName + ";");

        finalNameAtual = "";

    }
    
}


module.exports = modelScriptPro;
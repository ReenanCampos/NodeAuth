

const fs = require('fs');
const basePath = __dirname.substr(0, __dirname.indexOf("scriptpro"));
console.log(basePath);
var sleep = require('system-sleep');

const folder = "scriptprotest/models/";
const filename = "Usuario.js";
let mysql = require('mysql');
let connection = mysql.createConnection({ host: 'localhost',port: 3306, user     : 'root', password : 'root', database : 'cmsteste' });
let arquivoResetado = false;


//! AREA DE PREENCHIMENTO MANUAL (por enquanto)
const tab = "    ";
const tableName = 'Usuario';

/**
 * arquivoOuTerminal
 *   - ARQ -> salvar em arquivo
 *   - TER -> enviar no terminal
 */
const arquivoOuTerminal = "ARQ";

//! AREA DE PREENCHIMENTO MANUAL (por enquanto)


let getColumns = `
SELECT 
     TABLE_NAME
    ,COLUMN_NAME
    ,ORDINAL_POSITION
    ,IS_NULLABLE
    ,DATA_TYPE
    ,CHARACTER_MAXIMUM_LENGTH 
FROM 
    information_schema.columns 
WHERE 
    TABLE_NAME = '`+ tableName+`';`;
connection.query(getColumns, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    if(tableName === "") return console.error(" -> Nome tabela está vazio !");
    if(results.length == 0) return console.error(" -> Nenhum dado encontrado !");
    
    inicio(tableName, results);

});
 
connection.end(); 


function inicio(tableName, results){
    print(0, "const moment = require('moment');");
    print(0, "moment.locale('pt-BR');");
    print(0, "");
    print(0, "//! Construtor");
    print(0, "function " + tableName + "(entity, validar=false) {");
    print(1, "this.validacao = {valido: false, msgErro: ['Não validado ainda']};");

    for(let i=0; i < results.length; i++){
        print(1,"this." + results[i].COLUMN_NAME + " = " + verifyType(results[i].DATA_TYPE) + ";");
    }

    print(1, "this.roles = [];");
    print(0, "");
    print(1, "if(entity != undefined){");

    for(let i=0; i < results.length; i++){
        print(2,"this." + results[i].COLUMN_NAME + " = entity." + results[i].COLUMN_NAME + " || " + verifyType(results[i].DATA_TYPE) + ";");
    }

    print(1, "}");
    print(0, "");
    print(1, "if(validar) this.validarEntidade();");
    print(0, "}");
    print(0, "");

    print(0, tableName + ".prototype ={");
    print(1, tableName + ": null");
    print(0, "}");
    print(0, "");

    let columnsStrID = "";
    let columnsStr = "";
    for(let i=0; i < results.length; i++){

        if(results[i].COLUMN_NAME == "id"){
            columnsStrID += results[i].COLUMN_NAME + "=" + verifyType(results[i].DATA_TYPE);
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

    print(0, tableName + ".new = function(" + columnsStrID + "){");
    print(1, "return new this(" + columnsStr + ");");
    print(0, "}");
    print(0, "");

    print(0, "//! Getters & Setters");
    for(let i=0; i < results.length; i++){

        print(0, tableName + ".protoype.get" + capitalize(results[i].COLUMN_NAME) + " = function(){" + 
            " return this." + results[i].COLUMN_NAME + ";" + 
            " }");
        
        print(0, tableName + ".protoype.set" + capitalize(results[i].COLUMN_NAME) + " = function(" + results[i].COLUMN_NAME + "){" + 
            " this." + results[i].COLUMN_NAME + " = " + results[i].COLUMN_NAME + 
            " }");
    }

    print(0, tableName + ".protoype.get" + "Valido" + " = function(){" + 
        " return this." + "valido" + ";" + 
        " }");

    print(0, tableName + ".protoype.set" + "Valido" + " = function(" + "valido"+ "){" + 
        " this." + "valido" + " = " + "valido" + 
        " }");
    print(0, "");

    print(0, "//! Úteis");
    print(0, tableName + ".prototype.equals = function(other){");
    for(let i=0; i < results.length; i++){

        if(i == 0){ // Primeiro
            print(1, "return other.get" + capitalize(results[i].COLUMN_NAME) + "() == this.get" + capitalize(results[i].COLUMN_NAME) + "()");
        } else if(i+1 == results.length){ // Ultimo
            print(2, "&& other.get" + capitalize(results[i].COLUMN_NAME) + "() == this.get" + capitalize(results[i].COLUMN_NAME) + "();");
        } else { // Meio
            print(2, "&& other.get" + capitalize(results[i].COLUMN_NAME) + "() == this.get" + capitalize(results[i].COLUMN_NAME) + "()");
        }
    }
    print(0, "}");
    print(0, "");

    print(0, "//! Validadores");
    
    print(0, tableName + ".prototype.validarEntidade = function(){");
    print(1, "var valido = true;");
    print(1, "var msgErro = [];");
    print(1, "");
    print(1, "//* Vazio / Undefined");
    print(1, "if(this === undefined){ msgErro.push('Entidade Inválida'); }");
    
    // Loop de undefined
    for(let i=0; i < results.length; i++){
        print(1, "if(this." + results[i].COLUMN_NAME + " === undefined){ msgErro.push('Campo " + capitalize(results[i].COLUMN_NAME) + " não pode ser vazio !'); }");
    }

    // Loop de vazio
    for(let i=0; i < results.length; i++){
        print(1, "if(this." + results[i].COLUMN_NAME + " === undefined){ msgErro.push('Campo " + capitalize(results[i].COLUMN_NAME) + " precisa ser preenchido !'); }");
    }



    // Loop de tamanho
}




//? ******************* UTEIS *******************

function print(tabs=0, str = ""){
    let strFinal = "";
    for(let i=0; i<tabs; i++) strFinal += tab;
    strFinal += str

    // Escreve no arquivo
    if(arquivoOuTerminal === "ARQ"){
        escreverArquivo(strFinal);
        return;
    }

    // Escreve no terminal
    if(arquivoOuTerminal === "TER"){
        console.log(strFinal);
    }
    
}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

function verifyType(tipoColuna){
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

}

function escreverArquivo(str = ""){
    sleep(10);
    if(!arquivoResetado){
        fs.open(basePath + folder + filename, "w", function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("The file has been cleaned");
        }); 
        arquivoResetado = true;
    }

    fs.appendFile(basePath + folder + filename, "\n" + str , function(err) {
        if(err) {
            return console.log(err);
        }
    }); 
    
}



/**
 * List prompt example
 */

// 'use strict';
// var inquirer = require('inquirer');

// inquirer
//   .prompt([
//     {
//       type: 'list',
//       name: 'theme',
//       message: 'What do you want to do?',
//       choices: [
//         'Order a pizza',
//         'Make a reservation',
//         new inquirer.Separator(),
//         'Ask for opening hours',
//         {
//           name: 'Contact support',
//           disabled: 'Unavailable at this time'
//         },
//         'Talk to the receptionist'
//       ]
//     },
//     {
//       type: 'list',
//       name: 'size',
//       message: 'What size do you need?',
//       choices: ['Jumbo', 'Large', 'Standard', 'Medium', 'Small', 'Micro'],
//       filter: function(val) {
//         return val.toLowerCase();
//       }
//     }
//   ])
//   .then(answers => {
//     console.log(JSON.stringify(answers, null, '  '));
//   });


























// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
//   })
  
// readline.question(`What's your name?`, (name) => {
//     console.log(`Hi ${name}!`)
//     readline.close()
//   });
//   console.log(name);


// let mysql = require('mysql');
// let config = require('./config.js');
 
// let connection = mysql.createConnection(config);
 
// let sql = `SELECT * FROM todos`;
// connection.query(sql, (error, results, fields) => {
//   if (error) {
//     return console.error(error.message);
//   }
//   console.log(results);
// });
 
// connection.end(); 






// const mysql      = require('mysql');
// const connection = mysql.createConnection({
//     host     : 'localhost',
//     port     : 3306,
//     user     : 'root',
//     password : 'root', // renan123 / root
//     database : 'cmsteste',
// });



// connection.connect(function(err){
//   if(err) return console.log(err);
//   console.log('conectou!');
// })

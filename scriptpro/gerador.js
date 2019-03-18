
const fs = require('fs');
const basePath = __dirname.substr(0, __dirname.indexOf("scriptpro"));
console.log(basePath);
var sleep = require('system-sleep');

const folder = "scriptprotest/models/";
const filename = "Usuario.js";
let mysql = require('mysql');
let connection = mysql.createConnection({ host: 'localhost',port: 3306, user     : 'root', password : 'root', database : 'cmsteste' });
let arquivoResetado = false;

const ttt = require('./templates/model');


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

    ttt.useTemplate(tableName, results);

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

function escreverArquivo(str = ""){
    //sleep(15);
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

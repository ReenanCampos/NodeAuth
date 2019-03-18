
basePath = __dirname.substr(0, __dirname.indexOf("scriptpro"));
let mysql = require('mysql');
let connection = mysql.createConnection({host: 'localhost', port: 3306, user: 'root', password: 'root', database: 'cmsteste'});
const modelTemplate = require('./templates/model');


finalModelName = "Model.js";
finalFilterName = "Filter.js";
finalControllerName = "Model.js";
finalServiceName = "Model.js";

finalNameAtual = "";


//? AREA DE PREENCHIMENTO MANUAL (por enquanto)
const tableName = 'Usuario';
folder = "scriptprotest/models/";
filename = "Usuario";
arquivoOuTerminal = "ARQ"; // ARQ -> salvar em arquivo || TER -> enviar no terminal

queries = {
    default: false, // gera os metodos: SelectByFilter, SelectALl, Insert, Update, Delet
    apis:[ // Apis para gerar CASO default seja false
        {
        nome: "SelectById", // Nome Método
        tipoRetorno: "entidade", // entidade ou lista
        entrada: [ // Input do método
            {
                nomeVariavel: "id",
                tipoVariavel: "Integer"
            }
        ]
        },
        {
        nome: "SelectByAtivo", // Nome Método
        tipoRetorno: "lista", // entidade ou lista
        entrada: [ // Input do método
            {
                nomeVariavel: "ativo",
                tipoVariavel: "boolean"
            }
        ]
        }
    ]
}
//? AREA DE PREENCHIMENTO MANUAL (por enquanto)





let getColumns = `SELECT TABLE_NAME, COLUMN_NAME, ORDINAL_POSITION, IS_NULLABLE, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH FROM information_schema.columns WHERE TABLE_NAME = '`+ tableName+`';`;
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

    modelTemplate.useTemplate(tableName, results);

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

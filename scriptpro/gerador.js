
basePath = __dirname.substr(0, __dirname.indexOf("scriptpro"));
let mysql = require('mysql');
let connection = mysql.createConnection({host: 'localhost', port: 3306, user: 'root', password: 'root', database: 'cmsteste'});
const modelTemplate = require('./templates/model');
const controllerTemplate = require('./templates/controller');
const filterTemplate = require('./templates/filter');
const serviceTemplate = require('./templates/service');
const sqlRepTemplate = require('./templates/sqlRep');
const sqlTemplate = require('./templates/sql');

var sleep = require('system-sleep');

finalModelName = "Model";
finalFilterName = "Filter";
finalControllerName = "Controller";
finalServiceName = "Service";
finalSqlRepName = "SqlRep";

finalSqlSelectName = "SelectByFilter";
finalSqlInsertName = "Insert";
finalSqlUpdateName = "Update";
finalSqlDeletName = "Delet";

finalNameAtual = "";


//? AREA DE PREENCHIMENTO MANUAL (por enquanto)
const tableName = 'Usuario';
folder = "scriptprotest/models/";
filename = tableName;
arquivoOuTerminal = "ARQ"; // ARQ -> salvar em arquivo || TER -> enviar no terminal

queries = {
    default: true, // gera os metodos: SelectByFilter, SelectAll, Insert, Update, Delet
    apis:[ // Apis para gerar CASO default seja false
        {
        nome: "SelectById", // Nome Método
        tipoMetodo: "consulta", // consulta OU filtro OU operacao
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
        tipoMetodo: "consulta", // consulta OU filtro OU operacao
        tipoRetorno: "lista", // entidade ou lista
        entrada: [ // Input do método
            {
                nomeVariavel: "ativo",
                tipoVariavel: "boolean"
            }
        ]
        },
        {
        nome: "InsertTeste2", // Nome Método
        tipoMetodo: "operacao", // consulta OU filtro OU operacao 
        tipoRetorno: "entidade", // entidade ou lista
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





let getColumns = `SELECT TABLE_NAME, COLUMN_NAME, ORDINAL_POSITION, IS_NULLABLE, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH FROM information_schema.columns WHERE TABLE_NAME = '`+ tableName+`' ORDER BY ORDINAL_POSITION;`;
connection.query(getColumns, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    if(tableName === "") return console.error(" -> Nome tabela está vazio !");
    if(results.length == 0) return console.error(" -> Nenhum dado encontrado !");
    pause(0, "Tabela(s) consultada(s), iniciando gerador")
    inicio(tableName, results);
    
});

connection.end(); 


function inicio(tableName, results){
    pause(2000, "Lendo dados ...")
    pause(2000, "Iniciando gerador")

    pause(1000, "Atualizando ~> " + tableName + finalModelName);
    modelTemplate.useTemplate(tableName, results);

    pause(1000, "Atualizando ~> " + tableName + finalFilterName);
    filterTemplate.useTemplate(tableName, results);

    pause(1000, "Atualizando ~> " + tableName + finalControllerName);
    controllerTemplate.useTemplate(tableName, queries);

    pause(1000, "Atualizando ~> " + tableName + finalServiceName);
    serviceTemplate.useTemplate(tableName, results, queries);
    
    pause(1000, "Atualizando ~> " + tableName + finalSqlRepName);
    sqlRepTemplate.useTemplate(tableName, results, queries);
    
    pause(1000, "Atualizando ~> " + finalSqlSelectName + " / " + finalSqlInsertName + " / " + finalSqlUpdateName + " / " + finalSqlDeletName);
    sqlTemplate.useTemplate(tableName, results, queries);
    
    pause(500, "Geração finalizada. Obrigado pela preferência !")
}

function pause (tempoMs, txt="Não definido."){
    console.log("[ScriptPro] " + txt);
    sleep(tempoMs);
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





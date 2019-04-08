

var inquirer = require("inquirer");
var fs = require('fs');
/*
"use strict";

var BottomBar = require('../node_modules/inquirer/lib/ui/bottom-bar');
var cmdify = require('cmdify');

var loader = ['/ Installing', '| Installing', '\\ Installing', '- Installing'];
var i = 4;
var ui = new BottomBar({ bottomBar: loader[i % 4] });

setInterval(() => {
  ui.updateBottomBar(loader[i++ % 4]);
}, 300);

var spawn = require('child_process').spawn;

var cmd = spawn(cmdify('npm'), ['-g', 'install', 'inquirer'], { stdio: 'pipe' });
cmd.stdout.pipe(ui.log);
cmd.on('close', () => {
  ui.updateBottomBar('Installation done!\n');
  process.exit();
});



inquirer.registerPrompt("directory", require("inquirer-select-directory"));

inquirer.prompt([{
    type: "directory",
    name: "path",
    message: "Qual é a pasta raiz do projeto?",
    basePath: "./",
    options: {
      displayFiles: false
    }
}]).then(function(answers) {
    //fs.writeFile(answers.path + '/file.txt', 'Whoa! You have created this file');
    console.log(answers);
});

inquirer
  .prompt([
    {
      type: 'list',
      name: 'theme',
      message: 'What do you want to do?',
      choices: [
        'Order a pizza',
        'Make a reservation',
        new inquirer.Separator(),
        'Ask for opening hours',
        {
          name: 'Contact support',
          disabled: 'Unavailable at this time'
        },
        'Talk to the receptionist'
      ]
    },
    {
      type: 'list',
      name: 'size',
      message: 'What size do you need?',
      choices: ['Jumbo', 'Large', 'Standard', 'Medium', 'Small', 'Micro'],
      filter: function(val) {
        return val.toLowerCase();
      }
    }
  ])
  .then(answers => {
    console.log(JSON.stringify(answers, null, '  '));
  });*/

basePath = __dirname.substr(0, __dirname.indexOf("scriptpro"));
console.log(__dirname);
console.log(basePath);

let mysql = require('mysql');
let connection = mysql.createConnection({host: 'localhost', port: 3306, user: 'root', password: 'root', database: 'cmsteste'});
const modelTemplate = require('./templates/model');
const controllerTemplate = require('./templates/controller');
const filterTemplate = require('./templates/filter');
const serviceTemplate = require('./templates/service');
const sqlRepTemplate = require('./templates/sqlRep');
const sqlTemplate = require('./templates/sql');

var sleep = require('system-sleep');

// Para o sistema de encontrar e definir nome dos arquivos
finalModelName = "Model";
finalFilterName = "Filter";
finalControllerName = "Controller";
finalServiceName = "Service";
finalSqlRepName = "SqlRep";
finalSqlSelectName = "SelectByFilter";
finalSqlInsertName = "Insert";
finalSqlUpdateName = "Update";
finalSqlDeletName = "Delet";

// Para salvar os txt antes de enviar aos arquivos
txtFileModel = "";
txtFileFilter = "";
txtFileController = "";
txtFileService = "";
txtFileSqlRep = "";
txtFileSelect = "";
txtFileInsert = "";
txtFileUpdate = "";
txtFileDelet = "";

// Caminho pastas padrão
pathFileModel = "Models/";
pathFileFilter = "Filters/";
pathFileController = "Controllers/";
pathFileService = "Services/";
pathFileSqlRep = "SqlReps/";
pathFileSelect = "SqlFiles/";
pathFileInsert = "SqlFiles/";
pathFileUpdate = "SqlFiles/";
pathFileDelet = "SqlFiles/";

// Controle de escritura de arquivo
finalNameAtual = "";

// Folders globais para mostrar no final pro usuario
newFilesFolders = [];


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
    //pause(2000, "Iniciando gerador")

    //pause(1000, "Atualizando ~> " + tableName + finalModelName);
    modelTemplate.useTemplate(tableName, results);

    //pause(1000, "Atualizando ~> " + tableName + finalFilterName);
    filterTemplate.useTemplate(tableName, results);

    //pause(1000, "Atualizando ~> " + tableName + finalControllerName);
    controllerTemplate.useTemplate(tableName, queries);

    //pause(1000, "Atualizando ~> " + tableName + finalServiceName);
    serviceTemplate.useTemplate(tableName, results, queries);
    
    //pause(1000, "Atualizando ~> " + tableName + finalSqlRepName);
    sqlRepTemplate.useTemplate(tableName, results, queries);
    
    //pause(1000, "Atualizando ~> " + finalSqlSelectName + " / " + finalSqlInsertName + " / " + finalSqlUpdateName + " / " + finalSqlDeletName);
    sqlTemplate.useTemplate(tableName, results, queries);
    
    testeGeracaoNewFoldersFiles();

    pause(500, "Geração finalizada. Obrigado pela preferência !")
}

function pause (tempoMs, txt="Não definido."){
    console.log("[ScriptPro] " + txt);
    //sleep(tempoMs);
}

function testeGeracaoNewFoldersFiles(){
  var objFinal = {};
  for(fullpath in newFilesFolders){
    let numeroSlash = (newFilesFolders[fullpath].match(/\//g) || []).length;
    let posicaoSlashAnterior = 0;
    let caminho = newFilesFolders[fullpath];
    for(var i=0; i<numeroSlash; i++){

      let slashAtual = caminho.indexOf("/");
      let printar = caminho.substr(0, slashAtual);
      //console.log(gerarArvore(i) + printar);
      if(objFinal[gerarArvore(i) + "└" + printar] == undefined){
        objFinal[gerarArvore(i) + "└" + printar] = [];
      }

      caminho = caminho.substr(slashAtual+1, caminho.length);

      if(i+1 == numeroSlash){
        objFinal[gerarArvore(i) + "└" + printar].push(gerarArvore(i+1) + "└" + caminho);
      }

    }
    
  }

  for (var property in objFinal) {
    if(property != null){
      console.log("" + property);
      let espacosContados = (property.split(" ").length - 1);
      //console.log(gerarArvore((espacosContados+2)/4) + "│");
      if(objFinal[property] != []){
        for(let i=0; i<objFinal[property].length; i++){
          console.log("->" + objFinal[property][i]);  
        }
      }
    }
  }
}

function gerarArvore(i){
  let charPrintar = "->";
  var retorno = "";
  for(let i2=0; i2<i; i2++){
    retorno += "    ";
  }
  return retorno;
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





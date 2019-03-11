const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('_helpers/role');

var db = require('../dbConnection');
const usuarioSqlRep = require("../sqlrep/Usuario/All");
const Usuario = require("../models/Usuario");


// users hardcoded for simplicity, store in a db for production applications
const users = [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', roles: [Role.Admin, Role.User] },
    { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', roles: [Role.User] }
];
const nomeAplicacao = "RereNodeJS07032019";

// Dias/Horas/Minutos/Segundos que o token será válido
// 1 dia tem 86400 segundos
// 1 hora tem 3600 segundos
// 1 minuto tem 60 segundos
// 1 segundo tem 1 segundo
const segundosLoginToken = 43200; // 12hrs

var UsuarioService = {
    authenticate: function(req, res) {
        var resultJson = "";
        username = req.body.username;
        password = req.body.password;
        var results = db.query(
            usuarioSqlRep.Login.Login,
            [username, password],
            function (error, results, fields) {
            
            if (error) {
                newError(res, error, 400);
                return;
            }   
            
            if ( results.length == 0 ) {
                res.status(400).json(
                { status: 400,
                message: "Usuario ou Senha incorretos !",
                data: [] });
                return;
            }

            var resultJson = convertJson(results);

            let user = new Usuario(resultJson[0]);
            user.roles = [];
            for(var i in resultJson){
                var role = {
                    id: resultJson[i].idRole,
                    nome: resultJson[i].nomeRole,
                    descricao: resultJson[i].descricaoRole,
                    ativo: resultJson[i].ativoRole
                }
                user.roles.push(role);
            }

            if (user) {
                const token = jwt.sign({ 
                    sub: user.id, 
                    roles: user.roles,
                    expiresIn: segundosLoginToken,
                    iss: nomeAplicacao,
                    }, config.secret);
                const { password, ...userWithoutPassword } = user;
                res.status(200).json(
                    { status: 200,
                      message: "Sucesso",
                      data: [user],
                      token: token});
            };

        });
    },

    selectAll: function(req, res){
        var results = db.query(usuarioSqlRep.SelectAll.SelectAll,
            function (error, results, fields) {
            
            if (error) { newError(res, error, 400); return; }
            
            var resultJson = convertJson(results);

            newResposta(res, resultJson);
        });
    },

    insert: function(req, res, entity){
        var results = db.query(
            usuarioSqlRep.Insert.Insert,
            [entity.id, entity.nome, entity.usuario, entity.email, entity.telefone, entity.senha, entity.dataNascimento, entity.ativo, entity.bloqueado, entity.id],
            function (error, results, fields) {
        
            if (error) { newError(res, error, 400); return; }
            
            var resultJson = convertJson(results);
            newResposta(res, entity.id);
        });
    },

    update: function(req, res, entity){
        var results = db.query(usuarioSqlRep.Update.Update,
            [entity.nome, entity.usuario, entity.email, entity.telefone, entity.senha, entity.dataNascimento, entity.ativo, entity.bloqueado, entity.id],
            function (error, results, fields) {
        
            if (error) { newError(res, error, 400); return; }
            
            if (!results.affectedRows) {
                console.log(error);
                var apiResult = {};
                res.status(400).json(
                { status: 400,
                message: "Nenhuma linha afetada",
                data: [] });
                return;
            }
        
            var resultJson = convertJson(results);
        
            res.status(200).json(
            { status: 200,
            message: "Sucesso",
            data: resultJson ? resultJson : entity.id });
        });
    },

    delet: function(req, res, entity){
        var results = db.query(
            usuarioSqlRep.Delet.Delet,
            [entity.id],
            function (error, results, fields) {
        
            if (error) { newError(res, error, 400); return; }
            
            if (!results.affectedRows) {
                console.log(error);
                var apiResult = {};
                res.status(400).json(
                { status: 400,
                message: "Nenhuma linha afetada",
                data: [] });
                return;
            }
        
            var resultJson = convertJson(results);
            res.status(200).json(
            { status: 200,
            message: "Sucesso",
            data: resultJson ? resultJson : entity.id });
        });
    },

    insertRole: function(req, res, entity){
        var results = db.query(
            usuarioSqlRep.InsertRole.InsertRole,
            [entity.idUsuario, entity.idRole, new Date(), "EMBREVE"],
            function (error, results, fields) {
        
            if (error) { newError(res, error, 400); return; }
            
            var resultJson = convertJson(results);
            res.status(200).json(
            { status: 200,
            message: "Sucesso",
            data: resultJson ? resultJson : entity.id });
        });
    },

    deletRole: function(req, res, entity){
        var results = db.query(
            usuarioSqlRep.DeletRole.DeletRole,
            [entity.id],
            function (error, results, fields) {
        
            if (error) { newError(res, error, 400); return; }
            
            if (!results.affectedRows) {
                console.log(error);
                var apiResult = {};
                res.status(400).json(
                { status: 400,
                message: "Nenhuma linha afetada",
                data: [] });
                return;
            }
        
            var resultJson = convertJson(results.id);
            res.status(200).json(
            { status: 200,
            message: "Sucesso",
            data: resultJson ? resultJson : entity.id });
        });
    }

}


//! Uteis 
function newError(res, error, code, data=[]){
    res.status(code).json(
    { 
        status: code,
        message: error.message,
        data: data
    });
}

function convertJson(results){
    var resultJson = JSON.stringify(results);
    return JSON.parse(resultJson);
}

function newResposta(res, data=[], code=200, message="Sucesso"){
    res.status(code).json(
    { 
        status: code,
        message: message,
        data: data 
    });
}

module.exports = UsuarioService;

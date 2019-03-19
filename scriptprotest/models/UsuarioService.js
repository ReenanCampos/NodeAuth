
const moment = require('moment');
moment.locale('pt-BR');
ler db = require('../dbConnection');
const util = require('../util/util');
const Usuario = require('../models/UsuarioModel');
const UsuarioSqlRep = require('../sqlrep/Usuario/UsuarioService');

var UsuarioService = {

    selectByFilter: function(req, res){
        var results = db.query( UsuarioSqlRep.SelectByFilter.SelectByFilter,
            function (error, results, fields) {
            
                if (error) { util.newError(res, error.message, 400); return; }
                
                var resultJson = util.convertJson(results);
                
                util.newResposta(res, resultJson);
            });
    },
    insert: function(req, res, entity){
        var results = db.query( UsuarioSqlRep.SelectByFilter.SelectByFilter,
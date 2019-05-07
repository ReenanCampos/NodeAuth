
const moment = require('moment');
moment.locale('pt-BR');
let db = require('../../../dbConnection');
const util = require('../../../util/util');
const UsuarioLoginHistorico = require('../../Models/UsuarioLoginHistorico/UsuarioLoginHistoricoModel');
const UsuarioLoginHistoricoSqlRep = require('../../SqlReps/UsuarioLoginHistorico/UsuarioLoginHistoricoSqlRep');

var UsuarioLoginHistoricoService = {

    selectByFilter: function(req, res, filter){
        var results = db.query( UsuarioLoginHistoricoSqlRep.SelectByFilter.SelectByFilter(filter),
            function (error, results, fields) {
            
                if (error) { util.newError(res, error.message, 400); return; }
                
                var resultJson = util.convertJson(results);
                
                util.newResposta(res, resultJson);
            });
    },
    insert: function(req, res, entity){
        var results = db.query( UsuarioLoginHistoricoSqlRep.Insert.Insert,
            [entity.id, entity.idUsuario, entity.dataLogin, entity.ip, entity.nomeDispositivo, entity.dispositivo],
            function (error, results, fields) {
            
                if (error) {util.newError(res, error.message, 400); return; }
            
                var resultJson = util.convertJson(results);
                util.newResposta(res, entity.id);
            });
        },
    update: function(req, res, entity){
        var results = db.query( UsuarioLoginHistoricoSqlRep.Update.Update,
            [entity.idUsuario, entity.dataLogin, entity.ip, entity.nomeDispositivo, entity.dispositivo, entity.id],
            function (error, results, fields) {
            
                if (error) {util.newError(res, error.message, 400); return; }
            
                if (!results.affectedRows) { util.newError(res, 'Nenhuma linha afetada', 400); return; }
            
                var resultJson = util.convertJson(results);
                util.newResposta(res, entity.id);
            });
        },
    delet: function(req, res, entity){
        var results = db.query( UsuarioLoginHistoricoSqlRep.Delet.Delet,
            [entity.id],
            function (error, results, fields) {
            
                if (error) {util.newError(res, error.message, 400); return; }
            
                if (!results.affectedRows) { util.newError(res, 'Nenhuma linha afetada', 400); return; }
            
                var resultJson = util.convertJson(results);
                util.newResposta(res, entity.id);
            });
        },
}

module.exports = UsuarioLoginHistoricoService;

const moment = require('moment');
moment.locale('pt-BR');
let db = require('../dbConnection');
const util = require('../util/util');
const Usuario = require('../models/UsuarioModel');
const UsuarioSqlRep = require('../sqlrep/Usuario/UsuarioService');

var UsuarioService = {

    selectByFilter: function (req, res) {
        var results = db.query(UsuarioSqlRep.SelectByFilter.SelectByFilter,
            function (error, results, fields) {

                if (error) { util.newError(res, error.message, 400); return; }

                var resultJson = util.convertJson(results);

                util.newResposta(res, resultJson);
            });
    },
    insert: function (req, res, entity) {
        var results = db.query(UsuarioSqlRep.Insert.Insert,
            [entity.id, entity.nome, entity.batata, entity.email, entity.telefone, entity.senha, entity.dataNascimento, entity.ativo, entity.bloqueado],
            function (error, results, fields) {

                if (error) { util.newError(res, error.message, 400); return; }

                var resultJson = util.convertJson(results);
                util.newResposta(res, entity.id);
            });
    },
    update: function (req, res, entity) {
        var results = db.query(UsuarioSqlRep.Update.Update,
            [entity.nome, entity.batata, entity.email, entity.telefone, entity.senha, entity.dataNascimento, entity.ativo, entity.bloqueado, entity.id],
            function (error, results, fields) {

                if (error) { util.newError(res, error.message, 400); return; }

                if (!results.affectedRows) { util.newError(res, 'Nenhuma linha afetada', 400); return; }

                var resultJson = util.convertJson(results);
                util.newResposta(res, entity.id);
            });
    },
    delet: function (req, res, entity) {
        var results = db.query(UsuarioSqlRep.Delet.Delet,
            [entity.id],
            function (error, results, fields) {

                if (error) { util.newError(res, error.message, 400); return; }

                if (!results.affectedRows) { util.newError(res, 'Nenhuma linha afetada', 400); return; }

                var resultJson = util.convertJson(results);
                util.newResposta(res, entity.id);
            });
    },
}

module.exports = UsuarioController;
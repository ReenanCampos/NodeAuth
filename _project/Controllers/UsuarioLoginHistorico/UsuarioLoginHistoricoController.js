
const UsuarioLoginHistoricoFilter = require('../../Filters/UsuarioLoginHistorico/UsuarioLoginHistoricoFilter');
const UsuarioLoginHistorico = require('../../Models/UsuarioLoginHistorico/UsuarioLoginHistoricoModel');
const UsuarioLoginHistoricoService = require('../../Services/UsuarioLoginHistorico/UsuarioLoginHistoricoService');
const util = require('../../../util/util');

var UsuarioLoginHistoricoController = {

    selectByFilter: function(req, res, next){
        var filter = new UsuarioLoginHistoricoFilter(req.body)
        if(filter.validacao.existe){
            UsuarioLoginHistoricoService.selectByFilter(req, res, filter);
        }else{
            util.newError(res, filter.validacao.msgErro, 400);
        }
    },

    insert: function(req, res, next){
        var entity = new UsuarioLoginHistorico(req.body, true)
        entity.validarEntidadeInsert();
        if(entity.validacao.valido){
            UsuarioLoginHistoricoService.insert(req, res, entity);
        }else{
            util.newError(res, entity.validacao.msgErro, 400);
        }
    },

    update: function(req, res, next){
        var entity = new UsuarioLoginHistorico(req.body, true)
        entity.validarEntidadeUpdate();
        if(entity.validacao.valido){
            UsuarioLoginHistoricoService.update(req, res, entity);
        }else{
            util.newError(res, entity.validacao.msgErro, 400);
        }
    },

    delet: function(req, res, next){
        var entity = new UsuarioLoginHistorico(req.body, true)
        entity.validarEntidadeDelet();
        if(entity.validacao.valido){
            UsuarioLoginHistoricoService.delet(req, res, entity);
        }else{
            util.newError(res, entity.validacao.msgErro, 400);
        }
    },

}

module.exports = UsuarioLoginHistoricoController;
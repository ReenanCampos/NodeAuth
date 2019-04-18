
const UsuarioFilter = require('../../Filters/Usuario/UsuarioFilter');
const Usuario = require('../../Models/Usuario/UsuarioModel');
const UsuarioService = require('../../Services/Usuario/UsuarioService');
const util = require('../../../util/util');

var UsuarioController = {

    selectByFilter: function(req, res, next){
        var filter = new UsuarioFilter(req.body)
        if(filter.validacao.existe){
            UsuarioService.selectByFilter(req, res, filter);
        }else{
            util.newError(res, filter.validacao.msgErro, 400);
        }
    },

    insert: function(req, res, next){
        var entity = new Usuario(req.body, true)
        entity.validarEntidadeInsert();
        if(entity.validacao.valido){
            UsuarioService.insert(req, res, entity);
        }else{
            util.newError(res, entity.validacao.msgErro, 400);
        }
    },

    update: function(req, res, next){
        var entity = new Usuario(req.body, true)
        entity.validarEntidadeUpdate();
        if(entity.validacao.valido){
            UsuarioService.update(req, res, entity);
        }else{
            util.newError(res, entity.validacao.msgErro, 400);
        }
    },

    delet: function(req, res, next){
        var entity = new Usuario(req.body, true)
        entity.validarEntidadeDelet();
        if(entity.validacao.valido){
            UsuarioService.delet(req, res, entity);
        }else{
            util.newError(res, entity.validacao.msgErro, 400);
        }
    },

}

module.exports = UsuarioController;

const Usuario = require('../../Models/Usuario/UsuarioModel');
const UsuarioService = require('../../Services/Usuario/UsuarioService');
const util = require('../../../util/util');
const UsuarioFilter = require('../../Filters/Usuario/UsuarioFilter');

var UsuarioController = {

    selectByFilter: function(req, res, next){
        var filter = new UsuarioFilter(req.body, true)
        if(filter.validacao.valido){
            UsuarioService.selectByFilter(req, res, filter);
        }else{
            newError(res, filter.validacao.msgErro, 400);
        }
    },
    selectAll: function(req, res, next){
        UsuarioService.selectAll(req, res);
    },

    insert: function(req, res, next){
        var entity = new Usuario(req.body, true)
        entity.validarEntidadeInsert();
        if(entity.validacao.valido){
            UsuarioService.insert(req, res, entity);
        }else{
            newError(res, entity.validacao.msgErro, 400);
        }
    },

    update: function(req, res, next){
        var entity = new Usuario(req.body, true)
        entity.validarEntidadeUpdate();
        if(entity.validacao.valido){
            UsuarioService.update(req, res, entity);
        }else{
            newError(res, entity.validacao.msgErro, 400);
        }
    },

    delet: function(req, res, next){
        var entity = new Usuario(req.body, true)
        entity.validarEntidadeDelet();
        if(entity.validacao.valido){
            UsuarioService.delet(req, res, entity);
        }else{
            newError(res, entity.validacao.msgErro, 400);
        }
    },


}

module.exports = UsuarioController;
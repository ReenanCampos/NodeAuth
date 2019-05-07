
const Usuario = require("../models/Usuario");
const UsuarioFilter = require("../models/UsuarioFilter");

const UsuarioRole = require("../models/UsuarioRole");
const usuarioService = require('../services/usuario.service');
const util = require('../util/util');

var zController = {
    all: function(req, res){
        res.send('All todos')
    },

    authenticate: function(req, res, next){
        usuarioService.authenticate(req, res);
    },

    selectAll: function(req, res, next){
        var filter = new UsuarioFilter(req.body, true);
        if(filter.validacao.valido){
            usuarioService.selectAll(req, res, filter);
        }else{
            util.newError(res, filter.validacao.msgErro, 400);
        } 
    },

    insert: function(req, res, next){
        var entity = new Usuario(req.body, true);
        // entity.validarEntidadeInsert();
        if(entity.validacao.valido){
            usuarioService.insert(req, res, entity);
        }else{
            util.newError(res, entity.validacao.msgErro, 400);
        } 
    },

    update: function(req, res, next){
        var entity = new Usuario(req.body, true);
        // entity.validarEntidadeUpdate();
        if(entity.validacao.valido){
            usuarioService.update(req, res, entity);
        }else{
            util.newError(res, entity.validacao.msgErro, 400);
        }
    },

    delet: function(req, res, next){
        var entity = new Usuario(req.body, true);
        // entity.validarEntidadeDelet();
        if(entity.validacao.valido){
            usuarioService.delet(req, res, entity);
        }else{
            util.newError(res, entity.validacao.msgErro, 400);
        }
    },



    //! Roles
    insertRole: function(req, res, next){
        var entity = new UsuarioRole(req.body, true);
        // entity.validarEntidadeInsert();
        if(entity.validacao.valido){
            usuarioService.insertRole(req, res, entity);
        }else{
            util.newError(res, entity.validacao.msgErro, 400);
        } 
    },

    deletRole: function(req, res, next){
        var entity = new UsuarioRole(req.body, true);
        // entity.validarEntidadeInsert();
        if(entity.validacao.valido){
            usuarioService.deletRole(req, res, entity);
        }else{
            util.newError(res, entity.validacao.msgErro, 400);
        } 
    },



}

module.exports = UsuarioController;
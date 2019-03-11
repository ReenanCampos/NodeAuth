
const express = require('express');
const router = express.Router();

const Usuario = require("../models/Usuario");
const UsuarioRole = require("../models/UsuarioRole");
const usuarioService = require('../services/usuario.service');

var UsuarioController = {
    all: function(req, res){
        res.send('All todos')
    },

    authenticate: function(req, res, next){
        usuarioService.authenticate(req, res);
    },

    selectAll: function(req, res, next){
        usuarioService.selectAll(req, res);
    },

    insert: function(req, res, next){
        var entity = new Usuario(req.body, true);
        // entity.validarEntidadeInsert();
        if(entity.validacao.valido){
            usuarioService.insert(req, res, entity);
        }else{
            res.status(400).json({status: 400, message: entity.validacao.msgErro})
        } 
    },

    update: function(req, res, next){
        var entity = new Usuario(req.body, true);
        // entity.validarEntidadeUpdate();
        if(entity.validacao.valido){
            usuarioService.update(req, res, entity);
        }else{
            res.status(400).json({status: 400, message: entity.validacao.msgErro})
        }
    },

    delet: function(req, res, next){
        var entity = new Usuario(req.body, true);
        // entity.validarEntidadeDelet();
        if(entity.validacao.valido){
            usuarioService.delet(req, res, entity);
        }else{
            res.status(400).json({status: 400, message: entity.validacao.msgErro})
        }
    },



    //! Roles
    insertRole: function(req, res, next){
        var entity = new UsuarioRole(req.body, true);
        // entity.validarEntidadeInsert();
        if(entity.validacao.valido){
            usuarioService.insertRole(req, res, entity);
        }else{
            res.status(400).json({status: 400, message: entity.validacao.msgErro})
        } 
    },

    deletRole: function(req, res, next){
        var entity = new UsuarioRole(req.body, true);
        // entity.validarEntidadeInsert();
        if(entity.validacao.valido){
            usuarioService.deletRole(req, res, entity);
        }else{
            res.status(400).json({status: 400, message: entity.validacao.msgErro})
        } 
    },



}

module.exports = UsuarioController;
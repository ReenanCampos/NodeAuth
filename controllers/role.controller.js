
const express = require('express');
const RoleAuth = require('_helpers/role');

const Role = require("../models/Role");
const roleService = require('../services/role.service');
/*
// routes
router.get('/selectAll', RoleController.selectAll);                    // public
router.post('/insert', authorize(RoleAuth.Admin), RoleController.insert);  // admin only
router.post('/update', authorize(RoleAuth.Admin), RoleController.update);  // admin only
router.post('/delet', authorize(RoleAuth.Admin), RoleController.delet);    // admin only

router.get('/:id', authorize(), selectById);       // all authenticated roles
module.exports = router;
*/
var RoleController = {
    all: function(req, res){
        res.send('All todos')
    },
    selectAll: function(req, res, next){
        roleService.selectAll(req, res);
    },

    insert: function(req, res, next){
        var entity = new Role(req.body, true);
        // entity.validarEntidadeInsert();
        if(entity.validacao.valido){
            roleService.insert(req, res, entity);
        }else{
            res.status(400).json({status: 400, message: entity.validacao.msgErro})
        } 
    },

    update: function(req, res, next){
        var entity = new Role(req.body, true);
        // entity.validarEntidadeUpdate();
        if(entity.validacao.valido){
            roleService.update(req, res, entity);
        }else{
            res.status(400).json({status: 400, message: entity.validacao.msgErro})
        }
    },

    delet: function(req, res, next){
        var entity = new Role(req.body, true);
        // entity.validarEntidadeDelet();
        if(entity.validacao.valido){
            roleService.delet(req, res, entity);
        }else{
            res.status(400).json({status: 400, message: entity.validacao.msgErro})
        }
    }

}

module.exports = RoleController;

function selectAll2(req, res, next) {
    roleService.selectAll(req, res);
}

function insert2(req, res, next) {
    var entity = new Role(req.body, true);
    // entity.validarEntidadeInsert();
    if(entity.validacao.valido){
        roleService.insert(req, res, entity);
    }else{
        res.status(400).json({status: 400, message: entity.validacao.msgErro})
    }
}

function update2(req, res, next) {
    var entity = new Role(req.body, true);
    // entity.validarEntidadeUpdate();
    if(entity.validacao.valido){
        roleService.update(req, res, entity);
    }else{
        res.status(400).json({status: 400, message: entity.validacao.msgErro})
    }
}

function delet2(req, res, next) {
    var entity = new Role(req.body, true);
    // entity.validarEntidadeDelet();
    if(entity.validacao.valido){
        roleService.delet(req, res, entity);
    }else{
        res.status(400).json({status: 400, message: entity.validacao.msgErro})
    }
}


//? Nesse método possui uma função que trata a ROLE atual do usuário logado
//? ou seja, da para limitar a requisição após acessar
//? Mais tarde analizar a importancia dele e debugar os dados
function selectById(req, res, next) {
    const currentRole = req.role;
    const id = parseInt(req.params.id);

    // only allow admins to access other role records
    if (id !== currentRole.sub && currentRole.role !== RoleAuth.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    roleService.getById(req.params.id)
        .then(role => role ? res.json(role) : res.sendStatus(404))
        .catch(err => next(err));
}

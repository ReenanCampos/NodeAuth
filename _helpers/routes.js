
const express = require('express');
const router = express.Router();
const authorize = require('_helpers/authorize');
const RoleAuth = require('_helpers/role');


//* Controllers
const UsuarioController = require('../controllers/usuario.controller');
const RoleController = require('../controllers/role.controller');

//* Prefixos de Controllers
const ROLE_PREFIX = "/role";
const USER_PREFIX = "/usuario";


//? User
router.post(USER_PREFIX + '/authenticate', UsuarioController.authenticate);  
router.post(USER_PREFIX + '/selectAll', authorize(RoleAuth.Usuario), UsuarioController.selectAll);  
router.post(USER_PREFIX + '/insert', UsuarioController.insert);  
router.post(USER_PREFIX + '/update', UsuarioController.update);  
router.post(USER_PREFIX + '/delet', UsuarioController.delet);  
router.post(USER_PREFIX + '/insertRole', UsuarioController.insertRole);  
router.post(USER_PREFIX + '/deletRole', UsuarioController.deletRole);  

//? Role
router.get(ROLE_PREFIX + '/selectAll', authorize(RoleAuth.Admin), RoleController.selectAll);  // admin only
router.post(ROLE_PREFIX + '/insert', authorize(RoleAuth.Admin), RoleController.insert);       // admin only
router.post(ROLE_PREFIX + '/update', authorize(RoleAuth.Admin), RoleController.update);       // admin only
router.post(ROLE_PREFIX + '/delet', authorize(RoleAuth.Admin), RoleController.delet);         // admin only

//router.get('/:id', authorize(), selectById);       // all authenticated roles
module.exports = router;

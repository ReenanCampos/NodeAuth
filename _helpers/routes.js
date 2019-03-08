
const express = require('express');
const router = express.Router();
const authorize = require('_helpers/authorize');
const RoleAuth = require('_helpers/role');


//* Controllers
const userCtrl = require('../controllers/users.controller');
const RoleController = require('../controllers/role.controller');

//* Prefixos de Controllers
const ROLE_PREFIX = "/role";





// routes
router.get(ROLE_PREFIX + '/selectAll', RoleController.selectAll);                    // public
router.post(ROLE_PREFIX + '/insert', authorize(RoleAuth.Admin), RoleController.insert);  // admin only
router.post(ROLE_PREFIX + '/update', authorize(RoleAuth.Admin), RoleController.update);  // admin only
router.post(ROLE_PREFIX + '/delet', authorize(RoleAuth.Admin), RoleController.delet);    // admin only

//router.get('/:id', authorize(), selectById);       // all authenticated roles
module.exports = router;

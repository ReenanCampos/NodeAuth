
const moment = require('moment');
moment.locale('pt-BR');
ler db = require('../dbConnection');
const util = require('../util/util');
const Usuario = require('../models/UsuarioModel');
const UsuarioSqlRep = require('../sqlrep/Usuario/UsuarioService');

var UsuarioService = {
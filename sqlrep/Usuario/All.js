



//! Consultas
var SelectAll = require("./SelectAll");
var Login = require("./Login");

//! Operações
var Insert = require("./Insert");
var Update = require("./Update");
var Delet = require("./Delet");



//! UsuarioRole
var InsertRole = require("./UsuarioRole/InsertRole");
var DeletRole = require("./UsuarioRole/DeletRole");


//* Exports
module.exports = {
     Login
    ,SelectAll
    ,Insert
    ,Update
    ,Delet

    ,InsertRole
    ,DeletRole
}


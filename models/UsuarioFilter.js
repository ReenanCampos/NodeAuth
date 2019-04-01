
const moment = require('moment');
moment.locale('pt-BR');

//! Construtor
function UsuarioFilter(entity, validar=false) {
    this.validacao = {valido: false, msgErro: ['Não validado ainda']};
    if(entity != undefined){
        this.id = entity.id;
        this.nome = entity.nome;
        this.usuario = entity.usuario;
        this.email = entity.email;
        this.telefone = entity.telefone;
        this.senha = entity.senha;
        this.dataNascimento = entity.dataNascimento;
        this.ativo = entity.ativo;
        this.bloqueado = entity.bloqueado;
    }

    if(validar) this.validarFiltro(entity);
}

UsuarioFilter.prototype ={
    UsuarioFilter: null
}

UsuarioFilter.new = function(id='', nome, usuario, email, telefone, senha, dataNascimento, ativo, bloqueado){
    return new this(id, nome, usuario, email, telefone, senha, dataNascimento, ativo, bloqueado);
}

//! Getters & Setters
UsuarioFilter.prototype.getId = function(){ return this.id; }
UsuarioFilter.prototype.setId = function(id){ this.id = id }
UsuarioFilter.prototype.getNome = function(){ return this.nome; }
UsuarioFilter.prototype.setNome = function(nome){ this.nome = nome }
UsuarioFilter.prototype.getUsuario = function(){ return this.usuario; }
UsuarioFilter.prototype.setUsuario = function(usuario){ this.usuario = usuario }
UsuarioFilter.prototype.getEmail = function(){ return this.email; }
UsuarioFilter.prototype.setEmail = function(email){ this.email = email }
UsuarioFilter.prototype.getTelefone = function(){ return this.telefone; }
UsuarioFilter.prototype.setTelefone = function(telefone){ this.telefone = telefone }
UsuarioFilter.prototype.getSenha = function(){ return this.senha; }
UsuarioFilter.prototype.setSenha = function(senha){ this.senha = senha }
UsuarioFilter.prototype.getDataNascimento = function(){ return this.dataNascimento; }
UsuarioFilter.prototype.setDataNascimento = function(dataNascimento){ this.dataNascimento = dataNascimento }
UsuarioFilter.prototype.getAtivo = function(){ return this.ativo; }
UsuarioFilter.prototype.setAtivo = function(ativo){ this.ativo = ativo }
UsuarioFilter.prototype.getBloqueado = function(){ return this.bloqueado; }
UsuarioFilter.prototype.setBloqueado = function(bloqueado){ this.bloqueado = bloqueado }

//! Validadores
UsuarioFilter.prototype.validarFiltro = function(filter) {
    var valido = true;
    var msgErro = [];

    var keyNames = Object.keys(filter);
    
    for(var i in keyNames){
        if(keyNames[i] != "id"
        && keyNames[i] != "nome"
        && keyNames[i] != "usuario"
        && keyNames[i] != "email"
        && keyNames[i] != "telefone"
        && keyNames[i] != "senha"
        && keyNames[i] != "dataNascimento"
        && keyNames[i] != "ativo"
        && keyNames[i] != "bloqueado"){
            msgErro.push("Campo [" + keyNames[i] + "] INVÁLIDO para esse filtro");
        }
    }
    if(msgErro.length == 0){
        //* Vazio / Undefined
        if(this === undefined){
            msgErro.push("Entidade inválida");
        }
    }

    if(msgErro.length > 0) valido = false;
    this.validacao = {valido: valido, msgErro: msgErro};
};

//! Export
module.exports = UsuarioFilter;
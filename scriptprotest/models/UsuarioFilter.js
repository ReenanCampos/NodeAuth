
const moment = require('moment');
moment.locale('pt-BR');

//! Construtor
function UsuarioFilter(entity, validar=false) {
    this.validacao = {valido: false, msgErro: ['Não validado ainda']};
    this.id = '';
    this.nome = '';
    this.batata = '';
    this.email = '';
    this.telefone = '';
    this.senha = '';
    this.dataNascimento = moment('1970-01-01 00:00:01');
    this.ativo = 0;
    this.bloqueado = 0;
    this.roles = [];

    if(entity != undefined){
        this.id = entity.id || '';
        this.nome = entity.nome || '';
        this.batata = entity.batata || '';
        this.email = entity.email || '';
        this.telefone = entity.telefone || '';
        this.senha = entity.senha || '';
        this.dataNascimento = entity.dataNascimento || moment('1970-01-01 00:00:01');
        this.ativo = entity.ativo || 0;
        this.bloqueado = entity.bloqueado || 0;
    }

    if(validar) this.validarEntidade();
}

UsuarioFilter.prototype ={
    UsuarioFilter: null
}

UsuarioFilter.new = function(id='', nome, batata, email, telefone, senha, dataNascimento, ativo, bloqueado){
    return new this(id, nome, batata, email, telefone, senha, dataNascimento, ativo, bloqueado);
}

//! Getters & Setters
UsuarioFilter.protoype.getId = function(){ return this.id; }
UsuarioFilter.protoype.setId = function(id){ this.id = id }
UsuarioFilter.protoype.getNome = function(){ return this.nome; }
UsuarioFilter.protoype.setNome = function(nome){ this.nome = nome }
UsuarioFilter.protoype.getBatata = function(){ return this.batata; }
UsuarioFilter.protoype.setBatata = function(batata){ this.batata = batata }
UsuarioFilter.protoype.getEmail = function(){ return this.email; }
UsuarioFilter.protoype.setEmail = function(email){ this.email = email }
UsuarioFilter.protoype.getTelefone = function(){ return this.telefone; }
UsuarioFilter.protoype.setTelefone = function(telefone){ this.telefone = telefone }
UsuarioFilter.protoype.getSenha = function(){ return this.senha; }
UsuarioFilter.protoype.setSenha = function(senha){ this.senha = senha }
UsuarioFilter.protoype.getDataNascimento = function(){ return this.dataNascimento; }
UsuarioFilter.protoype.setDataNascimento = function(dataNascimento){ this.dataNascimento = dataNascimento }
UsuarioFilter.protoype.getAtivo = function(){ return this.ativo; }
UsuarioFilter.protoype.setAtivo = function(ativo){ this.ativo = ativo }
UsuarioFilter.protoype.getBloqueado = function(){ return this.bloqueado; }
UsuarioFilter.protoype.setBloqueado = function(bloqueado){ this.bloqueado = bloqueado }
UsuarioFilter.protoype.getValido = function(){ return this.valido; }
UsuarioFilter.protoype.setValido = function(valido){ this.valido = valido }

//! Export
module.exports = UsuarioFilter;
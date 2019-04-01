
const moment = require('moment');
moment.locale('pt-BR');

//! Construtor
function Usuario(entity, validar=false) {
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

Usuario.prototype ={
    Usuario: null
}

Usuario.new = function(id='', nome, batata, email, telefone, senha, dataNascimento, ativo, bloqueado){
    return new this(id, nome, batata, email, telefone, senha, dataNascimento, ativo, bloqueado);
}

//! Getters & Setters
Usuario.protoype.getId = function(){ return this.id; }
Usuario.protoype.setId = function(id){ this.id = id }
Usuario.protoype.getNome = function(){ return this.nome; }
Usuario.protoype.setNome = function(nome){ this.nome = nome }
Usuario.protoype.getBatata = function(){ return this.batata; }
Usuario.protoype.setBatata = function(batata){ this.batata = batata }
Usuario.protoype.getEmail = function(){ return this.email; }
Usuario.protoype.setEmail = function(email){ this.email = email }
Usuario.protoype.getTelefone = function(){ return this.telefone; }
Usuario.protoype.setTelefone = function(telefone){ this.telefone = telefone }
Usuario.protoype.getSenha = function(){ return this.senha; }
Usuario.protoype.setSenha = function(senha){ this.senha = senha }
Usuario.protoype.getDataNascimento = function(){ return this.dataNascimento; }
Usuario.protoype.setDataNascimento = function(dataNascimento){ this.dataNascimento = dataNascimento }
Usuario.protoype.getAtivo = function(){ return this.ativo; }
Usuario.protoype.setAtivo = function(ativo){ this.ativo = ativo }
Usuario.protoype.getBloqueado = function(){ return this.bloqueado; }
Usuario.protoype.setBloqueado = function(bloqueado){ this.bloqueado = bloqueado }
Usuario.protoype.getValido = function(){ return this.valido; }
Usuario.protoype.setValido = function(valido){ this.valido = valido }

//! Úteis
Usuario.prototype.equals = function(other){
    return other.getId() == this.getId()
        && other.getNome() == this.getNome()
        && other.getBatata() == this.getBatata()
        && other.getEmail() == this.getEmail()
        && other.getTelefone() == this.getTelefone()
        && other.getSenha() == this.getSenha()
        && other.getDataNascimento() == this.getDataNascimento()
        && other.getAtivo() == this.getAtivo()
        && other.getBloqueado() == this.getBloqueado();
}

//! Validadores
Usuario.prototype.validarEntidade = function(){
    var valido = true;
    var msgErro = [];
    
    //* Vazio / Undefined
    if(this === undefined){ msgErro.push('Entidade Inválida'); }
    if(this.id === undefined){ msgErro.push('Campo Id não pode ser vazio !'); }
    if(this.nome === undefined){ msgErro.push('Campo Nome não pode ser vazio !'); }
    if(this.batata === undefined){ msgErro.push('Campo Batata não pode ser vazio !'); }
    if(this.email === undefined){ msgErro.push('Campo Email não pode ser vazio !'); }
    if(this.telefone === undefined){ msgErro.push('Campo Telefone não pode ser vazio !'); }
    if(this.senha === undefined){ msgErro.push('Campo Senha não pode ser vazio !'); }
    if(this.dataNascimento === undefined){ msgErro.push('Campo DataNascimento não pode ser vazio !'); }
    if(this.ativo === undefined){ msgErro.push('Campo Ativo não pode ser vazio !'); }
    if(this.bloqueado === undefined){ msgErro.push('Campo Bloqueado não pode ser vazio !'); }
    
    if(this.id.length < 3){ msgErro.push('Campo Id possui menos de 3 caracteres !'); }
    if(this.nome.length < 3){ msgErro.push('Campo Nome possui menos de 3 caracteres !'); }
    if(this.batata.length < 3){ msgErro.push('Campo Batata possui menos de 3 caracteres !'); }
    if(this.email.length < 3){ msgErro.push('Campo Email possui menos de 3 caracteres !'); }
    if(this.telefone.length < 3){ msgErro.push('Campo Telefone possui menos de 3 caracteres !'); }
    if(this.senha.length < 3){ msgErro.push('Campo Senha possui menos de 3 caracteres !'); }
    if(this.dataNascimento.length < 3){ msgErro.push('Campo DataNascimento possui menos de 3 caracteres !'); }
    if(this.ativo.length < 3){ msgErro.push('Campo Ativo possui menos de 3 caracteres !'); }
    if(this.bloqueado.length < 3){ msgErro.push('Campo Bloqueado possui menos de 3 caracteres !'); }
    
    if(msgErro.length > 0) valido = false;
    this.validacao = {valido: valido, msgErro: msgErro};
};

Usuario.prototype.validarEntidadeInsert = function(){
    
    var valido = true;
    var msgErro = [];
    
    //TODO Código de validação para INSERT
    
    if(msgErro.length > 0) valido = false;
    this.validacao.valido = valido;
    this.validacao.msgErro = this.validacao.msgErro.concat(msgErro)
}
Usuario.prototype.validarEntidadeUpdate = function(){
    
    var valido = true;
    var msgErro = [];
    
    //TODO Código de validação para UPDATE
    
    if(msgErro.length > 0) valido = false;
    this.validacao.valido = valido;
    this.validacao.msgErro = this.validacao.msgErro.concat(msgErro)
}
Usuario.prototype.validarEntidadeDelet = function(){
    
    var valido = true;
    var msgErro = [];
    
    //TODO Código de validação para DELET
    
    if(msgErro.length > 0) valido = false;
    this.validacao.valido = valido;
    this.validacao.msgErro = this.validacao.msgErro.concat(msgErro)
}
//! Export
module.exports = Usuario;
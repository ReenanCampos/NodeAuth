
const moment = require('moment');
moment.locale('pt-BR');

//! Construtor
function UsuarioLoginHistorico(entity, validar=false) {
    this.validacao = {valido: false, msgErro: ['Não validado ainda']};
    this.id = 0; 
    this.idUsuario = ''; 
    this.dataLogin = ''; 
    this.ip = ''; 
    this.nomeDispositivo = ''; 
    this.dispositivo = '';

    if(entity != undefined){
        this.id = entity.id || 0;
        this.idUsuario = entity.idUsuario || '';
        this.dataLogin = entity.dataLogin || '';
        this.ip = entity.ip || '';
        this.nomeDispositivo = entity.nomeDispositivo || '';
        this.dispositivo = entity.dispositivo || '';
    }

    if(validar) this.validarEntidade();
}

UsuarioLoginHistorico.prototype ={
    UsuarioLoginHistorico: null
}

UsuarioLoginHistorico.new = function(id=0, idUsuario, dataLogin, ip, nomeDispositivo, dispositivo){
    return new this(id, idUsuario, dataLogin, ip, nomeDispositivo, dispositivo);
}

//! Getters & Setters
UsuarioLoginHistorico.prototype.getId = function(){ return this.id; }
UsuarioLoginHistorico.prototype.setId = function(id){ this.id = id }
UsuarioLoginHistorico.prototype.getIdUsuario = function(){ return this.idUsuario; }
UsuarioLoginHistorico.prototype.setIdUsuario = function(idUsuario){ this.idUsuario = idUsuario }
UsuarioLoginHistorico.prototype.getDataLogin = function(){ return this.dataLogin; }
UsuarioLoginHistorico.prototype.setDataLogin = function(dataLogin){ this.dataLogin = dataLogin }
UsuarioLoginHistorico.prototype.getIp = function(){ return this.ip; }
UsuarioLoginHistorico.prototype.setIp = function(ip){ this.ip = ip }
UsuarioLoginHistorico.prototype.getNomeDispositivo = function(){ return this.nomeDispositivo; }
UsuarioLoginHistorico.prototype.setNomeDispositivo = function(nomeDispositivo){ this.nomeDispositivo = nomeDispositivo }
UsuarioLoginHistorico.prototype.getDispositivo = function(){ return this.dispositivo; }
UsuarioLoginHistorico.prototype.setDispositivo = function(dispositivo){ this.dispositivo = dispositivo }
UsuarioLoginHistorico.prototype.getValido = function(){ return this.valido; }
UsuarioLoginHistorico.prototype.setValido = function(valido){ this.valido = valido }

//! Úteis
UsuarioLoginHistorico.prototype.equals = function(other){
    return other.getId() == this.getId()
        && other.getIdUsuario() == this.getIdUsuario()
        && other.getDataLogin() == this.getDataLogin()
        && other.getIp() == this.getIp()
        && other.getNomeDispositivo() == this.getNomeDispositivo()
        && other.getDispositivo() == this.getDispositivo();
}

//! Validadores
UsuarioLoginHistorico.prototype.validarEntidade = function(){
    var valido = true;
    var msgErro = [];
    
    //* Vazio / Undefined
    if(this === undefined){ msgErro.push('Entidade Inválida'); }
    if(this.id === undefined){ msgErro.push('Campo Id não pode ser vazio !'); }
    if(this.idUsuario === undefined){ msgErro.push('Campo IdUsuario não pode ser vazio !'); }
    if(this.dataLogin === undefined){ msgErro.push('Campo DataLogin não pode ser vazio !'); }
    if(this.ip === undefined){ msgErro.push('Campo Ip não pode ser vazio !'); }
    if(this.nomeDispositivo === undefined){ msgErro.push('Campo NomeDispositivo não pode ser vazio !'); }
    if(this.dispositivo === undefined){ msgErro.push('Campo Dispositivo não pode ser vazio !'); }
    
    if(this.id.length < 3){ msgErro.push('Campo Id possui menos de 3 caracteres !'); }
    if(this.idUsuario.length < 3){ msgErro.push('Campo IdUsuario possui menos de 3 caracteres !'); }
    if(this.dataLogin.length < 3){ msgErro.push('Campo DataLogin possui menos de 3 caracteres !'); }
    if(this.ip.length < 3){ msgErro.push('Campo Ip possui menos de 3 caracteres !'); }
    if(this.nomeDispositivo.length < 3){ msgErro.push('Campo NomeDispositivo possui menos de 3 caracteres !'); }
    if(this.dispositivo.length < 3){ msgErro.push('Campo Dispositivo possui menos de 3 caracteres !'); }
    
    if(msgErro.length > 0) valido = false;
    this.validacao = {valido: valido, msgErro: msgErro};
};

UsuarioLoginHistorico.prototype.validarEntidadeInsert = function(){
    
    var valido = true;
    var msgErro = [];
    
    //TODO Código de validação para INSERT
    
    if(msgErro.length > 0) valido = false;
    this.validacao.valido = valido;
    this.validacao.msgErro = this.validacao.msgErro.concat(msgErro)
}
UsuarioLoginHistorico.prototype.validarEntidadeUpdate = function(){
    
    var valido = true;
    var msgErro = [];
    
    //TODO Código de validação para UPDATE
    
    if(msgErro.length > 0) valido = false;
    this.validacao.valido = valido;
    this.validacao.msgErro = this.validacao.msgErro.concat(msgErro)
}
UsuarioLoginHistorico.prototype.validarEntidadeDelet = function(){
    
    var valido = true;
    var msgErro = [];
    
    //TODO Código de validação para DELET
    
    if(msgErro.length > 0) valido = false;
    this.validacao.valido = valido;
    this.validacao.msgErro = this.validacao.msgErro.concat(msgErro)
}
//! Export
module.exports = UsuarioLoginHistorico;
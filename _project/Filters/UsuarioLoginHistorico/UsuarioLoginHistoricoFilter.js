
const moment = require('moment');
moment.locale('pt-BR');

//! Construtor
function UsuarioLoginHistoricoFilter(entity, validar=false) {
    this.validacao = {valido: false, msgErro: ['Não validado ainda']};

    if(entity != undefined){
        this.id = entity.id || 0;
        this.idUsuario = entity.idUsuario || '';
        this.dataLogin = entity.dataLogin || '';
        this.ip = entity.ip || '';
        this.nomeDispositivo = entity.nomeDispositivo || '';
        this.dispositivo = entity.dispositivo || '';
    }

    if(validar) this.validarFiltro(entity);
}

UsuarioLoginHistoricoFilter.prototype ={
    UsuarioLoginHistoricoFilter: null
}

UsuarioLoginHistoricoFilter.new = function(id=0, idUsuario, dataLogin, ip, nomeDispositivo, dispositivo){
    return new this(id, idUsuario, dataLogin, ip, nomeDispositivo, dispositivo);
}

//! Getters & Setters
UsuarioLoginHistoricoFilter.prototype.getId = function(){ return this.id; }
UsuarioLoginHistoricoFilter.prototype.setId = function(id){ this.id = id }
UsuarioLoginHistoricoFilter.prototype.getIdUsuario = function(){ return this.idUsuario; }
UsuarioLoginHistoricoFilter.prototype.setIdUsuario = function(idUsuario){ this.idUsuario = idUsuario }
UsuarioLoginHistoricoFilter.prototype.getDataLogin = function(){ return this.dataLogin; }
UsuarioLoginHistoricoFilter.prototype.setDataLogin = function(dataLogin){ this.dataLogin = dataLogin }
UsuarioLoginHistoricoFilter.prototype.getIp = function(){ return this.ip; }
UsuarioLoginHistoricoFilter.prototype.setIp = function(ip){ this.ip = ip }
UsuarioLoginHistoricoFilter.prototype.getNomeDispositivo = function(){ return this.nomeDispositivo; }
UsuarioLoginHistoricoFilter.prototype.setNomeDispositivo = function(nomeDispositivo){ this.nomeDispositivo = nomeDispositivo }
UsuarioLoginHistoricoFilter.prototype.getDispositivo = function(){ return this.dispositivo; }
UsuarioLoginHistoricoFilter.prototype.setDispositivo = function(dispositivo){ this.dispositivo = dispositivo }

//! Validadores
UsuarioLoginHistoricoFilter.prototype.validarFiltro = function(filter) {
    var valido = true;
    var msgErro = [];
    var keyNames = Object.keys(filter);
    
    for(var i in keyNames){
        if(keyNames[i] != 'id'
        && keyNames[i] != 'idUsuario'
        && keyNames[i] != 'dataLogin'
        && keyNames[i] != 'ip'
        && keyNames[i] != 'nomeDispositivo'
        && keyNames[i] != 'dispositivo'){
            msgErro.push('Campo [' + keyNames[i] + '] inválido para esse filtro');
        }
    }
        if(msgErro.length == 0){
        //* Vazio / Undefined
        if(this === undefined){
            msgErro.push('Entidade inválida');
        }
    }
    
    if(msgErro.length > 0) valido = false;
    this.validacao = {valido: valido, msgErro: msgErro};
};

//! Export
module.exports = UsuarioLoginHistoricoFilter;
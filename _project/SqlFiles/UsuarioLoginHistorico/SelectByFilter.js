
const util = require('../../../util/util');
const moment = require('moment');

module.exports = {
    SelectByFilter: function SelectAll(filter){
        var statement = '';
        statement += 'SELECT';
        statement += ' id';
        statement += ' ,idUsuario';
        statement += ' ,dataLogin';
        statement += ' ,ip';
        statement += ' ,nomeDispositivo';
        statement += ' ,dispositivo';
        statement += ' FROM Usuario';
        
        if(filter != undefined){
            let whereUsado = false, usarAnd = false;
            if(!util.isUndefinedOrEmpty(filter.id)){
                if(!whereUsado){ statement += ' WHERE'; whereUsado = true; }
                statement += ' Usuario.id = ' + filter.id;
                usarAnd = true;
            }
            if(!util.isUndefinedOrEmpty(filter.idUsuario)){
                if(!whereUsado){ statement += ' WHERE'; whereUsado = true; }
                if(usarAnd){ statement += ' AND'; }
                statement += " UsuarioLoginHistorico.idUsuario like '%" + filter.idUsuario + "%'";
                usarAnd = true;
            }
            if(!util.isUndefinedOrEmpty(filter.dataLogin)){
                if(!whereUsado){ statement += ' WHERE'; whereUsado = true; }
                if(usarAnd){ statement += ' AND'; }
                statement += " UsuarioLoginHistorico.dataLogin = " + filter.dataLogin;
                statement += " DATE_FORMAT(UsuarioLoginHistorico.dataLogin, '%d-%m-%Y') = DATE_FORMAT('" + moment(filter.dataLogin).format("YYYY/MM/DD") + "', '%d-%m-%Y')";
                usarAnd = true;
            }
            if(!util.isUndefinedOrEmpty(filter.ip)){
                if(!whereUsado){ statement += ' WHERE'; whereUsado = true; }
                if(usarAnd){ statement += ' AND'; }
                statement += " UsuarioLoginHistorico.ip like '%" + filter.ip + "%'";
                usarAnd = true;
            }
            if(!util.isUndefinedOrEmpty(filter.nomeDispositivo)){
                if(!whereUsado){ statement += ' WHERE'; whereUsado = true; }
                if(usarAnd){ statement += ' AND'; }
                statement += " UsuarioLoginHistorico.nomeDispositivo like '%" + filter.nomeDispositivo + "%'";
                usarAnd = true;
            }
            if(!util.isUndefinedOrEmpty(filter.dispositivo)){
                if(!whereUsado){ statement += ' WHERE'; whereUsado = true; }
                if(usarAnd){ statement += ' AND'; }
                statement += " UsuarioLoginHistorico.dispositivo like '%" + filter.dispositivo + "%'";
                usarAnd = true;
            }
        }
        return statement;
    }
};

const util = require('../../util/util');
const moment = require('moment');

module.exports = {
    SelectByFilter: function SelectAll(filter){
        var statement = '';
        statement += 'SELECT';
        statement += ' id';
        statement += ' ,nome';
        statement += ' ,usuario';
        statement += ' ,email';
        statement += ' ,telefone';
        statement += ' ,senha';
        statement += ' ,dataNascimento';
        statement += ' ,ativo';
        statement += ' ,bloqueado';
        statement += ' FROM Usuario';
        
        if(filter != undefined){
            let whereUsado = false, usarAnd = false;
            if(!util.isUndefinedOrEmpty(filter.id)){
                if(!whereUsado){ statement += ' WHERE'; whereUsado = true; }
                statement += ' Usuario.id = ' + filter.id;
                usarAnd = true;
            }
            if(!util.isUndefinedOrEmpty(filter.nome)){
                if(!whereUsado){ statement += ' WHERE'; whereUsado = true; }
                if(usarAnd){ statement += ' AND'; }
                statement += " Usuario.nome like '%" + filter.nome + "%'";
                usarAnd = true;
            }
            if(!util.isUndefinedOrEmpty(filter.usuario)){
                if(!whereUsado){ statement += ' WHERE'; whereUsado = true; }
                if(usarAnd){ statement += ' AND'; }
                statement += " Usuario.usuario like '%" + filter.usuario + "%'";
                usarAnd = true;
            }
            if(!util.isUndefinedOrEmpty(filter.email)){
                if(!whereUsado){ statement += ' WHERE'; whereUsado = true; }
                if(usarAnd){ statement += ' AND'; }
                statement += " Usuario.email like '%" + filter.email + "%'";
                usarAnd = true;
            }
            if(!util.isUndefinedOrEmpty(filter.telefone)){
                if(!whereUsado){ statement += ' WHERE'; whereUsado = true; }
                if(usarAnd){ statement += ' AND'; }
                statement += " Usuario.telefone like '%" + filter.telefone + "%'";
                usarAnd = true;
            }
            if(!util.isUndefinedOrEmpty(filter.senha)){
                if(!whereUsado){ statement += ' WHERE'; whereUsado = true; }
                if(usarAnd){ statement += ' AND'; }
                statement += " Usuario.senha like '%" + filter.senha + "%'";
                usarAnd = true;
            }
            if(!util.isUndefinedOrEmpty(filter.dataNascimento)){
                if(!whereUsado){ statement += ' WHERE'; whereUsado = true; }
                if(usarAnd){ statement += ' AND'; }
                statement += " Usuario.dataNascimento = " + filter.dataNascimento;
                statement += " DATE_FORMAT(Usuario.dataNascimento, '%d-%m-%Y') = DATE_FORMAT('" + moment(filter.dataNascimento).format("YYYY/MM/DD") + "', '%d-%m-%Y')";
                usarAnd = true;
            }
            if(!util.isUndefinedOrEmpty(filter.ativo)){
                if(!whereUsado){ statement += ' WHERE'; whereUsado = true; }
                if(usarAnd){ statement += ' AND'; }
                statement += " Usuario.ativo = " + filter.ativo;
                usarAnd = true;
            }
            if(!util.isUndefinedOrEmpty(filter.bloqueado)){
                if(!whereUsado){ statement += ' WHERE'; whereUsado = true; }
                if(usarAnd){ statement += ' AND'; }
                statement += " Usuario.bloqueado = " + filter.bloqueado;
                usarAnd = true;
            }
        }
        return statement;
    }
};
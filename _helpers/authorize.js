
const expressJwt = require('express-jwt');
const { secret } = require('config.json');
const ip = require("ip");
const moment = require("moment");
moment.locale('pt-BR');
const os = require("os");

const segundosLoginToken =  43200; // 12hrs

module.exports = authorize;

function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }
    
    return [
        // authenticate JWT token and attach user to request object (req.user)
        expressJwt({ secret }),
        
        // authorize based on user role
        (req, res, next) => {

            if(!verificaExistencia(req.user)){
                // user's token is not valid
                return res.status(401).json({code: 401, error: 'Unauthorized', message: "Token inválido"});
            }

            if(!verificaIpEHostname(req.user)){
                // user's IP is not the same from origin
                return res.status(401).json({code: 401, error: 'Unauthorized', message: "IP inválido"});
            }

            if(!verificaTempo(req.user)){
                // user's token is expired
                return res.status(401).json({code: 401, error: 'Unauthorized', message: "Token expirado"});
            }

            if (roles.length && !verificaAutorizacao(roles, req.user.roles)) {
                // user's role is not authorized
                return res.status(401).json({code: 401, error: 'Unauthorized', message: "Sem permissão"});
            }

            // authentication and authorization successful
            next();
        }
    ];
}


//! Validadores

function verificaExistencia(user = ""){
    let autenticacao = false;
    if(user === ""){ return autenticacao; }
    if(Object.keys(user).length === 0){ return autenticacao; }
    if(JSON.stringify(user) === '{}') { return autenticacao; }
    
    autenticacao = true;
    return autenticacao;
}

function verificaIpEHostname(user = ""){
    let autenticacao = false;
    if(user.ip === ""){ return autenticacao }

    if(user.ip === ip.address() && user.host === os.hostname()){
        autenticacao = true;
    }

    return autenticacao;
}

function verificaTempo(user = ""){
    let autenticacao = false;

    var dataAtual = new Date();
    var dataLimite = moment(user.createdIn).add(segundosLoginToken, 'seconds').toDate();

    if(moment(dataLimite).isAfter(moment(dataAtual))){
        autenticacao = true;
    }
    
    return autenticacao;
}

function verificaAutorizacao(roles = [], userRoles = []){
    let autoricazao = false;
    for(key in roles){
        for(key2 in userRoles){
            if(roles[key] == userRoles[key2].id){
                autoricazao = true;
                break;
            }
        }
        if(autoricazao === true){
            break;  
        }
    }
    return autoricazao;
}


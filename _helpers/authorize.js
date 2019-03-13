
const expressJwt = require('express-jwt');
const { secret } = require('config.json');
const ip = require("ip");
const date = require('date-and-time');
date.locale('fr')
const os = require("os");

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
            let date = require('date-and-time');
            if(!verificaIpEHostname(req.user)){
                // user's token is not valid
                return res.status(401).json({code: 401, error: 'Unauthorized', message: "IP inválido"});
            }

            if(!verificaAutenticacaoTempo(req.user)){
                // user's token is not valid
                return res.status(401).json({code: 401, error: 'Unauthorized', message: "Token expirado"});
            }

            if(!verificaAutenticacaoExistencia(req.user)){
                // user's token is not valid
                return res.status(401).json({code: 401, error: 'Unauthorized', message: "Token inválido"});
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

function verificaAutenticacaoTempo(user = ""){
    let autenticacao = false;
    if(user === ""){ return autenticacao }
 //TODO ARRUMAR AQUI
    var hoje = new Date();
    console.log(user.expiresIn > hoje);
    console.log(new Date(user.expiresIn));
    console.log(new Date(hoje));
    if(user.expiresIn > hoje){
        autenticacao = true;
    }
    
    return autenticacao;
}

function verificaAutenticacaoExistencia(user = ""){
    let autenticacao = true;
    if(user === ""){ return autenticacao }

    return autenticacao;
}

function verificaIpEHostname(user = ""){
    let autenticacao = true;
    if(user === ""){ return autenticacao }
    if(user.ip === ""){ return autenticacao }

    if(user.ip === ip.address() && user.host === os.hostname()){
        autenticacao = true;
    }

    return autenticacao;
}

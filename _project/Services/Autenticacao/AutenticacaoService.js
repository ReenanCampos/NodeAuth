
const config = require('config.json');
const jwt = require('jsonwebtoken');
const ip = require("ip");
const os = require("os");
const util = require('../../../util/util');
const moment = require("moment");
moment.locale('pt-BR');

let db = require('../../../dbConnection');
const autenticacaoSqlRep = require("../../SqlReps/Autenticacao/All");
const usuarioLoginHistoricoSqlRep = require("../../SqlReps/UsuarioLoginHistorico/UsuarioLoginHistoricoSqlRep");
const UsuarioLoginHistorico = require("../../Models/UsuarioLoginHistorico/UsuarioLoginHistoricoModel");
const Usuario = require("../../Models/Usuario/UsuarioModel");
const nomeAplicacao = "RereNodeJS07032019";

// Dias/Horas/Minutos/Segundos que o token será válido
// 1 dia tem 86400 segundos
// 1 hora tem 3600 segundos
// 1 minuto tem 60 segundos
// 1 segundo tem 1 segundo
const segundosLoginToken = 43200; // 12hrs

var AutenticacaoService = {
    authenticate: function (req, res) {
        username = req.body.username;
        password = req.body.password;
        var results = db.query(
            autenticacaoSqlRep.Login.Login,
            [username, password],
            function (error, results, fields) {

                if (error) { util.newError(res, error.message, 400); return; }

                if (results.length == 0) { util.newError(res, "Usuario ou Senha incorretos !", 400); return; }

                var resultJson = util.convertJson(results);

                let user = new Usuario(resultJson[0]);

                if (user.ativo === 0) { util.newError(res, "Usuario inativado !", 401); return; }
                if (user.bloqueado === 1) { util.newError(res, "Usuario bloqueado !", 401); return; }

                user.roles = [];
                for (var i in resultJson) {
                    var role = {
                        id: resultJson[i].idRole,
                        nome: resultJson[i].nomeRole,
                        descricao: resultJson[i].descricaoRole,
                        ativo: resultJson[i].ativoRole
                    }
                    user.roles.push(role);
                }

                if (user) {
                    var loginHistorico = new UsuarioLoginHistorico();
                    loginHistorico.setIdUsuario(user.id);
                    loginHistorico.setDataLogin(moment().format('YYYY/MM/DD HH:mm:ss'));
                    loginHistorico.setIp(ip.address());
                    loginHistorico.setNomeDispositivo(os.hostname());
                    loginHistorico.setDispositivo(os.type());
                    
                    var results = db.query( usuarioLoginHistoricoSqlRep.Insert.Insert,
                        [loginHistorico.idUsuario, loginHistorico.dataLogin, loginHistorico.ip, loginHistorico.nomeDispositivo, loginHistorico.dispositivo],
                        function (error, results, fields) {

                        if (error) { util.newError(res, "Não foi possível realizar o login, tente novamente mais tarde! ERROR: " + error, 500); return; }
                        
                        const token = jwt.sign({
                            sub: user.id,
                            roles: user.roles,
                            createdIn: new Date(),
                            iss: nomeAplicacao,
                            ip: ip.address(),
                            host: os.hostname(),
                        }, config.secret);
                        const { password, ...userWithoutPassword } = user;
                        res.status(200).json(
                            {
                                status: 200,
                                message: "Sucesso",
                                token: token
                            });
                        
                    });
                };
            });
    },

}

module.exports = AutenticacaoService;

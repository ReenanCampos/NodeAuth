
const autenticacaoService = require('../../Services/Autenticacao/AutenticacaoService');
const util = require('../../../util/util');

var AutenticacaoController = {

    authenticate: function(req, res, next){
        autenticacaoService.authenticate(req, res);
    }

}

module.exports = AutenticacaoController;
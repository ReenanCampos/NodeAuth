

var util = {


    convertJson: function(results) {
        var resultJson = JSON.stringify(results);
        return JSON.parse(resultJson);
    },

    newError: function(res, message, code, data = []) {
        res.status(code).json(
            {
                status: code,
                message: message,
                data: data
            });
    },

    newResposta: function(res, data = [], code = 200, message = "Sucesso") {
        res.status(code).json(
            {
                status: code,
                message: message,
                data: data
            });
    },

    capitalize: function capitalize (str) {
        if (typeof str !== 'string') return ''
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    
}

module.exports = util;

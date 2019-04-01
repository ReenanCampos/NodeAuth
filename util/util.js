

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
    },
    
    isUndefinedOrEmpty: function isUndefinedOrEmpty(obj){
        if(obj === undefined){
            return true;
        }
        if(obj === null){
            return true;
        }
        if(Object.entries(obj).length === 0 
        && obj.constructor === Object){
            return true;
        }
        if(typeof obj == "string"){
            if(obj.trim() == ""){
                return true;
            }
        }
        if(typeof obj == "number"){
            if(obj == 0){
                return true;
            }
        }
        if(typeof obj == "boolean"){
            if(obj != true && obj != false){
                return true;
            }
        }
    
    }
    
}

module.exports = util;

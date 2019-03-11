

var mysql = require('mysql');
port = process.env.PORT || 3306;

if (port === 3306) {
    var connection = mysql.createConnection({
        host     : 'localhost',
        port     : 3306,
        user     : 'root',
        password : 'root', // renan123 / root
        database : 'cmsteste',
        connectionLimit: 1000,
        connectTimeout  : 60 * 60 * 1000,
        aquireTimeout   : 60 * 60 * 1000,
        timeout         : 60 * 60 * 1000
    });
} else {
    //same as above, with live server details
}

connection.connect();

module.exports = connection;


/*
var mysql = require('mysql');

var pool = mysql.createPool({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : 'renan123',
    database : 'cmsteste',
    connectionLimit: 1000,
    connectTimeout  : 60 * 60 * 1000,
    aquireTimeout   : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000
});
   
function getSqlConnection() {
    return pool.getConnection().disposer(function(connection) {
        pool.releaseConnection(connection);
    });
}

//module.exports = getSqlConnection, pool;
exports.pool = pool;

*/
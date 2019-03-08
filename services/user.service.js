const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('_helpers/role');

// users hardcoded for simplicity, store in a db for production applications
const users = [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', roles:[Role.Admin, Role.User]},
    { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', roles: [Role.User] }
];
const nomeAplicacao = "RereNodeJS07032019";

// Dias/Horas/Minutos/Segundos que o token será válido
// 1 dia tem 86400 segundos
// 1 hora tem 3600 segundos
// 1 minuto tem 60 segundos
// 1 segundo tem 1 segundo
const segundosLogin = 43200; // 12hrs

module.exports = {
    authenticate,
    getAll,
    getById
};



async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ 
            sub: user.id, 
            roles: user.roles,
            expiresIn: segundosLogin,
            iss: nomeAplicacao,
            }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

async function getById(id) {
    const user = users.find(u => u.id === parseInt(id));
    if (!user) return;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}


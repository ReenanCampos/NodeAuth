
module.exports = {
Update: `
    UPDATE
        UsuarioLoginHistorico
    SET
         idUsuario = ?
        ,dataLogin = ?
        ,ip = ?
        ,nomeDispositivo = ?
        ,dispositivo = ?
    WHERE
        id = ?;
`}

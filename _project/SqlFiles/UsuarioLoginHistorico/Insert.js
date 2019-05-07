
module.exports = {
Insert: `
    INSERT INTO UsuarioLoginHistorico (
         idUsuario
        ,dataLogin
        ,ip
        ,nomeDispositivo
        ,dispositivo
    ) VALUES (
         ?
        ,?
        ,?
        ,?
        ,?
    );
`}

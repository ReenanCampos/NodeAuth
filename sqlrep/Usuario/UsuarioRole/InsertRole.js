

module.exports = {
InsertRole:`
    INSERT INTO cmsteste.UsuarioRole (
         idUsuario
        ,idRole
        ,dataInclusao
        ,idUsuarioInclusao
    )
    VALUES(
         ?
        ,?
        ,?
        ,?
    );
`}

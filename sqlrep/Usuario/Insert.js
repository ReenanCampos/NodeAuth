

module.exports = {
Insert:`
    INSERT INTO cmsteste.Usuario (
         id
        ,nome
        ,usuario
        ,email
        ,telefone
        ,senha
        ,dataNascimento
        ,ativo
        ,bloqueado
    )
    VALUES(
         ?
        ,?
        ,?
        ,?
        ,?
        ,?
        ,?
        ,?
        ,?
    );
`}

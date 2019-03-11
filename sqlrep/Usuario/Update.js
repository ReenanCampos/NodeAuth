

module.exports = {
Update:`
    UPDATE 
        cmsteste.Usuario
    SET
         nome = ?
        ,usuario = ?
        ,email = ?
        ,telefone = ?
        ,dataNascimento = ?
        ,ativo = ?
        ,bloqueado = ?
    WHERE
        id = ?;
`}

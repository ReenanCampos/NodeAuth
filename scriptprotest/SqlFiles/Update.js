
module.exports = {
Update: `
    UPDATE
        Usuario
    SET
         nome = ?
        ,usuario = ?
        ,email = ?
        ,telefone = ?
        ,senha = ?
        ,dataNascimento = ?
        ,ativo = ?
        ,bloqueado = ?
    WHERE
        id = ?;
`}

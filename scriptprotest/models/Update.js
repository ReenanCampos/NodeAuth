
module.exports = {
Update: `
    UPDATE
        Usuario
    SET
         nome = ?
        ,batata = ?
        ,email = ?
        ,telefone = ?
        ,senha = ?
        ,dataNascimento = ?
        ,ativo = ?
        ,bloqueado = ?
    WHERE
        id = ?;
`}

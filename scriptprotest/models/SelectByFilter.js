
module.exports = {
Select: `
    SELECT
         id
        ,nome = ?
        ,batata = ?
        ,email = ?
        ,telefone = ?
        ,senha = ?
        ,dataNascimento = ?
        ,ativo = ?
        ,bloqueado = ?
    FROM
        Usuario;
`}

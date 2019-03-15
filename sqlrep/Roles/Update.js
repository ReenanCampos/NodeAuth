

module.exports = {
Update:`
    UPDATE 
        Roles
    SET
         nome = ?
        ,descricao = ?
        ,ativo = ?
    WHERE
        id = ?;
`}

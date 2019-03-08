

module.exports = {
Update:`
    UPDATE 
        cmsteste.Roles
    SET
         nome = ?
        ,descricao = ?
        ,ativo = ?
    WHERE
        id = ?;
`}

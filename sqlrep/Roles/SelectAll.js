

module.exports = {
SelectAll:`
    SELECT
         id 
        ,nome
        ,descricao
        ,ativo
    FROM
        cmsteste.Roles
    WHERE
        ativo = 1;
`}



module.exports = {
SelectAll:`
    SELECT
         id 
        ,nome
        ,descricao
        ,ativo
    FROM
        Roles
    WHERE
        ativo = 1;
`}

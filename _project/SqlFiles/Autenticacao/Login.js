

module.exports = {
Login:`
    
SELECT 
     Usuario.id
    ,Usuario.nome
    ,Usuario.usuario
    ,Usuario.email
    ,Usuario.telefone
    ,Usuario.dataNascimento
    ,Usuario.ativo
    ,Usuario.bloqueado

    ,Roles.id idRole
    ,Roles.nome nomeRole
    ,Roles.descricao descricaoRole
    ,Roles.ativo ativoRole

FROM
    Usuario
INNER JOIN
    UsuarioRole UsuarioRole
ON
    UsuarioRole.idUsuario = Usuario.id
INNER JOIN
    Roles Roles
ON
    Roles.id = UsuarioRole.idRole
WHERE
    Usuario.usuario = ?
AND
    Usuario.senha = ?;
    
`}

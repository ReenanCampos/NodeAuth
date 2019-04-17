
module.exports = {
Insert: `
    INSERT INTO usuario (
         id
        ,nome
        ,usuario
        ,email
        ,telefone
        ,senha
        ,dataNascimento
        ,ativo
        ,bloqueado
    ) VALUES (
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

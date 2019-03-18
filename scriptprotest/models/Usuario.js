
    this.nome = '';
    this.id = '';
    this.batata = '';
    this.email = '';
    this.telefone = '';
    this.senha = '';
    this.dataNascimento = moment('1970-01-01 00:00:01');
    this.ativo = 0;
    this.bloqueado = 0;
    this.roles = [];

    if(entity != undefined){
        this.nome = entity.nome || '';
        this.email = entity.email || '';
        this.telefone = entity.telefone || '';
        this.id = entity.id || '';
        this.senha = entity.senha || '';
        this.dataNascimento = entity.dataNascimento || moment('1970-01-01 00:00:01');
        this.bloqueado = entity.bloqueado || 0;
    }
        this.batata = entity.batata || '';
}
        this.ativo = entity.ativo || 0;

    if(validar) this.validarEntidade();
Usuario.prototype ={
}
    Usuario: null
Usuario.new = function(id='', nome, batata, email, telefone, senha, dataNascimento, ativo, bloqueado){
    return new this(id, nome, batata, email, telefone, senha, dataNascimento, ativo, bloqueado);

}
//! Getters & Setters

Usuario.protoype.getId = function(){ return this.id; }
Usuario.protoype.getNome = function(){ return this.nome; }
Usuario.protoype.setNome = function(nome){ this.nome = nome }
Usuario.protoype.getBatata = function(){ return this.batata; }

Usuario.protoype.setBatata = function(batata){ this.batata = batata }
Usuario.protoype.setEmail = function(email){ this.email = email }
Usuario.protoype.setId = function(id){ this.id = id }
Usuario.protoype.getEmail = function(){ return this.email; }
Usuario.protoype.setTelefone = function(telefone){ this.telefone = telefone }
Usuario.protoype.getSenha = function(){ return this.senha; }
Usuario.protoype.getTelefone = function(){ return this.telefone; }
Usuario.protoype.getDataNascimento = function(){ return this.dataNascimento; }
Usuario.protoype.getAtivo = function(){ return this.ativo; }
Usuario.protoype.setSenha = function(senha){ this.senha = senha }
Usuario.protoype.setDataNascimento = function(dataNascimento){ this.dataNascimento = dataNascimento }
Usuario.protoype.getBloqueado = function(){ return this.bloqueado; }
Usuario.protoype.setBloqueado = function(bloqueado){ this.bloqueado = bloqueado }
Usuario.protoype.setAtivo = function(ativo){ this.ativo = ativo }
Usuario.protoype.setValido = function(valido){ this.valido = valido }
Usuario.prototype.equals = function(other){
Usuario.protoype.getValido = function(){ return this.valido; }
    return other.getId() == this.getId()
        && other.getNome() == this.getNome()

        && other.getBatata() == this.getBatata()
//! Úteis
        && other.getEmail() == this.getEmail()
        && other.getTelefone() == this.getTelefone()
        && other.getDataNascimento() == this.getDataNascimento()
}
        && other.getAtivo() == this.getAtivo()
        && other.getBloqueado() == this.getBloqueado();
Usuario.prototype.validarEntidade = function(){
        && other.getSenha() == this.getSenha()
    var valido = true;

//! Validadores
    var msgErro = [];
    //* Vazio / Undefined
    if(this === undefined){ msgErro.push('Entidade Inválida'); }
    if(this.id === undefined){ msgErro.push('Campo Id não pode ser vazio !'); }
    if(this.nome === undefined){ msgErro.push('Campo Nome não pode ser vazio !'); }
    if(this.batata === undefined){ msgErro.push('Campo Batata não pode ser vazio !'); }
    if(this.email === undefined){ msgErro.push('Campo Email não pode ser vazio !'); }
    if(this.telefone === undefined){ msgErro.push('Campo Telefone não pode ser vazio !'); }
    if(this.senha === undefined){ msgErro.push('Campo Senha não pode ser vazio !'); }
    if(this.dataNascimento === undefined){ msgErro.push('Campo DataNascimento não pode ser vazio !'); }
    if(this.ativo === undefined){ msgErro.push('Campo Ativo não pode ser vazio !'); }
    if(this.bloqueado === undefined){ msgErro.push('Campo Bloqueado não pode ser vazio !'); }
    
    if(this.nome.length < 3){ msgErro.push('Campo Nome possui menos de 3 caracteres !'); }
    if(this.id.length < 3){ msgErro.push('Campo Id possui menos de 3 caracteres !'); }
    if(this.batata.length < 3){ msgErro.push('Campo Batata possui menos de 3 caracteres !'); }
    if(this.telefone.length < 3){ msgErro.push('Campo Telefone possui menos de 3 caracteres !'); }
    
    if(this.email.length < 3){ msgErro.push('Campo Email possui menos de 3 caracteres !'); }
    if(this.ativo.length < 3){ msgErro.push('Campo Ativo possui menos de 3 caracteres !'); }
    if(this.dataNascimento.length < 3){ msgErro.push('Campo DataNascimento possui menos de 3 caracteres !'); }
    if(this.bloqueado.length < 3){ msgErro.push('Campo Bloqueado possui menos de 3 caracteres !'); }
    
    if(msgErro.length > 0) valido = false;
    if(this.senha.length < 3){ msgErro.push('Campo Senha possui menos de 3 caracteres !'); }

    this.validacao = {valido: valido, msgErro: msgErro};
};
    
Usuario.prototype.validarEntidadeInsert = function(){
    
    var msgErro = [];
    //TODO Código de validação para INSERT
    var valido = true;
    if(msgErro.length > 0) valido = false;
    this.validacao.valido = valido;
    this.validacao.msgErro = this.validacao.msgErro.concat(msgErro)
Usuario.prototype.validarEntidadeUpdate = function(){
}
    
    var valido = true;
    
    
    var msgErro = [];
    //TODO Código de validação para UPDATE
    this.validacao.valido = valido;
    if(msgErro.length > 0) valido = false;
    
    this.validacao.msgErro = this.validacao.msgErro.concat(msgErro)
}
Usuario.prototype.validarEntidadeDelet = function(){
    
    var msgErro = [];
    var valido = true;
    //TODO Código de validação para DELET
    this.validacao.msgErro = this.validacao.msgErro.concat(msgErro)
    
    if(msgErro.length > 0) valido = false;
    this.validacao.valido = valido;
    
}
//! Export
module.exports = Usuario;
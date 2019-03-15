
//! Construtor
function Usuario(entity, validar=false) {
    this.validacao = {valido: false, msgErro: ['Não validado ainda']};
    this.id = "";
    this.nome = "";
    this.usuario = "";
    this.email = "";
    this.telefone = "";
    this.senha = "";
    this.dataNascimento = new Date();
    this.ativo = 0;
    this.bloqueado = 0;
    this.roles = [];
    
    
    if(entity != undefined){
        this.id = entity.id ||  "";
        this.nome = entity.nome ||  "";
        this.usuario = entity.usuario || "";
        this.email = entity.email ||  "";
        this.telefone = entity.telefone ||  "";
        this.senha = entity.senha ||  "";
        this.dataNascimento = entity.dataNascimento ||  new Date();
        this.ativo = entity.ativo ||  0;
        this.bloqueado = entity.bloqueado ||  0;
        this.roles = entity.roles || [];
    }

    if(validar) this.validarEntidade();
}

Usuario.prototype ={
    Usuario: null
}

Usuario.new = function(id="", nome, usuario, email, telefone, senha, dataNascimento, ativo, bloqueado, roles){
    return new this(id, nome, usuario, email, telefone, senha, dataNascimento, ativo, bloqueado, roles);
}

//! Getter & Setters
Usuario.prototype.getId = function() {
    return this.id;
}
Usuario.prototype.setId= function(id) {
    this.id = id;
}

Usuario.prototype.getNome = function() {
    return this.nome;
}
Usuario.prototype.setNome = function(nome) {
    this.nome = nome;
}

Usuario.prototype.getUsuario = function() {
    return this.usuario;
}
Usuario.prototype.setUsuario = function(usuario) {
    this.usuario = usuario;
}

Usuario.prototype.getEmail = function() {
    return this.email;
}
Usuario.prototype.setEmail= function(email) {
    this.email = email;
}

Usuario.prototype.getTelefone = function() {
    return this.telefone;
}
Usuario.prototype.setTelefone = function(telefone) {
    this.telefone = telefone;
}

Usuario.prototype.getSenha = function() {
    return this.senha;
}
Usuario.prototype.setSenha = function(senha) {
    this.senha = senha;
}

Usuario.prototype.getDataNascimento = function() {
    return this.dataNascimento;
}
Usuario.prototype.setDataNascimento = function(dataNascimento) {
    this.dataNascimento = dataNascimento;
}

Usuario.prototype.getAtivo = function() {
    return this.Ativo;
}
Usuario.prototype.setAtivo= function(ativo) {
    this.ativo = ativo;
}

Usuario.prototype.getBloqueado = function() {
    return this.bloqueado;
}
Usuario.prototype.setBloqueado = function(bloqueado) {
    this.bloqueado = bloqueado;
}


Usuario.prototype.getRoles = function() {
    return this.roles;
}
Usuario.prototype.setRoles = function(roles) {
    this.roles = roles;
}

Usuario.prototype.getValido = function() {
    return this.Valido;
}
Usuario.prototype.setValido= function(valido) {
    this.valido = valido;
}

//! Úteis
Usuario.prototype.equals = function(other) {
    return other.getId() == this.getId()
        && other.getNome() == this.getNome()
        && other.getUsuario() == this.getUsuario()
        && other.getEmail() == this.getEmail()
        && other.getTelefone() == this.getTelefone()
        && other.getSenha() == this.getSenha()
        && other.getDataNascimento() == this.getDataNascimento()
        && other.getAtivo() == this.getAtivo()
        && other.getBloqueado() == this.getBloqueado();
}

Usuario.prototype.fill = function(newFields) {
    for (var field in newFields) {
        if (this.hasOwnProperty(field) && newFields.hasOwnProperty(field)) {
            if (this[field] !== 'undefined') {
                this[field] = newFields[field];
            }
        }
    }
};

//! Validadores
Usuario.prototype.validarEntidade = function() {
    var valido = true;
    var msgErro = [];

    //* Vazio / Undefined
    if(this === undefined){
        msgErro.push("Entidade inválida");
    }
    if(this.id === undefined){
        msgErro.push("Campo Id vazio");
    }
    if(this.nome === undefined){
        msgErro.push("Campo Nome vazio");
    }
    if(this.usuario === undefined){
        msgErro.push("Campo Usuario vazio");
    }
    if(this.email === undefined){
        msgErro.push("Campo Email vazio");
    }
    if(this.telefone === undefined){
        msgErro.push("Campo Telefone vazio");
    }
    if(this.senha === undefined){
        msgErro.push("Campo Senha vazio");
    }
    if(this.dataNascimento === undefined){
        msgErro.push("Campo DataNascimento vazio");
    }
    if(this.ativo === undefined){
        msgErro.push("Campo Ativo vazio");
    }
    if(this.bloqueado === undefined){
        msgErro.push("Campo Bloqueado vazio");
    }

    //* Tamanho minimo
    if(this.id.length < 3){
        msgErro.push("Campo Id possui menos de 3 caracteres");
    }
    if(this.nome.length < 3){
        msgErro.push("Campo Nome possui menos de 3 caracteres");
    }
    if(this.usuario.length < 5){
        msgErro.push("Campo Usuario possui menos de 5 caracteres");
    }
    if(this.email.length < 5){
        msgErro.push("Campo Email possui menos de 5 caracteres");
    }

    if(msgErro.length > 0) valido = false;
    this.validacao = {valido: valido, msgErro: msgErro};
};
Usuario.prototype.validarEntidadeInsert = function() {
    
    var valido = true;
    var msgErro = [];

    //TODO Código de validação para insert

    if(msgErro.length > 0) valido = false;
    this.validacao.valido = valido;
    this.validacao.msgErro = this.validacao.msgErro.concat(msgErro);
};
Usuario.prototype.validarEntidadeUpdate = function() {
    
    var valido = true;
    var msgErro = [];

    //TODO Código de validação para update

    if(msgErro.length > 0) valido = false;
    this.validacao.valido = valido;
    this.validacao.msgErro = this.validacao.msgErro.concat(msgErro);
};
Usuario.prototype.validarEntidadeDelet = function() {
    
    var valido = true;
    var msgErro = [];

    //TODO Código de validação para delet

    if(msgErro.length > 0) valido = false;
    this.validacao.valido = valido;
    this.validacao.msgErro = this.validacao.msgErro.concat(msgErro);
};


//! Export
module.exports = Usuario;

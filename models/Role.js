
//! Construtor
function Role(entity, validar=false) {
    this.validacao = {valido: false, msgErro: ["Não validado ainda"]};
    this.id  = "";
    this.nome = "";
    this.descricao  = "";
    this.ativo  = 0;
    
    if(entity != undefined){
        this.id  = entity.id  || "";
        this.nome = entity.nome || "";
        this.descricao  = entity.descricao  || "";
        this.ativo  = entity.ativo  || 0;
    }

    if(validar) this.validarEntidade();
}

Role.prototype ={
    role: null
}

Role.new = function(id="", nome, descricao, ativo){
    return new this(id, nome, descricao, ativo);
}

//! Getter & Setters
Role.prototype.getId = function() {
    return this.id;
}
Role.prototype.setId= function(id) {
    this.id = id;
}

Role.prototype.getNome = function() {
    return this.nome;
}
Role.prototype.setNome = function(nome) {
    this.nome = nome;
}

Role.prototype.getDescricao = function() {
    return this.Descricao;
}
Role.prototype.setDescricao= function(descricao) {
    this.descricao = descricao;
}

Role.prototype.getAtivo = function() {
    return this.Ativo;
}
Role.prototype.setAtivo= function(ativo) {
    this.ativo = ativo;
}

Role.prototype.getValido = function() {
    return this.Valido;
}
Role.prototype.setValido= function(valido) {
    this.valido = valido;
}

//! Úteis
Role.prototype.equals = function(other) {
    return other.getId() == this.getId()
        && other.getNome() == this.getNome()
        && other.getDescricao() == this.getDescricao()
        && other.getAtivo() == this.getAtivo();
}

Role.prototype.fill = function(newFields) {
    for (var field in newFields) {
        if (this.hasOwnProperty(field) && newFields.hasOwnProperty(field)) {
            if (this[field] !== 'undefined') {
                this[field] = newFields[field];
            }
        }
    }
};

//! Validadores
Role.prototype.validarEntidade = function() {
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
    if(this.descricao === undefined){
        msgErro.push("Campo Descricao vazio");
    }
    if(this.ativo === undefined){
        msgErro.push("Campo Ativo vazio");
    }

    //* Tamanho minimo
    if(this.id.length < 3){
        msgErro.push("Campo Id possui menos de 3 caracteres");
    }
    if(this.nome.length < 3){
        msgErro.push("Campo Nome possui menos de 3 caracteres");
    }

    if(msgErro.length > 0) valido = false;
    this.validacao = {valido: valido, msgErro: msgErro};
};
Role.prototype.validarEntidadeInsert = function() {
    
    var valido = true;
    var msgErro = [];

    //* Tamanho minimo
    if(this.nome.length < 3){
        msgErro.push("Campo Nome possui menos de 3 caracteres KJKKJK");
    }

    if(msgErro.length > 0) valido = false;
    this.validacao.valido = valido;
    this.validacao.msgErro = this.validacao.msgErro.concat(msgErro);
};
Role.prototype.validarEntidadeUpdate = function() {
    
    var valido = true;
    var msgErro = [];

    //* Tamanho minimo
    if(this.nome.length < 3){
        msgErro.push("Campo Nome possui menos de 3 caracteres KJKKJK");
    }

    if(msgErro.length > 0) valido = false;
    this.validacao.valido = valido;
    this.validacao.msgErro = this.validacao.msgErro.concat(msgErro);
};
Role.prototype.validarEntidadeDelet = function() {
    
    var valido = true;
    var msgErro = [];

    //* Tamanho minimo
    if(this.nome.length < 3){
        msgErro.push("Campo Nome possui menos de 3 caracteres KJKKJK");
    }

    if(msgErro.length > 0) valido = false;
    this.validacao.valido = valido;
    this.validacao.msgErro = this.validacao.msgErro.concat(msgErro);
};


//! Export
module.exports = Role;


//! Construtor
function UsuarioRole(entity, validar=false) {
    this.validacao = {valido: false, msgErro: ["Não validado ainda"]};
    this.id = 0;
    this.idUsuario = "";
    this.idRole = "";
    this.dataInclusao = new Date();
    this.idUsuarioInclusao = "";
    
    if(entity != undefined){

        this.id = entity.id || 0;
        this.idUsuario = entity.idUsuario || "";
        this.idRole = entity.idRole || "";
        this.dataInclusao = entity.dataInclusao || new Date();
        this.idUsuarioInclusao = entity.idUsuarioInclusao ||"";
    }

    if(validar) this.validarEntidade();
}

UsuarioRole.prototype ={
    usuario: null
}

UsuarioRole.new = function(id=0, idUsuario, idRole, dataInclusao, idUsuarioInclusao){
    return new this(id, idUsuario, idRole, dataInclusao, idUsuarioInclusao);
}

//! Getter & Setters
UsuarioRole.prototype.getId = function() {
    return this.id;
}
UsuarioRole.prototype.setId= function(id) {
    this.id = id;
}

UsuarioRole.prototype.getIdUsuario = function() {
    return this.idUsuario;
}
UsuarioRole.prototype.setIdUsuario = function(idUsuario) {
    this.idUsuario = idUsuario;
}

UsuarioRole.prototype.getidRole = function() {
    return this.idRole;
}
UsuarioRole.prototype.setidRole = function(idRole) {
    this.idRole = idRole;
}

UsuarioRole.prototype.getDataInclusao = function() {
    return this.dataInclusao;
}
UsuarioRole.prototype.setDataInclusao= function(dataInclusao) {
    this.dataInclusao = dataInclusao;
}

UsuarioRole.prototype.getIdUsuarioInclusao = function() {
    return this.idUsuarioInclusao;
}
UsuarioRole.prototype.setIdUsuarioInclusao = function(idUsuarioInclusao) {
    this.idUsuarioInclusao = idUsuarioInclusao;
}

UsuarioRole.prototype.getValido = function() {
    return this.Valido;
}
UsuarioRole.prototype.setValido= function(valido) {
    this.valido = valido;
}

//! Úteis
UsuarioRole.prototype.equals = function(other) {
    return other.getId() == this.getId()
        && other.getNome() == this.getNome()
        && other.getIdUsuario() == this.getIdUsuario()
        && other.getidRole() == this.getidRole()
        && other.getDataInclusao() == this.getDataInclusao()
        && other.getUsuarioInclusao() == this.getUsuarioInclusao();
}

UsuarioRole.prototype.fill = function(newFields) {
    for (var field in newFields) {
        if (this.hasOwnProperty(field) && newFields.hasOwnProperty(field)) {
            if (this[field] !== 'undefined') {
                this[field] = newFields[field];
            }
        }
    }
};

//! Validadores
UsuarioRole.prototype.validarEntidade = function() {
    var valido = true;
    var msgErro = [];

    //* Vazio / Undefined
    if(this === undefined){
        msgErro.push("Entidade inválida");
    }
    if(this.idUsuario === undefined){
        msgErro.push("Campo idUsuario vazio");
    }
    if(this.idRole === undefined){
        msgErro.push("Campo idRole vazio");
    }
    if(this.dataInclusao === undefined){
        this.dataInclusao = new Date();
    }
    if(this.idUsuarioInclusao === undefined){
        msgErro.push("Campo idUsuarioInclusao vazio");
    }

    if(msgErro.length > 0) valido = false;
    this.validacao = {valido: valido, msgErro: msgErro};
};
UsuarioRole.prototype.validarEntidadeInsert = function() {
    
    var valido = true;
    var msgErro = [];

    //TODO Código de validação para insert

    if(msgErro.length > 0) valido = false;
    this.validacao.valido = valido;
    this.validacao.msgErro = this.validacao.msgErro.concat(msgErro);
};
UsuarioRole.prototype.validarEntidadeDelet = function() {
    
    var valido = true;
    var msgErro = [];

    //TODO Código de validação para delet

    if(msgErro.length > 0) valido = false;
    this.validacao.valido = valido;
    this.validacao.msgErro = this.validacao.msgErro.concat(msgErro);
};


//! Export
module.exports = UsuarioRole;

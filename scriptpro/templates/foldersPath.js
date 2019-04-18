
var chalk = require("chalk");

var foldersPath = {

    generatePath: function(){
        var objFinal = {};
        for(fullpath in newFilesFolders){
            let numeroSlash = (newFilesFolders[fullpath].match(/\//g) || []).length;
            let posicaoSlashAnterior = 0;
            let caminho = newFilesFolders[fullpath];
            for(var i=0; i<numeroSlash; i++){
                let slashAtual = caminho.indexOf("/");
                let printar = caminho.substr(0, slashAtual);
                //console.log(gerarArvore(i) + printar);
                if(objFinal[printar] == undefined){
                    objFinal[printar] = [];
                }

                caminho = caminho.substr(slashAtual+1, caminho.length);
        
                if(i+1 == numeroSlash){
                    objFinal[printar].push(caminho);
                }
            }
        }

        printarArvore(objFinal);
    }

}

function gerarArvore(i){
    let charPrintar = "->";
    var retorno = "";
    for(let i2=0; i2<i; i2++){
      retorno += "  ";
    }
    return retorno;
}

function printarArvore(objArvore){
    if(objArvore == undefined) return;
    if(objArvore == null) return;
    var cont=0;
    var charLateralEsquerdaPasta= "├";
    var charLateralEsquerdaArquivo= "│";
    console.log("\n\nPastas e Arquivos gerados:\n");
    console.log(chalk.blueBright("/home/renancampos/ReactPratica/nodeauth/_project"));
    for (var property in objArvore) {
        if(property != null){
            
            if(cont+1 == Object.size(objArvore)){
                charLateralEsquerdaArquivo = " ";
                charLateralEsquerdaPasta = "└";
            }

            if(objArvore[property].length != 0){
                console.log(chalk.blueBright("  "+charLateralEsquerdaPasta+"─┬ ") + chalk.yellowBright(property));
            }else{
                console.log(chalk.blueBright("  "+charLateralEsquerdaPasta+"── ") + chalk.yellowBright(property));
            }

            if(objArvore[property] != []){
                for(let i=0; i<objArvore[property].length; i++){
                    if(objArvore[property].length == 1){
                        console.log(chalk.blueBright("  "+charLateralEsquerdaArquivo+" └── ") + chalk.greenBright(objArvore[property][i]));
                        break;
                    }
                    if(i+1 != objArvore[property].length){
                        console.log(chalk.blueBright("  "+charLateralEsquerdaArquivo+" ├── ") + chalk.greenBright(objArvore[property][i]));
                    }else{
                        console.log(chalk.blueBright("  "+charLateralEsquerdaArquivo+" └── ") + chalk.greenBright(objArvore[property][i]));
                    }
                }
            }
            //console.log(gerarArvore((espacosContados)/2) + "│");
        }
        cont++;
    }
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

module.exports = foldersPath;

/*
└─┬ inquirer@6.2.2 
├── ansi-escapes@3.2.0 
├─┬ chalk@2.4.2 
│ ├─┬ ansi-styles@3.2.1 
│ │ └─┬ color-convert@1.9.3 
│ │   └── color-name@1.1.3 
│ ├── escape-string-regexp@1.0.5 
│ └─┬ supports-color@5.5.0 
│   └── has-flag@3.0.0 
├─┬ cli-cursor@2.1.0 
│ └─┬ restore-cursor@2.0.0 
│   ├─┬ onetime@2.0.1 
│   │ └── mimic-fn@1.2.0 
│   └── signal-exit@3.0.2 
*/


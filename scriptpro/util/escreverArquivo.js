


var escreverArquivo = {

    escreverArquivo: function escreverArquivo(str = ""){
        //sleep(15);
        if(!arquivoResetado){
            fs.open(basePath + folder + filename, "w", function(err) {
                if(err) {
                    return console.log(err);
                }
            
                console.log("The file has been cleaned");
            }); 
            arquivoResetado = true;
        }
    
        fs.appendFile(basePath + folder + filename, "\n" + str , function(err) {
            if(err) {
                return console.log(err);
            }
        }); 
        
    }

}


//Verif se esta tudo ok
document.addEventListener('DOMContentLoaded', function(){
    console.log("Ok");

    //mostrarErro()
    document.getElementById("btn27").onclick = erroNome;
    
});

//Verif se há texto na caixa
function textoValido(participante2){
    if (participante2 == null || participante2 == "" || participante2.lenght < 1) {
        return false;
    }else{
        return true;
    }
}

//Mostrar caixa de erro caso nao tiver texto
function mostrarErro(){
    var html = "";
    html += '<div class="alert alert-danger" role="alert">';
    html += 'Por favor, insira um dado válido!';
    html += '</div>';

    document.getElementById('erro_Cparticipante2').innerHTML = html;
}

//Limpar caixa de erro 
function limparErro(){
    document.getElementById('erro_Cparticipante2').innerHTML = "";  
}

//Verificar erro nome
function erroNome(){
    var conteudoNome = document.getElementById('participante2').value;
    if (!textoValido(conteudoNome)) {
        mostrarErro();
        return;
    }

    limparErro();

    cadastrarNome();

    cadastrarSala();

    cadastrarLotacao();

    cadastrarCafe();

    cadastrarNaSala();

    cadastrarNoCafe();

    trocaDeSala();

    mostrarParticipante();
}

let nome = [];
let salas = [];
let cafe = [];
let cand_salas = [];
let qtd_sala = [];
let qtd_cafe = [];
let lot_salas = [];
let cand_cafe = [];
let contador_pessoa;


//Puxar JSON e transformar em array NOME
function cadastrarNome(){
    let contador = 0
    let localStorageNome = JSON.parse(localStorage.getItem('nome'));
    while (nome.length < localStorageNome.length) {
        nome.push(localStorageNome[contador].texto)
        contador++
    }
    //Consultar pessoa cadastrada
    let consulta_pessoa = document.getElementById('participante2').value
    contador_pessoa = 0
    while (nome[contador_pessoa].toUpperCase() != consulta_pessoa.toUpperCase()) {
        contador_pessoa++   
    }
    console.log(contador_pessoa)
};

//Puxar JSON e transformar em array SALA
function cadastrarSala(){
    let contador = 0
    let localStorageSalas = JSON.parse(localStorage.getItem('salas'));
    while (salas.length < localStorageSalas.length) {
        salas.push(localStorageSalas[contador].texto)
        contador++
    }
}

//Puxar JSON e transformar em array LOTAÇÃO
function cadastrarLotacao(){
    let contador = 0
    let localStorageSalas = JSON.parse(localStorage.getItem('salas'));
    while (lot_salas.length < localStorageSalas.length) {
        lot_salas.push(localStorageSalas[contador].lotacao)
        contador++
    }
}

function cadastrarCafe(){
    let localStorageCafe = JSON.parse(localStorage.getItem('cafe'));
    cafe.push(localStorageCafe[0].cafe1)
    cafe.push(localStorageCafe[0].cafe2)
}

function cadastrarNaSala(){
    //Diferença de 1 por sala
    let contador = 0
    while (cand_salas.length < nome.length) {
        if (contador < salas.length) {
            
                //Contador de pessoas por sala
                let contador1 = 0
                let contador2 = 0
                let contador3 = 0
                qtd_sala = []
                while (contador3 <= salas.length) {
                    while (contador1  < cand_salas.length) {
                        if (cand_salas[contador1] == salas[contador3]) {
                            contador2++
                        }
                        contador1++
                    }
                    if (contador2 != 0) {
                        qtd_sala.push(contador2)
                    }
                    contador3++
                    contador1 = 0
                    contador2 = 0
                }
                if (qtd_sala[contador] < lot_salas[contador]) {
                    cand_salas.push((salas[contador]))
                }
                if (qtd_sala[contador] == null || qtd_sala[contador] == undefined || qtd_sala[contador] == "" ) {
                    cand_salas.push((salas[contador]))
                }
                contador++
        }else{
            contador = 0
        }
        
    }

    cand_salas.sort()

    //Contador de pessoas por sala
    contador1 = 0
    contador2 = 0
    contador3 = 0
    qtd_sala = []
    while (contador3 <= cand_salas.length) {
        while (contador1  < cand_salas.length) {
            if (cand_salas[contador1] == salas[contador3]) {
                contador2++
            }
            contador1++
        }
        if (contador2 != 0) {
            qtd_sala.push(contador2)
        }
        contador3++
        contador1 = 0
        contador2 = 0

        
}

}

function cadastrarNoCafe(){
    //Cadastro no cafe
    contador = 0
    cand_cafe = []

    while (cand_cafe.length < nome.length) {
        metade = Math.round((nome.length)/2)
        while (metade > 0) {
            if (cand_cafe.length  < nome.length) {
                cand_cafe.push(cafe[contador])
                metade--
            }else{
                metade--
            }
        }
        contador++
    }
    
    //Contador de pessoas por cafe
    contador = 0
    let contador1 = 0
    let contador2 = 0
    while (contador <= cand_cafe.length) {
        while (contador1  < cand_cafe.length) {
            if (cand_cafe[contador1] == cafe[contador]) {
                contador2++
            }
            contador1++
        }
        if (contador2 != 0) {
            qtd_cafe.push(contador2)
        }
        contador++
        contador1 = 0
        contador2 = 0
    }

}

function trocaDeSala(){
    //Troca das metades por etapas
    let contador1 = 0
    let contador2 = 0
    let contador3 = 0
    let loop = 0

    while (contador2 <= salas.length) {
        metade = Math.round(qtd_sala[contador2]/2)
        while (metade > 0) {
            loop = 0
            while (cand_salas[contador3] != salas[contador1] ) {
                if (loop < 10) {
                    contador1++
                    loop++
                }if (loop < 2) {
                    contador1 = contador1 - loop
                }else{
                    contador1 = contador1 - (loop-1)
                }
                
                contador3++
            }

            if ((contador1 + 1) < salas.length ) {
                cand_salas[contador3] = salas[contador1 + 1]
            }
            else{
                cand_salas[contador3] = salas[0]
            }
                    
        metade--
        contador3++
    }
        contador1++
        contador2++
    }

    //Contador de pessoas por sala
    contador1 = 0
    contador2 = 0
    contador3 = 0
    qtd_sala = []
    while (contador3 <= cand_salas.length) {
        while (contador1  < cand_salas.length) {
            if (cand_salas[contador1] == salas[contador3]) {
                contador2++
            }
            contador1++
        }
        if (contador2 != 0) {
            qtd_sala.push(contador2)
        }
        contador3++
        contador1 = 0
        contador2 = 0
    }

    //Troca de pessoa por cafe
    contador = 0
    while (contador < cand_salas.length) {
        if (cand_cafe[contador] ==  cafe[0]) {
            cand_cafe[contador] = cafe[1]
        }else{
            cand_cafe[contador] = cafe[0]
        }
        contador++
}

}

//Mostrar Segunda Etapa
function mostrarParticipante(){
    let html = "";
    html += formatarParticipante();

    document.getElementById('segundaEtapa').innerHTML = html;
}

function formatarParticipante(){
    html = "";
    html +='<h2 id="title_petapa">Segunda Etapa</h2>';
    html +='<div class="col-12"> Nome: ';
    html += nome[contador_pessoa];
    html +='</div>';
    html += '<div class="col-12"> Sala: ';
    html += cand_salas[contador_pessoa];
    html +='</div>';
    html += '<div class="col-12"> Café: ';
    html += cand_cafe[contador_pessoa];
    html +='</div>';

    return html;
}

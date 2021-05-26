//Verif se esta tudo ok
document.addEventListener('DOMContentLoaded', function(){
    console.log("Ok");

    //mostrarErro()
    document.getElementById("btn31").onclick = erroNome;
    
});

//Verif se há texto na caixa
function textoValido(sala2){
    if (sala2 == null || sala2 == "" || sala2.lenght < 1) {
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

    document.getElementById('erro_Csala2').innerHTML = html;
}

//Limpar caixa de erro 
function limparErro(){
    document.getElementById('erro_Csala2').innerHTML = "";  
}

//Verificar erro nome
function erroNome(){
    var conteudoNome = document.getElementById('sala2').value;
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
let contador;
let lista_salas = []

//Puxar JSON e transformar em array NOME
function cadastrarNome(){
    let contador = 0
    let localStorageNome = JSON.parse(localStorage.getItem('nome'));
    while (nome.length < localStorageNome.length) {
        nome.push(localStorageNome[contador].texto)
        contador++
    }
    
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

    //Troca das metades por etapas
    contador1 = 0
    contador2 = 0
    contador3 = 0
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

    //Consulta de pessoas por sala SEGUNDA ETAPA
    contador = 0
    contador1 = 0
    lista_salas = []
    let menu = document.getElementById('sala2').value
    while (menu !== salas[contador]) {
        contador++
    }
    while (contador1 < cand_salas.length) {
        if (cand_salas[contador1] == salas[contador]) {
            lista_salas.push(nome[contador1])
        }
        contador1++
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
    html +='<div id="lista_setapa"class="col-12"> Lista: ';
    html += lista_salas;
    html +='</div>';

    return html;
}
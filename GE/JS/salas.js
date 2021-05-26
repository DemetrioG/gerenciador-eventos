
//Verif se há texto na caixa
function textoValido(sala_form, lotacao){
    if (sala_form == null || sala_form == "" || sala_form.lenght < 1 && 
    lotacao == null || lotacao == "" || lotacao.lenght < 1) {
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

    document.getElementById('erro_sala').innerHTML = html;
}

//Limpar caixa de erro 
function limparErro(){
    document.getElementById('erro_sala').innerHTML = "";  
}

//Verificar erro sala
function erroSala(){
    var conteudoSala = document.getElementById('sala_form').value;
    var conteudoLot = document.getElementById('lotacao').value;
    if (!textoValido(conteudoSala, conteudoLot)) {
        mostrarErro();
        return;
    }

    limparErro();

    var texto = conteudoSala;
    var lotacao = conteudoLot;
    

    //JSON
    var recordatorio = {"texto" : texto, "lotacao" : lotacao};

    //Função para verificar se já existe sala
    comprovarSala(recordatorio);
    document.getElementById('sala_form').value = "";
}

//Função para validar se há salas
function salaValido(salaExistente){
    if (salaExistente == null || salaExistente == "" || typeof salaExistente == "undefined" || 
        salaExistente == "undefined") {
        return false;
    }else{
        return true;
    }
}

//Função comprovarNome
function comprovarSala(recordatorio){
    var salaExistente = localStorage.getItem('salas');
    if (!salaValido(salaExistente)) {
        var salas = [];
        salas.push(recordatorio);

        //Salvar
        salvarSala(salas);

    }else{
        var salasRecuperados = JSON.parse(salaExistente);

        //Salvar
        salasRecuperados.push(recordatorio);
        salvarSala(salasRecuperados);
    }

    //Gravar todos os dados
    mostrarSalas();

}

//Função salvarSala
function salvarSala(salas){
    var salaJSON = JSON.stringify(salas);
    localStorage.setItem('salas', salaJSON);

}

//Função mostrarSalas
function mostrarSalas(){
    var html = "";
    var salaExistente = localStorage.getItem('salas');
    if (!salaValido(salaExistente)) {
        html = "Não há nenhuma sala cadastrada."
        document.getElementById('salas').innerHTML = html;

    }else{
        var salasRecuperados = JSON.parse(salaExistente);
        var i = 0
        while (i < salasRecuperados.length) {
            html += formatarSala(salasRecuperados[i])
            i++
        }

        document.getElementById('salas').innerHTML = html;
    }
}

//Função formatarSala
function formatarSala(recordatorio){
    var html = "";
    html += '<div class="col-12">';
    html += recordatorio.texto;
    html += '</div>';
    html += '<br>';
    html += '<div id="exibir_lotacao" class="col-12">';
    html += recordatorio.lotacao;
    html += '</div>';

    return html;
}

//Verif se esta tudo ok
document.addEventListener('DOMContentLoaded', function(){
    console.log("Ok");

    //mostrarErro()
    document.getElementById("btn7").onclick = erroSala;
    
    mostrarSalas();
});

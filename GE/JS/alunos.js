
//Verif se há texto na caixa
function textoValido(nome_form){
    if (nome_form == null || nome_form == "" || nome_form.lenght < 1) {
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

    document.getElementById('erro').innerHTML = html;
}

//Limpar caixa de erro 
function limparErro(){
    document.getElementById('erro').innerHTML = "";  
}

//Verificar erro nome
function erroNome(){
    var conteudoNome = document.getElementById('nome_form').value;
    if (!textoValido(conteudoNome)) {
        mostrarErro();
        return;
    }

    limparErro();

    var texto = conteudoNome;

    //JSON
    var recordatorio = {"texto" : texto};

    //Função para verificar se já existe nome
    comprovarNome(recordatorio);
    document.getElementById('nome_form').value = "";
}

//Função para validar se há nomes
function nomeValido(nomeExistente){
    if (nomeExistente == null || nomeExistente == "" || typeof nomeExistente == "undefined" || 
        nomeExistente == "undefined") {
        return false;
    }else{
        return true;
    }
}

//Função comprovarNome
function comprovarNome(recordatorio){
    var nomeExistente = localStorage.getItem('nome');
    if (!nomeValido(nomeExistente)) {
        var nome = [];
        nome.push(recordatorio);

        //Salvar
        salvarNome(nome);

    }else{
        var nomesRecuperados = JSON.parse(nomeExistente);

        //Salvar
        nomesRecuperados.push(recordatorio);
        salvarNome(nomesRecuperados);
    }

    //Gravar todos os dados
    mostrarNome();

}

//Função salvarNome
function salvarNome(nome){
    var nomeJSON = JSON.stringify(nome);
    localStorage.setItem('nome', nomeJSON);

}

//Função mostrarNome
function mostrarNome(){
    var html = "";
    var nomeExistente = localStorage.getItem('nome');
    if (!nomeValido(nomeExistente)) {
        html = "Não há nenhum nome cadastrado."
        document.getElementById('nome').innerHTML = html;

    }else{
        var nomesRecuperados = JSON.parse(nomeExistente);
        var i = 0
        while (i < nomesRecuperados.length) {
            html += formatarNome(nomesRecuperados[i])
            i++
        }

        document.getElementById('nome').innerHTML = html;
    }
}

//Função formatarNome
function formatarNome(recordatorio){
    var html = "";
    html += '<div class="col-12">';
    html += recordatorio.texto;
    html += '</div>';

    return html;
}


//Verif se esta tudo ok
document.addEventListener('DOMContentLoaded', function(){
    console.log("Ok");

    //mostrarErro()
    document.getElementById("btn4").onclick = erroNome;
    
    mostrarNome();
});




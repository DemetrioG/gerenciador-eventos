
//Verif se há texto na caixa
function textoValido(cafe1, cafe2){
    if (cafe1 == null || cafe1 == "" || cafe1.lenght < 1 
    && cafe2 == null || cafe2 == "" || cafe2.lenght < 1 ) {
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

    document.getElementById('erro_cafe').innerHTML = html;
}

//Limpar caixa de erro 
function limparErro(){
    document.getElementById('erro_cafe').innerHTML = "";  
}

//Verificar erro cafe
function erroCafe(){
    var conteudoCafe1 = document.getElementById('cafe1').value;
    var conteudoCafe2 = document.getElementById('cafe2').value;
    if (!textoValido(conteudoCafe1, conteudoCafe2)) {
        mostrarErro();
        return;
    }

    limparErro();

    var cafe1 = conteudoCafe1;
    var cafe2 = conteudoCafe2;

    //JSON
    var recordatorio = {"cafe1" : cafe1, "cafe2" : cafe2};

    //Função para verificar se já existe cafe
    comprovarCafe(recordatorio);
    document.getElementById('cafe1').value = "";
}

//Função para validar se há cafe
function cafeValido(cafeExistente){
    if (cafeExistente == null || cafeExistente == "" || typeof cafeExistente == "undefined" || 
        cafeExistente == "undefined") {
        return false;
    }else{
        return true;
    }
}

//Função comprovarCafe
function comprovarCafe(recordatorio){
    var cafeExistente = localStorage.getItem('cafe1');
    if (!cafeValido(cafeExistente)) {
        var cafe = [];
        cafe.push(recordatorio);

        //Salvar
        salvarCafe(cafe);

    }else{
        var cafeRecuperados = JSON.parse(cafeExistente);

        //Salvar
        cafeRecuperados.push(recordatorio);
        salvarCafe(cafeRecuperados);
    }

    //Gravar todos os dados
    mostrarCafe();

}

//Função salvarCafe
function salvarCafe(cafe){
    var cafeJSON = JSON.stringify(cafe);
    localStorage.setItem('cafe', cafeJSON);

}

//Função mostrarCafe
function mostrarCafe(){
    var html = "";
    var cafeExistente = localStorage.getItem('cafe');
    if (!cafeValido(cafeExistente)) {
        html = "Não há nenhum espaço de café cadastrado."
        document.getElementById('cafe').innerHTML = html;

    }else{
        var cafeRecuperados = JSON.parse(cafeExistente);
        var i = 0
        while (i < cafeRecuperados.length) {
            html += formatarCafe(cafeRecuperados[i])
            i++
        }

        document.getElementById('cafe').innerHTML = html;
    }
}

//Função formatarNome
function formatarCafe(recordatorio){
    var html = "";
    html += '<div class="col-12">';
    html += recordatorio.cafe1;
    html += '</div>';
    html += '<div class="col-12">';
    html += recordatorio.cafe2;
    html += '</div>';

    return html;
}

//Verif se esta tudo ok
document.addEventListener('DOMContentLoaded', function(){
    console.log("Ok");

    //mostrarErro()
    document.getElementById("btn11").onclick = erroCafe;
    
    mostrarCafe();
});
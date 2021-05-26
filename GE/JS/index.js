// Gerenciador de Eventos

let interacao = require("readline-sync")
let nome = []
let salas = []
let lot_salas = []
let cafe = []
let contador = 1
let ultimo
let cand_salas = []
let cand_cafe =  []
let consulta_pessoa
let menu
let qtd_sala = []
let qtd_cafe = []
let lista_salas = []
let lista_cafe = []
let contador1 = 0
let contador2 = 0
let consulta
let metade
let loop
let contador_pessoa




console.log("Bem vindo ao Gerenciador de Eventos")
menu = interacao.questionInt("Digite 1 para CADASTROS / Digite 2 para CONSULTAS: ")

while (menu != 1 && menu != 2) {
    menu = interacao.questionInt("Por gentileza, informe um numero valido: ")
}

if (menu == 1 ) {

    
console.clear()

//CADASTROS!

//Cadastro de pessoas
console.log("O cadastro de pessoas se encerra ao digitar Finaliza")
while (ultimo != "FINALIZA") {
    nome.push(interacao.question("Informe o nome completo do " + contador + " participante: ").toUpperCase())
    ultimo = nome[nome.length - 1].toUpperCase()
    contador++
}


console.clear()

//Cadastro de Salas
console.log("O cadastro de salas se encerra ao digitar Finaliza")
contador = 1
ultimo = 0
while (ultimo != "FINALIZA") {
    salas.push(interacao.question("Informe o nome da " + contador + " sala: ").toUpperCase())
    ultimo = salas[salas.length - 1].toUpperCase()
    if(ultimo !="FINALIZA"){
        lot_salas.push(interacao.questionInt("Informe a lotacao maxima da sala: "))
    }
    contador++
}
salas.pop()
salas.sort()
console.clear()

//Cadastro de Espaços de Café
console.log("O cadastro de espacos de cafe se encerra ao digitar Finaliza")
contador = 1
ultimo = 0
while (cafe.length < 2 ) {
    cafe.push(interacao.question("Informe o nome do " + contador + " espaco de cafe: ").toUpperCase())
    contador++
}


menu = 2
}


    
console.clear()

if (menu == 2) {
    
//CONSULTAS!


console.log("Qual consulta deseja realizar?")
console.log("Digite 1 para Consulta de Pessoas.")
console.log("Digite 2 para Listagem de Pessoas por Sala.")
console.log("Digite 3 para Listagem de Pessoas por Café.")
consulta = interacao.questionInt("Informe o numero desejado: ")

//PESSOAS!!!



if (consulta == 1) {

console.clear()

//Consultar pessoa cadastrada
contador_pessoa = 0
console.log("Consulta de pessoa cadastrada!")
consulta_pessoa = interacao.question("Por gentileza, informe o nome completo do participante: ")
while (nome[contador_pessoa] != consulta_pessoa.toUpperCase()) {
        contador_pessoa++   
}


//Diferença de 1 por sala
contador = 0
while (cand_salas.length < nome.length-1) {
    if (contador < salas.length) {
        
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


//Cadastro no cafe
contador = 0
cand_cafe = []

while (cand_cafe.length < nome.length-1) {
    metade = Math.round((nome.length-1)/2)
    while (metade > 0) {
        if (cand_cafe.length  < nome.length-1) {
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
contador1 = 0
contador2 = 0
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

console.log("PRIMEIRA ETAPA!")
console.log("Nome: " + nome[contador_pessoa])
console.log("Sala: " + cand_salas[contador_pessoa])
console.log("Café: " + cand_cafe[contador_pessoa])


//Troca das metades por etapas
contador1 = 0
contador2 = 0
contador3 = 0
loop = 0

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


console.log("SEGUNDA ETAPA!")
console.log("Nome: " + nome[contador_pessoa])
console.log("Sala: " + cand_salas[contador_pessoa])
console.log("Café: " + cand_cafe[contador_pessoa])

}


//SALAS!!!
if (consulta == 2) {

console.clear()

//Diferença de 1 por sala
contador = 0

while (cand_salas.length < nome.length-1) {
    if (contador < salas.length) {
        cand_salas.push((salas[contador]))
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

//Consulta de pessoas por sala PRIMEIRA ETAPA
contador = 0
contador1 = 0
lista_salas = []
menu = interacao.question("Informe o nome da sala que deseja consultar: ").toUpperCase()
while (lista_salas.length < qtd_sala[contador]) {
    if (menu != salas[contador]) {
        contador++
    }
    while (contador1  < cand_salas.length) {
        if (cand_salas[contador1] == salas[contador]) {
            lista_salas.push(nome[contador1])
        }
        contador1++
    }
}
console.log("Lista de pessoas!")
console.log("PRIMEIRA ETAPA!")
console.log(lista_salas) 

//Troca das metades por etapas
contador1 = 0
contador2 = 0
contador3 = 0
loop = 0

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
while (lista_salas.length < qtd_sala[contador]) {
    if (menu != salas[contador]) {
        contador++
    }
    while (contador1  < cand_salas.length) {
        if (cand_salas[contador1] == salas[contador]) {
            lista_salas.push(nome[contador1])
        }
        contador1++
    }
}
console.log("SEGUNDA ETAPA!")
console.log(lista_salas) 

}


//CAFÉ!!!
if (consulta  == 3) {

console.clear()

//Cadastro no cafe
contador = 0
cand_cafe = []

while (cand_cafe.length < nome.length-1) {
    metade = Math.round((nome.length-1)/2)
    while (metade > 0) {
        if (cand_cafe.length  < nome.length-1) {
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
contador1 = 0
contador2 = 0
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

//Consulta de pessoas por cafe
contador = 0
contador1 = 0
lista_cafe = []
menu = interacao.question("Informe o nome da sala de cafe que deseja consultar: ").toUpperCase()
while (lista_cafe.length < qtd_cafe[contador]) {
    if (menu != cafe[contador]) {
        contador++
    }
    while (contador1  < cand_cafe.length) {
        if (cand_cafe[contador1] == cafe[contador]) {
            lista_cafe.push(nome[contador1])
        }
        contador1++
    }
}
console.log("PRIMEIRA ETAPA!")
console.log("Lista de Pessoas!")
console.log(lista_cafe) 

//Diferença de 1 por sala
contador = 0

while (cand_salas.length < nome.length-1) {
    if (contador < salas.length) {
        cand_salas.push((salas[contador]))
        contador++
    }else{
        contador = 0
    }
    
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

//Contador de pessoas por cafe
contador = 0
contador1 = 0
contador2 = 0
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

//Consulta de pessoas por cafe
contador = 0
contador1 = 0
lista_cafe = []
while (lista_cafe.length < qtd_cafe[contador]) {
    if (menu != cafe[contador]) {
        contador++
    }
    while (contador1  < cand_cafe.length) {
        if (cand_cafe[contador1] == cafe[contador]) {
            lista_cafe.push(nome[contador1])
        }
        contador1++
    }
}
console.log("SEGUNDA ETAPA!")
console.log("Lista de Pessoas!")
console.log(lista_cafe) 

}

}




let jogador = "";
let pontuacao = {};
let jogadas = 0;

function iniciarJogo() {
    jogadas = 0;
    jogador = "X";
    document.querySelector("#jogadorDoTurno").textContent = jogador;

    pontuacao = {
        X : {
            linha1 : 0,
            linha2 : 0,
            linha3 : 0,
            coluna1 : 0,
            coluna2 : 0,
            coluna3 : 0,
            diagonal1: 0,
            diagonal2: 0
        },
        O : {
            linha1 : 0,
            linha2 : 0,
            linha3 : 0,
            coluna1 : 0,
            coluna2 : 0,
            coluna3 : 0,
            diagonal1: 0,
            diagonal2: 0
        }
    };
    
    let campos = document.querySelectorAll("div");

    for(let campo of campos){
        campo.textContent = "";
        campo.addEventListener("click", marcarCampo);
    }
}

function removerEventosDosCampos(){
    let campos = document.querySelectorAll("div");

    for(let campo of campos){
        campo.removeEventListener("click", marcarCampo);
    }
}

function marcarCampo(event){
    if(event.target.textContent == ""){
        event.target.textContent = jogador;
        jogadas++
        conferirResultado(event.target.classList.value.split(" "));
        if (!verificarEmpate()) {
            trocarJogador();
            document.querySelector("#jogadorDoTurno").textContent = jogador;
        }
    }
}

function trocarJogador(){
    if(jogador == "X"){
        jogador = "O";
    }else{
        jogador = "X";
    }
}

function conferirResultado(classes){
    for(let classe of classes){
        pontuacao[jogador][classe] += 1;

        if(pontuacao[jogador][classe] == 3){
            alert("Jogador " + jogador + " venceu!!");
            removerEventosDosCampos();
            return;  
        }
    }
}

function verificarEmpate() {
    if (jogadas >= 9) {
        alert("Deu velha!!");
        removerEventosDosCampos();
        return true;
    }
    return false;
}

document.querySelector("#reiniciar").addEventListener("click", iniciarJogo);

iniciarJogo();
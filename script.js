let jogador = "";
let pontuacao = {};
let jogadas = 0;

let vitorias = {
    X: 0,
    O: 0
};

function iniciarJogo() {
    jogadas = 0;
    jogador = "X";
    document.querySelector("#jogadorDoTurno").textContent = jogador;
    document.getElementById("vencedor").innerText = ""; 

    pontuacao = {
        X: {
            linha1: 0,
            linha2: 0,
            linha3: 0,
            coluna1: 0,
            coluna2: 0,
            coluna3: 0,
            diagonal1: 0,
            diagonal2: 0
        },
        O: {
            linha1: 0,
            linha2: 0,
            linha3: 0,
            coluna1: 0,
            coluna2: 0,
            coluna3: 0,
            diagonal1: 0,
            diagonal2: 0
        }
    };

    let campos = document.querySelectorAll("div.campo");
    for (let campo of campos) {
        campo.textContent = "";
        campo.addEventListener("click", marcarCampo);
    }

    atualizarPlacar();
}

function removerEventosDosCampos() {
    let campos = document.querySelectorAll("div.campo");
    for (let campo of campos) {
        campo.removeEventListener("click", marcarCampo);
    }
}

function marcarCampo(event) {
    if (event.target.textContent === "") {
        event.target.textContent = jogador;  
        jogadas++;

        let classes = event.target.classList.value.split(" ");
        for (let classe of classes) {
            if (pontuacao[jogador][classe] !== undefined) {
                pontuacao[jogador][classe]++;
            }
        }

        if (conferirResultado(classes)) return;

        if (verificarEmpate()) return;

        trocarJogador();
        document.querySelector("#jogadorDoTurno").textContent = jogador;
    }
}

function trocarJogador() {
    jogador = jogador === "X" ? "O" : "X";
}

function conferirResultado(classes) {
    for (let classe of classes) {
        if (pontuacao[jogador][classe] === 3) {
          
            vitorias[jogador]++;
            atualizarPlacar();

           
            document.getElementById('vencedor').innerText = "Jogador " + jogador + " venceu!!";

         
            setTimeout(function() {
                alert("Jogador " + jogador + " venceu!!");
            }, 100); 

           
            removerEventosDosCampos();
            return true;
        }
    }
    return false;
}

function verificarEmpate() {
    if (jogadas >= 9) {
        alert("Deu velha!!");

        document.getElementById('vencedor').innerText = "Deu velha!!";

        removerEventosDosCampos();
        return true;
    }
    return false;
}

function atualizarPlacar() {

    document.getElementById("vitoriasX").textContent = vitorias.X;
    document.getElementById("vitoriasO").textContent = vitorias.O;
}

document.querySelector("#reiniciar").addEventListener("click", iniciarJogo);

iniciarJogo();

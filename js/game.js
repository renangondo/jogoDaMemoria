import { buscarPalavras } from "./api.js";
import { PALAVRAS } from "./config.js"
import { embaralhar } from "./utils.js";

const btnReiniciar = document.getElementById("btnReiniciar")
const btnCards = document.querySelectorAll(".btnCards")


let primeira = null;
let segunda = null;
let tentativas = 0;
let bloqueado = 0

export function iniciar() {
    let embaralhadas = embaralhar([...PALAVRAS, ...PALAVRAS])
    btnCards.forEach((card, x) => {
        card.textContent = "?";
        card.dataset.palavra = embaralhadas[x];
        card.onclick = () => virar(card);
    })
}

export function virar(card) {
    card.textContent = card.dataset.palavra;
    card.classList.add("selecionado")
    if (!primeira) {
        primeira = card
        return;
    }
    segunda = card;
    tentativas++
    verificar();
}



export function verificar() {
    if (primeira.textContent == segunda.textContent) {
        console.log("acertou...")
    } else {
        setTimeout(() => {
            primeira.textContent = "?"
            segunda.textContent = "?"
            primeira.classList.remove("selecionado");
            segunda.classList.remove("selecionado")
            primeira = null;
            segunda = null;
            bloqueado = false;
            console.log("1")
        }, 600)
        console.log("2")
    }
}


btnReiniciar.onclick = () => buscarPalavras()



// Módulos ecmaScript 6

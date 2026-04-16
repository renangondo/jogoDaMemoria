
import { PALAVRAS } from "./config.js"
import { embaralhar } from "./utils.js";

const btnReiniciar = document.getElementById("btnReiniciar")
const btnCards = document.querySelectorAll(".btnCards")
const spanTentativas = document.querySelector("header span");


let primeira = null;
let segunda = null;
let tentativas = 0;
let bloqueado = false;

export function iniciar() {
    let embaralhadas = embaralhar([...PALAVRAS, ...PALAVRAS])

    primeira = null;
    segunda = null;
    tentativas = 0;
    bloqueado = false;

    btnCards.forEach((card, x) => {
        card.textContent = "?";
        card.classList.remove("selecionado");
        card.dataset.palavra = embaralhadas[x];
        card.onclick = () => virar(card);
    })

    tentativas = 0;
    spanTentativas.textContent = "Tentativas: 0";
}

export function virar(card) {
    if (bloqueado) return;
    if (card === primeira) return;

    card.textContent = card.dataset.palavra;
    card.classList.add("selecionado");

    if (!primeira) {
        primeira = card;
        return;
    }
    tentativas++;
    spanTentativas.textContent = `Tentativas: ${tentativas}`;
    segunda = card;
    tentativas++;
    bloqueado = true;

    verificar();
}

export function verificar() {
    if (primeira.dataset.palavra === segunda.dataset.palavra) {
        primeira = null;
        segunda = null;
        bloqueado = false;

    } else {
        setTimeout(() => {
            primeira.textContent = "?";
            segunda.textContent = "?";

            primeira.classList.remove("selecionado");
            segunda.classList.remove("selecionado");

            primeira = null;
            segunda = null;
            bloqueado = false;
        }, 800);
    }

    const todas = [...btnCards].every(c => c.classList.contains("selecionado"));

    if (todas) {
        setTimeout(() => {
            document.getElementById("salvar").style.display = "block";
        }, 500);
    }
}


btnReiniciar.onclick = () => iniciar()























// Módulos ecmaScript 6

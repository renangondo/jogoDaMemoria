
import { iniciar, obterTentativas } from "./game.js";
import { salvarPartida, buscarRanking } from "./api.js";
import { iniciarTema, alterarTema } from "./theme.js";


document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu");

    iniciarTema();
    document.getElementById("btnAlterarTema").onclick = alterarTema;

    document.getElementById("btnNovoJogo").onclick = () => {
        menu.style.display = "none";
        iniciar();
    };

    document.getElementById("btnRanking").onclick = async () => {
        const menu = document.getElementById("menu");
        const rankingDiv = document.getElementById("ranking");
        const lista = document.getElementById("listaRanking");

        menu.style.display = "none";
        rankingDiv.style.display = "flex";

        lista.innerHTML = "<li>Carregando...</li>";

        let dados = await buscarRanking();
        console.log("Ranking recebido:", dados);

        if (!Array.isArray(dados)) {
            dados = dados.ranking || dados.dados || [];
        }

        lista.innerHTML = "";

        if (!dados.length) {
            lista.innerHTML = "<li>Nenhum dado encontrado</li>";
            return;
        }

        dados.sort((a, b) => Number(a.tentativas) - Number(b.tentativas));

        console.log(dados[0]);
        dados.forEach((jogador, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
            <span>#${index + 1} - ${jogador.nome}</span>
            <span>${jogador.tentativas}</span>
        `;
            lista.appendChild(li);
        });
    };

    document.getElementById("voltarMenu").onclick = () => {
        document.getElementById("ranking").style.display = "none";
        document.getElementById("menu").style.display = "block";
    };

    document.getElementById("btnSalvar").onclick = async () => {
        const nome = document.getElementById("nomeJogador").value.trim();

        if (!nome) {
            alert("Digite seu nome");
            return;
        }

        const partida = {
            nome: nome,
            tentativas: obterTentativas(),
            tempo: 0
        };

        console.log("Enviando para API:", partida);

        await salvarPartida(partida);

        document.getElementById("salvar").style.display = "none";
        alert("Salvo!");

        document.getElementById("btnRanking").click();
    };
});


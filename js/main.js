
import { iniciar } from "./game.js"
import { salvarPartida, buscarPalavras } from "./api.js";
import { iniciarTema, alterarTema } from "./theme.js";
import { buscarRanking } from "./api.js";


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

        const dados = await buscarRanking();

        lista.innerHTML = "";

        if (!dados.length) {
            lista.innerHTML = "<li>Nenhum dado encontrado</li>";
            return;
        }

        dados.sort((a, b) => b.pontos - a.pontos);

        dados.forEach((jogador, index) => {
            const li = document.createElement("li");

            li.innerHTML = `
            <span>#${index + 1} - ${jogador.nome}</span>
            <span>${jogador.pontos}</span>
        `;

            lista.appendChild(li);
        });
    };

    document.getElementById("voltarMenu").onclick = () => {
        document.getElementById("ranking").style.display = "none";
        document.getElementById("menu").style.display = "block";
    };

    document.getElementById("btnSalvar").onclick = async () => {
        const nome = document.getElementById("nomeJogador").value;

        const partida = {
            nome: nome,
            pontos: 100
        };
        // 👇 abre ranking automaticamente
        document.getElementById("salvar").style.display = "none";
        document.getElementById("btnRanking").click();

        await salvarPartida(partida);
        alert("Salvo!");
    };
});


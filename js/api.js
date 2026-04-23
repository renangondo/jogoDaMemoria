import { URL, PALAVRAS } from "./config.js";

export async function buscarPalavras() {
    try {
        const response = await fetch(`${URL}/api/palavras.php?quantidade=12`)
        if (!response.ok) {
            throw new Error(`Error ${response.status}`)
        }
        const palavras = await response.json();
        console.log(palavras)
        return palavras;
    } catch (error) { 
        console.log(error)
        return PALAVRAS
    }
}

export async function salvarPartida(partida) {
    try {
        const response = await fetch(`${URL}/api/salvar.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(partida)
        });
        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(`ERRO ${response.status}: ${errorBody.erro}`);
        }

        const data = await response.json();
        console.log(data)
        console.log("Enviando para API:", partida);
        
    } catch (error) {
        console.log(error)
    }
    
}


export async function buscarRanking() {
    try {
        const response = await fetch(`${URL}/api/ranking.php`);

        if (!response.ok) {
            throw new Error(`Erro ${response.status}`);
        }

        const dados = await response.json();
        return dados;

    } catch (error) {
        console.log("Erro ao buscar ranking:", error);
        return [];
    }
}
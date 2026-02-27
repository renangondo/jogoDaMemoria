let palavras = ["DIV", "META","HEADER", "JS", "FOOTER", "BODY"];

embaralhar(palavras);



const btnReiniciar = document.getElementById("btnReiniciar")
const btnCards = document.querySelectorAll(".btnCards")
const url = "https://darkblue-frog-779608.hostingersite.com";

let primeira = null;
let segunda = null;
let tentativas = 0;




buscarPalavras()
salvarPartida()

async function buscarPalavras() {
    try {
        const response = await fetch(`${url}/api/palavras.php?quantidade=12`)
        if (!response.ok) {
            throw new Error(`Error ${request.status}`)
        }
        palavras = await response.json();
        console.log(palavras)
        iniciar()
    }catch(error){
        console.log(error)
    }
}

async function salvarPartida() {
    try {
        const response = await fetch(`${url}/api/salvar.php`,{
            method:'POST',
            header:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({nome: "Renan", tempo:1, tentativas:1})
        });
        if(!response.ok) {
            const errorBody = await response.json();
            throw new Error(`ERRO ${request.status}: ${errorBody.erro}`);
        }

        const data = await response.json();
        console.log(data)


    }catch(error){
        console.log(error)
    }
}

async function ranking() {
    try{
        const response = await fetch(`${url}`)

    }catch(error){
        console.log(error)
    }
}

function iniciar() {
    let embaralhadas = embaralhar([...palavras, ...palavras])
    btnCards.forEach( (card,x) => {
        card.textContent = "?";
        card.dataset.palavra = embaralhadas[x];
        card.onclick = () => virar(card);
    })
}

function virar(card) {
    card.textContent = card.dataset.palavra;
    card.classList.add("selecionado")
    if(!primeira) {
        primeira = card
        return;
    }
    segunda = card;
    tentativas++
    verificar();
}



function embaralhar(array) {
    for(let x=array.length - 1; x>0; x--) {
        let y = Math.floor(Math.random() * (1+x));
        [array[x], array[y]] = [array[y], array[x]]
    }
    
    return array
}

function verificar() {
    if(primeira.textContent == segunda.textContent) {
        console.log("acertou...")
    } else{
        setTimeout(() => {
            primeira.textContent ="?"
            segunda.textContent = "?"
            primeira.classList.remove("selecionado");
            segunda.classList.remove("selecionado")
            primeira = null;
            segunda = null;
        },600)   
    }
}


btnReiniciar.onclick = () => buscarPalavras()

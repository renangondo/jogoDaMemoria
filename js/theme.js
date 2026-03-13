
export function iniciarTema() {
    const tema = localStorage.getItem("tema") || 'light'
    document.documentElement.setAttribute("data-theme", tema)

}


export function alterarTema() {
    let tema = localStorage.getItem("tema") || 'light'
    tema = tema == 'light' ? 'dark' : 'light';
    document.body.dataset.theme = tema;
    localStorage.setItem("tema", tema);
}

export function salvarTema() {
    const temaSalvo = localStorage.getItem("tema")
    if(temaSalvo) {
        document.body.dataset.theme = temaSalvo;
    }
}




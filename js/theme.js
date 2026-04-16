
export function iniciarTema() {
    const tema = localStorage.getItem("tema") || 'light';
    document.documentElement.setAttribute("data-theme", tema);
}

export function alterarTema() {
    let tema = localStorage.getItem("tema") || 'light';

    tema = tema === 'light' ? 'dark' : 'light';

    // 🔥 AQUI ESTÁ A CORREÇÃO
    document.documentElement.setAttribute("data-theme", tema);

    localStorage.setItem("tema", tema);
}




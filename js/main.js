import { iniciarTema, alterarTema, salvarTema } from "./theme.js";
import {iniciar} from "./game.js"



document.addEventListener("DOMContentLoaded", () => {
    iniciarTema();

    const btnAlterarTema = document.getElementById("btnAlterarTema");
    btnAlterarTema.onclick = alterarTema;

    salvarTema();

    iniciar();
});


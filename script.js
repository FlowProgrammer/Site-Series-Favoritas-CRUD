import * as api from './api.js'
const modal = document.getElementById("modal")
const nomeInput = document.getElementById("nome")
const notaInput = document.getElementById("nota")
const modalTitulo = document.getElementById("tituloModal")
const listaSeries = document.getElementById("listaSeries")
const btnNovo = document.getElementById("btnNovo")
const btnSalvar = document.getElementById("salvar")
const btnCancelar = document.getElementById("cancelar")

let serieEditando = null;
function abrirModal(modo = "novo", serie = null){
    modal.classList.remove("hidden")

    if(modo === "novo"){
        modalTitulo.innerText = "Novo Produto"
        nomeInput.value = "";
        notaInput.value = "";
        serieEditando = null;
    } else{
        modalTitulo.innerText = "Editar Produto"
        nomeInput.value = serie.nome
        notaInput.value = serie.nota
        serieEditando = serie;
    }
}

function fecharModal(){
    modal.classList.add("hidden")
}

btnNovo.addEventListener("click", () => abrirModal("novo"))

btnCancelar.addEventListener("click", fecharModal)
btnSalvar.addEventListener("click", async () => {
    const nome = nomeInput.value;
    const nota = notaInput.value;

    if(!nome && !nota){
        alert("Preencha todos os campos")
        return
    }

    if(serieEditando){
        await api.atualizarSerie({id: serieEditando.id, nome, nota})
    } else{
        await api.criarSerie({nome, nota})
    }
    fecharModal();
    
})
function criarCard(serie){
     const card = document.createElement("div")
     card.classList.add("card")
     listaSeries.appendChild(card)

     card.innerHTML = `
     <h3>${serie.nome}</h3>
     <p>Nota ${Number(serie.nota).toFixed(2)}</p> <div class="acoes">
     <button class= "btn-primario btn-editar">Editar</button>
     <button class="btn-secundario btn-excluir">Excluir</button>
 </div>
     `;

     const btnEditar = card.querySelector(".btn-editar");
     const btnExcluir = card.querySelector(".btn-excluir");

    btnEditar.addEventListener("click", () => abrirModal("edicao", serie)
)
    btnExcluir.addEventListener("click", async () => await api.deletarSerie(serie.id))
}
const series = await api.obterSeries()

function carregaSeries(){
    series.forEach(serie => {
        criarCard(serie);
    });
}

carregaSeries();
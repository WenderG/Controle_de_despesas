let form = window.document.getElementById('entrada')

const listaDeContas = []

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    let despesa =  window.document.getElementById('despesa').value
    let valor = window.document.getElementById('valor').value

    if(localStorage.hasOwnProperty('listaDeContas')){
        listaDeContas = JSON.parse(localStorage.getItem("listaDeContas"))
    }

   var des = {
        despesa: despesa,
        valor: valor
   }

    listaDeContas.push(des)

    localStorage.setItem("listaDespesas", JSON.stringify(listaDeContas))

})


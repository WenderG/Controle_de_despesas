let form = window.document.getElementById('entrada')
let lista = window.document.getElementById('tabela')
let totalE = window.document.getElementById('total-entrada')
let opc = window.document.getElementsByName('radopc')
let pagas = window.document.getElementById('pagas')
let totalSP = window.document.getElementById('total-saida-pagas') 
let naoPagas = window.document.getElementById('naoPagas')
let totalSNP = window.document.getElementById('total-saida-naoPagas')

let total = 0
let totalP = 0
let totalNP = 0

const listaDeContas = []

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    let despesa = evento.target.elements['despesa'].value
    let valor = evento.target.elements['valor'].value

    valor = parseFloat(valor)

    if(localStorage.hasOwnProperty('listaDeContas')){
        listaDeContas = JSON.parse(localStorage.getItem("listaDeContas"))
    }

    var des = {
        despesa: despesa,
        valor: valor
   }

    criaDespesa(des.despesa, des.valor)
    calcTotalEntrada(des.valor)
    opcao(des.despesa, des.valor)

    listaDeContas.push(des)

    localStorage.setItem("listaDespesas", JSON.stringify(listaDeContas))

})

function criaDespesa(despesa, valor) {
    lista.innerHTML += despesa + ` -> R$${valor} <br>`
}

function calcTotalEntrada(valor) {
    total += valor;

    totalE.innerHTML = `Total: <strong>${total}</strong>`
}

function opcao(despesa, valor) {
    if(opc[0].checked){
        pagas.innerHTML += despesa + ` -> R$${valor} <br>`

        totalP += valor

        totalSP.innerHTML = `Total: <strong>${totalP}</strong>`

    }else if(opc[1].checked) {
        naoPagas.innerHTML += despesa + ` -> R$${valor} <br>`
        
        totalNP += valor

        totalSNP.innerHTML = `Total: <strong>${totalNP}</strong>`
    }
}


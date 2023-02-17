let form = window.document.getElementById('entrada')
let lista = window.document.getElementById('lista-despesas')
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

    criaDespesa(des)
    calcTotalEntrada(des.valor)
    opcao(des.despesa, des.valor)

    listaDeContas.push(des)

    localStorage.setItem("listaDespesas", JSON.stringify(listaDeContas))

})

function criaDespesa(des) {
    const novaDespesa = window.document.createElement("li")
    novaDespesa.classList.add("des")

    const nomeDespesa = window.document.createElement("strong") 
    nomeDespesa.innerHTML = des.despesa
    nomeDespesa.innerHTML += `: R$${des.valor}`

    novaDespesa.appendChild(nomeDespesa)

    novaDespesa.appendChild(botaoDeletar())

    lista.appendChild(novaDespesa)
}

function calcTotalEntrada(valor) {
    total += valor;

    totalE.innerHTML = `Total: <strong>${total}</strong>`
}

function opcao(despesa, valor) {
    if(opc[0].checked){
        pagas.innerHTML += `<li>${despesa} -> R$${valor}</li>`

        totalP += valor

        totalSP.innerHTML = `Total: <strong>${totalP}</strong>`

    }else if(opc[1].checked) {
        naoPagas.innerHTML += `<li>${despesa} -> R$${valor}</li>`
        
        totalNP += valor

        totalSNP.innerHTML = `Total: <strong>${totalNP}</strong>`
    }
}

function botaoDeletar() {
    const botao = window.document.createElement("button")
    botao.innerHTML = "X"

    botao.addEventListener("click", function() {
        deletar(this.parentNode)
    })

    return botao
}

function deletar(tag) {
    tag.remove()
}


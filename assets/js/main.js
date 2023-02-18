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

    listaDeContas.push(des)

    localStorage.setItem("listaDespesas", JSON.stringify(listaDeContas))

})

function criaDespesa(des) {
    const novaDespesa = window.document.createElement("li")
    novaDespesa.classList.add("des")

    novaDespesa.appendChild(botaoDeletar(des))

    const nomeDespesa = window.document.createElement("strong") 
    nomeDespesa.innerHTML = des.despesa
    nomeDespesa.innerHTML += `: R$${des.valor}`

    novaDespesa.appendChild(nomeDespesa)

    lista.appendChild(novaDespesa)
    opcao(des)
}

function calcTotalEntrada(valor) {
    total += valor;

    totalE.innerHTML = `Total: <strong>${total}</strong>`
}

function opcao(des) {
    if(opc[0].checked){
        const novaDespesaPaga = window.document.createElement("li")
        novaDespesaPaga.classList.add("des")

        novaDespesaPaga.appendChild(botaoDeletarPagas(des))

        const nomeDespesa = window.document.createElement("strong") 
        nomeDespesa.innerHTML = des.despesa
        nomeDespesa.innerHTML += `: R$${des.valor}`

        novaDespesaPaga.appendChild(nomeDespesa)
        
        totalP += des.valor

        pagas.appendChild(novaDespesaPaga)

        totalSP.innerHTML = `Total: <strong>${totalP}</strong>`

    }else if(opc[1].checked) {
        const novaDespesaNaoPaga = window.document.createElement("li")
        novaDespesaNaoPaga.classList.add("des")

        novaDespesaNaoPaga.appendChild(botaoDeletarNaoPagas(des))

        const nomeDespesa = window.document.createElement("strong") 
        nomeDespesa.innerHTML = des.despesa
        nomeDespesa.innerHTML += `: R$${des.valor}`

        novaDespesaNaoPaga.appendChild(nomeDespesa)
        
        totalNP += des.valor

        naoPagas.appendChild(novaDespesaNaoPaga)

        totalSNP.innerHTML = `Total: <strong>${totalNP}</strong>`
    }
}

function botaoDeletar(des) {
    const botao = window.document.createElement("button")
    botao.innerHTML = "X"

    botao.addEventListener("click", function() {
        deletar(this.parentNode)

        total -= des.valor 

        totalE.innerHTML = `Total: <strong>${total}</strong>`
        console.log(totalE)
    })

    return botao
}

function botaoDeletarPagas(des) {
    const botao = window.document.createElement("button")
    botao.innerHTML = "X"

    botao.addEventListener("click", function() {
        deletar(this.parentNode)

        totalP -= des.valor 

        totalSP.innerHTML = `Total: <strong>${totalP}</strong>`
    })

    return botao
}

function botaoDeletarNaoPagas(des) {
    const botao = window.document.createElement("button")
    botao.innerHTML = "X"

    botao.addEventListener("click", function() {
        deletar(this.parentNode)

        totalNP -= des.valor 

        totalSNP.innerHTML = `Total: <strong>${totalNP}</strong>`
    })

    return botao
}

function deletar(tag) {
    tag.remove()

}


let form = window.document.getElementById('entrada')
let lista = window.document.getElementById('lista-despesas')
let totalE = window.document.getElementById('total-entrada')
let opc = window.document.getElementsByName('radopc')
let pagas = window.document.getElementById('pagas')
let totalSP = window.document.getElementById('total-saida-pagas') 
let naoPagas = window.document.getElementById('naoPagas')
let totalSNP = window.document.getElementById('total-saida-naoPagas')

const listaDeContas = []

const itens = JSON.parse(localStorage.getItem("listaDespesas")) || []

let total = 0
let totalP = 0
let totalNP = 0

itens.forEach((elemento) => {
    criaDespesa(elemento)
})

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
        valor: valor,
        pagamento: 0
   }

    despesa.value = ""
    valor.value = 0

    criaDespesa(des)

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
    calcTotalEntrada(des)

    novaDespesa.appendChild(nomeDespesa)

    lista.appendChild(novaDespesa)

    if(opc[0].checked)
        des.pagamento = 1
    else if(opc[1].checked)
        des.pagamento = 0

    opcao(des)
}

function calcTotalEntrada(des) {
    total += des.valor;

    totalE.innerHTML = `Total: <strong>${total}</strong>`
}

function opcao(des) {
    if(des.pagamento == 1){
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

    }else if(des.pagamento == 0) {
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

// function estatistica() {
//     var maior = listaDeContas[0]
//     var menor = listaDeContas[0]
    
//     for(var i = 0; i < listaDeContas.length; i++){
//         if(maior > listaDeContas[i]){
//             if(menor > listaDeContas[i])
//                 menor = listaDeContas[i]
//         }else {
//             maior = listaDeContas[i]
//         }
//     }

//     console.log(maior, menor)
// }
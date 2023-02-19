let form = window.document.getElementById('entrada')
let lista = window.document.getElementById('lista-despesas')
let totalE = window.document.getElementById('total-entrada')
let opc = window.document.getElementsByName('radopc')
let pagas = window.document.getElementById('pagas')
let totalSP = window.document.getElementById('total-saida-pagas') 
let naoPagas = window.document.getElementById('naoPagas')
let totalSNP = window.document.getElementById('total-saida-naoPagas')

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

    const existe = itens.find(elemento => elemento.despesa === despesa.value)

    valor = parseFloat(valor)

    if(localStorage.hasOwnProperty('listaDeContas')){
        listaDeContas = JSON.parse(localStorage.getItem("listaDeContas"))
    }

    var des = {
        despesa: despesa,
        valor: valor,
        pagamento: 0
   }

    if(existe) {
        des.id = existe.id

        atualizaElemento(des)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = des
    } else{
        des.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

        criaDespesa(des)

        itens.push(des)
    }

    localStorage.setItem("listaDespesas", JSON.stringify(itens))
    
})

function criaDespesa(des) {
    const novaDespesa = window.document.createElement("li")
    novaDespesa.classList.add("des")
    novaDespesa.dataset.id = des.id

    novaDespesa.appendChild(botaoDeletar(des, des.id))

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

    totalE.innerHTML = `Total: <strong>R$${total}</strong>`
}

function opcao(des) {
    if(des.pagamento == 1){
        const novaDespesaPaga = window.document.createElement("li")
        novaDespesaPaga.classList.add("des")

        const nomeDespesa = window.document.createElement("strong") 
        nomeDespesa.innerHTML = des.despesa
        nomeDespesa.innerHTML += `: R$${des.valor}`

        novaDespesaPaga.appendChild(nomeDespesa)
        
        totalP += des.valor

        pagas.appendChild(novaDespesaPaga)

        totalSP.innerHTML = `Total: <strong>R$${totalP}</strong>`

    }else if(des.pagamento == 0) {
        const novaDespesaNaoPaga = window.document.createElement("li")
        novaDespesaNaoPaga.classList.add("des")

        const nomeDespesa = window.document.createElement("strong") 
        nomeDespesa.innerHTML = des.despesa
        nomeDespesa.innerHTML += `: R$${des.valor}`

        novaDespesaNaoPaga.appendChild(nomeDespesa)
        
        totalNP += des.valor

        naoPagas.appendChild(novaDespesaNaoPaga)

        totalSNP.innerHTML = `Total: <strong>R$${totalNP}</strong>`
    }
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.valor
}

function botaoDeletar(des, id) {
    const botao = window.document.createElement("button")
    botao.innerHTML = "X"

    botao.addEventListener("click", function() {
        deletar(this.parentNode, id)

        total -= des.valor 

        totalE.innerHTML = `Total: <strong>R$${total}</strong>`
        console.log(totalE)
    })

    return botao
}

function deletar(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("listaDespesas", JSON.stringify(itens))

}

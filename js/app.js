class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    verificaDados() {
        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                //dados inválidos
                return false
            }
        }
        //dados válidos
        return true
    }

    cadastrarDespesa() {
        let ano = document.querySelector("#ano")
        let mes = document.querySelector("#mes")
        let dia = document.querySelector("#dia")
        let tipo = document.querySelector("#tipo")
        let descricao = document.querySelector("#descricao")
        let valor = document.querySelector("#valor")

        let modalText = document.querySelector("#modal-text")
        let modalBtn = document.querySelector("#btn-back")
        let modalTitle = document.querySelector("#caixaDeDialogoDeRegistro")
        let modalBody = document.querySelector("#body")

        let novaDespesa = new Despesa(
            ano.value, 
            mes.value, 
            dia.value, 
            tipo.value, 
            descricao.value, 
            valor.value
        )

        if(novaDespesa.verificaDados()) {
            //dados são gravados
            bd.gravar(novaDespesa)
            $('#modalRegistraDespesa').modal('show')
            modalText.className = "modal-header text-success"
            modalBtn.className = "btn btn-success"
            modalTitle.innerHTML = "Registro inserido com sucesso"
            modalBody.innerHTML = "Despesa foi cadastrada com sucesso!"
        }
        else {
            //dados não serão armazenados
            $('#modalRegistraDespesa').modal('show')
            modalText.className = "modal-header text-danger"
            modalBtn.className = "btn btn-danger"
            modalTitle.innerHTML = "Erro na inclusão de registro"
            modalBody.innerHTML = "Erro, verifique se todos os dados do formulário foram preenchidos corretamente e tente novamente!"
        }
    }
}

let despesa = new Despesa()

class BD {
    constructor() {
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }
    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return (parseInt(proximoId) + 1)
    }

    gravar(d) {
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }
    consultaDespesas() {
        console.log("Consulta de despesas ativa.")
    }

    removerDespesa() {
        console.log("Remoção de despesa feita com sucesso!")
    }
}

let bd = new BD()

function carregaListaDespesas() {
    let tableBody = document.querySelector("#table-body") //corpo da tabela
    let trNova = document.createElement("tr") //criação da table row
    tableBody.appendChild(trNova) //adiciona a tr dentro do corpo da tabela

    do {
        let i = 1
        let despesa = JSON.parse(localStorage.getItem(i)) //leitura do localStorage da despesa e conversão de JSON para Objeto

        //criação de table data para Data
        let tdData = document.createElement("td")
        trNova.appendChild(tdData)
        let data = document.createTextNode(`${despesa.dia}/${despesa.mes}/${despesa.ano}`)
        tdData.appendChild(data) //adiciona o nó de texto à nova div criada

        //criação de table data para Tipo
        let tdTipo = document.createElement("td")
        trNova.appendChild(tdTipo)
        let tipo = document.createTextNode(`${despesa.tipo}`)
        tdTipo.appendChild(tipo) //adiciona o nó de texto à nova div criada

        //criação de table data para Descrição
        let tdDescricao= document.createElement("td")
        trNova.appendChild(tdDescricao)
        let descricao = document.createTextNode(`${despesa.descricao}`)
        tdDescricao.appendChild(descricao) //adiciona o nó de texto à nova div criada
        
        //criação de table data para Valor
        let tdValor = document.createElement("td")
        trNova.appendChild(tdValor)
        let valor = document.createTextNode(`${despesa.valor}`)
        tdValor.appendChild(valor) //adiciona o nó de texto à nova div criada

        i++
    } while(despesa)
}

/*function cadastrarDespesa() {
    let ano = document.querySelector("#ano")
    let mes = document.querySelector("#mes")
    let dia = document.querySelector("#dia")
    let tipo = document.querySelector("#tipo")
    let descricao = document.querySelector("#descricao")
    let valor = document.querySelector("#valor")

    if(desp.verificaDados(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value) == 1) {
        alert("Erro, verifique os dados do formulário e tente novamente")
    }
    else {
        let despesa = new Despesa(
            ano.value, 
            mes.value, 
            dia.value, 
            tipo.value, 
            descricao.value, 
            valor.value
        )

        console.log(despesa)
    
        bd.gravar(despesa)
    }
}*/

/*function verificaDados(ano, mes, dia, tipo, descricao, valor){
    if((ano || mes || dia ||tipo || descricao || valor) === "") {
        return 1
    }
    return 0
} */
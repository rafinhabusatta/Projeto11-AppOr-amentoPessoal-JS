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
        let form = document.querySelector("#form")
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
            form.reset()
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

    recuperarTodosRegistros() {
        let id = localStorage.getItem('id')
        let despesas = Array()

        for(let i = 1; i <= id; i++) {

            let despesa = JSON.parse(localStorage.getItem(i)) //leitura do localStorage da despesa e conversão de JSON para Objeto
            if(despesa === null) {
                continue // pula para a próxima iteração do laço
            }
            despesas.push(despesa) //inclui a despesa no array despesas
        } 
        return despesas  
    }

    removerDespesa() {
        console.log("Remoção de despesa feita com sucesso!")
    }

    pesquisar(despesa) {
        let filtro = despesa
        let despesas = bd.recuperarTodosRegistros()
        let despesasFiltradas = Array()

        despesas.forEach(function(d) {   
            if(filtro.tipo != null) {
                if(d.tipo == filtro.tipo) {
                    despesasFiltradas.push(d)
                }
            }
            if(filtro.descricao != null) {
                if(d.descricao == filtro.descricao) {
                    despesasFiltradas.push(d)
                }
            }
            if(filtro.valor != null) {
                if(d.valor == filtro.valor) {
                    despesasFiltradas.push(d)
                }
            }
        })
        return despesasFiltradas
    }
}

let bd = new BD()

function carregaListaDespesas() {
    let despesas = bd.recuperarTodosRegistros()
    let tableBody = document.querySelector("#table-body") //corpo da tabela
    //let i = 0

    despesas.forEach(function(d) {
        let trNova = tableBody.insertRow()

        //ajuste de tipo
        switch(d.tipo) {
            case 'alimentacao': d.tipo = 'Alimentação'
                break
            case 'educacao': d.tipo = 'Educação'
                break
            case 'lazer': d.tipo = 'Lazer'
                break
            case 'saude': d.tipo = 'Saúde'
                break
            case 'transporte': d.tipo = 'Transporte'
                break
        }
        trNova.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        trNova.insertCell(1).innerHTML = d.tipo
        trNova.insertCell(2).innerHTML = d.descricao
        trNova.insertCell(3).innerHTML = d.valor
    })

    /*while(i <= despesas.length) {
        
        //criação da table row
        let trNova = document.createElement("tr")
        tableBody.appendChild(trNova) //adiciona a tr dentro do corpo da tabela

        //criação de table data para Data
        let tdData = document.createElement("td")
        trNova.appendChild(tdData)
        let data = document.createTextNode(`${despesas[i].dia}/${despesas[i].mes}/${despesas[i].ano}`)
        tdData.appendChild(data) //adiciona o nó de texto à nova div criada

        //criação de table data para Tipo
        let tdTipo = document.createElement("td")
        trNova.appendChild(tdTipo)
        let tipo = document.createTextNode(`${despesas[i].tipo}`)
        tdTipo.appendChild(tipo) //adiciona o nó de texto à nova div criada

        //criação de table data para Descrição
        let tdDescricao= document.createElement("td")
        trNova.appendChild(tdDescricao)
        let descricao = document.createTextNode(`${despesas[i].descricao}`)
        tdDescricao.appendChild(descricao) //adiciona o nó de texto à nova div criada
        
        //criação de table data para Valor
        let tdValor = document.createElement("td")
        trNova.appendChild(tdValor)
        let valor = document.createTextNode(`${despesas[i].valor}`)
        tdValor.appendChild(valor) //adiciona o nó de texto à nova div criada

        i++
    }*/
}

function pesquisaDespesas() {
    let ano = document.querySelector("#ano")
    let mes = document.querySelector("#mes")
    let dia = document.querySelector("#dia")
    let tipo = document.querySelector("#tipo")
    let descricao = document.querySelector("#descricao")
    let valor = document.querySelector("#valor")

    let despesa = new Despesa(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value
    )

    let despesas = bd.pesquisar(despesa)

    console.log(despesas)
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
    
        bd.gravar(despesa)
    }
}*/

/*function verificaDados(ano, mes, dia, tipo, descricao, valor){
    if((ano || mes || dia ||tipo || descricao || valor) === "") {
        return 1
    }
    return 0
} */
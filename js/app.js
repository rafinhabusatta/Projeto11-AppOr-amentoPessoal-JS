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

    consultaDespesas() {
        console.log("Consulta de despesas ativa.")
    }

    removerDespesa() {
        console.log("Remoção de despesa feita com sucesso!")
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
}

let bd = new BD()

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
class Despesa {
    constructor(ano, dia, mes, tipo, descricao, valor) {
        this.ano = ano
        this.dia = dia
        this.mes = mes
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    verificaDados() {
        console.log("Verificação de dados ativa.")
    }

    cadastroDespesa() {
        console.log("Cadastro de despesa feito com sucesso!")
    }

    consultaDespesas() {
        console.log("Consulta de despesas ativa.")
    }

    removerDespesa() {
        console.log("Remoção de despesa feita com sucesso!")
    }
}

function verificaDados(ano, mes, dia, tipo, descricao, valor){
    if((ano || mes || dia ||tipo || descricao || valor) === "") {
        return 1
    }
    return 0
}

function cadastrarDespesa() {
    let ano = document.querySelector("#ano")
    let mes = document.querySelector("#mes")
    let dia = document.querySelector("#dia")
    let tipo = document.querySelector("#tipo")
    let descricao = document.querySelector("#descricao")
    let valor = document.querySelector("#valor")

    if(verificaDados(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value) == 1) {
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
    
        gravar(despesa)
    }
}

function gravar(d) {
    localStorage.setItem('despesa', JSON.stringify(d))
}
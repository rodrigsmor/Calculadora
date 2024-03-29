const botaoPonto = document.querySelector(".ponto");
const botaoDeApagar = document.querySelector(".apagar");
const botaoNumeros = document.querySelectorAll(".numero");
const botaoResultado = document.querySelector(".resultado");
const botaoLimparTudo = document.querySelector(".limpar-tudo");
const botaoOperadoresNumericos = document.querySelectorAll(".operacao");
const componenteOperacaoAtual = document.querySelector(".operacao-atual");
const componenteOperacaoAnterior = document.querySelector(".operacao-anterior");


var operacaoAtual = "";
var resultadoTotal = "";
var operacaoAnterior = "";

botaoNumeros.forEach((botao) => {
    botao.addEventListener("click", () => {
        adicionarNumero(botao.innerHTML);
    });
});

botaoPonto.addEventListener("click", () => {
    if(operacaoAtual.length < 13) {
        if(!operacaoAtual.includes(".") && operacaoAtual != "") {
            operacaoAtual = operacaoAtual + ".";

            if(resultadoTotal != "")
                resultadoTotal = "";

            atualizarOutput();
        }
    }
});

botaoDeApagar.onclick = function () {
    apagar();
};

botaoLimparTudo.onclick = function () {
    limparTudo();
    atualizarOutput();
}

botaoOperadoresNumericos.forEach((operador) => {
    operador.addEventListener("click", () => {
        selecionarOperadorMatematico(operador.innerHTML);
    });
});

botaoResultado.onclick = () => {
    if(operacaoAtual != "" && operacaoAnterior != "") {
        efetuarOperacao("");
    }
};

function adicionarNumero(numeroClicado) {
    resultadoTotal != "" ? limparTudo() : atualizarOutput();
    
    if(operacaoAtual.length < 14)
        operacaoAtual = operacaoAtual + numeroClicado;
    else 
        alert("número máximo de digitos atingido");

    atualizarOutput();
}

function apagar() {
    operacaoAtual = operacaoAtual.substring(0, operacaoAtual.length - 1);
    atualizarOutput();
}

function limparTudo() {
    operacaoAtual = "";
    resultadoTotal = "";
    operacaoAnterior = "";
}

function atualizarOutput() {
    componenteOperacaoAtual.innerHTML = operacaoAtual;
    componenteOperacaoAnterior.innerHTML = operacaoAnterior;
}

function selecionarOperadorMatematico(operador) {
    if (operacaoAtual == "") {
      trocarOperador(operador);
    }

    if(operacaoAtual != "" || resultadoTotal != "") {
        operacaoAnterior == "" ? adicionarOperadorMatematico(operador) : efetuarOperacao(operador);
        resultadoTotal = "";
    }
}

function adicionarOperadorMatematico(operador) {
    operacaoAnterior = operacaoAtual + operador;
    operacaoAtual = "";

    atualizarOutput();
}

function trocarOperador(operador) {
    if (
      operacaoAnterior.includes("+") ||
      operacaoAnterior.includes("-") ||
      operacaoAnterior.includes("×") ||
      operacaoAnterior.includes("÷")
    )
      operacaoAnterior = operacaoAnterior.substring(0, operacaoAnterior.length - 1) + operador;

    atualizarOutput();
}

function efetuarOperacao(proximoOperador) {
    let operador = operacaoAnterior.charAt(operacaoAnterior.length - 1)
    operacaoAnterior = operacaoAnterior.substring(0, operacaoAnterior.length - 1);

    switch (operador) {
        case "+":
            resultadoTotal = parseFloat(operacaoAnterior) + parseFloat(operacaoAtual);
        break;

        case "-":
            resultadoTotal = parseFloat(operacaoAnterior) - parseFloat(operacaoAtual);
        break;

        case "÷":
            resultadoTotal = parseFloat(operacaoAnterior) / parseFloat(operacaoAtual);
        break;

        case "×":
            resultadoTotal = parseFloat(operacaoAnterior) * parseFloat(operacaoAtual);
        break;
    }

    if(resultadoTotal % 1 != 0) 
        resultadoTotal = resultadoTotal.toFixed(8); 

    operacaoAtual = resultadoTotal.toString();

    if(proximoOperador != "") {
        operacaoAnterior = operacaoAtual + proximoOperador;
        operacaoAtual = "";
        resultadoTotal = "";
    }
    else 
        operacaoAnterior = "";

    atualizarOutput();
}
// script.js

// Prevenindo o comportamento padrão ao apertar Enter e adicionando o número à equação
document.getElementById('num').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Previne o comportamento padrão do formulário
        addNumber(); // Chama a função para adicionar o número à equação
    }
});

// Prevenindo o comportamento padrão ao apertar Enter no campo de operador e adicionando o operador
document.getElementById('operator').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Previne o comportamento padrão do formulário
        addOperator(); // Chama a função para adicionar o operador à equação
    }
});

// Função para adicionar número à equação
function addNumber() {
    const numInput = document.getElementById('num');
    const number = numInput.value;
    if (number) {
        appendToEquation(number);
        numInput.value = ''; // Limpar o campo de número
    }
}

// Função para adicionar operador à equação
function addOperator() {
    const operatorSelect = document.getElementById('operator');
    const operator = operatorSelect.value;
    if (operator) {
        appendToEquation(operator);
        operatorSelect.value = '+'; // Resetar seleção de operador para o padrão
    }
}

// Função auxiliar para adicionar um item à equação
function appendToEquation(item) {
    const equationDisplay = document.getElementById('equationDisplay');
    let currentText = equationDisplay.value.trim();

    // Se o item for um parêntese e o texto atual terminar com um número, adicionar um operador de multiplicação
    if (item === '(' && currentText.length > 0 && !['+', '-', '*', '/'].includes(currentText.slice(-1))) {
        currentText += '*';
    }

    // Adicionar o item corretamente à equação
    if (item === '(' || item === ')') {
        equationDisplay.value = `${currentText} ${item}`;
    } else {
        const lastChar = currentText.slice(-1);
        if (lastChar === '' || lastChar === '(' || lastChar === '+' || lastChar === '-' || lastChar === '.' || lastChar === '/') {
            equationDisplay.value = `${currentText} ${item}`;
        } else {
            equationDisplay.value = `${currentText}${item}`;
        }
    }
}

// Função para calcular a equação
function calculate() {
    const equationDisplay = document.getElementById('equationDisplay');
    const equation = equationDisplay.value.trim();

    try {
        const result = eval(equation.replace('.', '*')); // Substituindo o ponto por *
        document.getElementById('resultText').innerText = result;
    } catch (error) {
        document.getElementById('resultText').innerText = 'Erro na equação';
    }
}

// Função para limpar a equação
function clearEquation() {
    document.getElementById('equationDisplay').value = '';
    document.getElementById('resultText').innerText = '';
}

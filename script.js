let display = document.getElementById('result');
let currentInput = '';
let operator = '';
let firstOperand = '';
let operatorPressed = false;

function appendNumber(number) {
    if (operatorPressed) {
        currentInput = '';
        operatorPressed = false;
    }
    currentInput += number;
    updateDisplay(currentInput);
}

function appendOperator(op) {
    if (currentInput === '' && op === '-') {
        currentInput = '-';
        updateDisplay(currentInput);
        return;
    }
    if (firstOperand === '') {
        firstOperand = currentInput;
        currentInput = '';
    } else if (currentInput !== '') {
        calculateResult();
        firstOperand = display.value;
    }
    operator = op;
    operatorPressed = true;
}

function updateDisplay(value) {
    display.value = value;
}

function clearDisplay() {
    currentInput = '';
    firstOperand = '';
    operator = '';
    updateDisplay('0');
}

function deleteLast() {
    if (operatorPressed) return;
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || '0');
}

function calculateResult() {
    if (firstOperand === '' || currentInput === '' || operator === '') {
        return;
    }

    let result;
    const prev = parseFloat(firstOperand);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) {
        updateDisplay('Error');
        return;
    }

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                updateDisplay('Error');
                return;
            }
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }
    updateDisplay(result);
    firstOperand = result;
    currentInput = '';
    operatorPressed = true;
}

// Initialize display
updateDisplay('0');


document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelector('.buttons');

    let currentInput = '0';
    let operator = null;
    let previousInput = null;
    let waitingForSecondOperand = false;

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function calculate(firstOperand, secondOperand, operator) {
        firstOperand = parseFloat(firstOperand);
        secondOperand = parseFloat(secondOperand);

        if (operator === '+') return firstOperand + secondOperand;
        if (operator === '-') return firstOperand - secondOperand;
        if (operator === '*') return firstOperand * secondOperand;
        if (operator === '/') {
            if (secondOperand === 0) {
                return 'Error';
            }
            return firstOperand / secondOperand;
        }
        return secondOperand;
    }

    buttons.addEventListener('click', (event) => {
        const { target } = event;
        const { textContent } = target;

        if (!target.matches('button')) {
            return;
        }

        switch (textContent) {
            case 'C':
                currentInput = '0';
                operator = null;
                previousInput = null;
                waitingForSecondOperand = false;
                break;
            case '+':
            case '-':
            case '*':
            case '/':
                if (operator && !waitingForSecondOperand) {
                    const result = calculate(previousInput, currentInput, operator);
                    currentInput = String(result);
                    previousInput = currentInput;
                } else {
                    previousInput = currentInput;
                }
                operator = textContent;
                waitingForSecondOperand = true;
                break;
            case '=':
                if (operator && previousInput !== null) {
                    const result = calculate(previousInput, currentInput, operator);
                    currentInput = String(result);
                    operator = null;
                    previousInput = null;
                    waitingForSecondOperand = false;
                }
                break;
            case '.':
                if (!currentInput.includes('.')) {
                    currentInput += '.';
                }
                break;
            case '+/-':
                currentInput = String(parseFloat(currentInput) * -1);
                break;
            case '%':
                currentInput = String(parseFloat(currentInput) / 100);
                break;
            default: // Numbers
                if (waitingForSecondOperand) {
                    currentInput = textContent;
                    waitingForSecondOperand = false;
                } else {
                    currentInput = currentInput === '0' ? textContent : currentInput + textContent;
                }
                break;
        }
        updateDisplay();
    });
});

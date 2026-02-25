// script.js for calculator functionality

document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('button');
    
    let currentOperand = '0';
    let previousOperand = '';
    let operation = undefined;
    let shouldResetDisplay = false;

    // Update the display
    function updateDisplay() {
        display.textContent = currentOperand;
        
        // Handle very long numbers
        if (currentOperand.length > 12) {
            const num = parseFloat(currentOperand);
            if (!isNaN(num) && isFinite(num)) {
                display.textContent = num.toExponential(6);
            }
        }
    }

    // Clear all
    function clear() {
        currentOperand = '0';
        previousOperand = '';
        operation = undefined;
        shouldResetDisplay = false;
        updateDisplay();
    }

    // Delete last character
    function deleteNumber() {
        if (shouldResetDisplay) {
            currentOperand = '0';
            shouldResetDisplay = false;
        } else {
            currentOperand = currentOperand.toString().slice(0, -1);
            if (currentOperand === '' || currentOperand === '-') {
                currentOperand = '0';
            }
        }
        updateDisplay();
    }

    // Append number
    function appendNumber(number) {
        if (shouldResetDisplay) {
            currentOperand = '';
            shouldResetDisplay = false;
        }
        
        // Prevent multiple zeros at start
        if (currentOperand === '0' && number === '0') return;
        
        // Replace initial zero with number
        if (currentOperand === '0' && number !== '.') {
            currentOperand = number;
        } else {
            // Limit to reasonable length
            if (currentOperand.length < 16) {
                currentOperand += number;
            }
        }
        updateDisplay();
    }

    // Append decimal
    function appendDecimal() {
        if (shouldResetDisplay) {
            currentOperand = '0';
            shouldResetDisplay = false;
        }
        
        // Only one decimal point
        if (currentOperand.includes('.')) return;
        
        currentOperand += '.';
        updateDisplay();
    }

    // Choose operation
    function chooseOperation(op) {
        if (currentOperand === '') return;
        
        if (previousOperand !== '') {
            compute();
        }
        
        operation = op;
        previousOperand = currentOperand;
        shouldResetDisplay = true;
    }

    // Compute the result
    function compute() {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                if (current === 0) {
                    currentOperand = 'Error';
                    updateDisplay();
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        
        // Round to avoid floating point errors
        computation = Math.round(computation * 100000000) / 100000000;
        currentOperand = computation.toString();
        operation = undefined;
        previousOperand = '';
        shouldResetDisplay = true;
        updateDisplay();
    }

    // Toggle sign
    function toggleSign() {
        if (currentOperand === '0') return;
        if (currentOperand === 'Error') return;
        
        if (currentOperand.startsWith('-')) {
            currentOperand = currentOperand.slice(1);
        } else {
            currentOperand = '-' + currentOperand;
        }
        updateDisplay();
    }

    // Percentage
    function percentage() {
        if (currentOperand === '0' || currentOperand === 'Error') return;
        
        const current = parseFloat(currentOperand);
        currentOperand = (current / 100).toString();
        updateDisplay();
    }

    // Get button type and handle click
    function handleButtonClick(e) {
        const button = e.target;
        
        if (button.tagName !== 'BUTTON') return;
        
        const value = button.textContent;
        
        if (value === 'C') {
            clear();
            return;
        }
        
        if (value === '+/-') {
            toggleSign();
            return;
        }
        
        if (value === '%') {
            percentage();
            return;
        }
        
        if (value === '=') {
            compute();
            return;
        }
        
        if (['+', '-', '*', '/'].includes(value)) {
            chooseOperation(value);
            return;
        }
        
        if (value === '.') {
            appendDecimal();
            return;
        }
        
        // Number button
        appendNumber(value);
    }

    // Add event listeners
    buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        const key = e.key;
        
        if (key >= '0' && key <= '9') {
            appendNumber(key);
        } else if (key === '.') {
            appendDecimal();
        } else if (key === '=' || key === 'Enter') {
            compute();
        } else if (key === 'Escape') {
            clear();
        } else if (key === 'Backspace') {
            deleteNumber();
        } else if (key === '+') {
            chooseOperation('+');
        } else if (key === '-') {
            chooseOperation('-');
        } else if (key === '*') {
            chooseOperation('*');
        } else if (key === '/') {
            e.preventDefault();
            chooseOperation('/');
        }
    });
});

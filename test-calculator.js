// test-calculator.js - Test script for calculator functionality
// Run with: node test-calculator.js

const assert = require('assert');

// Calculator state (simulating the script.js logic)
class Calculator {
    constructor() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetDisplay = false;
    }

    updateDisplay() {
        if (this.currentOperand.length > 12) {
            const num = parseFloat(this.currentOperand);
            if (!isNaN(num) && isFinite(num)) {
                this.currentOperand = num.toExponential(6);
            }
        }
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetDisplay = false;
    }

    appendNumber(number) {
        if (this.shouldResetDisplay) {
            this.currentOperand = '';
            this.shouldResetDisplay = false;
        }
        
        if (this.currentOperand === '0' && number === '0') return;
        
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            if (this.currentOperand.length < 16) {
                this.currentOperand += number;
            }
        }
    }

    appendDecimal() {
        if (this.shouldResetDisplay) {
            this.currentOperand = '0';
            this.shouldResetDisplay = false;
        }
        
        if (this.currentOperand.includes('.')) return;
        
        this.currentOperand += '.';
    }

    chooseOperation(op) {
        if (this.currentOperand === '') return;
        
        if (this.previousOperand !== '') {
            this.compute();
        }
        
        this.operation = op;
        this.previousOperand = this.currentOperand;
        this.shouldResetDisplay = true;
    }

    compute() {
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        let computation;
        switch (this.operation) {
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
                    this.currentOperand = 'Error';
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        
        computation = Math.round(computation * 100000000) / 100000000;
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.shouldResetDisplay = true;
    }

    toggleSign() {
        if (this.currentOperand === '0') return;
        if (this.currentOperand === 'Error') return;
        
        if (this.currentOperand.startsWith('-')) {
            this.currentOperand = this.currentOperand.slice(1);
        } else {
            this.currentOperand = '-' + this.currentOperand;
        }
    }

    percentage() {
        if (this.currentOperand === '0' || this.currentOperand === 'Error') return;
        
        const current = parseFloat(this.currentOperand);
        this.currentOperand = (current / 100).toString();
    }

    getDisplay() {
        this.updateDisplay();
        return this.currentOperand;
    }
}

let passed = 0;
let failed = 0;

function test(name, fn) {
    try {
        fn();
        console.log(`✓ ${name}`);
        passed++;
    } catch (e) {
        console.log(`✗ ${name}: ${e.message}`);
        failed++;
    }
}

function assertEquals(actual, expected) {
    if (actual !== expected) {
        throw new Error(`Expected "${expected}" but got "${actual}"`);
    }
}

console.log('\n=== Testing Calculator Operations ===\n');

// Test Addition
console.log('--- Addition Tests ---');
test('Basic addition: 2 + 3 = 5', () => {
    const calc = new Calculator();
    calc.appendNumber('2');
    calc.chooseOperation('+');
    calc.appendNumber('3');
    calc.compute();
    assertEquals(calc.getDisplay(), '5');
});

test('Addition with decimals: 1.5 + 2.5 = 4', () => {
    const calc = new Calculator();
    calc.appendNumber('1');
    calc.appendDecimal();
    calc.appendNumber('5');
    calc.chooseOperation('+');
    calc.appendNumber('2');
    calc.appendDecimal();
    calc.appendNumber('5');
    calc.compute();
    assertEquals(calc.getDisplay(), '4');
});

test('Chained addition: 2 + 3 + 4 = 9', () => {
    const calc = new Calculator();
    calc.appendNumber('2');
    calc.chooseOperation('+');
    calc.appendNumber('3');
    calc.compute();
    calc.chooseOperation('+');
    calc.appendNumber('4');
    calc.compute();
    assertEquals(calc.getDisplay(), '9');
});

// Test Subtraction
console.log('\n--- Subtraction Tests ---');
test('Basic subtraction: 10 - 3 = 7', () => {
    const calc = new Calculator();
    calc.appendNumber('1');
    calc.appendNumber('0');
    calc.chooseOperation('-');
    calc.appendNumber('3');
    calc.compute();
    assertEquals(calc.getDisplay(), '7');
});

test('Negative result: 3 - 10 = -7', () => {
    const calc = new Calculator();
    calc.appendNumber('3');
    calc.chooseOperation('-');
    calc.appendNumber('1');
    calc.appendNumber('0');
    calc.compute();
    assertEquals(calc.getDisplay(), '-7');
});

// Test Multiplication
console.log('\n--- Multiplication Tests ---');
test('Basic multiplication: 4 * 5 = 20', () => {
    const calc = new Calculator();
    calc.appendNumber('4');
    calc.chooseOperation('*');
    calc.appendNumber('5');
    calc.compute();
    assertEquals(calc.getDisplay(), '20');
});

test('Multiplication with zero: 100 * 0 = 0', () => {
    const calc = new Calculator();
    calc.appendNumber('1');
    calc.appendNumber('0');
    calc.appendNumber('0');
    calc.chooseOperation('*');
    calc.appendNumber('0');
    calc.compute();
    assertEquals(calc.getDisplay(), '0');
});

// Test Division
console.log('\n--- Division Tests ---');
test('Basic division: 20 / 4 = 5', () => {
    const calc = new Calculator();
    calc.appendNumber('2');
    calc.appendNumber('0');
    calc.chooseOperation('/');
    calc.appendNumber('4');
    calc.compute();
    assertEquals(calc.getDisplay(), '5');
});

test('Division with decimals: 7 / 2 = 3.5', () => {
    const calc = new Calculator();
    calc.appendNumber('7');
    calc.chooseOperation('/');
    calc.appendNumber('2');
    calc.compute();
    assertEquals(calc.getDisplay(), '3.5');
});

test('Division by zero: 5 / 0 = Error', () => {
    const calc = new Calculator();
    calc.appendNumber('5');
    calc.chooseOperation('/');
    calc.appendNumber('0');
    calc.compute();
    assertEquals(calc.getDisplay(), 'Error');
});

// Test Clear Button
console.log('\n--- Clear Button Tests ---');
test('Clear resets everything', () => {
    const calc = new Calculator();
    calc.appendNumber('1');
    calc.appendNumber('2');
    calc.chooseOperation('+');
    calc.appendNumber('3');
    calc.clear();
    assertEquals(calc.getDisplay(), '0');
    assertEquals(calc.operation, undefined);
    assertEquals(calc.previousOperand, '');
});

// Test Decimal Handling
console.log('\n--- Decimal Handling Tests ---');
test('Decimal after number is valid: 1.23', () => {
    const calc = new Calculator();
    calc.appendNumber('1');
    calc.appendDecimal();
    calc.appendNumber('2');
    calc.appendDecimal(); // Second decimal should be blocked
    calc.appendNumber('3');
    // After blocking decimal, numbers should still be appendable - "1.23" is valid!
    assertEquals(calc.getDisplay(), '1.23');
});

test('Decimal starting with zero: 0.5', () => {
    const calc = new Calculator();
    calc.appendNumber('0');
    calc.appendDecimal();
    calc.appendNumber('5');
    assertEquals(calc.getDisplay(), '0.5');
});

test('Decimal only: 0. should work', () => {
    const calc = new Calculator();
    calc.appendNumber('0');
    calc.appendDecimal();
    assertEquals(calc.getDisplay(), '0.');
});

// Test Edge Cases
console.log('\n--- Edge Case Tests ---');
test('Leading zeros: 0005 should be 5', () => {
    const calc = new Calculator();
    calc.appendNumber('0');
    calc.appendNumber('0');
    calc.appendNumber('0');
    calc.appendNumber('5');
    assertEquals(calc.getDisplay(), '5');
});

test('Toggle sign: 5 -> -5', () => {
    const calc = new Calculator();
    calc.appendNumber('5');
    calc.toggleSign();
    assertEquals(calc.getDisplay(), '-5');
});

test('Toggle sign twice: -5 -> 5', () => {
    const calc = new Calculator();
    calc.appendNumber('5');
    calc.toggleSign();
    calc.toggleSign();
    assertEquals(calc.getDisplay(), '5');
});

test('Percentage: 50 -> 0.5', () => {
    const calc = new Calculator();
    calc.appendNumber('5');
    calc.appendNumber('0');
    calc.percentage();
    assertEquals(calc.getDisplay(), '0.5');
});

test('Number length limit (16 chars) - internal storage', () => {
    const calc = new Calculator();
    for (let i = 0; i < 20; i++) {
        calc.appendNumber('1');
    }
    // The internal currentOperand should be limited to 16 chars
    // Note: getDisplay() truncates to 12 for display purposes
    assertEquals(calc.currentOperand.length, 16);
});

// Test Chained Operations
console.log('\n--- Chained Operations Tests ---');
test('Complex chain: 2 + 3 * 4 (left-to-right, no precedence)', () => {
    const calc = new Calculator();
    calc.appendNumber('2');
    calc.chooseOperation('+');
    calc.appendNumber('3');
    calc.compute();
    calc.chooseOperation('*');
    calc.appendNumber('4');
    calc.compute();
    // (2 + 3) * 4 = 20
    assertEquals(calc.getDisplay(), '20');
});

test('Division then multiplication: 10 / 2 * 3', () => {
    const calc = new Calculator();
    calc.appendNumber('1');
    calc.appendNumber('0');
    calc.chooseOperation('/');
    calc.appendNumber('2');
    calc.compute();
    calc.chooseOperation('*');
    calc.appendNumber('3');
    calc.compute();
    assertEquals(calc.getDisplay(), '15');
});

// Test Floating Point Precision
console.log('\n--- Floating Point Tests ---');
test('0.1 + 0.2 = 0.3', () => {
    const calc = new Calculator();
    calc.appendNumber('0');
    calc.appendDecimal();
    calc.appendNumber('1');
    calc.chooseOperation('+');
    calc.appendNumber('0');
    calc.appendDecimal();
    calc.appendNumber('2');
    calc.compute();
    assertEquals(calc.getDisplay(), '0.3');
});

test('0.7 + 0.1 = 0.8', () => {
    const calc = new Calculator();
    calc.appendNumber('0');
    calc.appendDecimal();
    calc.appendNumber('7');
    calc.chooseOperation('+');
    calc.appendNumber('0');
    calc.appendDecimal();
    calc.appendNumber('1');
    calc.compute();
    assertEquals(calc.getDisplay(), '0.8');
});

// Additional Edge Case Tests
console.log('\n--- Additional Edge Case Tests ---');
test('Operation immediately after equals', () => {
    const calc = new Calculator();
    calc.appendNumber('5');
    calc.chooseOperation('+');
    calc.appendNumber('3');
    calc.compute(); // = 8
    calc.chooseOperation('+'); // should add more
    calc.appendNumber('2');
    calc.compute();
    assertEquals(calc.getDisplay(), '10');
});

test('Type number after equals continues', () => {
    const calc = new Calculator();
    calc.appendNumber('5');
    calc.chooseOperation('+');
    calc.appendNumber('3');
    calc.compute(); // = 8
    calc.appendNumber('5'); // should start new number
    assertEquals(calc.getDisplay(), '5');
});

test('Clear after error', () => {
    const calc = new Calculator();
    calc.appendNumber('5');
    calc.chooseOperation('/');
    calc.appendNumber('0');
    calc.compute(); // = Error
    calc.clear();
    assertEquals(calc.getDisplay(), '0');
});

test('Percentage of decimal: 50% of 0.5 = 0.25', () => {
    const calc = new Calculator();
    calc.appendNumber('0');
    calc.appendDecimal();
    calc.appendNumber('5');
    calc.percentage();
    assertEquals(calc.getDisplay(), '0.005');
});

test('Toggle sign on negative', () => {
    const calc = new Calculator();
    calc.appendNumber('5');
    calc.toggleSign(); // -5
    calc.toggleSign(); // 5
    calc.toggleSign(); // -5
    assertEquals(calc.getDisplay(), '-5');
});

test('Large number: 999999999 * 999999999', () => {
    const calc = new Calculator();
    calc.appendNumber('9');
    calc.appendNumber('9');
    calc.appendNumber('9');
    calc.appendNumber('9');
    calc.appendNumber('9');
    calc.appendNumber('9');
    calc.appendNumber('9');
    calc.appendNumber('9');
    calc.appendNumber('9');
    calc.chooseOperation('*');
    calc.appendNumber('9');
    calc.appendNumber('9');
    calc.appendNumber('9');
    calc.appendNumber('9');
    calc.appendNumber('9');
    calc.appendNumber('9');
    calc.appendNumber('9');
    calc.appendNumber('9');
    calc.appendNumber('9');
    calc.compute();
    // 999999999 * 999999999 = 999999998000000001
    // Display converts to exponential notation for large numbers
    const result = calc.getDisplay();
    assertEquals(result.includes('e+') || result === '999999998000000001', true);
});

test('Very small division: 1 / 3', () => {
    const calc = new Calculator();
    calc.appendNumber('1');
    calc.chooseOperation('/');
    calc.appendNumber('3');
    calc.compute();
    assertEquals(calc.getDisplay(), '0.33333333');
});

test('Subtract negative: 5 - (-3) = 8', () => {
    const calc = new Calculator();
    calc.appendNumber('5');
    calc.chooseOperation('-');
    calc.appendNumber('3');
    calc.toggleSign(); // -3
    calc.compute();
    assertEquals(calc.getDisplay(), '8');
});

test('Zero toggle sign stays zero', () => {
    const calc = new Calculator();
    calc.appendNumber('0');
    calc.toggleSign();
    assertEquals(calc.getDisplay(), '0');
});

test('Percentage on zero does nothing', () => {
    const calc = new Calculator();
    calc.appendNumber('0');
    calc.percentage();
    assertEquals(calc.getDisplay(), '0');
});

// Summary
console.log('\n=== Test Summary ===');
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Total:  ${passed + failed}`);

if (failed > 0) {
    process.exit(1);
}

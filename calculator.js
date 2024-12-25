// 1. CORE CALCULATOR LOGIC
// These are the fundamental operations our calculator can perform

/**
 * Basic arithmetic functions
 */
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
    if (b === 0) throw new Error("Cannot divide by zero!");
    return a / b;
}

/**
 * Main operation handler - converts operator symbols to actions
 */
function operate(operator, a, b) {
    switch(operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: throw new Error('Invalid operator');
    }
}

// 2. CALCULATOR STATE
// These variables track the calculator's current state
let firstNumber = null;
let operator = null;
let secondNumber = null;
let displayValue = '0';
let waitingForSecondNumber = false;

// 3. UI INTERACTION FUNCTIONS
// These functions handle user interactions and update the display

function updateDisplay() {
    const display = document.querySelector('.display');
    display.textContent = displayValue;
}

function inputDigit(digit) {
    if (waitingForSecondNumber) {
        displayValue = digit;
        waitingForSecondNumber = false;
    } else {
        if (displayValue === '0') {
            displayValue = digit;
        } else {
            displayValue += digit;
        }
    }
    updateDisplay();
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);
    
    if (firstNumber === null) {
        firstNumber = inputValue;
    } else if (operator) {
        const result = operate(operator, firstNumber, inputValue);
        displayValue = String(result);
        firstNumber = result;
        updateDisplay();
    }
    
    waitingForSecondNumber = true;
    operator = nextOperator;
}

function handleEquals() {
    const inputValue = parseFloat(displayValue);
    
    if (operator && firstNumber !== null) {
        const result = operate(operator, firstNumber, inputValue);
        displayValue = String(result);
        // Reset the calculator state
        firstNumber = null;
        operator = null;
        waitingForSecondNumber = false;
        updateDisplay();
    }
}

function handleClear() {
    displayValue = '0';
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
    updateDisplay();
}

// 4. EVENT LISTENERS
// Wire up the UI elements to our handler functions
document.addEventListener('DOMContentLoaded', () => {
    // Get all number buttons (excluding operators and special buttons)
    const digitButtons = document.querySelectorAll('.buttons button:not(.operator):not(.clear):not(.equals)');
    
    // Add click handlers to each digit button
    digitButtons.forEach(button => {
        button.addEventListener('click', () => {
            inputDigit(button.textContent);
        });
    });

    // Add operator button handlers
    const operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            handleOperator(button.textContent);
        });
    });

    // Add equals button handler
    const equalsButton = document.querySelector('.equals');
    equalsButton.addEventListener('click', handleEquals);

    // Add clear button handler
    const clearButton = document.querySelector('.clear');
    clearButton.addEventListener('click', handleClear);

    // Initialize display
    updateDisplay();
}); 
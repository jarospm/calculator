// 1. CORE CALCULATOR LOGIC
// These are the fundamental operations our calculator can perform

/**
 * Basic arithmetic functions
 */
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
    if (b === 0) {
        throw new Error("Sorry, no can do!");
    }
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
let justCompletedOperation = false;

// 3. UI INTERACTION FUNCTIONS
// These functions handle user interactions and update the display

function updateDisplay() {
    const display = document.querySelector('.display');
    display.textContent = displayValue;
}

function inputDigit(digit) {
    if (waitingForSecondNumber || justCompletedOperation) {
        displayValue = digit;
        waitingForSecondNumber = false;
        justCompletedOperation = false;
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
        // First number being entered
        firstNumber = inputValue;
        waitingForSecondNumber = true;
    } else if (operator && !waitingForSecondNumber) {
        // We have both numbers and an operator, safe to calculate
        try {
            const result = operate(operator, firstNumber, inputValue);
            displayValue = String(result);
            firstNumber = result;
            justCompletedOperation = true;
        } catch (error) {
            displayValue = error.message;
            firstNumber = null;
            justCompletedOperation = true;
        }
        updateDisplay();
        waitingForSecondNumber = true;
    }
    // Update the operator regardless
    operator = nextOperator;
}

function handleEquals() {
    const inputValue = parseFloat(displayValue);
    
    if (operator && firstNumber !== null) {
        try {
            const result = operate(operator, firstNumber, inputValue);
            displayValue = String(result);
        } catch (error) {
            displayValue = error.message;
        }
        // Reset the calculator state
        firstNumber = null;
        operator = null;
        waitingForSecondNumber = false;
        justCompletedOperation = true;
        updateDisplay();
    }
}

function handleClear() {
    displayValue = '0';
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
    justCompletedOperation = false;
    updateDisplay();
}

function handleBackspace() {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = '0';
    }
    updateDisplay();
}

function inputDecimal() {
    // Don't add decimal if one already exists
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
}

function handleKeyboardInput(e) {
    // Numbers (both main keyboard and numpad)
    if ((e.key >= '0' && e.key <= '9')) {
        inputDigit(e.key);
    }
    
    // Operators
    if (['+', '-', '*', '/'].includes(e.key)) {
        handleOperator(e.key);
    }
    
    // Enter or = for equals
    if (e.key === 'Enter' || e.key === '=') {
        handleEquals();
    }
    
    // Escape or Delete for clear
    if (e.key === 'Escape' || e.key === 'Delete') {
        handleClear();
    }
    
    // Add backspace handler
    if (e.key === 'Backspace') {
        handleBackspace();
    }
    
    // Add decimal handler
    if (e.key === '.') {
        inputDecimal();
    }
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

    // Add backspace button handler
    const backspaceButton = document.querySelector('.backspace');
    backspaceButton.addEventListener('click', handleBackspace);

    // Add decimal button handler
    const decimalButton = document.querySelector('.decimal');
    decimalButton.addEventListener('click', inputDecimal);

    // Add keyboard support
    document.addEventListener('keydown', handleKeyboardInput);

    // Initialize display
    updateDisplay();
}); 
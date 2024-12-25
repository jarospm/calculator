// Variables to store the calculator operation
let firstNumber = null;
let operator = null;
let secondNumber = null;

// Basic arithmetic functions

/**
 * Adds two numbers together
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} The sum of a and b
 */
function add(a, b) {
    return a + b;
}

/**
 * Subtracts the second number from the first
 * @param {number} a - First number
 * @param {number} b - Second number to subtract from first
 * @returns {number} The difference between a and b
 */
function subtract(a, b) {
    return a - b;
}

/**
 * Multiplies two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} The product of a and b
 */
function multiply(a, b) {
    return a * b;
}

/**
 * Divides the first number by the second
 * @param {number} a - Number to be divided (dividend)
 * @param {number} b - Number to divide by (divisor)
 * @returns {number} The quotient of a divided by b
 * @throws {Error} If trying to divide by zero
 */
function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero!");
    }
    return a / b;
}

/**
 * Performs a calculation based on the operator and two numbers
 * @param {string} operator - The mathematical operator (+, -, *, /)
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} The result of the operation
 * @throws {Error} If an invalid operator is provided
 */
function operate(operator, a, b) {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            throw new Error('Invalid operator');
    }
} 
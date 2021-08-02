// Calculator element selectors
const display = document.querySelector('#display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clear = document.querySelector('#clear');
const power = document.querySelector('#power');
const dot = document.querySelector('#dot');
const sum = document.querySelector('#sum');
const historyDisplay = document.querySelector('#history');


// Memory variables
let memory = [];
let queue = [];
let history = [];


// Power switch
power.addEventListener('click', () => {
    display.classList.toggle('off');
    historyDisplay.classList.toggle('off');
    numbers.forEach(number => number.toggleAttribute('disabled'));
    operators.forEach(number => number.toggleAttribute('disabled'));
    clear.toggleAttribute('disabled');
    // dot.toggleAttribute('disabled');
});


// Number-buttons: 1, 2, 3, 4, 5, 6, 7, 8, 9, 0
numbers.forEach(number => {

    number.addEventListener('click', (e) => {

        if (number.textContent === "0" && queue.length === 0) return

        if (history.length === 0) historyDisplay.textContent = "";

        queue.push(number.textContent);
        string = queue.join("");
        display.textContent = string;

        console.log(queue);
    });
});

// Operator-buttons: +, -, *, /, =
operators.forEach(operator => {

    operator.addEventListener('click', () => {

        // Clear possible bugs
        if (queue.length === 0) return console.log("Denied");

        if (operator.id === 'sum' && memory.length < 2) return console.log("Denied");

        console.log("Operator event start");

        // Convert display value to Integer and push it to memory
        memory.push(parseInt(display.textContent));

        // Convert operator name to symbol
        let op = convert(operator.id);

        // Push values to history
        history.push(display.textContent);
        if (!(op === '=')) history.push(op);

        // Push operator to memory when it's not sum operator
        if (!(operator.id === 'sum')) memory.push(operator.id);

        // Display sum total
        let sum = 0;

        if (memory.length > 2) {

            // Assign numbers and operator from memory with index numbers, display result on calculator display.
            sum = operate(memory[1], memory[0], memory[2]);
            display.textContent = +sum.toFixed(5);
            historyDisplay.textContent = history.join(" ");

            // Add result to memory and reverse array for future calculations
            memory.push(sum)
            memory.reverse();

            // Clear memory if sum is calculated
            if (operator.id === 'sum') {

                memory.length = 0;
                history.length = 0;
            }
            // Else continue
            else {

                memory.length = 2;
            }
        }

        // Empty queue to display new numbers
        queue.length = 0;

        console.log("End of operator event");

    });
});


// Clear-button
clear.addEventListener('click', () => {
    memory.length = 0;
    queue.length = 0;
    display.textContent = 0;
    historyDisplay.textContent = "";
})


// Calculator operators
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}


// o = operator, a = first number, b = second number
const operate = (o, a, b) => {

    switch (o) {

        case "add":
            return add(a, b);
        case "subtract":
            return subtract(a, b);
        case "multiply":
            return multiply(a, b);
        case "divide":
            return divide(a, b);

        default:
            console.log("(Operate) something went wrong");
            break;
    }
}


// Convert operators to symbols
function convert(key) {
    switch (key) {
        case "add":
            return "+";
        case "subtract":
            return "-";
        case "multiply":
            return "*";
        case "divide":
            return "/";
        case "sum":
            return "=";

        default:
            console.log("(Convert) something went wrong");
            break;
    }
}
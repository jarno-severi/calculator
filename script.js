// Calculator element selectors
const display = document.querySelector('#display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clear = document.querySelector('#clear');
const power = document.querySelector('#power');
const dot = document.querySelector('#dot');


// Memory variables
let memory = [];
let queue = [];

// Power switch
power.addEventListener('click', () => {
    display.classList.toggle('off')
    numbers.forEach(number => number.toggleAttribute('disabled'));
    operators.forEach(number => number.toggleAttribute('disabled'));
    clear.toggleAttribute('disabled');
    dot.toggleAttribute('disabled');
});


    // Event-listeners
    numbers.forEach(number => {

        number.addEventListener('click', () => {

            queue.push(number.textContent);
            console.log(queue);
            string = queue.join("");
            display.textContent = string;

        });
    });

    operators.forEach(operator => {

        operator.addEventListener('click', () => {

            if (queue.length === 0) {

            } else {

                // Empty queue to display new numbers
                queue.length = 0;

                // Convert display content to Integer and save it to memory and add operator to memory as well.
                number = parseInt(display.textContent);
                memory.push(number);
                memory.push(operator.id);
                console.log(memory);

                let sum = 0;

                if (memory.length > 2) {

                    // Assign numbers and operator from memory with index numbers, display result on calculator display.
                    sum = operate(memory[1], memory[0], memory[2]);
                    display.textContent = sum;

                    // Add result to memory and clear memory from used items

                    memory.push(sum)
                    memory.reverse();

                    if (operator.id === 'sum') memory.length = 0;
                    else memory.length = 2;

                    console.log(memory);

                }
            }
        });
    });

    clear.addEventListener('click', () => {
        memory.length = 0;
        queue.length = 0;
        display.textContent = 0;
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
            console.log("Something went wrong");
            break;
    }
}
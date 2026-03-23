const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operation');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');

let currentNumber = "";
let previousNumber = "";
let operator = null;

// number click
numbers.forEach(number => {
    number.addEventListener('click', () => {
        currentNumber += number.textContent;
        display.innerText = currentNumber;
    });
});

// operator click
operators.forEach (button => {
    button.addEventListener('click', () => {
        if (currentNumber === "") {
            return;
        }
        if (previousNumber !== "") {
            calculate();
        }

        operator = button.textContent;
        previousNumber = currentNumber;
        currentNumber = "";
    });
});

// equal
equal.addEventListener('click', () => {
    calculate();
    operator = null;
});

// clear
clear.addEventListener("click", () => {
  currentNumber = "";
  previousNumber = "";
  operator = null;
  display.textContent = "0";
});

// calculation logic
function calculate() {
  let result;
  const prev = parseFloat(previousNumber);
  const current = parseFloat(currentNumber);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }

  currentNumber = result.toString();
  previousNumber = "";
  display.textContent = result;
}
const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operation');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const dot = document.querySelector('.decimal');

let currentNumber = "";
let previousNumber = "";
let operator = null;
let shouldResetScreen = false;

//disable dot button
function updateDotState() {
    dot.disabled = currentNumber.includes(".");
}

// number click
numbers.forEach(number => {
    number.addEventListener('click', () => {
      if (shouldResetScreen) {
        currentNumber = "";
        shouldResetScreen = false;
      }

      currentNumber += number.textContent;
      display.innerText = currentNumber;
      updateDotState();
    });
});

// operator click
operators.forEach (button => {
    button.addEventListener('click', () => {
        if (currentNumber === "") {
          operator = button.textContent;
          return;
        }
        if (previousNumber !== "") {
            operate();
        }

        operator = button.textContent;
        previousNumber = currentNumber;
        currentNumber = "";
    });
});

// equal
equal.addEventListener('click', () => {
    if (
        previousNumber === "" ||
        currentNumber === "" ||
        operator === null
    ) {
        return;
    }

    operate();
    operator = null;
});

//decimal
dot.addEventListener("click", () => {
    if (shouldResetScreen) {
        currentNumber = "";
        shouldResetScreen = false;
    }

    // prevent multiple decimals
    if (currentNumber.includes(".")) return;

    // allow "0." if starting fresh
    if (currentNumber === "") {
        currentNumber = "0";
    }

    currentNumber += ".";
    display.textContent = currentNumber;
    updateDotState();
});

// clear
clear.addEventListener("click", () => {
  currentNumber = "";
  previousNumber = "";
  operator = null;
  display.textContent = "0";
  updateDotState();
});

// calculation logic
function operate() {
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
      if (current === 0) {
        display.textContent = "Nice try. Even calculators can't divide by zero.";
        currentNumber = "";
        previousNumber = "";
        operator = null;

        setTimeout(() => {
          display.textContent = "0";
        }, 2000);

        return;
      }

      result = Math.round((prev / current) * 100) / 100
      break;
    default:
      return;
  }

  currentNumber = result.toString();
  previousNumber = "";
  display.textContent = result;

  shouldResetScreen = true;
  updateDotState();
}
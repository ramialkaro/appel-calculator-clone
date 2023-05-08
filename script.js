
const expression = document.querySelector('.expression');
const result = document.querySelector('.result');
const clearButton = document.querySelector('.clear');
const signButton = document.querySelector('.sign');
const percentButton = document.querySelector('.percent');
const operatorButtons = document.querySelectorAll('.operator');
const numberButtons = document.querySelectorAll('.number');

let currentValue = '0';
let operator = null;
let previousValue = null;

function updateDisplay() {
  result.textContent = currentValue;
}

function clear() {
  currentValue = '0';
  operator = null;
  previousValue = null;
  updateDisplay();
}

function toggleSign() {
  currentValue = String(Number(currentValue) * -1);
  updateDisplay();
}

function convertToPercent() {
  currentValue = String(Number(currentValue) / 100);
  updateDisplay();
}

function handleOperatorClick(value) {
  if (operator !== null) {
    performOperation();
  } else {
    previousValue = currentValue;
  }
  
  if (previousValue === null) {
    previousValue = currentValue;
  }
  
  operator = value;
  if (operator !== "=") {
    expression.textContent = `${previousValue} ${operator}`;
  } else {
    expression.textContent = `${previousValue}`;
  }

  currentValue = '0';
}


// Perform the operation and update the display with the result
function performOperation() {
  switch (operator) {
    case '÷':
      currentValue = String(Number(previousValue) / Number(currentValue));
      break;
    case '×':
      currentValue = String(Number(previousValue) * Number(currentValue));
      break;
    case '-':
      currentValue = String(Number(previousValue) - Number(currentValue));
      break;
    case '+':
      currentValue = String(Number(previousValue) + Number(currentValue));
      break;
    default:
      return;
  }
  operator = null;
  previousValue = null;
  expression.textContent = `${currentValue} `;
  updateDisplay();
}

function handleNumberClick(button) {
  if (currentValue === '0' && button.textContent !== '.') {
    currentValue = button.textContent;
  } else if (button.textContent === '.' && currentValue.includes('.')) {
    return;
  } else {
    currentValue += button.textContent;
  }
  updateDisplay();
}

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    handleOperatorClick(button.textContent);
  });
});

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    handleNumberClick(button);
  });
});


clearButton.addEventListener('click', clear);
signButton.addEventListener('click', toggleSign);
percentButton.addEventListener('click', convertToPercent);

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperandOutput = document.querySelector('[data-prev-operand]');
const currrentOperandOutput = document.querySelector('[data-cur-operand]');
previousOperandOutput.innerText = '';
currrentOperandOutput.innerText = '';
let updatedPreviousOperandOutput = '';
let updatedCurrentOperandOutput = '0';
let operation;

function updateDisplay() {
  previousOperandOutput.innerText = updatedPreviousOperandOutput;
  currrentOperandOutput.innerText = updatedCurrentOperandOutput;
}
updateDisplay();

function appendNumber(number) {
  if (updatedCurrentOperandOutput === '0' && number === '0') return;
  if (updatedCurrentOperandOutput.includes('.') && number === '.') return;
  if (updatedCurrentOperandOutput === '0' && (number >= '1' && number <= '9')) {
    updatedCurrentOperandOutput = ''.toString() + number.toString();
  } else {
    updatedCurrentOperandOutput = updatedCurrentOperandOutput.toString() + number.toString();
  }
}

function calculator() {

}

function chooseOperation(operation) {
  updatedPreviousOperandOutput = `${updatedCurrentOperandOutput} ${operation}`;
  updatedCurrentOperandOutput = '0';
}

// clearAllOutput();
numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    appendNumber(button.innerText);
    updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    chooseOperation(button.innerText);
    updateDisplay();
  });
});

allClearButton.addEventListener('click', () => {
  while (previousOperandOutput.innerText === '' && currrentOperandOutput.innerText === '0') return;
  previousOperandOutput.innerText = '';
  currrentOperandOutput.innerText = '0';
  updatedPreviousOperandOutput = '';
  updatedCurrentOperandOutput = '';
  operation = undefined;
  console.log('how many times on click');
});
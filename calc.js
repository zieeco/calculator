const numberButtons = document.querySelectorAll('[data-number]');
const mathOperatorButtons = document.querySelectorAll('[data-operation]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const prevOutput = document.querySelector('[data-prev-operand]');
const curOutput = document.querySelector('[data-cur-operand]');
prevOutput.innerText = '';
curOutput.innerText = '';
let newPrevOutput = '';
let newCurOutput = '0';
let mathOperator = null;

function updateDisplay() {
  prevOutput.innerText = newPrevOutput;
  curOutput.innerText = newCurOutput;
}
updateDisplay();

function calculate() {
  let result;
  newPrevOutput = parseFloat(newPrevOutput);
  newCurOutput = parseFloat(newCurOutput);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(newPrevOutput) || isNaN(newCurOutput)) return;
  if (mathOperator === '/') {
    if (newCurOutput === '0' || newCurOutput === 0) {
      result = 'Math Err!';
    } else {
      result = newPrevOutput / newCurOutput;
    }
  } else if (mathOperator === '*') {
    result = newPrevOutput * newCurOutput;
  } else if (mathOperator === '+') {
    result = newPrevOutput + newCurOutput;
  } else if (mathOperator === '-') {
    result = newPrevOutput - newCurOutput;
  } else {
    return;
  }
  newCurOutput = result;
  mathOperator = undefined;
  newPrevOutput = '';
}

function appendNumber(number) {
  if (newCurOutput === '0' && number === '0') return;
  if (newCurOutput.includes('.') && number === '.') return;
  if (newCurOutput === '0' && (number >= '1' && number <= '9')) {
    newCurOutput = ''.toString() + number.toString();
  } else if ((newCurOutput === '' || newCurOutput === 'Math Err!') && number === '.') {
    newCurOutput = '0'.toString() + number.toString();
  } else if (newCurOutput === 'Math Err!' && number !== '') {
    newCurOutput = ''.toString() + number.toString();
  } else if (newCurOutput !== '' && number) {
    newCurOutput += ''.toString() + number.toString();
  } else {
    newCurOutput = newCurOutput.toString() + number.toString();
  }
}

function chooseOperator(operator) {
  if (newCurOutput === 'Math Err!' && mathOperator !== '') return;
  if (newCurOutput === '0' && mathOperator === operator) {
    newPrevOutput = `${newCurOutput} ${operator} `;
  }
  if (newCurOutput === '') return;
  if (newPrevOutput !== '') calculate();
  mathOperator = operator;
  newPrevOutput = `${newCurOutput} ${operator} `;
  newCurOutput = '0';
}

function clearAll() {
  while (prevOutput.innerText === '' && curOutput.innerText === '0') return;
  prevOutput.innerText = null;
  curOutput.innerText = '0';
  newPrevOutput = null;
  newCurOutput = '0';
  mathOperator = null;
  window.location.reload();
}

function deleteNum() {
  if (newCurOutput === 'Math Err!') return;
  if (curOutput.innerText === '' && prevOutput.innerText === '') return;
  if (curOutput.innerText !== '') {
    newCurOutput = newCurOutput.toString().slice(0, -1);
    updateDisplay();
  } else {
    newPrevOutput = newPrevOutput.toString().slice(0, -1);
    updateDisplay();
  }
}

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    appendNumber(button.innerText);
    updateDisplay();
  });
});

mathOperatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    chooseOperator(button.innerText);
    updateDisplay();
  });
});

equalsButton.addEventListener('click', () => {
  if (newCurOutput !== '' && newPrevOutput === '') return;
  if (newCurOutput === 'Math Err!') return;
  calculate();
  updateDisplay();
});

allClearButton.addEventListener('click', clearAll);
deleteButton.addEventListener('click', deleteNum);

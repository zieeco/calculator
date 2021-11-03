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
let mathOperator = '';

function updateDisplay() {
  prevOutput.innerText = newPrevOutput;
  curOutput.innerText = newCurOutput;
}
updateDisplay();

function calculate() {
  let result;
  newPrevOutput = parseFloat(newPrevOutput);
  newCurOutput = parseFloat(newCurOutput);
  if (Number.isNaN(newPrevOutput) || Number.isNaN(newCurOutput)) return;
  if (mathOperator === '/') {
    if (newCurOutput === 0) {
      result = 'Math Err!';
    } else {
      result = newPrevOutput / newCurOutput;
    }
  } else if (mathOperator === '*' || mathOperator === 'x') {
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
  if (newCurOutput === '0' && number >= '1' && number <= '9') {
    newCurOutput = number.toString();
  } else if ((newCurOutput === '' || newCurOutput === 'Math Err!') && number === '.') {
    newCurOutput = `0${number.toString()}`;
  } else if (newCurOutput === 'Math Err!' && number !== '') {
    newCurOutput = number.toString();
  } else if (newCurOutput !== '' && number) {
    newCurOutput += number.toString();
  } else {
    newCurOutput = newCurOutput.toString() + number.toString();
  }
}

function chooseOperator(operator) {
  if ((newCurOutput === 'Math Err!' || newCurOutput === '') && operator) return;
  if (newPrevOutput.includes('Math Err!')) {
    newCurOutput = newPrevOutput.slice(0, -3);
    newPrevOutput = '';
    return;
  }
  if (newCurOutput === '0' && operator) {
    newPrevOutput = `${newCurOutput} ${operator} `;
  }
  if (newPrevOutput !== '') calculate();
  mathOperator = operator;
  newPrevOutput = `${newCurOutput} ${operator} `;
  newCurOutput = '0';
}

function clearAll() {
  while (prevOutput.innerText === '' && curOutput.innerText === '0') return;
  prevOutput.innerText = '';
  curOutput.innerText = '0';
  newPrevOutput = '';
  newCurOutput = '0';
  mathOperator = '';
}

function deleteNum() {
  if (newCurOutput === 'Math Err!') return;
  if ((newCurOutput === '0' && newPrevOutput === '') || (newPrevOutput === '' && newCurOutput === '')) return;
  if (newPrevOutput !== '' && (newCurOutput === '' || newCurOutput === '0')) {
    newPrevOutput = newPrevOutput.slice(0, -3);
    newCurOutput = newPrevOutput;
    newPrevOutput = '';
  } else {
    newCurOutput = newCurOutput.toString().slice(0, -1);
  }
  updateDisplay();
}

function keyboardInput(e) {
  const operators = ['/', '*', 'x', '-', '+'];
  if (operators.includes(e.key)) chooseOperator(e.key);
  if ((e.key >= 0 && e.key <= 9) || e.key === '.') appendNumber(e.key);
  if (e.key === 'Escape') clearAll();
  if (e.key === 'Backspace') deleteNum();
  if (e.key === 'Enter' || e.key === '=') {
    if ((newCurOutput === '' && newPrevOutput === '') || (newCurOutput !== '' && newPrevOutput === '')) return;
    if (newPrevOutput.includes('Math Err!')) {
      newCurOutput = newPrevOutput.slice(0, -3);
      newPrevOutput = '';
      updateDisplay();
      return;
    }
    calculate();
  }
  updateDisplay();
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
  if (newPrevOutput.includes('Math Err!')) {
    newCurOutput = newPrevOutput.slice(0, -3);
    newPrevOutput = '';
    updateDisplay();
    return;
  }
  if ((newCurOutput === '' && newPrevOutput === '') || (newCurOutput !== '' && newPrevOutput === '')) return;
  calculate();
  updateDisplay();
});

allClearButton.addEventListener('click', clearAll);
deleteButton.addEventListener('click', deleteNum);
document.addEventListener('keydown', keyboardInput);

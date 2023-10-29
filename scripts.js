/*
When a key is clicked:
- C: Clears the screen, and any previously memorized number(s)
- +/-: 
  - When it is a clear screen, do nothing
  - When a number is on the screen, reverse the sign of the number
- %:
  - When it is a clear screen, do nothing
  - When a number is on the screen, divide the number by 100
- number or dot:
  - When the key previously clicked is [C, %, /, x, -, +, =],
    display the key as a new number (add 0 before .)
  - When the key previously clicked is a number or dot,
    append the key to the current number (ignore illegal 0 and .)
- operator [+, -, x, /]:
  - When the key previouly clicked is not an operator, 
    - If there is no previous number, save the current number as previous number
    - If there is a previous number, calculate and display the result of the 
      previous number and the current number, and replace the previous number 
      with the current number.
  - When the key previouly clicked is an operator, ignore the operator.
- =:
  - When there are two numbers (previous and current), and an operator, do the
    calculation; replace previous number with current number; replace current
    number with result; display the result.
  - Otherwise, do nothing  
*/

"use strict"

// Get HTML elements
const clearKey = document.getElementById('clear');
const signKey = document.getElementById('sign');
const percentageKey = document.getElementById('percentage');
const divideKey = document.getElementById('divide');
const sevenKey = document.getElementById('seven');
const eightKey = document.getElementById('eight');
const nineKey = document.getElementById('nine');
const timesKey = document.getElementById('times');
const fourKey = document.getElementById('four');
const fiveKey = document.getElementById('five');
const sixKey = document.getElementById('six');
const minusKey = document.getElementById('minus');
const oneKey = document.getElementById('one');
const twoKey = document.getElementById('two');
const threeKey = document.getElementById('three');
const plusKey = document.getElementById('plus');
const zeroKey = document.getElementById('zero');
const dotKey = document.getElementById('dot');
const equalKey = document.getElementById('equal');
const displayer = document.getElementById('displayer');

// Global variables to hold the state
let currentNumber = null;
let previousNumber = null;
let previousKey = null;
let operator = null;
let tempNumber = null;


// Format the currentNumber to be displayed
const getDisplayNumber = () => {
  if (currentNumber === null) return '';
  if (currentNumber.toString().length > 5) {
    displayer.style.fontSize = "70px";
    return currentNumber.toLocaleString();
  } 
  else if (currentNumber.toString().length > 3) {
    displayer.style.fontSize = "90px";
    return currentNumber.toLocaleString();
  } 
  else if (currentNumber.toString().length > 0) {
      displayer.style.fontSize = "110px";
      return currentNumber.toLocaleString();
  } 
  //else if (Number.isNaN(currentNumber)) return 'Error';
  //if (Number.isNaN(currentNumber)) {
  //  currentNumber = Number(currentNumber);
  //  displayer.style.fontSize = "60px";
  //  return currentNumber.toLocaleString();
  //}
  return currentNumber.toLocaleString();
};

const display = () => {
  displayer.innerText = getDisplayNumber();
};

// The function to handle key pressing
const onKeyClick = (key) => {
  switch (key) {
    case 'C': 
      currentNumber = null;
      previousNumber = null;
      previousKey = null;
      operator = null;
      break;
    
    case '+/-': 
      if (currentNumber !== null) {
        currentNumber = -currentNumber;
      }
      break;
    
    case '%': 
      if (currentNumber !== null) {
        currentNumber = currentNumber / 100;
      }
      break;
  
    case '.':
      if (getDisplayNumber().indexOf('.') > 0) {
        // Ignore ilegal dot
        break; 
      }
    case '0':
      if (currentNumber === 0) {
        // Ignore ilegal zero
        break;
      }
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      //if (currentNumber.toString().length >= 7 && currentNumber != null) {}
      tempNumber = currentNumber;
      if (['C', '%', '/', 'x', '-', '+', '='].some((s) => s === previousKey)) {
        // Starting enter a new number
        currentNumber = Number(key === '.' ? '0' : key);
      } else {
        // Append to the existing number
        currentNumber = Number(getDisplayNumber().replace(/,/, '') + key);
      }

      if (Number.isNaN(currentNumber)) {
        currentNumber = tempNumber;
      }
      
      break; 

    case '/':
    case 'x':
    case '-':
    case '+':
      operator = key;
      if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].some((s) => s === previousKey)) {
        previousNumber = currentNumber;
      } 

      break;
    case '=':
      if (operator !== null && previousNumber != null && currentNumber !== null) {
        try {
          switch (operator) {
            case '/':
              if (previousKey != '=') {
                tempNumber = currentNumber;
                currentNumber = previousNumber / currentNumber;
                previousNumber = tempNumber;
              } else {
                currentNumber = currentNumber / previousNumber;
              }
              break;
            case 'x':
              if (previousKey != '=') {
                tempNumber = currentNumber;
                currentNumber = previousNumber * currentNumber;
                previousNumber = tempNumber;
              } else {
                currentNumber = previousNumber * currentNumber;
              }
              break;
            case '-':
              if (previousKey != '=') {
                tempNumber = currentNumber;
                currentNumber = previousNumber - currentNumber;
                previousNumber = tempNumber;
              } else {
                currentNumber = currentNumber - previousNumber;
              }
              break;
            case '+':
              if (previousKey != '=') {
                tempNumber = currentNumber;
                currentNumber = previousNumber + currentNumber;
                previousNumber = tempNumber;
              } else {
                currentNumber = previousNumber + currentNumber;
              }
              break;
            default:
              // do nothing
          }
        } catch(e) {
          currentNumber = Number.NaN;
        }
      } 
      break; 
    default: 
      // do nothing
  }

  // Remember what was pressed
  previousKey = key;
  display();
};

// Attach click event handler to keys
clearKey.addEventListener("click", () => onKeyClick('C'));
signKey.addEventListener("click", () => onKeyClick('+/-'));
percentageKey.addEventListener("click", () => onKeyClick('%'));
divideKey.addEventListener("click", () => onKeyClick('/'));
sevenKey.addEventListener("click", () => onKeyClick('7'));
eightKey.addEventListener("click", () => onKeyClick('8'));
nineKey.addEventListener("click", () => onKeyClick('9'));
timesKey.addEventListener("click", () => onKeyClick('x'));
fourKey.addEventListener("click", () => onKeyClick('4'));
fiveKey.addEventListener("click", () => onKeyClick('5'));
sixKey.addEventListener("click", () => onKeyClick('6'));
minusKey.addEventListener("click", () => onKeyClick('-'));
oneKey.addEventListener("click", () => onKeyClick('1'));
twoKey.addEventListener("click", () => onKeyClick('2'));
threeKey.addEventListener("click", () => onKeyClick('3'));
plusKey.addEventListener("click", () => onKeyClick('+'));
zeroKey.addEventListener("click", () => onKeyClick('0'));
dotKey.addEventListener("click", () => onKeyClick('.'));
equalKey.addEventListener("click", () => onKeyClick('='));

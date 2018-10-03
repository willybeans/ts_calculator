let totalEntry = [];
let equals = true;

window.onload = () => {
    makeButtons();
}

function applyClick(userInput) { //all our clicking behaviors for buttons
    let btn = document.getElementById('b' + userInput);
    const currentArea = document.getElementById('currentArea');
    const totalArea = document.getElementById('totalArea');

    btn.onclick = () => {
        let totalAreaLength = totalArea.textContent.length;
        //first we clear the face
        changeDisplay(userInput);
        if (equals) { //clear after =, or for first user entry
            if (!isNaN(userInput)) { //if there is pre-existing numbers after hitting equals then delete
                currentArea.textContent = '';
            } else {
                //places total from previous calculation as first entry
                currentArea.textContent = totalEntry;
            }
            totalArea.textContent = '';
            currentEntry = [];
            totalEntry = [];
            equals = false;
        }
        //restrict input length to 17
        if (currentArea.textContent.length > 17 || totalArea.textContent.length > 17) {
            alert('Number Limit Reached!');
            currentArea.textContent = '';
            totalArea.textContent = '';
            equals = true;
        } else if (!isNaN(userInput)) { //test for number
            equals = false;
            currentArea.textContent = (currentArea.textContent == '0') ? userInput : currentArea.textContent + userInput;
        } else if (isNaN(userInput)) { //**for all non numerics**\\
            if (equals) { //restricts equals being pressed twice
                return;
            } else {

                switch (userInput) {
                    case '.':
                        let previousEntry = filterUserInput(userInput);
                        if (!previousEntry.includes('.')) { //test for pre-existing period
                            currentArea.textContent = currentArea.textContent + userInput;
                        }
                        break;
                    case '=':
                        let currentEntry = filterUserInput(userInput);
                        let saveUserInput = currentArea.textContent;
                        currentEntry = operateOnEntry(currentEntry);
                        equals = true;
                        totalEntry = currentEntry[0]; //will save answer for next calculation
                        currentArea.textContent = saveUserInput; //will display equation
                        totalArea.textContent = currentEntry; //will display answer
                        break;
                    case 'AC':
                        changeDisplay(userInput);
                        currentArea.textContent = '';
                        totalArea.textContent = '';
                        break;
                    case 'CE':
                        let clearedLastEntry = filterUserInput(userInput);
                        currentArea.textContent = clearedLastEntry.join('');
                        break;
                    default:
                        let lastEntry = filterUserInput(userInput);
                        const regexOperands = /[+\-\/x=]/;
                        //limits operators from printing if there is a pre-existing operator as last user input
                        currentArea.textContent = (regexOperands.test(lastEntry)) ? currentArea.textContent : currentArea.textContent + userInput;
                }
            }
        }
    }
}

let calculatorOperations = {
  'x': (arg1, arg2) => {
      return arg1 * arg2;
  },
  '/': (arg1, arg2) => {
      return arg1 / arg2;
  },
  '+': (arg1, arg2) => {
    return arg1 + arg2;
  },
  '-': (arg1, arg2) => {
    return arg1 - arg2;
  },
  returnIndexOfEntry: (index, userEntry) => {
    let arg1 = Number(userEntry[index - 1]);
    let arg2 = Number(userEntry[index + 1]);
    return [arg1,arg2];
  },
  returnSpliced: (index, newTotal, userEntry) => {
    userEntry.splice((index - 1), 3, newTotal);
    return userEntry;
  },
  calculationSequence: (operation, indexOfOperand, userEntry) => {

    let getArgs = calculatorOperations.returnIndexOfEntry(indexOfOperand, userEntry);
    let newTotalForEntry = calculatorOperations[operation](getArgs[0], getArgs[1]);
    let newUserEntry = calculatorOperations.returnSpliced(indexOfOperand, newTotalForEntry, userEntry);
    return newUserEntry;
  }
};

function operateOnEntry(userEntry) {
    //this is where the calculations occur when hitting =
    const operations = ['x', '/', '+', '-'];
    let indexOfOperand;
    let newUserEntry;

    for (let i = 0; i < operations.length; i++) {

      while( userEntry.includes('x') || userEntry.includes('/')) {
          console.log('user entry: ' + userEntry);
          console.log('prop: ' + operations[i]);
          indexOfOperand = userEntry.indexOf(operations[i]);
          console.log(indexOfOperand);
          userEntry = calculatorOperations
                      .calculationSequence(operations[i],indexOfOperand,userEntry);
          //send index, userEntry...the rest can be done inside
          // let getArgs = calculatorOperations.returnIndexOfEntry(indexOfOperand, userEntry);
          // let newTotalForEntry = calculatorOperations[operations[i]](getArgs[0], getArgs[1]);
          // //let newUserEntry = calculatorOperations.returnSpliced(indexOfOperand, newTotalForEntry, userEntry);
          // //return operateOnEntry(newUserEntry);
          // newUserEntry = calculatorOperations.returnSpliced(indexOfOperand, newTotalForEntry, userEntry);
          console.log('after ' + userEntry);
        }
        while ( userEntry.includes('+') || userEntry.includes('-') ) {
          indexOfOperand =  1;

          userEntry = calculatorOperations
                      .calculationSequence(userEntry[1],indexOfOperand,userEntry);
                      console.log('after +-' + userEntry);
        }
      }



    let a, b, c;
    // if (userEntry.includes('x')) {
    //
    //     index = userEntry.indexOf('x');
    //     let getArgs = calculatorOperations.returnIndexOfEntry(index, userEntry);
    //     let newTotalForEntry = calculatorOperations['x'](getArgs[0], getArgs[1]);
    //     let newUserEntry = calculatorOperations.returnSpliced(index, newTotalForEntry, userEntry);
    //     return operateOnEntry(newUserEntry);
    //
    // } else if (userEntry.includes('/')) {
    //
    //     index = userEntry.indexOf('/');
    //     let getArgs = calculatorOperations.returnIndexOfEntry(index, userEntry);
    //     let newTotalForEntry = calculatorOperations['/'](getArgs[0], getArgs[1]);
    //     let newUserEntry = calculatorOperations.returnSpliced(index, newTotalForEntry, userEntry);
    //     return operateOnEntry(newUserEntry);
    //
    // } else if (userEntry.includes('+') || userEntry.includes('-')) {
    //     index = userEntry[1];
    //     a = Number(userEntry[0]);
    //     b = Number(userEntry[2]);
    //     if (index == '+') {
    //         c = a + b;
    //         userEntry.splice(0, 3, c);
    //         return operateOnEntry(userEntry);
    //     } else {
    //         c = a - b;
    //         userEntry.splice(0, 3, c);
    //         return operateOnEntry(userEntry);
    //     }
    // }
    return newUserEntry;
}

function filterUserInput(userInput) {
    //this function converts the user input into an array
    const regexOperands = /[+\-\/x=]/;
    const currentArea = document.getElementById('currentArea');
    let testCurrentEntry;
    switch (userInput) {
        case '.':
            testCurrentEntry = currentArea.textContent.split(regexOperands);
            break;
        case '=':
            testCurrentEntry = currentArea.textContent; //.split(regexOperands)
            testCurrentEntry = testCurrentEntry.split(/([+\-\/x=])/g);
            break;
        case 'CE':
            testCurrentEntry = currentArea.textContent.split('');
            testCurrentEntry.pop()
            break;
        default:
            testCurrentEntry = currentArea.textContent.split('');
            return testCurrentEntry.pop();
            break;
    }
    return testCurrentEntry;
}

function changeDisplay(userInput) {
    const faceHappy = document.getElementById('face-happy');
    const numberArea = document.getElementById('numberArea');
    numberArea.style.display = 'block';
    if (userInput == 'AC') {
        numberArea.style.display = 'none';
        faceHappy.style.display = 'block';
    }
}

function makeButtons() {
    const buttons = ['CE', 'AC', 'x', '7', '8', '9', '/', '4', '5', '6',
        '-', '1', '2', '3', '+', '0', '.', '='
    ];

    for (let i = 0; i < buttons.length; i++) {
        let btn = document.createElement('BUTTON');
        let t = document.createTextNode(buttons[i]);
        let container = document.getElementById('container');
        btn.id = 'b' + buttons[i];
        btn.className = 'button';
        btn.appendChild(t);
        container.appendChild(btn);
        applyClick(buttons[i]);
    }
}

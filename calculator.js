let totalEntry = [];
let equals = true;

window.onload = () => {
  makeButtons();
};

function applyClick(userInput) {
  //all our clicking behaviors for buttons
  let btn = document.getElementById("b" + userInput);
  const currentArea = document.getElementById("currentArea");
  const totalArea = document.getElementById("totalArea");

  btn.onclick = () => {
    let totalAreaLength = totalArea.textContent.length;
    //first we clear the face
    changeDisplay(userInput);
    if (equals) {
      //clear after =, or for first user entry
      console.log("userInput", userInput);
      if (!isNaN(userInput)) {
        console.log("isnan?", !isNaN(userInput));
        //if there is pre-existing numbers after hitting equals then delete
        console.log("1", userInput);
        currentArea.textContent = "";
      } else {
        console.log("2", userInput);
        //places total from previous calculation as first entry
        currentArea.textContent = totalEntry;
      }
      console.log("3");

      totalArea.textContent = "";
      currentEntry = [];
      totalEntry = [];
      equals = false;
    } else {
      console.log("else", equals);
    }

    //restrict input length to 17
    if (
      currentArea.textContent.length > 17 ||
      totalArea.textContent.length > 17
    ) {
      alert("Number Limit Reached!");
      currentArea.textContent = "";
      totalArea.textContent = "";
      equals = true;
    } else if (!isNaN(userInput)) {
      //test for number
      equals = false;
      currentArea.textContent =
        currentArea.textContent == "0"
          ? userInput
          : currentArea.textContent + userInput;
    } else if (isNaN(userInput)) {
      //**for all non numerics**\\
      if (equals) {
        //restricts equals being pressed twice
        return;
      } else {
        switch (userInput) {
          case ".":
            let previousEntry = filterUserInput(userInput);
            if (!previousEntry.includes(".")) {
              //test for pre-existing period
              currentArea.textContent = currentArea.textContent + userInput;
            }
            break;
          case "=":
            let currentEntry = filterUserInput(userInput);
            console.log("default ===", currentEntry);

            let saveUserInput = currentArea.textContent;
            currentEntry = operateOnEntry(currentEntry);
            equals = true;
            totalEntry = currentEntry[0]; //will save answer for next calculation
            currentArea.textContent = saveUserInput; //will display equation
            totalArea.textContent = currentEntry; //will display answer
            break;
          case "AC":
            changeDisplay(userInput);
            currentArea.textContent = "";
            totalArea.textContent = "";
            break;
          case "CE":
            let clearedLastEntry = filterUserInput(userInput);
            currentArea.textContent = clearedLastEntry.join("");
            break;
          default:
            let lastEntry = filterUserInput(userInput);
            console.log("default default", userInput);

            console.log("default default", lastEntry);
            const regexOperands = /[+\-\/x=]/;
            //limits operators from printing if there is a pre-existing operator as last user input
            currentArea.textContent = regexOperands.test(lastEntry)
              ? currentArea.textContent
              : currentArea.textContent + userInput;
        }
      }
    }
  };
}

const calculatorOperations = {
  x: (arg1, arg2) => arg1 * arg2,
  "/": (arg1, arg2) => arg1 / arg2,
  "+": (arg1, arg2) => arg1 + arg2,
  "-": (arg1, arg2) => arg1 - arg2,
  returnIndexOfEntry(index, userEntry) {
    let arg1 = Number(userEntry[index - 1]);
    let arg2 = Number(userEntry[index + 1]);
    return [arg1, arg2];
  },
  returnSpliced(index, newTotal, userEntry) {
    userEntry.splice(index - 1, 3, newTotal);
    return userEntry;
  },
  calculationSequence(operation, indexOfOperand, userEntry) {
    let getArgs = calculatorOperations.returnIndexOfEntry(
      indexOfOperand,
      userEntry
    );
    let newTotalForEntry = calculatorOperations[operation](...getArgs);
    let newUserEntry = calculatorOperations.returnSpliced(
      indexOfOperand,
      newTotalForEntry,
      userEntry
    );
    return newUserEntry;
  },
};

function operateOnEntry(userEntry) {
  //this is where the calculations occur when hitting =
  const operationsMD = ["x", "/"];
  let indexOfOperand;
  let operation;

  while (userEntry.includes("x") || userEntry.includes("/")) {
    let i = 0;
    if (!userEntry.includes("x")) {
      i++;
    }
    indexOfOperand = userEntry.indexOf(operationsMD[i]);
    userEntry = calculatorOperations.calculationSequence(
      operationsMD[i],
      indexOfOperand,
      userEntry
    );
  }
  while (userEntry.includes("+") || userEntry.includes("-")) {
    indexOfOperand = 1;
    userEntry = calculatorOperations.calculationSequence(
      userEntry[1],
      indexOfOperand,
      userEntry
    );
  }
  return userEntry;
}

function filterUserInput(userInput) {
  //this function converts the user input into an array
  const regexOperands = /[+\-\/x=]/;
  const currentArea = document.getElementById("currentArea");
  let testCurrentEntry;
  switch (userInput) {
    case ".":
      testCurrentEntry = currentArea.textContent.split(regexOperands);
      break;
    case "=":
      testCurrentEntry = currentArea.textContent; //.split(regexOperands)
      testCurrentEntry = testCurrentEntry.split(/([+\-\/x=])/g);
      break;
    case "CE":
      testCurrentEntry = currentArea.textContent.split("");
      testCurrentEntry.pop();
      break;
    default:
      testCurrentEntry = currentArea.textContent.split("");
      console.log("test default", testCurrentEntry);
      const test = testCurrentEntry.pop();
      console.log("test test default", test);

      return test;
      break;
  }
  return testCurrentEntry;
}

function changeDisplay(userInput) {
  const faceHappy = document.getElementById("face-happy");
  const numberArea = document.getElementById("numberArea");
  numberArea.style.display = "block";
  if (userInput == "AC") {
    numberArea.style.display = "none";
    faceHappy.style.display = "block";
  }
}

function makeButtons() {
  const buttons = [
    "CE",
    "AC",
    "x",
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];

  for (let i = 0; i < buttons.length; i++) {
    let btn = document.createElement("BUTTON");
    let t = document.createTextNode(buttons[i]);
    let container = document.getElementById("container");
    btn.id = "b" + buttons[i];
    btn.className = "button";
    btn.appendChild(t);
    container.appendChild(btn);
    applyClick(buttons[i]);
  }
}

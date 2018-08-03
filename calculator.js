const buttons = ['CE', 'AC', 'x', '7', '8', '9', '/', '4', '5', '6',
 '-', '1', '2', '3', '+', '0', '.', '='
];

var currentEntry = [],
 totalEntry = [];
var equals = true;

//const testNum = /[0-9]/g;
const regexOperands = /[+\-\/x=]/;

const totalArea = document.getElementById("totalArea");
const currentArea = document.getElementById("currentArea");
const numberArea = document.getElementById("numberArea");
const faceHappy = document.getElementById("face-happy");

window.onload = () => {
 makeButtons();
}

function applyClick(userInput) { //all our clicking behaviors for buttons
 let btn = document.getElementById("b" + userInput);

 btn.onclick = () => {
  let totalAreaLength = totalArea.textContent.length;
  //first we clear the face
  changeDisplay(userInput);
  if (equals) { //clear after =, or for first entry
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
  //first we restrict input length to 17
  if (currentArea.textContent.length > 17 || totalArea.textContent.length > 17) {
   alert("Number Limit Reached!");
   currentArea.textContent = "";
   totalArea.textContent = "";
   equals = true;
  } else if (!isNaN(userInput)) { //test for number
   equals = false;
   currentArea.textContent = (currentArea.textContent == "0") ? userInput : currentArea.textContent + userInput;
  } else if (isNaN(userInput)) { //**for all non numerics**\\
   if (equals) { //restricts equals being pressed twice
    return;
   } else {
    if (userInput === "=") { //to get answer
     currentEntry = filterUserInput(userInput);
     let saveUserInput = currentArea.textContent;
     operateOnEntry(currentEntry);
     equals = true;
     totalEntry = currentEntry[0]; //will save answer for next calculation
     currentArea.textContent = saveUserInput; //will display equation
     totalArea.textContent = currentEntry; //will display answer
    } else if (userInput === ".") {
     let lastEntry = filterUserInput(userInput);
     if (!lastEntry.includes(".")) { //test for pre-existing period
      currentArea.textContent = currentArea.textContent + userInput;
     }
    } else if (userInput === "AC" || userInput === "CE") {
     if (userInput === "AC") {
      changeDisplay(userInput);
      currentArea.textContent = "";
      totalArea.textContent = "";
     } else if (userInput === "CE") {
      let clearedLastEntry = filterUserInput(userInput);
      currentArea.textContent = clearedLastEntry.join('');
     }
    } else { //this is default operator behavior
     let lastEntry = filterUserInput(userInput);
     //limits operators from printing if there is a pre-existing operator as last user input
     currentArea.textContent = (regexOperands.test(lastEntry)) ? currentArea.textContent : currentArea.textContent + userInput;
    }
   }
  }
 }
}

function operateOnEntry(userEntry) {
 //this is where the calculations occur when hitting =
 let a, b, c, index;
 if (userEntry.includes("x")) {
  index = userEntry.indexOf('x');
  a = Number(userEntry[index - 1]);
  b = Number(userEntry[index + 1]);
  c = a * b;
  userEntry.splice((index - 1), 3, c);
  return operateOnEntry(userEntry);
 } else if (userEntry.includes("/")) {
  index = userEntry.indexOf('/');
  a = Number(userEntry[index - 1]);
  b = Number(userEntry[index + 1]);
  c = a / b;
  userEntry.splice((index - 1), 3, c);
  return operateOnEntry(userEntry);
 } else if (currentEntry.includes("+") || currentEntry.includes("-")) {
  index = userEntry[1];
  a = Number(userEntry[0]);
  b = Number(userEntry[2]);
  console.log("index: " + index);
  if (index == '+') {
   c = a + b;
   userEntry.splice(0, 3, c);
   return operateOnEntry(userEntry);
  } else {
   c = a - b;
   userEntry.splice(0, 3, c);
   return operateOnEntry(userEntry);
  }
 }
 return userEntry;
}

function filterUserInput(userInput) {
 //this function converts the user input into an array
 let testCurrentEntry;
 if (userInput === ".") {
  testCurrentEntry = currentArea.textContent.split(regexOperands);
  return testCurrentEntry.pop();
 } else if (userInput === "=") {
  testCurrentEntry = currentArea.textContent; //.split(regexOperands)
  testCurrentEntry = testCurrentEntry.split(/([+\-\/x=])/g);
  return testCurrentEntry;
 } else if (userInput === "CE") {
  testCurrentEntry = currentArea.textContent.split("");
  testCurrentEntry.pop()
  return testCurrentEntry;
 } else {
  testCurrentEntry = currentArea.textContent.split('');
  return testCurrentEntry.pop();
 }
}

function changeDisplay(userInput) {
 numberArea.style.display = 'block';
 if (userInput == 'AC') {
  numberArea.style.display = 'none';
  faceHappy.style.display = "block";
 }
}

function makeButtons() {
 for (var i = 0; i < buttons.length; i++) {
  var btn = document.createElement("BUTTON");
  var t = document.createTextNode(buttons[i]);
  var container = document.getElementById('container');
  btn.id = "b" + buttons[i];
  btn.className = "button";
  btn.appendChild(t);
  container.appendChild(btn);
  applyClick(buttons[i]);
 }
}

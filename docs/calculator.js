/* issues to be adddressed:

- the "." behavior is incorrect *SOLVED*
- the button sizing is inconsistent
- fix addition/subtraction behavior
- fix after calculation behavior *SOLVED*
- redundant double code *SOLVED*
- CE behavior *SOLVED*
*/

var buttons = ['CE','AC', 'x','7','8','9','/','4','5','6',
               '-','1','2','3','+','0','.','='];
var currentEntry = [], totalEntry = [];
var testNum = /[0-9]/g;
var regexOperands = /[+\-\/x=]/;
var regexPeriod = /./;
var equals = true;

window.onload = () => {
  makeButtons();
}

function applyClick(x) {
  let btn = document.getElementById("b" + x);
  let totalArea = document.getElementById("totalArea");
  let currentArea = document.getElementById("currentArea");
  let speech = document.getElementById("speech");

  btn.onclick = () => {
    let totalAreaLength = totalArea.textContent.length;
    //first we clear the face
    speech.style.display = "none";
    document.getElementById("numberArea").style.display = "block";

       if(equals){ //clear after =, or for first entry
        document.getElementById("face-sleep").style.display = "none";
        if (!isNaN(x)){ //if there is pre-existing numbers after hitting equals then delete
          currentArea.textContent = "";
        }
        //currentArea.textContent = (!isNaN(totalEntry)) ? currentArea.textContent + totalEntry : x;
        totalArea.textContent = "";
        currentEntry = [];
        totalEntry = [];
        equals = false;
      }

     if(currentArea.textContent.length > 17 || totalArea.textContent.length > 17){ //restrict input length
      alert("Number Limit Reached!");
      currentArea.textContent = "";
      totalArea.textContent = "";
      totalEntry = []
      currentEntry = [];
      equals = true;
     }  else if(!isNaN(x)) { //test for number
           equals = false;
           //is this code doing anything?
           currentArea.textContent = (currentArea.textContent == "0") ?  x :  currentArea.textContent + x;
      } else if (isNaN(x)) { //**for all non numerics**\\
        if(equals){ //if equals is pressed
          return;
        } else {
          if(regexOperands.test(x)){ //for operators

          if(regexOperands.test(currentEntry[0])){
            //if there is ALREADy an operator do nothing
            return;
          } else if (x === "=") { //to get answer
              speech.style.display = "block";
              document.getElementById("face-sleep").style.display = "none";
              document.getElementById("numberArea").style.display = "none";
              document.getElementById("face-happy").style.display = "block";

              currentEntry = filterUserInput(x);

                while(currentEntry.includes("x") || currentEntry.includes("/")){
                  if(currentEntry.includes("x")){
                    let index = currentEntry.indexOf("x");
                    let a = currentEntry[index - 1];
                    let b = currentEntry[index + 1];
                    let c =  a * b;
                    //so how to inject into proper place in array?
                    currentEntry.splice((index - 1),3,c);
                  } else {
                    let index = currentEntry.indexOf("/");
                    let a = currentEntry[index - 1];
                    let b = currentEntry[index + 1];
                    let c =  a / b;
                    //injecting new total here
                    currentEntry.splice((index - 1),3,c);
                  }
                }
                while(currentEntry.includes("+") || currentEntry.includes("-")){
                  if(currentEntry.includes("+")){
                    let index = currentEntry.indexOf("+");
                    let a = Number(currentEntry[index - 1]);
                    let b = Number(currentEntry[index + 1]);
                    let c =  a + b;
                    currentEntry.splice((index - 1),3,c);
                  } else if (currentEntry.includes('-')) {
                    let index = currentEntry.indexOf("-");
                    let a = currentEntry[index - 1];
                    let b = currentEntry[index + 1];
                    let c =  a - b;
                    //injecting new total here
                    currentEntry.splice((index - 1),3,c);
                  }
                }
              equals = true;
              totalEntry = currentEntry[0];
              document.getElementById("equation").textContent = totalArea.textContent;
              document.getElementById("solution").textContent = currentEntry[0];
              currentArea.textContent = totalEntry;
              totalArea.textContent = totalEntry;
          }
          else { //this is default operator behavior
             let lastEntry = filterUserInput(x);
             //limits operator from printing if there is a pre-existing operator as last user input
             currentArea.textContent = (regexOperands.test(lastEntry)) ? currentArea.textContent : currentArea.textContent + x;
          }

        } else if (x === ".") {
          let lastEntry = filterUserInput(x);
          if(!lastEntry.includes(".")){ //test for pre-existing period
            currentArea.textContent = currentArea.textContent + x;
          }
          //this needs to behave similar to a number but cant use more than one
        } else if (x === "AC" || x === "CE") {
          document.getElementById('face-happy').style.display = "none";
          //equals = true;
          //currentArea.textContent = ""
          if (x === "AC"){
          totalEntry = [] ;
          totalArea.textContent = "";
        } else if (x === "CE"){
          let clearedLastEntry = filterUserInput(x);
          currentArea.textContent = clearedLastEntry.join('');
        }
        } else {
        currentArea.textContent = x;
        totalArea.textContent = (totalArea.textContent + x);
        currentEntry = x;
      }
    }
   }
  }
 }

function filterUserInput(x) {
  let testCurrentEntry;
  if(x==="."){
    testCurrentEntry = currentArea.textContent.split(regexOperands);
    return testCurrentEntry.pop();
  } else if(x==="=") {
    testCurrentEntry = currentArea.textContent;//.split(regexOperands)
    testCurrentEntry = testCurrentEntry.split(/([+\-\/x=])/g);
    return testCurrentEntry;
  } else if (x==="CE"){
    testCurrentEntry = currentArea.textContent.split("");
    testCurrentEntry.pop()
    return testCurrentEntry;
  } else {
    testCurrentEntry = currentArea.textContent.split('');
    return testCurrentEntry.pop();
  }
}

function makeButtons() {
  for (var i = 0; i < buttons.length; i++){
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

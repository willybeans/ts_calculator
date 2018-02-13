var buttons = ['0','1','2','3','4','5','6',
               '7','8','9','=','+','-','*','/','CE','AC','.'];
var currentEntry = [], totalEntry = [];
var testNum = /[0-9]/g;
var testOperands = /[+\-\/*=]/;

window.onload = () => {
  makeButtons();
}

function applyClick(x) {
  var btn = document.getElementById("b" + x);
  var totalArea = document.getElementById("totalArea");
  var currentArea = document.getElementById("currentArea");

  btn.onclick = () => {
    if(!isNaN(x)) { //test for number
      if(currentEntry[0] === undefined){ //clear for first entry
        currentArea.textContent = " ";
        totalArea.textContent = " ";
      }
      if(isNaN(currentEntry[0])){ //clear after using operands
        currentArea.textContent = " ";
        currentEntry = [];
      }
     currentEntry.push(x);
     totalEntry.push(x);
     currentArea.textContent = (currentArea.textContent + x);
     totalArea.textContent = (totalArea.textContent + x);
  } else if (isNaN(x)) { //for all non numerics
        if(testOperands.test(currentEntry[0])){ //for operands
          currentArea.textcontent = x;
          totalArea.textContent = totalArea.textContent + "";
        } else if (x === ".") {
          //this needs to behave similar to a number but cant use more than one
        } else if (x === "AC" || x === "CE") {
          currentEntry = [];
          currentArea.textContent = "0"
          if (x === "AC"){
          totalEntry = [];
          totalArea.textContent = "0";
          }
        } else {
        currentArea.textContent = x;
        totalArea.textContent = (totalArea.textContent + x);
        currentEntry = [x];
        totalEntry.push(x);
        }
   }
  }
 }

function makeButtons() {
  for (var i = 0; i < buttons.length; i++){
    var btn = document.createElement("BUTTON");
    var t = document.createTextNode(buttons[i]);
    btn.id = "b" + buttons[i];
    //btn.onlick = applyClick;
    btn.appendChild(t);
    document.body.appendChild(btn);
    applyClick(buttons[i]);

  }
}

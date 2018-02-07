var buttons = ['0','1','2','3','4','5','6',
               '7','8','9','=','+','-','CE','AC','.'];
var currentEntry = [], totalEntry = [];
var testNum = /[0-9]/g;

window.onload = () => {
 // inputField();
  makeButtons();
  //applyClick();
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
     currentArea.textContent = (currentArea.textContent + x);
     totalArea.textContent = (totalArea.textContent + x);
  } else {
    switch (x) {
      case "CE": //clear Entry only
        currentEntry = [];
        textArea.textContent = "0";
        break;
      case "AC": //Clear All *
        currentEntry = [];
        totalEntry = [];
        totalArea.textContent = "0";
        currentArea.textContent = "0"
        break;
      case "+":
        currentArea.textContent = x;
        totalArea.textContent = (totalArea.textContent + x);
        currentEntry = ["+"];
        totalEntry.push(x);
        break;
      case "-":
        textArea.textContent = (totalArea.textContent + x);
        break;
      case ".":
        textArea.textContent = (totalArea.textContent + x);
        break;
      case "=":
        totalEntry.push(totalArea.textContent);
        // console.log(totalArea.textContent)
        // console.log(currentArea.textContent);
        //console.log(text);
        break;
    }
   }
    //console.log(totalEntry);
    console.log(currentEntry);
  }
 }

// function inputField() {
//   var field = document.createElement("div");
//   var text = document.createTextNode("0");
//   field.id = "textArea";
//   field.style.background = "black";
//   field.style.color = "white";
//   field.appendChild(text);
//   document.body.appendChild(field);
// }
//consider using this for the subarray

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

/* should we have a var set to a string that can populate our form

*/

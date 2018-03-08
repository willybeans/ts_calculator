var buttons = ['CE','AC','7','8','9','*','4','5','6',
               '/','1','2','3','-','0','.','+'];
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
  var equals = false;

  btn.onclick = () => {
    if(!isNaN(x)) { //test for number
      if(currentEntry[0] === undefined || equals){ //clear for first entry
        equals = false;
        currentEntry = [];
        totalEntry = [];
        currentArea.textContent = " ";
        totalArea.textContent = " ";
      }
       if(testOperands.test(currentEntry[0])){ //after using operands
        // console.log("im working");
        currentArea.textContent = x;
        totalArea.textContent = totalArea.textContent + currentEntry[0];
        totalEntry.push(currentEntry[0]);
        currentEntry = [];
        currentEntry.push(x);
      } else { //number behavior:
     currentEntry.push(x);
     //totalEntry.push(x);
     currentArea.textContent = (currentArea.textContent + x);
    // totalArea.textContent = (totalArea.textContent + x);
    // console.log(totalEntry + "outside");
   }
  } else if (isNaN(x)) { //for all non numerics
        if(testOperands.test(x)){ //for operands
          if(testOperands.test(currentEntry[0])){
            //if there is ALREADy an operator
            currentEntry[0] = x;
            currentArea.textContent = x;
          } else if (x === "=") {
            var final = currentEntry.join('');
            totalEntry.push(final);
            totalArea.textContent = totalArea.textContent + currentArea.textContent;
              while(totalEntry.includes("*") || totalEntry.includes("/")){
                if(totalEntry.includes("*")){
                  console.log("inside)");
                  let index = totalEntry.indexOf("*");
                  let a = totalEntry[index - 1];
                  let b = totalEntry[index + 1];
                  let c =  a * b;
                  //so how to inject into proper place in array?
                  console.log(index - 1);
                  console.log(totalEntry);
                  totalEntry.splice((index - 1),3,c);
                  //console.log(testArray);
                  console.log(totalEntry);
                } else {
                  let index = totalEntry.indexOf("/");
                  let a = totalEntry[index - 1];
                  let b = totalEntry[index + 1];
                  let c =  a / b;
                  //injecting new total here
                  totalEntry.splice((index - 1),3,c);
                }
              }
              while(totalEntry.includes("+") || totalEntry.includes("-")){
                if(totalEntry.includes("+")){
                  let index = totalEntry.indexOf("+");
                  let a = Number(totalEntry[index - 1]); //+ is concatenating instead of adding
                  let b = Number(totalEntry[index + 1]);
                  let c =  a + b;

                  totalEntry.splice((index - 1),3,c);
                } else {
                  let index = totalEntry.indexOf("-");
                  let a = totalEntry[index - 1];
                  let b = totalEntry[index + 1];
                  let c =  a - b;
                  //injecting new total here
                  totalEntry.splice((index - 1),3,c);
                }
              }
            currentEntry = [];
            equals = true;
            currentArea.textContent = totalEntry[0];
            console.log("meowwwwwtside");
            console.log(totalEntry);
          }
          else {
            var hello = currentEntry.join('') // dude change this var name lmao
            totalEntry.push(hello); //push the pre-existing numbers into our final
            totalArea.textContent = totalArea.textContent + currentArea.textContent;
            currentEntry = []; //clear current entry to make room
            currentEntry.push(x);
            currentArea.textContent = x;
            //totalArea.textContent = totalArea.textContent + "";
          }

        } else if (x === ".") {
          if(!currentEntry.includes(".")){ //test for pre-existing period
            currentEntry.push(x);
            currentArea.textContent = currentArea.textContent + x;
          }
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
        currentEntry = x;
      //  totalEntry.push(x + "nonnum");
        }
   }
   //console.log("current: " + currentEntry);
   //console.log("total: " + totalEntry);
   // meow = totalEntry.join(''); didnt expect this to work
   // totalArea.textContent = meow;
   // var meow = totalArea.textContent;
   // console.log("total html: " + meow);
  }
 }

function makeButtons() {
  for (var i = 0; i < buttons.length; i++){
    var btn = document.createElement("BUTTON");
    var t = document.createTextNode(buttons[i]);
    var container = document.getElementById('container');
    btn.id = "b" + buttons[i];
    //btn.onlick = applyClick;
    btn.appendChild(t);
    container.appendChild(btn);
  //  document.body.appendChild(btn);
    applyClick(buttons[i]);

  }
}

/*
What you are stuck with is that it needs to store whatever is typed into current entry
when an operator is used THEn you...:
take current entry, push to final
clear current entry and replace with operator

same when using a buttons:
take current entry (operator) push to final, clear and replace

but what is happening now is you are always pushing to final which is why it isnt working

*/

var buttons = ['0','1','2','3','4','5','6',
               '7','8','9','=','+','-','C','.'];
var text = [];

window.onload = () => {
  inputField();
  makeButtons();
  applyClick();
}

function applyClick(x) {
  var btn = document.getElementById("b" + x);
  var textArea = document.getElementById("textArea");
  btn.onclick = () => {
    if(textArea.textContet === numbers) {
    textArea.textContent = (""+x+ textArea.textContent);
    } else
  }
}

function inputField() {
  var field = document.createElement("div");
  var text = document.createTextNode(" ");
  field.id = "textArea";
  field.style.background = "black";
  field.style.color = "white";
  field.appendChild(text);
  document.body.appendChild(field);
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

export function getText(query: string): string {
  const el = document.getElementById(query); //getElementById('currentArea')
  return (el && el.textContent) || "";
}

export function returnLastEntry(userInput: string): string {
  const currentArea = getText("currentArea");
  return currentArea.split("").pop() || "";
}

export function filterUserInput(userInput: string): string[] {
  const regexOperands = /[+\-\/x=]/;
  const currentArea = getText("currentArea");
  let testCurrentEntry: string[] = [];
  switch (userInput) {
    case ".":
      testCurrentEntry = currentArea.split(regexOperands);
      break;
    case "=":
      // testCurrentEntry = currentArea; //.split(regexOperands)
      testCurrentEntry = currentArea.split(/([+\-\/x=])/g);
      break;
    case "CE":
      testCurrentEntry = currentArea.split("");
      testCurrentEntry.pop();
      break;
    default:
      break;
  }
  return testCurrentEntry;
}

export function changeDisplay(userInput: string) {
  const faceHappy = document.getElementById("face-happy") as HTMLElement;
  const numberArea = document.getElementById("numberArea") as HTMLElement;
  numberArea.style.display = "block";
  if (userInput == "AC") {
    numberArea.style.display = "none";
    faceHappy.style.display = "block";
  }
}

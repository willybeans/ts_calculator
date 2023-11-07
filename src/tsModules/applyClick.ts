import { changeDisplay, returnLastEntry, getText } from "./helpers";
import { operateOnEntry } from "./operations";

let equals = true;
let totalEntry: Array<string | number> = [];

export const applyClick = (userInput: string, btn: HTMLElement): void => {
  //all our clicking behaviors for buttons
  const currentArea = document.getElementById("currentArea") as HTMLElement;
  const totalArea = document.getElementById("totalArea") as HTMLElement;

  btn.onclick = (): void => {
    //first we clear the face
    changeDisplay(userInput);
    if (equals) {
      //clear after =, or for first user entry
      if (!isNaN(Number(userInput))) {
        //if there is pre-existing numbers after hitting equals then delete
        currentArea.textContent = "";
      } else {
        //places total from previous calculation as first entry
        currentArea.textContent = totalEntry.toString();
      }
      totalArea.textContent = "";
      totalEntry = [];
      equals = false;
    }
    //restrict input length to 17
    if (
      getText("currentArea").length > 17 ||
      getText("totalArea").length > 17
    ) {
      alert("Number Limit Reached!");
      currentArea.textContent = "";
      totalArea.textContent = "";
      equals = true;
    } else if (!isNaN(Number(userInput))) {
      //test for number
      equals = false;
      currentArea.textContent =
        currentArea.textContent == "0"
          ? userInput
          : currentArea.textContent + userInput;
    } else if (isNaN(Number(userInput))) {
      //**for all non numerics**\\
      const regexOperands = /[+\-\/x=]/;
      const currentUserInputArea = getText("currentArea");

      switch (userInput) {
        case ".":
          let previousEntry = currentUserInputArea.split(regexOperands);
          if (!previousEntry[previousEntry.length - 1].includes(".")) {
            //test for pre-existing period
            currentArea.textContent = currentArea.textContent + userInput;
          }
          break;
        case "=":
          //restricts equals from being pressed twice
          if (equals) {
            return;
          }
          let currentEntry: string[] =
            currentUserInputArea.split(/([+\-\/x=])/g);
          let saveUserInput = currentArea.textContent;
          const entryTotal = operateOnEntry(currentEntry);
          equals = true;
          totalEntry = [entryTotal[0]]; //will save answer for next calculation
          currentArea.textContent = saveUserInput; //will display equation
          totalArea.textContent = entryTotal[0].toString(); //will display answer
          break;
        case "AC":
          changeDisplay(userInput);
          currentArea.textContent = "";
          totalArea.textContent = "";
          break;
        case "CE":
          let clearedLastEntry = currentUserInputArea.split("");
          clearedLastEntry.pop();
          currentArea.textContent = clearedLastEntry.join("");
          break;
        default:
          let lastEntry: string = returnLastEntry();
          //limits operators from printing if there is a pre-existing operator as last user input
          currentArea.textContent = regexOperands.test(lastEntry)
            ? currentArea.textContent
            : currentArea.textContent + userInput;
      }
    }
  };
};

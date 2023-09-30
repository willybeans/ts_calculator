import {
  changeDisplay,
  filterUserInput,
  returnLastEntry,
  getText,
} from "./helpers";
import { operateOnEntry } from "./operations";

let equals = true;
let totalEntry: Array<string | number> = [];

export const applyClick = (userInput: string, btn: HTMLElement): void => {
  //all our clicking behaviors for buttons
  // let btn = document.getElementById("b" + userInput) as HTMLElement;
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
      if (equals) {
        //restricts equals from being pressed twice
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
            let currentEntry: string[] = filterUserInput(userInput);
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
            let clearedLastEntry = filterUserInput(userInput);
            currentArea.textContent = clearedLastEntry.join("");
            break;
          default:
            let lastEntry: string = returnLastEntry(userInput);
            const regexOperands = /[+\-\/x=]/;
            //limits operators from printing if there is a pre-existing operator as last user input
            currentArea.textContent = regexOperands.test(lastEntry)
              ? currentArea.textContent
              : currentArea.textContent + userInput;
        }
      }
    }
  };
};

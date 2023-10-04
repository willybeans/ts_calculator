import { applyClick } from "./applyClick";

export const buttons: string[] = [
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

export function makeButtons(): void {
  buttons.forEach((button, i) => {
    const btn: HTMLElement = document.createElement("BUTTON");
    const textVal: Text = document.createTextNode(button);
    const container = document.getElementById("container") as HTMLElement;
    btn.id = "b" + button;
    btn.className = "button";
    btn.appendChild(textVal);
    applyClick(button, btn);
    container.appendChild(btn);
  });
}

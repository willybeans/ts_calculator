export function getText(query: string): string {
  const el = document.getElementById(query); //getElementById('currentArea')
  return (el && el.textContent) || "";
}

export const returnLastEntry = (): string =>
  getText("currentArea").split("").pop() || "";

export function changeDisplay(userInput: string) {
  const faceHappy = document.getElementById("face-happy") as HTMLElement;
  const numberArea = document.getElementById("numberArea") as HTMLElement;
  numberArea.style.display = "block";
  if (userInput == "AC") {
    numberArea.style.display = "none";
    faceHappy.style.display = "block";
  }
}

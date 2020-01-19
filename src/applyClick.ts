export const applyClick = (userInput: any): void => {
  let btn: HTMLElement | null = document.getElementById('b' + userInput);

  btn.onclick = (): void => {
    console.log('you got clicked bitch', btn);
    console.log('you got clicked bitch', typeof btn);
  };
};

import { applyClick } from './applyClick';

interface ButtonList {
  [index: number]: string;
}

export function makeButtons(): void {
  const buttons: ButtonList = [
    'CE', 'AC', 'x', '7',
    '8', '9', '/', '4',
    '5', '6', '-', '1',
    '2', '3', '+', '0',
    '.', '='
  ];
  const iterButtons = buttons[Symbol.iterator]();

  for (const button of iterButtons) {
    const btn: HTMLElement = document.createElement('BUTTON');
    const textVal: Text = document.createTextNode(button);
    const container: HTMLElement | null = document.getElementById('container');
    btn.id = 'b' + button;
    btn.className = 'button';
    btn.appendChild(textVal);
    if (container !== null) {
      container.appendChild(btn);
      applyClick(button);
    }
  }
}

import { getText, returnLastEntry, changeDisplay } from "../helpers";
import { JSDOM } from "jsdom";

describe("displayText functions", () => {
  beforeEach(() => {
    // Create a virtual DOM using jsdom
    const dom = new JSDOM(
      "<!DOCTYPE html><html><body><div id='currentArea'></div><div id='face-happy'></div><div id='numberArea'></div></body></html>"
    );
    global.document = dom.window.document;
  });

  test("getText should return text content of the element", () => {
    document.getElementById("currentArea")!.textContent = "12345";

    const result = getText("currentArea");

    expect(result).toEqual("12345");
  });

  test("returnLastEntry should return the last character of the text content", () => {
    document.getElementById("currentArea")!.textContent = "12345";

    const result = returnLastEntry();

    expect(result).toEqual("5");
  });

  test("changeDisplay should modify the style of elements", () => {
    const faceHappy = document.getElementById("face-happy") as HTMLElement;
    const numberArea = document.getElementById("numberArea") as HTMLElement;

    changeDisplay("AC");

    expect(numberArea.style.display).toBe("none");
    expect(faceHappy.style.display).toBe("block");
  });
});

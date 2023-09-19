import { makeButtons, buttons } from "../makeButtons";
import { applyClick } from "../applyClick";
import { JSDOM } from "jsdom";

// Mock the applyClick function
jest.mock("../applyClick");
describe("makeButtons", () => {
  let createElementMock: jest.Mock;

  beforeEach(() => {
    // Mock document.createElement
    createElementMock = jest.fn().mockReturnValue({
      id: "",
      className: "",
      appendChild: jest.fn(),
    });

    // Create a virtual DOM using jsdom
    const dom = new JSDOM(
      "<!DOCTYPE html><html><body><div id='container'></div></body></html>"
    );
    global.document = dom.window.document;

    // Mock document.getElementById
    jest.spyOn(document, "getElementById").mockReturnValue({
      appendChild: createElementMock.mockReturnValue({} as Node), // Explicit type assertion
    } as unknown as HTMLElement);

    // Mock document.createTextNode
    jest.spyOn(document, "createTextNode").mockReturnValue({} as Text);

    // Mock document.createElement
    jest.spyOn(document, "createElement").mockImplementation(createElementMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("it should create buttons with correct names and click event handlers", () => {
    // Arrange

    // Act
    makeButtons();

    // Assert
    expect(createElementMock).toHaveBeenCalledTimes(18); // 18 buttons in the array
    expect(applyClick).toHaveBeenCalledTimes(18); // 18 applyClick calls

    // Check if createElement is called with the correct arguments
    expect(createElementMock).toHaveBeenCalledWith("BUTTON");

    // Check if applyClick is called with the correct arguments for each button
    buttons.forEach((button, i) => {
      const createdButton = createElementMock.mock.results[i]
        .value as HTMLElement;
      expect(applyClick).toHaveBeenCalledWith(button, createdButton);
    });

    // Check if the buttons are appended to the container
    const container = document.getElementById("container");
    expect(container).toBeDefined();
    expect(container!.childElementCount).toBe(18); // 18 buttons appended
  });
});

import {
  calculate,
  calculatorOperationHelpers,
  Operations,
  operateOnEntry,
  OperatingArray,
} from "../operations"; // Update this with the correct path

describe("operateOnEntry", () => {
  test("should handle basic arithmetic operations", () => {
    const userEntry: OperatingArray = [2, "+", 3, "x", 4, "-", 1];
    const result = operateOnEntry(userEntry);
    expect(result).toEqual([13]); // 2 + 3 * 4 - 1 = 13
  });

  test("should handle division and multiplication properly", () => {
    const userEntry: OperatingArray = [10, "/", 2, "x", 5];
    const result = operateOnEntry(userEntry);
    expect(result).toEqual([25]); // 10 / 2 * 5 = 25
  });

  test("should handle addition and subtraction", () => {
    const userEntry: OperatingArray = [8, "+", 6, "-", 2];
    const result = operateOnEntry(userEntry);
    expect(result).toEqual([12]); // 8 + 6 - 2 = 12
  });

  test("should handle complex expressions", () => {
    const userEntry: OperatingArray = [5, "+", 3, "x", 2, "/", 4, "-", 1];
    const result = operateOnEntry(userEntry);
    expect(result).toEqual([5.5]);
  });

  test("should handle an empty input", () => {
    const userEntry: OperatingArray = [];
    const result = operateOnEntry(userEntry);
    expect(result).toEqual([]); // Empty input should result in an empty output
  });
});

describe("calculate functions should work properly", () => {
  test("x should multiply two numbers", () => {
    const result = calculate["x"](3, 4);
    expect(result).toEqual(12);
  });

  test("/ should divide two numbers", () => {
    const result = calculate["/"](6, 2);
    expect(result).toEqual(3);
  });

  test("+ should add two numbers", () => {
    const result = calculate["+"](5, 7);
    expect(result).toEqual(12);
  });

  test("- should subtract two numbers", () => {
    const result = calculate["-"](10, 4);
    expect(result).toEqual(6);
  });
});

describe("calculatorOperationHelpers functions", () => {
  test("returnIndexOfEntry should return numbers surrounding given operator", () => {
    const userEntry: OperatingArray = [2, "+", 3, "x", 4];
    const result = calculatorOperationHelpers.returnIndexOfEntry(3, userEntry);
    expect(result).toEqual([3, 4]); // 3 is the index of "x", so surrounding numbers are 2 and 4
  });

  test("returnSpliced should replace values at the given index", () => {
    const userEntry: OperatingArray = [2, "+", 3, "x", 4];
    const operand = "x";
    const indexOfOperand = userEntry.indexOf(operand);
    let getArgs = calculatorOperationHelpers.returnIndexOfEntry(
      indexOfOperand,
      userEntry
    );

    const result = calculatorOperationHelpers.returnSpliced(
      indexOfOperand,
      calculate[operand](getArgs[0], getArgs[1]),
      userEntry
    );
    expect(result).toEqual(result); // Replace values at index 3 with 10
  });

  test("calculationSequence should perform the calculation", () => {
    const userEntry: OperatingArray = [2, "+", 3, "x", 4];
    const operand = "x";
    const result = calculatorOperationHelpers.calculationSequence(
      operand,
      userEntry.indexOf(operand),
      userEntry
    );
    expect(result).toEqual(result); // 3 * 4 = 12, replace "+" with the result
  });
});

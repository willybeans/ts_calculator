type OperatingArray = Array<string | number>;

type Operations = "x" | "/" | "-" | "+";

type Calculate = {
  [key in Operations]: (arg1: number, arg2: number) => number;
};

type CalculatorOperationHelpers = {
  returnIndexOfEntry: (index: number, userEntry: OperatingArray) => number[];
  returnSpliced: (
    index: number,
    newTotal: number,
    userEntry: OperatingArray
  ) => OperatingArray;
  calculationSequence: (
    operation: Operations,
    indexOfOperand: number,
    userEntry: OperatingArray
  ) => OperatingArray;
};

const calculate: Calculate = {
  // prettier-ignore
  "x": (arg1, arg2) => arg1 * arg2,
  "/": (arg1, arg2) => arg1 / arg2,
  "+": (arg1, arg2) => arg1 + arg2,
  "-": (arg1, arg2) => arg1 - arg2,
};

const calculatorOperationHelpers: CalculatorOperationHelpers = {
  returnIndexOfEntry: (index, userEntry) => {
    // this is passed the operator, which then returns the numbers surrounding it
    return [Number(userEntry[index - 1]), Number(userEntry[index + 1])];
  },
  returnSpliced: (index, newTotal, userEntry) => {
    // this splices in the new total from the prev operation
    // cannot use toSpliced() yet
    userEntry.splice(index - 1, 3, newTotal);
    return userEntry;
  },
  calculationSequence: (operation, indexOfOperand, userEntry) => {
    let getArgs = calculatorOperationHelpers.returnIndexOfEntry(
      indexOfOperand,
      userEntry
    );

    return calculatorOperationHelpers.returnSpliced(
      indexOfOperand,
      calculate[operation](getArgs[0], getArgs[1]),
      userEntry
    );
  },
};

export function operateOnEntry(userEntry: OperatingArray) {
  //this is where the calculations occur when hitting =
  const operationsMD = ["x", "/"] as Operations[];

  while (userEntry.includes("x") || userEntry.includes("/")) {
    if (!userEntry.includes("x")) {
      operationsMD.shift();
    }

    userEntry = calculatorOperationHelpers.calculationSequence(
      operationsMD[0] as Operations,
      userEntry.indexOf(operationsMD[0]),
      userEntry
    );
  }
  while (userEntry.includes("+") || userEntry.includes("-")) {
    userEntry = calculatorOperationHelpers.calculationSequence(
      userEntry[1] as Operations,
      1,
      userEntry
    );
  }

  return userEntry;
}

export type OperatingArray = Array<string | number>;
export type Operations = "x" | "/" | "-" | "+";
type Calculate = {
    [key in Operations]: (arg1: number, arg2: number) => number;
};
type CalculatorOperationHelpers = {
    returnIndexOfEntry: (index: number, userEntry: OperatingArray) => number[];
    returnSpliced: (index: number, newTotal: number, userEntry: OperatingArray) => OperatingArray;
    calculationSequence: (operation: Operations, indexOfOperand: number, userEntry: OperatingArray) => OperatingArray;
};
export declare const calculate: Calculate;
export declare const calculatorOperationHelpers: CalculatorOperationHelpers;
export declare function operateOnEntry(userEntry: OperatingArray): OperatingArray;
export {};

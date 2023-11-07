/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst makeButtons_1 = __webpack_require__(/*! ./tsModules/makeButtons */ \"./src/tsModules/makeButtons.ts\");\nwindow.onload = () => {\n    (0, makeButtons_1.makeButtons)();\n};\n\n\n//# sourceURL=webpack://js_calculator/./src/index.ts?");

/***/ }),

/***/ "./src/tsModules/applyClick.ts":
/*!*************************************!*\
  !*** ./src/tsModules/applyClick.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.applyClick = void 0;\nconst helpers_1 = __webpack_require__(/*! ./helpers */ \"./src/tsModules/helpers.ts\");\nconst operations_1 = __webpack_require__(/*! ./operations */ \"./src/tsModules/operations.ts\");\nlet equals = true;\nlet totalEntry = [];\nconst applyClick = (userInput, btn) => {\n    //all our clicking behaviors for buttons\n    const currentArea = document.getElementById(\"currentArea\");\n    const totalArea = document.getElementById(\"totalArea\");\n    btn.onclick = () => {\n        //first we clear the face\n        (0, helpers_1.changeDisplay)(userInput);\n        if (equals) {\n            console.log(\"test eq\", equals);\n            //clear after =, or for first user entry\n            if (!isNaN(Number(userInput))) {\n                //if there is pre-existing numbers after hitting equals then delete\n                currentArea.textContent = \"\";\n            }\n            else {\n                //places total from previous calculation as first entry\n                currentArea.textContent = totalEntry.toString();\n            }\n            totalArea.textContent = \"\";\n            totalEntry = [];\n            equals = false;\n        }\n        //restrict input length to 17\n        if ((0, helpers_1.getText)(\"currentArea\").length > 17 ||\n            (0, helpers_1.getText)(\"totalArea\").length > 17) {\n            alert(\"Number Limit Reached!\");\n            currentArea.textContent = \"\";\n            totalArea.textContent = \"\";\n            equals = true;\n        }\n        else if (!isNaN(Number(userInput))) {\n            //test for number\n            equals = false;\n            currentArea.textContent =\n                currentArea.textContent == \"0\"\n                    ? userInput\n                    : currentArea.textContent + userInput;\n        }\n        else if (isNaN(Number(userInput))) {\n            //**for all non numerics**\\\\\n            const regexOperands = /[+\\-\\/x=]/;\n            const currentUserInputArea = (0, helpers_1.getText)(\"currentArea\");\n            switch (userInput) {\n                case \".\":\n                    let previousEntry = currentUserInputArea.split(regexOperands);\n                    if (!previousEntry[previousEntry.length - 1].includes(\".\")) {\n                        //test for pre-existing period\n                        currentArea.textContent = currentArea.textContent + userInput;\n                    }\n                    break;\n                case \"=\":\n                    console.log(\"NEWEST BUNDLE\", equals);\n                    if (equals) {\n                        console.log(\"this\");\n                        //restricts equals from being pressed twice\n                        return;\n                    }\n                    let currentEntry = currentUserInputArea.split(/([+\\-\\/x=])/g);\n                    let saveUserInput = currentArea.textContent;\n                    const entryTotal = (0, operations_1.operateOnEntry)(currentEntry);\n                    equals = true;\n                    totalEntry = [entryTotal[0]]; //will save answer for next calculation\n                    currentArea.textContent = saveUserInput; //will display equation\n                    totalArea.textContent = entryTotal[0].toString(); //will display answer\n                    break;\n                case \"AC\":\n                    (0, helpers_1.changeDisplay)(userInput);\n                    currentArea.textContent = \"\";\n                    totalArea.textContent = \"\";\n                    break;\n                case \"CE\":\n                    let clearedLastEntry = currentUserInputArea.split(\"\");\n                    clearedLastEntry.pop();\n                    currentArea.textContent = clearedLastEntry.join(\"\");\n                    break;\n                default:\n                    let lastEntry = (0, helpers_1.returnLastEntry)();\n                    //limits operators from printing if there is a pre-existing operator as last user input\n                    currentArea.textContent = regexOperands.test(lastEntry)\n                        ? currentArea.textContent\n                        : currentArea.textContent + userInput;\n            }\n        }\n    };\n};\nexports.applyClick = applyClick;\n\n\n//# sourceURL=webpack://js_calculator/./src/tsModules/applyClick.ts?");

/***/ }),

/***/ "./src/tsModules/helpers.ts":
/*!**********************************!*\
  !*** ./src/tsModules/helpers.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.changeDisplay = exports.returnLastEntry = exports.getText = void 0;\nfunction getText(query) {\n    const el = document.getElementById(query); //getElementById('currentArea')\n    return (el && el.textContent) || \"\";\n}\nexports.getText = getText;\nconst returnLastEntry = () => getText(\"currentArea\").split(\"\").pop() || \"\";\nexports.returnLastEntry = returnLastEntry;\nfunction changeDisplay(userInput) {\n    const faceHappy = document.getElementById(\"face-happy\");\n    const numberArea = document.getElementById(\"numberArea\");\n    numberArea.style.display = \"block\";\n    if (userInput == \"AC\") {\n        numberArea.style.display = \"none\";\n        faceHappy.style.display = \"block\";\n    }\n}\nexports.changeDisplay = changeDisplay;\n\n\n//# sourceURL=webpack://js_calculator/./src/tsModules/helpers.ts?");

/***/ }),

/***/ "./src/tsModules/makeButtons.ts":
/*!**************************************!*\
  !*** ./src/tsModules/makeButtons.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.makeButtons = exports.buttons = void 0;\nconst applyClick_1 = __webpack_require__(/*! ./applyClick */ \"./src/tsModules/applyClick.ts\");\nexports.buttons = [\n    \"CE\",\n    \"AC\",\n    \"x\",\n    \"7\",\n    \"8\",\n    \"9\",\n    \"/\",\n    \"4\",\n    \"5\",\n    \"6\",\n    \"-\",\n    \"1\",\n    \"2\",\n    \"3\",\n    \"+\",\n    \"0\",\n    \".\",\n    \"=\",\n];\nfunction makeButtons() {\n    exports.buttons.forEach((button, i) => {\n        const btn = document.createElement(\"BUTTON\");\n        const textVal = document.createTextNode(button);\n        const container = document.getElementById(\"container\");\n        btn.id = \"b\" + button;\n        btn.className = \"button\";\n        btn.appendChild(textVal);\n        (0, applyClick_1.applyClick)(button, btn);\n        container.appendChild(btn);\n    });\n}\nexports.makeButtons = makeButtons;\n\n\n//# sourceURL=webpack://js_calculator/./src/tsModules/makeButtons.ts?");

/***/ }),

/***/ "./src/tsModules/operations.ts":
/*!*************************************!*\
  !*** ./src/tsModules/operations.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.operateOnEntry = exports.calculatorOperationHelpers = exports.calculate = void 0;\nexports.calculate = {\n    // prettier-ignore\n    \"x\": (arg1, arg2) => arg1 * arg2,\n    \"/\": (arg1, arg2) => arg1 / arg2,\n    \"+\": (arg1, arg2) => arg1 + arg2,\n    \"-\": (arg1, arg2) => arg1 - arg2,\n};\nexports.calculatorOperationHelpers = {\n    // this is passed the operator, which then returns the numbers surrounding it\n    returnIndexOfEntry: (index, userEntry) => [\n        Number(userEntry[index - 1]),\n        Number(userEntry[index + 1]),\n    ],\n    returnSpliced: (index, newTotal, userEntry) => {\n        // this splices in the new total from the prev operation\n        // cannot use toSpliced() yet\n        userEntry.splice(index - 1, 3, newTotal);\n        return userEntry;\n    },\n    calculationSequence: (operation, indexOfOperand, userEntry) => {\n        let getArgs = exports.calculatorOperationHelpers.returnIndexOfEntry(indexOfOperand, userEntry);\n        return exports.calculatorOperationHelpers.returnSpliced(indexOfOperand, exports.calculate[operation](getArgs[0], getArgs[1]), userEntry);\n    },\n};\nfunction operateOnEntry(userEntry) {\n    //this is where the calculations occur when hitting =\n    const operationsMD = [\"/\", \"x\"];\n    while (userEntry.includes(\"x\") || userEntry.includes(\"/\")) {\n        const arg1 = userEntry.indexOf(operationsMD[0]);\n        const arg2 = userEntry.indexOf(operationsMD[1]);\n        let operation = \"x\";\n        let indexOfOperation = 1;\n        if (arg2 === -1 || (arg1 > -1 && arg2 > -1 && arg1 < arg2)) {\n            operation = operationsMD[0];\n            indexOfOperation = arg1;\n        }\n        else if (arg1 === -1 || (arg2 > -1 && arg1 > -1 && arg2 < arg1)) {\n            operation = operationsMD[1];\n            indexOfOperation = arg2;\n        }\n        userEntry = exports.calculatorOperationHelpers.calculationSequence(operation, indexOfOperation, userEntry);\n    }\n    while (userEntry.includes(\"+\") || userEntry.includes(\"-\")) {\n        userEntry = exports.calculatorOperationHelpers.calculationSequence(userEntry[1], 1, userEntry);\n    }\n    return userEntry;\n}\nexports.operateOnEntry = operateOnEntry;\n\n\n//# sourceURL=webpack://js_calculator/./src/tsModules/operations.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
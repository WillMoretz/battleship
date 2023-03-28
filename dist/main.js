/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/display.js":
/*!************************!*\
  !*** ./src/display.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayGame": () => (/* binding */ displayGame),
/* harmony export */   "displaySetup": () => (/* binding */ displaySetup)
/* harmony export */ });
var container = document.querySelector("[data-container]");
function updateBoardDisplay(board) {}
function createBoard(eventHandler) {
  var board = document.createElement("div");
  var _loop = function _loop(i) {
    var _loop2 = function _loop2(j) {
      var square = document.createElement("button");
      square.classList.add("square");
      square.classList.add("".concat(i).concat(j));
      square.addEventListener("click", function () {
        console.log("".concat(i).concat(j));
        eventHandler();
      });
      board.classList.add("board");
      board.appendChild(square);
    };
    for (var j = "a"; j !== "k"; j = String.fromCharCode(j.charCodeAt(0) + 1)) {
      _loop2(j);
    }
  };
  for (var i = 1; i < 11; i += 1) {
    _loop(i);
  }
  return board;
}
function reset() {
  container.textContent = "";
}
function createHeader() {
  var header = document.createElement("header");
  header.textContent = "Battleship";
  return header;
}
function createFooter() {
  var footer = document.createElement("footer");
  footer.textContent = "Made by Will Moretz";
  return footer;
}
function createTitle(text) {
  var title = document.createElement("div");
  title.classList.add("title");
  title.textContent = text;
  return title;
}
function displayGame(eventHandler) {
  console.log("here");
  reset();
  var header = createHeader();
  var footer = createFooter();
  var section = document.createElement("section");
  var computerTitle = createTitle("Computer's Board");
  var playerTitle = createTitle("Your Board");
  var computerBoard = createBoard();
  var playerBoard = createBoard();
  section.appendChild(computerTitle);
  section.appendChild(computerBoard, null);
  section.appendChild(playerTitle);
  section.appendChild(playerBoard, eventHandler);
  container.appendChild(header);
  container.appendChild(section);
  container.appendChild(footer);
}
function displaySetup(eventHandler) {
  var header = createHeader();
  var footer = createFooter();
  var section = document.createElement("section");
  var title = createTitle("Place Your Ships!");
  var board = createBoard(eventHandler);
  section.appendChild(title);
  section.appendChild(board);
  container.appendChild(header);
  container.appendChild(section);
  container.appendChild(footer);
}


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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display */ "./src/display.js");

(0,_display__WEBPACK_IMPORTED_MODULE_0__.displaySetup)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQ1MsTUFBTSxDQUFDO0FBQy9COzs7Ozs7O1VDaEZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOc0Q7QUFFdERVLHNEQUFZLEVBQUUsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtY29udGFpbmVyXVwiKTtcblxuZnVuY3Rpb24gdXBkYXRlQm9hcmREaXNwbGF5KGJvYXJkKSB7fVxuXG5mdW5jdGlvbiBjcmVhdGVCb2FyZChldmVudEhhbmRsZXIpIHtcbiAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IDExOyBpICs9IDEpIHtcbiAgICBmb3IgKGxldCBqID0gXCJhXCI7IGogIT09IFwia1wiOyBqID0gU3RyaW5nLmZyb21DaGFyQ29kZShqLmNoYXJDb2RlQXQoMCkgKyAxKSkge1xuICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwic3F1YXJlXCIpO1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoYCR7aX0ke2p9YCk7XG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coYCR7aX0ke2p9YCk7XG4gICAgICAgIGV2ZW50SGFuZGxlcigpO1xuICAgICAgfSk7XG4gICAgICBib2FyZC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIik7XG4gICAgICBib2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYm9hcmQ7XG59XG5cbmZ1bmN0aW9uIHJlc2V0KCkge1xuICBjb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVIZWFkZXIoKSB7XG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIik7XG4gIGhlYWRlci50ZXh0Q29udGVudCA9IFwiQmF0dGxlc2hpcFwiO1xuICByZXR1cm4gaGVhZGVyO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGb290ZXIoKSB7XG4gIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb290ZXJcIik7XG4gIGZvb3Rlci50ZXh0Q29udGVudCA9IFwiTWFkZSBieSBXaWxsIE1vcmV0elwiO1xuICByZXR1cm4gZm9vdGVyO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVUaXRsZSh0ZXh0KSB7XG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdGl0bGUuY2xhc3NMaXN0LmFkZChcInRpdGxlXCIpO1xuICB0aXRsZS50ZXh0Q29udGVudCA9IHRleHQ7XG4gIHJldHVybiB0aXRsZTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheUdhbWUoZXZlbnRIYW5kbGVyKSB7XG4gIGNvbnNvbGUubG9nKFwiaGVyZVwiKTtcbiAgcmVzZXQoKTtcblxuICBjb25zdCBoZWFkZXIgPSBjcmVhdGVIZWFkZXIoKTtcbiAgY29uc3QgZm9vdGVyID0gY3JlYXRlRm9vdGVyKCk7XG4gIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgY29uc3QgY29tcHV0ZXJUaXRsZSA9IGNyZWF0ZVRpdGxlKFwiQ29tcHV0ZXIncyBCb2FyZFwiKTtcbiAgY29uc3QgcGxheWVyVGl0bGUgPSBjcmVhdGVUaXRsZShcIllvdXIgQm9hcmRcIik7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICBjb25zdCBwbGF5ZXJCb2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG5cbiAgc2VjdGlvbi5hcHBlbmRDaGlsZChjb21wdXRlclRpdGxlKTtcbiAgc2VjdGlvbi5hcHBlbmRDaGlsZChjb21wdXRlckJvYXJkLCBudWxsKTtcbiAgc2VjdGlvbi5hcHBlbmRDaGlsZChwbGF5ZXJUaXRsZSk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQocGxheWVyQm9hcmQsIGV2ZW50SGFuZGxlcik7XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWN0aW9uKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZvb3Rlcik7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlTZXR1cChldmVudEhhbmRsZXIpIHtcbiAgY29uc3QgaGVhZGVyID0gY3JlYXRlSGVhZGVyKCk7XG4gIGNvbnN0IGZvb3RlciA9IGNyZWF0ZUZvb3RlcigpO1xuICBjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gIGNvbnN0IHRpdGxlID0gY3JlYXRlVGl0bGUoXCJQbGFjZSBZb3VyIFNoaXBzIVwiKTtcbiAgY29uc3QgYm9hcmQgPSBjcmVhdGVCb2FyZChldmVudEhhbmRsZXIpO1xuXG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQodGl0bGUpO1xuICBzZWN0aW9uLmFwcGVuZENoaWxkKGJvYXJkKTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNlY3Rpb24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcbn1cblxuZXhwb3J0IHsgZGlzcGxheUdhbWUsIGRpc3BsYXlTZXR1cCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBkaXNwbGF5R2FtZSwgZGlzcGxheVNldHVwIH0gZnJvbSBcIi4vZGlzcGxheVwiO1xuXG5kaXNwbGF5U2V0dXAoKTtcbiJdLCJuYW1lcyI6WyJjb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ1cGRhdGVCb2FyZERpc3BsYXkiLCJib2FyZCIsImNyZWF0ZUJvYXJkIiwiZXZlbnRIYW5kbGVyIiwiY3JlYXRlRWxlbWVudCIsIl9sb29wIiwiaSIsIl9sb29wMiIsImoiLCJzcXVhcmUiLCJjbGFzc0xpc3QiLCJhZGQiLCJjb25jYXQiLCJhZGRFdmVudExpc3RlbmVyIiwiY29uc29sZSIsImxvZyIsImFwcGVuZENoaWxkIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiY2hhckNvZGVBdCIsInJlc2V0IiwidGV4dENvbnRlbnQiLCJjcmVhdGVIZWFkZXIiLCJoZWFkZXIiLCJjcmVhdGVGb290ZXIiLCJmb290ZXIiLCJjcmVhdGVUaXRsZSIsInRleHQiLCJ0aXRsZSIsImRpc3BsYXlHYW1lIiwic2VjdGlvbiIsImNvbXB1dGVyVGl0bGUiLCJwbGF5ZXJUaXRsZSIsImNvbXB1dGVyQm9hcmQiLCJwbGF5ZXJCb2FyZCIsImRpc3BsYXlTZXR1cCJdLCJzb3VyY2VSb290IjoiIn0=
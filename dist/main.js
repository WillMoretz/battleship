/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game-display.js":
/*!*****************************!*\
  !*** ./src/game-display.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var container = document.querySelector("[data-container]");
function updateBoardDisplay(board) {}
function createBoard(type) {
  var board = document.createElement("div");
  var _loop = function _loop(i) {
    var _loop2 = function _loop2(j) {
      var square = document.createElement("button");
      square.classList.add("square");
      square.classList.add("".concat(i).concat(j));
      square.addEventListener("click", function () {
        console.log("".concat(i).concat(j));
      });
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
function displayGame() {
  console.log("here");
  reset();
  var header = document.createElement("header");
  header.textContent = "Battleship";
  var footer = document.createElement("footer");
  footer.textContent = "Made by Will Moretz";
  var section = document.createElement("section");
  var computerTitle = document.createElement("div");
  computerTitle.classList.add("title");
  computerTitle.textContent = "Computer's Board";
  var playerTitle = document.createElement("div");
  playerTitle.classList.add("title");
  playerTitle.textContent = "Your Board";
  var computerBoard = createBoard();
  computerBoard.classList.add("board");
  var playerBoard = createBoard();
  playerBoard.classList.add("board");
  section.appendChild(computerTitle);
  section.appendChild(computerBoard);
  section.appendChild(playerTitle);
  section.appendChild(playerBoard);
  container.appendChild(header);
  container.appendChild(section);
  container.appendChild(footer);
}
function displaySetup() {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (displayGame);

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
/* harmony import */ var _game_display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-display */ "./src/game-display.js");

(0,_game_display__WEBPACK_IMPORTED_MODULE_0__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFHLENBQUMsT0FBTyxDQUFDO0VBRWxDYyxPQUFPLENBQUNULFdBQVcsQ0FBQ1UsYUFBYSxDQUFDO0VBQ2xDRCxPQUFPLENBQUNULFdBQVcsQ0FBQ1ksYUFBYSxDQUFDO0VBQ2xDSCxPQUFPLENBQUNULFdBQVcsQ0FBQ1csV0FBVyxDQUFDO0VBQ2hDRixPQUFPLENBQUNULFdBQVcsQ0FBQ2EsV0FBVyxDQUFDO0VBRWhDaEMsU0FBUyxDQUFDbUIsV0FBVyxDQUFDTyxNQUFNLENBQUM7RUFDN0IxQixTQUFTLENBQUNtQixXQUFXLENBQUNTLE9BQU8sQ0FBQztFQUM5QjVCLFNBQVMsQ0FBQ21CLFdBQVcsQ0FBQ1EsTUFBTSxDQUFDO0FBQy9CO0FBQ0EsU0FBU00sWUFBWUEsQ0FBQSxFQUFHLENBQUM7QUFFekIsaUVBQWVSLFdBQVc7Ozs7OztVQzdEMUI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ055QztBQUV6Q0EseURBQVcsRUFBRSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLWRpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWNvbnRhaW5lcl1cIik7XG5cbmZ1bmN0aW9uIHVwZGF0ZUJvYXJkRGlzcGxheShib2FyZCkge31cblxuZnVuY3Rpb24gY3JlYXRlQm9hcmQodHlwZSkge1xuICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgMTE7IGkgKz0gMSkge1xuICAgIGZvciAobGV0IGogPSBcImFcIjsgaiAhPT0gXCJrXCI7IGogPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGouY2hhckNvZGVBdCgwKSArIDEpKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmVcIik7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChgJHtpfSR7an1gKTtcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhgJHtpfSR7an1gKTtcbiAgICAgIH0pO1xuICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJvYXJkO1xufVxuXG5mdW5jdGlvbiByZXNldCgpIHtcbiAgY29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbn1cblxuZnVuY3Rpb24gZGlzcGxheUdhbWUoKSB7XG4gIGNvbnNvbGUubG9nKFwiaGVyZVwiKTtcbiAgcmVzZXQoKTtcblxuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuICBoZWFkZXIudGV4dENvbnRlbnQgPSBcIkJhdHRsZXNoaXBcIjtcblxuICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9vdGVyXCIpO1xuICBmb290ZXIudGV4dENvbnRlbnQgPSBcIk1hZGUgYnkgV2lsbCBNb3JldHpcIjtcblxuICBjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG5cbiAgY29uc3QgY29tcHV0ZXJUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbXB1dGVyVGl0bGUuY2xhc3NMaXN0LmFkZChcInRpdGxlXCIpO1xuICBjb21wdXRlclRpdGxlLnRleHRDb250ZW50ID0gXCJDb21wdXRlcidzIEJvYXJkXCI7XG5cbiAgY29uc3QgcGxheWVyVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBwbGF5ZXJUaXRsZS5jbGFzc0xpc3QuYWRkKFwidGl0bGVcIik7XG4gIHBsYXllclRpdGxlLnRleHRDb250ZW50ID0gXCJZb3VyIEJvYXJkXCI7XG5cbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG4gIGNvbXB1dGVyQm9hcmQuY2xhc3NMaXN0LmFkZChcImJvYXJkXCIpO1xuXG4gIGNvbnN0IHBsYXllckJvYXJkID0gY3JlYXRlQm9hcmQoKTtcbiAgcGxheWVyQm9hcmQuY2xhc3NMaXN0LmFkZChcImJvYXJkXCIpO1xuXG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoY29tcHV0ZXJUaXRsZSk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoY29tcHV0ZXJCb2FyZCk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQocGxheWVyVGl0bGUpO1xuICBzZWN0aW9uLmFwcGVuZENoaWxkKHBsYXllckJvYXJkKTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNlY3Rpb24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcbn1cbmZ1bmN0aW9uIGRpc3BsYXlTZXR1cCgpIHt9XG5cbmV4cG9ydCBkZWZhdWx0IGRpc3BsYXlHYW1lO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZGlzcGxheUdhbWUgZnJvbSBcIi4vZ2FtZS1kaXNwbGF5XCI7XG5cbmRpc3BsYXlHYW1lKCk7XG4iXSwibmFtZXMiOlsiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidXBkYXRlQm9hcmREaXNwbGF5IiwiYm9hcmQiLCJjcmVhdGVCb2FyZCIsInR5cGUiLCJjcmVhdGVFbGVtZW50IiwiX2xvb3AiLCJpIiwiX2xvb3AyIiwiaiIsInNxdWFyZSIsImNsYXNzTGlzdCIsImFkZCIsImNvbmNhdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb25zb2xlIiwibG9nIiwiYXBwZW5kQ2hpbGQiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJjaGFyQ29kZUF0IiwicmVzZXQiLCJ0ZXh0Q29udGVudCIsImRpc3BsYXlHYW1lIiwiaGVhZGVyIiwiZm9vdGVyIiwic2VjdGlvbiIsImNvbXB1dGVyVGl0bGUiLCJwbGF5ZXJUaXRsZSIsImNvbXB1dGVyQm9hcmQiLCJwbGF5ZXJCb2FyZCIsImRpc3BsYXlTZXR1cCJdLCJzb3VyY2VSb290IjoiIn0=
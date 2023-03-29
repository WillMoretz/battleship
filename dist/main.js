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
/* harmony export */   "displaySetup": () => (/* binding */ displaySetup),
/* harmony export */   "updateBoardDisplay": () => (/* binding */ updateBoardDisplay)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/index.js");

var container = document.querySelector("[data-container]");
function updateBoardDisplay(board, attackHit, col, row) {
  if (attackHit) {
    board.querySelector(".".concat(row).concat(col)).classList.add("missed");
  } else {
    board.querySelector(".".concat(row).concat(col)).classList.add("hit");
  }
}
function createBoard() {
  var board = document.createElement("div");
  var _loop = function _loop(i) {
    var _loop2 = function _loop2(j) {
      var square = document.createElement("button");
      square.classList.add("square");
      square.classList.add("".concat(j).concat(i));
      square.addEventListener("click", function () {
        if (square.parentElement.classList.contains("player-board")) return;
        (0,_index__WEBPACK_IMPORTED_MODULE_0__["default"])(j, i);
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
function displayGame() {
  reset();
  var header = createHeader();
  var footer = createFooter();
  var section = document.createElement("section");
  var computerTitle = createTitle("Computer's Board");
  var playerTitle = createTitle("Your Board");
  var computerBoard = createBoard();
  computerBoard.classList.add("computer-board");
  var playerBoard = createBoard();
  playerBoard.classList.add("player-board");
  section.appendChild(computerTitle);
  section.appendChild(computerBoard, null);
  section.appendChild(playerTitle);
  section.appendChild(playerBoard);
  container.appendChild(header);
  container.appendChild(section);
  container.appendChild(footer);
}
function displaySetup() {
  var header = createHeader();
  var footer = createFooter();
  var section = document.createElement("section");
  var title = createTitle("Place Your Ships!");
  var board = createBoard();
  section.appendChild(title);
  section.appendChild(board);
  container.appendChild(header);
  container.appendChild(section);
  container.appendChild(footer);
}


/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameBoard": () => (/* binding */ gameBoard),
/* harmony export */   "ship": () => (/* binding */ ship)
/* harmony export */ });
var ship = function ship(len) {
  return {
    length: len,
    hits: 0,
    hit: function hit() {
      this.hits += 1;
    },
    isSunk: function isSunk() {
      if (this.hits === this.length) return true;
      return false;
    }
  };
};
function createBoard() {
  var board = [];
  for (var i = 1; i < 11; i++) {
    var column = {};
    Object.assign(column, {
      column: i,
      row: [{
        position: "a".concat(i),
        hasShip: false
      }, {
        position: "b".concat(i),
        hasShip: false
      }, {
        position: "c".concat(i),
        hasShip: false
      }, {
        position: "d".concat(i),
        hasShip: false
      }, {
        position: "e".concat(i),
        hasShip: false
      }, {
        position: "f".concat(i),
        hasShip: false
      }, {
        position: "g".concat(i),
        hasShip: false
      }, {
        position: "h".concat(i),
        hasShip: false
      }, {
        position: "i".concat(i),
        hasShip: false
      }, {
        position: "j".concat(i),
        hasShip: false
      }]
    });
    board.push(column);
  }
  return board;
}
var gameBoard = function gameBoard() {
  return {
    board: createBoard(),
    findSquare: function findSquare(col, row) {
      var square = this.board[row - 1].row.filter(function (obj) {
        return obj.position === "".concat(col).concat(row);
      });
      return square;
    },
    checkPosition: function checkPosition(col, row) {
      var result = {};
      var square = this.findSquare(col, row);
      var position = square[0].position;
      var hasShip = square[0].hasShip;
      Object.assign(result, {
        position: position,
        hasShip: hasShip
      });
      return result;
    },
    ships: [],
    placeShip: function placeShip(startCol, endCol, startRow, endRow, name) {
      var length = 0;
      var occupiedSquares = [];
      if (startRow !== endRow) {
        for (var i = startRow; i < endRow + 1; i++) {
          var square = this.findSquare(startCol, i);
          square[0].hasShip = true;
          length += 1;
          occupiedSquares.push("".concat(startCol).concat(i));
        }
      } else {
        var currentCol = startCol;
        while (currentCol !== String.fromCharCode(endCol.charCodeAt(0) + 1)) {
          var _square = this.findSquare(currentCol, startRow);
          _square[0].hasShip = true;
          occupiedSquares.push("".concat(currentCol).concat(startRow));
          currentCol = String.fromCharCode(currentCol.charCodeAt(0) + 1);
          length += 1;
        }
      }
      this.ships.push({
        squares: occupiedSquares,
        name: name,
        obj: ship(length)
      });
    },
    attacks: [],
    trackAttack: function trackAttack(position, attackHit, sankShip) {
      this.attacks.push({
        position: position,
        attackHit: attackHit,
        sankShip: sankShip
      });
    },
    allShipsSunk: function allShipsSunk() {
      if (this.ships.length === 0) return false;
      var shipsSunk = 0;
      this.attacks.forEach(function (attack) {
        if (attack.sankShip) shipsSunk += 1;
      });
      if (shipsSunk >= this.ships.length) return true;
      return false;
    },
    isRepeatedAttack: function isRepeatedAttack(col, row) {
      var repeat = false;
      this.attacks.forEach(function (attack) {
        if (attack.position === "".concat(col).concat(row)) {
          repeat = true;
          return;
        }
      });
      return repeat;
    },
    receiveAttack: function receiveAttack(col, row) {
      if (this.isRepeatedAttack(col, row)) return undefined;
      var attackedShip = false;
      this.ships.forEach(function (item) {
        item.squares.forEach(function (square) {
          if (square === "".concat(col).concat(row)) attackedShip = item;
        });
      });
      if (attackedShip) {
        attackedShip.obj.hit();
        this.trackAttack("".concat(col).concat(row), true, attackedShip.obj.isSunk());
        return attackedShip.name;
      }
      this.trackAttack("".concat(col).concat(row), false, false);
      return "".concat(col).concat(row);
    }
  };
};


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display */ "./src/display.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./src/game.js");


var gameInit = function () {
  var playerBoard = (0,_game__WEBPACK_IMPORTED_MODULE_1__.gameBoard)();
  var computerBoard = (0,_game__WEBPACK_IMPORTED_MODULE_1__.gameBoard)();
  function init(playerShips, computerShips) {
    playerShips.forEach(function (ship) {
      var first = undefined;
      var name = undefined;
      var last = undefined;
      ship.forEach(function (square) {
        if (name === undefined) {
          name = square.name;
          return;
        }
        if (first === undefined) first = {
          col: square.col,
          row: square.row
        };
        last = {
          col: square.col,
          row: square.row
        };
        var element = document.querySelector(".player-board").querySelector(".".concat(square.col).concat(square.row));
        element.classList.add("ship");
      });
      playerBoard.placeShip(first.col, last.col, first.row, last.row, name);
    });
  }
  return {
    init: init,
    playerBoard: playerBoard,
    computerBoard: computerBoard
  };
}();
function advanceGame(col, row) {}
function handleSquareClick(col, row) {
  if (gameInit.computerBoard.isRepeatedAttack(col, row)) return;
  gameInit.computerBoard.receiveAttack(col, row);
  if (gameInit.computerBoard.attacks[gameInit.computerBoard.attacks.length - 1].attackHit) {
    document.querySelector(".computer-board").querySelector(".".concat(col).concat(row)).classList.add("hit");
  } else {
    document.querySelector(".computer-board").querySelector(".".concat(col).concat(row)).classList.add("missed");
  }
}
var shipsArray = [[{
  name: "Patrol Boat"
}, {
  col: "a",
  row: 1
}, {
  col: "a",
  row: 2
}], [{
  name: "Battleship"
}, {
  col: "d",
  row: 9
}, {
  col: "e",
  row: 9
}, {
  col: "f",
  row: 9
}, {
  col: "g",
  row: 9
}], [{
  name: "Destroyer"
}, {
  col: "j",
  row: 6
}, {
  col: "j",
  row: 7
}, {
  col: "j",
  row: 8
}], [{
  name: "Aircraft Carrier"
}, {
  col: "c",
  row: 3
}, {
  col: "c",
  row: 4
}, {
  col: "c",
  row: 5
}, {
  col: "c",
  row: 6
}, {
  col: "c",
  row: 7
}], [{
  name: "Submarine"
}, {
  col: "e",
  row: 7
}, {
  col: "f",
  row: 7
}, {
  col: "g",
  row: 7
}]];
(0,_display__WEBPACK_IMPORTED_MODULE_0__.displayGame)();
gameInit.init(shipsArray);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handleSquareClick);

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0VBQUVDLEdBQUcsRUFBRTtBQUFFLENBQUMsRUFDcEI7RUFBRUQsR0FBRyxFQUFFLEdBQUc7RUFBRUMsR0FBRyxFQUFFO0FBQUUsQ0FBQyxFQUNwQjtFQUFFRCxHQUFHLEVBQUUsR0FBRztFQUFFQyxHQUFHLEVBQUU7QUFBRSxDQUFDLENBQ3JCLEVBQ0QsQ0FDRTtFQUFFMEQsSUFBSSxFQUFFO0FBQVksQ0FBQyxFQUNyQjtFQUFFM0QsR0FBRyxFQUFFLEdBQUc7RUFBRUMsR0FBRyxFQUFFO0FBQUUsQ0FBQyxFQUNwQjtFQUFFRCxHQUFHLEVBQUUsR0FBRztFQUFFQyxHQUFHLEVBQUU7QUFBRSxDQUFDLEVBQ3BCO0VBQUVELEdBQUcsRUFBRSxHQUFHO0VBQUVDLEdBQUcsRUFBRTtBQUFFLENBQUMsQ0FDckIsRUFDRCxDQUNFO0VBQUUwRCxJQUFJLEVBQUU7QUFBbUIsQ0FBQyxFQUM1QjtFQUFFM0QsR0FBRyxFQUFFLEdBQUc7RUFBRUMsR0FBRyxFQUFFO0FBQUUsQ0FBQyxFQUNwQjtFQUFFRCxHQUFHLEVBQUUsR0FBRztFQUFFQyxHQUFHLEVBQUU7QUFBRSxDQUFDLEVBQ3BCO0VBQUVELEdBQUcsRUFBRSxHQUFHO0VBQUVDLEdBQUcsRUFBRTtBQUFFLENBQUMsRUFDcEI7RUFBRUQsR0FBRyxFQUFFLEdBQUc7RUFBRUMsR0FBRyxFQUFFO0FBQUUsQ0FBQyxFQUNwQjtFQUFFRCxHQUFHLEVBQUUsR0FBRztFQUFFQyxHQUFHLEVBQUU7QUFBRSxDQUFDLENBQ3JCLEVBQ0QsQ0FDRTtFQUFFMEQsSUFBSSxFQUFFO0FBQVksQ0FBQyxFQUNyQjtFQUFFM0QsR0FBRyxFQUFFLEdBQUc7RUFBRUMsR0FBRyxFQUFFO0FBQUUsQ0FBQyxFQUNwQjtFQUFFRCxHQUFHLEVBQUUsR0FBRztFQUFFQyxHQUFHLEVBQUU7QUFBRSxDQUFDLEVBQ3BCO0VBQUVELEdBQUcsRUFBRSxHQUFHO0VBQUVDLEdBQUcsRUFBRTtBQUFFLENBQUMsQ0FDckIsQ0FDRjtBQUNEMkIscURBQVcsRUFBRTtBQUNiZ0QsUUFBUSxDQUFDQyxJQUFJLENBQUNPLFVBQVUsQ0FBQztBQUV6QixpRUFBZTNGLGlCQUFpQjs7Ozs7O1VDckZoQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBoYW5kbGVTcXVhcmVDbGljayBmcm9tIFwiLi9pbmRleFwiO1xuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWNvbnRhaW5lcl1cIik7XG5cbmZ1bmN0aW9uIHVwZGF0ZUJvYXJkRGlzcGxheShib2FyZCwgYXR0YWNrSGl0LCBjb2wsIHJvdykge1xuICBpZiAoYXR0YWNrSGl0KSB7XG4gICAgYm9hcmQucXVlcnlTZWxlY3RvcihgLiR7cm93fSR7Y29sfWApLmNsYXNzTGlzdC5hZGQoXCJtaXNzZWRcIik7XG4gIH0gZWxzZSB7XG4gICAgYm9hcmQucXVlcnlTZWxlY3RvcihgLiR7cm93fSR7Y29sfWApLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlQm9hcmQoKSB7XG4gIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMTsgaSArPSAxKSB7XG4gICAgZm9yIChsZXQgaiA9IFwiYVwiOyBqICE9PSBcImtcIjsgaiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoai5jaGFyQ29kZUF0KDApICsgMSkpIHtcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInNxdWFyZVwiKTtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGAke2p9JHtpfWApO1xuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmIChzcXVhcmUucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXItYm9hcmRcIikpIHJldHVybjtcbiAgICAgICAgaGFuZGxlU3F1YXJlQ2xpY2soaiwgaSk7XG4gICAgICB9KTtcbiAgICAgIGJvYXJkLmNsYXNzTGlzdC5hZGQoXCJib2FyZFwiKTtcbiAgICAgIGJvYXJkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBib2FyZDtcbn1cblxuZnVuY3Rpb24gcmVzZXQoKSB7XG4gIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUhlYWRlcigpIHtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgaGVhZGVyLnRleHRDb250ZW50ID0gXCJCYXR0bGVzaGlwXCI7XG4gIHJldHVybiBoZWFkZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvb3RlcigpIHtcbiAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgZm9vdGVyLnRleHRDb250ZW50ID0gXCJNYWRlIGJ5IFdpbGwgTW9yZXR6XCI7XG4gIHJldHVybiBmb290ZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRpdGxlKHRleHQpIHtcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB0aXRsZS5jbGFzc0xpc3QuYWRkKFwidGl0bGVcIik7XG4gIHRpdGxlLnRleHRDb250ZW50ID0gdGV4dDtcbiAgcmV0dXJuIHRpdGxlO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5R2FtZSgpIHtcbiAgcmVzZXQoKTtcblxuICBjb25zdCBoZWFkZXIgPSBjcmVhdGVIZWFkZXIoKTtcbiAgY29uc3QgZm9vdGVyID0gY3JlYXRlRm9vdGVyKCk7XG4gIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgY29uc3QgY29tcHV0ZXJUaXRsZSA9IGNyZWF0ZVRpdGxlKFwiQ29tcHV0ZXIncyBCb2FyZFwiKTtcbiAgY29uc3QgcGxheWVyVGl0bGUgPSBjcmVhdGVUaXRsZShcIllvdXIgQm9hcmRcIik7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICBjb21wdXRlckJvYXJkLmNsYXNzTGlzdC5hZGQoXCJjb21wdXRlci1ib2FyZFwiKTtcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICBwbGF5ZXJCb2FyZC5jbGFzc0xpc3QuYWRkKFwicGxheWVyLWJvYXJkXCIpO1xuXG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoY29tcHV0ZXJUaXRsZSk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoY29tcHV0ZXJCb2FyZCwgbnVsbCk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQocGxheWVyVGl0bGUpO1xuICBzZWN0aW9uLmFwcGVuZENoaWxkKHBsYXllckJvYXJkKTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNlY3Rpb24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVNldHVwKCkge1xuICBjb25zdCBoZWFkZXIgPSBjcmVhdGVIZWFkZXIoKTtcbiAgY29uc3QgZm9vdGVyID0gY3JlYXRlRm9vdGVyKCk7XG4gIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgY29uc3QgdGl0bGUgPSBjcmVhdGVUaXRsZShcIlBsYWNlIFlvdXIgU2hpcHMhXCIpO1xuICBjb25zdCBib2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG5cbiAgc2VjdGlvbi5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoYm9hcmQpO1xuXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VjdGlvbik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb290ZXIpO1xufVxuXG5leHBvcnQgeyBkaXNwbGF5R2FtZSwgZGlzcGxheVNldHVwLCB1cGRhdGVCb2FyZERpc3BsYXkgfTtcbiIsImNvbnN0IHNoaXAgPSAobGVuKSA9PiAoe1xuICBsZW5ndGg6IGxlbixcbiAgaGl0czogMCxcbiAgaGl0KCkge1xuICAgIHRoaXMuaGl0cyArPSAxO1xuICB9LFxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbn0pO1xuXG5mdW5jdGlvbiBjcmVhdGVCb2FyZCgpIHtcbiAgY29uc3QgYm9hcmQgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMTsgaSsrKSB7XG4gICAgY29uc3QgY29sdW1uID0ge307XG4gICAgT2JqZWN0LmFzc2lnbihjb2x1bW4sIHtcbiAgICAgIGNvbHVtbjogaSxcbiAgICAgIHJvdzogW1xuICAgICAgICB7IHBvc2l0aW9uOiBgYSR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgYiR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgYyR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgZCR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgZSR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgZiR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgZyR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgaCR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgaSR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgaiR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgXSxcbiAgICB9KTtcbiAgICBib2FyZC5wdXNoKGNvbHVtbik7XG4gIH1cbiAgcmV0dXJuIGJvYXJkO1xufVxuXG5jb25zdCBnYW1lQm9hcmQgPSAoKSA9PiAoe1xuICBib2FyZDogY3JlYXRlQm9hcmQoKSxcbiAgZmluZFNxdWFyZShjb2wsIHJvdykge1xuICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuYm9hcmRbcm93IC0gMV0ucm93LmZpbHRlcigob2JqKSA9PiB7XG4gICAgICByZXR1cm4gb2JqLnBvc2l0aW9uID09PSBgJHtjb2x9JHtyb3d9YDtcbiAgICB9KTtcbiAgICByZXR1cm4gc3F1YXJlO1xuICB9LFxuICBjaGVja1Bvc2l0aW9uKGNvbCwgcm93KSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgY29uc3Qgc3F1YXJlID0gdGhpcy5maW5kU3F1YXJlKGNvbCwgcm93KTtcbiAgICBjb25zdCBwb3NpdGlvbiA9IHNxdWFyZVswXS5wb3NpdGlvbjtcbiAgICBjb25zdCBoYXNTaGlwID0gc3F1YXJlWzBdLmhhc1NoaXA7XG4gICAgT2JqZWN0LmFzc2lnbihyZXN1bHQsIHsgcG9zaXRpb24sIGhhc1NoaXAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcbiAgc2hpcHM6IFtdLFxuICBwbGFjZVNoaXAoc3RhcnRDb2wsIGVuZENvbCwgc3RhcnRSb3csIGVuZFJvdywgbmFtZSkge1xuICAgIGxldCBsZW5ndGggPSAwO1xuICAgIGxldCBvY2N1cGllZFNxdWFyZXMgPSBbXTtcbiAgICBpZiAoc3RhcnRSb3cgIT09IGVuZFJvdykge1xuICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0Um93OyBpIDwgZW5kUm93ICsgMTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuZmluZFNxdWFyZShzdGFydENvbCwgaSk7XG4gICAgICAgIHNxdWFyZVswXS5oYXNTaGlwID0gdHJ1ZTtcbiAgICAgICAgbGVuZ3RoICs9IDE7XG4gICAgICAgIG9jY3VwaWVkU3F1YXJlcy5wdXNoKGAke3N0YXJ0Q29sfSR7aX1gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGN1cnJlbnRDb2wgPSBzdGFydENvbDtcbiAgICAgIHdoaWxlIChjdXJyZW50Q29sICE9PSBTdHJpbmcuZnJvbUNoYXJDb2RlKGVuZENvbC5jaGFyQ29kZUF0KDApICsgMSkpIHtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gdGhpcy5maW5kU3F1YXJlKGN1cnJlbnRDb2wsIHN0YXJ0Um93KTtcbiAgICAgICAgc3F1YXJlWzBdLmhhc1NoaXAgPSB0cnVlO1xuICAgICAgICBvY2N1cGllZFNxdWFyZXMucHVzaChgJHtjdXJyZW50Q29sfSR7c3RhcnRSb3d9YCk7XG4gICAgICAgIGN1cnJlbnRDb2wgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGN1cnJlbnRDb2wuY2hhckNvZGVBdCgwKSArIDEpO1xuICAgICAgICBsZW5ndGggKz0gMTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zaGlwcy5wdXNoKHtcbiAgICAgIHNxdWFyZXM6IG9jY3VwaWVkU3F1YXJlcyxcbiAgICAgIG5hbWUsXG4gICAgICBvYmo6IHNoaXAobGVuZ3RoKSxcbiAgICB9KTtcbiAgfSxcbiAgYXR0YWNrczogW10sXG4gIHRyYWNrQXR0YWNrKHBvc2l0aW9uLCBhdHRhY2tIaXQsIHNhbmtTaGlwKSB7XG4gICAgdGhpcy5hdHRhY2tzLnB1c2goeyBwb3NpdGlvbiwgYXR0YWNrSGl0LCBzYW5rU2hpcCB9KTtcbiAgfSxcbiAgYWxsU2hpcHNTdW5rKCkge1xuICAgIGlmICh0aGlzLnNoaXBzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuICAgIGxldCBzaGlwc1N1bmsgPSAwO1xuICAgIHRoaXMuYXR0YWNrcy5mb3JFYWNoKChhdHRhY2spID0+IHtcbiAgICAgIGlmIChhdHRhY2suc2Fua1NoaXApIHNoaXBzU3VuayArPSAxO1xuICAgIH0pO1xuICAgIGlmIChzaGlwc1N1bmsgPj0gdGhpcy5zaGlwcy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbiAgaXNSZXBlYXRlZEF0dGFjayhjb2wsIHJvdykge1xuICAgIGxldCByZXBlYXQgPSBmYWxzZTtcbiAgICB0aGlzLmF0dGFja3MuZm9yRWFjaCgoYXR0YWNrKSA9PiB7XG4gICAgICBpZiAoYXR0YWNrLnBvc2l0aW9uID09PSBgJHtjb2x9JHtyb3d9YCkge1xuICAgICAgICByZXBlYXQgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcGVhdDtcbiAgfSxcbiAgcmVjZWl2ZUF0dGFjayhjb2wsIHJvdykge1xuICAgIGlmICh0aGlzLmlzUmVwZWF0ZWRBdHRhY2soY29sLCByb3cpKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGxldCBhdHRhY2tlZFNoaXAgPSBmYWxzZTtcbiAgICB0aGlzLnNoaXBzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0uc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICAgICAgaWYgKHNxdWFyZSA9PT0gYCR7Y29sfSR7cm93fWApIGF0dGFja2VkU2hpcCA9IGl0ZW07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZiAoYXR0YWNrZWRTaGlwKSB7XG4gICAgICBhdHRhY2tlZFNoaXAub2JqLmhpdCgpO1xuICAgICAgdGhpcy50cmFja0F0dGFjayhgJHtjb2x9JHtyb3d9YCwgdHJ1ZSwgYXR0YWNrZWRTaGlwLm9iai5pc1N1bmsoKSk7XG4gICAgICByZXR1cm4gYXR0YWNrZWRTaGlwLm5hbWU7XG4gICAgfVxuICAgIHRoaXMudHJhY2tBdHRhY2soYCR7Y29sfSR7cm93fWAsIGZhbHNlLCBmYWxzZSk7XG4gICAgcmV0dXJuIGAke2NvbH0ke3Jvd31gO1xuICB9LFxufSk7XG5cbmV4cG9ydCB7IHNoaXAsIGdhbWVCb2FyZCB9O1xuIiwiaW1wb3J0IHsgZGlzcGxheUdhbWUsIGRpc3BsYXlTZXR1cCB9IGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCB7IGdhbWVCb2FyZCB9IGZyb20gXCIuL2dhbWVcIjtcblxuY29uc3QgZ2FtZUluaXQgPSAoKCkgPT4ge1xuICBjb25zdCBwbGF5ZXJCb2FyZCA9IGdhbWVCb2FyZCgpO1xuICBjb25zdCBjb21wdXRlckJvYXJkID0gZ2FtZUJvYXJkKCk7XG5cbiAgZnVuY3Rpb24gaW5pdChwbGF5ZXJTaGlwcywgY29tcHV0ZXJTaGlwcykge1xuICAgIHBsYXllclNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIGxldCBmaXJzdCA9IHVuZGVmaW5lZDtcbiAgICAgIGxldCBuYW1lID0gdW5kZWZpbmVkO1xuICAgICAgbGV0IGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgICBzaGlwLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgICAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbmFtZSA9IHNxdWFyZS5uYW1lO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlyc3QgPT09IHVuZGVmaW5lZCkgZmlyc3QgPSB7IGNvbDogc3F1YXJlLmNvbCwgcm93OiBzcXVhcmUucm93IH07XG4gICAgICAgIGxhc3QgPSB7IGNvbDogc3F1YXJlLmNvbCwgcm93OiBzcXVhcmUucm93IH07XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudFxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1ib2FyZFwiKVxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHtzcXVhcmUuY29sfSR7c3F1YXJlLnJvd31gKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgIH0pO1xuICAgICAgcGxheWVyQm9hcmQucGxhY2VTaGlwKGZpcnN0LmNvbCwgbGFzdC5jb2wsIGZpcnN0LnJvdywgbGFzdC5yb3csIG5hbWUpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHsgaW5pdCwgcGxheWVyQm9hcmQsIGNvbXB1dGVyQm9hcmQgfTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFkdmFuY2VHYW1lKGNvbCwgcm93KSB7fVxuXG5mdW5jdGlvbiBoYW5kbGVTcXVhcmVDbGljayhjb2wsIHJvdykge1xuICBpZiAoZ2FtZUluaXQuY29tcHV0ZXJCb2FyZC5pc1JlcGVhdGVkQXR0YWNrKGNvbCwgcm93KSkgcmV0dXJuO1xuICBnYW1lSW5pdC5jb21wdXRlckJvYXJkLnJlY2VpdmVBdHRhY2soY29sLCByb3cpO1xuICBpZiAoXG4gICAgZ2FtZUluaXQuY29tcHV0ZXJCb2FyZC5hdHRhY2tzW2dhbWVJbml0LmNvbXB1dGVyQm9hcmQuYXR0YWNrcy5sZW5ndGggLSAxXVxuICAgICAgLmF0dGFja0hpdFxuICApIHtcbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXItYm9hcmRcIilcbiAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHtjb2x9JHtyb3d9YClcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlci1ib2FyZFwiKVxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC4ke2NvbH0ke3Jvd31gKVxuICAgICAgLmNsYXNzTGlzdC5hZGQoXCJtaXNzZWRcIik7XG4gIH1cbn1cblxuY29uc3Qgc2hpcHNBcnJheSA9IFtcbiAgW3sgbmFtZTogXCJQYXRyb2wgQm9hdFwiIH0sIHsgY29sOiBcImFcIiwgcm93OiAxIH0sIHsgY29sOiBcImFcIiwgcm93OiAyIH1dLFxuICBbXG4gICAgeyBuYW1lOiBcIkJhdHRsZXNoaXBcIiB9LFxuICAgIHsgY29sOiBcImRcIiwgcm93OiA5IH0sXG4gICAgeyBjb2w6IFwiZVwiLCByb3c6IDkgfSxcbiAgICB7IGNvbDogXCJmXCIsIHJvdzogOSB9LFxuICAgIHsgY29sOiBcImdcIiwgcm93OiA5IH0sXG4gIF0sXG4gIFtcbiAgICB7IG5hbWU6IFwiRGVzdHJveWVyXCIgfSxcbiAgICB7IGNvbDogXCJqXCIsIHJvdzogNiB9LFxuICAgIHsgY29sOiBcImpcIiwgcm93OiA3IH0sXG4gICAgeyBjb2w6IFwialwiLCByb3c6IDggfSxcbiAgXSxcbiAgW1xuICAgIHsgbmFtZTogXCJBaXJjcmFmdCBDYXJyaWVyXCIgfSxcbiAgICB7IGNvbDogXCJjXCIsIHJvdzogMyB9LFxuICAgIHsgY29sOiBcImNcIiwgcm93OiA0IH0sXG4gICAgeyBjb2w6IFwiY1wiLCByb3c6IDUgfSxcbiAgICB7IGNvbDogXCJjXCIsIHJvdzogNiB9LFxuICAgIHsgY29sOiBcImNcIiwgcm93OiA3IH0sXG4gIF0sXG4gIFtcbiAgICB7IG5hbWU6IFwiU3VibWFyaW5lXCIgfSxcbiAgICB7IGNvbDogXCJlXCIsIHJvdzogNyB9LFxuICAgIHsgY29sOiBcImZcIiwgcm93OiA3IH0sXG4gICAgeyBjb2w6IFwiZ1wiLCByb3c6IDcgfSxcbiAgXSxcbl07XG5kaXNwbGF5R2FtZSgpO1xuZ2FtZUluaXQuaW5pdChzaGlwc0FycmF5KTtcblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlU3F1YXJlQ2xpY2s7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbImhhbmRsZVNxdWFyZUNsaWNrIiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidXBkYXRlQm9hcmREaXNwbGF5IiwiYm9hcmQiLCJhdHRhY2tIaXQiLCJjb2wiLCJyb3ciLCJjb25jYXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJjcmVhdGVCb2FyZCIsImNyZWF0ZUVsZW1lbnQiLCJfbG9vcCIsImkiLCJfbG9vcDIiLCJqIiwic3F1YXJlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhcmVudEVsZW1lbnQiLCJjb250YWlucyIsImFwcGVuZENoaWxkIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiY2hhckNvZGVBdCIsInJlc2V0IiwidGV4dENvbnRlbnQiLCJjcmVhdGVIZWFkZXIiLCJoZWFkZXIiLCJjcmVhdGVGb290ZXIiLCJmb290ZXIiLCJjcmVhdGVUaXRsZSIsInRleHQiLCJ0aXRsZSIsImRpc3BsYXlHYW1lIiwic2VjdGlvbiIsImNvbXB1dGVyVGl0bGUiLCJwbGF5ZXJUaXRsZSIsImNvbXB1dGVyQm9hcmQiLCJwbGF5ZXJCb2FyZCIsImRpc3BsYXlTZXR1cCIsInNoaXAiLCJsZW4iLCJsZW5ndGgiLCJoaXRzIiwiaGl0IiwiaXNTdW5rIiwiY29sdW1uIiwiT2JqZWN0IiwiYXNzaWduIiwicG9zaXRpb24iLCJoYXNTaGlwIiwicHVzaCIsImdhbWVCb2FyZCIsImZpbmRTcXVhcmUiLCJmaWx0ZXIiLCJvYmoiLCJjaGVja1Bvc2l0aW9uIiwicmVzdWx0Iiwic2hpcHMiLCJwbGFjZVNoaXAiLCJzdGFydENvbCIsImVuZENvbCIsInN0YXJ0Um93IiwiZW5kUm93IiwibmFtZSIsIm9jY3VwaWVkU3F1YXJlcyIsImN1cnJlbnRDb2wiLCJzcXVhcmVzIiwiYXR0YWNrcyIsInRyYWNrQXR0YWNrIiwic2Fua1NoaXAiLCJhbGxTaGlwc1N1bmsiLCJzaGlwc1N1bmsiLCJmb3JFYWNoIiwiYXR0YWNrIiwiaXNSZXBlYXRlZEF0dGFjayIsInJlcGVhdCIsInJlY2VpdmVBdHRhY2siLCJ1bmRlZmluZWQiLCJhdHRhY2tlZFNoaXAiLCJpdGVtIiwiZ2FtZUluaXQiLCJpbml0IiwicGxheWVyU2hpcHMiLCJjb21wdXRlclNoaXBzIiwiZmlyc3QiLCJsYXN0IiwiZWxlbWVudCIsImFkdmFuY2VHYW1lIiwic2hpcHNBcnJheSJdLCJzb3VyY2VSb290IjoiIn0=
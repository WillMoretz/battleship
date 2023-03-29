/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/computer.js":
/*!*************************!*\
  !*** ./src/computer.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "chooseSquare": () => (/* binding */ chooseSquare),
/* harmony export */   "getPossibleSquares": () => (/* binding */ getPossibleSquares)
/* harmony export */ });
function getPossibleSquares(board) {
  var possibleSquares = [];
  for (var i = 1; i < 11; i++) {
    for (var j = "a"; j !== "k"; j = String.fromCharCode(j.charCodeAt(0) + 1)) {
      if (!board.isRepeatedAttack(j, i)) possibleSquares.push({
        row: i,
        col: j
      });
    }
  }
  return possibleSquares;
}
function chooseSquare(board) {
  var squares = getPossibleSquares(board);
  return squares[Math.floor(Math.random() * squares.length)];
}


/***/ }),

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
/* harmony import */ var _computer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computer */ "./src/computer.js");



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
function markSquare(board, col, row, boardType) {
  console.log("here");
  board.receiveAttack(col, row);
  if (board.attacks[board.attacks.length - 1].attackHit) {
    document.querySelector(".".concat(boardType, "-board")).querySelector(".".concat(col).concat(row)).classList.add("hit");
  } else {
    document.querySelector(".".concat(boardType, "-board")).querySelector(".".concat(col).concat(row)).classList.add("missed");
  }
}
function handleSquareClick(col, row) {
  if (gameInit.computerBoard.isRepeatedAttack(col, row)) return;
  markSquare(gameInit.computerBoard, col, row, "computer");
  if (gameInit.computerBoard.allShipsSunk()) return;
  var computerChoice = (0,_computer__WEBPACK_IMPORTED_MODULE_2__.chooseSquare)(gameInit.playerBoard);
  markSquare(gameInit.playerBoard, computerChoice.col, computerChoice.row, "player");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RCxHQUFHLEVBQUU7QUFBRSxDQUFDLEVBQUU7RUFBRUMsR0FBRyxFQUFFLEdBQUc7RUFBRUQsR0FBRyxFQUFFO0FBQUUsQ0FBQyxDQUFDLEVBQ3JFLENBQ0U7RUFBRWdFLElBQUksRUFBRTtBQUFhLENBQUMsRUFDdEI7RUFBRS9ELEdBQUcsRUFBRSxHQUFHO0VBQUVELEdBQUcsRUFBRTtBQUFFLENBQUMsRUFDcEI7RUFBRUMsR0FBRyxFQUFFLEdBQUc7RUFBRUQsR0FBRyxFQUFFO0FBQUUsQ0FBQyxFQUNwQjtFQUFFQyxHQUFHLEVBQUUsR0FBRztFQUFFRCxHQUFHLEVBQUU7QUFBRSxDQUFDLEVBQ3BCO0VBQUVDLEdBQUcsRUFBRSxHQUFHO0VBQUVELEdBQUcsRUFBRTtBQUFFLENBQUMsQ0FDckIsRUFDRCxDQUNFO0VBQUVnRSxJQUFJLEVBQUU7QUFBWSxDQUFDLEVBQ3JCO0VBQUUvRCxHQUFHLEVBQUUsR0FBRztFQUFFRCxHQUFHLEVBQUU7QUFBRSxDQUFDLEVBQ3BCO0VBQUVDLEdBQUcsRUFBRSxHQUFHO0VBQUVELEdBQUcsRUFBRTtBQUFFLENBQUMsRUFDcEI7RUFBRUMsR0FBRyxFQUFFLEdBQUc7RUFBRUQsR0FBRyxFQUFFO0FBQUUsQ0FBQyxDQUNyQixFQUNELENBQ0U7RUFBRWdFLElBQUksRUFBRTtBQUFtQixDQUFDLEVBQzVCO0VBQUUvRCxHQUFHLEVBQUUsR0FBRztFQUFFRCxHQUFHLEVBQUU7QUFBRSxDQUFDLEVBQ3BCO0VBQUVDLEdBQUcsRUFBRSxHQUFHO0VBQUVELEdBQUcsRUFBRTtBQUFFLENBQUMsRUFDcEI7RUFBRUMsR0FBRyxFQUFFLEdBQUc7RUFBRUQsR0FBRyxFQUFFO0FBQUUsQ0FBQyxFQUNwQjtFQUFFQyxHQUFHLEVBQUUsR0FBRztFQUFFRCxHQUFHLEVBQUU7QUFBRSxDQUFDLEVBQ3BCO0VBQUVDLEdBQUcsRUFBRSxHQUFHO0VBQUVELEdBQUcsRUFBRTtBQUFFLENBQUMsQ0FDckIsRUFDRCxDQUNFO0VBQUVnRSxJQUFJLEVBQUU7QUFBWSxDQUFDLEVBQ3JCO0VBQUUvRCxHQUFHLEVBQUUsR0FBRztFQUFFRCxHQUFHLEVBQUU7QUFBRSxDQUFDLEVBQ3BCO0VBQUVDLEdBQUcsRUFBRSxHQUFHO0VBQUVELEdBQUcsRUFBRTtBQUFFLENBQUMsRUFDcEI7RUFBRUMsR0FBRyxFQUFFLEdBQUc7RUFBRUQsR0FBRyxFQUFFO0FBQUUsQ0FBQyxDQUNyQixDQUNGO0FBQ0RtQyxxREFBVyxFQUFFO0FBQ2I2QyxRQUFRLENBQUNDLElBQUksQ0FBQ1ksVUFBVSxDQUFDO0FBRXpCLGlFQUFlckYsaUJBQWlCOzs7Ozs7VUNqR2hDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wdXRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBnZXRQb3NzaWJsZVNxdWFyZXMoYm9hcmQpIHtcbiAgY29uc3QgcG9zc2libGVTcXVhcmVzID0gW107XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgMTE7IGkrKykge1xuICAgIGZvciAobGV0IGogPSBcImFcIjsgaiAhPT0gXCJrXCI7IGogPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGouY2hhckNvZGVBdCgwKSArIDEpKSB7XG4gICAgICBpZiAoIWJvYXJkLmlzUmVwZWF0ZWRBdHRhY2soaiwgaSkpXG4gICAgICAgIHBvc3NpYmxlU3F1YXJlcy5wdXNoKHsgcm93OiBpLCBjb2w6IGogfSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBwb3NzaWJsZVNxdWFyZXM7XG59XG5cbmZ1bmN0aW9uIGNob29zZVNxdWFyZShib2FyZCkge1xuICBjb25zdCBzcXVhcmVzID0gZ2V0UG9zc2libGVTcXVhcmVzKGJvYXJkKTtcbiAgcmV0dXJuIHNxdWFyZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc3F1YXJlcy5sZW5ndGgpXTtcbn1cblxuZXhwb3J0IHsgY2hvb3NlU3F1YXJlLCBnZXRQb3NzaWJsZVNxdWFyZXMgfTtcbiIsImltcG9ydCBoYW5kbGVTcXVhcmVDbGljayBmcm9tIFwiLi9pbmRleFwiO1xuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWNvbnRhaW5lcl1cIik7XG5cbmZ1bmN0aW9uIHVwZGF0ZUJvYXJkRGlzcGxheShib2FyZCwgYXR0YWNrSGl0LCBjb2wsIHJvdykge1xuICBpZiAoYXR0YWNrSGl0KSB7XG4gICAgYm9hcmQucXVlcnlTZWxlY3RvcihgLiR7cm93fSR7Y29sfWApLmNsYXNzTGlzdC5hZGQoXCJtaXNzZWRcIik7XG4gIH0gZWxzZSB7XG4gICAgYm9hcmQucXVlcnlTZWxlY3RvcihgLiR7cm93fSR7Y29sfWApLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlQm9hcmQoKSB7XG4gIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMTsgaSArPSAxKSB7XG4gICAgZm9yIChsZXQgaiA9IFwiYVwiOyBqICE9PSBcImtcIjsgaiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoai5jaGFyQ29kZUF0KDApICsgMSkpIHtcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInNxdWFyZVwiKTtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGAke2p9JHtpfWApO1xuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmIChzcXVhcmUucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXItYm9hcmRcIikpIHJldHVybjtcbiAgICAgICAgaGFuZGxlU3F1YXJlQ2xpY2soaiwgaSk7XG4gICAgICB9KTtcbiAgICAgIGJvYXJkLmNsYXNzTGlzdC5hZGQoXCJib2FyZFwiKTtcbiAgICAgIGJvYXJkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBib2FyZDtcbn1cblxuZnVuY3Rpb24gcmVzZXQoKSB7XG4gIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUhlYWRlcigpIHtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgaGVhZGVyLnRleHRDb250ZW50ID0gXCJCYXR0bGVzaGlwXCI7XG4gIHJldHVybiBoZWFkZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvb3RlcigpIHtcbiAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgZm9vdGVyLnRleHRDb250ZW50ID0gXCJNYWRlIGJ5IFdpbGwgTW9yZXR6XCI7XG4gIHJldHVybiBmb290ZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRpdGxlKHRleHQpIHtcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB0aXRsZS5jbGFzc0xpc3QuYWRkKFwidGl0bGVcIik7XG4gIHRpdGxlLnRleHRDb250ZW50ID0gdGV4dDtcbiAgcmV0dXJuIHRpdGxlO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5R2FtZSgpIHtcbiAgcmVzZXQoKTtcblxuICBjb25zdCBoZWFkZXIgPSBjcmVhdGVIZWFkZXIoKTtcbiAgY29uc3QgZm9vdGVyID0gY3JlYXRlRm9vdGVyKCk7XG4gIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgY29uc3QgY29tcHV0ZXJUaXRsZSA9IGNyZWF0ZVRpdGxlKFwiQ29tcHV0ZXIncyBCb2FyZFwiKTtcbiAgY29uc3QgcGxheWVyVGl0bGUgPSBjcmVhdGVUaXRsZShcIllvdXIgQm9hcmRcIik7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICBjb21wdXRlckJvYXJkLmNsYXNzTGlzdC5hZGQoXCJjb21wdXRlci1ib2FyZFwiKTtcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICBwbGF5ZXJCb2FyZC5jbGFzc0xpc3QuYWRkKFwicGxheWVyLWJvYXJkXCIpO1xuXG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoY29tcHV0ZXJUaXRsZSk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoY29tcHV0ZXJCb2FyZCwgbnVsbCk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQocGxheWVyVGl0bGUpO1xuICBzZWN0aW9uLmFwcGVuZENoaWxkKHBsYXllckJvYXJkKTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNlY3Rpb24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVNldHVwKCkge1xuICBjb25zdCBoZWFkZXIgPSBjcmVhdGVIZWFkZXIoKTtcbiAgY29uc3QgZm9vdGVyID0gY3JlYXRlRm9vdGVyKCk7XG4gIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgY29uc3QgdGl0bGUgPSBjcmVhdGVUaXRsZShcIlBsYWNlIFlvdXIgU2hpcHMhXCIpO1xuICBjb25zdCBib2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG5cbiAgc2VjdGlvbi5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoYm9hcmQpO1xuXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VjdGlvbik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb290ZXIpO1xufVxuXG5leHBvcnQgeyBkaXNwbGF5R2FtZSwgZGlzcGxheVNldHVwLCB1cGRhdGVCb2FyZERpc3BsYXkgfTtcbiIsImNvbnN0IHNoaXAgPSAobGVuKSA9PiAoe1xuICBsZW5ndGg6IGxlbixcbiAgaGl0czogMCxcbiAgaGl0KCkge1xuICAgIHRoaXMuaGl0cyArPSAxO1xuICB9LFxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbn0pO1xuXG5mdW5jdGlvbiBjcmVhdGVCb2FyZCgpIHtcbiAgY29uc3QgYm9hcmQgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMTsgaSsrKSB7XG4gICAgY29uc3QgY29sdW1uID0ge307XG4gICAgT2JqZWN0LmFzc2lnbihjb2x1bW4sIHtcbiAgICAgIGNvbHVtbjogaSxcbiAgICAgIHJvdzogW1xuICAgICAgICB7IHBvc2l0aW9uOiBgYSR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgYiR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgYyR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgZCR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgZSR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgZiR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgZyR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgaCR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgaSR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgaiR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgXSxcbiAgICB9KTtcbiAgICBib2FyZC5wdXNoKGNvbHVtbik7XG4gIH1cbiAgcmV0dXJuIGJvYXJkO1xufVxuXG5jb25zdCBnYW1lQm9hcmQgPSAoKSA9PiAoe1xuICBib2FyZDogY3JlYXRlQm9hcmQoKSxcbiAgZmluZFNxdWFyZShjb2wsIHJvdykge1xuICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuYm9hcmRbcm93IC0gMV0ucm93LmZpbHRlcigob2JqKSA9PiB7XG4gICAgICByZXR1cm4gb2JqLnBvc2l0aW9uID09PSBgJHtjb2x9JHtyb3d9YDtcbiAgICB9KTtcbiAgICByZXR1cm4gc3F1YXJlO1xuICB9LFxuICBjaGVja1Bvc2l0aW9uKGNvbCwgcm93KSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgY29uc3Qgc3F1YXJlID0gdGhpcy5maW5kU3F1YXJlKGNvbCwgcm93KTtcbiAgICBjb25zdCBwb3NpdGlvbiA9IHNxdWFyZVswXS5wb3NpdGlvbjtcbiAgICBjb25zdCBoYXNTaGlwID0gc3F1YXJlWzBdLmhhc1NoaXA7XG4gICAgT2JqZWN0LmFzc2lnbihyZXN1bHQsIHsgcG9zaXRpb24sIGhhc1NoaXAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcbiAgc2hpcHM6IFtdLFxuICBwbGFjZVNoaXAoc3RhcnRDb2wsIGVuZENvbCwgc3RhcnRSb3csIGVuZFJvdywgbmFtZSkge1xuICAgIGxldCBsZW5ndGggPSAwO1xuICAgIGxldCBvY2N1cGllZFNxdWFyZXMgPSBbXTtcbiAgICBpZiAoc3RhcnRSb3cgIT09IGVuZFJvdykge1xuICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0Um93OyBpIDwgZW5kUm93ICsgMTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuZmluZFNxdWFyZShzdGFydENvbCwgaSk7XG4gICAgICAgIHNxdWFyZVswXS5oYXNTaGlwID0gdHJ1ZTtcbiAgICAgICAgbGVuZ3RoICs9IDE7XG4gICAgICAgIG9jY3VwaWVkU3F1YXJlcy5wdXNoKGAke3N0YXJ0Q29sfSR7aX1gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGN1cnJlbnRDb2wgPSBzdGFydENvbDtcbiAgICAgIHdoaWxlIChjdXJyZW50Q29sICE9PSBTdHJpbmcuZnJvbUNoYXJDb2RlKGVuZENvbC5jaGFyQ29kZUF0KDApICsgMSkpIHtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gdGhpcy5maW5kU3F1YXJlKGN1cnJlbnRDb2wsIHN0YXJ0Um93KTtcbiAgICAgICAgc3F1YXJlWzBdLmhhc1NoaXAgPSB0cnVlO1xuICAgICAgICBvY2N1cGllZFNxdWFyZXMucHVzaChgJHtjdXJyZW50Q29sfSR7c3RhcnRSb3d9YCk7XG4gICAgICAgIGN1cnJlbnRDb2wgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGN1cnJlbnRDb2wuY2hhckNvZGVBdCgwKSArIDEpO1xuICAgICAgICBsZW5ndGggKz0gMTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zaGlwcy5wdXNoKHtcbiAgICAgIHNxdWFyZXM6IG9jY3VwaWVkU3F1YXJlcyxcbiAgICAgIG5hbWUsXG4gICAgICBvYmo6IHNoaXAobGVuZ3RoKSxcbiAgICB9KTtcbiAgfSxcbiAgYXR0YWNrczogW10sXG4gIHRyYWNrQXR0YWNrKHBvc2l0aW9uLCBhdHRhY2tIaXQsIHNhbmtTaGlwKSB7XG4gICAgdGhpcy5hdHRhY2tzLnB1c2goeyBwb3NpdGlvbiwgYXR0YWNrSGl0LCBzYW5rU2hpcCB9KTtcbiAgfSxcbiAgYWxsU2hpcHNTdW5rKCkge1xuICAgIGlmICh0aGlzLnNoaXBzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuICAgIGxldCBzaGlwc1N1bmsgPSAwO1xuICAgIHRoaXMuYXR0YWNrcy5mb3JFYWNoKChhdHRhY2spID0+IHtcbiAgICAgIGlmIChhdHRhY2suc2Fua1NoaXApIHNoaXBzU3VuayArPSAxO1xuICAgIH0pO1xuICAgIGlmIChzaGlwc1N1bmsgPj0gdGhpcy5zaGlwcy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbiAgaXNSZXBlYXRlZEF0dGFjayhjb2wsIHJvdykge1xuICAgIGxldCByZXBlYXQgPSBmYWxzZTtcbiAgICB0aGlzLmF0dGFja3MuZm9yRWFjaCgoYXR0YWNrKSA9PiB7XG4gICAgICBpZiAoYXR0YWNrLnBvc2l0aW9uID09PSBgJHtjb2x9JHtyb3d9YCkge1xuICAgICAgICByZXBlYXQgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcGVhdDtcbiAgfSxcbiAgcmVjZWl2ZUF0dGFjayhjb2wsIHJvdykge1xuICAgIGlmICh0aGlzLmlzUmVwZWF0ZWRBdHRhY2soY29sLCByb3cpKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGxldCBhdHRhY2tlZFNoaXAgPSBmYWxzZTtcbiAgICB0aGlzLnNoaXBzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0uc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICAgICAgaWYgKHNxdWFyZSA9PT0gYCR7Y29sfSR7cm93fWApIGF0dGFja2VkU2hpcCA9IGl0ZW07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZiAoYXR0YWNrZWRTaGlwKSB7XG4gICAgICBhdHRhY2tlZFNoaXAub2JqLmhpdCgpO1xuICAgICAgdGhpcy50cmFja0F0dGFjayhgJHtjb2x9JHtyb3d9YCwgdHJ1ZSwgYXR0YWNrZWRTaGlwLm9iai5pc1N1bmsoKSk7XG4gICAgICByZXR1cm4gYXR0YWNrZWRTaGlwLm5hbWU7XG4gICAgfVxuICAgIHRoaXMudHJhY2tBdHRhY2soYCR7Y29sfSR7cm93fWAsIGZhbHNlLCBmYWxzZSk7XG4gICAgcmV0dXJuIGAke2NvbH0ke3Jvd31gO1xuICB9LFxufSk7XG5cbmV4cG9ydCB7IHNoaXAsIGdhbWVCb2FyZCB9O1xuIiwiaW1wb3J0IHsgZGlzcGxheUdhbWUsIGRpc3BsYXlTZXR1cCB9IGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCB7IGdhbWVCb2FyZCB9IGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCB7IGNob29zZVNxdWFyZSwgY29tcHV0ZXIgfSBmcm9tIFwiLi9jb21wdXRlclwiO1xuXG5jb25zdCBnYW1lSW5pdCA9ICgoKSA9PiB7XG4gIGNvbnN0IHBsYXllckJvYXJkID0gZ2FtZUJvYXJkKCk7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBnYW1lQm9hcmQoKTtcblxuICBmdW5jdGlvbiBpbml0KHBsYXllclNoaXBzLCBjb21wdXRlclNoaXBzKSB7XG4gICAgcGxheWVyU2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgbGV0IGZpcnN0ID0gdW5kZWZpbmVkO1xuICAgICAgbGV0IG5hbWUgPSB1bmRlZmluZWQ7XG4gICAgICBsZXQgbGFzdCA9IHVuZGVmaW5lZDtcbiAgICAgIHNoaXAuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgICAgIGlmIChuYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBuYW1lID0gc3F1YXJlLm5hbWU7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkKSBmaXJzdCA9IHsgY29sOiBzcXVhcmUuY29sLCByb3c6IHNxdWFyZS5yb3cgfTtcbiAgICAgICAgbGFzdCA9IHsgY29sOiBzcXVhcmUuY29sLCByb3c6IHNxdWFyZS5yb3cgfTtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50XG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLWJvYXJkXCIpXG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC4ke3NxdWFyZS5jb2x9JHtzcXVhcmUucm93fWApO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgfSk7XG4gICAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoZmlyc3QuY29sLCBsYXN0LmNvbCwgZmlyc3Qucm93LCBsYXN0LnJvdywgbmFtZSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4geyBpbml0LCBwbGF5ZXJCb2FyZCwgY29tcHV0ZXJCb2FyZCB9O1xufSkoKTtcblxuZnVuY3Rpb24gYWR2YW5jZUdhbWUoY29sLCByb3cpIHt9XG5cbmZ1bmN0aW9uIG1hcmtTcXVhcmUoYm9hcmQsIGNvbCwgcm93LCBib2FyZFR5cGUpIHtcbiAgY29uc29sZS5sb2coXCJoZXJlXCIpO1xuICBib2FyZC5yZWNlaXZlQXR0YWNrKGNvbCwgcm93KTtcbiAgaWYgKGJvYXJkLmF0dGFja3NbYm9hcmQuYXR0YWNrcy5sZW5ndGggLSAxXS5hdHRhY2tIaXQpIHtcbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC4ke2JvYXJkVHlwZX0tYm9hcmRgKVxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC4ke2NvbH0ke3Jvd31gKVxuICAgICAgLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHtib2FyZFR5cGV9LWJvYXJkYClcbiAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHtjb2x9JHtyb3d9YClcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwibWlzc2VkXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVNxdWFyZUNsaWNrKGNvbCwgcm93KSB7XG4gIGlmIChnYW1lSW5pdC5jb21wdXRlckJvYXJkLmlzUmVwZWF0ZWRBdHRhY2soY29sLCByb3cpKSByZXR1cm47XG4gIG1hcmtTcXVhcmUoZ2FtZUluaXQuY29tcHV0ZXJCb2FyZCwgY29sLCByb3csIFwiY29tcHV0ZXJcIik7XG5cbiAgaWYgKGdhbWVJbml0LmNvbXB1dGVyQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHJldHVybjtcbiAgY29uc3QgY29tcHV0ZXJDaG9pY2UgPSBjaG9vc2VTcXVhcmUoZ2FtZUluaXQucGxheWVyQm9hcmQpO1xuICBtYXJrU3F1YXJlKFxuICAgIGdhbWVJbml0LnBsYXllckJvYXJkLFxuICAgIGNvbXB1dGVyQ2hvaWNlLmNvbCxcbiAgICBjb21wdXRlckNob2ljZS5yb3csXG4gICAgXCJwbGF5ZXJcIlxuICApO1xufVxuXG5jb25zdCBzaGlwc0FycmF5ID0gW1xuICBbeyBuYW1lOiBcIlBhdHJvbCBCb2F0XCIgfSwgeyBjb2w6IFwiYVwiLCByb3c6IDEgfSwgeyBjb2w6IFwiYVwiLCByb3c6IDIgfV0sXG4gIFtcbiAgICB7IG5hbWU6IFwiQmF0dGxlc2hpcFwiIH0sXG4gICAgeyBjb2w6IFwiZFwiLCByb3c6IDkgfSxcbiAgICB7IGNvbDogXCJlXCIsIHJvdzogOSB9LFxuICAgIHsgY29sOiBcImZcIiwgcm93OiA5IH0sXG4gICAgeyBjb2w6IFwiZ1wiLCByb3c6IDkgfSxcbiAgXSxcbiAgW1xuICAgIHsgbmFtZTogXCJEZXN0cm95ZXJcIiB9LFxuICAgIHsgY29sOiBcImpcIiwgcm93OiA2IH0sXG4gICAgeyBjb2w6IFwialwiLCByb3c6IDcgfSxcbiAgICB7IGNvbDogXCJqXCIsIHJvdzogOCB9LFxuICBdLFxuICBbXG4gICAgeyBuYW1lOiBcIkFpcmNyYWZ0IENhcnJpZXJcIiB9LFxuICAgIHsgY29sOiBcImNcIiwgcm93OiAzIH0sXG4gICAgeyBjb2w6IFwiY1wiLCByb3c6IDQgfSxcbiAgICB7IGNvbDogXCJjXCIsIHJvdzogNSB9LFxuICAgIHsgY29sOiBcImNcIiwgcm93OiA2IH0sXG4gICAgeyBjb2w6IFwiY1wiLCByb3c6IDcgfSxcbiAgXSxcbiAgW1xuICAgIHsgbmFtZTogXCJTdWJtYXJpbmVcIiB9LFxuICAgIHsgY29sOiBcImVcIiwgcm93OiA3IH0sXG4gICAgeyBjb2w6IFwiZlwiLCByb3c6IDcgfSxcbiAgICB7IGNvbDogXCJnXCIsIHJvdzogNyB9LFxuICBdLFxuXTtcbmRpc3BsYXlHYW1lKCk7XG5nYW1lSW5pdC5pbml0KHNoaXBzQXJyYXkpO1xuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVTcXVhcmVDbGljaztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOlsiZ2V0UG9zc2libGVTcXVhcmVzIiwiYm9hcmQiLCJwb3NzaWJsZVNxdWFyZXMiLCJpIiwiaiIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImNoYXJDb2RlQXQiLCJpc1JlcGVhdGVkQXR0YWNrIiwicHVzaCIsInJvdyIsImNvbCIsImNob29zZVNxdWFyZSIsInNxdWFyZXMiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJsZW5ndGgiLCJoYW5kbGVTcXVhcmVDbGljayIsImNvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInVwZGF0ZUJvYXJkRGlzcGxheSIsImF0dGFja0hpdCIsImNvbmNhdCIsImNsYXNzTGlzdCIsImFkZCIsImNyZWF0ZUJvYXJkIiwiY3JlYXRlRWxlbWVudCIsIl9sb29wIiwiX2xvb3AyIiwic3F1YXJlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhcmVudEVsZW1lbnQiLCJjb250YWlucyIsImFwcGVuZENoaWxkIiwicmVzZXQiLCJ0ZXh0Q29udGVudCIsImNyZWF0ZUhlYWRlciIsImhlYWRlciIsImNyZWF0ZUZvb3RlciIsImZvb3RlciIsImNyZWF0ZVRpdGxlIiwidGV4dCIsInRpdGxlIiwiZGlzcGxheUdhbWUiLCJzZWN0aW9uIiwiY29tcHV0ZXJUaXRsZSIsInBsYXllclRpdGxlIiwiY29tcHV0ZXJCb2FyZCIsInBsYXllckJvYXJkIiwiZGlzcGxheVNldHVwIiwic2hpcCIsImxlbiIsImhpdHMiLCJoaXQiLCJpc1N1bmsiLCJjb2x1bW4iLCJPYmplY3QiLCJhc3NpZ24iLCJwb3NpdGlvbiIsImhhc1NoaXAiLCJnYW1lQm9hcmQiLCJmaW5kU3F1YXJlIiwiZmlsdGVyIiwib2JqIiwiY2hlY2tQb3NpdGlvbiIsInJlc3VsdCIsInNoaXBzIiwicGxhY2VTaGlwIiwic3RhcnRDb2wiLCJlbmRDb2wiLCJzdGFydFJvdyIsImVuZFJvdyIsIm5hbWUiLCJvY2N1cGllZFNxdWFyZXMiLCJjdXJyZW50Q29sIiwiYXR0YWNrcyIsInRyYWNrQXR0YWNrIiwic2Fua1NoaXAiLCJhbGxTaGlwc1N1bmsiLCJzaGlwc1N1bmsiLCJmb3JFYWNoIiwiYXR0YWNrIiwicmVwZWF0IiwicmVjZWl2ZUF0dGFjayIsInVuZGVmaW5lZCIsImF0dGFja2VkU2hpcCIsIml0ZW0iLCJjb21wdXRlciIsImdhbWVJbml0IiwiaW5pdCIsInBsYXllclNoaXBzIiwiY29tcHV0ZXJTaGlwcyIsImZpcnN0IiwibGFzdCIsImVsZW1lbnQiLCJhZHZhbmNlR2FtZSIsIm1hcmtTcXVhcmUiLCJib2FyZFR5cGUiLCJjb25zb2xlIiwibG9nIiwiY29tcHV0ZXJDaG9pY2UiLCJzaGlwc0FycmF5Il0sInNvdXJjZVJvb3QiOiIifQ==
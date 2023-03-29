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
/* harmony export */   "getPossibleChoices": () => (/* binding */ getPossibleChoices),
/* harmony export */   "randomShipArray": () => (/* binding */ randomShipArray)
/* harmony export */ });
function getPossibleChoices(board) {
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
  var squares = getPossibleChoices(board);
  return squares[Math.floor(Math.random() * squares.length)];
}
function randomShipArray() {
  var shipLengths = [2, 3, 3, 4, 5];
  var shipNames = ["Patrol Boat", "Submarine", "Destroyer", "BattleShip", "Aircraft Carrier"];
  var ships = [];
  var _loop = function _loop() {
    var validPlacement = true;
    var direction = Math.random() < 0.5 ? "rowSpan" : "colSpan";
    var startRow = Math.ceil(Math.random() * 10);
    var startCol = String.fromCharCode(96 + Math.ceil(Math.random() * 10));
    var currentShip = [{
      name: shipNames[shipNames.length - 1]
    }];
    var currentCol = startCol;
    var currentRow = startRow;
    for (var i = 0; i < shipLengths[shipLengths.length - 1]; i++) {
      // Out of Bounds
      if (currentRow === 11) {
        validPlacement = false;
        break;
      }
      if (currentCol === "k") {
        validPlacement = false;
        break;
      }

      // Overlap
      ships.forEach(function (ship) {
        for (var j = 1; j < ship.length; j++) {
          if (currentCol === ship[j].col && currentRow === ship[j].row) {
            validPlacement = false;
            break;
          }
        }
      });
      if (!validPlacement) break;
      currentShip.push({
        col: currentCol,
        row: currentRow
      });
      // Increment
      if (direction === "rowSpan") currentRow += 1;else currentCol = String.fromCharCode(currentCol.charCodeAt(0) + 1);
    }
    if (validPlacement) {
      ships.push(currentShip);
      shipLengths.pop();
      shipNames.pop();
    }
  };
  while (shipLengths.length > 0) {
    _loop();
  }
  return ships;
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



var playerBoard = (0,_game__WEBPACK_IMPORTED_MODULE_1__.gameBoard)();
var computerBoard = (0,_game__WEBPACK_IMPORTED_MODULE_1__.gameBoard)();
function createBoardFromArray(ships, board, boardType) {
  ships.forEach(function (ship) {
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
      if (boardType === "player") {
        var element = document.querySelector(".player-board").querySelector(".".concat(square.col).concat(square.row));
        element.classList.add("ship");
      }
    });
    board.placeShip(first.col, last.col, first.row, last.row, name);
  });
}
function init(playerShips, computerShips) {
  createBoardFromArray((0,_computer__WEBPACK_IMPORTED_MODULE_2__.randomShipArray)(), playerBoard, "player");
  createBoardFromArray((0,_computer__WEBPACK_IMPORTED_MODULE_2__.randomShipArray)(), computerBoard, "computer");
}
function markSquare(board, col, row, boardType) {
  board.receiveAttack(col, row);
  if (board.attacks[board.attacks.length - 1].attackHit) {
    document.querySelector(".".concat(boardType, "-board")).querySelector(".".concat(col).concat(row)).classList.add("hit");
  } else {
    document.querySelector(".".concat(boardType, "-board")).querySelector(".".concat(col).concat(row)).classList.add("missed");
  }
}
function handleSquareClick(col, row) {
  if (computerBoard.isRepeatedAttack(col, row)) return;
  markSquare(computerBoard, col, row, "computer");
  if (computerBoard.allShipsSunk()) return;
  var computerChoice = (0,_computer__WEBPACK_IMPORTED_MODULE_2__.chooseSquare)(playerBoard);
  markSquare(playerBoard, computerChoice.col, computerChoice.row, "player");
}
(0,_display__WEBPACK_IMPORTED_MODULE_0__.displayGame)();
init();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXB1dGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGdldFBvc3NpYmxlQ2hvaWNlcyhib2FyZCkge1xuICBjb25zdCBwb3NzaWJsZVNxdWFyZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMTsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IFwiYVwiOyBqICE9PSBcImtcIjsgaiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoai5jaGFyQ29kZUF0KDApICsgMSkpIHtcbiAgICAgIGlmICghYm9hcmQuaXNSZXBlYXRlZEF0dGFjayhqLCBpKSlcbiAgICAgICAgcG9zc2libGVTcXVhcmVzLnB1c2goeyByb3c6IGksIGNvbDogaiB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHBvc3NpYmxlU3F1YXJlcztcbn1cblxuZnVuY3Rpb24gY2hvb3NlU3F1YXJlKGJvYXJkKSB7XG4gIGNvbnN0IHNxdWFyZXMgPSBnZXRQb3NzaWJsZUNob2ljZXMoYm9hcmQpO1xuICByZXR1cm4gc3F1YXJlc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzcXVhcmVzLmxlbmd0aCldO1xufVxuXG5mdW5jdGlvbiByYW5kb21TaGlwQXJyYXkoKSB7XG4gIGNvbnN0IHNoaXBMZW5ndGhzID0gWzIsIDMsIDMsIDQsIDVdO1xuICBjb25zdCBzaGlwTmFtZXMgPSBbXG4gICAgXCJQYXRyb2wgQm9hdFwiLFxuICAgIFwiU3VibWFyaW5lXCIsXG4gICAgXCJEZXN0cm95ZXJcIixcbiAgICBcIkJhdHRsZVNoaXBcIixcbiAgICBcIkFpcmNyYWZ0IENhcnJpZXJcIixcbiAgXTtcbiAgY29uc3Qgc2hpcHMgPSBbXTtcbiAgd2hpbGUgKHNoaXBMZW5ndGhzLmxlbmd0aCA+IDApIHtcbiAgICBsZXQgdmFsaWRQbGFjZW1lbnQgPSB0cnVlO1xuICAgIGNvbnN0IGRpcmVjdGlvbiA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyBcInJvd1NwYW5cIiA6IFwiY29sU3BhblwiO1xuXG4gICAgY29uc3Qgc3RhcnRSb3cgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBjb25zdCBzdGFydENvbCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoOTYgKyBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDEwKSk7XG5cbiAgICBjb25zdCBjdXJyZW50U2hpcCA9IFt7IG5hbWU6IHNoaXBOYW1lc1tzaGlwTmFtZXMubGVuZ3RoIC0gMV0gfV07XG5cbiAgICBsZXQgY3VycmVudENvbCA9IHN0YXJ0Q29sO1xuICAgIGxldCBjdXJyZW50Um93ID0gc3RhcnRSb3c7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGhzW3NoaXBMZW5ndGhzLmxlbmd0aCAtIDFdOyBpKyspIHtcbiAgICAgIC8vIE91dCBvZiBCb3VuZHNcbiAgICAgIGlmIChjdXJyZW50Um93ID09PSAxMSkge1xuICAgICAgICB2YWxpZFBsYWNlbWVudCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50Q29sID09PSBcImtcIikge1xuICAgICAgICB2YWxpZFBsYWNlbWVudCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgLy8gT3ZlcmxhcFxuICAgICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IHNoaXAubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBpZiAoY3VycmVudENvbCA9PT0gc2hpcFtqXS5jb2wgJiYgY3VycmVudFJvdyA9PT0gc2hpcFtqXS5yb3cpIHtcbiAgICAgICAgICAgIHZhbGlkUGxhY2VtZW50ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXZhbGlkUGxhY2VtZW50KSBicmVhaztcbiAgICAgIGN1cnJlbnRTaGlwLnB1c2goeyBjb2w6IGN1cnJlbnRDb2wsIHJvdzogY3VycmVudFJvdyB9KTtcbiAgICAgIC8vIEluY3JlbWVudFxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJyb3dTcGFuXCIpIGN1cnJlbnRSb3cgKz0gMTtcbiAgICAgIGVsc2UgY3VycmVudENvbCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY3VycmVudENvbC5jaGFyQ29kZUF0KDApICsgMSk7XG4gICAgfVxuXG4gICAgaWYgKHZhbGlkUGxhY2VtZW50KSB7XG4gICAgICBzaGlwcy5wdXNoKGN1cnJlbnRTaGlwKTtcbiAgICAgIHNoaXBMZW5ndGhzLnBvcCgpO1xuICAgICAgc2hpcE5hbWVzLnBvcCgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc2hpcHM7XG59XG5cbmV4cG9ydCB7IGNob29zZVNxdWFyZSwgZ2V0UG9zc2libGVDaG9pY2VzLCByYW5kb21TaGlwQXJyYXkgfTtcbiIsImltcG9ydCBoYW5kbGVTcXVhcmVDbGljayBmcm9tIFwiLi9pbmRleFwiO1xuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWNvbnRhaW5lcl1cIik7XG5cbmZ1bmN0aW9uIHVwZGF0ZUJvYXJkRGlzcGxheShib2FyZCwgYXR0YWNrSGl0LCBjb2wsIHJvdykge1xuICBpZiAoYXR0YWNrSGl0KSB7XG4gICAgYm9hcmQucXVlcnlTZWxlY3RvcihgLiR7cm93fSR7Y29sfWApLmNsYXNzTGlzdC5hZGQoXCJtaXNzZWRcIik7XG4gIH0gZWxzZSB7XG4gICAgYm9hcmQucXVlcnlTZWxlY3RvcihgLiR7cm93fSR7Y29sfWApLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlQm9hcmQoKSB7XG4gIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMTsgaSArPSAxKSB7XG4gICAgZm9yIChsZXQgaiA9IFwiYVwiOyBqICE9PSBcImtcIjsgaiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoai5jaGFyQ29kZUF0KDApICsgMSkpIHtcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInNxdWFyZVwiKTtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGAke2p9JHtpfWApO1xuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmIChzcXVhcmUucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXItYm9hcmRcIikpIHJldHVybjtcbiAgICAgICAgaGFuZGxlU3F1YXJlQ2xpY2soaiwgaSk7XG4gICAgICB9KTtcbiAgICAgIGJvYXJkLmNsYXNzTGlzdC5hZGQoXCJib2FyZFwiKTtcbiAgICAgIGJvYXJkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBib2FyZDtcbn1cblxuZnVuY3Rpb24gcmVzZXQoKSB7XG4gIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUhlYWRlcigpIHtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgaGVhZGVyLnRleHRDb250ZW50ID0gXCJCYXR0bGVzaGlwXCI7XG4gIHJldHVybiBoZWFkZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvb3RlcigpIHtcbiAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgZm9vdGVyLnRleHRDb250ZW50ID0gXCJNYWRlIGJ5IFdpbGwgTW9yZXR6XCI7XG4gIHJldHVybiBmb290ZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRpdGxlKHRleHQpIHtcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB0aXRsZS5jbGFzc0xpc3QuYWRkKFwidGl0bGVcIik7XG4gIHRpdGxlLnRleHRDb250ZW50ID0gdGV4dDtcbiAgcmV0dXJuIHRpdGxlO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5R2FtZSgpIHtcbiAgcmVzZXQoKTtcblxuICBjb25zdCBoZWFkZXIgPSBjcmVhdGVIZWFkZXIoKTtcbiAgY29uc3QgZm9vdGVyID0gY3JlYXRlRm9vdGVyKCk7XG4gIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgY29uc3QgY29tcHV0ZXJUaXRsZSA9IGNyZWF0ZVRpdGxlKFwiQ29tcHV0ZXIncyBCb2FyZFwiKTtcbiAgY29uc3QgcGxheWVyVGl0bGUgPSBjcmVhdGVUaXRsZShcIllvdXIgQm9hcmRcIik7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICBjb21wdXRlckJvYXJkLmNsYXNzTGlzdC5hZGQoXCJjb21wdXRlci1ib2FyZFwiKTtcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICBwbGF5ZXJCb2FyZC5jbGFzc0xpc3QuYWRkKFwicGxheWVyLWJvYXJkXCIpO1xuXG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoY29tcHV0ZXJUaXRsZSk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoY29tcHV0ZXJCb2FyZCwgbnVsbCk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQocGxheWVyVGl0bGUpO1xuICBzZWN0aW9uLmFwcGVuZENoaWxkKHBsYXllckJvYXJkKTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNlY3Rpb24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVNldHVwKCkge1xuICBjb25zdCBoZWFkZXIgPSBjcmVhdGVIZWFkZXIoKTtcbiAgY29uc3QgZm9vdGVyID0gY3JlYXRlRm9vdGVyKCk7XG4gIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgY29uc3QgdGl0bGUgPSBjcmVhdGVUaXRsZShcIlBsYWNlIFlvdXIgU2hpcHMhXCIpO1xuICBjb25zdCBib2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG5cbiAgc2VjdGlvbi5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoYm9hcmQpO1xuXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VjdGlvbik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb290ZXIpO1xufVxuXG5leHBvcnQgeyBkaXNwbGF5R2FtZSwgZGlzcGxheVNldHVwLCB1cGRhdGVCb2FyZERpc3BsYXkgfTtcbiIsImNvbnN0IHNoaXAgPSAobGVuKSA9PiAoe1xuICBsZW5ndGg6IGxlbixcbiAgaGl0czogMCxcbiAgaGl0KCkge1xuICAgIHRoaXMuaGl0cyArPSAxO1xuICB9LFxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbn0pO1xuXG5mdW5jdGlvbiBjcmVhdGVCb2FyZCgpIHtcbiAgY29uc3QgYm9hcmQgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMTsgaSsrKSB7XG4gICAgY29uc3QgY29sdW1uID0ge307XG4gICAgT2JqZWN0LmFzc2lnbihjb2x1bW4sIHtcbiAgICAgIGNvbHVtbjogaSxcbiAgICAgIHJvdzogW1xuICAgICAgICB7IHBvc2l0aW9uOiBgYSR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgYiR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgYyR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgZCR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgZSR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgZiR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgZyR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgaCR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgaSR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgaiR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgXSxcbiAgICB9KTtcbiAgICBib2FyZC5wdXNoKGNvbHVtbik7XG4gIH1cbiAgcmV0dXJuIGJvYXJkO1xufVxuXG5jb25zdCBnYW1lQm9hcmQgPSAoKSA9PiAoe1xuICBib2FyZDogY3JlYXRlQm9hcmQoKSxcbiAgZmluZFNxdWFyZShjb2wsIHJvdykge1xuICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuYm9hcmRbcm93IC0gMV0ucm93LmZpbHRlcigob2JqKSA9PiB7XG4gICAgICByZXR1cm4gb2JqLnBvc2l0aW9uID09PSBgJHtjb2x9JHtyb3d9YDtcbiAgICB9KTtcbiAgICByZXR1cm4gc3F1YXJlO1xuICB9LFxuICBjaGVja1Bvc2l0aW9uKGNvbCwgcm93KSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgY29uc3Qgc3F1YXJlID0gdGhpcy5maW5kU3F1YXJlKGNvbCwgcm93KTtcbiAgICBjb25zdCBwb3NpdGlvbiA9IHNxdWFyZVswXS5wb3NpdGlvbjtcbiAgICBjb25zdCBoYXNTaGlwID0gc3F1YXJlWzBdLmhhc1NoaXA7XG4gICAgT2JqZWN0LmFzc2lnbihyZXN1bHQsIHsgcG9zaXRpb24sIGhhc1NoaXAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcbiAgc2hpcHM6IFtdLFxuICBwbGFjZVNoaXAoc3RhcnRDb2wsIGVuZENvbCwgc3RhcnRSb3csIGVuZFJvdywgbmFtZSkge1xuICAgIGxldCBsZW5ndGggPSAwO1xuICAgIGxldCBvY2N1cGllZFNxdWFyZXMgPSBbXTtcbiAgICBpZiAoc3RhcnRSb3cgIT09IGVuZFJvdykge1xuICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0Um93OyBpIDwgZW5kUm93ICsgMTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuZmluZFNxdWFyZShzdGFydENvbCwgaSk7XG4gICAgICAgIHNxdWFyZVswXS5oYXNTaGlwID0gdHJ1ZTtcbiAgICAgICAgbGVuZ3RoICs9IDE7XG4gICAgICAgIG9jY3VwaWVkU3F1YXJlcy5wdXNoKGAke3N0YXJ0Q29sfSR7aX1gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGN1cnJlbnRDb2wgPSBzdGFydENvbDtcbiAgICAgIHdoaWxlIChjdXJyZW50Q29sICE9PSBTdHJpbmcuZnJvbUNoYXJDb2RlKGVuZENvbC5jaGFyQ29kZUF0KDApICsgMSkpIHtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gdGhpcy5maW5kU3F1YXJlKGN1cnJlbnRDb2wsIHN0YXJ0Um93KTtcbiAgICAgICAgc3F1YXJlWzBdLmhhc1NoaXAgPSB0cnVlO1xuICAgICAgICBvY2N1cGllZFNxdWFyZXMucHVzaChgJHtjdXJyZW50Q29sfSR7c3RhcnRSb3d9YCk7XG4gICAgICAgIGN1cnJlbnRDb2wgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGN1cnJlbnRDb2wuY2hhckNvZGVBdCgwKSArIDEpO1xuICAgICAgICBsZW5ndGggKz0gMTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zaGlwcy5wdXNoKHtcbiAgICAgIHNxdWFyZXM6IG9jY3VwaWVkU3F1YXJlcyxcbiAgICAgIG5hbWUsXG4gICAgICBvYmo6IHNoaXAobGVuZ3RoKSxcbiAgICB9KTtcbiAgfSxcbiAgYXR0YWNrczogW10sXG4gIHRyYWNrQXR0YWNrKHBvc2l0aW9uLCBhdHRhY2tIaXQsIHNhbmtTaGlwKSB7XG4gICAgdGhpcy5hdHRhY2tzLnB1c2goeyBwb3NpdGlvbiwgYXR0YWNrSGl0LCBzYW5rU2hpcCB9KTtcbiAgfSxcbiAgYWxsU2hpcHNTdW5rKCkge1xuICAgIGlmICh0aGlzLnNoaXBzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuICAgIGxldCBzaGlwc1N1bmsgPSAwO1xuICAgIHRoaXMuYXR0YWNrcy5mb3JFYWNoKChhdHRhY2spID0+IHtcbiAgICAgIGlmIChhdHRhY2suc2Fua1NoaXApIHNoaXBzU3VuayArPSAxO1xuICAgIH0pO1xuICAgIGlmIChzaGlwc1N1bmsgPj0gdGhpcy5zaGlwcy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbiAgaXNSZXBlYXRlZEF0dGFjayhjb2wsIHJvdykge1xuICAgIGxldCByZXBlYXQgPSBmYWxzZTtcbiAgICB0aGlzLmF0dGFja3MuZm9yRWFjaCgoYXR0YWNrKSA9PiB7XG4gICAgICBpZiAoYXR0YWNrLnBvc2l0aW9uID09PSBgJHtjb2x9JHtyb3d9YCkge1xuICAgICAgICByZXBlYXQgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcGVhdDtcbiAgfSxcbiAgcmVjZWl2ZUF0dGFjayhjb2wsIHJvdykge1xuICAgIGlmICh0aGlzLmlzUmVwZWF0ZWRBdHRhY2soY29sLCByb3cpKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGxldCBhdHRhY2tlZFNoaXAgPSBmYWxzZTtcbiAgICB0aGlzLnNoaXBzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0uc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICAgICAgaWYgKHNxdWFyZSA9PT0gYCR7Y29sfSR7cm93fWApIGF0dGFja2VkU2hpcCA9IGl0ZW07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZiAoYXR0YWNrZWRTaGlwKSB7XG4gICAgICBhdHRhY2tlZFNoaXAub2JqLmhpdCgpO1xuICAgICAgdGhpcy50cmFja0F0dGFjayhgJHtjb2x9JHtyb3d9YCwgdHJ1ZSwgYXR0YWNrZWRTaGlwLm9iai5pc1N1bmsoKSk7XG4gICAgICByZXR1cm4gYXR0YWNrZWRTaGlwLm5hbWU7XG4gICAgfVxuICAgIHRoaXMudHJhY2tBdHRhY2soYCR7Y29sfSR7cm93fWAsIGZhbHNlLCBmYWxzZSk7XG4gICAgcmV0dXJuIGAke2NvbH0ke3Jvd31gO1xuICB9LFxufSk7XG5cbmV4cG9ydCB7IHNoaXAsIGdhbWVCb2FyZCB9O1xuIiwiaW1wb3J0IHsgZGlzcGxheUdhbWUsIGRpc3BsYXlTZXR1cCB9IGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCB7IGdhbWVCb2FyZCB9IGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCB7IGNob29zZVNxdWFyZSwgcmFuZG9tU2hpcEFycmF5IH0gZnJvbSBcIi4vY29tcHV0ZXJcIjtcblxuY29uc3QgcGxheWVyQm9hcmQgPSBnYW1lQm9hcmQoKTtcbmNvbnN0IGNvbXB1dGVyQm9hcmQgPSBnYW1lQm9hcmQoKTtcblxuZnVuY3Rpb24gY3JlYXRlQm9hcmRGcm9tQXJyYXkoc2hpcHMsIGJvYXJkLCBib2FyZFR5cGUpIHtcbiAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIGxldCBmaXJzdCA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbmFtZSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbGFzdCA9IHVuZGVmaW5lZDtcbiAgICBzaGlwLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBuYW1lID0gc3F1YXJlLm5hbWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkKSBmaXJzdCA9IHsgY29sOiBzcXVhcmUuY29sLCByb3c6IHNxdWFyZS5yb3cgfTtcbiAgICAgIGxhc3QgPSB7IGNvbDogc3F1YXJlLmNvbCwgcm93OiBzcXVhcmUucm93IH07XG4gICAgICBpZiAoYm9hcmRUeXBlID09PSBcInBsYXllclwiKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudFxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1ib2FyZFwiKVxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHtzcXVhcmUuY29sfSR7c3F1YXJlLnJvd31gKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBib2FyZC5wbGFjZVNoaXAoZmlyc3QuY29sLCBsYXN0LmNvbCwgZmlyc3Qucm93LCBsYXN0LnJvdywgbmFtZSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpbml0KHBsYXllclNoaXBzLCBjb21wdXRlclNoaXBzKSB7XG4gIGNyZWF0ZUJvYXJkRnJvbUFycmF5KHJhbmRvbVNoaXBBcnJheSgpLCBwbGF5ZXJCb2FyZCwgXCJwbGF5ZXJcIik7XG4gIGNyZWF0ZUJvYXJkRnJvbUFycmF5KHJhbmRvbVNoaXBBcnJheSgpLCBjb21wdXRlckJvYXJkLCBcImNvbXB1dGVyXCIpO1xufVxuXG5mdW5jdGlvbiBtYXJrU3F1YXJlKGJvYXJkLCBjb2wsIHJvdywgYm9hcmRUeXBlKSB7XG4gIGJvYXJkLnJlY2VpdmVBdHRhY2soY29sLCByb3cpO1xuICBpZiAoYm9hcmQuYXR0YWNrc1tib2FyZC5hdHRhY2tzLmxlbmd0aCAtIDFdLmF0dGFja0hpdCkge1xuICAgIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihgLiR7Ym9hcmRUeXBlfS1ib2FyZGApXG4gICAgICAucXVlcnlTZWxlY3RvcihgLiR7Y29sfSR7cm93fWApXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC4ke2JvYXJkVHlwZX0tYm9hcmRgKVxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC4ke2NvbH0ke3Jvd31gKVxuICAgICAgLmNsYXNzTGlzdC5hZGQoXCJtaXNzZWRcIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlU3F1YXJlQ2xpY2soY29sLCByb3cpIHtcbiAgaWYgKGNvbXB1dGVyQm9hcmQuaXNSZXBlYXRlZEF0dGFjayhjb2wsIHJvdykpIHJldHVybjtcbiAgbWFya1NxdWFyZShjb21wdXRlckJvYXJkLCBjb2wsIHJvdywgXCJjb21wdXRlclwiKTtcblxuICBpZiAoY29tcHV0ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkgcmV0dXJuO1xuICBjb25zdCBjb21wdXRlckNob2ljZSA9IGNob29zZVNxdWFyZShwbGF5ZXJCb2FyZCk7XG4gIG1hcmtTcXVhcmUocGxheWVyQm9hcmQsIGNvbXB1dGVyQ2hvaWNlLmNvbCwgY29tcHV0ZXJDaG9pY2Uucm93LCBcInBsYXllclwiKTtcbn1cblxuZGlzcGxheUdhbWUoKTtcbmluaXQoKTtcblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlU3F1YXJlQ2xpY2s7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbImdldFBvc3NpYmxlQ2hvaWNlcyIsImJvYXJkIiwicG9zc2libGVTcXVhcmVzIiwiaSIsImoiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJjaGFyQ29kZUF0IiwiaXNSZXBlYXRlZEF0dGFjayIsInB1c2giLCJyb3ciLCJjb2wiLCJjaG9vc2VTcXVhcmUiLCJzcXVhcmVzIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibGVuZ3RoIiwicmFuZG9tU2hpcEFycmF5Iiwic2hpcExlbmd0aHMiLCJzaGlwTmFtZXMiLCJzaGlwcyIsIl9sb29wIiwidmFsaWRQbGFjZW1lbnQiLCJkaXJlY3Rpb24iLCJzdGFydFJvdyIsImNlaWwiLCJzdGFydENvbCIsImN1cnJlbnRTaGlwIiwibmFtZSIsImN1cnJlbnRDb2wiLCJjdXJyZW50Um93IiwiZm9yRWFjaCIsInNoaXAiLCJwb3AiLCJoYW5kbGVTcXVhcmVDbGljayIsImNvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInVwZGF0ZUJvYXJkRGlzcGxheSIsImF0dGFja0hpdCIsImNvbmNhdCIsImNsYXNzTGlzdCIsImFkZCIsImNyZWF0ZUJvYXJkIiwiY3JlYXRlRWxlbWVudCIsIl9sb29wMiIsInNxdWFyZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXJlbnRFbGVtZW50IiwiY29udGFpbnMiLCJhcHBlbmRDaGlsZCIsInJlc2V0IiwidGV4dENvbnRlbnQiLCJjcmVhdGVIZWFkZXIiLCJoZWFkZXIiLCJjcmVhdGVGb290ZXIiLCJmb290ZXIiLCJjcmVhdGVUaXRsZSIsInRleHQiLCJ0aXRsZSIsImRpc3BsYXlHYW1lIiwic2VjdGlvbiIsImNvbXB1dGVyVGl0bGUiLCJwbGF5ZXJUaXRsZSIsImNvbXB1dGVyQm9hcmQiLCJwbGF5ZXJCb2FyZCIsImRpc3BsYXlTZXR1cCIsImxlbiIsImhpdHMiLCJoaXQiLCJpc1N1bmsiLCJjb2x1bW4iLCJPYmplY3QiLCJhc3NpZ24iLCJwb3NpdGlvbiIsImhhc1NoaXAiLCJnYW1lQm9hcmQiLCJmaW5kU3F1YXJlIiwiZmlsdGVyIiwib2JqIiwiY2hlY2tQb3NpdGlvbiIsInJlc3VsdCIsInBsYWNlU2hpcCIsImVuZENvbCIsImVuZFJvdyIsIm9jY3VwaWVkU3F1YXJlcyIsImF0dGFja3MiLCJ0cmFja0F0dGFjayIsInNhbmtTaGlwIiwiYWxsU2hpcHNTdW5rIiwic2hpcHNTdW5rIiwiYXR0YWNrIiwicmVwZWF0IiwicmVjZWl2ZUF0dGFjayIsInVuZGVmaW5lZCIsImF0dGFja2VkU2hpcCIsIml0ZW0iLCJjcmVhdGVCb2FyZEZyb21BcnJheSIsImJvYXJkVHlwZSIsImZpcnN0IiwibGFzdCIsImVsZW1lbnQiLCJpbml0IiwicGxheWVyU2hpcHMiLCJjb21wdXRlclNoaXBzIiwibWFya1NxdWFyZSIsImNvbXB1dGVyQ2hvaWNlIl0sInNvdXJjZVJvb3QiOiIifQ==
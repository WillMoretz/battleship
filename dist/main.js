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
/* harmony export */   "displayGameOver": () => (/* binding */ displayGameOver),
/* harmony export */   "displaySetup": () => (/* binding */ displaySetup)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/index.js");

var container = document.querySelector("[data-container]");
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
function displayGameOver(text) {
  var popUp = document.createElement("div");
  popUp.classList.add("pop-up");
  var gameOverText = document.createElement("div");
  gameOverText.classList.add("game-over-text");
  gameOverText.textContent = text;
  var replayButton = document.createElement("button");
  replayButton.textContent = "Replay";
  replayButton.classList.add("replay-button");
  popUp.appendChild(gameOverText);
  popUp.appendChild(replayButton);
  container.appendChild(popUp);
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
var gameActive = true;
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
function endGame(text) {
  gameActive = false;
  (0,_display__WEBPACK_IMPORTED_MODULE_0__.displayGameOver)(text);
}
function handleSquareClick(col, row) {
  if (!gameActive || computerBoard.isRepeatedAttack(col, row)) return;
  markSquare(computerBoard, col, row, "computer");
  if (computerBoard.allShipsSunk()) {
    endGame("You Win!");
    return;
  }
  var computerChoice = (0,_computer__WEBPACK_IMPORTED_MODULE_2__.chooseSquare)(playerBoard);
  markSquare(playerBoard, computerChoice.col, computerChoice.row, "player");
  if (playerBoard.allShipsSunk()) {
    endGame("The Computer Won");
    return;
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSXFELGFBQWEsQ0FBQzhCLFlBQVksRUFBRSxFQUFFO0lBQ2hDa0IsT0FBTyxDQUFDLFVBQVUsQ0FBQztJQUNuQjtFQUNGO0VBQ0EsSUFBTUMsY0FBYyxHQUFHcEcsdURBQVksQ0FBQ29ELFdBQVcsQ0FBQztFQUNoRDhDLFVBQVUsQ0FBQzlDLFdBQVcsRUFBRWdELGNBQWMsQ0FBQ3JHLEdBQUcsRUFBRXFHLGNBQWMsQ0FBQ3RHLEdBQUcsRUFBRSxRQUFRLENBQUM7RUFDekUsSUFBSXNELFdBQVcsQ0FBQzZCLFlBQVksRUFBRSxFQUFFO0lBQzlCa0IsT0FBTyxDQUFDLGtCQUFrQixDQUFDO0lBQzNCO0VBQ0Y7QUFDRjtBQUVBcEQscURBQVcsRUFBRTtBQUNiZ0QsSUFBSSxFQUFFO0FBRU4saUVBQWV4RSxpQkFBaUI7Ozs7OztVQzNFaEM7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXB1dGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGdldFBvc3NpYmxlQ2hvaWNlcyhib2FyZCkge1xuICBjb25zdCBwb3NzaWJsZVNxdWFyZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMTsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IFwiYVwiOyBqICE9PSBcImtcIjsgaiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoai5jaGFyQ29kZUF0KDApICsgMSkpIHtcbiAgICAgIGlmICghYm9hcmQuaXNSZXBlYXRlZEF0dGFjayhqLCBpKSlcbiAgICAgICAgcG9zc2libGVTcXVhcmVzLnB1c2goeyByb3c6IGksIGNvbDogaiB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHBvc3NpYmxlU3F1YXJlcztcbn1cblxuZnVuY3Rpb24gY2hvb3NlU3F1YXJlKGJvYXJkKSB7XG4gIGNvbnN0IHNxdWFyZXMgPSBnZXRQb3NzaWJsZUNob2ljZXMoYm9hcmQpO1xuICByZXR1cm4gc3F1YXJlc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzcXVhcmVzLmxlbmd0aCldO1xufVxuXG5mdW5jdGlvbiByYW5kb21TaGlwQXJyYXkoKSB7XG4gIGNvbnN0IHNoaXBMZW5ndGhzID0gWzIsIDMsIDMsIDQsIDVdO1xuICBjb25zdCBzaGlwTmFtZXMgPSBbXG4gICAgXCJQYXRyb2wgQm9hdFwiLFxuICAgIFwiU3VibWFyaW5lXCIsXG4gICAgXCJEZXN0cm95ZXJcIixcbiAgICBcIkJhdHRsZVNoaXBcIixcbiAgICBcIkFpcmNyYWZ0IENhcnJpZXJcIixcbiAgXTtcbiAgY29uc3Qgc2hpcHMgPSBbXTtcbiAgd2hpbGUgKHNoaXBMZW5ndGhzLmxlbmd0aCA+IDApIHtcbiAgICBsZXQgdmFsaWRQbGFjZW1lbnQgPSB0cnVlO1xuICAgIGNvbnN0IGRpcmVjdGlvbiA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyBcInJvd1NwYW5cIiA6IFwiY29sU3BhblwiO1xuXG4gICAgY29uc3Qgc3RhcnRSb3cgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBjb25zdCBzdGFydENvbCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoOTYgKyBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDEwKSk7XG5cbiAgICBjb25zdCBjdXJyZW50U2hpcCA9IFt7IG5hbWU6IHNoaXBOYW1lc1tzaGlwTmFtZXMubGVuZ3RoIC0gMV0gfV07XG5cbiAgICBsZXQgY3VycmVudENvbCA9IHN0YXJ0Q29sO1xuICAgIGxldCBjdXJyZW50Um93ID0gc3RhcnRSb3c7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGhzW3NoaXBMZW5ndGhzLmxlbmd0aCAtIDFdOyBpKyspIHtcbiAgICAgIC8vIE91dCBvZiBCb3VuZHNcbiAgICAgIGlmIChjdXJyZW50Um93ID09PSAxMSkge1xuICAgICAgICB2YWxpZFBsYWNlbWVudCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50Q29sID09PSBcImtcIikge1xuICAgICAgICB2YWxpZFBsYWNlbWVudCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgLy8gT3ZlcmxhcFxuICAgICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IHNoaXAubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBpZiAoY3VycmVudENvbCA9PT0gc2hpcFtqXS5jb2wgJiYgY3VycmVudFJvdyA9PT0gc2hpcFtqXS5yb3cpIHtcbiAgICAgICAgICAgIHZhbGlkUGxhY2VtZW50ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXZhbGlkUGxhY2VtZW50KSBicmVhaztcbiAgICAgIGN1cnJlbnRTaGlwLnB1c2goeyBjb2w6IGN1cnJlbnRDb2wsIHJvdzogY3VycmVudFJvdyB9KTtcbiAgICAgIC8vIEluY3JlbWVudFxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJyb3dTcGFuXCIpIGN1cnJlbnRSb3cgKz0gMTtcbiAgICAgIGVsc2UgY3VycmVudENvbCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY3VycmVudENvbC5jaGFyQ29kZUF0KDApICsgMSk7XG4gICAgfVxuXG4gICAgaWYgKHZhbGlkUGxhY2VtZW50KSB7XG4gICAgICBzaGlwcy5wdXNoKGN1cnJlbnRTaGlwKTtcbiAgICAgIHNoaXBMZW5ndGhzLnBvcCgpO1xuICAgICAgc2hpcE5hbWVzLnBvcCgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc2hpcHM7XG59XG5cbmV4cG9ydCB7IGNob29zZVNxdWFyZSwgZ2V0UG9zc2libGVDaG9pY2VzLCByYW5kb21TaGlwQXJyYXkgfTtcbiIsImltcG9ydCBoYW5kbGVTcXVhcmVDbGljayBmcm9tIFwiLi9pbmRleFwiO1xuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWNvbnRhaW5lcl1cIik7XG5cbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkKCkge1xuICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgMTE7IGkgKz0gMSkge1xuICAgIGZvciAobGV0IGogPSBcImFcIjsgaiAhPT0gXCJrXCI7IGogPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGouY2hhckNvZGVBdCgwKSArIDEpKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmVcIik7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChgJHtqfSR7aX1gKTtcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoc3F1YXJlLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGxheWVyLWJvYXJkXCIpKSByZXR1cm47XG4gICAgICAgIGhhbmRsZVNxdWFyZUNsaWNrKGosIGkpO1xuICAgICAgfSk7XG4gICAgICBib2FyZC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIik7XG4gICAgICBib2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYm9hcmQ7XG59XG5cbmZ1bmN0aW9uIHJlc2V0KCkge1xuICBjb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVIZWFkZXIoKSB7XG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIik7XG4gIGhlYWRlci50ZXh0Q29udGVudCA9IFwiQmF0dGxlc2hpcFwiO1xuICByZXR1cm4gaGVhZGVyO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGb290ZXIoKSB7XG4gIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb290ZXJcIik7XG4gIGZvb3Rlci50ZXh0Q29udGVudCA9IFwiTWFkZSBieSBXaWxsIE1vcmV0elwiO1xuICByZXR1cm4gZm9vdGVyO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVUaXRsZSh0ZXh0KSB7XG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdGl0bGUuY2xhc3NMaXN0LmFkZChcInRpdGxlXCIpO1xuICB0aXRsZS50ZXh0Q29udGVudCA9IHRleHQ7XG4gIHJldHVybiB0aXRsZTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheUdhbWUoKSB7XG4gIHJlc2V0KCk7XG5cbiAgY29uc3QgaGVhZGVyID0gY3JlYXRlSGVhZGVyKCk7XG4gIGNvbnN0IGZvb3RlciA9IGNyZWF0ZUZvb3RlcigpO1xuICBjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gIGNvbnN0IGNvbXB1dGVyVGl0bGUgPSBjcmVhdGVUaXRsZShcIkNvbXB1dGVyJ3MgQm9hcmRcIik7XG4gIGNvbnN0IHBsYXllclRpdGxlID0gY3JlYXRlVGl0bGUoXCJZb3VyIEJvYXJkXCIpO1xuICBjb25zdCBjb21wdXRlckJvYXJkID0gY3JlYXRlQm9hcmQoKTtcbiAgY29tcHV0ZXJCb2FyZC5jbGFzc0xpc3QuYWRkKFwiY29tcHV0ZXItYm9hcmRcIik7XG4gIGNvbnN0IHBsYXllckJvYXJkID0gY3JlYXRlQm9hcmQoKTtcbiAgcGxheWVyQm9hcmQuY2xhc3NMaXN0LmFkZChcInBsYXllci1ib2FyZFwiKTtcblxuICBzZWN0aW9uLmFwcGVuZENoaWxkKGNvbXB1dGVyVGl0bGUpO1xuICBzZWN0aW9uLmFwcGVuZENoaWxkKGNvbXB1dGVyQm9hcmQsIG51bGwpO1xuICBzZWN0aW9uLmFwcGVuZENoaWxkKHBsYXllclRpdGxlKTtcbiAgc2VjdGlvbi5hcHBlbmRDaGlsZChwbGF5ZXJCb2FyZCk7XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWN0aW9uKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZvb3Rlcik7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlHYW1lT3Zlcih0ZXh0KSB7XG4gIGNvbnN0IHBvcFVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgcG9wVXAuY2xhc3NMaXN0LmFkZChcInBvcC11cFwiKTtcblxuICBjb25zdCBnYW1lT3ZlclRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBnYW1lT3ZlclRleHQuY2xhc3NMaXN0LmFkZChcImdhbWUtb3Zlci10ZXh0XCIpO1xuICBnYW1lT3ZlclRleHQudGV4dENvbnRlbnQgPSB0ZXh0O1xuXG4gIGNvbnN0IHJlcGxheUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHJlcGxheUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiUmVwbGF5XCI7XG4gIHJlcGxheUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicmVwbGF5LWJ1dHRvblwiKTtcblxuICBwb3BVcC5hcHBlbmRDaGlsZChnYW1lT3ZlclRleHQpO1xuICBwb3BVcC5hcHBlbmRDaGlsZChyZXBsYXlCdXR0b24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQocG9wVXApO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5U2V0dXAoKSB7XG4gIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUhlYWRlcigpO1xuICBjb25zdCBmb290ZXIgPSBjcmVhdGVGb290ZXIoKTtcbiAgY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICBjb25zdCB0aXRsZSA9IGNyZWF0ZVRpdGxlKFwiUGxhY2UgWW91ciBTaGlwcyFcIik7XG4gIGNvbnN0IGJvYXJkID0gY3JlYXRlQm9hcmQoKTtcblxuICBzZWN0aW9uLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgc2VjdGlvbi5hcHBlbmRDaGlsZChib2FyZCk7XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWN0aW9uKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZvb3Rlcik7XG59XG5cbmV4cG9ydCB7IGRpc3BsYXlHYW1lLCBkaXNwbGF5U2V0dXAsIGRpc3BsYXlHYW1lT3ZlciB9O1xuIiwiY29uc3Qgc2hpcCA9IChsZW4pID0+ICh7XG4gIGxlbmd0aDogbGVuLFxuICBoaXRzOiAwLFxuICBoaXQoKSB7XG4gICAgdGhpcy5oaXRzICs9IDE7XG4gIH0sXG4gIGlzU3VuaygpIHtcbiAgICBpZiAodGhpcy5oaXRzID09PSB0aGlzLmxlbmd0aCkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxufSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkKCkge1xuICBjb25zdCBib2FyZCA9IFtdO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IDExOyBpKyspIHtcbiAgICBjb25zdCBjb2x1bW4gPSB7fTtcbiAgICBPYmplY3QuYXNzaWduKGNvbHVtbiwge1xuICAgICAgY29sdW1uOiBpLFxuICAgICAgcm93OiBbXG4gICAgICAgIHsgcG9zaXRpb246IGBhJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBiJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBjJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBkJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBlJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBmJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBnJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBoJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBpJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBqJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICBdLFxuICAgIH0pO1xuICAgIGJvYXJkLnB1c2goY29sdW1uKTtcbiAgfVxuICByZXR1cm4gYm9hcmQ7XG59XG5cbmNvbnN0IGdhbWVCb2FyZCA9ICgpID0+ICh7XG4gIGJvYXJkOiBjcmVhdGVCb2FyZCgpLFxuICBmaW5kU3F1YXJlKGNvbCwgcm93KSB7XG4gICAgY29uc3Qgc3F1YXJlID0gdGhpcy5ib2FyZFtyb3cgLSAxXS5yb3cuZmlsdGVyKChvYmopID0+IHtcbiAgICAgIHJldHVybiBvYmoucG9zaXRpb24gPT09IGAke2NvbH0ke3Jvd31gO1xuICAgIH0pO1xuICAgIHJldHVybiBzcXVhcmU7XG4gIH0sXG4gIGNoZWNrUG9zaXRpb24oY29sLCByb3cpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBjb25zdCBzcXVhcmUgPSB0aGlzLmZpbmRTcXVhcmUoY29sLCByb3cpO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gc3F1YXJlWzBdLnBvc2l0aW9uO1xuICAgIGNvbnN0IGhhc1NoaXAgPSBzcXVhcmVbMF0uaGFzU2hpcDtcbiAgICBPYmplY3QuYXNzaWduKHJlc3VsdCwgeyBwb3NpdGlvbiwgaGFzU2hpcCB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuICBzaGlwczogW10sXG4gIHBsYWNlU2hpcChzdGFydENvbCwgZW5kQ29sLCBzdGFydFJvdywgZW5kUm93LCBuYW1lKSB7XG4gICAgbGV0IGxlbmd0aCA9IDA7XG4gICAgbGV0IG9jY3VwaWVkU3F1YXJlcyA9IFtdO1xuICAgIGlmIChzdGFydFJvdyAhPT0gZW5kUm93KSB7XG4gICAgICBmb3IgKGxldCBpID0gc3RhcnRSb3c7IGkgPCBlbmRSb3cgKyAxOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gdGhpcy5maW5kU3F1YXJlKHN0YXJ0Q29sLCBpKTtcbiAgICAgICAgc3F1YXJlWzBdLmhhc1NoaXAgPSB0cnVlO1xuICAgICAgICBsZW5ndGggKz0gMTtcbiAgICAgICAgb2NjdXBpZWRTcXVhcmVzLnB1c2goYCR7c3RhcnRDb2x9JHtpfWApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgY3VycmVudENvbCA9IHN0YXJ0Q29sO1xuICAgICAgd2hpbGUgKGN1cnJlbnRDb2wgIT09IFN0cmluZy5mcm9tQ2hhckNvZGUoZW5kQ29sLmNoYXJDb2RlQXQoMCkgKyAxKSkge1xuICAgICAgICBjb25zdCBzcXVhcmUgPSB0aGlzLmZpbmRTcXVhcmUoY3VycmVudENvbCwgc3RhcnRSb3cpO1xuICAgICAgICBzcXVhcmVbMF0uaGFzU2hpcCA9IHRydWU7XG4gICAgICAgIG9jY3VwaWVkU3F1YXJlcy5wdXNoKGAke2N1cnJlbnRDb2x9JHtzdGFydFJvd31gKTtcbiAgICAgICAgY3VycmVudENvbCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY3VycmVudENvbC5jaGFyQ29kZUF0KDApICsgMSk7XG4gICAgICAgIGxlbmd0aCArPSAxO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNoaXBzLnB1c2goe1xuICAgICAgc3F1YXJlczogb2NjdXBpZWRTcXVhcmVzLFxuICAgICAgbmFtZSxcbiAgICAgIG9iajogc2hpcChsZW5ndGgpLFxuICAgIH0pO1xuICB9LFxuICBhdHRhY2tzOiBbXSxcbiAgdHJhY2tBdHRhY2socG9zaXRpb24sIGF0dGFja0hpdCwgc2Fua1NoaXApIHtcbiAgICB0aGlzLmF0dGFja3MucHVzaCh7IHBvc2l0aW9uLCBhdHRhY2tIaXQsIHNhbmtTaGlwIH0pO1xuICB9LFxuICBhbGxTaGlwc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuc2hpcHMubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgbGV0IHNoaXBzU3VuayA9IDA7XG4gICAgdGhpcy5hdHRhY2tzLmZvckVhY2goKGF0dGFjaykgPT4ge1xuICAgICAgaWYgKGF0dGFjay5zYW5rU2hpcCkgc2hpcHNTdW5rICs9IDE7XG4gICAgfSk7XG4gICAgaWYgKHNoaXBzU3VuayA+PSB0aGlzLnNoaXBzLmxlbmd0aCkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuICBpc1JlcGVhdGVkQXR0YWNrKGNvbCwgcm93KSB7XG4gICAgbGV0IHJlcGVhdCA9IGZhbHNlO1xuICAgIHRoaXMuYXR0YWNrcy5mb3JFYWNoKChhdHRhY2spID0+IHtcbiAgICAgIGlmIChhdHRhY2sucG9zaXRpb24gPT09IGAke2NvbH0ke3Jvd31gKSB7XG4gICAgICAgIHJlcGVhdCA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVwZWF0O1xuICB9LFxuICByZWNlaXZlQXR0YWNrKGNvbCwgcm93KSB7XG4gICAgaWYgKHRoaXMuaXNSZXBlYXRlZEF0dGFjayhjb2wsIHJvdykpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgbGV0IGF0dGFja2VkU2hpcCA9IGZhbHNlO1xuICAgIHRoaXMuc2hpcHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5zcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgICAgICBpZiAoc3F1YXJlID09PSBgJHtjb2x9JHtyb3d9YCkgYXR0YWNrZWRTaGlwID0gaXRlbTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmIChhdHRhY2tlZFNoaXApIHtcbiAgICAgIGF0dGFja2VkU2hpcC5vYmouaGl0KCk7XG4gICAgICB0aGlzLnRyYWNrQXR0YWNrKGAke2NvbH0ke3Jvd31gLCB0cnVlLCBhdHRhY2tlZFNoaXAub2JqLmlzU3VuaygpKTtcbiAgICAgIHJldHVybiBhdHRhY2tlZFNoaXAubmFtZTtcbiAgICB9XG4gICAgdGhpcy50cmFja0F0dGFjayhgJHtjb2x9JHtyb3d9YCwgZmFsc2UsIGZhbHNlKTtcbiAgICByZXR1cm4gYCR7Y29sfSR7cm93fWA7XG4gIH0sXG59KTtcblxuZXhwb3J0IHsgc2hpcCwgZ2FtZUJvYXJkIH07XG4iLCJpbXBvcnQgeyBkaXNwbGF5R2FtZSwgZGlzcGxheUdhbWVPdmVyLCBkaXNwbGF5U2V0dXAgfSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5pbXBvcnQgeyBnYW1lQm9hcmQgfSBmcm9tIFwiLi9nYW1lXCI7XG5pbXBvcnQgeyBjaG9vc2VTcXVhcmUsIHJhbmRvbVNoaXBBcnJheSB9IGZyb20gXCIuL2NvbXB1dGVyXCI7XG5cbmNvbnN0IHBsYXllckJvYXJkID0gZ2FtZUJvYXJkKCk7XG5jb25zdCBjb21wdXRlckJvYXJkID0gZ2FtZUJvYXJkKCk7XG5sZXQgZ2FtZUFjdGl2ZSA9IHRydWU7XG5cbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkRnJvbUFycmF5KHNoaXBzLCBib2FyZCwgYm9hcmRUeXBlKSB7XG4gIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBsZXQgZmlyc3QgPSB1bmRlZmluZWQ7XG4gICAgbGV0IG5hbWUgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgc2hpcC5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICAgIGlmIChuYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbmFtZSA9IHNxdWFyZS5uYW1lO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoZmlyc3QgPT09IHVuZGVmaW5lZCkgZmlyc3QgPSB7IGNvbDogc3F1YXJlLmNvbCwgcm93OiBzcXVhcmUucm93IH07XG4gICAgICBsYXN0ID0geyBjb2w6IHNxdWFyZS5jb2wsIHJvdzogc3F1YXJlLnJvdyB9O1xuICAgICAgaWYgKGJvYXJkVHlwZSA9PT0gXCJwbGF5ZXJcIikge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnRcbiAgICAgICAgICAucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItYm9hcmRcIilcbiAgICAgICAgICAucXVlcnlTZWxlY3RvcihgLiR7c3F1YXJlLmNvbH0ke3NxdWFyZS5yb3d9YCk7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgYm9hcmQucGxhY2VTaGlwKGZpcnN0LmNvbCwgbGFzdC5jb2wsIGZpcnN0LnJvdywgbGFzdC5yb3csIG5hbWUpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdChwbGF5ZXJTaGlwcywgY29tcHV0ZXJTaGlwcykge1xuICBjcmVhdGVCb2FyZEZyb21BcnJheShyYW5kb21TaGlwQXJyYXkoKSwgcGxheWVyQm9hcmQsIFwicGxheWVyXCIpO1xuICBjcmVhdGVCb2FyZEZyb21BcnJheShyYW5kb21TaGlwQXJyYXkoKSwgY29tcHV0ZXJCb2FyZCwgXCJjb21wdXRlclwiKTtcbn1cblxuZnVuY3Rpb24gbWFya1NxdWFyZShib2FyZCwgY29sLCByb3csIGJvYXJkVHlwZSkge1xuICBib2FyZC5yZWNlaXZlQXR0YWNrKGNvbCwgcm93KTtcbiAgaWYgKGJvYXJkLmF0dGFja3NbYm9hcmQuYXR0YWNrcy5sZW5ndGggLSAxXS5hdHRhY2tIaXQpIHtcbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC4ke2JvYXJkVHlwZX0tYm9hcmRgKVxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC4ke2NvbH0ke3Jvd31gKVxuICAgICAgLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHtib2FyZFR5cGV9LWJvYXJkYClcbiAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHtjb2x9JHtyb3d9YClcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwibWlzc2VkXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVuZEdhbWUodGV4dCkge1xuICBnYW1lQWN0aXZlID0gZmFsc2U7XG4gIGRpc3BsYXlHYW1lT3Zlcih0ZXh0KTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlU3F1YXJlQ2xpY2soY29sLCByb3cpIHtcbiAgaWYgKCFnYW1lQWN0aXZlIHx8IGNvbXB1dGVyQm9hcmQuaXNSZXBlYXRlZEF0dGFjayhjb2wsIHJvdykpIHJldHVybjtcbiAgbWFya1NxdWFyZShjb21wdXRlckJvYXJkLCBjb2wsIHJvdywgXCJjb21wdXRlclwiKTtcblxuICBpZiAoY29tcHV0ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgIGVuZEdhbWUoXCJZb3UgV2luIVwiKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgY29tcHV0ZXJDaG9pY2UgPSBjaG9vc2VTcXVhcmUocGxheWVyQm9hcmQpO1xuICBtYXJrU3F1YXJlKHBsYXllckJvYXJkLCBjb21wdXRlckNob2ljZS5jb2wsIGNvbXB1dGVyQ2hvaWNlLnJvdywgXCJwbGF5ZXJcIik7XG4gIGlmIChwbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgIGVuZEdhbWUoXCJUaGUgQ29tcHV0ZXIgV29uXCIpO1xuICAgIHJldHVybjtcbiAgfVxufVxuXG5kaXNwbGF5R2FtZSgpO1xuaW5pdCgpO1xuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVTcXVhcmVDbGljaztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOlsiZ2V0UG9zc2libGVDaG9pY2VzIiwiYm9hcmQiLCJwb3NzaWJsZVNxdWFyZXMiLCJpIiwiaiIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImNoYXJDb2RlQXQiLCJpc1JlcGVhdGVkQXR0YWNrIiwicHVzaCIsInJvdyIsImNvbCIsImNob29zZVNxdWFyZSIsInNxdWFyZXMiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJsZW5ndGgiLCJyYW5kb21TaGlwQXJyYXkiLCJzaGlwTGVuZ3RocyIsInNoaXBOYW1lcyIsInNoaXBzIiwiX2xvb3AiLCJ2YWxpZFBsYWNlbWVudCIsImRpcmVjdGlvbiIsInN0YXJ0Um93IiwiY2VpbCIsInN0YXJ0Q29sIiwiY3VycmVudFNoaXAiLCJuYW1lIiwiY3VycmVudENvbCIsImN1cnJlbnRSb3ciLCJmb3JFYWNoIiwic2hpcCIsInBvcCIsImhhbmRsZVNxdWFyZUNsaWNrIiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY3JlYXRlQm9hcmQiLCJjcmVhdGVFbGVtZW50IiwiX2xvb3AyIiwic3F1YXJlIiwiY2xhc3NMaXN0IiwiYWRkIiwiY29uY2F0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhcmVudEVsZW1lbnQiLCJjb250YWlucyIsImFwcGVuZENoaWxkIiwicmVzZXQiLCJ0ZXh0Q29udGVudCIsImNyZWF0ZUhlYWRlciIsImhlYWRlciIsImNyZWF0ZUZvb3RlciIsImZvb3RlciIsImNyZWF0ZVRpdGxlIiwidGV4dCIsInRpdGxlIiwiZGlzcGxheUdhbWUiLCJzZWN0aW9uIiwiY29tcHV0ZXJUaXRsZSIsInBsYXllclRpdGxlIiwiY29tcHV0ZXJCb2FyZCIsInBsYXllckJvYXJkIiwiZGlzcGxheUdhbWVPdmVyIiwicG9wVXAiLCJnYW1lT3ZlclRleHQiLCJyZXBsYXlCdXR0b24iLCJkaXNwbGF5U2V0dXAiLCJsZW4iLCJoaXRzIiwiaGl0IiwiaXNTdW5rIiwiY29sdW1uIiwiT2JqZWN0IiwiYXNzaWduIiwicG9zaXRpb24iLCJoYXNTaGlwIiwiZ2FtZUJvYXJkIiwiZmluZFNxdWFyZSIsImZpbHRlciIsIm9iaiIsImNoZWNrUG9zaXRpb24iLCJyZXN1bHQiLCJwbGFjZVNoaXAiLCJlbmRDb2wiLCJlbmRSb3ciLCJvY2N1cGllZFNxdWFyZXMiLCJhdHRhY2tzIiwidHJhY2tBdHRhY2siLCJhdHRhY2tIaXQiLCJzYW5rU2hpcCIsImFsbFNoaXBzU3VuayIsInNoaXBzU3VuayIsImF0dGFjayIsInJlcGVhdCIsInJlY2VpdmVBdHRhY2siLCJ1bmRlZmluZWQiLCJhdHRhY2tlZFNoaXAiLCJpdGVtIiwiZ2FtZUFjdGl2ZSIsImNyZWF0ZUJvYXJkRnJvbUFycmF5IiwiYm9hcmRUeXBlIiwiZmlyc3QiLCJsYXN0IiwiZWxlbWVudCIsImluaXQiLCJwbGF5ZXJTaGlwcyIsImNvbXB1dGVyU2hpcHMiLCJtYXJrU3F1YXJlIiwiZW5kR2FtZSIsImNvbXB1dGVyQ2hvaWNlIl0sInNvdXJjZVJvb3QiOiIifQ==
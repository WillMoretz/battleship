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
        if (square.parentElement.classList.contains("computer-board")) (0,_index__WEBPACK_IMPORTED_MODULE_0__["default"])(j, i);
        if (square.parentElement.classList.contains("setup-board")) {
          // Attempt Place Ship
        }
      });
      square.addEventListener("hover", function () {
        if (!square.parentElement.classList.contains("setup-board")) return;
        //display ship hover
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
  var overlay = document.createElement("div");
  overlay.classList.add("overlay");
  popUp.appendChild(gameOverText);
  popUp.appendChild(replayButton);
  container.appendChild(overlay);
  container.appendChild(popUp);
}
function createShip(squareAmount, className) {
  var ship = document.createElement("button");
  ship.classList.add(className);
  ship.classList.add("ship");
  for (var i = 0; i < squareAmount; i++) {
    var square = document.createElement("div");
    ship.appendChild(square);
  }
  return ship;
}
function displaySetup() {
  var header = createHeader();
  var footer = createFooter();
  var section = document.createElement("section");
  var title = createTitle("Place Your Ships!");
  var board = createBoard();
  board.classList.add("setup-board");
  var shipsContainer = document.createElement("div");
  shipsContainer.classList.add("ships-container");
  var aircraftCarrier = createShip(5, "aircraft-carrier");
  var battleship = createShip(4, "battleship");
  var submarine = createShip(3, "submarine");
  var destroyer = createShip(3, "destroyer");
  var patrolBoat = createShip(2, "patrol-boat");
  section.appendChild(title);
  section.appendChild(board);
  shipsContainer.appendChild(aircraftCarrier);
  shipsContainer.appendChild(battleship);
  shipsContainer.appendChild(submarine);
  shipsContainer.appendChild(destroyer);
  shipsContainer.appendChild(patrolBoat);
  container.appendChild(header);
  container.appendChild(section);
  container.appendChild(shipsContainer);
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
/* harmony import */ var _placement___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./placement. */ "./src/placement..js");




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

// displayGame();
// init();
(0,_display__WEBPACK_IMPORTED_MODULE_0__.displaySetup)();
var ships = document.querySelectorAll(".ship");
ships.forEach(function (ship) {
  ship.addEventListener("click", function () {
    // Toggle Off
    if (ship.classList.contains("selected")) {
      ship.classList.remove("selected");
      return;
    }
    // Deselect Other Ships
    ships.forEach(function (aShip) {
      return aShip.classList.remove("selected");
    });
    // Select Ship
    ship.classList.add("selected");
    (0,_placement___WEBPACK_IMPORTED_MODULE_3__.setActiveShipLength)(ship.children.length);
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handleSquareClick);

/***/ }),

/***/ "./src/placement..js":
/*!***************************!*\
  !*** ./src/placement..js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setActiveShipLength": () => (/* binding */ setActiveShipLength)
/* harmony export */ });
var activeShipLength = 0;
function setActiveShipLength(length) {
  activeShipLength = length;
  console.log(activeShipLength);
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXB1dGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYWNlbWVudC4uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBnZXRQb3NzaWJsZUNob2ljZXMoYm9hcmQpIHtcbiAgY29uc3QgcG9zc2libGVTcXVhcmVzID0gW107XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgMTE7IGkrKykge1xuICAgIGZvciAobGV0IGogPSBcImFcIjsgaiAhPT0gXCJrXCI7IGogPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGouY2hhckNvZGVBdCgwKSArIDEpKSB7XG4gICAgICBpZiAoIWJvYXJkLmlzUmVwZWF0ZWRBdHRhY2soaiwgaSkpXG4gICAgICAgIHBvc3NpYmxlU3F1YXJlcy5wdXNoKHsgcm93OiBpLCBjb2w6IGogfSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBwb3NzaWJsZVNxdWFyZXM7XG59XG5cbmZ1bmN0aW9uIGNob29zZVNxdWFyZShib2FyZCkge1xuICBjb25zdCBzcXVhcmVzID0gZ2V0UG9zc2libGVDaG9pY2VzKGJvYXJkKTtcbiAgcmV0dXJuIHNxdWFyZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc3F1YXJlcy5sZW5ndGgpXTtcbn1cblxuZnVuY3Rpb24gcmFuZG9tU2hpcEFycmF5KCkge1xuICBjb25zdCBzaGlwTGVuZ3RocyA9IFsyLCAzLCAzLCA0LCA1XTtcbiAgY29uc3Qgc2hpcE5hbWVzID0gW1xuICAgIFwiUGF0cm9sIEJvYXRcIixcbiAgICBcIlN1Ym1hcmluZVwiLFxuICAgIFwiRGVzdHJveWVyXCIsXG4gICAgXCJCYXR0bGVTaGlwXCIsXG4gICAgXCJBaXJjcmFmdCBDYXJyaWVyXCIsXG4gIF07XG4gIGNvbnN0IHNoaXBzID0gW107XG4gIHdoaWxlIChzaGlwTGVuZ3Rocy5sZW5ndGggPiAwKSB7XG4gICAgbGV0IHZhbGlkUGxhY2VtZW50ID0gdHJ1ZTtcbiAgICBjb25zdCBkaXJlY3Rpb24gPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gXCJyb3dTcGFuXCIgOiBcImNvbFNwYW5cIjtcblxuICAgIGNvbnN0IHN0YXJ0Um93ID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgY29uc3Qgc3RhcnRDb2wgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDk2ICsgTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAxMCkpO1xuXG4gICAgY29uc3QgY3VycmVudFNoaXAgPSBbeyBuYW1lOiBzaGlwTmFtZXNbc2hpcE5hbWVzLmxlbmd0aCAtIDFdIH1dO1xuXG4gICAgbGV0IGN1cnJlbnRDb2wgPSBzdGFydENvbDtcbiAgICBsZXQgY3VycmVudFJvdyA9IHN0YXJ0Um93O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3Roc1tzaGlwTGVuZ3Rocy5sZW5ndGggLSAxXTsgaSsrKSB7XG4gICAgICAvLyBPdXQgb2YgQm91bmRzXG4gICAgICBpZiAoY3VycmVudFJvdyA9PT0gMTEpIHtcbiAgICAgICAgdmFsaWRQbGFjZW1lbnQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudENvbCA9PT0gXCJrXCIpIHtcbiAgICAgICAgdmFsaWRQbGFjZW1lbnQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIC8vIE92ZXJsYXBcbiAgICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCBzaGlwLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnRDb2wgPT09IHNoaXBbal0uY29sICYmIGN1cnJlbnRSb3cgPT09IHNoaXBbal0ucm93KSB7XG4gICAgICAgICAgICB2YWxpZFBsYWNlbWVudCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKCF2YWxpZFBsYWNlbWVudCkgYnJlYWs7XG4gICAgICBjdXJyZW50U2hpcC5wdXNoKHsgY29sOiBjdXJyZW50Q29sLCByb3c6IGN1cnJlbnRSb3cgfSk7XG4gICAgICAvLyBJbmNyZW1lbnRcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwicm93U3BhblwiKSBjdXJyZW50Um93ICs9IDE7XG4gICAgICBlbHNlIGN1cnJlbnRDb2wgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGN1cnJlbnRDb2wuY2hhckNvZGVBdCgwKSArIDEpO1xuICAgIH1cblxuICAgIGlmICh2YWxpZFBsYWNlbWVudCkge1xuICAgICAgc2hpcHMucHVzaChjdXJyZW50U2hpcCk7XG4gICAgICBzaGlwTGVuZ3Rocy5wb3AoKTtcbiAgICAgIHNoaXBOYW1lcy5wb3AoKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHNoaXBzO1xufVxuXG5leHBvcnQgeyBjaG9vc2VTcXVhcmUsIGdldFBvc3NpYmxlQ2hvaWNlcywgcmFuZG9tU2hpcEFycmF5IH07XG4iLCJpbXBvcnQgaGFuZGxlU3F1YXJlQ2xpY2sgZnJvbSBcIi4vaW5kZXhcIjtcblxuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWNvbnRhaW5lcl1cIik7XG5cbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkKCkge1xuICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgMTE7IGkgKz0gMSkge1xuICAgIGZvciAobGV0IGogPSBcImFcIjsgaiAhPT0gXCJrXCI7IGogPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGouY2hhckNvZGVBdCgwKSArIDEpKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmVcIik7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChgJHtqfSR7aX1gKTtcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoc3F1YXJlLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGxheWVyLWJvYXJkXCIpKSByZXR1cm47XG4gICAgICAgIGlmIChzcXVhcmUucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb21wdXRlci1ib2FyZFwiKSlcbiAgICAgICAgICBoYW5kbGVTcXVhcmVDbGljayhqLCBpKTtcbiAgICAgICAgaWYgKHNxdWFyZS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcInNldHVwLWJvYXJkXCIpKSB7XG4gICAgICAgICAgLy8gQXR0ZW1wdCBQbGFjZSBTaGlwXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJob3ZlclwiLCAoKSA9PiB7XG4gICAgICAgIGlmICghc3F1YXJlLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2V0dXAtYm9hcmRcIikpIHJldHVybjtcbiAgICAgICAgLy9kaXNwbGF5IHNoaXAgaG92ZXJcbiAgICAgIH0pO1xuICAgICAgYm9hcmQuY2xhc3NMaXN0LmFkZChcImJvYXJkXCIpO1xuICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJvYXJkO1xufVxuXG5mdW5jdGlvbiByZXNldCgpIHtcbiAgY29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSGVhZGVyKCkge1xuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuICBoZWFkZXIudGV4dENvbnRlbnQgPSBcIkJhdHRsZXNoaXBcIjtcbiAgcmV0dXJuIGhlYWRlcjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRm9vdGVyKCkge1xuICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9vdGVyXCIpO1xuICBmb290ZXIudGV4dENvbnRlbnQgPSBcIk1hZGUgYnkgV2lsbCBNb3JldHpcIjtcbiAgcmV0dXJuIGZvb3Rlcjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVGl0bGUodGV4dCkge1xuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHRpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0aXRsZVwiKTtcbiAgdGl0bGUudGV4dENvbnRlbnQgPSB0ZXh0O1xuICByZXR1cm4gdGl0bGU7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlHYW1lKCkge1xuICByZXNldCgpO1xuXG4gIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUhlYWRlcigpO1xuICBjb25zdCBmb290ZXIgPSBjcmVhdGVGb290ZXIoKTtcbiAgY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICBjb25zdCBjb21wdXRlclRpdGxlID0gY3JlYXRlVGl0bGUoXCJDb21wdXRlcidzIEJvYXJkXCIpO1xuICBjb25zdCBwbGF5ZXJUaXRsZSA9IGNyZWF0ZVRpdGxlKFwiWW91ciBCb2FyZFwiKTtcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG4gIGNvbXB1dGVyQm9hcmQuY2xhc3NMaXN0LmFkZChcImNvbXB1dGVyLWJvYXJkXCIpO1xuICBjb25zdCBwbGF5ZXJCb2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG4gIHBsYXllckJvYXJkLmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXItYm9hcmRcIik7XG5cbiAgc2VjdGlvbi5hcHBlbmRDaGlsZChjb21wdXRlclRpdGxlKTtcbiAgc2VjdGlvbi5hcHBlbmRDaGlsZChjb21wdXRlckJvYXJkLCBudWxsKTtcbiAgc2VjdGlvbi5hcHBlbmRDaGlsZChwbGF5ZXJUaXRsZSk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQocGxheWVyQm9hcmQpO1xuXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VjdGlvbik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb290ZXIpO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5R2FtZU92ZXIodGV4dCkge1xuICBjb25zdCBwb3BVcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHBvcFVwLmNsYXNzTGlzdC5hZGQoXCJwb3AtdXBcIik7XG5cbiAgY29uc3QgZ2FtZU92ZXJUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZ2FtZU92ZXJUZXh0LmNsYXNzTGlzdC5hZGQoXCJnYW1lLW92ZXItdGV4dFwiKTtcbiAgZ2FtZU92ZXJUZXh0LnRleHRDb250ZW50ID0gdGV4dDtcblxuICBjb25zdCByZXBsYXlCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICByZXBsYXlCdXR0b24udGV4dENvbnRlbnQgPSBcIlJlcGxheVwiO1xuICByZXBsYXlCdXR0b24uY2xhc3NMaXN0LmFkZChcInJlcGxheS1idXR0b25cIik7XG5cbiAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG92ZXJsYXkuY2xhc3NMaXN0LmFkZChcIm92ZXJsYXlcIik7XG5cbiAgcG9wVXAuYXBwZW5kQ2hpbGQoZ2FtZU92ZXJUZXh0KTtcbiAgcG9wVXAuYXBwZW5kQ2hpbGQocmVwbGF5QnV0dG9uKTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwb3BVcCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNoaXAoc3F1YXJlQW1vdW50LCBjbGFzc05hbWUpIHtcbiAgY29uc3Qgc2hpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHNoaXAuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICBzaGlwLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNxdWFyZUFtb3VudDsgaSsrKSB7XG4gICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzaGlwLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gIH1cbiAgcmV0dXJuIHNoaXA7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlTZXR1cCgpIHtcbiAgY29uc3QgaGVhZGVyID0gY3JlYXRlSGVhZGVyKCk7XG4gIGNvbnN0IGZvb3RlciA9IGNyZWF0ZUZvb3RlcigpO1xuICBjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gIGNvbnN0IHRpdGxlID0gY3JlYXRlVGl0bGUoXCJQbGFjZSBZb3VyIFNoaXBzIVwiKTtcbiAgY29uc3QgYm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICBib2FyZC5jbGFzc0xpc3QuYWRkKFwic2V0dXAtYm9hcmRcIik7XG5cbiAgY29uc3Qgc2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzaGlwc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwic2hpcHMtY29udGFpbmVyXCIpO1xuXG4gIGNvbnN0IGFpcmNyYWZ0Q2FycmllciA9IGNyZWF0ZVNoaXAoNSwgXCJhaXJjcmFmdC1jYXJyaWVyXCIpO1xuICBjb25zdCBiYXR0bGVzaGlwID0gY3JlYXRlU2hpcCg0LCBcImJhdHRsZXNoaXBcIik7XG4gIGNvbnN0IHN1Ym1hcmluZSA9IGNyZWF0ZVNoaXAoMywgXCJzdWJtYXJpbmVcIik7XG4gIGNvbnN0IGRlc3Ryb3llciA9IGNyZWF0ZVNoaXAoMywgXCJkZXN0cm95ZXJcIik7XG4gIGNvbnN0IHBhdHJvbEJvYXQgPSBjcmVhdGVTaGlwKDIsIFwicGF0cm9sLWJvYXRcIik7XG5cbiAgc2VjdGlvbi5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoYm9hcmQpO1xuXG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGFpcmNyYWZ0Q2Fycmllcik7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGJhdHRsZXNoaXApO1xuICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChzdWJtYXJpbmUpO1xuICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChkZXN0cm95ZXIpO1xuICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChwYXRyb2xCb2F0KTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNlY3Rpb24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2hpcHNDb250YWluZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcbn1cblxuZXhwb3J0IHsgZGlzcGxheUdhbWUsIGRpc3BsYXlTZXR1cCwgZGlzcGxheUdhbWVPdmVyIH07XG4iLCJjb25zdCBzaGlwID0gKGxlbikgPT4gKHtcbiAgbGVuZ3RoOiBsZW4sXG4gIGhpdHM6IDAsXG4gIGhpdCgpIHtcbiAgICB0aGlzLmhpdHMgKz0gMTtcbiAgfSxcbiAgaXNTdW5rKCkge1xuICAgIGlmICh0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG59KTtcblxuZnVuY3Rpb24gY3JlYXRlQm9hcmQoKSB7XG4gIGNvbnN0IGJvYXJkID0gW107XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgMTE7IGkrKykge1xuICAgIGNvbnN0IGNvbHVtbiA9IHt9O1xuICAgIE9iamVjdC5hc3NpZ24oY29sdW1uLCB7XG4gICAgICBjb2x1bW46IGksXG4gICAgICByb3c6IFtcbiAgICAgICAgeyBwb3NpdGlvbjogYGEke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGIke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGMke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGQke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGUke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGYke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGcke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGgke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGkke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGoke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgIF0sXG4gICAgfSk7XG4gICAgYm9hcmQucHVzaChjb2x1bW4pO1xuICB9XG4gIHJldHVybiBib2FyZDtcbn1cblxuY29uc3QgZ2FtZUJvYXJkID0gKCkgPT4gKHtcbiAgYm9hcmQ6IGNyZWF0ZUJvYXJkKCksXG4gIGZpbmRTcXVhcmUoY29sLCByb3cpIHtcbiAgICBjb25zdCBzcXVhcmUgPSB0aGlzLmJvYXJkW3JvdyAtIDFdLnJvdy5maWx0ZXIoKG9iaikgPT4ge1xuICAgICAgcmV0dXJuIG9iai5wb3NpdGlvbiA9PT0gYCR7Y29sfSR7cm93fWA7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNxdWFyZTtcbiAgfSxcbiAgY2hlY2tQb3NpdGlvbihjb2wsIHJvdykge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuZmluZFNxdWFyZShjb2wsIHJvdyk7XG4gICAgY29uc3QgcG9zaXRpb24gPSBzcXVhcmVbMF0ucG9zaXRpb247XG4gICAgY29uc3QgaGFzU2hpcCA9IHNxdWFyZVswXS5oYXNTaGlwO1xuICAgIE9iamVjdC5hc3NpZ24ocmVzdWx0LCB7IHBvc2l0aW9uLCBoYXNTaGlwIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG4gIHNoaXBzOiBbXSxcbiAgcGxhY2VTaGlwKHN0YXJ0Q29sLCBlbmRDb2wsIHN0YXJ0Um93LCBlbmRSb3csIG5hbWUpIHtcbiAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICBsZXQgb2NjdXBpZWRTcXVhcmVzID0gW107XG4gICAgaWYgKHN0YXJ0Um93ICE9PSBlbmRSb3cpIHtcbiAgICAgIGZvciAobGV0IGkgPSBzdGFydFJvdzsgaSA8IGVuZFJvdyArIDE7IGkrKykge1xuICAgICAgICBjb25zdCBzcXVhcmUgPSB0aGlzLmZpbmRTcXVhcmUoc3RhcnRDb2wsIGkpO1xuICAgICAgICBzcXVhcmVbMF0uaGFzU2hpcCA9IHRydWU7XG4gICAgICAgIGxlbmd0aCArPSAxO1xuICAgICAgICBvY2N1cGllZFNxdWFyZXMucHVzaChgJHtzdGFydENvbH0ke2l9YCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBjdXJyZW50Q29sID0gc3RhcnRDb2w7XG4gICAgICB3aGlsZSAoY3VycmVudENvbCAhPT0gU3RyaW5nLmZyb21DaGFyQ29kZShlbmRDb2wuY2hhckNvZGVBdCgwKSArIDEpKSB7XG4gICAgICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuZmluZFNxdWFyZShjdXJyZW50Q29sLCBzdGFydFJvdyk7XG4gICAgICAgIHNxdWFyZVswXS5oYXNTaGlwID0gdHJ1ZTtcbiAgICAgICAgb2NjdXBpZWRTcXVhcmVzLnB1c2goYCR7Y3VycmVudENvbH0ke3N0YXJ0Um93fWApO1xuICAgICAgICBjdXJyZW50Q29sID0gU3RyaW5nLmZyb21DaGFyQ29kZShjdXJyZW50Q29sLmNoYXJDb2RlQXQoMCkgKyAxKTtcbiAgICAgICAgbGVuZ3RoICs9IDE7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2hpcHMucHVzaCh7XG4gICAgICBzcXVhcmVzOiBvY2N1cGllZFNxdWFyZXMsXG4gICAgICBuYW1lLFxuICAgICAgb2JqOiBzaGlwKGxlbmd0aCksXG4gICAgfSk7XG4gIH0sXG4gIGF0dGFja3M6IFtdLFxuICB0cmFja0F0dGFjayhwb3NpdGlvbiwgYXR0YWNrSGl0LCBzYW5rU2hpcCkge1xuICAgIHRoaXMuYXR0YWNrcy5wdXNoKHsgcG9zaXRpb24sIGF0dGFja0hpdCwgc2Fua1NoaXAgfSk7XG4gIH0sXG4gIGFsbFNoaXBzU3VuaygpIHtcbiAgICBpZiAodGhpcy5zaGlwcy5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcbiAgICBsZXQgc2hpcHNTdW5rID0gMDtcbiAgICB0aGlzLmF0dGFja3MuZm9yRWFjaCgoYXR0YWNrKSA9PiB7XG4gICAgICBpZiAoYXR0YWNrLnNhbmtTaGlwKSBzaGlwc1N1bmsgKz0gMTtcbiAgICB9KTtcbiAgICBpZiAoc2hpcHNTdW5rID49IHRoaXMuc2hpcHMubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG4gIGlzUmVwZWF0ZWRBdHRhY2soY29sLCByb3cpIHtcbiAgICBsZXQgcmVwZWF0ID0gZmFsc2U7XG4gICAgdGhpcy5hdHRhY2tzLmZvckVhY2goKGF0dGFjaykgPT4ge1xuICAgICAgaWYgKGF0dGFjay5wb3NpdGlvbiA9PT0gYCR7Y29sfSR7cm93fWApIHtcbiAgICAgICAgcmVwZWF0ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXBlYXQ7XG4gIH0sXG4gIHJlY2VpdmVBdHRhY2soY29sLCByb3cpIHtcbiAgICBpZiAodGhpcy5pc1JlcGVhdGVkQXR0YWNrKGNvbCwgcm93KSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBsZXQgYXR0YWNrZWRTaGlwID0gZmFsc2U7XG4gICAgdGhpcy5zaGlwcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpdGVtLnNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgICAgIGlmIChzcXVhcmUgPT09IGAke2NvbH0ke3Jvd31gKSBhdHRhY2tlZFNoaXAgPSBpdGVtO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKGF0dGFja2VkU2hpcCkge1xuICAgICAgYXR0YWNrZWRTaGlwLm9iai5oaXQoKTtcbiAgICAgIHRoaXMudHJhY2tBdHRhY2soYCR7Y29sfSR7cm93fWAsIHRydWUsIGF0dGFja2VkU2hpcC5vYmouaXNTdW5rKCkpO1xuICAgICAgcmV0dXJuIGF0dGFja2VkU2hpcC5uYW1lO1xuICAgIH1cbiAgICB0aGlzLnRyYWNrQXR0YWNrKGAke2NvbH0ke3Jvd31gLCBmYWxzZSwgZmFsc2UpO1xuICAgIHJldHVybiBgJHtjb2x9JHtyb3d9YDtcbiAgfSxcbn0pO1xuXG5leHBvcnQgeyBzaGlwLCBnYW1lQm9hcmQgfTtcbiIsImltcG9ydCB7IGRpc3BsYXlHYW1lLCBkaXNwbGF5R2FtZU92ZXIsIGRpc3BsYXlTZXR1cCB9IGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCB7IGdhbWVCb2FyZCB9IGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCB7IGNob29zZVNxdWFyZSwgcmFuZG9tU2hpcEFycmF5IH0gZnJvbSBcIi4vY29tcHV0ZXJcIjtcbmltcG9ydCB7IHNldEFjdGl2ZVNoaXBMZW5ndGggfSBmcm9tIFwiLi9wbGFjZW1lbnQuXCI7XG5cbmNvbnN0IHBsYXllckJvYXJkID0gZ2FtZUJvYXJkKCk7XG5jb25zdCBjb21wdXRlckJvYXJkID0gZ2FtZUJvYXJkKCk7XG5sZXQgZ2FtZUFjdGl2ZSA9IHRydWU7XG5cbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkRnJvbUFycmF5KHNoaXBzLCBib2FyZCwgYm9hcmRUeXBlKSB7XG4gIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBsZXQgZmlyc3QgPSB1bmRlZmluZWQ7XG4gICAgbGV0IG5hbWUgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgc2hpcC5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICAgIGlmIChuYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbmFtZSA9IHNxdWFyZS5uYW1lO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoZmlyc3QgPT09IHVuZGVmaW5lZCkgZmlyc3QgPSB7IGNvbDogc3F1YXJlLmNvbCwgcm93OiBzcXVhcmUucm93IH07XG4gICAgICBsYXN0ID0geyBjb2w6IHNxdWFyZS5jb2wsIHJvdzogc3F1YXJlLnJvdyB9O1xuICAgICAgaWYgKGJvYXJkVHlwZSA9PT0gXCJwbGF5ZXJcIikge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnRcbiAgICAgICAgICAucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItYm9hcmRcIilcbiAgICAgICAgICAucXVlcnlTZWxlY3RvcihgLiR7c3F1YXJlLmNvbH0ke3NxdWFyZS5yb3d9YCk7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgYm9hcmQucGxhY2VTaGlwKGZpcnN0LmNvbCwgbGFzdC5jb2wsIGZpcnN0LnJvdywgbGFzdC5yb3csIG5hbWUpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdChwbGF5ZXJTaGlwcywgY29tcHV0ZXJTaGlwcykge1xuICBjcmVhdGVCb2FyZEZyb21BcnJheShyYW5kb21TaGlwQXJyYXkoKSwgcGxheWVyQm9hcmQsIFwicGxheWVyXCIpO1xuICBjcmVhdGVCb2FyZEZyb21BcnJheShyYW5kb21TaGlwQXJyYXkoKSwgY29tcHV0ZXJCb2FyZCwgXCJjb21wdXRlclwiKTtcbn1cblxuZnVuY3Rpb24gbWFya1NxdWFyZShib2FyZCwgY29sLCByb3csIGJvYXJkVHlwZSkge1xuICBib2FyZC5yZWNlaXZlQXR0YWNrKGNvbCwgcm93KTtcbiAgaWYgKGJvYXJkLmF0dGFja3NbYm9hcmQuYXR0YWNrcy5sZW5ndGggLSAxXS5hdHRhY2tIaXQpIHtcbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC4ke2JvYXJkVHlwZX0tYm9hcmRgKVxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC4ke2NvbH0ke3Jvd31gKVxuICAgICAgLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHtib2FyZFR5cGV9LWJvYXJkYClcbiAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHtjb2x9JHtyb3d9YClcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwibWlzc2VkXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVuZEdhbWUodGV4dCkge1xuICBnYW1lQWN0aXZlID0gZmFsc2U7XG4gIGRpc3BsYXlHYW1lT3Zlcih0ZXh0KTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlU3F1YXJlQ2xpY2soY29sLCByb3cpIHtcbiAgaWYgKCFnYW1lQWN0aXZlIHx8IGNvbXB1dGVyQm9hcmQuaXNSZXBlYXRlZEF0dGFjayhjb2wsIHJvdykpIHJldHVybjtcbiAgbWFya1NxdWFyZShjb21wdXRlckJvYXJkLCBjb2wsIHJvdywgXCJjb21wdXRlclwiKTtcblxuICBpZiAoY29tcHV0ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgIGVuZEdhbWUoXCJZb3UgV2luIVwiKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgY29tcHV0ZXJDaG9pY2UgPSBjaG9vc2VTcXVhcmUocGxheWVyQm9hcmQpO1xuICBtYXJrU3F1YXJlKHBsYXllckJvYXJkLCBjb21wdXRlckNob2ljZS5jb2wsIGNvbXB1dGVyQ2hvaWNlLnJvdywgXCJwbGF5ZXJcIik7XG4gIGlmIChwbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgIGVuZEdhbWUoXCJUaGUgQ29tcHV0ZXIgV29uXCIpO1xuICAgIHJldHVybjtcbiAgfVxufVxuXG4vLyBkaXNwbGF5R2FtZSgpO1xuLy8gaW5pdCgpO1xuZGlzcGxheVNldHVwKCk7XG5cbmNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwXCIpO1xuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgLy8gVG9nZ2xlIE9mZlxuICAgIGlmIChzaGlwLmNsYXNzTGlzdC5jb250YWlucyhcInNlbGVjdGVkXCIpKSB7XG4gICAgICBzaGlwLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gRGVzZWxlY3QgT3RoZXIgU2hpcHNcbiAgICBzaGlwcy5mb3JFYWNoKChhU2hpcCkgPT4gYVNoaXAuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpKTtcbiAgICAvLyBTZWxlY3QgU2hpcFxuICAgIHNoaXAuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xuICAgIHNldEFjdGl2ZVNoaXBMZW5ndGgoc2hpcC5jaGlsZHJlbi5sZW5ndGgpO1xuICB9KTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVTcXVhcmVDbGljaztcbiIsImxldCBhY3RpdmVTaGlwTGVuZ3RoID0gMDtcblxuZnVuY3Rpb24gc2V0QWN0aXZlU2hpcExlbmd0aChsZW5ndGgpIHtcbiAgYWN0aXZlU2hpcExlbmd0aCA9IGxlbmd0aDtcbiAgY29uc29sZS5sb2coYWN0aXZlU2hpcExlbmd0aCk7XG59XG5cbmV4cG9ydCB7IHNldEFjdGl2ZVNoaXBMZW5ndGggfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOlsiZ2V0UG9zc2libGVDaG9pY2VzIiwiYm9hcmQiLCJwb3NzaWJsZVNxdWFyZXMiLCJpIiwiaiIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImNoYXJDb2RlQXQiLCJpc1JlcGVhdGVkQXR0YWNrIiwicHVzaCIsInJvdyIsImNvbCIsImNob29zZVNxdWFyZSIsInNxdWFyZXMiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJsZW5ndGgiLCJyYW5kb21TaGlwQXJyYXkiLCJzaGlwTGVuZ3RocyIsInNoaXBOYW1lcyIsInNoaXBzIiwiX2xvb3AiLCJ2YWxpZFBsYWNlbWVudCIsImRpcmVjdGlvbiIsInN0YXJ0Um93IiwiY2VpbCIsInN0YXJ0Q29sIiwiY3VycmVudFNoaXAiLCJuYW1lIiwiY3VycmVudENvbCIsImN1cnJlbnRSb3ciLCJmb3JFYWNoIiwic2hpcCIsInBvcCIsImhhbmRsZVNxdWFyZUNsaWNrIiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY3JlYXRlQm9hcmQiLCJjcmVhdGVFbGVtZW50IiwiX2xvb3AyIiwic3F1YXJlIiwiY2xhc3NMaXN0IiwiYWRkIiwiY29uY2F0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhcmVudEVsZW1lbnQiLCJjb250YWlucyIsImFwcGVuZENoaWxkIiwicmVzZXQiLCJ0ZXh0Q29udGVudCIsImNyZWF0ZUhlYWRlciIsImhlYWRlciIsImNyZWF0ZUZvb3RlciIsImZvb3RlciIsImNyZWF0ZVRpdGxlIiwidGV4dCIsInRpdGxlIiwiZGlzcGxheUdhbWUiLCJzZWN0aW9uIiwiY29tcHV0ZXJUaXRsZSIsInBsYXllclRpdGxlIiwiY29tcHV0ZXJCb2FyZCIsInBsYXllckJvYXJkIiwiZGlzcGxheUdhbWVPdmVyIiwicG9wVXAiLCJnYW1lT3ZlclRleHQiLCJyZXBsYXlCdXR0b24iLCJvdmVybGF5IiwiY3JlYXRlU2hpcCIsInNxdWFyZUFtb3VudCIsImNsYXNzTmFtZSIsImRpc3BsYXlTZXR1cCIsInNoaXBzQ29udGFpbmVyIiwiYWlyY3JhZnRDYXJyaWVyIiwiYmF0dGxlc2hpcCIsInN1Ym1hcmluZSIsImRlc3Ryb3llciIsInBhdHJvbEJvYXQiLCJsZW4iLCJoaXRzIiwiaGl0IiwiaXNTdW5rIiwiY29sdW1uIiwiT2JqZWN0IiwiYXNzaWduIiwicG9zaXRpb24iLCJoYXNTaGlwIiwiZ2FtZUJvYXJkIiwiZmluZFNxdWFyZSIsImZpbHRlciIsIm9iaiIsImNoZWNrUG9zaXRpb24iLCJyZXN1bHQiLCJwbGFjZVNoaXAiLCJlbmRDb2wiLCJlbmRSb3ciLCJvY2N1cGllZFNxdWFyZXMiLCJhdHRhY2tzIiwidHJhY2tBdHRhY2siLCJhdHRhY2tIaXQiLCJzYW5rU2hpcCIsImFsbFNoaXBzU3VuayIsInNoaXBzU3VuayIsImF0dGFjayIsInJlcGVhdCIsInJlY2VpdmVBdHRhY2siLCJ1bmRlZmluZWQiLCJhdHRhY2tlZFNoaXAiLCJpdGVtIiwic2V0QWN0aXZlU2hpcExlbmd0aCIsImdhbWVBY3RpdmUiLCJjcmVhdGVCb2FyZEZyb21BcnJheSIsImJvYXJkVHlwZSIsImZpcnN0IiwibGFzdCIsImVsZW1lbnQiLCJpbml0IiwicGxheWVyU2hpcHMiLCJjb21wdXRlclNoaXBzIiwibWFya1NxdWFyZSIsImVuZEdhbWUiLCJjb21wdXRlckNob2ljZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZW1vdmUiLCJhU2hpcCIsImNoaWxkcmVuIiwiYWN0aXZlU2hpcExlbmd0aCIsImNvbnNvbGUiLCJsb2ciXSwic291cmNlUm9vdCI6IiJ9
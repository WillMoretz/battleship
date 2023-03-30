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
/* harmony import */ var _placement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./placement */ "./src/placement.js");


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
      square.addEventListener("mouseover", function () {
        if (!square.parentElement.classList.contains("setup-board")) return;
        (0,_placement__WEBPACK_IMPORTED_MODULE_1__.displayHover)(j, i);
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
/* harmony import */ var _placement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./placement */ "./src/placement.js");




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
      // Display Where Ships Are
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

// Advances Game
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
    (0,_placement__WEBPACK_IMPORTED_MODULE_3__.setActiveShipLength)(ship.children.length);
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handleSquareClick);

/***/ }),

/***/ "./src/placement.js":
/*!**************************!*\
  !*** ./src/placement.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayHover": () => (/* binding */ displayHover),
/* harmony export */   "setActiveShipLength": () => (/* binding */ setActiveShipLength),
/* harmony export */   "toggleDirection": () => (/* binding */ toggleDirection)
/* harmony export */ });
var activeShipLength = 0;
var direction = "colSpan";
var placementValid = true;
function setActiveShipLength(length) {
  activeShipLength = length;
}
function toggleDirection() {
  direction === "rowSpan" ? direction = "colSpan" : direction = "rowSpan";
}
function displayHover(col, row) {
  var currentCol = col;
  var currentRow = row;
  var iterationsLeft = activeShipLength;
  document.querySelectorAll(".hovered").forEach(function (hovered) {
    hovered.classList.remove("hovered");
  });
  while (iterationsLeft > 0) {
    var square = document.querySelector(".".concat(currentCol).concat(currentRow));
    if (square === null) {
      placementValid = false;
      break;
    }
    square.classList.add("hovered");
    if (direction === "rowSpan") currentRow += 1;else currentCol = String.fromCharCode(currentCol.charCodeAt(0) + 1);
    iterationsLeft -= 1;
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXB1dGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGdldFBvc3NpYmxlQ2hvaWNlcyhib2FyZCkge1xuICBjb25zdCBwb3NzaWJsZVNxdWFyZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMTsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IFwiYVwiOyBqICE9PSBcImtcIjsgaiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoai5jaGFyQ29kZUF0KDApICsgMSkpIHtcbiAgICAgIGlmICghYm9hcmQuaXNSZXBlYXRlZEF0dGFjayhqLCBpKSlcbiAgICAgICAgcG9zc2libGVTcXVhcmVzLnB1c2goeyByb3c6IGksIGNvbDogaiB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHBvc3NpYmxlU3F1YXJlcztcbn1cblxuZnVuY3Rpb24gY2hvb3NlU3F1YXJlKGJvYXJkKSB7XG4gIGNvbnN0IHNxdWFyZXMgPSBnZXRQb3NzaWJsZUNob2ljZXMoYm9hcmQpO1xuICByZXR1cm4gc3F1YXJlc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzcXVhcmVzLmxlbmd0aCldO1xufVxuXG5mdW5jdGlvbiByYW5kb21TaGlwQXJyYXkoKSB7XG4gIGNvbnN0IHNoaXBMZW5ndGhzID0gWzIsIDMsIDMsIDQsIDVdO1xuICBjb25zdCBzaGlwTmFtZXMgPSBbXG4gICAgXCJQYXRyb2wgQm9hdFwiLFxuICAgIFwiU3VibWFyaW5lXCIsXG4gICAgXCJEZXN0cm95ZXJcIixcbiAgICBcIkJhdHRsZVNoaXBcIixcbiAgICBcIkFpcmNyYWZ0IENhcnJpZXJcIixcbiAgXTtcbiAgY29uc3Qgc2hpcHMgPSBbXTtcbiAgd2hpbGUgKHNoaXBMZW5ndGhzLmxlbmd0aCA+IDApIHtcbiAgICBsZXQgdmFsaWRQbGFjZW1lbnQgPSB0cnVlO1xuICAgIGNvbnN0IGRpcmVjdGlvbiA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyBcInJvd1NwYW5cIiA6IFwiY29sU3BhblwiO1xuXG4gICAgY29uc3Qgc3RhcnRSb3cgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBjb25zdCBzdGFydENvbCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoOTYgKyBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDEwKSk7XG5cbiAgICBjb25zdCBjdXJyZW50U2hpcCA9IFt7IG5hbWU6IHNoaXBOYW1lc1tzaGlwTmFtZXMubGVuZ3RoIC0gMV0gfV07XG5cbiAgICBsZXQgY3VycmVudENvbCA9IHN0YXJ0Q29sO1xuICAgIGxldCBjdXJyZW50Um93ID0gc3RhcnRSb3c7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGhzW3NoaXBMZW5ndGhzLmxlbmd0aCAtIDFdOyBpKyspIHtcbiAgICAgIC8vIE91dCBvZiBCb3VuZHNcbiAgICAgIGlmIChjdXJyZW50Um93ID09PSAxMSkge1xuICAgICAgICB2YWxpZFBsYWNlbWVudCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50Q29sID09PSBcImtcIikge1xuICAgICAgICB2YWxpZFBsYWNlbWVudCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgLy8gT3ZlcmxhcFxuICAgICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IHNoaXAubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBpZiAoY3VycmVudENvbCA9PT0gc2hpcFtqXS5jb2wgJiYgY3VycmVudFJvdyA9PT0gc2hpcFtqXS5yb3cpIHtcbiAgICAgICAgICAgIHZhbGlkUGxhY2VtZW50ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXZhbGlkUGxhY2VtZW50KSBicmVhaztcbiAgICAgIGN1cnJlbnRTaGlwLnB1c2goeyBjb2w6IGN1cnJlbnRDb2wsIHJvdzogY3VycmVudFJvdyB9KTtcbiAgICAgIC8vIEluY3JlbWVudFxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJyb3dTcGFuXCIpIGN1cnJlbnRSb3cgKz0gMTtcbiAgICAgIGVsc2UgY3VycmVudENvbCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY3VycmVudENvbC5jaGFyQ29kZUF0KDApICsgMSk7XG4gICAgfVxuXG4gICAgaWYgKHZhbGlkUGxhY2VtZW50KSB7XG4gICAgICBzaGlwcy5wdXNoKGN1cnJlbnRTaGlwKTtcbiAgICAgIHNoaXBMZW5ndGhzLnBvcCgpO1xuICAgICAgc2hpcE5hbWVzLnBvcCgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc2hpcHM7XG59XG5cbmV4cG9ydCB7IGNob29zZVNxdWFyZSwgZ2V0UG9zc2libGVDaG9pY2VzLCByYW5kb21TaGlwQXJyYXkgfTtcbiIsImltcG9ydCBoYW5kbGVTcXVhcmVDbGljayBmcm9tIFwiLi9pbmRleFwiO1xuaW1wb3J0IHsgZGlzcGxheUhvdmVyIH0gZnJvbSBcIi4vcGxhY2VtZW50XCI7XG5cbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1jb250YWluZXJdXCIpO1xuXG5mdW5jdGlvbiBjcmVhdGVCb2FyZCgpIHtcbiAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IDExOyBpICs9IDEpIHtcbiAgICBmb3IgKGxldCBqID0gXCJhXCI7IGogIT09IFwia1wiOyBqID0gU3RyaW5nLmZyb21DaGFyQ29kZShqLmNoYXJDb2RlQXQoMCkgKyAxKSkge1xuICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwic3F1YXJlXCIpO1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoYCR7an0ke2l9YCk7XG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgaWYgKHNxdWFyZS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllci1ib2FyZFwiKSkgcmV0dXJuO1xuICAgICAgICBpZiAoc3F1YXJlLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29tcHV0ZXItYm9hcmRcIikpXG4gICAgICAgICAgaGFuZGxlU3F1YXJlQ2xpY2soaiwgaSk7XG4gICAgICAgIGlmIChzcXVhcmUucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJzZXR1cC1ib2FyZFwiKSkge1xuICAgICAgICAgIC8vIEF0dGVtcHQgUGxhY2UgU2hpcFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsICgpID0+IHtcbiAgICAgICAgaWYgKCFzcXVhcmUucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJzZXR1cC1ib2FyZFwiKSkgcmV0dXJuO1xuICAgICAgICBkaXNwbGF5SG92ZXIoaiwgaSk7XG4gICAgICB9KTtcbiAgICAgIGJvYXJkLmNsYXNzTGlzdC5hZGQoXCJib2FyZFwiKTtcbiAgICAgIGJvYXJkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBib2FyZDtcbn1cblxuZnVuY3Rpb24gcmVzZXQoKSB7XG4gIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUhlYWRlcigpIHtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgaGVhZGVyLnRleHRDb250ZW50ID0gXCJCYXR0bGVzaGlwXCI7XG4gIHJldHVybiBoZWFkZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvb3RlcigpIHtcbiAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgZm9vdGVyLnRleHRDb250ZW50ID0gXCJNYWRlIGJ5IFdpbGwgTW9yZXR6XCI7XG4gIHJldHVybiBmb290ZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRpdGxlKHRleHQpIHtcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB0aXRsZS5jbGFzc0xpc3QuYWRkKFwidGl0bGVcIik7XG4gIHRpdGxlLnRleHRDb250ZW50ID0gdGV4dDtcbiAgcmV0dXJuIHRpdGxlO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5R2FtZSgpIHtcbiAgcmVzZXQoKTtcblxuICBjb25zdCBoZWFkZXIgPSBjcmVhdGVIZWFkZXIoKTtcbiAgY29uc3QgZm9vdGVyID0gY3JlYXRlRm9vdGVyKCk7XG4gIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgY29uc3QgY29tcHV0ZXJUaXRsZSA9IGNyZWF0ZVRpdGxlKFwiQ29tcHV0ZXIncyBCb2FyZFwiKTtcbiAgY29uc3QgcGxheWVyVGl0bGUgPSBjcmVhdGVUaXRsZShcIllvdXIgQm9hcmRcIik7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICBjb21wdXRlckJvYXJkLmNsYXNzTGlzdC5hZGQoXCJjb21wdXRlci1ib2FyZFwiKTtcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICBwbGF5ZXJCb2FyZC5jbGFzc0xpc3QuYWRkKFwicGxheWVyLWJvYXJkXCIpO1xuXG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoY29tcHV0ZXJUaXRsZSk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoY29tcHV0ZXJCb2FyZCwgbnVsbCk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQocGxheWVyVGl0bGUpO1xuICBzZWN0aW9uLmFwcGVuZENoaWxkKHBsYXllckJvYXJkKTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNlY3Rpb24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheUdhbWVPdmVyKHRleHQpIHtcbiAgY29uc3QgcG9wVXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBwb3BVcC5jbGFzc0xpc3QuYWRkKFwicG9wLXVwXCIpO1xuXG4gIGNvbnN0IGdhbWVPdmVyVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGdhbWVPdmVyVGV4dC5jbGFzc0xpc3QuYWRkKFwiZ2FtZS1vdmVyLXRleHRcIik7XG4gIGdhbWVPdmVyVGV4dC50ZXh0Q29udGVudCA9IHRleHQ7XG5cbiAgY29uc3QgcmVwbGF5QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgcmVwbGF5QnV0dG9uLnRleHRDb250ZW50ID0gXCJSZXBsYXlcIjtcbiAgcmVwbGF5QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyZXBsYXktYnV0dG9uXCIpO1xuXG4gIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoXCJvdmVybGF5XCIpO1xuXG4gIHBvcFVwLmFwcGVuZENoaWxkKGdhbWVPdmVyVGV4dCk7XG4gIHBvcFVwLmFwcGVuZENoaWxkKHJlcGxheUJ1dHRvbik7XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKG92ZXJsYXkpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQocG9wVXApO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTaGlwKHNxdWFyZUFtb3VudCwgY2xhc3NOYW1lKSB7XG4gIGNvbnN0IHNoaXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBzaGlwLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgc2hpcC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcXVhcmVBbW91bnQ7IGkrKykge1xuICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2hpcC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICB9XG4gIHJldHVybiBzaGlwO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5U2V0dXAoKSB7XG4gIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUhlYWRlcigpO1xuICBjb25zdCBmb290ZXIgPSBjcmVhdGVGb290ZXIoKTtcbiAgY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICBjb25zdCB0aXRsZSA9IGNyZWF0ZVRpdGxlKFwiUGxhY2UgWW91ciBTaGlwcyFcIik7XG4gIGNvbnN0IGJvYXJkID0gY3JlYXRlQm9hcmQoKTtcbiAgYm9hcmQuY2xhc3NMaXN0LmFkZChcInNldHVwLWJvYXJkXCIpO1xuXG4gIGNvbnN0IHNoaXBzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc2hpcHNDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInNoaXBzLWNvbnRhaW5lclwiKTtcblxuICBjb25zdCBhaXJjcmFmdENhcnJpZXIgPSBjcmVhdGVTaGlwKDUsIFwiYWlyY3JhZnQtY2FycmllclwiKTtcbiAgY29uc3QgYmF0dGxlc2hpcCA9IGNyZWF0ZVNoaXAoNCwgXCJiYXR0bGVzaGlwXCIpO1xuICBjb25zdCBzdWJtYXJpbmUgPSBjcmVhdGVTaGlwKDMsIFwic3VibWFyaW5lXCIpO1xuICBjb25zdCBkZXN0cm95ZXIgPSBjcmVhdGVTaGlwKDMsIFwiZGVzdHJveWVyXCIpO1xuICBjb25zdCBwYXRyb2xCb2F0ID0gY3JlYXRlU2hpcCgyLCBcInBhdHJvbC1ib2F0XCIpO1xuXG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQodGl0bGUpO1xuICBzZWN0aW9uLmFwcGVuZENoaWxkKGJvYXJkKTtcblxuICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChhaXJjcmFmdENhcnJpZXIpO1xuICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChiYXR0bGVzaGlwKTtcbiAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQoc3VibWFyaW5lKTtcbiAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQoZGVzdHJveWVyKTtcbiAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQocGF0cm9sQm9hdCk7XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWN0aW9uKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNoaXBzQ29udGFpbmVyKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZvb3Rlcik7XG59XG5cbmV4cG9ydCB7IGRpc3BsYXlHYW1lLCBkaXNwbGF5U2V0dXAsIGRpc3BsYXlHYW1lT3ZlciB9O1xuIiwiY29uc3Qgc2hpcCA9IChsZW4pID0+ICh7XG4gIGxlbmd0aDogbGVuLFxuICBoaXRzOiAwLFxuICBoaXQoKSB7XG4gICAgdGhpcy5oaXRzICs9IDE7XG4gIH0sXG4gIGlzU3VuaygpIHtcbiAgICBpZiAodGhpcy5oaXRzID09PSB0aGlzLmxlbmd0aCkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxufSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkKCkge1xuICBjb25zdCBib2FyZCA9IFtdO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IDExOyBpKyspIHtcbiAgICBjb25zdCBjb2x1bW4gPSB7fTtcbiAgICBPYmplY3QuYXNzaWduKGNvbHVtbiwge1xuICAgICAgY29sdW1uOiBpLFxuICAgICAgcm93OiBbXG4gICAgICAgIHsgcG9zaXRpb246IGBhJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBiJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBjJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBkJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBlJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBmJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBnJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBoJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBpJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBqJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICBdLFxuICAgIH0pO1xuICAgIGJvYXJkLnB1c2goY29sdW1uKTtcbiAgfVxuICByZXR1cm4gYm9hcmQ7XG59XG5cbmNvbnN0IGdhbWVCb2FyZCA9ICgpID0+ICh7XG4gIGJvYXJkOiBjcmVhdGVCb2FyZCgpLFxuICBmaW5kU3F1YXJlKGNvbCwgcm93KSB7XG4gICAgY29uc3Qgc3F1YXJlID0gdGhpcy5ib2FyZFtyb3cgLSAxXS5yb3cuZmlsdGVyKChvYmopID0+IHtcbiAgICAgIHJldHVybiBvYmoucG9zaXRpb24gPT09IGAke2NvbH0ke3Jvd31gO1xuICAgIH0pO1xuICAgIHJldHVybiBzcXVhcmU7XG4gIH0sXG4gIGNoZWNrUG9zaXRpb24oY29sLCByb3cpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBjb25zdCBzcXVhcmUgPSB0aGlzLmZpbmRTcXVhcmUoY29sLCByb3cpO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gc3F1YXJlWzBdLnBvc2l0aW9uO1xuICAgIGNvbnN0IGhhc1NoaXAgPSBzcXVhcmVbMF0uaGFzU2hpcDtcbiAgICBPYmplY3QuYXNzaWduKHJlc3VsdCwgeyBwb3NpdGlvbiwgaGFzU2hpcCB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuICBzaGlwczogW10sXG4gIHBsYWNlU2hpcChzdGFydENvbCwgZW5kQ29sLCBzdGFydFJvdywgZW5kUm93LCBuYW1lKSB7XG4gICAgbGV0IGxlbmd0aCA9IDA7XG4gICAgbGV0IG9jY3VwaWVkU3F1YXJlcyA9IFtdO1xuICAgIGlmIChzdGFydFJvdyAhPT0gZW5kUm93KSB7XG4gICAgICBmb3IgKGxldCBpID0gc3RhcnRSb3c7IGkgPCBlbmRSb3cgKyAxOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gdGhpcy5maW5kU3F1YXJlKHN0YXJ0Q29sLCBpKTtcbiAgICAgICAgc3F1YXJlWzBdLmhhc1NoaXAgPSB0cnVlO1xuICAgICAgICBsZW5ndGggKz0gMTtcbiAgICAgICAgb2NjdXBpZWRTcXVhcmVzLnB1c2goYCR7c3RhcnRDb2x9JHtpfWApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgY3VycmVudENvbCA9IHN0YXJ0Q29sO1xuICAgICAgd2hpbGUgKGN1cnJlbnRDb2wgIT09IFN0cmluZy5mcm9tQ2hhckNvZGUoZW5kQ29sLmNoYXJDb2RlQXQoMCkgKyAxKSkge1xuICAgICAgICBjb25zdCBzcXVhcmUgPSB0aGlzLmZpbmRTcXVhcmUoY3VycmVudENvbCwgc3RhcnRSb3cpO1xuICAgICAgICBzcXVhcmVbMF0uaGFzU2hpcCA9IHRydWU7XG4gICAgICAgIG9jY3VwaWVkU3F1YXJlcy5wdXNoKGAke2N1cnJlbnRDb2x9JHtzdGFydFJvd31gKTtcbiAgICAgICAgY3VycmVudENvbCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY3VycmVudENvbC5jaGFyQ29kZUF0KDApICsgMSk7XG4gICAgICAgIGxlbmd0aCArPSAxO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNoaXBzLnB1c2goe1xuICAgICAgc3F1YXJlczogb2NjdXBpZWRTcXVhcmVzLFxuICAgICAgbmFtZSxcbiAgICAgIG9iajogc2hpcChsZW5ndGgpLFxuICAgIH0pO1xuICB9LFxuICBhdHRhY2tzOiBbXSxcbiAgdHJhY2tBdHRhY2socG9zaXRpb24sIGF0dGFja0hpdCwgc2Fua1NoaXApIHtcbiAgICB0aGlzLmF0dGFja3MucHVzaCh7IHBvc2l0aW9uLCBhdHRhY2tIaXQsIHNhbmtTaGlwIH0pO1xuICB9LFxuICBhbGxTaGlwc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuc2hpcHMubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgbGV0IHNoaXBzU3VuayA9IDA7XG4gICAgdGhpcy5hdHRhY2tzLmZvckVhY2goKGF0dGFjaykgPT4ge1xuICAgICAgaWYgKGF0dGFjay5zYW5rU2hpcCkgc2hpcHNTdW5rICs9IDE7XG4gICAgfSk7XG4gICAgaWYgKHNoaXBzU3VuayA+PSB0aGlzLnNoaXBzLmxlbmd0aCkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuICBpc1JlcGVhdGVkQXR0YWNrKGNvbCwgcm93KSB7XG4gICAgbGV0IHJlcGVhdCA9IGZhbHNlO1xuICAgIHRoaXMuYXR0YWNrcy5mb3JFYWNoKChhdHRhY2spID0+IHtcbiAgICAgIGlmIChhdHRhY2sucG9zaXRpb24gPT09IGAke2NvbH0ke3Jvd31gKSB7XG4gICAgICAgIHJlcGVhdCA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVwZWF0O1xuICB9LFxuICByZWNlaXZlQXR0YWNrKGNvbCwgcm93KSB7XG4gICAgaWYgKHRoaXMuaXNSZXBlYXRlZEF0dGFjayhjb2wsIHJvdykpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgbGV0IGF0dGFja2VkU2hpcCA9IGZhbHNlO1xuICAgIHRoaXMuc2hpcHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5zcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgICAgICBpZiAoc3F1YXJlID09PSBgJHtjb2x9JHtyb3d9YCkgYXR0YWNrZWRTaGlwID0gaXRlbTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmIChhdHRhY2tlZFNoaXApIHtcbiAgICAgIGF0dGFja2VkU2hpcC5vYmouaGl0KCk7XG4gICAgICB0aGlzLnRyYWNrQXR0YWNrKGAke2NvbH0ke3Jvd31gLCB0cnVlLCBhdHRhY2tlZFNoaXAub2JqLmlzU3VuaygpKTtcbiAgICAgIHJldHVybiBhdHRhY2tlZFNoaXAubmFtZTtcbiAgICB9XG4gICAgdGhpcy50cmFja0F0dGFjayhgJHtjb2x9JHtyb3d9YCwgZmFsc2UsIGZhbHNlKTtcbiAgICByZXR1cm4gYCR7Y29sfSR7cm93fWA7XG4gIH0sXG59KTtcblxuZXhwb3J0IHsgc2hpcCwgZ2FtZUJvYXJkIH07XG4iLCJpbXBvcnQgeyBkaXNwbGF5R2FtZSwgZGlzcGxheUdhbWVPdmVyLCBkaXNwbGF5U2V0dXAgfSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5pbXBvcnQgeyBnYW1lQm9hcmQgfSBmcm9tIFwiLi9nYW1lXCI7XG5pbXBvcnQgeyBjaG9vc2VTcXVhcmUsIHJhbmRvbVNoaXBBcnJheSB9IGZyb20gXCIuL2NvbXB1dGVyXCI7XG5pbXBvcnQgeyBzZXRBY3RpdmVTaGlwTGVuZ3RoIH0gZnJvbSBcIi4vcGxhY2VtZW50XCI7XG5cbmNvbnN0IHBsYXllckJvYXJkID0gZ2FtZUJvYXJkKCk7XG5jb25zdCBjb21wdXRlckJvYXJkID0gZ2FtZUJvYXJkKCk7XG5sZXQgZ2FtZUFjdGl2ZSA9IHRydWU7XG5cbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkRnJvbUFycmF5KHNoaXBzLCBib2FyZCwgYm9hcmRUeXBlKSB7XG4gIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBsZXQgZmlyc3QgPSB1bmRlZmluZWQ7XG4gICAgbGV0IG5hbWUgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgc2hpcC5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICAgIGlmIChuYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbmFtZSA9IHNxdWFyZS5uYW1lO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoZmlyc3QgPT09IHVuZGVmaW5lZCkgZmlyc3QgPSB7IGNvbDogc3F1YXJlLmNvbCwgcm93OiBzcXVhcmUucm93IH07XG4gICAgICBsYXN0ID0geyBjb2w6IHNxdWFyZS5jb2wsIHJvdzogc3F1YXJlLnJvdyB9O1xuICAgICAgLy8gRGlzcGxheSBXaGVyZSBTaGlwcyBBcmVcbiAgICAgIGlmIChib2FyZFR5cGUgPT09IFwicGxheWVyXCIpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50XG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLWJvYXJkXCIpXG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC4ke3NxdWFyZS5jb2x9JHtzcXVhcmUucm93fWApO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGJvYXJkLnBsYWNlU2hpcChmaXJzdC5jb2wsIGxhc3QuY29sLCBmaXJzdC5yb3csIGxhc3Qucm93LCBuYW1lKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXQocGxheWVyU2hpcHMsIGNvbXB1dGVyU2hpcHMpIHtcbiAgY3JlYXRlQm9hcmRGcm9tQXJyYXkocmFuZG9tU2hpcEFycmF5KCksIHBsYXllckJvYXJkLCBcInBsYXllclwiKTtcbiAgY3JlYXRlQm9hcmRGcm9tQXJyYXkocmFuZG9tU2hpcEFycmF5KCksIGNvbXB1dGVyQm9hcmQsIFwiY29tcHV0ZXJcIik7XG59XG5cbmZ1bmN0aW9uIG1hcmtTcXVhcmUoYm9hcmQsIGNvbCwgcm93LCBib2FyZFR5cGUpIHtcbiAgYm9hcmQucmVjZWl2ZUF0dGFjayhjb2wsIHJvdyk7XG4gIGlmIChib2FyZC5hdHRhY2tzW2JvYXJkLmF0dGFja3MubGVuZ3RoIC0gMV0uYXR0YWNrSGl0KSB7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHtib2FyZFR5cGV9LWJvYXJkYClcbiAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHtjb2x9JHtyb3d9YClcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihgLiR7Ym9hcmRUeXBlfS1ib2FyZGApXG4gICAgICAucXVlcnlTZWxlY3RvcihgLiR7Y29sfSR7cm93fWApXG4gICAgICAuY2xhc3NMaXN0LmFkZChcIm1pc3NlZFwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlbmRHYW1lKHRleHQpIHtcbiAgZ2FtZUFjdGl2ZSA9IGZhbHNlO1xuICBkaXNwbGF5R2FtZU92ZXIodGV4dCk7XG59XG5cbi8vIEFkdmFuY2VzIEdhbWVcbmZ1bmN0aW9uIGhhbmRsZVNxdWFyZUNsaWNrKGNvbCwgcm93KSB7XG4gIGlmICghZ2FtZUFjdGl2ZSB8fCBjb21wdXRlckJvYXJkLmlzUmVwZWF0ZWRBdHRhY2soY29sLCByb3cpKSByZXR1cm47XG5cbiAgbWFya1NxdWFyZShjb21wdXRlckJvYXJkLCBjb2wsIHJvdywgXCJjb21wdXRlclwiKTtcbiAgaWYgKGNvbXB1dGVyQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICBlbmRHYW1lKFwiWW91IFdpbiFcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgY29tcHV0ZXJDaG9pY2UgPSBjaG9vc2VTcXVhcmUocGxheWVyQm9hcmQpO1xuICBtYXJrU3F1YXJlKHBsYXllckJvYXJkLCBjb21wdXRlckNob2ljZS5jb2wsIGNvbXB1dGVyQ2hvaWNlLnJvdywgXCJwbGF5ZXJcIik7XG4gIGlmIChwbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgIGVuZEdhbWUoXCJUaGUgQ29tcHV0ZXIgV29uXCIpO1xuICAgIHJldHVybjtcbiAgfVxufVxuXG4vLyBkaXNwbGF5R2FtZSgpO1xuLy8gaW5pdCgpO1xuZGlzcGxheVNldHVwKCk7XG5cbmNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwXCIpO1xuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgLy8gVG9nZ2xlIE9mZlxuICAgIGlmIChzaGlwLmNsYXNzTGlzdC5jb250YWlucyhcInNlbGVjdGVkXCIpKSB7XG4gICAgICBzaGlwLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gRGVzZWxlY3QgT3RoZXIgU2hpcHNcbiAgICBzaGlwcy5mb3JFYWNoKChhU2hpcCkgPT4gYVNoaXAuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpKTtcbiAgICAvLyBTZWxlY3QgU2hpcFxuICAgIHNoaXAuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xuICAgIHNldEFjdGl2ZVNoaXBMZW5ndGgoc2hpcC5jaGlsZHJlbi5sZW5ndGgpO1xuICB9KTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVTcXVhcmVDbGljaztcbiIsImxldCBhY3RpdmVTaGlwTGVuZ3RoID0gMDtcbmxldCBkaXJlY3Rpb24gPSBcImNvbFNwYW5cIjtcbmxldCBwbGFjZW1lbnRWYWxpZCA9IHRydWU7XG5cbmZ1bmN0aW9uIHNldEFjdGl2ZVNoaXBMZW5ndGgobGVuZ3RoKSB7XG4gIGFjdGl2ZVNoaXBMZW5ndGggPSBsZW5ndGg7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZURpcmVjdGlvbigpIHtcbiAgZGlyZWN0aW9uID09PSBcInJvd1NwYW5cIiA/IChkaXJlY3Rpb24gPSBcImNvbFNwYW5cIikgOiAoZGlyZWN0aW9uID0gXCJyb3dTcGFuXCIpO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5SG92ZXIoY29sLCByb3cpIHtcbiAgbGV0IGN1cnJlbnRDb2wgPSBjb2w7XG4gIGxldCBjdXJyZW50Um93ID0gcm93O1xuICBsZXQgaXRlcmF0aW9uc0xlZnQgPSBhY3RpdmVTaGlwTGVuZ3RoO1xuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaG92ZXJlZFwiKS5mb3JFYWNoKChob3ZlcmVkKSA9PiB7XG4gICAgaG92ZXJlZC5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJlZFwiKTtcbiAgfSk7XG5cbiAgd2hpbGUgKGl0ZXJhdGlvbnNMZWZ0ID4gMCkge1xuICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2N1cnJlbnRDb2x9JHtjdXJyZW50Um93fWApO1xuICAgIGlmIChzcXVhcmUgPT09IG51bGwpIHtcbiAgICAgIHBsYWNlbWVudFZhbGlkID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcImhvdmVyZWRcIik7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJyb3dTcGFuXCIpIGN1cnJlbnRSb3cgKz0gMTtcbiAgICBlbHNlIGN1cnJlbnRDb2wgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGN1cnJlbnRDb2wuY2hhckNvZGVBdCgwKSArIDEpO1xuXG4gICAgaXRlcmF0aW9uc0xlZnQgLT0gMTtcbiAgfVxufVxuXG5leHBvcnQgeyBzZXRBY3RpdmVTaGlwTGVuZ3RoLCB0b2dnbGVEaXJlY3Rpb24sIGRpc3BsYXlIb3ZlciB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJnZXRQb3NzaWJsZUNob2ljZXMiLCJib2FyZCIsInBvc3NpYmxlU3F1YXJlcyIsImkiLCJqIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiY2hhckNvZGVBdCIsImlzUmVwZWF0ZWRBdHRhY2siLCJwdXNoIiwicm93IiwiY29sIiwiY2hvb3NlU3F1YXJlIiwic3F1YXJlcyIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImxlbmd0aCIsInJhbmRvbVNoaXBBcnJheSIsInNoaXBMZW5ndGhzIiwic2hpcE5hbWVzIiwic2hpcHMiLCJfbG9vcCIsInZhbGlkUGxhY2VtZW50IiwiZGlyZWN0aW9uIiwic3RhcnRSb3ciLCJjZWlsIiwic3RhcnRDb2wiLCJjdXJyZW50U2hpcCIsIm5hbWUiLCJjdXJyZW50Q29sIiwiY3VycmVudFJvdyIsImZvckVhY2giLCJzaGlwIiwicG9wIiwiaGFuZGxlU3F1YXJlQ2xpY2siLCJkaXNwbGF5SG92ZXIiLCJjb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVCb2FyZCIsImNyZWF0ZUVsZW1lbnQiLCJfbG9vcDIiLCJzcXVhcmUiLCJjbGFzc0xpc3QiLCJhZGQiLCJjb25jYXQiLCJhZGRFdmVudExpc3RlbmVyIiwicGFyZW50RWxlbWVudCIsImNvbnRhaW5zIiwiYXBwZW5kQ2hpbGQiLCJyZXNldCIsInRleHRDb250ZW50IiwiY3JlYXRlSGVhZGVyIiwiaGVhZGVyIiwiY3JlYXRlRm9vdGVyIiwiZm9vdGVyIiwiY3JlYXRlVGl0bGUiLCJ0ZXh0IiwidGl0bGUiLCJkaXNwbGF5R2FtZSIsInNlY3Rpb24iLCJjb21wdXRlclRpdGxlIiwicGxheWVyVGl0bGUiLCJjb21wdXRlckJvYXJkIiwicGxheWVyQm9hcmQiLCJkaXNwbGF5R2FtZU92ZXIiLCJwb3BVcCIsImdhbWVPdmVyVGV4dCIsInJlcGxheUJ1dHRvbiIsIm92ZXJsYXkiLCJjcmVhdGVTaGlwIiwic3F1YXJlQW1vdW50IiwiY2xhc3NOYW1lIiwiZGlzcGxheVNldHVwIiwic2hpcHNDb250YWluZXIiLCJhaXJjcmFmdENhcnJpZXIiLCJiYXR0bGVzaGlwIiwic3VibWFyaW5lIiwiZGVzdHJveWVyIiwicGF0cm9sQm9hdCIsImxlbiIsImhpdHMiLCJoaXQiLCJpc1N1bmsiLCJjb2x1bW4iLCJPYmplY3QiLCJhc3NpZ24iLCJwb3NpdGlvbiIsImhhc1NoaXAiLCJnYW1lQm9hcmQiLCJmaW5kU3F1YXJlIiwiZmlsdGVyIiwib2JqIiwiY2hlY2tQb3NpdGlvbiIsInJlc3VsdCIsInBsYWNlU2hpcCIsImVuZENvbCIsImVuZFJvdyIsIm9jY3VwaWVkU3F1YXJlcyIsImF0dGFja3MiLCJ0cmFja0F0dGFjayIsImF0dGFja0hpdCIsInNhbmtTaGlwIiwiYWxsU2hpcHNTdW5rIiwic2hpcHNTdW5rIiwiYXR0YWNrIiwicmVwZWF0IiwicmVjZWl2ZUF0dGFjayIsInVuZGVmaW5lZCIsImF0dGFja2VkU2hpcCIsIml0ZW0iLCJzZXRBY3RpdmVTaGlwTGVuZ3RoIiwiZ2FtZUFjdGl2ZSIsImNyZWF0ZUJvYXJkRnJvbUFycmF5IiwiYm9hcmRUeXBlIiwiZmlyc3QiLCJsYXN0IiwiZWxlbWVudCIsImluaXQiLCJwbGF5ZXJTaGlwcyIsImNvbXB1dGVyU2hpcHMiLCJtYXJrU3F1YXJlIiwiZW5kR2FtZSIsImNvbXB1dGVyQ2hvaWNlIiwicXVlcnlTZWxlY3RvckFsbCIsInJlbW92ZSIsImFTaGlwIiwiY2hpbGRyZW4iLCJhY3RpdmVTaGlwTGVuZ3RoIiwicGxhY2VtZW50VmFsaWQiLCJ0b2dnbGVEaXJlY3Rpb24iLCJpdGVyYXRpb25zTGVmdCIsImhvdmVyZWQiXSwic291cmNlUm9vdCI6IiJ9
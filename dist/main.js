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
        if (square.parentElement.classList.contains("computer-board")) (0,_index__WEBPACK_IMPORTED_MODULE_0__.handleSquareClick)(j, i);
        if (square.parentElement.classList.contains("setup-board")) {
          (0,_placement__WEBPACK_IMPORTED_MODULE_1__.placeShip)(j, i);
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
  replayButton.addEventListener("click", function () {
    displaySetup();
    (0,_placement__WEBPACK_IMPORTED_MODULE_1__.resetPlacement)();
  });
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
  ship.classList.add("placementShip");
  for (var i = 0; i < squareAmount; i++) {
    var square = document.createElement("div");
    ship.appendChild(square);
  }
  return ship;
}
function displaySetup() {
  reset();
  var header = createHeader();
  var footer = createFooter();
  var section = document.createElement("section");
  var title = createTitle("Place Your Ships!");
  var board = createBoard();
  board.classList.add("setup-board");
  var buttons = document.createElement("div");
  buttons.classList.add("buttons");
  var rotateButton = document.createElement("button");
  rotateButton.textContent = "Rotate (r)";
  rotateButton.classList.add("rotate-button");
  rotateButton.addEventListener("click", function () {
    (0,_placement__WEBPACK_IMPORTED_MODULE_1__.toggleDirection)();
  });
  var resetButton = document.createElement("button");
  resetButton.textContent = "Reset";
  resetButton.classList.add("reset-button");
  resetButton.addEventListener("click", function () {
    container.textContent = "";
    displaySetup();
    (0,_placement__WEBPACK_IMPORTED_MODULE_1__.resetPlacement)();
  });
  var shipsContainer = document.createElement("div");
  shipsContainer.classList.add("ships-container");
  var aircraftCarrier = createShip(5, "aircraft-carrier");
  var battleship = createShip(4, "battleship");
  var submarine = createShip(3, "submarine");
  var destroyer = createShip(3, "destroyer");
  var patrolBoat = createShip(2, "patrol-boat");
  section.appendChild(title);
  section.appendChild(board);
  buttons.appendChild(rotateButton);
  buttons.appendChild(resetButton);
  shipsContainer.appendChild(aircraftCarrier);
  shipsContainer.appendChild(battleship);
  shipsContainer.appendChild(submarine);
  shipsContainer.appendChild(destroyer);
  shipsContainer.appendChild(patrolBoat);
  container.appendChild(header);
  container.appendChild(section);
  container.appendChild(buttons);
  container.appendChild(shipsContainer);
  container.appendChild(footer);
  (0,_index__WEBPACK_IMPORTED_MODULE_0__.handlePlacementShips)();
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
/* harmony export */   "handlePlacementShips": () => (/* binding */ handlePlacementShips),
/* harmony export */   "handleSquareClick": () => (/* binding */ handleSquareClick)
/* harmony export */ });
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display */ "./src/display.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* harmony import */ var _computer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computer */ "./src/computer.js");
/* harmony import */ var _placement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./placement */ "./src/placement.js");




var playerBoard;
var computerBoard;
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
  (0,_display__WEBPACK_IMPORTED_MODULE_0__.displayGame)();
  playerBoard = (0,_game__WEBPACK_IMPORTED_MODULE_1__.gameBoard)();
  createBoardFromArray(playerShips, playerBoard, "player");
  computerBoard = (0,_game__WEBPACK_IMPORTED_MODULE_1__.gameBoard)();
  createBoardFromArray(computerShips, computerBoard, "computer");
}
function markSquare(board, col, row, boardType) {
  board.receiveAttack(col, row);
  if (board.attacks[board.attacks.length - 1].attackHit) {
    document.querySelector(".".concat(boardType, "-board")).querySelector(".".concat(col).concat(row)).classList.add("hit");
  } else {
    document.querySelector(".".concat(boardType, "-board")).querySelector(".".concat(col).concat(row)).classList.add("missed");
  }
}

// Advances Game
function handleSquareClick(col, row) {
  if (computerBoard.isRepeatedAttack(col, row)) return;
  markSquare(computerBoard, col, row, "computer");
  if (computerBoard.allShipsSunk()) {
    (0,_display__WEBPACK_IMPORTED_MODULE_0__.displayGameOver)("You Won");
    return;
  }
  var computerChoice = (0,_computer__WEBPACK_IMPORTED_MODULE_2__.chooseSquare)(playerBoard);
  markSquare(playerBoard, computerChoice.col, computerChoice.row, "player");
  if (playerBoard.allShipsSunk()) {
    (0,_display__WEBPACK_IMPORTED_MODULE_0__.displayGameOver)("The Computer Won");
    return;
  }
}
document.addEventListener("placementComplete", function (e) {
  init(e.detail.playerArray, (0,_computer__WEBPACK_IMPORTED_MODULE_2__.randomShipArray)());
});
function handlePlacementShips() {
  var ships = document.querySelectorAll(".placementShip");
  ships.forEach(function (ship) {
    ship.addEventListener("click", function () {
      // Toggle Off
      if (ship.classList.contains("selected")) {
        ship.classList.remove("selected");
        (0,_placement__WEBPACK_IMPORTED_MODULE_3__.setActiveShip)(0, "");
        return;
      }
      // Deselect Other Ships
      ships.forEach(function (aShip) {
        return aShip.classList.remove("selected");
      });
      // Select Ship
      ship.classList.add("selected");
      (0,_placement__WEBPACK_IMPORTED_MODULE_3__.setActiveShip)(ship.children.length, ship.classList[0]);
    });
  });
}
window.addEventListener("keydown", function (e) {
  if (e.key === "r") (0,_placement__WEBPACK_IMPORTED_MODULE_3__.toggleDirection)();
});
(0,_display__WEBPACK_IMPORTED_MODULE_0__.displaySetup)();


/***/ }),

/***/ "./src/placement.js":
/*!**************************!*\
  !*** ./src/placement.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayHover": () => (/* binding */ displayHover),
/* harmony export */   "placeShip": () => (/* binding */ placeShip),
/* harmony export */   "resetPlacement": () => (/* binding */ resetPlacement),
/* harmony export */   "setActiveShip": () => (/* binding */ setActiveShip),
/* harmony export */   "toggleDirection": () => (/* binding */ toggleDirection)
/* harmony export */ });
var activeShipLength = 0;
var activeShipName = "";
var direction = "colSpan";
var placementValid = false;
function setActiveShip(length, name) {
  activeShipLength = length;
  activeShipName = name;
}
function clearHovered() {
  document.querySelectorAll(".hovered").forEach(function (hovered) {
    hovered.classList.remove("hovered");
  });
}
var startCol = "";
var startRow = "";
function toggleDirection() {
  direction === "rowSpan" ? direction = "colSpan" : direction = "rowSpan";
  displayHover(startCol, startRow);
}
function displayHover(col, row) {
  if (col === "" || row === "") return;
  if (document.querySelector(".selected") === null) return;
  startCol = col;
  var currentCol = col;
  startRow = row;
  var currentRow = row;
  var iterationsLeft = activeShipLength;
  clearHovered();
  while (iterationsLeft > 0) {
    var square = document.querySelector(".".concat(currentCol).concat(currentRow));
    if (square === null) {
      placementValid = false;
      break;
    }
    if (square.classList.contains("ship")) {
      placementValid = false;
      break;
    }
    square.classList.add("hovered");
    if (direction === "rowSpan") currentRow += 1;else currentCol = String.fromCharCode(currentCol.charCodeAt(0) + 1);
    iterationsLeft -= 1;
  }
  if (iterationsLeft === 0) placementValid = true;
}
var playerArray = [];
function resetPlacement() {
  playerArray.length = 0;
}
function placeShip(col, row) {
  if (!placementValid) return;
  var shipArray = [{
    name: activeShipName
  }];
  var currentCol = col;
  var currentRow = row;
  var iterationsLeft = activeShipLength;
  while (iterationsLeft > 0) {
    shipArray.push({
      col: currentCol,
      row: currentRow
    });
    var square = document.querySelector(".".concat(currentCol).concat(currentRow));
    square.classList.add("ship");
    if (direction === "rowSpan") currentRow += 1;else currentCol = String.fromCharCode(currentCol.charCodeAt(0) + 1);
    iterationsLeft -= 1;
  }
  playerArray.push(shipArray);
  clearHovered();
  document.querySelector(".selected").remove();
  placementValid = false;

  // If all ships are placed init the game
  if (document.querySelector(".placementShip") === null) {
    var event = new CustomEvent("placementComplete", {
      detail: {
        playerArray: playerArray
      },
      bubbles: true,
      cancelable: true,
      composed: false
    });
    document.querySelector("[data-container]").dispatchEvent(event);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wdXRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBnZXRQb3NzaWJsZUNob2ljZXMoYm9hcmQpIHtcbiAgY29uc3QgcG9zc2libGVTcXVhcmVzID0gW107XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgMTE7IGkrKykge1xuICAgIGZvciAobGV0IGogPSBcImFcIjsgaiAhPT0gXCJrXCI7IGogPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGouY2hhckNvZGVBdCgwKSArIDEpKSB7XG4gICAgICBpZiAoIWJvYXJkLmlzUmVwZWF0ZWRBdHRhY2soaiwgaSkpXG4gICAgICAgIHBvc3NpYmxlU3F1YXJlcy5wdXNoKHsgcm93OiBpLCBjb2w6IGogfSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBwb3NzaWJsZVNxdWFyZXM7XG59XG5cbmZ1bmN0aW9uIGNob29zZVNxdWFyZShib2FyZCkge1xuICBjb25zdCBzcXVhcmVzID0gZ2V0UG9zc2libGVDaG9pY2VzKGJvYXJkKTtcbiAgcmV0dXJuIHNxdWFyZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc3F1YXJlcy5sZW5ndGgpXTtcbn1cblxuZnVuY3Rpb24gcmFuZG9tU2hpcEFycmF5KCkge1xuICBjb25zdCBzaGlwTGVuZ3RocyA9IFsyLCAzLCAzLCA0LCA1XTtcbiAgY29uc3Qgc2hpcE5hbWVzID0gW1xuICAgIFwiUGF0cm9sIEJvYXRcIixcbiAgICBcIlN1Ym1hcmluZVwiLFxuICAgIFwiRGVzdHJveWVyXCIsXG4gICAgXCJCYXR0bGVTaGlwXCIsXG4gICAgXCJBaXJjcmFmdCBDYXJyaWVyXCIsXG4gIF07XG4gIGNvbnN0IHNoaXBzID0gW107XG4gIHdoaWxlIChzaGlwTGVuZ3Rocy5sZW5ndGggPiAwKSB7XG4gICAgbGV0IHZhbGlkUGxhY2VtZW50ID0gdHJ1ZTtcbiAgICBjb25zdCBkaXJlY3Rpb24gPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gXCJyb3dTcGFuXCIgOiBcImNvbFNwYW5cIjtcblxuICAgIGNvbnN0IHN0YXJ0Um93ID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgY29uc3Qgc3RhcnRDb2wgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDk2ICsgTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAxMCkpO1xuXG4gICAgY29uc3QgY3VycmVudFNoaXAgPSBbeyBuYW1lOiBzaGlwTmFtZXNbc2hpcE5hbWVzLmxlbmd0aCAtIDFdIH1dO1xuXG4gICAgbGV0IGN1cnJlbnRDb2wgPSBzdGFydENvbDtcbiAgICBsZXQgY3VycmVudFJvdyA9IHN0YXJ0Um93O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3Roc1tzaGlwTGVuZ3Rocy5sZW5ndGggLSAxXTsgaSsrKSB7XG4gICAgICAvLyBPdXQgb2YgQm91bmRzXG4gICAgICBpZiAoY3VycmVudFJvdyA9PT0gMTEpIHtcbiAgICAgICAgdmFsaWRQbGFjZW1lbnQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudENvbCA9PT0gXCJrXCIpIHtcbiAgICAgICAgdmFsaWRQbGFjZW1lbnQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIC8vIE92ZXJsYXBcbiAgICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCBzaGlwLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnRDb2wgPT09IHNoaXBbal0uY29sICYmIGN1cnJlbnRSb3cgPT09IHNoaXBbal0ucm93KSB7XG4gICAgICAgICAgICB2YWxpZFBsYWNlbWVudCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKCF2YWxpZFBsYWNlbWVudCkgYnJlYWs7XG4gICAgICBjdXJyZW50U2hpcC5wdXNoKHsgY29sOiBjdXJyZW50Q29sLCByb3c6IGN1cnJlbnRSb3cgfSk7XG4gICAgICAvLyBJbmNyZW1lbnRcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwicm93U3BhblwiKSBjdXJyZW50Um93ICs9IDE7XG4gICAgICBlbHNlIGN1cnJlbnRDb2wgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGN1cnJlbnRDb2wuY2hhckNvZGVBdCgwKSArIDEpO1xuICAgIH1cblxuICAgIGlmICh2YWxpZFBsYWNlbWVudCkge1xuICAgICAgc2hpcHMucHVzaChjdXJyZW50U2hpcCk7XG4gICAgICBzaGlwTGVuZ3Rocy5wb3AoKTtcbiAgICAgIHNoaXBOYW1lcy5wb3AoKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHNoaXBzO1xufVxuXG5leHBvcnQgeyBjaG9vc2VTcXVhcmUsIGdldFBvc3NpYmxlQ2hvaWNlcywgcmFuZG9tU2hpcEFycmF5IH07XG4iLCJpbXBvcnQgeyBoYW5kbGVTcXVhcmVDbGljaywgaGFuZGxlUGxhY2VtZW50U2hpcHMgfSBmcm9tIFwiLi9pbmRleFwiO1xuaW1wb3J0IHtcbiAgZGlzcGxheUhvdmVyLFxuICBwbGFjZVNoaXAsXG4gIHRvZ2dsZURpcmVjdGlvbixcbiAgcmVzZXRQbGFjZW1lbnQsXG59IGZyb20gXCIuL3BsYWNlbWVudFwiO1xuXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtY29udGFpbmVyXVwiKTtcblxuZnVuY3Rpb24gY3JlYXRlQm9hcmQoKSB7XG4gIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMTsgaSArPSAxKSB7XG4gICAgZm9yIChsZXQgaiA9IFwiYVwiOyBqICE9PSBcImtcIjsgaiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoai5jaGFyQ29kZUF0KDApICsgMSkpIHtcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInNxdWFyZVwiKTtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGAke2p9JHtpfWApO1xuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmIChzcXVhcmUucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXItYm9hcmRcIikpIHJldHVybjtcbiAgICAgICAgaWYgKHNxdWFyZS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImNvbXB1dGVyLWJvYXJkXCIpKVxuICAgICAgICAgIGhhbmRsZVNxdWFyZUNsaWNrKGosIGkpO1xuICAgICAgICBpZiAoc3F1YXJlLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2V0dXAtYm9hcmRcIikpIHtcbiAgICAgICAgICBwbGFjZVNoaXAoaiwgaSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoIXNxdWFyZS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcInNldHVwLWJvYXJkXCIpKSByZXR1cm47XG4gICAgICAgIGRpc3BsYXlIb3ZlcihqLCBpKTtcbiAgICAgIH0pO1xuICAgICAgYm9hcmQuY2xhc3NMaXN0LmFkZChcImJvYXJkXCIpO1xuICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJvYXJkO1xufVxuXG5mdW5jdGlvbiByZXNldCgpIHtcbiAgY29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSGVhZGVyKCkge1xuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuICBoZWFkZXIudGV4dENvbnRlbnQgPSBcIkJhdHRsZXNoaXBcIjtcbiAgcmV0dXJuIGhlYWRlcjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRm9vdGVyKCkge1xuICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9vdGVyXCIpO1xuICBmb290ZXIudGV4dENvbnRlbnQgPSBcIk1hZGUgYnkgV2lsbCBNb3JldHpcIjtcbiAgcmV0dXJuIGZvb3Rlcjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVGl0bGUodGV4dCkge1xuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHRpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0aXRsZVwiKTtcbiAgdGl0bGUudGV4dENvbnRlbnQgPSB0ZXh0O1xuICByZXR1cm4gdGl0bGU7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlHYW1lKCkge1xuICByZXNldCgpO1xuXG4gIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUhlYWRlcigpO1xuICBjb25zdCBmb290ZXIgPSBjcmVhdGVGb290ZXIoKTtcbiAgY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICBjb25zdCBjb21wdXRlclRpdGxlID0gY3JlYXRlVGl0bGUoXCJDb21wdXRlcidzIEJvYXJkXCIpO1xuICBjb25zdCBwbGF5ZXJUaXRsZSA9IGNyZWF0ZVRpdGxlKFwiWW91ciBCb2FyZFwiKTtcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG4gIGNvbXB1dGVyQm9hcmQuY2xhc3NMaXN0LmFkZChcImNvbXB1dGVyLWJvYXJkXCIpO1xuICBjb25zdCBwbGF5ZXJCb2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG4gIHBsYXllckJvYXJkLmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXItYm9hcmRcIik7XG5cbiAgc2VjdGlvbi5hcHBlbmRDaGlsZChjb21wdXRlclRpdGxlKTtcbiAgc2VjdGlvbi5hcHBlbmRDaGlsZChjb21wdXRlckJvYXJkLCBudWxsKTtcbiAgc2VjdGlvbi5hcHBlbmRDaGlsZChwbGF5ZXJUaXRsZSk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQocGxheWVyQm9hcmQpO1xuXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VjdGlvbik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb290ZXIpO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5R2FtZU92ZXIodGV4dCkge1xuICBjb25zdCBwb3BVcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHBvcFVwLmNsYXNzTGlzdC5hZGQoXCJwb3AtdXBcIik7XG5cbiAgY29uc3QgZ2FtZU92ZXJUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZ2FtZU92ZXJUZXh0LmNsYXNzTGlzdC5hZGQoXCJnYW1lLW92ZXItdGV4dFwiKTtcbiAgZ2FtZU92ZXJUZXh0LnRleHRDb250ZW50ID0gdGV4dDtcblxuICBjb25zdCByZXBsYXlCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICByZXBsYXlCdXR0b24udGV4dENvbnRlbnQgPSBcIlJlcGxheVwiO1xuICByZXBsYXlCdXR0b24uY2xhc3NMaXN0LmFkZChcInJlcGxheS1idXR0b25cIik7XG4gIHJlcGxheUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRpc3BsYXlTZXR1cCgpO1xuICAgIHJlc2V0UGxhY2VtZW50KCk7XG4gIH0pO1xuXG4gIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoXCJvdmVybGF5XCIpO1xuXG4gIHBvcFVwLmFwcGVuZENoaWxkKGdhbWVPdmVyVGV4dCk7XG4gIHBvcFVwLmFwcGVuZENoaWxkKHJlcGxheUJ1dHRvbik7XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKG92ZXJsYXkpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQocG9wVXApO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTaGlwKHNxdWFyZUFtb3VudCwgY2xhc3NOYW1lKSB7XG4gIGNvbnN0IHNoaXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBzaGlwLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgc2hpcC5jbGFzc0xpc3QuYWRkKFwicGxhY2VtZW50U2hpcFwiKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcXVhcmVBbW91bnQ7IGkrKykge1xuICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2hpcC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICB9XG4gIHJldHVybiBzaGlwO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5U2V0dXAoKSB7XG4gIHJlc2V0KCk7XG5cbiAgY29uc3QgaGVhZGVyID0gY3JlYXRlSGVhZGVyKCk7XG4gIGNvbnN0IGZvb3RlciA9IGNyZWF0ZUZvb3RlcigpO1xuICBjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gIGNvbnN0IHRpdGxlID0gY3JlYXRlVGl0bGUoXCJQbGFjZSBZb3VyIFNoaXBzIVwiKTtcbiAgY29uc3QgYm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICBib2FyZC5jbGFzc0xpc3QuYWRkKFwic2V0dXAtYm9hcmRcIik7XG5cbiAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJ1dHRvbnMuY2xhc3NMaXN0LmFkZChcImJ1dHRvbnNcIik7XG5cbiAgY29uc3Qgcm90YXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgcm90YXRlQnV0dG9uLnRleHRDb250ZW50ID0gXCJSb3RhdGUgKHIpXCI7XG4gIHJvdGF0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicm90YXRlLWJ1dHRvblwiKTtcbiAgcm90YXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgdG9nZ2xlRGlyZWN0aW9uKCk7XG4gIH0pO1xuXG4gIGNvbnN0IHJlc2V0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgcmVzZXRCdXR0b24udGV4dENvbnRlbnQgPSBcIlJlc2V0XCI7XG4gIHJlc2V0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyZXNldC1idXR0b25cIik7XG4gIHJlc2V0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBkaXNwbGF5U2V0dXAoKTtcbiAgICByZXNldFBsYWNlbWVudCgpO1xuICB9KTtcblxuICBjb25zdCBzaGlwc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHNoaXBzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJzaGlwcy1jb250YWluZXJcIik7XG5cbiAgY29uc3QgYWlyY3JhZnRDYXJyaWVyID0gY3JlYXRlU2hpcCg1LCBcImFpcmNyYWZ0LWNhcnJpZXJcIik7XG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBjcmVhdGVTaGlwKDQsIFwiYmF0dGxlc2hpcFwiKTtcbiAgY29uc3Qgc3VibWFyaW5lID0gY3JlYXRlU2hpcCgzLCBcInN1Ym1hcmluZVwiKTtcbiAgY29uc3QgZGVzdHJveWVyID0gY3JlYXRlU2hpcCgzLCBcImRlc3Ryb3llclwiKTtcbiAgY29uc3QgcGF0cm9sQm9hdCA9IGNyZWF0ZVNoaXAoMiwgXCJwYXRyb2wtYm9hdFwiKTtcblxuICBzZWN0aW9uLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgc2VjdGlvbi5hcHBlbmRDaGlsZChib2FyZCk7XG5cbiAgYnV0dG9ucy5hcHBlbmRDaGlsZChyb3RhdGVCdXR0b24pO1xuICBidXR0b25zLmFwcGVuZENoaWxkKHJlc2V0QnV0dG9uKTtcblxuICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChhaXJjcmFmdENhcnJpZXIpO1xuICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChiYXR0bGVzaGlwKTtcbiAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQoc3VibWFyaW5lKTtcbiAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQoZGVzdHJveWVyKTtcbiAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQocGF0cm9sQm9hdCk7XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWN0aW9uKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbnMpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2hpcHNDb250YWluZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcbiAgaGFuZGxlUGxhY2VtZW50U2hpcHMoKTtcbn1cblxuZXhwb3J0IHsgZGlzcGxheUdhbWUsIGRpc3BsYXlTZXR1cCwgZGlzcGxheUdhbWVPdmVyIH07XG4iLCJjb25zdCBzaGlwID0gKGxlbikgPT4gKHtcbiAgbGVuZ3RoOiBsZW4sXG4gIGhpdHM6IDAsXG4gIGhpdCgpIHtcbiAgICB0aGlzLmhpdHMgKz0gMTtcbiAgfSxcbiAgaXNTdW5rKCkge1xuICAgIGlmICh0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG59KTtcblxuZnVuY3Rpb24gY3JlYXRlQm9hcmQoKSB7XG4gIGNvbnN0IGJvYXJkID0gW107XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgMTE7IGkrKykge1xuICAgIGNvbnN0IGNvbHVtbiA9IHt9O1xuICAgIE9iamVjdC5hc3NpZ24oY29sdW1uLCB7XG4gICAgICBjb2x1bW46IGksXG4gICAgICByb3c6IFtcbiAgICAgICAgeyBwb3NpdGlvbjogYGEke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGIke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGMke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGQke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGUke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGYke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGcke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGgke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGkke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGoke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgIF0sXG4gICAgfSk7XG4gICAgYm9hcmQucHVzaChjb2x1bW4pO1xuICB9XG4gIHJldHVybiBib2FyZDtcbn1cblxuY29uc3QgZ2FtZUJvYXJkID0gKCkgPT4gKHtcbiAgYm9hcmQ6IGNyZWF0ZUJvYXJkKCksXG4gIGZpbmRTcXVhcmUoY29sLCByb3cpIHtcbiAgICBjb25zdCBzcXVhcmUgPSB0aGlzLmJvYXJkW3JvdyAtIDFdLnJvdy5maWx0ZXIoKG9iaikgPT4ge1xuICAgICAgcmV0dXJuIG9iai5wb3NpdGlvbiA9PT0gYCR7Y29sfSR7cm93fWA7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNxdWFyZTtcbiAgfSxcbiAgY2hlY2tQb3NpdGlvbihjb2wsIHJvdykge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuZmluZFNxdWFyZShjb2wsIHJvdyk7XG4gICAgY29uc3QgcG9zaXRpb24gPSBzcXVhcmVbMF0ucG9zaXRpb247XG4gICAgY29uc3QgaGFzU2hpcCA9IHNxdWFyZVswXS5oYXNTaGlwO1xuICAgIE9iamVjdC5hc3NpZ24ocmVzdWx0LCB7IHBvc2l0aW9uLCBoYXNTaGlwIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG4gIHNoaXBzOiBbXSxcbiAgcGxhY2VTaGlwKHN0YXJ0Q29sLCBlbmRDb2wsIHN0YXJ0Um93LCBlbmRSb3csIG5hbWUpIHtcbiAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICBsZXQgb2NjdXBpZWRTcXVhcmVzID0gW107XG4gICAgaWYgKHN0YXJ0Um93ICE9PSBlbmRSb3cpIHtcbiAgICAgIGZvciAobGV0IGkgPSBzdGFydFJvdzsgaSA8IGVuZFJvdyArIDE7IGkrKykge1xuICAgICAgICBjb25zdCBzcXVhcmUgPSB0aGlzLmZpbmRTcXVhcmUoc3RhcnRDb2wsIGkpO1xuICAgICAgICBzcXVhcmVbMF0uaGFzU2hpcCA9IHRydWU7XG4gICAgICAgIGxlbmd0aCArPSAxO1xuICAgICAgICBvY2N1cGllZFNxdWFyZXMucHVzaChgJHtzdGFydENvbH0ke2l9YCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBjdXJyZW50Q29sID0gc3RhcnRDb2w7XG4gICAgICB3aGlsZSAoY3VycmVudENvbCAhPT0gU3RyaW5nLmZyb21DaGFyQ29kZShlbmRDb2wuY2hhckNvZGVBdCgwKSArIDEpKSB7XG4gICAgICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuZmluZFNxdWFyZShjdXJyZW50Q29sLCBzdGFydFJvdyk7XG4gICAgICAgIHNxdWFyZVswXS5oYXNTaGlwID0gdHJ1ZTtcbiAgICAgICAgb2NjdXBpZWRTcXVhcmVzLnB1c2goYCR7Y3VycmVudENvbH0ke3N0YXJ0Um93fWApO1xuICAgICAgICBjdXJyZW50Q29sID0gU3RyaW5nLmZyb21DaGFyQ29kZShjdXJyZW50Q29sLmNoYXJDb2RlQXQoMCkgKyAxKTtcbiAgICAgICAgbGVuZ3RoICs9IDE7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2hpcHMucHVzaCh7XG4gICAgICBzcXVhcmVzOiBvY2N1cGllZFNxdWFyZXMsXG4gICAgICBuYW1lLFxuICAgICAgb2JqOiBzaGlwKGxlbmd0aCksXG4gICAgfSk7XG4gIH0sXG4gIGF0dGFja3M6IFtdLFxuICB0cmFja0F0dGFjayhwb3NpdGlvbiwgYXR0YWNrSGl0LCBzYW5rU2hpcCkge1xuICAgIHRoaXMuYXR0YWNrcy5wdXNoKHsgcG9zaXRpb24sIGF0dGFja0hpdCwgc2Fua1NoaXAgfSk7XG4gIH0sXG4gIGFsbFNoaXBzU3VuaygpIHtcbiAgICBpZiAodGhpcy5zaGlwcy5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcbiAgICBsZXQgc2hpcHNTdW5rID0gMDtcbiAgICB0aGlzLmF0dGFja3MuZm9yRWFjaCgoYXR0YWNrKSA9PiB7XG4gICAgICBpZiAoYXR0YWNrLnNhbmtTaGlwKSBzaGlwc1N1bmsgKz0gMTtcbiAgICB9KTtcbiAgICBpZiAoc2hpcHNTdW5rID49IHRoaXMuc2hpcHMubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG4gIGlzUmVwZWF0ZWRBdHRhY2soY29sLCByb3cpIHtcbiAgICBsZXQgcmVwZWF0ID0gZmFsc2U7XG4gICAgdGhpcy5hdHRhY2tzLmZvckVhY2goKGF0dGFjaykgPT4ge1xuICAgICAgaWYgKGF0dGFjay5wb3NpdGlvbiA9PT0gYCR7Y29sfSR7cm93fWApIHtcbiAgICAgICAgcmVwZWF0ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXBlYXQ7XG4gIH0sXG4gIHJlY2VpdmVBdHRhY2soY29sLCByb3cpIHtcbiAgICBpZiAodGhpcy5pc1JlcGVhdGVkQXR0YWNrKGNvbCwgcm93KSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBsZXQgYXR0YWNrZWRTaGlwID0gZmFsc2U7XG4gICAgdGhpcy5zaGlwcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpdGVtLnNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgICAgIGlmIChzcXVhcmUgPT09IGAke2NvbH0ke3Jvd31gKSBhdHRhY2tlZFNoaXAgPSBpdGVtO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKGF0dGFja2VkU2hpcCkge1xuICAgICAgYXR0YWNrZWRTaGlwLm9iai5oaXQoKTtcbiAgICAgIHRoaXMudHJhY2tBdHRhY2soYCR7Y29sfSR7cm93fWAsIHRydWUsIGF0dGFja2VkU2hpcC5vYmouaXNTdW5rKCkpO1xuICAgICAgcmV0dXJuIGF0dGFja2VkU2hpcC5uYW1lO1xuICAgIH1cbiAgICB0aGlzLnRyYWNrQXR0YWNrKGAke2NvbH0ke3Jvd31gLCBmYWxzZSwgZmFsc2UpO1xuICAgIHJldHVybiBgJHtjb2x9JHtyb3d9YDtcbiAgfSxcbn0pO1xuXG5leHBvcnQgeyBzaGlwLCBnYW1lQm9hcmQgfTtcbiIsImltcG9ydCB7IGRpc3BsYXlHYW1lLCBkaXNwbGF5R2FtZU92ZXIsIGRpc3BsYXlTZXR1cCB9IGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCB7IGdhbWVCb2FyZCB9IGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCB7IGNob29zZVNxdWFyZSwgcmFuZG9tU2hpcEFycmF5IH0gZnJvbSBcIi4vY29tcHV0ZXJcIjtcbmltcG9ydCB7IHNldEFjdGl2ZVNoaXAsIHRvZ2dsZURpcmVjdGlvbiB9IGZyb20gXCIuL3BsYWNlbWVudFwiO1xuXG5sZXQgcGxheWVyQm9hcmQ7XG5sZXQgY29tcHV0ZXJCb2FyZDtcblxuZnVuY3Rpb24gY3JlYXRlQm9hcmRGcm9tQXJyYXkoc2hpcHMsIGJvYXJkLCBib2FyZFR5cGUpIHtcbiAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIGxldCBmaXJzdCA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbmFtZSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbGFzdCA9IHVuZGVmaW5lZDtcbiAgICBzaGlwLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBuYW1lID0gc3F1YXJlLm5hbWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkKSBmaXJzdCA9IHsgY29sOiBzcXVhcmUuY29sLCByb3c6IHNxdWFyZS5yb3cgfTtcbiAgICAgIGxhc3QgPSB7IGNvbDogc3F1YXJlLmNvbCwgcm93OiBzcXVhcmUucm93IH07XG4gICAgICAvLyBEaXNwbGF5IFdoZXJlIFNoaXBzIEFyZVxuICAgICAgaWYgKGJvYXJkVHlwZSA9PT0gXCJwbGF5ZXJcIikge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnRcbiAgICAgICAgICAucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItYm9hcmRcIilcbiAgICAgICAgICAucXVlcnlTZWxlY3RvcihgLiR7c3F1YXJlLmNvbH0ke3NxdWFyZS5yb3d9YCk7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgYm9hcmQucGxhY2VTaGlwKGZpcnN0LmNvbCwgbGFzdC5jb2wsIGZpcnN0LnJvdywgbGFzdC5yb3csIG5hbWUpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdChwbGF5ZXJTaGlwcywgY29tcHV0ZXJTaGlwcykge1xuICBkaXNwbGF5R2FtZSgpO1xuICBwbGF5ZXJCb2FyZCA9IGdhbWVCb2FyZCgpO1xuICBjcmVhdGVCb2FyZEZyb21BcnJheShwbGF5ZXJTaGlwcywgcGxheWVyQm9hcmQsIFwicGxheWVyXCIpO1xuICBjb21wdXRlckJvYXJkID0gZ2FtZUJvYXJkKCk7XG4gIGNyZWF0ZUJvYXJkRnJvbUFycmF5KGNvbXB1dGVyU2hpcHMsIGNvbXB1dGVyQm9hcmQsIFwiY29tcHV0ZXJcIik7XG59XG5cbmZ1bmN0aW9uIG1hcmtTcXVhcmUoYm9hcmQsIGNvbCwgcm93LCBib2FyZFR5cGUpIHtcbiAgYm9hcmQucmVjZWl2ZUF0dGFjayhjb2wsIHJvdyk7XG4gIGlmIChib2FyZC5hdHRhY2tzW2JvYXJkLmF0dGFja3MubGVuZ3RoIC0gMV0uYXR0YWNrSGl0KSB7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHtib2FyZFR5cGV9LWJvYXJkYClcbiAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHtjb2x9JHtyb3d9YClcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihgLiR7Ym9hcmRUeXBlfS1ib2FyZGApXG4gICAgICAucXVlcnlTZWxlY3RvcihgLiR7Y29sfSR7cm93fWApXG4gICAgICAuY2xhc3NMaXN0LmFkZChcIm1pc3NlZFwiKTtcbiAgfVxufVxuXG4vLyBBZHZhbmNlcyBHYW1lXG5mdW5jdGlvbiBoYW5kbGVTcXVhcmVDbGljayhjb2wsIHJvdykge1xuICBpZiAoY29tcHV0ZXJCb2FyZC5pc1JlcGVhdGVkQXR0YWNrKGNvbCwgcm93KSkgcmV0dXJuO1xuXG4gIG1hcmtTcXVhcmUoY29tcHV0ZXJCb2FyZCwgY29sLCByb3csIFwiY29tcHV0ZXJcIik7XG4gIGlmIChjb21wdXRlckJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgZGlzcGxheUdhbWVPdmVyKFwiWW91IFdvblwiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBjb21wdXRlckNob2ljZSA9IGNob29zZVNxdWFyZShwbGF5ZXJCb2FyZCk7XG4gIG1hcmtTcXVhcmUocGxheWVyQm9hcmQsIGNvbXB1dGVyQ2hvaWNlLmNvbCwgY29tcHV0ZXJDaG9pY2Uucm93LCBcInBsYXllclwiKTtcbiAgaWYgKHBsYXllckJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgZGlzcGxheUdhbWVPdmVyKFwiVGhlIENvbXB1dGVyIFdvblwiKTtcbiAgICByZXR1cm47XG4gIH1cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBsYWNlbWVudENvbXBsZXRlXCIsIChlKSA9PiB7XG4gIGluaXQoZS5kZXRhaWwucGxheWVyQXJyYXksIHJhbmRvbVNoaXBBcnJheSgpKTtcbn0pO1xuXG5mdW5jdGlvbiBoYW5kbGVQbGFjZW1lbnRTaGlwcygpIHtcbiAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlbWVudFNoaXBcIik7XG4gIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAvLyBUb2dnbGUgT2ZmXG4gICAgICBpZiAoc2hpcC5jbGFzc0xpc3QuY29udGFpbnMoXCJzZWxlY3RlZFwiKSkge1xuICAgICAgICBzaGlwLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgc2V0QWN0aXZlU2hpcCgwLCBcIlwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gRGVzZWxlY3QgT3RoZXIgU2hpcHNcbiAgICAgIHNoaXBzLmZvckVhY2goKGFTaGlwKSA9PiBhU2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIikpO1xuICAgICAgLy8gU2VsZWN0IFNoaXBcbiAgICAgIHNoaXAuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xuICAgICAgc2V0QWN0aXZlU2hpcChzaGlwLmNoaWxkcmVuLmxlbmd0aCwgc2hpcC5jbGFzc0xpc3RbMF0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XG4gIGlmIChlLmtleSA9PT0gXCJyXCIpIHRvZ2dsZURpcmVjdGlvbigpO1xufSk7XG5kaXNwbGF5U2V0dXAoKTtcblxuZXhwb3J0IHsgaGFuZGxlU3F1YXJlQ2xpY2ssIGhhbmRsZVBsYWNlbWVudFNoaXBzIH07XG4iLCJsZXQgYWN0aXZlU2hpcExlbmd0aCA9IDA7XG5sZXQgYWN0aXZlU2hpcE5hbWUgPSBcIlwiO1xubGV0IGRpcmVjdGlvbiA9IFwiY29sU3BhblwiO1xubGV0IHBsYWNlbWVudFZhbGlkID0gZmFsc2U7XG5cbmZ1bmN0aW9uIHNldEFjdGl2ZVNoaXAobGVuZ3RoLCBuYW1lKSB7XG4gIGFjdGl2ZVNoaXBMZW5ndGggPSBsZW5ndGg7XG4gIGFjdGl2ZVNoaXBOYW1lID0gbmFtZTtcbn1cblxuZnVuY3Rpb24gY2xlYXJIb3ZlcmVkKCkge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmhvdmVyZWRcIikuZm9yRWFjaCgoaG92ZXJlZCkgPT4ge1xuICAgIGhvdmVyZWQuY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyZWRcIik7XG4gIH0pO1xufVxuXG5sZXQgc3RhcnRDb2wgPSBcIlwiO1xubGV0IHN0YXJ0Um93ID0gXCJcIjtcblxuZnVuY3Rpb24gdG9nZ2xlRGlyZWN0aW9uKCkge1xuICBkaXJlY3Rpb24gPT09IFwicm93U3BhblwiID8gKGRpcmVjdGlvbiA9IFwiY29sU3BhblwiKSA6IChkaXJlY3Rpb24gPSBcInJvd1NwYW5cIik7XG4gIGRpc3BsYXlIb3ZlcihzdGFydENvbCwgc3RhcnRSb3cpO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5SG92ZXIoY29sLCByb3cpIHtcbiAgaWYgKGNvbCA9PT0gXCJcIiB8fCByb3cgPT09IFwiXCIpIHJldHVybjtcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0ZWRcIikgPT09IG51bGwpIHJldHVybjtcbiAgc3RhcnRDb2wgPSBjb2w7XG4gIGxldCBjdXJyZW50Q29sID0gY29sO1xuICBzdGFydFJvdyA9IHJvdztcbiAgbGV0IGN1cnJlbnRSb3cgPSByb3c7XG4gIGxldCBpdGVyYXRpb25zTGVmdCA9IGFjdGl2ZVNoaXBMZW5ndGg7XG5cbiAgY2xlYXJIb3ZlcmVkKCk7XG5cbiAgd2hpbGUgKGl0ZXJhdGlvbnNMZWZ0ID4gMCkge1xuICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2N1cnJlbnRDb2x9JHtjdXJyZW50Um93fWApO1xuICAgIGlmIChzcXVhcmUgPT09IG51bGwpIHtcbiAgICAgIHBsYWNlbWVudFZhbGlkID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKHNxdWFyZS5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwXCIpKSB7XG4gICAgICBwbGFjZW1lbnRWYWxpZCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJob3ZlcmVkXCIpO1xuICAgIGlmIChkaXJlY3Rpb24gPT09IFwicm93U3BhblwiKSBjdXJyZW50Um93ICs9IDE7XG4gICAgZWxzZSBjdXJyZW50Q29sID0gU3RyaW5nLmZyb21DaGFyQ29kZShjdXJyZW50Q29sLmNoYXJDb2RlQXQoMCkgKyAxKTtcblxuICAgIGl0ZXJhdGlvbnNMZWZ0IC09IDE7XG4gIH1cblxuICBpZiAoaXRlcmF0aW9uc0xlZnQgPT09IDApIHBsYWNlbWVudFZhbGlkID0gdHJ1ZTtcbn1cblxubGV0IHBsYXllckFycmF5ID0gW107XG5mdW5jdGlvbiByZXNldFBsYWNlbWVudCgpIHtcbiAgcGxheWVyQXJyYXkubGVuZ3RoID0gMDtcbn1cblxuZnVuY3Rpb24gcGxhY2VTaGlwKGNvbCwgcm93KSB7XG4gIGlmICghcGxhY2VtZW50VmFsaWQpIHJldHVybjtcbiAgbGV0IHNoaXBBcnJheSA9IFt7IG5hbWU6IGFjdGl2ZVNoaXBOYW1lIH1dO1xuICBsZXQgY3VycmVudENvbCA9IGNvbDtcbiAgbGV0IGN1cnJlbnRSb3cgPSByb3c7XG4gIGxldCBpdGVyYXRpb25zTGVmdCA9IGFjdGl2ZVNoaXBMZW5ndGg7XG4gIHdoaWxlIChpdGVyYXRpb25zTGVmdCA+IDApIHtcbiAgICBzaGlwQXJyYXkucHVzaCh7IGNvbDogY3VycmVudENvbCwgcm93OiBjdXJyZW50Um93IH0pO1xuICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2N1cnJlbnRDb2x9JHtjdXJyZW50Um93fWApO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcInJvd1NwYW5cIikgY3VycmVudFJvdyArPSAxO1xuICAgIGVsc2UgY3VycmVudENvbCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY3VycmVudENvbC5jaGFyQ29kZUF0KDApICsgMSk7XG4gICAgaXRlcmF0aW9uc0xlZnQgLT0gMTtcbiAgfVxuICBwbGF5ZXJBcnJheS5wdXNoKHNoaXBBcnJheSk7XG5cbiAgY2xlYXJIb3ZlcmVkKCk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0ZWRcIikucmVtb3ZlKCk7XG4gIHBsYWNlbWVudFZhbGlkID0gZmFsc2U7XG5cbiAgLy8gSWYgYWxsIHNoaXBzIGFyZSBwbGFjZWQgaW5pdCB0aGUgZ2FtZVxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGFjZW1lbnRTaGlwXCIpID09PSBudWxsKSB7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXCJwbGFjZW1lbnRDb21wbGV0ZVwiLCB7XG4gICAgICBkZXRhaWw6IHsgcGxheWVyQXJyYXkgfSxcbiAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgY29tcG9zZWQ6IGZhbHNlLFxuICAgIH0pO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1jb250YWluZXJdXCIpLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIHNldEFjdGl2ZVNoaXAsXG4gIHRvZ2dsZURpcmVjdGlvbixcbiAgZGlzcGxheUhvdmVyLFxuICBwbGFjZVNoaXAsXG4gIHJlc2V0UGxhY2VtZW50LFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOlsiZ2V0UG9zc2libGVDaG9pY2VzIiwiYm9hcmQiLCJwb3NzaWJsZVNxdWFyZXMiLCJpIiwiaiIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImNoYXJDb2RlQXQiLCJpc1JlcGVhdGVkQXR0YWNrIiwicHVzaCIsInJvdyIsImNvbCIsImNob29zZVNxdWFyZSIsInNxdWFyZXMiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJsZW5ndGgiLCJyYW5kb21TaGlwQXJyYXkiLCJzaGlwTGVuZ3RocyIsInNoaXBOYW1lcyIsInNoaXBzIiwiX2xvb3AiLCJ2YWxpZFBsYWNlbWVudCIsImRpcmVjdGlvbiIsInN0YXJ0Um93IiwiY2VpbCIsInN0YXJ0Q29sIiwiY3VycmVudFNoaXAiLCJuYW1lIiwiY3VycmVudENvbCIsImN1cnJlbnRSb3ciLCJmb3JFYWNoIiwic2hpcCIsInBvcCIsImhhbmRsZVNxdWFyZUNsaWNrIiwiaGFuZGxlUGxhY2VtZW50U2hpcHMiLCJkaXNwbGF5SG92ZXIiLCJwbGFjZVNoaXAiLCJ0b2dnbGVEaXJlY3Rpb24iLCJyZXNldFBsYWNlbWVudCIsImNvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNyZWF0ZUJvYXJkIiwiY3JlYXRlRWxlbWVudCIsIl9sb29wMiIsInNxdWFyZSIsImNsYXNzTGlzdCIsImFkZCIsImNvbmNhdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXJlbnRFbGVtZW50IiwiY29udGFpbnMiLCJhcHBlbmRDaGlsZCIsInJlc2V0IiwidGV4dENvbnRlbnQiLCJjcmVhdGVIZWFkZXIiLCJoZWFkZXIiLCJjcmVhdGVGb290ZXIiLCJmb290ZXIiLCJjcmVhdGVUaXRsZSIsInRleHQiLCJ0aXRsZSIsImRpc3BsYXlHYW1lIiwic2VjdGlvbiIsImNvbXB1dGVyVGl0bGUiLCJwbGF5ZXJUaXRsZSIsImNvbXB1dGVyQm9hcmQiLCJwbGF5ZXJCb2FyZCIsImRpc3BsYXlHYW1lT3ZlciIsInBvcFVwIiwiZ2FtZU92ZXJUZXh0IiwicmVwbGF5QnV0dG9uIiwiZGlzcGxheVNldHVwIiwib3ZlcmxheSIsImNyZWF0ZVNoaXAiLCJzcXVhcmVBbW91bnQiLCJjbGFzc05hbWUiLCJidXR0b25zIiwicm90YXRlQnV0dG9uIiwicmVzZXRCdXR0b24iLCJzaGlwc0NvbnRhaW5lciIsImFpcmNyYWZ0Q2FycmllciIsImJhdHRsZXNoaXAiLCJzdWJtYXJpbmUiLCJkZXN0cm95ZXIiLCJwYXRyb2xCb2F0IiwibGVuIiwiaGl0cyIsImhpdCIsImlzU3VuayIsImNvbHVtbiIsIk9iamVjdCIsImFzc2lnbiIsInBvc2l0aW9uIiwiaGFzU2hpcCIsImdhbWVCb2FyZCIsImZpbmRTcXVhcmUiLCJmaWx0ZXIiLCJvYmoiLCJjaGVja1Bvc2l0aW9uIiwicmVzdWx0IiwiZW5kQ29sIiwiZW5kUm93Iiwib2NjdXBpZWRTcXVhcmVzIiwiYXR0YWNrcyIsInRyYWNrQXR0YWNrIiwiYXR0YWNrSGl0Iiwic2Fua1NoaXAiLCJhbGxTaGlwc1N1bmsiLCJzaGlwc1N1bmsiLCJhdHRhY2siLCJyZXBlYXQiLCJyZWNlaXZlQXR0YWNrIiwidW5kZWZpbmVkIiwiYXR0YWNrZWRTaGlwIiwiaXRlbSIsInNldEFjdGl2ZVNoaXAiLCJjcmVhdGVCb2FyZEZyb21BcnJheSIsImJvYXJkVHlwZSIsImZpcnN0IiwibGFzdCIsImVsZW1lbnQiLCJpbml0IiwicGxheWVyU2hpcHMiLCJjb21wdXRlclNoaXBzIiwibWFya1NxdWFyZSIsImNvbXB1dGVyQ2hvaWNlIiwiZSIsImRldGFpbCIsInBsYXllckFycmF5IiwicXVlcnlTZWxlY3RvckFsbCIsInJlbW92ZSIsImFTaGlwIiwiY2hpbGRyZW4iLCJ3aW5kb3ciLCJrZXkiLCJhY3RpdmVTaGlwTGVuZ3RoIiwiYWN0aXZlU2hpcE5hbWUiLCJwbGFjZW1lbnRWYWxpZCIsImNsZWFySG92ZXJlZCIsImhvdmVyZWQiLCJpdGVyYXRpb25zTGVmdCIsInNoaXBBcnJheSIsImV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJidWJibGVzIiwiY2FuY2VsYWJsZSIsImNvbXBvc2VkIiwiZGlzcGF0Y2hFdmVudCJdLCJzb3VyY2VSb290IjoiIn0=
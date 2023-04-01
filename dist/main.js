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
  (0,_display__WEBPACK_IMPORTED_MODULE_0__.displayGame)();
  createBoardFromArray(playerShips, playerBoard, "player");
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
window.addEventListener("keydown", function (e) {
  if (e.key === "r") (0,_placement__WEBPACK_IMPORTED_MODULE_3__.toggleDirection)();
});
(0,_display__WEBPACK_IMPORTED_MODULE_0__.displaySetup)();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kaXNwbGF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxhY2VtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZ2V0UG9zc2libGVDaG9pY2VzKGJvYXJkKSB7XG4gIGNvbnN0IHBvc3NpYmxlU3F1YXJlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IDExOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gXCJhXCI7IGogIT09IFwia1wiOyBqID0gU3RyaW5nLmZyb21DaGFyQ29kZShqLmNoYXJDb2RlQXQoMCkgKyAxKSkge1xuICAgICAgaWYgKCFib2FyZC5pc1JlcGVhdGVkQXR0YWNrKGosIGkpKVxuICAgICAgICBwb3NzaWJsZVNxdWFyZXMucHVzaCh7IHJvdzogaSwgY29sOiBqIH0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcG9zc2libGVTcXVhcmVzO1xufVxuXG5mdW5jdGlvbiBjaG9vc2VTcXVhcmUoYm9hcmQpIHtcbiAgY29uc3Qgc3F1YXJlcyA9IGdldFBvc3NpYmxlQ2hvaWNlcyhib2FyZCk7XG4gIHJldHVybiBzcXVhcmVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNxdWFyZXMubGVuZ3RoKV07XG59XG5cbmZ1bmN0aW9uIHJhbmRvbVNoaXBBcnJheSgpIHtcbiAgY29uc3Qgc2hpcExlbmd0aHMgPSBbMiwgMywgMywgNCwgNV07XG4gIGNvbnN0IHNoaXBOYW1lcyA9IFtcbiAgICBcIlBhdHJvbCBCb2F0XCIsXG4gICAgXCJTdWJtYXJpbmVcIixcbiAgICBcIkRlc3Ryb3llclwiLFxuICAgIFwiQmF0dGxlU2hpcFwiLFxuICAgIFwiQWlyY3JhZnQgQ2FycmllclwiLFxuICBdO1xuICBjb25zdCBzaGlwcyA9IFtdO1xuICB3aGlsZSAoc2hpcExlbmd0aHMubGVuZ3RoID4gMCkge1xuICAgIGxldCB2YWxpZFBsYWNlbWVudCA9IHRydWU7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/IFwicm93U3BhblwiIDogXCJjb2xTcGFuXCI7XG5cbiAgICBjb25zdCBzdGFydFJvdyA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGNvbnN0IHN0YXJ0Q29sID0gU3RyaW5nLmZyb21DaGFyQ29kZSg5NiArIE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogMTApKTtcblxuICAgIGNvbnN0IGN1cnJlbnRTaGlwID0gW3sgbmFtZTogc2hpcE5hbWVzW3NoaXBOYW1lcy5sZW5ndGggLSAxXSB9XTtcblxuICAgIGxldCBjdXJyZW50Q29sID0gc3RhcnRDb2w7XG4gICAgbGV0IGN1cnJlbnRSb3cgPSBzdGFydFJvdztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHNbc2hpcExlbmd0aHMubGVuZ3RoIC0gMV07IGkrKykge1xuICAgICAgLy8gT3V0IG9mIEJvdW5kc1xuICAgICAgaWYgKGN1cnJlbnRSb3cgPT09IDExKSB7XG4gICAgICAgIHZhbGlkUGxhY2VtZW50ID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnRDb2wgPT09IFwia1wiKSB7XG4gICAgICAgIHZhbGlkUGxhY2VtZW50ID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICAvLyBPdmVybGFwXG4gICAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgc2hpcC5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmIChjdXJyZW50Q29sID09PSBzaGlwW2pdLmNvbCAmJiBjdXJyZW50Um93ID09PSBzaGlwW2pdLnJvdykge1xuICAgICAgICAgICAgdmFsaWRQbGFjZW1lbnQgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmICghdmFsaWRQbGFjZW1lbnQpIGJyZWFrO1xuICAgICAgY3VycmVudFNoaXAucHVzaCh7IGNvbDogY3VycmVudENvbCwgcm93OiBjdXJyZW50Um93IH0pO1xuICAgICAgLy8gSW5jcmVtZW50XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBcInJvd1NwYW5cIikgY3VycmVudFJvdyArPSAxO1xuICAgICAgZWxzZSBjdXJyZW50Q29sID0gU3RyaW5nLmZyb21DaGFyQ29kZShjdXJyZW50Q29sLmNoYXJDb2RlQXQoMCkgKyAxKTtcbiAgICB9XG5cbiAgICBpZiAodmFsaWRQbGFjZW1lbnQpIHtcbiAgICAgIHNoaXBzLnB1c2goY3VycmVudFNoaXApO1xuICAgICAgc2hpcExlbmd0aHMucG9wKCk7XG4gICAgICBzaGlwTmFtZXMucG9wKCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzaGlwcztcbn1cblxuZXhwb3J0IHsgY2hvb3NlU3F1YXJlLCBnZXRQb3NzaWJsZUNob2ljZXMsIHJhbmRvbVNoaXBBcnJheSB9O1xuIiwiaW1wb3J0IHsgaGFuZGxlU3F1YXJlQ2xpY2ssIGhhbmRsZVBsYWNlbWVudFNoaXBzIH0gZnJvbSBcIi4vaW5kZXhcIjtcbmltcG9ydCB7XG4gIGRpc3BsYXlIb3ZlcixcbiAgcGxhY2VTaGlwLFxuICB0b2dnbGVEaXJlY3Rpb24sXG4gIHJlc2V0UGxhY2VtZW50LFxufSBmcm9tIFwiLi9wbGFjZW1lbnRcIjtcblxuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWNvbnRhaW5lcl1cIik7XG5cbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkKCkge1xuICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgMTE7IGkgKz0gMSkge1xuICAgIGZvciAobGV0IGogPSBcImFcIjsgaiAhPT0gXCJrXCI7IGogPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGouY2hhckNvZGVBdCgwKSArIDEpKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmVcIik7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChgJHtqfSR7aX1gKTtcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoc3F1YXJlLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGxheWVyLWJvYXJkXCIpKSByZXR1cm47XG4gICAgICAgIGlmIChzcXVhcmUucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb21wdXRlci1ib2FyZFwiKSlcbiAgICAgICAgICBoYW5kbGVTcXVhcmVDbGljayhqLCBpKTtcbiAgICAgICAgaWYgKHNxdWFyZS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcInNldHVwLWJvYXJkXCIpKSB7XG4gICAgICAgICAgcGxhY2VTaGlwKGosIGkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsICgpID0+IHtcbiAgICAgICAgaWYgKCFzcXVhcmUucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJzZXR1cC1ib2FyZFwiKSkgcmV0dXJuO1xuICAgICAgICBkaXNwbGF5SG92ZXIoaiwgaSk7XG4gICAgICB9KTtcbiAgICAgIGJvYXJkLmNsYXNzTGlzdC5hZGQoXCJib2FyZFwiKTtcbiAgICAgIGJvYXJkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBib2FyZDtcbn1cblxuZnVuY3Rpb24gcmVzZXQoKSB7XG4gIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUhlYWRlcigpIHtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgaGVhZGVyLnRleHRDb250ZW50ID0gXCJCYXR0bGVzaGlwXCI7XG4gIHJldHVybiBoZWFkZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvb3RlcigpIHtcbiAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgZm9vdGVyLnRleHRDb250ZW50ID0gXCJNYWRlIGJ5IFdpbGwgTW9yZXR6XCI7XG4gIHJldHVybiBmb290ZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRpdGxlKHRleHQpIHtcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB0aXRsZS5jbGFzc0xpc3QuYWRkKFwidGl0bGVcIik7XG4gIHRpdGxlLnRleHRDb250ZW50ID0gdGV4dDtcbiAgcmV0dXJuIHRpdGxlO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5R2FtZSgpIHtcbiAgcmVzZXQoKTtcblxuICBjb25zdCBoZWFkZXIgPSBjcmVhdGVIZWFkZXIoKTtcbiAgY29uc3QgZm9vdGVyID0gY3JlYXRlRm9vdGVyKCk7XG4gIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgY29uc3QgY29tcHV0ZXJUaXRsZSA9IGNyZWF0ZVRpdGxlKFwiQ29tcHV0ZXIncyBCb2FyZFwiKTtcbiAgY29uc3QgcGxheWVyVGl0bGUgPSBjcmVhdGVUaXRsZShcIllvdXIgQm9hcmRcIik7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICBjb21wdXRlckJvYXJkLmNsYXNzTGlzdC5hZGQoXCJjb21wdXRlci1ib2FyZFwiKTtcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICBwbGF5ZXJCb2FyZC5jbGFzc0xpc3QuYWRkKFwicGxheWVyLWJvYXJkXCIpO1xuXG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoY29tcHV0ZXJUaXRsZSk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoY29tcHV0ZXJCb2FyZCwgbnVsbCk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQocGxheWVyVGl0bGUpO1xuICBzZWN0aW9uLmFwcGVuZENoaWxkKHBsYXllckJvYXJkKTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNlY3Rpb24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheUdhbWVPdmVyKHRleHQpIHtcbiAgY29uc3QgcG9wVXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBwb3BVcC5jbGFzc0xpc3QuYWRkKFwicG9wLXVwXCIpO1xuXG4gIGNvbnN0IGdhbWVPdmVyVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGdhbWVPdmVyVGV4dC5jbGFzc0xpc3QuYWRkKFwiZ2FtZS1vdmVyLXRleHRcIik7XG4gIGdhbWVPdmVyVGV4dC50ZXh0Q29udGVudCA9IHRleHQ7XG5cbiAgY29uc3QgcmVwbGF5QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgcmVwbGF5QnV0dG9uLnRleHRDb250ZW50ID0gXCJSZXBsYXlcIjtcbiAgcmVwbGF5QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyZXBsYXktYnV0dG9uXCIpO1xuXG4gIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoXCJvdmVybGF5XCIpO1xuXG4gIHBvcFVwLmFwcGVuZENoaWxkKGdhbWVPdmVyVGV4dCk7XG4gIHBvcFVwLmFwcGVuZENoaWxkKHJlcGxheUJ1dHRvbik7XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKG92ZXJsYXkpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQocG9wVXApO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTaGlwKHNxdWFyZUFtb3VudCwgY2xhc3NOYW1lKSB7XG4gIGNvbnN0IHNoaXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBzaGlwLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgc2hpcC5jbGFzc0xpc3QuYWRkKFwicGxhY2VtZW50U2hpcFwiKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcXVhcmVBbW91bnQ7IGkrKykge1xuICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2hpcC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICB9XG4gIHJldHVybiBzaGlwO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5U2V0dXAoKSB7XG4gIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUhlYWRlcigpO1xuICBjb25zdCBmb290ZXIgPSBjcmVhdGVGb290ZXIoKTtcbiAgY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICBjb25zdCB0aXRsZSA9IGNyZWF0ZVRpdGxlKFwiUGxhY2UgWW91ciBTaGlwcyFcIik7XG4gIGNvbnN0IGJvYXJkID0gY3JlYXRlQm9hcmQoKTtcbiAgYm9hcmQuY2xhc3NMaXN0LmFkZChcInNldHVwLWJvYXJkXCIpO1xuXG4gIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBidXR0b25zLmNsYXNzTGlzdC5hZGQoXCJidXR0b25zXCIpO1xuXG4gIGNvbnN0IHJvdGF0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHJvdGF0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiUm90YXRlIChyKVwiO1xuICByb3RhdGVCdXR0b24uY2xhc3NMaXN0LmFkZChcInJvdGF0ZS1idXR0b25cIik7XG4gIHJvdGF0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHRvZ2dsZURpcmVjdGlvbigpO1xuICB9KTtcblxuICBjb25zdCByZXNldEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHJlc2V0QnV0dG9uLnRleHRDb250ZW50ID0gXCJSZXNldFwiO1xuICByZXNldEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicmVzZXQtYnV0dG9uXCIpO1xuICByZXNldEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgZGlzcGxheVNldHVwKCk7XG4gICAgcmVzZXRQbGFjZW1lbnQoKTtcbiAgfSk7XG5cbiAgY29uc3Qgc2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzaGlwc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwic2hpcHMtY29udGFpbmVyXCIpO1xuXG4gIGNvbnN0IGFpcmNyYWZ0Q2FycmllciA9IGNyZWF0ZVNoaXAoNSwgXCJhaXJjcmFmdC1jYXJyaWVyXCIpO1xuICBjb25zdCBiYXR0bGVzaGlwID0gY3JlYXRlU2hpcCg0LCBcImJhdHRsZXNoaXBcIik7XG4gIGNvbnN0IHN1Ym1hcmluZSA9IGNyZWF0ZVNoaXAoMywgXCJzdWJtYXJpbmVcIik7XG4gIGNvbnN0IGRlc3Ryb3llciA9IGNyZWF0ZVNoaXAoMywgXCJkZXN0cm95ZXJcIik7XG4gIGNvbnN0IHBhdHJvbEJvYXQgPSBjcmVhdGVTaGlwKDIsIFwicGF0cm9sLWJvYXRcIik7XG5cbiAgc2VjdGlvbi5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoYm9hcmQpO1xuXG4gIGJ1dHRvbnMuYXBwZW5kQ2hpbGQocm90YXRlQnV0dG9uKTtcbiAgYnV0dG9ucy5hcHBlbmRDaGlsZChyZXNldEJ1dHRvbik7XG5cbiAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQoYWlyY3JhZnRDYXJyaWVyKTtcbiAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQoYmF0dGxlc2hpcCk7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKHN1Ym1hcmluZSk7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlc3Ryb3llcik7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKHBhdHJvbEJvYXQpO1xuXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VjdGlvbik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b25zKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNoaXBzQ29udGFpbmVyKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZvb3Rlcik7XG4gIGhhbmRsZVBsYWNlbWVudFNoaXBzKCk7XG59XG5cbmV4cG9ydCB7IGRpc3BsYXlHYW1lLCBkaXNwbGF5U2V0dXAsIGRpc3BsYXlHYW1lT3ZlciB9O1xuIiwiY29uc3Qgc2hpcCA9IChsZW4pID0+ICh7XG4gIGxlbmd0aDogbGVuLFxuICBoaXRzOiAwLFxuICBoaXQoKSB7XG4gICAgdGhpcy5oaXRzICs9IDE7XG4gIH0sXG4gIGlzU3VuaygpIHtcbiAgICBpZiAodGhpcy5oaXRzID09PSB0aGlzLmxlbmd0aCkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxufSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkKCkge1xuICBjb25zdCBib2FyZCA9IFtdO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IDExOyBpKyspIHtcbiAgICBjb25zdCBjb2x1bW4gPSB7fTtcbiAgICBPYmplY3QuYXNzaWduKGNvbHVtbiwge1xuICAgICAgY29sdW1uOiBpLFxuICAgICAgcm93OiBbXG4gICAgICAgIHsgcG9zaXRpb246IGBhJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBiJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBjJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBkJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBlJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBmJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBnJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBoJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBpJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBqJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICBdLFxuICAgIH0pO1xuICAgIGJvYXJkLnB1c2goY29sdW1uKTtcbiAgfVxuICByZXR1cm4gYm9hcmQ7XG59XG5cbmNvbnN0IGdhbWVCb2FyZCA9ICgpID0+ICh7XG4gIGJvYXJkOiBjcmVhdGVCb2FyZCgpLFxuICBmaW5kU3F1YXJlKGNvbCwgcm93KSB7XG4gICAgY29uc3Qgc3F1YXJlID0gdGhpcy5ib2FyZFtyb3cgLSAxXS5yb3cuZmlsdGVyKChvYmopID0+IHtcbiAgICAgIHJldHVybiBvYmoucG9zaXRpb24gPT09IGAke2NvbH0ke3Jvd31gO1xuICAgIH0pO1xuICAgIHJldHVybiBzcXVhcmU7XG4gIH0sXG4gIGNoZWNrUG9zaXRpb24oY29sLCByb3cpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBjb25zdCBzcXVhcmUgPSB0aGlzLmZpbmRTcXVhcmUoY29sLCByb3cpO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gc3F1YXJlWzBdLnBvc2l0aW9uO1xuICAgIGNvbnN0IGhhc1NoaXAgPSBzcXVhcmVbMF0uaGFzU2hpcDtcbiAgICBPYmplY3QuYXNzaWduKHJlc3VsdCwgeyBwb3NpdGlvbiwgaGFzU2hpcCB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuICBzaGlwczogW10sXG4gIHBsYWNlU2hpcChzdGFydENvbCwgZW5kQ29sLCBzdGFydFJvdywgZW5kUm93LCBuYW1lKSB7XG4gICAgbGV0IGxlbmd0aCA9IDA7XG4gICAgbGV0IG9jY3VwaWVkU3F1YXJlcyA9IFtdO1xuICAgIGlmIChzdGFydFJvdyAhPT0gZW5kUm93KSB7XG4gICAgICBmb3IgKGxldCBpID0gc3RhcnRSb3c7IGkgPCBlbmRSb3cgKyAxOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gdGhpcy5maW5kU3F1YXJlKHN0YXJ0Q29sLCBpKTtcbiAgICAgICAgc3F1YXJlWzBdLmhhc1NoaXAgPSB0cnVlO1xuICAgICAgICBsZW5ndGggKz0gMTtcbiAgICAgICAgb2NjdXBpZWRTcXVhcmVzLnB1c2goYCR7c3RhcnRDb2x9JHtpfWApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgY3VycmVudENvbCA9IHN0YXJ0Q29sO1xuICAgICAgd2hpbGUgKGN1cnJlbnRDb2wgIT09IFN0cmluZy5mcm9tQ2hhckNvZGUoZW5kQ29sLmNoYXJDb2RlQXQoMCkgKyAxKSkge1xuICAgICAgICBjb25zdCBzcXVhcmUgPSB0aGlzLmZpbmRTcXVhcmUoY3VycmVudENvbCwgc3RhcnRSb3cpO1xuICAgICAgICBzcXVhcmVbMF0uaGFzU2hpcCA9IHRydWU7XG4gICAgICAgIG9jY3VwaWVkU3F1YXJlcy5wdXNoKGAke2N1cnJlbnRDb2x9JHtzdGFydFJvd31gKTtcbiAgICAgICAgY3VycmVudENvbCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY3VycmVudENvbC5jaGFyQ29kZUF0KDApICsgMSk7XG4gICAgICAgIGxlbmd0aCArPSAxO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNoaXBzLnB1c2goe1xuICAgICAgc3F1YXJlczogb2NjdXBpZWRTcXVhcmVzLFxuICAgICAgbmFtZSxcbiAgICAgIG9iajogc2hpcChsZW5ndGgpLFxuICAgIH0pO1xuICB9LFxuICBhdHRhY2tzOiBbXSxcbiAgdHJhY2tBdHRhY2socG9zaXRpb24sIGF0dGFja0hpdCwgc2Fua1NoaXApIHtcbiAgICB0aGlzLmF0dGFja3MucHVzaCh7IHBvc2l0aW9uLCBhdHRhY2tIaXQsIHNhbmtTaGlwIH0pO1xuICB9LFxuICBhbGxTaGlwc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuc2hpcHMubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgbGV0IHNoaXBzU3VuayA9IDA7XG4gICAgdGhpcy5hdHRhY2tzLmZvckVhY2goKGF0dGFjaykgPT4ge1xuICAgICAgaWYgKGF0dGFjay5zYW5rU2hpcCkgc2hpcHNTdW5rICs9IDE7XG4gICAgfSk7XG4gICAgaWYgKHNoaXBzU3VuayA+PSB0aGlzLnNoaXBzLmxlbmd0aCkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuICBpc1JlcGVhdGVkQXR0YWNrKGNvbCwgcm93KSB7XG4gICAgbGV0IHJlcGVhdCA9IGZhbHNlO1xuICAgIHRoaXMuYXR0YWNrcy5mb3JFYWNoKChhdHRhY2spID0+IHtcbiAgICAgIGlmIChhdHRhY2sucG9zaXRpb24gPT09IGAke2NvbH0ke3Jvd31gKSB7XG4gICAgICAgIHJlcGVhdCA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVwZWF0O1xuICB9LFxuICByZWNlaXZlQXR0YWNrKGNvbCwgcm93KSB7XG4gICAgaWYgKHRoaXMuaXNSZXBlYXRlZEF0dGFjayhjb2wsIHJvdykpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgbGV0IGF0dGFja2VkU2hpcCA9IGZhbHNlO1xuICAgIHRoaXMuc2hpcHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5zcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgICAgICBpZiAoc3F1YXJlID09PSBgJHtjb2x9JHtyb3d9YCkgYXR0YWNrZWRTaGlwID0gaXRlbTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmIChhdHRhY2tlZFNoaXApIHtcbiAgICAgIGF0dGFja2VkU2hpcC5vYmouaGl0KCk7XG4gICAgICB0aGlzLnRyYWNrQXR0YWNrKGAke2NvbH0ke3Jvd31gLCB0cnVlLCBhdHRhY2tlZFNoaXAub2JqLmlzU3VuaygpKTtcbiAgICAgIHJldHVybiBhdHRhY2tlZFNoaXAubmFtZTtcbiAgICB9XG4gICAgdGhpcy50cmFja0F0dGFjayhgJHtjb2x9JHtyb3d9YCwgZmFsc2UsIGZhbHNlKTtcbiAgICByZXR1cm4gYCR7Y29sfSR7cm93fWA7XG4gIH0sXG59KTtcblxuZXhwb3J0IHsgc2hpcCwgZ2FtZUJvYXJkIH07XG4iLCJpbXBvcnQgeyBkaXNwbGF5R2FtZSwgZGlzcGxheUdhbWVPdmVyLCBkaXNwbGF5U2V0dXAgfSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5pbXBvcnQgeyBnYW1lQm9hcmQgfSBmcm9tIFwiLi9nYW1lXCI7XG5pbXBvcnQgeyBjaG9vc2VTcXVhcmUsIHJhbmRvbVNoaXBBcnJheSB9IGZyb20gXCIuL2NvbXB1dGVyXCI7XG5pbXBvcnQgeyBzZXRBY3RpdmVTaGlwLCB0b2dnbGVEaXJlY3Rpb24gfSBmcm9tIFwiLi9wbGFjZW1lbnRcIjtcblxuY29uc3QgcGxheWVyQm9hcmQgPSBnYW1lQm9hcmQoKTtcbmNvbnN0IGNvbXB1dGVyQm9hcmQgPSBnYW1lQm9hcmQoKTtcbmxldCBnYW1lQWN0aXZlID0gdHJ1ZTtcblxuZnVuY3Rpb24gY3JlYXRlQm9hcmRGcm9tQXJyYXkoc2hpcHMsIGJvYXJkLCBib2FyZFR5cGUpIHtcbiAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIGxldCBmaXJzdCA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbmFtZSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbGFzdCA9IHVuZGVmaW5lZDtcbiAgICBzaGlwLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBuYW1lID0gc3F1YXJlLm5hbWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkKSBmaXJzdCA9IHsgY29sOiBzcXVhcmUuY29sLCByb3c6IHNxdWFyZS5yb3cgfTtcbiAgICAgIGxhc3QgPSB7IGNvbDogc3F1YXJlLmNvbCwgcm93OiBzcXVhcmUucm93IH07XG4gICAgICAvLyBEaXNwbGF5IFdoZXJlIFNoaXBzIEFyZVxuICAgICAgaWYgKGJvYXJkVHlwZSA9PT0gXCJwbGF5ZXJcIikge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnRcbiAgICAgICAgICAucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItYm9hcmRcIilcbiAgICAgICAgICAucXVlcnlTZWxlY3RvcihgLiR7c3F1YXJlLmNvbH0ke3NxdWFyZS5yb3d9YCk7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgYm9hcmQucGxhY2VTaGlwKGZpcnN0LmNvbCwgbGFzdC5jb2wsIGZpcnN0LnJvdywgbGFzdC5yb3csIG5hbWUpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdChwbGF5ZXJTaGlwcywgY29tcHV0ZXJTaGlwcykge1xuICBkaXNwbGF5R2FtZSgpO1xuICBjcmVhdGVCb2FyZEZyb21BcnJheShwbGF5ZXJTaGlwcywgcGxheWVyQm9hcmQsIFwicGxheWVyXCIpO1xuICBjcmVhdGVCb2FyZEZyb21BcnJheShjb21wdXRlclNoaXBzLCBjb21wdXRlckJvYXJkLCBcImNvbXB1dGVyXCIpO1xufVxuXG5mdW5jdGlvbiBtYXJrU3F1YXJlKGJvYXJkLCBjb2wsIHJvdywgYm9hcmRUeXBlKSB7XG4gIGJvYXJkLnJlY2VpdmVBdHRhY2soY29sLCByb3cpO1xuICBpZiAoYm9hcmQuYXR0YWNrc1tib2FyZC5hdHRhY2tzLmxlbmd0aCAtIDFdLmF0dGFja0hpdCkge1xuICAgIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihgLiR7Ym9hcmRUeXBlfS1ib2FyZGApXG4gICAgICAucXVlcnlTZWxlY3RvcihgLiR7Y29sfSR7cm93fWApXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC4ke2JvYXJkVHlwZX0tYm9hcmRgKVxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC4ke2NvbH0ke3Jvd31gKVxuICAgICAgLmNsYXNzTGlzdC5hZGQoXCJtaXNzZWRcIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW5kR2FtZSh0ZXh0KSB7XG4gIGdhbWVBY3RpdmUgPSBmYWxzZTtcbiAgZGlzcGxheUdhbWVPdmVyKHRleHQpO1xufVxuXG4vLyBBZHZhbmNlcyBHYW1lXG5mdW5jdGlvbiBoYW5kbGVTcXVhcmVDbGljayhjb2wsIHJvdykge1xuICBpZiAoIWdhbWVBY3RpdmUgfHwgY29tcHV0ZXJCb2FyZC5pc1JlcGVhdGVkQXR0YWNrKGNvbCwgcm93KSkgcmV0dXJuO1xuXG4gIG1hcmtTcXVhcmUoY29tcHV0ZXJCb2FyZCwgY29sLCByb3csIFwiY29tcHV0ZXJcIik7XG4gIGlmIChjb21wdXRlckJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgZW5kR2FtZShcIllvdSBXaW4hXCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGNvbXB1dGVyQ2hvaWNlID0gY2hvb3NlU3F1YXJlKHBsYXllckJvYXJkKTtcbiAgbWFya1NxdWFyZShwbGF5ZXJCb2FyZCwgY29tcHV0ZXJDaG9pY2UuY29sLCBjb21wdXRlckNob2ljZS5yb3csIFwicGxheWVyXCIpO1xuICBpZiAocGxheWVyQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICBlbmRHYW1lKFwiVGhlIENvbXB1dGVyIFdvblwiKTtcbiAgICByZXR1cm47XG4gIH1cbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XG4gIGlmIChlLmtleSA9PT0gXCJyXCIpIHRvZ2dsZURpcmVjdGlvbigpO1xufSk7XG5kaXNwbGF5U2V0dXAoKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBsYWNlbWVudENvbXBsZXRlXCIsIChlKSA9PiB7XG4gIGluaXQoZS5kZXRhaWwucGxheWVyQXJyYXksIHJhbmRvbVNoaXBBcnJheSgpKTtcbn0pO1xuXG5mdW5jdGlvbiBoYW5kbGVQbGFjZW1lbnRTaGlwcygpIHtcbiAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlbWVudFNoaXBcIik7XG4gIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAvLyBUb2dnbGUgT2ZmXG4gICAgICBpZiAoc2hpcC5jbGFzc0xpc3QuY29udGFpbnMoXCJzZWxlY3RlZFwiKSkge1xuICAgICAgICBzaGlwLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgc2V0QWN0aXZlU2hpcCgwLCBcIlwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gRGVzZWxlY3QgT3RoZXIgU2hpcHNcbiAgICAgIHNoaXBzLmZvckVhY2goKGFTaGlwKSA9PiBhU2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIikpO1xuICAgICAgLy8gU2VsZWN0IFNoaXBcbiAgICAgIHNoaXAuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xuICAgICAgc2V0QWN0aXZlU2hpcChzaGlwLmNoaWxkcmVuLmxlbmd0aCwgc2hpcC5jbGFzc0xpc3RbMF0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZXhwb3J0IHsgaGFuZGxlU3F1YXJlQ2xpY2ssIGhhbmRsZVBsYWNlbWVudFNoaXBzIH07XG4iLCJsZXQgYWN0aXZlU2hpcExlbmd0aCA9IDA7XG5sZXQgYWN0aXZlU2hpcE5hbWUgPSBcIlwiO1xubGV0IGRpcmVjdGlvbiA9IFwiY29sU3BhblwiO1xubGV0IHBsYWNlbWVudFZhbGlkID0gZmFsc2U7XG5cbmZ1bmN0aW9uIHNldEFjdGl2ZVNoaXAobGVuZ3RoLCBuYW1lKSB7XG4gIGFjdGl2ZVNoaXBMZW5ndGggPSBsZW5ndGg7XG4gIGFjdGl2ZVNoaXBOYW1lID0gbmFtZTtcbn1cblxuZnVuY3Rpb24gY2xlYXJIb3ZlcmVkKCkge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmhvdmVyZWRcIikuZm9yRWFjaCgoaG92ZXJlZCkgPT4ge1xuICAgIGhvdmVyZWQuY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyZWRcIik7XG4gIH0pO1xufVxuXG5sZXQgc3RhcnRDb2wgPSBcIlwiO1xubGV0IHN0YXJ0Um93ID0gXCJcIjtcblxuZnVuY3Rpb24gdG9nZ2xlRGlyZWN0aW9uKCkge1xuICBkaXJlY3Rpb24gPT09IFwicm93U3BhblwiID8gKGRpcmVjdGlvbiA9IFwiY29sU3BhblwiKSA6IChkaXJlY3Rpb24gPSBcInJvd1NwYW5cIik7XG4gIGRpc3BsYXlIb3ZlcihzdGFydENvbCwgc3RhcnRSb3cpO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5SG92ZXIoY29sLCByb3cpIHtcbiAgaWYgKGNvbCA9PT0gXCJcIiB8fCByb3cgPT09IFwiXCIpIHJldHVybjtcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0ZWRcIikgPT09IG51bGwpIHJldHVybjtcbiAgc3RhcnRDb2wgPSBjb2w7XG4gIGxldCBjdXJyZW50Q29sID0gY29sO1xuICBzdGFydFJvdyA9IHJvdztcbiAgbGV0IGN1cnJlbnRSb3cgPSByb3c7XG4gIGxldCBpdGVyYXRpb25zTGVmdCA9IGFjdGl2ZVNoaXBMZW5ndGg7XG5cbiAgY2xlYXJIb3ZlcmVkKCk7XG5cbiAgd2hpbGUgKGl0ZXJhdGlvbnNMZWZ0ID4gMCkge1xuICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2N1cnJlbnRDb2x9JHtjdXJyZW50Um93fWApO1xuICAgIGlmIChzcXVhcmUgPT09IG51bGwpIHtcbiAgICAgIHBsYWNlbWVudFZhbGlkID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKHNxdWFyZS5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwXCIpKSB7XG4gICAgICBwbGFjZW1lbnRWYWxpZCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJob3ZlcmVkXCIpO1xuICAgIGlmIChkaXJlY3Rpb24gPT09IFwicm93U3BhblwiKSBjdXJyZW50Um93ICs9IDE7XG4gICAgZWxzZSBjdXJyZW50Q29sID0gU3RyaW5nLmZyb21DaGFyQ29kZShjdXJyZW50Q29sLmNoYXJDb2RlQXQoMCkgKyAxKTtcblxuICAgIGl0ZXJhdGlvbnNMZWZ0IC09IDE7XG4gIH1cblxuICBpZiAoaXRlcmF0aW9uc0xlZnQgPT09IDApIHBsYWNlbWVudFZhbGlkID0gdHJ1ZTtcbn1cblxubGV0IHBsYXllckFycmF5ID0gW107XG5mdW5jdGlvbiByZXNldFBsYWNlbWVudCgpIHtcbiAgcGxheWVyQXJyYXkubGVuZ3RoID0gMDtcbn1cblxuZnVuY3Rpb24gcGxhY2VTaGlwKGNvbCwgcm93KSB7XG4gIGlmICghcGxhY2VtZW50VmFsaWQpIHJldHVybjtcbiAgbGV0IHNoaXBBcnJheSA9IFt7IG5hbWU6IGFjdGl2ZVNoaXBOYW1lIH1dO1xuICBsZXQgY3VycmVudENvbCA9IGNvbDtcbiAgbGV0IGN1cnJlbnRSb3cgPSByb3c7XG4gIGxldCBpdGVyYXRpb25zTGVmdCA9IGFjdGl2ZVNoaXBMZW5ndGg7XG4gIHdoaWxlIChpdGVyYXRpb25zTGVmdCA+IDApIHtcbiAgICBzaGlwQXJyYXkucHVzaCh7IGNvbDogY3VycmVudENvbCwgcm93OiBjdXJyZW50Um93IH0pO1xuICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2N1cnJlbnRDb2x9JHtjdXJyZW50Um93fWApO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcInJvd1NwYW5cIikgY3VycmVudFJvdyArPSAxO1xuICAgIGVsc2UgY3VycmVudENvbCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY3VycmVudENvbC5jaGFyQ29kZUF0KDApICsgMSk7XG4gICAgaXRlcmF0aW9uc0xlZnQgLT0gMTtcbiAgfVxuICBwbGF5ZXJBcnJheS5wdXNoKHNoaXBBcnJheSk7XG5cbiAgY2xlYXJIb3ZlcmVkKCk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0ZWRcIikucmVtb3ZlKCk7XG4gIHBsYWNlbWVudFZhbGlkID0gZmFsc2U7XG5cbiAgLy8gSWYgYWxsIHNoaXBzIGFyZSBwbGFjZWQgaW5pdCB0aGUgZ2FtZVxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGFjZW1lbnRTaGlwXCIpID09PSBudWxsKSB7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXCJwbGFjZW1lbnRDb21wbGV0ZVwiLCB7XG4gICAgICBkZXRhaWw6IHsgcGxheWVyQXJyYXkgfSxcbiAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgY29tcG9zZWQ6IGZhbHNlLFxuICAgIH0pO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1jb250YWluZXJdXCIpLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIHNldEFjdGl2ZVNoaXAsXG4gIHRvZ2dsZURpcmVjdGlvbixcbiAgZGlzcGxheUhvdmVyLFxuICBwbGFjZVNoaXAsXG4gIHJlc2V0UGxhY2VtZW50LFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOlsiZ2V0UG9zc2libGVDaG9pY2VzIiwiYm9hcmQiLCJwb3NzaWJsZVNxdWFyZXMiLCJpIiwiaiIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImNoYXJDb2RlQXQiLCJpc1JlcGVhdGVkQXR0YWNrIiwicHVzaCIsInJvdyIsImNvbCIsImNob29zZVNxdWFyZSIsInNxdWFyZXMiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJsZW5ndGgiLCJyYW5kb21TaGlwQXJyYXkiLCJzaGlwTGVuZ3RocyIsInNoaXBOYW1lcyIsInNoaXBzIiwiX2xvb3AiLCJ2YWxpZFBsYWNlbWVudCIsImRpcmVjdGlvbiIsInN0YXJ0Um93IiwiY2VpbCIsInN0YXJ0Q29sIiwiY3VycmVudFNoaXAiLCJuYW1lIiwiY3VycmVudENvbCIsImN1cnJlbnRSb3ciLCJmb3JFYWNoIiwic2hpcCIsInBvcCIsImhhbmRsZVNxdWFyZUNsaWNrIiwiaGFuZGxlUGxhY2VtZW50U2hpcHMiLCJkaXNwbGF5SG92ZXIiLCJwbGFjZVNoaXAiLCJ0b2dnbGVEaXJlY3Rpb24iLCJyZXNldFBsYWNlbWVudCIsImNvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNyZWF0ZUJvYXJkIiwiY3JlYXRlRWxlbWVudCIsIl9sb29wMiIsInNxdWFyZSIsImNsYXNzTGlzdCIsImFkZCIsImNvbmNhdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXJlbnRFbGVtZW50IiwiY29udGFpbnMiLCJhcHBlbmRDaGlsZCIsInJlc2V0IiwidGV4dENvbnRlbnQiLCJjcmVhdGVIZWFkZXIiLCJoZWFkZXIiLCJjcmVhdGVGb290ZXIiLCJmb290ZXIiLCJjcmVhdGVUaXRsZSIsInRleHQiLCJ0aXRsZSIsImRpc3BsYXlHYW1lIiwic2VjdGlvbiIsImNvbXB1dGVyVGl0bGUiLCJwbGF5ZXJUaXRsZSIsImNvbXB1dGVyQm9hcmQiLCJwbGF5ZXJCb2FyZCIsImRpc3BsYXlHYW1lT3ZlciIsInBvcFVwIiwiZ2FtZU92ZXJUZXh0IiwicmVwbGF5QnV0dG9uIiwib3ZlcmxheSIsImNyZWF0ZVNoaXAiLCJzcXVhcmVBbW91bnQiLCJjbGFzc05hbWUiLCJkaXNwbGF5U2V0dXAiLCJidXR0b25zIiwicm90YXRlQnV0dG9uIiwicmVzZXRCdXR0b24iLCJzaGlwc0NvbnRhaW5lciIsImFpcmNyYWZ0Q2FycmllciIsImJhdHRsZXNoaXAiLCJzdWJtYXJpbmUiLCJkZXN0cm95ZXIiLCJwYXRyb2xCb2F0IiwibGVuIiwiaGl0cyIsImhpdCIsImlzU3VuayIsImNvbHVtbiIsIk9iamVjdCIsImFzc2lnbiIsInBvc2l0aW9uIiwiaGFzU2hpcCIsImdhbWVCb2FyZCIsImZpbmRTcXVhcmUiLCJmaWx0ZXIiLCJvYmoiLCJjaGVja1Bvc2l0aW9uIiwicmVzdWx0IiwiZW5kQ29sIiwiZW5kUm93Iiwib2NjdXBpZWRTcXVhcmVzIiwiYXR0YWNrcyIsInRyYWNrQXR0YWNrIiwiYXR0YWNrSGl0Iiwic2Fua1NoaXAiLCJhbGxTaGlwc1N1bmsiLCJzaGlwc1N1bmsiLCJhdHRhY2siLCJyZXBlYXQiLCJyZWNlaXZlQXR0YWNrIiwidW5kZWZpbmVkIiwiYXR0YWNrZWRTaGlwIiwiaXRlbSIsInNldEFjdGl2ZVNoaXAiLCJnYW1lQWN0aXZlIiwiY3JlYXRlQm9hcmRGcm9tQXJyYXkiLCJib2FyZFR5cGUiLCJmaXJzdCIsImxhc3QiLCJlbGVtZW50IiwiaW5pdCIsInBsYXllclNoaXBzIiwiY29tcHV0ZXJTaGlwcyIsIm1hcmtTcXVhcmUiLCJlbmRHYW1lIiwiY29tcHV0ZXJDaG9pY2UiLCJ3aW5kb3ciLCJlIiwia2V5IiwiZGV0YWlsIiwicGxheWVyQXJyYXkiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVtb3ZlIiwiYVNoaXAiLCJjaGlsZHJlbiIsImFjdGl2ZVNoaXBMZW5ndGgiLCJhY3RpdmVTaGlwTmFtZSIsInBsYWNlbWVudFZhbGlkIiwiY2xlYXJIb3ZlcmVkIiwiaG92ZXJlZCIsIml0ZXJhdGlvbnNMZWZ0Iiwic2hpcEFycmF5IiwiZXZlbnQiLCJDdXN0b21FdmVudCIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwiY29tcG9zZWQiLCJkaXNwYXRjaEV2ZW50Il0sInNvdXJjZVJvb3QiOiIifQ==
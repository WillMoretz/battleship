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
          (0,_placement__WEBPACK_IMPORTED_MODULE_1__.displayHover)(j, i);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM7RUFDakU7QUFDRjs7Ozs7OztVQzNGQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kaXNwbGF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxhY2VtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZ2V0UG9zc2libGVDaG9pY2VzKGJvYXJkKSB7XG4gIGNvbnN0IHBvc3NpYmxlU3F1YXJlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IDExOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gXCJhXCI7IGogIT09IFwia1wiOyBqID0gU3RyaW5nLmZyb21DaGFyQ29kZShqLmNoYXJDb2RlQXQoMCkgKyAxKSkge1xuICAgICAgaWYgKCFib2FyZC5pc1JlcGVhdGVkQXR0YWNrKGosIGkpKVxuICAgICAgICBwb3NzaWJsZVNxdWFyZXMucHVzaCh7IHJvdzogaSwgY29sOiBqIH0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcG9zc2libGVTcXVhcmVzO1xufVxuXG5mdW5jdGlvbiBjaG9vc2VTcXVhcmUoYm9hcmQpIHtcbiAgY29uc3Qgc3F1YXJlcyA9IGdldFBvc3NpYmxlQ2hvaWNlcyhib2FyZCk7XG4gIHJldHVybiBzcXVhcmVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNxdWFyZXMubGVuZ3RoKV07XG59XG5cbmZ1bmN0aW9uIHJhbmRvbVNoaXBBcnJheSgpIHtcbiAgY29uc3Qgc2hpcExlbmd0aHMgPSBbMiwgMywgMywgNCwgNV07XG4gIGNvbnN0IHNoaXBOYW1lcyA9IFtcbiAgICBcIlBhdHJvbCBCb2F0XCIsXG4gICAgXCJTdWJtYXJpbmVcIixcbiAgICBcIkRlc3Ryb3llclwiLFxuICAgIFwiQmF0dGxlU2hpcFwiLFxuICAgIFwiQWlyY3JhZnQgQ2FycmllclwiLFxuICBdO1xuICBjb25zdCBzaGlwcyA9IFtdO1xuICB3aGlsZSAoc2hpcExlbmd0aHMubGVuZ3RoID4gMCkge1xuICAgIGxldCB2YWxpZFBsYWNlbWVudCA9IHRydWU7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/IFwicm93U3BhblwiIDogXCJjb2xTcGFuXCI7XG5cbiAgICBjb25zdCBzdGFydFJvdyA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGNvbnN0IHN0YXJ0Q29sID0gU3RyaW5nLmZyb21DaGFyQ29kZSg5NiArIE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogMTApKTtcblxuICAgIGNvbnN0IGN1cnJlbnRTaGlwID0gW3sgbmFtZTogc2hpcE5hbWVzW3NoaXBOYW1lcy5sZW5ndGggLSAxXSB9XTtcblxuICAgIGxldCBjdXJyZW50Q29sID0gc3RhcnRDb2w7XG4gICAgbGV0IGN1cnJlbnRSb3cgPSBzdGFydFJvdztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHNbc2hpcExlbmd0aHMubGVuZ3RoIC0gMV07IGkrKykge1xuICAgICAgLy8gT3V0IG9mIEJvdW5kc1xuICAgICAgaWYgKGN1cnJlbnRSb3cgPT09IDExKSB7XG4gICAgICAgIHZhbGlkUGxhY2VtZW50ID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnRDb2wgPT09IFwia1wiKSB7XG4gICAgICAgIHZhbGlkUGxhY2VtZW50ID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICAvLyBPdmVybGFwXG4gICAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgc2hpcC5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmIChjdXJyZW50Q29sID09PSBzaGlwW2pdLmNvbCAmJiBjdXJyZW50Um93ID09PSBzaGlwW2pdLnJvdykge1xuICAgICAgICAgICAgdmFsaWRQbGFjZW1lbnQgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmICghdmFsaWRQbGFjZW1lbnQpIGJyZWFrO1xuICAgICAgY3VycmVudFNoaXAucHVzaCh7IGNvbDogY3VycmVudENvbCwgcm93OiBjdXJyZW50Um93IH0pO1xuICAgICAgLy8gSW5jcmVtZW50XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBcInJvd1NwYW5cIikgY3VycmVudFJvdyArPSAxO1xuICAgICAgZWxzZSBjdXJyZW50Q29sID0gU3RyaW5nLmZyb21DaGFyQ29kZShjdXJyZW50Q29sLmNoYXJDb2RlQXQoMCkgKyAxKTtcbiAgICB9XG5cbiAgICBpZiAodmFsaWRQbGFjZW1lbnQpIHtcbiAgICAgIHNoaXBzLnB1c2goY3VycmVudFNoaXApO1xuICAgICAgc2hpcExlbmd0aHMucG9wKCk7XG4gICAgICBzaGlwTmFtZXMucG9wKCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzaGlwcztcbn1cblxuZXhwb3J0IHsgY2hvb3NlU3F1YXJlLCBnZXRQb3NzaWJsZUNob2ljZXMsIHJhbmRvbVNoaXBBcnJheSB9O1xuIiwiaW1wb3J0IHsgaGFuZGxlU3F1YXJlQ2xpY2ssIGhhbmRsZVBsYWNlbWVudFNoaXBzIH0gZnJvbSBcIi4vaW5kZXhcIjtcbmltcG9ydCB7XG4gIGRpc3BsYXlIb3ZlcixcbiAgcGxhY2VTaGlwLFxuICB0b2dnbGVEaXJlY3Rpb24sXG4gIHJlc2V0UGxhY2VtZW50LFxufSBmcm9tIFwiLi9wbGFjZW1lbnRcIjtcblxuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWNvbnRhaW5lcl1cIik7XG5cbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkKCkge1xuICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgMTE7IGkgKz0gMSkge1xuICAgIGZvciAobGV0IGogPSBcImFcIjsgaiAhPT0gXCJrXCI7IGogPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGouY2hhckNvZGVBdCgwKSArIDEpKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmVcIik7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChgJHtqfSR7aX1gKTtcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoc3F1YXJlLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGxheWVyLWJvYXJkXCIpKSByZXR1cm47XG4gICAgICAgIGlmIChzcXVhcmUucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb21wdXRlci1ib2FyZFwiKSlcbiAgICAgICAgICBoYW5kbGVTcXVhcmVDbGljayhqLCBpKTtcbiAgICAgICAgaWYgKHNxdWFyZS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcInNldHVwLWJvYXJkXCIpKSB7XG4gICAgICAgICAgZGlzcGxheUhvdmVyKGosIGkpO1xuICAgICAgICAgIHBsYWNlU2hpcChqLCBpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoKSA9PiB7XG4gICAgICAgIGlmICghc3F1YXJlLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2V0dXAtYm9hcmRcIikpIHJldHVybjtcbiAgICAgICAgZGlzcGxheUhvdmVyKGosIGkpO1xuICAgICAgfSk7XG4gICAgICBib2FyZC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIik7XG4gICAgICBib2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYm9hcmQ7XG59XG5cbmZ1bmN0aW9uIHJlc2V0KCkge1xuICBjb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVIZWFkZXIoKSB7XG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIik7XG4gIGhlYWRlci50ZXh0Q29udGVudCA9IFwiQmF0dGxlc2hpcFwiO1xuICByZXR1cm4gaGVhZGVyO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGb290ZXIoKSB7XG4gIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb290ZXJcIik7XG4gIGZvb3Rlci50ZXh0Q29udGVudCA9IFwiTWFkZSBieSBXaWxsIE1vcmV0elwiO1xuICByZXR1cm4gZm9vdGVyO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVUaXRsZSh0ZXh0KSB7XG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdGl0bGUuY2xhc3NMaXN0LmFkZChcInRpdGxlXCIpO1xuICB0aXRsZS50ZXh0Q29udGVudCA9IHRleHQ7XG4gIHJldHVybiB0aXRsZTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheUdhbWUoKSB7XG4gIHJlc2V0KCk7XG5cbiAgY29uc3QgaGVhZGVyID0gY3JlYXRlSGVhZGVyKCk7XG4gIGNvbnN0IGZvb3RlciA9IGNyZWF0ZUZvb3RlcigpO1xuICBjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gIGNvbnN0IGNvbXB1dGVyVGl0bGUgPSBjcmVhdGVUaXRsZShcIkNvbXB1dGVyJ3MgQm9hcmRcIik7XG4gIGNvbnN0IHBsYXllclRpdGxlID0gY3JlYXRlVGl0bGUoXCJZb3VyIEJvYXJkXCIpO1xuICBjb25zdCBjb21wdXRlckJvYXJkID0gY3JlYXRlQm9hcmQoKTtcbiAgY29tcHV0ZXJCb2FyZC5jbGFzc0xpc3QuYWRkKFwiY29tcHV0ZXItYm9hcmRcIik7XG4gIGNvbnN0IHBsYXllckJvYXJkID0gY3JlYXRlQm9hcmQoKTtcbiAgcGxheWVyQm9hcmQuY2xhc3NMaXN0LmFkZChcInBsYXllci1ib2FyZFwiKTtcblxuICBzZWN0aW9uLmFwcGVuZENoaWxkKGNvbXB1dGVyVGl0bGUpO1xuICBzZWN0aW9uLmFwcGVuZENoaWxkKGNvbXB1dGVyQm9hcmQsIG51bGwpO1xuICBzZWN0aW9uLmFwcGVuZENoaWxkKHBsYXllclRpdGxlKTtcbiAgc2VjdGlvbi5hcHBlbmRDaGlsZChwbGF5ZXJCb2FyZCk7XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWN0aW9uKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZvb3Rlcik7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlHYW1lT3Zlcih0ZXh0KSB7XG4gIGNvbnN0IHBvcFVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgcG9wVXAuY2xhc3NMaXN0LmFkZChcInBvcC11cFwiKTtcblxuICBjb25zdCBnYW1lT3ZlclRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBnYW1lT3ZlclRleHQuY2xhc3NMaXN0LmFkZChcImdhbWUtb3Zlci10ZXh0XCIpO1xuICBnYW1lT3ZlclRleHQudGV4dENvbnRlbnQgPSB0ZXh0O1xuXG4gIGNvbnN0IHJlcGxheUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHJlcGxheUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiUmVwbGF5XCI7XG4gIHJlcGxheUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicmVwbGF5LWJ1dHRvblwiKTtcbiAgcmVwbGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZGlzcGxheVNldHVwKCk7XG4gICAgcmVzZXRQbGFjZW1lbnQoKTtcbiAgfSk7XG5cbiAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG92ZXJsYXkuY2xhc3NMaXN0LmFkZChcIm92ZXJsYXlcIik7XG5cbiAgcG9wVXAuYXBwZW5kQ2hpbGQoZ2FtZU92ZXJUZXh0KTtcbiAgcG9wVXAuYXBwZW5kQ2hpbGQocmVwbGF5QnV0dG9uKTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwb3BVcCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNoaXAoc3F1YXJlQW1vdW50LCBjbGFzc05hbWUpIHtcbiAgY29uc3Qgc2hpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHNoaXAuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICBzaGlwLmNsYXNzTGlzdC5hZGQoXCJwbGFjZW1lbnRTaGlwXCIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNxdWFyZUFtb3VudDsgaSsrKSB7XG4gICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzaGlwLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gIH1cbiAgcmV0dXJuIHNoaXA7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlTZXR1cCgpIHtcbiAgcmVzZXQoKTtcblxuICBjb25zdCBoZWFkZXIgPSBjcmVhdGVIZWFkZXIoKTtcbiAgY29uc3QgZm9vdGVyID0gY3JlYXRlRm9vdGVyKCk7XG4gIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgY29uc3QgdGl0bGUgPSBjcmVhdGVUaXRsZShcIlBsYWNlIFlvdXIgU2hpcHMhXCIpO1xuICBjb25zdCBib2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG4gIGJvYXJkLmNsYXNzTGlzdC5hZGQoXCJzZXR1cC1ib2FyZFwiKTtcblxuICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYnV0dG9ucy5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uc1wiKTtcblxuICBjb25zdCByb3RhdGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICByb3RhdGVCdXR0b24udGV4dENvbnRlbnQgPSBcIlJvdGF0ZSAocilcIjtcbiAgcm90YXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyb3RhdGUtYnV0dG9uXCIpO1xuICByb3RhdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICB0b2dnbGVEaXJlY3Rpb24oKTtcbiAgfSk7XG5cbiAgY29uc3QgcmVzZXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICByZXNldEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiUmVzZXRcIjtcbiAgcmVzZXRCdXR0b24uY2xhc3NMaXN0LmFkZChcInJlc2V0LWJ1dHRvblwiKTtcbiAgcmVzZXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIGRpc3BsYXlTZXR1cCgpO1xuICAgIHJlc2V0UGxhY2VtZW50KCk7XG4gIH0pO1xuXG4gIGNvbnN0IHNoaXBzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc2hpcHNDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInNoaXBzLWNvbnRhaW5lclwiKTtcblxuICBjb25zdCBhaXJjcmFmdENhcnJpZXIgPSBjcmVhdGVTaGlwKDUsIFwiYWlyY3JhZnQtY2FycmllclwiKTtcbiAgY29uc3QgYmF0dGxlc2hpcCA9IGNyZWF0ZVNoaXAoNCwgXCJiYXR0bGVzaGlwXCIpO1xuICBjb25zdCBzdWJtYXJpbmUgPSBjcmVhdGVTaGlwKDMsIFwic3VibWFyaW5lXCIpO1xuICBjb25zdCBkZXN0cm95ZXIgPSBjcmVhdGVTaGlwKDMsIFwiZGVzdHJveWVyXCIpO1xuICBjb25zdCBwYXRyb2xCb2F0ID0gY3JlYXRlU2hpcCgyLCBcInBhdHJvbC1ib2F0XCIpO1xuXG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQodGl0bGUpO1xuICBzZWN0aW9uLmFwcGVuZENoaWxkKGJvYXJkKTtcblxuICBidXR0b25zLmFwcGVuZENoaWxkKHJvdGF0ZUJ1dHRvbik7XG4gIGJ1dHRvbnMuYXBwZW5kQ2hpbGQocmVzZXRCdXR0b24pO1xuXG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGFpcmNyYWZ0Q2Fycmllcik7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGJhdHRsZXNoaXApO1xuICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChzdWJtYXJpbmUpO1xuICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChkZXN0cm95ZXIpO1xuICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChwYXRyb2xCb2F0KTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNlY3Rpb24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9ucyk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzaGlwc0NvbnRhaW5lcik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb290ZXIpO1xuICBoYW5kbGVQbGFjZW1lbnRTaGlwcygpO1xufVxuXG5leHBvcnQgeyBkaXNwbGF5R2FtZSwgZGlzcGxheVNldHVwLCBkaXNwbGF5R2FtZU92ZXIgfTtcbiIsImNvbnN0IHNoaXAgPSAobGVuKSA9PiAoe1xuICBsZW5ndGg6IGxlbixcbiAgaGl0czogMCxcbiAgaGl0KCkge1xuICAgIHRoaXMuaGl0cyArPSAxO1xuICB9LFxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbn0pO1xuXG5mdW5jdGlvbiBjcmVhdGVCb2FyZCgpIHtcbiAgY29uc3QgYm9hcmQgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMTsgaSsrKSB7XG4gICAgY29uc3QgY29sdW1uID0ge307XG4gICAgT2JqZWN0LmFzc2lnbihjb2x1bW4sIHtcbiAgICAgIGNvbHVtbjogaSxcbiAgICAgIHJvdzogW1xuICAgICAgICB7IHBvc2l0aW9uOiBgYSR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgYiR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgYyR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgZCR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgZSR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgZiR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgZyR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgaCR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgaSR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgaiR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgXSxcbiAgICB9KTtcbiAgICBib2FyZC5wdXNoKGNvbHVtbik7XG4gIH1cbiAgcmV0dXJuIGJvYXJkO1xufVxuXG5jb25zdCBnYW1lQm9hcmQgPSAoKSA9PiAoe1xuICBib2FyZDogY3JlYXRlQm9hcmQoKSxcbiAgZmluZFNxdWFyZShjb2wsIHJvdykge1xuICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuYm9hcmRbcm93IC0gMV0ucm93LmZpbHRlcigob2JqKSA9PiB7XG4gICAgICByZXR1cm4gb2JqLnBvc2l0aW9uID09PSBgJHtjb2x9JHtyb3d9YDtcbiAgICB9KTtcbiAgICByZXR1cm4gc3F1YXJlO1xuICB9LFxuICBjaGVja1Bvc2l0aW9uKGNvbCwgcm93KSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgY29uc3Qgc3F1YXJlID0gdGhpcy5maW5kU3F1YXJlKGNvbCwgcm93KTtcbiAgICBjb25zdCBwb3NpdGlvbiA9IHNxdWFyZVswXS5wb3NpdGlvbjtcbiAgICBjb25zdCBoYXNTaGlwID0gc3F1YXJlWzBdLmhhc1NoaXA7XG4gICAgT2JqZWN0LmFzc2lnbihyZXN1bHQsIHsgcG9zaXRpb24sIGhhc1NoaXAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcbiAgc2hpcHM6IFtdLFxuICBwbGFjZVNoaXAoc3RhcnRDb2wsIGVuZENvbCwgc3RhcnRSb3csIGVuZFJvdywgbmFtZSkge1xuICAgIGxldCBsZW5ndGggPSAwO1xuICAgIGxldCBvY2N1cGllZFNxdWFyZXMgPSBbXTtcbiAgICBpZiAoc3RhcnRSb3cgIT09IGVuZFJvdykge1xuICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0Um93OyBpIDwgZW5kUm93ICsgMTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuZmluZFNxdWFyZShzdGFydENvbCwgaSk7XG4gICAgICAgIHNxdWFyZVswXS5oYXNTaGlwID0gdHJ1ZTtcbiAgICAgICAgbGVuZ3RoICs9IDE7XG4gICAgICAgIG9jY3VwaWVkU3F1YXJlcy5wdXNoKGAke3N0YXJ0Q29sfSR7aX1gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGN1cnJlbnRDb2wgPSBzdGFydENvbDtcbiAgICAgIHdoaWxlIChjdXJyZW50Q29sICE9PSBTdHJpbmcuZnJvbUNoYXJDb2RlKGVuZENvbC5jaGFyQ29kZUF0KDApICsgMSkpIHtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gdGhpcy5maW5kU3F1YXJlKGN1cnJlbnRDb2wsIHN0YXJ0Um93KTtcbiAgICAgICAgc3F1YXJlWzBdLmhhc1NoaXAgPSB0cnVlO1xuICAgICAgICBvY2N1cGllZFNxdWFyZXMucHVzaChgJHtjdXJyZW50Q29sfSR7c3RhcnRSb3d9YCk7XG4gICAgICAgIGN1cnJlbnRDb2wgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGN1cnJlbnRDb2wuY2hhckNvZGVBdCgwKSArIDEpO1xuICAgICAgICBsZW5ndGggKz0gMTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zaGlwcy5wdXNoKHtcbiAgICAgIHNxdWFyZXM6IG9jY3VwaWVkU3F1YXJlcyxcbiAgICAgIG5hbWUsXG4gICAgICBvYmo6IHNoaXAobGVuZ3RoKSxcbiAgICB9KTtcbiAgfSxcbiAgYXR0YWNrczogW10sXG4gIHRyYWNrQXR0YWNrKHBvc2l0aW9uLCBhdHRhY2tIaXQsIHNhbmtTaGlwKSB7XG4gICAgdGhpcy5hdHRhY2tzLnB1c2goeyBwb3NpdGlvbiwgYXR0YWNrSGl0LCBzYW5rU2hpcCB9KTtcbiAgfSxcbiAgYWxsU2hpcHNTdW5rKCkge1xuICAgIGlmICh0aGlzLnNoaXBzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuICAgIGxldCBzaGlwc1N1bmsgPSAwO1xuICAgIHRoaXMuYXR0YWNrcy5mb3JFYWNoKChhdHRhY2spID0+IHtcbiAgICAgIGlmIChhdHRhY2suc2Fua1NoaXApIHNoaXBzU3VuayArPSAxO1xuICAgIH0pO1xuICAgIGlmIChzaGlwc1N1bmsgPj0gdGhpcy5zaGlwcy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbiAgaXNSZXBlYXRlZEF0dGFjayhjb2wsIHJvdykge1xuICAgIGxldCByZXBlYXQgPSBmYWxzZTtcbiAgICB0aGlzLmF0dGFja3MuZm9yRWFjaCgoYXR0YWNrKSA9PiB7XG4gICAgICBpZiAoYXR0YWNrLnBvc2l0aW9uID09PSBgJHtjb2x9JHtyb3d9YCkge1xuICAgICAgICByZXBlYXQgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcGVhdDtcbiAgfSxcbiAgcmVjZWl2ZUF0dGFjayhjb2wsIHJvdykge1xuICAgIGlmICh0aGlzLmlzUmVwZWF0ZWRBdHRhY2soY29sLCByb3cpKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGxldCBhdHRhY2tlZFNoaXAgPSBmYWxzZTtcbiAgICB0aGlzLnNoaXBzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0uc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICAgICAgaWYgKHNxdWFyZSA9PT0gYCR7Y29sfSR7cm93fWApIGF0dGFja2VkU2hpcCA9IGl0ZW07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZiAoYXR0YWNrZWRTaGlwKSB7XG4gICAgICBhdHRhY2tlZFNoaXAub2JqLmhpdCgpO1xuICAgICAgdGhpcy50cmFja0F0dGFjayhgJHtjb2x9JHtyb3d9YCwgdHJ1ZSwgYXR0YWNrZWRTaGlwLm9iai5pc1N1bmsoKSk7XG4gICAgICByZXR1cm4gYXR0YWNrZWRTaGlwLm5hbWU7XG4gICAgfVxuICAgIHRoaXMudHJhY2tBdHRhY2soYCR7Y29sfSR7cm93fWAsIGZhbHNlLCBmYWxzZSk7XG4gICAgcmV0dXJuIGAke2NvbH0ke3Jvd31gO1xuICB9LFxufSk7XG5cbmV4cG9ydCB7IHNoaXAsIGdhbWVCb2FyZCB9O1xuIiwiaW1wb3J0IHsgZGlzcGxheUdhbWUsIGRpc3BsYXlHYW1lT3ZlciwgZGlzcGxheVNldHVwIH0gZnJvbSBcIi4vZGlzcGxheVwiO1xuaW1wb3J0IHsgZ2FtZUJvYXJkIH0gZnJvbSBcIi4vZ2FtZVwiO1xuaW1wb3J0IHsgY2hvb3NlU3F1YXJlLCByYW5kb21TaGlwQXJyYXkgfSBmcm9tIFwiLi9jb21wdXRlclwiO1xuaW1wb3J0IHsgc2V0QWN0aXZlU2hpcCwgdG9nZ2xlRGlyZWN0aW9uIH0gZnJvbSBcIi4vcGxhY2VtZW50XCI7XG5cbmxldCBwbGF5ZXJCb2FyZDtcbmxldCBjb21wdXRlckJvYXJkO1xuXG5mdW5jdGlvbiBjcmVhdGVCb2FyZEZyb21BcnJheShzaGlwcywgYm9hcmQsIGJvYXJkVHlwZSkge1xuICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgbGV0IGZpcnN0ID0gdW5kZWZpbmVkO1xuICAgIGxldCBuYW1lID0gdW5kZWZpbmVkO1xuICAgIGxldCBsYXN0ID0gdW5kZWZpbmVkO1xuICAgIHNoaXAuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG5hbWUgPSBzcXVhcmUubmFtZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGZpcnN0ID09PSB1bmRlZmluZWQpIGZpcnN0ID0geyBjb2w6IHNxdWFyZS5jb2wsIHJvdzogc3F1YXJlLnJvdyB9O1xuICAgICAgbGFzdCA9IHsgY29sOiBzcXVhcmUuY29sLCByb3c6IHNxdWFyZS5yb3cgfTtcbiAgICAgIC8vIERpc3BsYXkgV2hlcmUgU2hpcHMgQXJlXG4gICAgICBpZiAoYm9hcmRUeXBlID09PSBcInBsYXllclwiKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudFxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1ib2FyZFwiKVxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHtzcXVhcmUuY29sfSR7c3F1YXJlLnJvd31gKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBib2FyZC5wbGFjZVNoaXAoZmlyc3QuY29sLCBsYXN0LmNvbCwgZmlyc3Qucm93LCBsYXN0LnJvdywgbmFtZSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpbml0KHBsYXllclNoaXBzLCBjb21wdXRlclNoaXBzKSB7XG4gIGRpc3BsYXlHYW1lKCk7XG4gIHBsYXllckJvYXJkID0gZ2FtZUJvYXJkKCk7XG4gIGNyZWF0ZUJvYXJkRnJvbUFycmF5KHBsYXllclNoaXBzLCBwbGF5ZXJCb2FyZCwgXCJwbGF5ZXJcIik7XG4gIGNvbXB1dGVyQm9hcmQgPSBnYW1lQm9hcmQoKTtcbiAgY3JlYXRlQm9hcmRGcm9tQXJyYXkoY29tcHV0ZXJTaGlwcywgY29tcHV0ZXJCb2FyZCwgXCJjb21wdXRlclwiKTtcbn1cblxuZnVuY3Rpb24gbWFya1NxdWFyZShib2FyZCwgY29sLCByb3csIGJvYXJkVHlwZSkge1xuICBib2FyZC5yZWNlaXZlQXR0YWNrKGNvbCwgcm93KTtcbiAgaWYgKGJvYXJkLmF0dGFja3NbYm9hcmQuYXR0YWNrcy5sZW5ndGggLSAxXS5hdHRhY2tIaXQpIHtcbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC4ke2JvYXJkVHlwZX0tYm9hcmRgKVxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC4ke2NvbH0ke3Jvd31gKVxuICAgICAgLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHtib2FyZFR5cGV9LWJvYXJkYClcbiAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHtjb2x9JHtyb3d9YClcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwibWlzc2VkXCIpO1xuICB9XG59XG5cbi8vIEFkdmFuY2VzIEdhbWVcbmZ1bmN0aW9uIGhhbmRsZVNxdWFyZUNsaWNrKGNvbCwgcm93KSB7XG4gIGlmIChjb21wdXRlckJvYXJkLmlzUmVwZWF0ZWRBdHRhY2soY29sLCByb3cpKSByZXR1cm47XG5cbiAgbWFya1NxdWFyZShjb21wdXRlckJvYXJkLCBjb2wsIHJvdywgXCJjb21wdXRlclwiKTtcbiAgaWYgKGNvbXB1dGVyQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICBkaXNwbGF5R2FtZU92ZXIoXCJZb3UgV29uXCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGNvbXB1dGVyQ2hvaWNlID0gY2hvb3NlU3F1YXJlKHBsYXllckJvYXJkKTtcbiAgbWFya1NxdWFyZShwbGF5ZXJCb2FyZCwgY29tcHV0ZXJDaG9pY2UuY29sLCBjb21wdXRlckNob2ljZS5yb3csIFwicGxheWVyXCIpO1xuICBpZiAocGxheWVyQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICBkaXNwbGF5R2FtZU92ZXIoXCJUaGUgQ29tcHV0ZXIgV29uXCIpO1xuICAgIHJldHVybjtcbiAgfVxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicGxhY2VtZW50Q29tcGxldGVcIiwgKGUpID0+IHtcbiAgaW5pdChlLmRldGFpbC5wbGF5ZXJBcnJheSwgcmFuZG9tU2hpcEFycmF5KCkpO1xufSk7XG5cbmZ1bmN0aW9uIGhhbmRsZVBsYWNlbWVudFNoaXBzKCkge1xuICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhY2VtZW50U2hpcFwiKTtcbiAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIC8vIFRvZ2dsZSBPZmZcbiAgICAgIGlmIChzaGlwLmNsYXNzTGlzdC5jb250YWlucyhcInNlbGVjdGVkXCIpKSB7XG4gICAgICAgIHNoaXAuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpO1xuICAgICAgICBzZXRBY3RpdmVTaGlwKDAsIFwiXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBEZXNlbGVjdCBPdGhlciBTaGlwc1xuICAgICAgc2hpcHMuZm9yRWFjaCgoYVNoaXApID0+IGFTaGlwLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKSk7XG4gICAgICAvLyBTZWxlY3QgU2hpcFxuICAgICAgc2hpcC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gICAgICBzZXRBY3RpdmVTaGlwKHNoaXAuY2hpbGRyZW4ubGVuZ3RoLCBzaGlwLmNsYXNzTGlzdFswXSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHtcbiAgaWYgKGUua2V5ID09PSBcInJcIikgdG9nZ2xlRGlyZWN0aW9uKCk7XG59KTtcbmRpc3BsYXlTZXR1cCgpO1xuXG5leHBvcnQgeyBoYW5kbGVTcXVhcmVDbGljaywgaGFuZGxlUGxhY2VtZW50U2hpcHMgfTtcbiIsImxldCBhY3RpdmVTaGlwTGVuZ3RoID0gMDtcbmxldCBhY3RpdmVTaGlwTmFtZSA9IFwiXCI7XG5sZXQgZGlyZWN0aW9uID0gXCJjb2xTcGFuXCI7XG5sZXQgcGxhY2VtZW50VmFsaWQgPSBmYWxzZTtcblxuZnVuY3Rpb24gc2V0QWN0aXZlU2hpcChsZW5ndGgsIG5hbWUpIHtcbiAgYWN0aXZlU2hpcExlbmd0aCA9IGxlbmd0aDtcbiAgYWN0aXZlU2hpcE5hbWUgPSBuYW1lO1xufVxuXG5mdW5jdGlvbiBjbGVhckhvdmVyZWQoKSB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaG92ZXJlZFwiKS5mb3JFYWNoKChob3ZlcmVkKSA9PiB7XG4gICAgaG92ZXJlZC5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJlZFwiKTtcbiAgfSk7XG59XG5cbmxldCBzdGFydENvbCA9IFwiXCI7XG5sZXQgc3RhcnRSb3cgPSBcIlwiO1xuXG5mdW5jdGlvbiB0b2dnbGVEaXJlY3Rpb24oKSB7XG4gIGRpcmVjdGlvbiA9PT0gXCJyb3dTcGFuXCIgPyAoZGlyZWN0aW9uID0gXCJjb2xTcGFuXCIpIDogKGRpcmVjdGlvbiA9IFwicm93U3BhblwiKTtcbiAgZGlzcGxheUhvdmVyKHN0YXJ0Q29sLCBzdGFydFJvdyk7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlIb3Zlcihjb2wsIHJvdykge1xuICBpZiAoY29sID09PSBcIlwiIHx8IHJvdyA9PT0gXCJcIikgcmV0dXJuO1xuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RlZFwiKSA9PT0gbnVsbCkgcmV0dXJuO1xuICBzdGFydENvbCA9IGNvbDtcbiAgbGV0IGN1cnJlbnRDb2wgPSBjb2w7XG4gIHN0YXJ0Um93ID0gcm93O1xuICBsZXQgY3VycmVudFJvdyA9IHJvdztcbiAgbGV0IGl0ZXJhdGlvbnNMZWZ0ID0gYWN0aXZlU2hpcExlbmd0aDtcblxuICBjbGVhckhvdmVyZWQoKTtcblxuICB3aGlsZSAoaXRlcmF0aW9uc0xlZnQgPiAwKSB7XG4gICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7Y3VycmVudENvbH0ke2N1cnJlbnRSb3d9YCk7XG4gICAgaWYgKHNxdWFyZSA9PT0gbnVsbCkge1xuICAgICAgcGxhY2VtZW50VmFsaWQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoc3F1YXJlLmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIikpIHtcbiAgICAgIHBsYWNlbWVudFZhbGlkID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcImhvdmVyZWRcIik7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJyb3dTcGFuXCIpIGN1cnJlbnRSb3cgKz0gMTtcbiAgICBlbHNlIGN1cnJlbnRDb2wgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGN1cnJlbnRDb2wuY2hhckNvZGVBdCgwKSArIDEpO1xuXG4gICAgaXRlcmF0aW9uc0xlZnQgLT0gMTtcbiAgfVxuXG4gIGlmIChpdGVyYXRpb25zTGVmdCA9PT0gMCkgcGxhY2VtZW50VmFsaWQgPSB0cnVlO1xufVxuXG5sZXQgcGxheWVyQXJyYXkgPSBbXTtcbmZ1bmN0aW9uIHJlc2V0UGxhY2VtZW50KCkge1xuICBwbGF5ZXJBcnJheS5sZW5ndGggPSAwO1xufVxuXG5mdW5jdGlvbiBwbGFjZVNoaXAoY29sLCByb3cpIHtcbiAgaWYgKCFwbGFjZW1lbnRWYWxpZCkgcmV0dXJuO1xuICBsZXQgc2hpcEFycmF5ID0gW3sgbmFtZTogYWN0aXZlU2hpcE5hbWUgfV07XG4gIGxldCBjdXJyZW50Q29sID0gY29sO1xuICBsZXQgY3VycmVudFJvdyA9IHJvdztcbiAgbGV0IGl0ZXJhdGlvbnNMZWZ0ID0gYWN0aXZlU2hpcExlbmd0aDtcbiAgd2hpbGUgKGl0ZXJhdGlvbnNMZWZ0ID4gMCkge1xuICAgIHNoaXBBcnJheS5wdXNoKHsgY29sOiBjdXJyZW50Q29sLCByb3c6IGN1cnJlbnRSb3cgfSk7XG4gICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7Y3VycmVudENvbH0ke2N1cnJlbnRSb3d9YCk7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgIGlmIChkaXJlY3Rpb24gPT09IFwicm93U3BhblwiKSBjdXJyZW50Um93ICs9IDE7XG4gICAgZWxzZSBjdXJyZW50Q29sID0gU3RyaW5nLmZyb21DaGFyQ29kZShjdXJyZW50Q29sLmNoYXJDb2RlQXQoMCkgKyAxKTtcbiAgICBpdGVyYXRpb25zTGVmdCAtPSAxO1xuICB9XG4gIHBsYXllckFycmF5LnB1c2goc2hpcEFycmF5KTtcblxuICBjbGVhckhvdmVyZWQoKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RlZFwiKS5yZW1vdmUoKTtcbiAgcGxhY2VtZW50VmFsaWQgPSBmYWxzZTtcblxuICAvLyBJZiBhbGwgc2hpcHMgYXJlIHBsYWNlZCBpbml0IHRoZSBnYW1lXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYWNlbWVudFNoaXBcIikgPT09IG51bGwpIHtcbiAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudChcInBsYWNlbWVudENvbXBsZXRlXCIsIHtcbiAgICAgIGRldGFpbDogeyBwbGF5ZXJBcnJheSB9LFxuICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICBjb21wb3NlZDogZmFsc2UsXG4gICAgfSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWNvbnRhaW5lcl1cIikuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgc2V0QWN0aXZlU2hpcCxcbiAgdG9nZ2xlRGlyZWN0aW9uLFxuICBkaXNwbGF5SG92ZXIsXG4gIHBsYWNlU2hpcCxcbiAgcmVzZXRQbGFjZW1lbnQsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJnZXRQb3NzaWJsZUNob2ljZXMiLCJib2FyZCIsInBvc3NpYmxlU3F1YXJlcyIsImkiLCJqIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiY2hhckNvZGVBdCIsImlzUmVwZWF0ZWRBdHRhY2siLCJwdXNoIiwicm93IiwiY29sIiwiY2hvb3NlU3F1YXJlIiwic3F1YXJlcyIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImxlbmd0aCIsInJhbmRvbVNoaXBBcnJheSIsInNoaXBMZW5ndGhzIiwic2hpcE5hbWVzIiwic2hpcHMiLCJfbG9vcCIsInZhbGlkUGxhY2VtZW50IiwiZGlyZWN0aW9uIiwic3RhcnRSb3ciLCJjZWlsIiwic3RhcnRDb2wiLCJjdXJyZW50U2hpcCIsIm5hbWUiLCJjdXJyZW50Q29sIiwiY3VycmVudFJvdyIsImZvckVhY2giLCJzaGlwIiwicG9wIiwiaGFuZGxlU3F1YXJlQ2xpY2siLCJoYW5kbGVQbGFjZW1lbnRTaGlwcyIsImRpc3BsYXlIb3ZlciIsInBsYWNlU2hpcCIsInRvZ2dsZURpcmVjdGlvbiIsInJlc2V0UGxhY2VtZW50IiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY3JlYXRlQm9hcmQiLCJjcmVhdGVFbGVtZW50IiwiX2xvb3AyIiwic3F1YXJlIiwiY2xhc3NMaXN0IiwiYWRkIiwiY29uY2F0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhcmVudEVsZW1lbnQiLCJjb250YWlucyIsImFwcGVuZENoaWxkIiwicmVzZXQiLCJ0ZXh0Q29udGVudCIsImNyZWF0ZUhlYWRlciIsImhlYWRlciIsImNyZWF0ZUZvb3RlciIsImZvb3RlciIsImNyZWF0ZVRpdGxlIiwidGV4dCIsInRpdGxlIiwiZGlzcGxheUdhbWUiLCJzZWN0aW9uIiwiY29tcHV0ZXJUaXRsZSIsInBsYXllclRpdGxlIiwiY29tcHV0ZXJCb2FyZCIsInBsYXllckJvYXJkIiwiZGlzcGxheUdhbWVPdmVyIiwicG9wVXAiLCJnYW1lT3ZlclRleHQiLCJyZXBsYXlCdXR0b24iLCJkaXNwbGF5U2V0dXAiLCJvdmVybGF5IiwiY3JlYXRlU2hpcCIsInNxdWFyZUFtb3VudCIsImNsYXNzTmFtZSIsImJ1dHRvbnMiLCJyb3RhdGVCdXR0b24iLCJyZXNldEJ1dHRvbiIsInNoaXBzQ29udGFpbmVyIiwiYWlyY3JhZnRDYXJyaWVyIiwiYmF0dGxlc2hpcCIsInN1Ym1hcmluZSIsImRlc3Ryb3llciIsInBhdHJvbEJvYXQiLCJsZW4iLCJoaXRzIiwiaGl0IiwiaXNTdW5rIiwiY29sdW1uIiwiT2JqZWN0IiwiYXNzaWduIiwicG9zaXRpb24iLCJoYXNTaGlwIiwiZ2FtZUJvYXJkIiwiZmluZFNxdWFyZSIsImZpbHRlciIsIm9iaiIsImNoZWNrUG9zaXRpb24iLCJyZXN1bHQiLCJlbmRDb2wiLCJlbmRSb3ciLCJvY2N1cGllZFNxdWFyZXMiLCJhdHRhY2tzIiwidHJhY2tBdHRhY2siLCJhdHRhY2tIaXQiLCJzYW5rU2hpcCIsImFsbFNoaXBzU3VuayIsInNoaXBzU3VuayIsImF0dGFjayIsInJlcGVhdCIsInJlY2VpdmVBdHRhY2siLCJ1bmRlZmluZWQiLCJhdHRhY2tlZFNoaXAiLCJpdGVtIiwic2V0QWN0aXZlU2hpcCIsImNyZWF0ZUJvYXJkRnJvbUFycmF5IiwiYm9hcmRUeXBlIiwiZmlyc3QiLCJsYXN0IiwiZWxlbWVudCIsImluaXQiLCJwbGF5ZXJTaGlwcyIsImNvbXB1dGVyU2hpcHMiLCJtYXJrU3F1YXJlIiwiY29tcHV0ZXJDaG9pY2UiLCJlIiwiZGV0YWlsIiwicGxheWVyQXJyYXkiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVtb3ZlIiwiYVNoaXAiLCJjaGlsZHJlbiIsIndpbmRvdyIsImtleSIsImFjdGl2ZVNoaXBMZW5ndGgiLCJhY3RpdmVTaGlwTmFtZSIsInBsYWNlbWVudFZhbGlkIiwiY2xlYXJIb3ZlcmVkIiwiaG92ZXJlZCIsIml0ZXJhdGlvbnNMZWZ0Iiwic2hpcEFycmF5IiwiZXZlbnQiLCJDdXN0b21FdmVudCIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwiY29tcG9zZWQiLCJkaXNwYXRjaEV2ZW50Il0sInNvdXJjZVJvb3QiOiIifQ==
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
  window.addEventListener("keydown", function (e) {
    if (e.key === "r") (0,_placement__WEBPACK_IMPORTED_MODULE_1__.toggleDirection)();
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
(0,_display__WEBPACK_IMPORTED_MODULE_0__.displaySetup)();
document.addEventListener("placementComplete", function (e) {
  init(e.detail.playerArray, (0,_computer__WEBPACK_IMPORTED_MODULE_2__.randomShipArray)());
});
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
/* harmony export */   "placeShip": () => (/* binding */ placeShip),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVYsV0FBVyxDQUFDM0gsSUFBSSxDQUFDc0ksU0FBUyxDQUFDO0VBRTNCSCxZQUFZLEVBQUU7RUFDZHBHLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDNkYsTUFBTSxFQUFFO0VBQzVDSyxjQUFjLEdBQUcsS0FBSzs7RUFFdEI7RUFDQSxJQUFJbkcsUUFBUSxDQUFDQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxJQUFJLEVBQUU7SUFDckQsSUFBTXVHLEtBQUssR0FBRyxJQUFJQyxXQUFXLENBQUMsbUJBQW1CLEVBQUU7TUFDakRkLE1BQU0sRUFBRTtRQUFFQyxXQUFXLEVBQVhBO01BQVksQ0FBQztNQUN2QmMsT0FBTyxFQUFFLElBQUk7TUFDYkMsVUFBVSxFQUFFLElBQUk7TUFDaEJDLFFBQVEsRUFBRTtJQUNaLENBQUMsQ0FBQztJQUNGNUcsUUFBUSxDQUFDQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQzRHLGFBQWEsQ0FBQ0wsS0FBSyxDQUFDO0VBQ2pFO0FBQ0Y7Ozs7Ozs7VUN4RkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXB1dGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGdldFBvc3NpYmxlQ2hvaWNlcyhib2FyZCkge1xuICBjb25zdCBwb3NzaWJsZVNxdWFyZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMTsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IFwiYVwiOyBqICE9PSBcImtcIjsgaiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoai5jaGFyQ29kZUF0KDApICsgMSkpIHtcbiAgICAgIGlmICghYm9hcmQuaXNSZXBlYXRlZEF0dGFjayhqLCBpKSlcbiAgICAgICAgcG9zc2libGVTcXVhcmVzLnB1c2goeyByb3c6IGksIGNvbDogaiB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHBvc3NpYmxlU3F1YXJlcztcbn1cblxuZnVuY3Rpb24gY2hvb3NlU3F1YXJlKGJvYXJkKSB7XG4gIGNvbnN0IHNxdWFyZXMgPSBnZXRQb3NzaWJsZUNob2ljZXMoYm9hcmQpO1xuICByZXR1cm4gc3F1YXJlc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzcXVhcmVzLmxlbmd0aCldO1xufVxuXG5mdW5jdGlvbiByYW5kb21TaGlwQXJyYXkoKSB7XG4gIGNvbnN0IHNoaXBMZW5ndGhzID0gWzIsIDMsIDMsIDQsIDVdO1xuICBjb25zdCBzaGlwTmFtZXMgPSBbXG4gICAgXCJQYXRyb2wgQm9hdFwiLFxuICAgIFwiU3VibWFyaW5lXCIsXG4gICAgXCJEZXN0cm95ZXJcIixcbiAgICBcIkJhdHRsZVNoaXBcIixcbiAgICBcIkFpcmNyYWZ0IENhcnJpZXJcIixcbiAgXTtcbiAgY29uc3Qgc2hpcHMgPSBbXTtcbiAgd2hpbGUgKHNoaXBMZW5ndGhzLmxlbmd0aCA+IDApIHtcbiAgICBsZXQgdmFsaWRQbGFjZW1lbnQgPSB0cnVlO1xuICAgIGNvbnN0IGRpcmVjdGlvbiA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyBcInJvd1NwYW5cIiA6IFwiY29sU3BhblwiO1xuXG4gICAgY29uc3Qgc3RhcnRSb3cgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBjb25zdCBzdGFydENvbCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoOTYgKyBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDEwKSk7XG5cbiAgICBjb25zdCBjdXJyZW50U2hpcCA9IFt7IG5hbWU6IHNoaXBOYW1lc1tzaGlwTmFtZXMubGVuZ3RoIC0gMV0gfV07XG5cbiAgICBsZXQgY3VycmVudENvbCA9IHN0YXJ0Q29sO1xuICAgIGxldCBjdXJyZW50Um93ID0gc3RhcnRSb3c7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGhzW3NoaXBMZW5ndGhzLmxlbmd0aCAtIDFdOyBpKyspIHtcbiAgICAgIC8vIE91dCBvZiBCb3VuZHNcbiAgICAgIGlmIChjdXJyZW50Um93ID09PSAxMSkge1xuICAgICAgICB2YWxpZFBsYWNlbWVudCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50Q29sID09PSBcImtcIikge1xuICAgICAgICB2YWxpZFBsYWNlbWVudCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgLy8gT3ZlcmxhcFxuICAgICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IHNoaXAubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBpZiAoY3VycmVudENvbCA9PT0gc2hpcFtqXS5jb2wgJiYgY3VycmVudFJvdyA9PT0gc2hpcFtqXS5yb3cpIHtcbiAgICAgICAgICAgIHZhbGlkUGxhY2VtZW50ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXZhbGlkUGxhY2VtZW50KSBicmVhaztcbiAgICAgIGN1cnJlbnRTaGlwLnB1c2goeyBjb2w6IGN1cnJlbnRDb2wsIHJvdzogY3VycmVudFJvdyB9KTtcbiAgICAgIC8vIEluY3JlbWVudFxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJyb3dTcGFuXCIpIGN1cnJlbnRSb3cgKz0gMTtcbiAgICAgIGVsc2UgY3VycmVudENvbCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY3VycmVudENvbC5jaGFyQ29kZUF0KDApICsgMSk7XG4gICAgfVxuXG4gICAgaWYgKHZhbGlkUGxhY2VtZW50KSB7XG4gICAgICBzaGlwcy5wdXNoKGN1cnJlbnRTaGlwKTtcbiAgICAgIHNoaXBMZW5ndGhzLnBvcCgpO1xuICAgICAgc2hpcE5hbWVzLnBvcCgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc2hpcHM7XG59XG5cbmV4cG9ydCB7IGNob29zZVNxdWFyZSwgZ2V0UG9zc2libGVDaG9pY2VzLCByYW5kb21TaGlwQXJyYXkgfTtcbiIsImltcG9ydCBoYW5kbGVTcXVhcmVDbGljayBmcm9tIFwiLi9pbmRleFwiO1xuaW1wb3J0IHsgZGlzcGxheUhvdmVyLCBwbGFjZVNoaXAsIHRvZ2dsZURpcmVjdGlvbiB9IGZyb20gXCIuL3BsYWNlbWVudFwiO1xuXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtY29udGFpbmVyXVwiKTtcblxuZnVuY3Rpb24gY3JlYXRlQm9hcmQoKSB7XG4gIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMTsgaSArPSAxKSB7XG4gICAgZm9yIChsZXQgaiA9IFwiYVwiOyBqICE9PSBcImtcIjsgaiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoai5jaGFyQ29kZUF0KDApICsgMSkpIHtcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInNxdWFyZVwiKTtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGAke2p9JHtpfWApO1xuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmIChzcXVhcmUucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXItYm9hcmRcIikpIHJldHVybjtcbiAgICAgICAgaWYgKHNxdWFyZS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImNvbXB1dGVyLWJvYXJkXCIpKVxuICAgICAgICAgIGhhbmRsZVNxdWFyZUNsaWNrKGosIGkpO1xuICAgICAgICBpZiAoc3F1YXJlLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2V0dXAtYm9hcmRcIikpIHtcbiAgICAgICAgICBwbGFjZVNoaXAoaiwgaSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoIXNxdWFyZS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcInNldHVwLWJvYXJkXCIpKSByZXR1cm47XG4gICAgICAgIGRpc3BsYXlIb3ZlcihqLCBpKTtcbiAgICAgIH0pO1xuICAgICAgYm9hcmQuY2xhc3NMaXN0LmFkZChcImJvYXJkXCIpO1xuICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJvYXJkO1xufVxuXG5mdW5jdGlvbiByZXNldCgpIHtcbiAgY29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSGVhZGVyKCkge1xuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuICBoZWFkZXIudGV4dENvbnRlbnQgPSBcIkJhdHRsZXNoaXBcIjtcbiAgcmV0dXJuIGhlYWRlcjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRm9vdGVyKCkge1xuICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9vdGVyXCIpO1xuICBmb290ZXIudGV4dENvbnRlbnQgPSBcIk1hZGUgYnkgV2lsbCBNb3JldHpcIjtcbiAgcmV0dXJuIGZvb3Rlcjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVGl0bGUodGV4dCkge1xuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHRpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0aXRsZVwiKTtcbiAgdGl0bGUudGV4dENvbnRlbnQgPSB0ZXh0O1xuICByZXR1cm4gdGl0bGU7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlHYW1lKCkge1xuICByZXNldCgpO1xuXG4gIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUhlYWRlcigpO1xuICBjb25zdCBmb290ZXIgPSBjcmVhdGVGb290ZXIoKTtcbiAgY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICBjb25zdCBjb21wdXRlclRpdGxlID0gY3JlYXRlVGl0bGUoXCJDb21wdXRlcidzIEJvYXJkXCIpO1xuICBjb25zdCBwbGF5ZXJUaXRsZSA9IGNyZWF0ZVRpdGxlKFwiWW91ciBCb2FyZFwiKTtcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG4gIGNvbXB1dGVyQm9hcmQuY2xhc3NMaXN0LmFkZChcImNvbXB1dGVyLWJvYXJkXCIpO1xuICBjb25zdCBwbGF5ZXJCb2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG4gIHBsYXllckJvYXJkLmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXItYm9hcmRcIik7XG5cbiAgc2VjdGlvbi5hcHBlbmRDaGlsZChjb21wdXRlclRpdGxlKTtcbiAgc2VjdGlvbi5hcHBlbmRDaGlsZChjb21wdXRlckJvYXJkLCBudWxsKTtcbiAgc2VjdGlvbi5hcHBlbmRDaGlsZChwbGF5ZXJUaXRsZSk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQocGxheWVyQm9hcmQpO1xuXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VjdGlvbik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb290ZXIpO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5R2FtZU92ZXIodGV4dCkge1xuICBjb25zdCBwb3BVcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHBvcFVwLmNsYXNzTGlzdC5hZGQoXCJwb3AtdXBcIik7XG5cbiAgY29uc3QgZ2FtZU92ZXJUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZ2FtZU92ZXJUZXh0LmNsYXNzTGlzdC5hZGQoXCJnYW1lLW92ZXItdGV4dFwiKTtcbiAgZ2FtZU92ZXJUZXh0LnRleHRDb250ZW50ID0gdGV4dDtcblxuICBjb25zdCByZXBsYXlCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICByZXBsYXlCdXR0b24udGV4dENvbnRlbnQgPSBcIlJlcGxheVwiO1xuICByZXBsYXlCdXR0b24uY2xhc3NMaXN0LmFkZChcInJlcGxheS1idXR0b25cIik7XG5cbiAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG92ZXJsYXkuY2xhc3NMaXN0LmFkZChcIm92ZXJsYXlcIik7XG5cbiAgcG9wVXAuYXBwZW5kQ2hpbGQoZ2FtZU92ZXJUZXh0KTtcbiAgcG9wVXAuYXBwZW5kQ2hpbGQocmVwbGF5QnV0dG9uKTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwb3BVcCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNoaXAoc3F1YXJlQW1vdW50LCBjbGFzc05hbWUpIHtcbiAgY29uc3Qgc2hpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHNoaXAuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICBzaGlwLmNsYXNzTGlzdC5hZGQoXCJwbGFjZW1lbnRTaGlwXCIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNxdWFyZUFtb3VudDsgaSsrKSB7XG4gICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzaGlwLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gIH1cbiAgcmV0dXJuIHNoaXA7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlTZXR1cCgpIHtcbiAgY29uc3QgaGVhZGVyID0gY3JlYXRlSGVhZGVyKCk7XG4gIGNvbnN0IGZvb3RlciA9IGNyZWF0ZUZvb3RlcigpO1xuICBjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gIGNvbnN0IHRpdGxlID0gY3JlYXRlVGl0bGUoXCJQbGFjZSBZb3VyIFNoaXBzIVwiKTtcbiAgY29uc3QgYm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICBib2FyZC5jbGFzc0xpc3QuYWRkKFwic2V0dXAtYm9hcmRcIik7XG5cbiAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJ1dHRvbnMuY2xhc3NMaXN0LmFkZChcImJ1dHRvbnNcIik7XG5cbiAgY29uc3Qgcm90YXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgcm90YXRlQnV0dG9uLnRleHRDb250ZW50ID0gXCJSb3RhdGUgKHIpXCI7XG4gIHJvdGF0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicm90YXRlLWJ1dHRvblwiKTtcbiAgcm90YXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgdG9nZ2xlRGlyZWN0aW9uKCk7XG4gIH0pO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHtcbiAgICBpZiAoZS5rZXkgPT09IFwiclwiKSB0b2dnbGVEaXJlY3Rpb24oKTtcbiAgfSk7XG5cbiAgY29uc3Qgc2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzaGlwc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwic2hpcHMtY29udGFpbmVyXCIpO1xuXG4gIGNvbnN0IGFpcmNyYWZ0Q2FycmllciA9IGNyZWF0ZVNoaXAoNSwgXCJhaXJjcmFmdC1jYXJyaWVyXCIpO1xuICBjb25zdCBiYXR0bGVzaGlwID0gY3JlYXRlU2hpcCg0LCBcImJhdHRsZXNoaXBcIik7XG4gIGNvbnN0IHN1Ym1hcmluZSA9IGNyZWF0ZVNoaXAoMywgXCJzdWJtYXJpbmVcIik7XG4gIGNvbnN0IGRlc3Ryb3llciA9IGNyZWF0ZVNoaXAoMywgXCJkZXN0cm95ZXJcIik7XG4gIGNvbnN0IHBhdHJvbEJvYXQgPSBjcmVhdGVTaGlwKDIsIFwicGF0cm9sLWJvYXRcIik7XG5cbiAgc2VjdGlvbi5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoYm9hcmQpO1xuXG4gIGJ1dHRvbnMuYXBwZW5kQ2hpbGQocm90YXRlQnV0dG9uKTtcblxuICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChhaXJjcmFmdENhcnJpZXIpO1xuICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChiYXR0bGVzaGlwKTtcbiAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQoc3VibWFyaW5lKTtcbiAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQoZGVzdHJveWVyKTtcbiAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQocGF0cm9sQm9hdCk7XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWN0aW9uKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbnMpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2hpcHNDb250YWluZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcbn1cblxuZXhwb3J0IHsgZGlzcGxheUdhbWUsIGRpc3BsYXlTZXR1cCwgZGlzcGxheUdhbWVPdmVyIH07XG4iLCJjb25zdCBzaGlwID0gKGxlbikgPT4gKHtcbiAgbGVuZ3RoOiBsZW4sXG4gIGhpdHM6IDAsXG4gIGhpdCgpIHtcbiAgICB0aGlzLmhpdHMgKz0gMTtcbiAgfSxcbiAgaXNTdW5rKCkge1xuICAgIGlmICh0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG59KTtcblxuZnVuY3Rpb24gY3JlYXRlQm9hcmQoKSB7XG4gIGNvbnN0IGJvYXJkID0gW107XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgMTE7IGkrKykge1xuICAgIGNvbnN0IGNvbHVtbiA9IHt9O1xuICAgIE9iamVjdC5hc3NpZ24oY29sdW1uLCB7XG4gICAgICBjb2x1bW46IGksXG4gICAgICByb3c6IFtcbiAgICAgICAgeyBwb3NpdGlvbjogYGEke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGIke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGMke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGQke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGUke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGYke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGcke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGgke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGkke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGoke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgIF0sXG4gICAgfSk7XG4gICAgYm9hcmQucHVzaChjb2x1bW4pO1xuICB9XG4gIHJldHVybiBib2FyZDtcbn1cblxuY29uc3QgZ2FtZUJvYXJkID0gKCkgPT4gKHtcbiAgYm9hcmQ6IGNyZWF0ZUJvYXJkKCksXG4gIGZpbmRTcXVhcmUoY29sLCByb3cpIHtcbiAgICBjb25zdCBzcXVhcmUgPSB0aGlzLmJvYXJkW3JvdyAtIDFdLnJvdy5maWx0ZXIoKG9iaikgPT4ge1xuICAgICAgcmV0dXJuIG9iai5wb3NpdGlvbiA9PT0gYCR7Y29sfSR7cm93fWA7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNxdWFyZTtcbiAgfSxcbiAgY2hlY2tQb3NpdGlvbihjb2wsIHJvdykge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuZmluZFNxdWFyZShjb2wsIHJvdyk7XG4gICAgY29uc3QgcG9zaXRpb24gPSBzcXVhcmVbMF0ucG9zaXRpb247XG4gICAgY29uc3QgaGFzU2hpcCA9IHNxdWFyZVswXS5oYXNTaGlwO1xuICAgIE9iamVjdC5hc3NpZ24ocmVzdWx0LCB7IHBvc2l0aW9uLCBoYXNTaGlwIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG4gIHNoaXBzOiBbXSxcbiAgcGxhY2VTaGlwKHN0YXJ0Q29sLCBlbmRDb2wsIHN0YXJ0Um93LCBlbmRSb3csIG5hbWUpIHtcbiAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICBsZXQgb2NjdXBpZWRTcXVhcmVzID0gW107XG4gICAgaWYgKHN0YXJ0Um93ICE9PSBlbmRSb3cpIHtcbiAgICAgIGZvciAobGV0IGkgPSBzdGFydFJvdzsgaSA8IGVuZFJvdyArIDE7IGkrKykge1xuICAgICAgICBjb25zdCBzcXVhcmUgPSB0aGlzLmZpbmRTcXVhcmUoc3RhcnRDb2wsIGkpO1xuICAgICAgICBzcXVhcmVbMF0uaGFzU2hpcCA9IHRydWU7XG4gICAgICAgIGxlbmd0aCArPSAxO1xuICAgICAgICBvY2N1cGllZFNxdWFyZXMucHVzaChgJHtzdGFydENvbH0ke2l9YCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBjdXJyZW50Q29sID0gc3RhcnRDb2w7XG4gICAgICB3aGlsZSAoY3VycmVudENvbCAhPT0gU3RyaW5nLmZyb21DaGFyQ29kZShlbmRDb2wuY2hhckNvZGVBdCgwKSArIDEpKSB7XG4gICAgICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuZmluZFNxdWFyZShjdXJyZW50Q29sLCBzdGFydFJvdyk7XG4gICAgICAgIHNxdWFyZVswXS5oYXNTaGlwID0gdHJ1ZTtcbiAgICAgICAgb2NjdXBpZWRTcXVhcmVzLnB1c2goYCR7Y3VycmVudENvbH0ke3N0YXJ0Um93fWApO1xuICAgICAgICBjdXJyZW50Q29sID0gU3RyaW5nLmZyb21DaGFyQ29kZShjdXJyZW50Q29sLmNoYXJDb2RlQXQoMCkgKyAxKTtcbiAgICAgICAgbGVuZ3RoICs9IDE7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2hpcHMucHVzaCh7XG4gICAgICBzcXVhcmVzOiBvY2N1cGllZFNxdWFyZXMsXG4gICAgICBuYW1lLFxuICAgICAgb2JqOiBzaGlwKGxlbmd0aCksXG4gICAgfSk7XG4gIH0sXG4gIGF0dGFja3M6IFtdLFxuICB0cmFja0F0dGFjayhwb3NpdGlvbiwgYXR0YWNrSGl0LCBzYW5rU2hpcCkge1xuICAgIHRoaXMuYXR0YWNrcy5wdXNoKHsgcG9zaXRpb24sIGF0dGFja0hpdCwgc2Fua1NoaXAgfSk7XG4gIH0sXG4gIGFsbFNoaXBzU3VuaygpIHtcbiAgICBpZiAodGhpcy5zaGlwcy5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcbiAgICBsZXQgc2hpcHNTdW5rID0gMDtcbiAgICB0aGlzLmF0dGFja3MuZm9yRWFjaCgoYXR0YWNrKSA9PiB7XG4gICAgICBpZiAoYXR0YWNrLnNhbmtTaGlwKSBzaGlwc1N1bmsgKz0gMTtcbiAgICB9KTtcbiAgICBpZiAoc2hpcHNTdW5rID49IHRoaXMuc2hpcHMubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG4gIGlzUmVwZWF0ZWRBdHRhY2soY29sLCByb3cpIHtcbiAgICBsZXQgcmVwZWF0ID0gZmFsc2U7XG4gICAgdGhpcy5hdHRhY2tzLmZvckVhY2goKGF0dGFjaykgPT4ge1xuICAgICAgaWYgKGF0dGFjay5wb3NpdGlvbiA9PT0gYCR7Y29sfSR7cm93fWApIHtcbiAgICAgICAgcmVwZWF0ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXBlYXQ7XG4gIH0sXG4gIHJlY2VpdmVBdHRhY2soY29sLCByb3cpIHtcbiAgICBpZiAodGhpcy5pc1JlcGVhdGVkQXR0YWNrKGNvbCwgcm93KSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBsZXQgYXR0YWNrZWRTaGlwID0gZmFsc2U7XG4gICAgdGhpcy5zaGlwcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpdGVtLnNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgICAgIGlmIChzcXVhcmUgPT09IGAke2NvbH0ke3Jvd31gKSBhdHRhY2tlZFNoaXAgPSBpdGVtO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKGF0dGFja2VkU2hpcCkge1xuICAgICAgYXR0YWNrZWRTaGlwLm9iai5oaXQoKTtcbiAgICAgIHRoaXMudHJhY2tBdHRhY2soYCR7Y29sfSR7cm93fWAsIHRydWUsIGF0dGFja2VkU2hpcC5vYmouaXNTdW5rKCkpO1xuICAgICAgcmV0dXJuIGF0dGFja2VkU2hpcC5uYW1lO1xuICAgIH1cbiAgICB0aGlzLnRyYWNrQXR0YWNrKGAke2NvbH0ke3Jvd31gLCBmYWxzZSwgZmFsc2UpO1xuICAgIHJldHVybiBgJHtjb2x9JHtyb3d9YDtcbiAgfSxcbn0pO1xuXG5leHBvcnQgeyBzaGlwLCBnYW1lQm9hcmQgfTtcbiIsImltcG9ydCB7IGRpc3BsYXlHYW1lLCBkaXNwbGF5R2FtZU92ZXIsIGRpc3BsYXlTZXR1cCB9IGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCB7IGdhbWVCb2FyZCB9IGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCB7IGNob29zZVNxdWFyZSwgcmFuZG9tU2hpcEFycmF5IH0gZnJvbSBcIi4vY29tcHV0ZXJcIjtcbmltcG9ydCB7IHNldEFjdGl2ZVNoaXAgfSBmcm9tIFwiLi9wbGFjZW1lbnRcIjtcblxuY29uc3QgcGxheWVyQm9hcmQgPSBnYW1lQm9hcmQoKTtcbmNvbnN0IGNvbXB1dGVyQm9hcmQgPSBnYW1lQm9hcmQoKTtcbmxldCBnYW1lQWN0aXZlID0gdHJ1ZTtcblxuZnVuY3Rpb24gY3JlYXRlQm9hcmRGcm9tQXJyYXkoc2hpcHMsIGJvYXJkLCBib2FyZFR5cGUpIHtcbiAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIGxldCBmaXJzdCA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbmFtZSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbGFzdCA9IHVuZGVmaW5lZDtcbiAgICBzaGlwLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBuYW1lID0gc3F1YXJlLm5hbWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkKSBmaXJzdCA9IHsgY29sOiBzcXVhcmUuY29sLCByb3c6IHNxdWFyZS5yb3cgfTtcbiAgICAgIGxhc3QgPSB7IGNvbDogc3F1YXJlLmNvbCwgcm93OiBzcXVhcmUucm93IH07XG4gICAgICAvLyBEaXNwbGF5IFdoZXJlIFNoaXBzIEFyZVxuICAgICAgaWYgKGJvYXJkVHlwZSA9PT0gXCJwbGF5ZXJcIikge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnRcbiAgICAgICAgICAucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItYm9hcmRcIilcbiAgICAgICAgICAucXVlcnlTZWxlY3RvcihgLiR7c3F1YXJlLmNvbH0ke3NxdWFyZS5yb3d9YCk7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgYm9hcmQucGxhY2VTaGlwKGZpcnN0LmNvbCwgbGFzdC5jb2wsIGZpcnN0LnJvdywgbGFzdC5yb3csIG5hbWUpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdChwbGF5ZXJTaGlwcywgY29tcHV0ZXJTaGlwcykge1xuICBkaXNwbGF5R2FtZSgpO1xuICBjcmVhdGVCb2FyZEZyb21BcnJheShwbGF5ZXJTaGlwcywgcGxheWVyQm9hcmQsIFwicGxheWVyXCIpO1xuICBjcmVhdGVCb2FyZEZyb21BcnJheShjb21wdXRlclNoaXBzLCBjb21wdXRlckJvYXJkLCBcImNvbXB1dGVyXCIpO1xufVxuXG5mdW5jdGlvbiBtYXJrU3F1YXJlKGJvYXJkLCBjb2wsIHJvdywgYm9hcmRUeXBlKSB7XG4gIGJvYXJkLnJlY2VpdmVBdHRhY2soY29sLCByb3cpO1xuICBpZiAoYm9hcmQuYXR0YWNrc1tib2FyZC5hdHRhY2tzLmxlbmd0aCAtIDFdLmF0dGFja0hpdCkge1xuICAgIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihgLiR7Ym9hcmRUeXBlfS1ib2FyZGApXG4gICAgICAucXVlcnlTZWxlY3RvcihgLiR7Y29sfSR7cm93fWApXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC4ke2JvYXJkVHlwZX0tYm9hcmRgKVxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC4ke2NvbH0ke3Jvd31gKVxuICAgICAgLmNsYXNzTGlzdC5hZGQoXCJtaXNzZWRcIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW5kR2FtZSh0ZXh0KSB7XG4gIGdhbWVBY3RpdmUgPSBmYWxzZTtcbiAgZGlzcGxheUdhbWVPdmVyKHRleHQpO1xufVxuXG4vLyBBZHZhbmNlcyBHYW1lXG5mdW5jdGlvbiBoYW5kbGVTcXVhcmVDbGljayhjb2wsIHJvdykge1xuICBpZiAoIWdhbWVBY3RpdmUgfHwgY29tcHV0ZXJCb2FyZC5pc1JlcGVhdGVkQXR0YWNrKGNvbCwgcm93KSkgcmV0dXJuO1xuXG4gIG1hcmtTcXVhcmUoY29tcHV0ZXJCb2FyZCwgY29sLCByb3csIFwiY29tcHV0ZXJcIik7XG4gIGlmIChjb21wdXRlckJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgZW5kR2FtZShcIllvdSBXaW4hXCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGNvbXB1dGVyQ2hvaWNlID0gY2hvb3NlU3F1YXJlKHBsYXllckJvYXJkKTtcbiAgbWFya1NxdWFyZShwbGF5ZXJCb2FyZCwgY29tcHV0ZXJDaG9pY2UuY29sLCBjb21wdXRlckNob2ljZS5yb3csIFwicGxheWVyXCIpO1xuICBpZiAocGxheWVyQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICBlbmRHYW1lKFwiVGhlIENvbXB1dGVyIFdvblwiKTtcbiAgICByZXR1cm47XG4gIH1cbn1cblxuZGlzcGxheVNldHVwKCk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwbGFjZW1lbnRDb21wbGV0ZVwiLCAoZSkgPT4ge1xuICBpbml0KGUuZGV0YWlsLnBsYXllckFycmF5LCByYW5kb21TaGlwQXJyYXkoKSk7XG59KTtcblxuY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlbWVudFNoaXBcIik7XG5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAvLyBUb2dnbGUgT2ZmXG4gICAgaWYgKHNoaXAuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2VsZWN0ZWRcIikpIHtcbiAgICAgIHNoaXAuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpO1xuICAgICAgc2V0QWN0aXZlU2hpcCgwLCBcIlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gRGVzZWxlY3QgT3RoZXIgU2hpcHNcbiAgICBzaGlwcy5mb3JFYWNoKChhU2hpcCkgPT4gYVNoaXAuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpKTtcbiAgICAvLyBTZWxlY3QgU2hpcFxuICAgIHNoaXAuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xuICAgIHNldEFjdGl2ZVNoaXAoc2hpcC5jaGlsZHJlbi5sZW5ndGgsIHNoaXAuY2xhc3NMaXN0WzBdKTtcbiAgfSk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlU3F1YXJlQ2xpY2s7XG4iLCJsZXQgYWN0aXZlU2hpcExlbmd0aCA9IDA7XG5sZXQgYWN0aXZlU2hpcE5hbWUgPSBcIlwiO1xubGV0IGRpcmVjdGlvbiA9IFwiY29sU3BhblwiO1xubGV0IHBsYWNlbWVudFZhbGlkID0gZmFsc2U7XG5cbmZ1bmN0aW9uIHNldEFjdGl2ZVNoaXAobGVuZ3RoLCBuYW1lKSB7XG4gIGFjdGl2ZVNoaXBMZW5ndGggPSBsZW5ndGg7XG4gIGFjdGl2ZVNoaXBOYW1lID0gbmFtZTtcbn1cblxuZnVuY3Rpb24gY2xlYXJIb3ZlcmVkKCkge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmhvdmVyZWRcIikuZm9yRWFjaCgoaG92ZXJlZCkgPT4ge1xuICAgIGhvdmVyZWQuY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyZWRcIik7XG4gIH0pO1xufVxuXG5sZXQgc3RhcnRDb2wgPSBcIlwiO1xubGV0IHN0YXJ0Um93ID0gXCJcIjtcblxuZnVuY3Rpb24gdG9nZ2xlRGlyZWN0aW9uKCkge1xuICBkaXJlY3Rpb24gPT09IFwicm93U3BhblwiID8gKGRpcmVjdGlvbiA9IFwiY29sU3BhblwiKSA6IChkaXJlY3Rpb24gPSBcInJvd1NwYW5cIik7XG4gIGRpc3BsYXlIb3ZlcihzdGFydENvbCwgc3RhcnRSb3cpO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5SG92ZXIoY29sLCByb3cpIHtcbiAgaWYgKGNvbCA9PT0gXCJcIiB8fCByb3cgPT09IFwiXCIpIHJldHVybjtcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0ZWRcIikgPT09IG51bGwpIHJldHVybjtcbiAgc3RhcnRDb2wgPSBjb2w7XG4gIGxldCBjdXJyZW50Q29sID0gY29sO1xuICBzdGFydFJvdyA9IHJvdztcbiAgbGV0IGN1cnJlbnRSb3cgPSByb3c7XG4gIGxldCBpdGVyYXRpb25zTGVmdCA9IGFjdGl2ZVNoaXBMZW5ndGg7XG5cbiAgY2xlYXJIb3ZlcmVkKCk7XG5cbiAgd2hpbGUgKGl0ZXJhdGlvbnNMZWZ0ID4gMCkge1xuICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2N1cnJlbnRDb2x9JHtjdXJyZW50Um93fWApO1xuICAgIGlmIChzcXVhcmUgPT09IG51bGwpIHtcbiAgICAgIHBsYWNlbWVudFZhbGlkID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKHNxdWFyZS5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwXCIpKSB7XG4gICAgICBwbGFjZW1lbnRWYWxpZCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJob3ZlcmVkXCIpO1xuICAgIGlmIChkaXJlY3Rpb24gPT09IFwicm93U3BhblwiKSBjdXJyZW50Um93ICs9IDE7XG4gICAgZWxzZSBjdXJyZW50Q29sID0gU3RyaW5nLmZyb21DaGFyQ29kZShjdXJyZW50Q29sLmNoYXJDb2RlQXQoMCkgKyAxKTtcblxuICAgIGl0ZXJhdGlvbnNMZWZ0IC09IDE7XG4gIH1cblxuICBpZiAoaXRlcmF0aW9uc0xlZnQgPT09IDApIHBsYWNlbWVudFZhbGlkID0gdHJ1ZTtcbn1cblxuY29uc3QgcGxheWVyQXJyYXkgPSBbXTtcblxuZnVuY3Rpb24gcGxhY2VTaGlwKGNvbCwgcm93KSB7XG4gIGlmICghcGxhY2VtZW50VmFsaWQpIHJldHVybjtcbiAgbGV0IHNoaXBBcnJheSA9IFt7IG5hbWU6IGFjdGl2ZVNoaXBOYW1lIH1dO1xuICBsZXQgY3VycmVudENvbCA9IGNvbDtcbiAgbGV0IGN1cnJlbnRSb3cgPSByb3c7XG4gIGxldCBpdGVyYXRpb25zTGVmdCA9IGFjdGl2ZVNoaXBMZW5ndGg7XG4gIHdoaWxlIChpdGVyYXRpb25zTGVmdCA+IDApIHtcbiAgICBzaGlwQXJyYXkucHVzaCh7IGNvbDogY3VycmVudENvbCwgcm93OiBjdXJyZW50Um93IH0pO1xuICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2N1cnJlbnRDb2x9JHtjdXJyZW50Um93fWApO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcInJvd1NwYW5cIikgY3VycmVudFJvdyArPSAxO1xuICAgIGVsc2UgY3VycmVudENvbCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY3VycmVudENvbC5jaGFyQ29kZUF0KDApICsgMSk7XG4gICAgaXRlcmF0aW9uc0xlZnQgLT0gMTtcbiAgfVxuICBwbGF5ZXJBcnJheS5wdXNoKHNoaXBBcnJheSk7XG5cbiAgY2xlYXJIb3ZlcmVkKCk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0ZWRcIikucmVtb3ZlKCk7XG4gIHBsYWNlbWVudFZhbGlkID0gZmFsc2U7XG5cbiAgLy8gSWYgYWxsIHNoaXBzIGFyZSBwbGFjZWQgaW5pdCB0aGUgZ2FtZVxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGFjZW1lbnRTaGlwXCIpID09PSBudWxsKSB7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXCJwbGFjZW1lbnRDb21wbGV0ZVwiLCB7XG4gICAgICBkZXRhaWw6IHsgcGxheWVyQXJyYXkgfSxcbiAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgY29tcG9zZWQ6IGZhbHNlLFxuICAgIH0pO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1jb250YWluZXJdXCIpLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9XG59XG5cbmV4cG9ydCB7IHNldEFjdGl2ZVNoaXAsIHRvZ2dsZURpcmVjdGlvbiwgZGlzcGxheUhvdmVyLCBwbGFjZVNoaXAgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOlsiZ2V0UG9zc2libGVDaG9pY2VzIiwiYm9hcmQiLCJwb3NzaWJsZVNxdWFyZXMiLCJpIiwiaiIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImNoYXJDb2RlQXQiLCJpc1JlcGVhdGVkQXR0YWNrIiwicHVzaCIsInJvdyIsImNvbCIsImNob29zZVNxdWFyZSIsInNxdWFyZXMiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJsZW5ndGgiLCJyYW5kb21TaGlwQXJyYXkiLCJzaGlwTGVuZ3RocyIsInNoaXBOYW1lcyIsInNoaXBzIiwiX2xvb3AiLCJ2YWxpZFBsYWNlbWVudCIsImRpcmVjdGlvbiIsInN0YXJ0Um93IiwiY2VpbCIsInN0YXJ0Q29sIiwiY3VycmVudFNoaXAiLCJuYW1lIiwiY3VycmVudENvbCIsImN1cnJlbnRSb3ciLCJmb3JFYWNoIiwic2hpcCIsInBvcCIsImhhbmRsZVNxdWFyZUNsaWNrIiwiZGlzcGxheUhvdmVyIiwicGxhY2VTaGlwIiwidG9nZ2xlRGlyZWN0aW9uIiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY3JlYXRlQm9hcmQiLCJjcmVhdGVFbGVtZW50IiwiX2xvb3AyIiwic3F1YXJlIiwiY2xhc3NMaXN0IiwiYWRkIiwiY29uY2F0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhcmVudEVsZW1lbnQiLCJjb250YWlucyIsImFwcGVuZENoaWxkIiwicmVzZXQiLCJ0ZXh0Q29udGVudCIsImNyZWF0ZUhlYWRlciIsImhlYWRlciIsImNyZWF0ZUZvb3RlciIsImZvb3RlciIsImNyZWF0ZVRpdGxlIiwidGV4dCIsInRpdGxlIiwiZGlzcGxheUdhbWUiLCJzZWN0aW9uIiwiY29tcHV0ZXJUaXRsZSIsInBsYXllclRpdGxlIiwiY29tcHV0ZXJCb2FyZCIsInBsYXllckJvYXJkIiwiZGlzcGxheUdhbWVPdmVyIiwicG9wVXAiLCJnYW1lT3ZlclRleHQiLCJyZXBsYXlCdXR0b24iLCJvdmVybGF5IiwiY3JlYXRlU2hpcCIsInNxdWFyZUFtb3VudCIsImNsYXNzTmFtZSIsImRpc3BsYXlTZXR1cCIsImJ1dHRvbnMiLCJyb3RhdGVCdXR0b24iLCJ3aW5kb3ciLCJlIiwia2V5Iiwic2hpcHNDb250YWluZXIiLCJhaXJjcmFmdENhcnJpZXIiLCJiYXR0bGVzaGlwIiwic3VibWFyaW5lIiwiZGVzdHJveWVyIiwicGF0cm9sQm9hdCIsImxlbiIsImhpdHMiLCJoaXQiLCJpc1N1bmsiLCJjb2x1bW4iLCJPYmplY3QiLCJhc3NpZ24iLCJwb3NpdGlvbiIsImhhc1NoaXAiLCJnYW1lQm9hcmQiLCJmaW5kU3F1YXJlIiwiZmlsdGVyIiwib2JqIiwiY2hlY2tQb3NpdGlvbiIsInJlc3VsdCIsImVuZENvbCIsImVuZFJvdyIsIm9jY3VwaWVkU3F1YXJlcyIsImF0dGFja3MiLCJ0cmFja0F0dGFjayIsImF0dGFja0hpdCIsInNhbmtTaGlwIiwiYWxsU2hpcHNTdW5rIiwic2hpcHNTdW5rIiwiYXR0YWNrIiwicmVwZWF0IiwicmVjZWl2ZUF0dGFjayIsInVuZGVmaW5lZCIsImF0dGFja2VkU2hpcCIsIml0ZW0iLCJzZXRBY3RpdmVTaGlwIiwiZ2FtZUFjdGl2ZSIsImNyZWF0ZUJvYXJkRnJvbUFycmF5IiwiYm9hcmRUeXBlIiwiZmlyc3QiLCJsYXN0IiwiZWxlbWVudCIsImluaXQiLCJwbGF5ZXJTaGlwcyIsImNvbXB1dGVyU2hpcHMiLCJtYXJrU3F1YXJlIiwiZW5kR2FtZSIsImNvbXB1dGVyQ2hvaWNlIiwiZGV0YWlsIiwicGxheWVyQXJyYXkiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVtb3ZlIiwiYVNoaXAiLCJjaGlsZHJlbiIsImFjdGl2ZVNoaXBMZW5ndGgiLCJhY3RpdmVTaGlwTmFtZSIsInBsYWNlbWVudFZhbGlkIiwiY2xlYXJIb3ZlcmVkIiwiaG92ZXJlZCIsIml0ZXJhdGlvbnNMZWZ0Iiwic2hpcEFycmF5IiwiZXZlbnQiLCJDdXN0b21FdmVudCIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwiY29tcG9zZWQiLCJkaXNwYXRjaEV2ZW50Il0sInNvdXJjZVJvb3QiOiIifQ==
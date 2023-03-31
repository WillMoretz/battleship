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
      (0,_placement__WEBPACK_IMPORTED_MODULE_3__.setActiveShipLength)(0);
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
/* harmony export */   "placeShip": () => (/* binding */ placeShip),
/* harmony export */   "setActiveShipLength": () => (/* binding */ setActiveShipLength),
/* harmony export */   "toggleDirection": () => (/* binding */ toggleDirection)
/* harmony export */ });
var activeShipLength = 0;
var direction = "colSpan";
var placementValid = false;
function setActiveShipLength(length) {
  activeShipLength = length;
}
function toggleDirection() {
  direction === "rowSpan" ? direction = "colSpan" : direction = "rowSpan";
}
function clearHovered() {
  document.querySelectorAll(".hovered").forEach(function (hovered) {
    hovered.classList.remove("hovered");
  });
}
function displayHover(col, row) {
  if (document.querySelector(".selected") === null) return;
  var currentCol = col;
  var currentRow = row;
  var iterationsLeft = activeShipLength;
  console.log(iterationsLeft);
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
function placeShip(col, row) {
  if (!placementValid) return;
  var currentCol = col;
  var currentRow = row;
  var iterationsLeft = activeShipLength;
  while (iterationsLeft > 0) {
    var square = document.querySelector(".".concat(currentCol).concat(currentRow));
    square.classList.add("ship");
    if (direction === "rowSpan") currentRow += 1;else currentCol = String.fromCharCode(currentCol.charCodeAt(0) + 1);
    iterationsLeft -= 1;
  }
  document.querySelector(".selected").remove();
  clearHovered();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0Esa0JBQWtCQSxDQUFDQyxLQUFLLEVBQUU7RUFDakMsSUFBTUMsZUFBZSxHQUFHLEVBQUU7RUFDMUIsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsRUFBRSxFQUFFQSxDQUFDLEVBQUUsRUFBRTtJQUMzQixLQUFLLElBQUlDLENBQUMsR0FBRyxHQUFHLEVBQUVBLENBQUMsS0FBSyxHQUFHLEVBQUVBLENBQUMsR0FBR0MsTUFBTSxDQUFDQyxZQUFZLENBQUNGLENBQUMsQ0FBQ0csVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO01BQ3pFLElBQUksQ0FBQ04sS0FBSyxDQUFDTyxnQkFBZ0IsQ0FBQ0osQ0FBQyxFQUFFRCxDQUFDLENBQUMsRUFDL0JELGVBQWUsQ0FBQ08sSUFBSSxDQUFDO1FBQUVDLEdBQUcsRUFBRVAsQ0FBQztRQUFFUSxHQUFHLEVBQUVQO01BQUUsQ0FBQyxDQUFDO0lBQzVDO0VBQ0Y7RUFDQSxPQUFPRixlQUFlO0FBQ3hCO0FBRUEsU0FBU1UsWUFBWUEsQ0FBQ1gsS0FBSyxFQUFFO0VBQzNCLElBQU1ZLE9BQU8sR0FBR2Isa0JBQWtCLENBQUNDLEtBQUssQ0FBQztFQUN6QyxPQUFPWSxPQUFPLENBQUNDLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sRUFBRSxHQUFHSCxPQUFPLENBQUNJLE1BQU0sQ0FBQyxDQUFDO0FBQzVEO0FBRUEsU0FBU0MsZUFBZUEsQ0FBQSxFQUFHO0VBQ3pCLElBQU1DLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbkMsSUFBTUMsU0FBUyxHQUFHLENBQ2hCLGFBQWEsRUFDYixXQUFXLEVBQ1gsV0FBVyxFQUNYLFlBQVksRUFDWixrQkFBa0IsQ0FDbkI7RUFDRCxJQUFNQyxLQUFLLEdBQUcsRUFBRTtFQUFDLElBQUFDLEtBQUEsWUFBQUEsTUFBQSxFQUNjO0lBQzdCLElBQUlDLGNBQWMsR0FBRyxJQUFJO0lBQ3pCLElBQU1DLFNBQVMsR0FBR1YsSUFBSSxDQUFDRSxNQUFNLEVBQUUsR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLFNBQVM7SUFFN0QsSUFBTVMsUUFBUSxHQUFHWCxJQUFJLENBQUNZLElBQUksQ0FBQ1osSUFBSSxDQUFDRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDOUMsSUFBTVcsUUFBUSxHQUFHdEIsTUFBTSxDQUFDQyxZQUFZLENBQUMsRUFBRSxHQUFHUSxJQUFJLENBQUNZLElBQUksQ0FBQ1osSUFBSSxDQUFDRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUV4RSxJQUFNWSxXQUFXLEdBQUcsQ0FBQztNQUFFQyxJQUFJLEVBQUVULFNBQVMsQ0FBQ0EsU0FBUyxDQUFDSCxNQUFNLEdBQUcsQ0FBQztJQUFFLENBQUMsQ0FBQztJQUUvRCxJQUFJYSxVQUFVLEdBQUdILFFBQVE7SUFDekIsSUFBSUksVUFBVSxHQUFHTixRQUFRO0lBRXpCLEtBQUssSUFBSXRCLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR2dCLFdBQVcsQ0FBQ0EsV0FBVyxDQUFDRixNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUVkLENBQUMsRUFBRSxFQUFFO01BQzVEO01BQ0EsSUFBSTRCLFVBQVUsS0FBSyxFQUFFLEVBQUU7UUFDckJSLGNBQWMsR0FBRyxLQUFLO1FBQ3RCO01BQ0Y7TUFDQSxJQUFJTyxVQUFVLEtBQUssR0FBRyxFQUFFO1FBQ3RCUCxjQUFjLEdBQUcsS0FBSztRQUN0QjtNQUNGOztNQUVBO01BQ0FGLEtBQUssQ0FBQ1csT0FBTyxDQUFDLFVBQUNDLElBQUksRUFBSztRQUN0QixLQUFLLElBQUk3QixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUc2QixJQUFJLENBQUNoQixNQUFNLEVBQUViLENBQUMsRUFBRSxFQUFFO1VBQ3BDLElBQUkwQixVQUFVLEtBQUtHLElBQUksQ0FBQzdCLENBQUMsQ0FBQyxDQUFDTyxHQUFHLElBQUlvQixVQUFVLEtBQUtFLElBQUksQ0FBQzdCLENBQUMsQ0FBQyxDQUFDTSxHQUFHLEVBQUU7WUFDNURhLGNBQWMsR0FBRyxLQUFLO1lBQ3RCO1VBQ0Y7UUFDRjtNQUNGLENBQUMsQ0FBQztNQUVGLElBQUksQ0FBQ0EsY0FBYyxFQUFFO01BQ3JCSyxXQUFXLENBQUNuQixJQUFJLENBQUM7UUFBRUUsR0FBRyxFQUFFbUIsVUFBVTtRQUFFcEIsR0FBRyxFQUFFcUI7TUFBVyxDQUFDLENBQUM7TUFDdEQ7TUFDQSxJQUFJUCxTQUFTLEtBQUssU0FBUyxFQUFFTyxVQUFVLElBQUksQ0FBQyxDQUFDLEtBQ3hDRCxVQUFVLEdBQUd6QixNQUFNLENBQUNDLFlBQVksQ0FBQ3dCLFVBQVUsQ0FBQ3ZCLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckU7SUFFQSxJQUFJZ0IsY0FBYyxFQUFFO01BQ2xCRixLQUFLLENBQUNaLElBQUksQ0FBQ21CLFdBQVcsQ0FBQztNQUN2QlQsV0FBVyxDQUFDZSxHQUFHLEVBQUU7TUFDakJkLFNBQVMsQ0FBQ2MsR0FBRyxFQUFFO0lBQ2pCO0VBQ0YsQ0FBQztFQTdDRCxPQUFPZixXQUFXLENBQUNGLE1BQU0sR0FBRyxDQUFDO0lBQUFLLEtBQUE7RUFBQTtFQThDN0IsT0FBT0QsS0FBSztBQUNkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekV3QztBQUNjO0FBRXRELElBQU1pQixTQUFTLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGtCQUFrQixDQUFDO0FBRTVELFNBQVNDLFdBQVdBLENBQUEsRUFBRztFQUNyQixJQUFNeEMsS0FBSyxHQUFHc0MsUUFBUSxDQUFDRyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQUMsSUFBQXBCLEtBQUEsWUFBQUEsTUFBQW5CLENBQUEsRUFDWjtJQUFBLElBQUF3QyxNQUFBLFlBQUFBLE9BQUF2QyxDQUFBLEVBQzZDO01BQ3pFLElBQU13QyxNQUFNLEdBQUdMLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLFFBQVEsQ0FBQztNQUMvQ0UsTUFBTSxDQUFDQyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7TUFDOUJGLE1BQU0sQ0FBQ0MsU0FBUyxDQUFDQyxHQUFHLElBQUFDLE1BQUEsQ0FBSTNDLENBQUMsRUFBQTJDLE1BQUEsQ0FBRzVDLENBQUMsRUFBRztNQUNoQ3lDLE1BQU0sQ0FBQ0ksZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07UUFDckMsSUFBSUosTUFBTSxDQUFDSyxhQUFhLENBQUNKLFNBQVMsQ0FBQ0ssUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBQzdELElBQUlOLE1BQU0sQ0FBQ0ssYUFBYSxDQUFDSixTQUFTLENBQUNLLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUMzRGYsa0RBQWlCLENBQUMvQixDQUFDLEVBQUVELENBQUMsQ0FBQztRQUN6QixJQUFJeUMsTUFBTSxDQUFDSyxhQUFhLENBQUNKLFNBQVMsQ0FBQ0ssUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1VBQzFEYixxREFBUyxDQUFDakMsQ0FBQyxFQUFFRCxDQUFDLENBQUM7UUFDakI7TUFDRixDQUFDLENBQUM7TUFDRnlDLE1BQU0sQ0FBQ0ksZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFlBQU07UUFDekMsSUFBSSxDQUFDSixNQUFNLENBQUNLLGFBQWEsQ0FBQ0osU0FBUyxDQUFDSyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7UUFDN0RkLHdEQUFZLENBQUNoQyxDQUFDLEVBQUVELENBQUMsQ0FBQztNQUNwQixDQUFDLENBQUM7TUFDRkYsS0FBSyxDQUFDNEMsU0FBUyxDQUFDQyxHQUFHLENBQUMsT0FBTyxDQUFDO01BQzVCN0MsS0FBSyxDQUFDa0QsV0FBVyxDQUFDUCxNQUFNLENBQUM7SUFDM0IsQ0FBQztJQWxCRCxLQUFLLElBQUl4QyxDQUFDLEdBQUcsR0FBRyxFQUFFQSxDQUFDLEtBQUssR0FBRyxFQUFFQSxDQUFDLEdBQUdDLE1BQU0sQ0FBQ0MsWUFBWSxDQUFDRixDQUFDLENBQUNHLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7TUFBQW9DLE1BQUEsQ0FBQXZDLENBQUE7SUFBQTtFQW1CM0UsQ0FBQztFQXBCRCxLQUFLLElBQUlELENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsSUFBSSxDQUFDO0lBQUFtQixLQUFBLENBQUFuQixDQUFBO0VBQUE7RUFxQjlCLE9BQU9GLEtBQUs7QUFDZDtBQUVBLFNBQVNtRCxLQUFLQSxDQUFBLEVBQUc7RUFDZmQsU0FBUyxDQUFDZSxXQUFXLEdBQUcsRUFBRTtBQUM1QjtBQUVBLFNBQVNDLFlBQVlBLENBQUEsRUFBRztFQUN0QixJQUFNQyxNQUFNLEdBQUdoQixRQUFRLENBQUNHLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFDL0NhLE1BQU0sQ0FBQ0YsV0FBVyxHQUFHLFlBQVk7RUFDakMsT0FBT0UsTUFBTTtBQUNmO0FBRUEsU0FBU0MsWUFBWUEsQ0FBQSxFQUFHO0VBQ3RCLElBQU1DLE1BQU0sR0FBR2xCLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLFFBQVEsQ0FBQztFQUMvQ2UsTUFBTSxDQUFDSixXQUFXLEdBQUcscUJBQXFCO0VBQzFDLE9BQU9JLE1BQU07QUFDZjtBQUVBLFNBQVNDLFdBQVdBLENBQUNDLElBQUksRUFBRTtFQUN6QixJQUFNQyxLQUFLLEdBQUdyQixRQUFRLENBQUNHLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDM0NrQixLQUFLLENBQUNmLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE9BQU8sQ0FBQztFQUM1QmMsS0FBSyxDQUFDUCxXQUFXLEdBQUdNLElBQUk7RUFDeEIsT0FBT0MsS0FBSztBQUNkO0FBRUEsU0FBU0MsV0FBV0EsQ0FBQSxFQUFHO0VBQ3JCVCxLQUFLLEVBQUU7RUFFUCxJQUFNRyxNQUFNLEdBQUdELFlBQVksRUFBRTtFQUM3QixJQUFNRyxNQUFNLEdBQUdELFlBQVksRUFBRTtFQUM3QixJQUFNTSxPQUFPLEdBQUd2QixRQUFRLENBQUNHLGFBQWEsQ0FBQyxTQUFTLENBQUM7RUFDakQsSUFBTXFCLGFBQWEsR0FBR0wsV0FBVyxDQUFDLGtCQUFrQixDQUFDO0VBQ3JELElBQU1NLFdBQVcsR0FBR04sV0FBVyxDQUFDLFlBQVksQ0FBQztFQUM3QyxJQUFNTyxhQUFhLEdBQUd4QixXQUFXLEVBQUU7RUFDbkN3QixhQUFhLENBQUNwQixTQUFTLENBQUNDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztFQUM3QyxJQUFNb0IsV0FBVyxHQUFHekIsV0FBVyxFQUFFO0VBQ2pDeUIsV0FBVyxDQUFDckIsU0FBUyxDQUFDQyxHQUFHLENBQUMsY0FBYyxDQUFDO0VBRXpDZ0IsT0FBTyxDQUFDWCxXQUFXLENBQUNZLGFBQWEsQ0FBQztFQUNsQ0QsT0FBTyxDQUFDWCxXQUFXLENBQUNjLGFBQWEsRUFBRSxJQUFJLENBQUM7RUFDeENILE9BQU8sQ0FBQ1gsV0FBVyxDQUFDYSxXQUFXLENBQUM7RUFDaENGLE9BQU8sQ0FBQ1gsV0FBVyxDQUFDZSxXQUFXLENBQUM7RUFFaEM1QixTQUFTLENBQUNhLFdBQVcsQ0FBQ0ksTUFBTSxDQUFDO0VBQzdCakIsU0FBUyxDQUFDYSxXQUFXLENBQUNXLE9BQU8sQ0FBQztFQUM5QnhCLFNBQVMsQ0FBQ2EsV0FBVyxDQUFDTSxNQUFNLENBQUM7QUFDL0I7QUFFQSxTQUFTVSxlQUFlQSxDQUFDUixJQUFJLEVBQUU7RUFDN0IsSUFBTVMsS0FBSyxHQUFHN0IsUUFBUSxDQUFDRyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQzNDMEIsS0FBSyxDQUFDdkIsU0FBUyxDQUFDQyxHQUFHLENBQUMsUUFBUSxDQUFDO0VBRTdCLElBQU11QixZQUFZLEdBQUc5QixRQUFRLENBQUNHLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDbEQyQixZQUFZLENBQUN4QixTQUFTLENBQUNDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztFQUM1Q3VCLFlBQVksQ0FBQ2hCLFdBQVcsR0FBR00sSUFBSTtFQUUvQixJQUFNVyxZQUFZLEdBQUcvQixRQUFRLENBQUNHLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFDckQ0QixZQUFZLENBQUNqQixXQUFXLEdBQUcsUUFBUTtFQUNuQ2lCLFlBQVksQ0FBQ3pCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGVBQWUsQ0FBQztFQUUzQyxJQUFNeUIsT0FBTyxHQUFHaEMsUUFBUSxDQUFDRyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQzdDNkIsT0FBTyxDQUFDMUIsU0FBUyxDQUFDQyxHQUFHLENBQUMsU0FBUyxDQUFDO0VBRWhDc0IsS0FBSyxDQUFDakIsV0FBVyxDQUFDa0IsWUFBWSxDQUFDO0VBQy9CRCxLQUFLLENBQUNqQixXQUFXLENBQUNtQixZQUFZLENBQUM7RUFFL0JoQyxTQUFTLENBQUNhLFdBQVcsQ0FBQ29CLE9BQU8sQ0FBQztFQUM5QmpDLFNBQVMsQ0FBQ2EsV0FBVyxDQUFDaUIsS0FBSyxDQUFDO0FBQzlCO0FBRUEsU0FBU0ksVUFBVUEsQ0FBQ0MsWUFBWSxFQUFFQyxTQUFTLEVBQUU7RUFDM0MsSUFBTXpDLElBQUksR0FBR00sUUFBUSxDQUFDRyxhQUFhLENBQUMsUUFBUSxDQUFDO0VBQzdDVCxJQUFJLENBQUNZLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDNEIsU0FBUyxDQUFDO0VBQzdCekMsSUFBSSxDQUFDWSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7RUFDMUIsS0FBSyxJQUFJM0MsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHc0UsWUFBWSxFQUFFdEUsQ0FBQyxFQUFFLEVBQUU7SUFDckMsSUFBTXlDLE1BQU0sR0FBR0wsUUFBUSxDQUFDRyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQzVDVCxJQUFJLENBQUNrQixXQUFXLENBQUNQLE1BQU0sQ0FBQztFQUMxQjtFQUNBLE9BQU9YLElBQUk7QUFDYjtBQUVBLFNBQVMwQyxZQUFZQSxDQUFBLEVBQUc7RUFDdEIsSUFBTXBCLE1BQU0sR0FBR0QsWUFBWSxFQUFFO0VBQzdCLElBQU1HLE1BQU0sR0FBR0QsWUFBWSxFQUFFO0VBQzdCLElBQU1NLE9BQU8sR0FBR3ZCLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLFNBQVMsQ0FBQztFQUNqRCxJQUFNa0IsS0FBSyxHQUFHRixXQUFXLENBQUMsbUJBQW1CLENBQUM7RUFDOUMsSUFBTXpELEtBQUssR0FBR3dDLFdBQVcsRUFBRTtFQUMzQnhDLEtBQUssQ0FBQzRDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGFBQWEsQ0FBQztFQUVsQyxJQUFNOEIsY0FBYyxHQUFHckMsUUFBUSxDQUFDRyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQ3BEa0MsY0FBYyxDQUFDL0IsU0FBUyxDQUFDQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7RUFFL0MsSUFBTStCLGVBQWUsR0FBR0wsVUFBVSxDQUFDLENBQUMsRUFBRSxrQkFBa0IsQ0FBQztFQUN6RCxJQUFNTSxVQUFVLEdBQUdOLFVBQVUsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDO0VBQzlDLElBQU1PLFNBQVMsR0FBR1AsVUFBVSxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUM7RUFDNUMsSUFBTVEsU0FBUyxHQUFHUixVQUFVLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQztFQUM1QyxJQUFNUyxVQUFVLEdBQUdULFVBQVUsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDO0VBRS9DVixPQUFPLENBQUNYLFdBQVcsQ0FBQ1MsS0FBSyxDQUFDO0VBQzFCRSxPQUFPLENBQUNYLFdBQVcsQ0FBQ2xELEtBQUssQ0FBQztFQUUxQjJFLGNBQWMsQ0FBQ3pCLFdBQVcsQ0FBQzBCLGVBQWUsQ0FBQztFQUMzQ0QsY0FBYyxDQUFDekIsV0FBVyxDQUFDMkIsVUFBVSxDQUFDO0VBQ3RDRixjQUFjLENBQUN6QixXQUFXLENBQUM0QixTQUFTLENBQUM7RUFDckNILGNBQWMsQ0FBQ3pCLFdBQVcsQ0FBQzZCLFNBQVMsQ0FBQztFQUNyQ0osY0FBYyxDQUFDekIsV0FBVyxDQUFDOEIsVUFBVSxDQUFDO0VBRXRDM0MsU0FBUyxDQUFDYSxXQUFXLENBQUNJLE1BQU0sQ0FBQztFQUM3QmpCLFNBQVMsQ0FBQ2EsV0FBVyxDQUFDVyxPQUFPLENBQUM7RUFDOUJ4QixTQUFTLENBQUNhLFdBQVcsQ0FBQ3lCLGNBQWMsQ0FBQztFQUNyQ3RDLFNBQVMsQ0FBQ2EsV0FBVyxDQUFDTSxNQUFNLENBQUM7QUFDL0I7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1SUEsSUFBTXhCLElBQUksR0FBRyxTQUFQQSxJQUFJQSxDQUFJaUQsR0FBRztFQUFBLE9BQU07SUFDckJqRSxNQUFNLEVBQUVpRSxHQUFHO0lBQ1hDLElBQUksRUFBRSxDQUFDO0lBQ1BDLEdBQUcsV0FBQUEsSUFBQSxFQUFHO01BQ0osSUFBSSxDQUFDRCxJQUFJLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0RFLE1BQU0sV0FBQUEsT0FBQSxFQUFHO01BQ1AsSUFBSSxJQUFJLENBQUNGLElBQUksS0FBSyxJQUFJLENBQUNsRSxNQUFNLEVBQUUsT0FBTyxJQUFJO01BQzFDLE9BQU8sS0FBSztJQUNkO0VBQ0YsQ0FBQztBQUFBLENBQUM7QUFFRixTQUFTd0IsV0FBV0EsQ0FBQSxFQUFHO0VBQ3JCLElBQU14QyxLQUFLLEdBQUcsRUFBRTtFQUNoQixLQUFLLElBQUlFLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsRUFBRSxFQUFFO0lBQzNCLElBQU1tRixNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCQyxNQUFNLENBQUNDLE1BQU0sQ0FBQ0YsTUFBTSxFQUFFO01BQ3BCQSxNQUFNLEVBQUVuRixDQUFDO01BQ1RPLEdBQUcsRUFBRSxDQUNIO1FBQUUrRSxRQUFRLE1BQUExQyxNQUFBLENBQU01QyxDQUFDLENBQUU7UUFBRXVGLE9BQU8sRUFBRTtNQUFNLENBQUMsRUFDckM7UUFBRUQsUUFBUSxNQUFBMUMsTUFBQSxDQUFNNUMsQ0FBQyxDQUFFO1FBQUV1RixPQUFPLEVBQUU7TUFBTSxDQUFDLEVBQ3JDO1FBQUVELFFBQVEsTUFBQTFDLE1BQUEsQ0FBTTVDLENBQUMsQ0FBRTtRQUFFdUYsT0FBTyxFQUFFO01BQU0sQ0FBQyxFQUNyQztRQUFFRCxRQUFRLE1BQUExQyxNQUFBLENBQU01QyxDQUFDLENBQUU7UUFBRXVGLE9BQU8sRUFBRTtNQUFNLENBQUMsRUFDckM7UUFBRUQsUUFBUSxNQUFBMUMsTUFBQSxDQUFNNUMsQ0FBQyxDQUFFO1FBQUV1RixPQUFPLEVBQUU7TUFBTSxDQUFDLEVBQ3JDO1FBQUVELFFBQVEsTUFBQTFDLE1BQUEsQ0FBTTVDLENBQUMsQ0FBRTtRQUFFdUYsT0FBTyxFQUFFO01BQU0sQ0FBQyxFQUNyQztRQUFFRCxRQUFRLE1BQUExQyxNQUFBLENBQU01QyxDQUFDLENBQUU7UUFBRXVGLE9BQU8sRUFBRTtNQUFNLENBQUMsRUFDckM7UUFBRUQsUUFBUSxNQUFBMUMsTUFBQSxDQUFNNUMsQ0FBQyxDQUFFO1FBQUV1RixPQUFPLEVBQUU7TUFBTSxDQUFDLEVBQ3JDO1FBQUVELFFBQVEsTUFBQTFDLE1BQUEsQ0FBTTVDLENBQUMsQ0FBRTtRQUFFdUYsT0FBTyxFQUFFO01BQU0sQ0FBQyxFQUNyQztRQUFFRCxRQUFRLE1BQUExQyxNQUFBLENBQU01QyxDQUFDLENBQUU7UUFBRXVGLE9BQU8sRUFBRTtNQUFNLENBQUM7SUFFekMsQ0FBQyxDQUFDO0lBQ0Z6RixLQUFLLENBQUNRLElBQUksQ0FBQzZFLE1BQU0sQ0FBQztFQUNwQjtFQUNBLE9BQU9yRixLQUFLO0FBQ2Q7QUFFQSxJQUFNMEYsU0FBUyxHQUFHLFNBQVpBLFNBQVNBLENBQUE7RUFBQSxPQUFVO0lBQ3ZCMUYsS0FBSyxFQUFFd0MsV0FBVyxFQUFFO0lBQ3BCbUQsVUFBVSxXQUFBQSxXQUFDakYsR0FBRyxFQUFFRCxHQUFHLEVBQUU7TUFDbkIsSUFBTWtDLE1BQU0sR0FBRyxJQUFJLENBQUMzQyxLQUFLLENBQUNTLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQ0EsR0FBRyxDQUFDbUYsTUFBTSxDQUFDLFVBQUNDLEdBQUcsRUFBSztRQUNyRCxPQUFPQSxHQUFHLENBQUNMLFFBQVEsUUFBQTFDLE1BQUEsQ0FBUXBDLEdBQUcsRUFBQW9DLE1BQUEsQ0FBR3JDLEdBQUcsQ0FBRTtNQUN4QyxDQUFDLENBQUM7TUFDRixPQUFPa0MsTUFBTTtJQUNmLENBQUM7SUFDRG1ELGFBQWEsV0FBQUEsY0FBQ3BGLEdBQUcsRUFBRUQsR0FBRyxFQUFFO01BQ3RCLElBQU1zRixNQUFNLEdBQUcsQ0FBQyxDQUFDO01BQ2pCLElBQU1wRCxNQUFNLEdBQUcsSUFBSSxDQUFDZ0QsVUFBVSxDQUFDakYsR0FBRyxFQUFFRCxHQUFHLENBQUM7TUFDeEMsSUFBTStFLFFBQVEsR0FBRzdDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzZDLFFBQVE7TUFDbkMsSUFBTUMsT0FBTyxHQUFHOUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOEMsT0FBTztNQUNqQ0gsTUFBTSxDQUFDQyxNQUFNLENBQUNRLE1BQU0sRUFBRTtRQUFFUCxRQUFRLEVBQVJBLFFBQVE7UUFBRUMsT0FBTyxFQUFQQTtNQUFRLENBQUMsQ0FBQztNQUM1QyxPQUFPTSxNQUFNO0lBQ2YsQ0FBQztJQUNEM0UsS0FBSyxFQUFFLEVBQUU7SUFDVGdCLFNBQVMsV0FBQUEsVUFBQ1YsUUFBUSxFQUFFc0UsTUFBTSxFQUFFeEUsUUFBUSxFQUFFeUUsTUFBTSxFQUFFckUsSUFBSSxFQUFFO01BQ2xELElBQUlaLE1BQU0sR0FBRyxDQUFDO01BQ2QsSUFBSWtGLGVBQWUsR0FBRyxFQUFFO01BQ3hCLElBQUkxRSxRQUFRLEtBQUt5RSxNQUFNLEVBQUU7UUFDdkIsS0FBSyxJQUFJL0YsQ0FBQyxHQUFHc0IsUUFBUSxFQUFFdEIsQ0FBQyxHQUFHK0YsTUFBTSxHQUFHLENBQUMsRUFBRS9GLENBQUMsRUFBRSxFQUFFO1VBQzFDLElBQU15QyxNQUFNLEdBQUcsSUFBSSxDQUFDZ0QsVUFBVSxDQUFDakUsUUFBUSxFQUFFeEIsQ0FBQyxDQUFDO1VBQzNDeUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOEMsT0FBTyxHQUFHLElBQUk7VUFDeEJ6RSxNQUFNLElBQUksQ0FBQztVQUNYa0YsZUFBZSxDQUFDMUYsSUFBSSxJQUFBc0MsTUFBQSxDQUFJcEIsUUFBUSxFQUFBb0IsTUFBQSxDQUFHNUMsQ0FBQyxFQUFHO1FBQ3pDO01BQ0YsQ0FBQyxNQUFNO1FBQ0wsSUFBSTJCLFVBQVUsR0FBR0gsUUFBUTtRQUN6QixPQUFPRyxVQUFVLEtBQUt6QixNQUFNLENBQUNDLFlBQVksQ0FBQzJGLE1BQU0sQ0FBQzFGLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtVQUNuRSxJQUFNcUMsT0FBTSxHQUFHLElBQUksQ0FBQ2dELFVBQVUsQ0FBQzlELFVBQVUsRUFBRUwsUUFBUSxDQUFDO1VBQ3BEbUIsT0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOEMsT0FBTyxHQUFHLElBQUk7VUFDeEJTLGVBQWUsQ0FBQzFGLElBQUksSUFBQXNDLE1BQUEsQ0FBSWpCLFVBQVUsRUFBQWlCLE1BQUEsQ0FBR3RCLFFBQVEsRUFBRztVQUNoREssVUFBVSxHQUFHekIsTUFBTSxDQUFDQyxZQUFZLENBQUN3QixVQUFVLENBQUN2QixVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1VBQzlEVSxNQUFNLElBQUksQ0FBQztRQUNiO01BQ0Y7TUFDQSxJQUFJLENBQUNJLEtBQUssQ0FBQ1osSUFBSSxDQUFDO1FBQ2RJLE9BQU8sRUFBRXNGLGVBQWU7UUFDeEJ0RSxJQUFJLEVBQUpBLElBQUk7UUFDSmlFLEdBQUcsRUFBRTdELElBQUksQ0FBQ2hCLE1BQU07TUFDbEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNEbUYsT0FBTyxFQUFFLEVBQUU7SUFDWEMsV0FBVyxXQUFBQSxZQUFDWixRQUFRLEVBQUVhLFNBQVMsRUFBRUMsUUFBUSxFQUFFO01BQ3pDLElBQUksQ0FBQ0gsT0FBTyxDQUFDM0YsSUFBSSxDQUFDO1FBQUVnRixRQUFRLEVBQVJBLFFBQVE7UUFBRWEsU0FBUyxFQUFUQSxTQUFTO1FBQUVDLFFBQVEsRUFBUkE7TUFBUyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUNEQyxZQUFZLFdBQUFBLGFBQUEsRUFBRztNQUNiLElBQUksSUFBSSxDQUFDbkYsS0FBSyxDQUFDSixNQUFNLEtBQUssQ0FBQyxFQUFFLE9BQU8sS0FBSztNQUN6QyxJQUFJd0YsU0FBUyxHQUFHLENBQUM7TUFDakIsSUFBSSxDQUFDTCxPQUFPLENBQUNwRSxPQUFPLENBQUMsVUFBQzBFLE1BQU0sRUFBSztRQUMvQixJQUFJQSxNQUFNLENBQUNILFFBQVEsRUFBRUUsU0FBUyxJQUFJLENBQUM7TUFDckMsQ0FBQyxDQUFDO01BQ0YsSUFBSUEsU0FBUyxJQUFJLElBQUksQ0FBQ3BGLEtBQUssQ0FBQ0osTUFBTSxFQUFFLE9BQU8sSUFBSTtNQUMvQyxPQUFPLEtBQUs7SUFDZCxDQUFDO0lBQ0RULGdCQUFnQixXQUFBQSxpQkFBQ0csR0FBRyxFQUFFRCxHQUFHLEVBQUU7TUFDekIsSUFBSWlHLE1BQU0sR0FBRyxLQUFLO01BQ2xCLElBQUksQ0FBQ1AsT0FBTyxDQUFDcEUsT0FBTyxDQUFDLFVBQUMwRSxNQUFNLEVBQUs7UUFDL0IsSUFBSUEsTUFBTSxDQUFDakIsUUFBUSxRQUFBMUMsTUFBQSxDQUFRcEMsR0FBRyxFQUFBb0MsTUFBQSxDQUFHckMsR0FBRyxDQUFFLEVBQUU7VUFDdENpRyxNQUFNLEdBQUcsSUFBSTtVQUNiO1FBQ0Y7TUFDRixDQUFDLENBQUM7TUFDRixPQUFPQSxNQUFNO0lBQ2YsQ0FBQztJQUNEQyxhQUFhLFdBQUFBLGNBQUNqRyxHQUFHLEVBQUVELEdBQUcsRUFBRTtNQUN0QixJQUFJLElBQUksQ0FBQ0YsZ0JBQWdCLENBQUNHLEdBQUcsRUFBRUQsR0FBRyxDQUFDLEVBQUUsT0FBT21HLFNBQVM7TUFDckQsSUFBSUMsWUFBWSxHQUFHLEtBQUs7TUFDeEIsSUFBSSxDQUFDekYsS0FBSyxDQUFDVyxPQUFPLENBQUMsVUFBQytFLElBQUksRUFBSztRQUMzQkEsSUFBSSxDQUFDbEcsT0FBTyxDQUFDbUIsT0FBTyxDQUFDLFVBQUNZLE1BQU0sRUFBSztVQUMvQixJQUFJQSxNQUFNLFFBQUFHLE1BQUEsQ0FBUXBDLEdBQUcsRUFBQW9DLE1BQUEsQ0FBR3JDLEdBQUcsQ0FBRSxFQUFFb0csWUFBWSxHQUFHQyxJQUFJO1FBQ3BELENBQUMsQ0FBQztNQUNKLENBQUMsQ0FBQztNQUNGLElBQUlELFlBQVksRUFBRTtRQUNoQkEsWUFBWSxDQUFDaEIsR0FBRyxDQUFDVixHQUFHLEVBQUU7UUFDdEIsSUFBSSxDQUFDaUIsV0FBVyxJQUFBdEQsTUFBQSxDQUFJcEMsR0FBRyxFQUFBb0MsTUFBQSxDQUFHckMsR0FBRyxHQUFJLElBQUksRUFBRW9HLFlBQVksQ0FBQ2hCLEdBQUcsQ0FBQ1QsTUFBTSxFQUFFLENBQUM7UUFDakUsT0FBT3lCLFlBQVksQ0FBQ2pGLElBQUk7TUFDMUI7TUFDQSxJQUFJLENBQUN3RSxXQUFXLElBQUF0RCxNQUFBLENBQUlwQyxHQUFHLEVBQUFvQyxNQUFBLENBQUdyQyxHQUFHLEdBQUksS0FBSyxFQUFFLEtBQUssQ0FBQztNQUM5QyxVQUFBcUMsTUFBQSxDQUFVcEMsR0FBRyxFQUFBb0MsTUFBQSxDQUFHckMsR0FBRztJQUNyQjtFQUNGLENBQUM7QUFBQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEhxRTtBQUNwQztBQUN3QjtBQUNUO0FBRWxELElBQU13RCxXQUFXLEdBQUd5QixnREFBUyxFQUFFO0FBQy9CLElBQU0xQixhQUFhLEdBQUcwQixnREFBUyxFQUFFO0FBQ2pDLElBQUlzQixVQUFVLEdBQUcsSUFBSTtBQUVyQixTQUFTQyxvQkFBb0JBLENBQUM3RixLQUFLLEVBQUVwQixLQUFLLEVBQUVrSCxTQUFTLEVBQUU7RUFDckQ5RixLQUFLLENBQUNXLE9BQU8sQ0FBQyxVQUFDQyxJQUFJLEVBQUs7SUFDdEIsSUFBSW1GLEtBQUssR0FBR1AsU0FBUztJQUNyQixJQUFJaEYsSUFBSSxHQUFHZ0YsU0FBUztJQUNwQixJQUFJUSxJQUFJLEdBQUdSLFNBQVM7SUFDcEI1RSxJQUFJLENBQUNELE9BQU8sQ0FBQyxVQUFDWSxNQUFNLEVBQUs7TUFDdkIsSUFBSWYsSUFBSSxLQUFLZ0YsU0FBUyxFQUFFO1FBQ3RCaEYsSUFBSSxHQUFHZSxNQUFNLENBQUNmLElBQUk7UUFDbEI7TUFDRjtNQUNBLElBQUl1RixLQUFLLEtBQUtQLFNBQVMsRUFBRU8sS0FBSyxHQUFHO1FBQUV6RyxHQUFHLEVBQUVpQyxNQUFNLENBQUNqQyxHQUFHO1FBQUVELEdBQUcsRUFBRWtDLE1BQU0sQ0FBQ2xDO01BQUksQ0FBQztNQUNyRTJHLElBQUksR0FBRztRQUFFMUcsR0FBRyxFQUFFaUMsTUFBTSxDQUFDakMsR0FBRztRQUFFRCxHQUFHLEVBQUVrQyxNQUFNLENBQUNsQztNQUFJLENBQUM7TUFDM0M7TUFDQSxJQUFJeUcsU0FBUyxLQUFLLFFBQVEsRUFBRTtRQUMxQixJQUFNRyxPQUFPLEdBQUcvRSxRQUFRLENBQ3JCQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQzlCQSxhQUFhLEtBQUFPLE1BQUEsQ0FBS0gsTUFBTSxDQUFDakMsR0FBRyxFQUFBb0MsTUFBQSxDQUFHSCxNQUFNLENBQUNsQyxHQUFHLEVBQUc7UUFDL0M0RyxPQUFPLENBQUN6RSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7TUFDL0I7SUFDRixDQUFDLENBQUM7SUFDRjdDLEtBQUssQ0FBQ29DLFNBQVMsQ0FBQytFLEtBQUssQ0FBQ3pHLEdBQUcsRUFBRTBHLElBQUksQ0FBQzFHLEdBQUcsRUFBRXlHLEtBQUssQ0FBQzFHLEdBQUcsRUFBRTJHLElBQUksQ0FBQzNHLEdBQUcsRUFBRW1CLElBQUksQ0FBQztFQUNqRSxDQUFDLENBQUM7QUFDSjtBQUVBLFNBQVMwRixJQUFJQSxDQUFDQyxXQUFXLEVBQUVDLGFBQWEsRUFBRTtFQUN4Q1Asb0JBQW9CLENBQUNoRywwREFBZSxFQUFFLEVBQUVnRCxXQUFXLEVBQUUsUUFBUSxDQUFDO0VBQzlEZ0Qsb0JBQW9CLENBQUNoRywwREFBZSxFQUFFLEVBQUUrQyxhQUFhLEVBQUUsVUFBVSxDQUFDO0FBQ3BFO0FBRUEsU0FBU3lELFVBQVVBLENBQUN6SCxLQUFLLEVBQUVVLEdBQUcsRUFBRUQsR0FBRyxFQUFFeUcsU0FBUyxFQUFFO0VBQzlDbEgsS0FBSyxDQUFDMkcsYUFBYSxDQUFDakcsR0FBRyxFQUFFRCxHQUFHLENBQUM7RUFDN0IsSUFBSVQsS0FBSyxDQUFDbUcsT0FBTyxDQUFDbkcsS0FBSyxDQUFDbUcsT0FBTyxDQUFDbkYsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDcUYsU0FBUyxFQUFFO0lBQ3JEL0QsUUFBUSxDQUNMQyxhQUFhLEtBQUFPLE1BQUEsQ0FBS29FLFNBQVMsWUFBUyxDQUNwQzNFLGFBQWEsS0FBQU8sTUFBQSxDQUFLcEMsR0FBRyxFQUFBb0MsTUFBQSxDQUFHckMsR0FBRyxFQUFHLENBQzlCbUMsU0FBUyxDQUFDQyxHQUFHLENBQUMsS0FBSyxDQUFDO0VBQ3pCLENBQUMsTUFBTTtJQUNMUCxRQUFRLENBQ0xDLGFBQWEsS0FBQU8sTUFBQSxDQUFLb0UsU0FBUyxZQUFTLENBQ3BDM0UsYUFBYSxLQUFBTyxNQUFBLENBQUtwQyxHQUFHLEVBQUFvQyxNQUFBLENBQUdyQyxHQUFHLEVBQUcsQ0FDOUJtQyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7RUFDNUI7QUFDRjtBQUVBLFNBQVM2RSxPQUFPQSxDQUFDaEUsSUFBSSxFQUFFO0VBQ3JCc0QsVUFBVSxHQUFHLEtBQUs7RUFDbEI5Qyx5REFBZSxDQUFDUixJQUFJLENBQUM7QUFDdkI7O0FBRUE7QUFDQSxTQUFTeEIsaUJBQWlCQSxDQUFDeEIsR0FBRyxFQUFFRCxHQUFHLEVBQUU7RUFDbkMsSUFBSSxDQUFDdUcsVUFBVSxJQUFJaEQsYUFBYSxDQUFDekQsZ0JBQWdCLENBQUNHLEdBQUcsRUFBRUQsR0FBRyxDQUFDLEVBQUU7RUFFN0RnSCxVQUFVLENBQUN6RCxhQUFhLEVBQUV0RCxHQUFHLEVBQUVELEdBQUcsRUFBRSxVQUFVLENBQUM7RUFDL0MsSUFBSXVELGFBQWEsQ0FBQ3VDLFlBQVksRUFBRSxFQUFFO0lBQ2hDbUIsT0FBTyxDQUFDLFVBQVUsQ0FBQztJQUNuQjtFQUNGO0VBRUEsSUFBTUMsY0FBYyxHQUFHaEgsdURBQVksQ0FBQ3NELFdBQVcsQ0FBQztFQUNoRHdELFVBQVUsQ0FBQ3hELFdBQVcsRUFBRTBELGNBQWMsQ0FBQ2pILEdBQUcsRUFBRWlILGNBQWMsQ0FBQ2xILEdBQUcsRUFBRSxRQUFRLENBQUM7RUFDekUsSUFBSXdELFdBQVcsQ0FBQ3NDLFlBQVksRUFBRSxFQUFFO0lBQzlCbUIsT0FBTyxDQUFDLGtCQUFrQixDQUFDO0lBQzNCO0VBQ0Y7QUFDRjs7QUFFQTtBQUNBO0FBQ0FoRCxzREFBWSxFQUFFO0FBRWQsSUFBTXRELEtBQUssR0FBR2tCLFFBQVEsQ0FBQ3NGLGdCQUFnQixDQUFDLE9BQU8sQ0FBQztBQUNoRHhHLEtBQUssQ0FBQ1csT0FBTyxDQUFDLFVBQUNDLElBQUksRUFBSztFQUN0QkEsSUFBSSxDQUFDZSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtJQUNuQztJQUNBLElBQUlmLElBQUksQ0FBQ1ksU0FBUyxDQUFDSyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7TUFDdkNqQixJQUFJLENBQUNZLFNBQVMsQ0FBQ2lGLE1BQU0sQ0FBQyxVQUFVLENBQUM7TUFDakNkLCtEQUFtQixDQUFDLENBQUMsQ0FBQztNQUN0QjtJQUNGO0lBQ0E7SUFDQTNGLEtBQUssQ0FBQ1csT0FBTyxDQUFDLFVBQUMrRixLQUFLO01BQUEsT0FBS0EsS0FBSyxDQUFDbEYsU0FBUyxDQUFDaUYsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUFBLEVBQUM7SUFDNUQ7SUFDQTdGLElBQUksQ0FBQ1ksU0FBUyxDQUFDQyxHQUFHLENBQUMsVUFBVSxDQUFDO0lBQzlCa0UsK0RBQW1CLENBQUMvRSxJQUFJLENBQUMrRixRQUFRLENBQUMvRyxNQUFNLENBQUM7RUFDM0MsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsaUVBQWVrQixpQkFBaUI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakdoQyxJQUFJOEYsZ0JBQWdCLEdBQUcsQ0FBQztBQUN4QixJQUFJekcsU0FBUyxHQUFHLFNBQVM7QUFDekIsSUFBSTBHLGNBQWMsR0FBRyxLQUFLO0FBRTFCLFNBQVNsQixtQkFBbUJBLENBQUMvRixNQUFNLEVBQUU7RUFDbkNnSCxnQkFBZ0IsR0FBR2hILE1BQU07QUFDM0I7QUFFQSxTQUFTa0gsZUFBZUEsQ0FBQSxFQUFHO0VBQ3pCM0csU0FBUyxLQUFLLFNBQVMsR0FBSUEsU0FBUyxHQUFHLFNBQVMsR0FBS0EsU0FBUyxHQUFHLFNBQVU7QUFDN0U7QUFFQSxTQUFTNEcsWUFBWUEsQ0FBQSxFQUFHO0VBQ3RCN0YsUUFBUSxDQUFDc0YsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM3RixPQUFPLENBQUMsVUFBQ3FHLE9BQU8sRUFBSztJQUN6REEsT0FBTyxDQUFDeEYsU0FBUyxDQUFDaUYsTUFBTSxDQUFDLFNBQVMsQ0FBQztFQUNyQyxDQUFDLENBQUM7QUFDSjtBQUVBLFNBQVMxRixZQUFZQSxDQUFDekIsR0FBRyxFQUFFRCxHQUFHLEVBQUU7RUFDOUIsSUFBSTZCLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFdBQVcsQ0FBQyxLQUFLLElBQUksRUFBRTtFQUNsRCxJQUFJVixVQUFVLEdBQUduQixHQUFHO0VBQ3BCLElBQUlvQixVQUFVLEdBQUdyQixHQUFHO0VBQ3BCLElBQUk0SCxjQUFjLEdBQUdMLGdCQUFnQjtFQUNyQ00sT0FBTyxDQUFDQyxHQUFHLENBQUNGLGNBQWMsQ0FBQztFQUUzQkYsWUFBWSxFQUFFO0VBRWQsT0FBT0UsY0FBYyxHQUFHLENBQUMsRUFBRTtJQUN6QixJQUFNMUYsTUFBTSxHQUFHTCxRQUFRLENBQUNDLGFBQWEsS0FBQU8sTUFBQSxDQUFLakIsVUFBVSxFQUFBaUIsTUFBQSxDQUFHaEIsVUFBVSxFQUFHO0lBQ3BFLElBQUlhLE1BQU0sS0FBSyxJQUFJLEVBQUU7TUFDbkJzRixjQUFjLEdBQUcsS0FBSztNQUN0QjtJQUNGO0lBQ0EsSUFBSXRGLE1BQU0sQ0FBQ0MsU0FBUyxDQUFDSyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7TUFDckNnRixjQUFjLEdBQUcsS0FBSztNQUN0QjtJQUNGO0lBRUF0RixNQUFNLENBQUNDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUMvQixJQUFJdEIsU0FBUyxLQUFLLFNBQVMsRUFBRU8sVUFBVSxJQUFJLENBQUMsQ0FBQyxLQUN4Q0QsVUFBVSxHQUFHekIsTUFBTSxDQUFDQyxZQUFZLENBQUN3QixVQUFVLENBQUN2QixVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRW5FK0gsY0FBYyxJQUFJLENBQUM7RUFDckI7RUFFQSxJQUFJQSxjQUFjLEtBQUssQ0FBQyxFQUFFSixjQUFjLEdBQUcsSUFBSTtBQUNqRDtBQUVBLFNBQVM3RixTQUFTQSxDQUFDMUIsR0FBRyxFQUFFRCxHQUFHLEVBQUU7RUFDM0IsSUFBSSxDQUFDd0gsY0FBYyxFQUFFO0VBQ3JCLElBQUlwRyxVQUFVLEdBQUduQixHQUFHO0VBQ3BCLElBQUlvQixVQUFVLEdBQUdyQixHQUFHO0VBQ3BCLElBQUk0SCxjQUFjLEdBQUdMLGdCQUFnQjtFQUNyQyxPQUFPSyxjQUFjLEdBQUcsQ0FBQyxFQUFFO0lBQ3pCLElBQU0xRixNQUFNLEdBQUdMLFFBQVEsQ0FBQ0MsYUFBYSxLQUFBTyxNQUFBLENBQUtqQixVQUFVLEVBQUFpQixNQUFBLENBQUdoQixVQUFVLEVBQUc7SUFDcEVhLE1BQU0sQ0FBQ0MsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQzVCLElBQUl0QixTQUFTLEtBQUssU0FBUyxFQUFFTyxVQUFVLElBQUksQ0FBQyxDQUFDLEtBQ3hDRCxVQUFVLEdBQUd6QixNQUFNLENBQUNDLFlBQVksQ0FBQ3dCLFVBQVUsQ0FBQ3ZCLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkUrSCxjQUFjLElBQUksQ0FBQztFQUNyQjtFQUNBL0YsUUFBUSxDQUFDQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUNzRixNQUFNLEVBQUU7RUFDNUNNLFlBQVksRUFBRTtBQUNoQjs7Ozs7OztVQzlEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kaXNwbGF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxhY2VtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZ2V0UG9zc2libGVDaG9pY2VzKGJvYXJkKSB7XG4gIGNvbnN0IHBvc3NpYmxlU3F1YXJlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IDExOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gXCJhXCI7IGogIT09IFwia1wiOyBqID0gU3RyaW5nLmZyb21DaGFyQ29kZShqLmNoYXJDb2RlQXQoMCkgKyAxKSkge1xuICAgICAgaWYgKCFib2FyZC5pc1JlcGVhdGVkQXR0YWNrKGosIGkpKVxuICAgICAgICBwb3NzaWJsZVNxdWFyZXMucHVzaCh7IHJvdzogaSwgY29sOiBqIH0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcG9zc2libGVTcXVhcmVzO1xufVxuXG5mdW5jdGlvbiBjaG9vc2VTcXVhcmUoYm9hcmQpIHtcbiAgY29uc3Qgc3F1YXJlcyA9IGdldFBvc3NpYmxlQ2hvaWNlcyhib2FyZCk7XG4gIHJldHVybiBzcXVhcmVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNxdWFyZXMubGVuZ3RoKV07XG59XG5cbmZ1bmN0aW9uIHJhbmRvbVNoaXBBcnJheSgpIHtcbiAgY29uc3Qgc2hpcExlbmd0aHMgPSBbMiwgMywgMywgNCwgNV07XG4gIGNvbnN0IHNoaXBOYW1lcyA9IFtcbiAgICBcIlBhdHJvbCBCb2F0XCIsXG4gICAgXCJTdWJtYXJpbmVcIixcbiAgICBcIkRlc3Ryb3llclwiLFxuICAgIFwiQmF0dGxlU2hpcFwiLFxuICAgIFwiQWlyY3JhZnQgQ2FycmllclwiLFxuICBdO1xuICBjb25zdCBzaGlwcyA9IFtdO1xuICB3aGlsZSAoc2hpcExlbmd0aHMubGVuZ3RoID4gMCkge1xuICAgIGxldCB2YWxpZFBsYWNlbWVudCA9IHRydWU7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/IFwicm93U3BhblwiIDogXCJjb2xTcGFuXCI7XG5cbiAgICBjb25zdCBzdGFydFJvdyA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGNvbnN0IHN0YXJ0Q29sID0gU3RyaW5nLmZyb21DaGFyQ29kZSg5NiArIE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogMTApKTtcblxuICAgIGNvbnN0IGN1cnJlbnRTaGlwID0gW3sgbmFtZTogc2hpcE5hbWVzW3NoaXBOYW1lcy5sZW5ndGggLSAxXSB9XTtcblxuICAgIGxldCBjdXJyZW50Q29sID0gc3RhcnRDb2w7XG4gICAgbGV0IGN1cnJlbnRSb3cgPSBzdGFydFJvdztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHNbc2hpcExlbmd0aHMubGVuZ3RoIC0gMV07IGkrKykge1xuICAgICAgLy8gT3V0IG9mIEJvdW5kc1xuICAgICAgaWYgKGN1cnJlbnRSb3cgPT09IDExKSB7XG4gICAgICAgIHZhbGlkUGxhY2VtZW50ID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnRDb2wgPT09IFwia1wiKSB7XG4gICAgICAgIHZhbGlkUGxhY2VtZW50ID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICAvLyBPdmVybGFwXG4gICAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgc2hpcC5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmIChjdXJyZW50Q29sID09PSBzaGlwW2pdLmNvbCAmJiBjdXJyZW50Um93ID09PSBzaGlwW2pdLnJvdykge1xuICAgICAgICAgICAgdmFsaWRQbGFjZW1lbnQgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmICghdmFsaWRQbGFjZW1lbnQpIGJyZWFrO1xuICAgICAgY3VycmVudFNoaXAucHVzaCh7IGNvbDogY3VycmVudENvbCwgcm93OiBjdXJyZW50Um93IH0pO1xuICAgICAgLy8gSW5jcmVtZW50XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBcInJvd1NwYW5cIikgY3VycmVudFJvdyArPSAxO1xuICAgICAgZWxzZSBjdXJyZW50Q29sID0gU3RyaW5nLmZyb21DaGFyQ29kZShjdXJyZW50Q29sLmNoYXJDb2RlQXQoMCkgKyAxKTtcbiAgICB9XG5cbiAgICBpZiAodmFsaWRQbGFjZW1lbnQpIHtcbiAgICAgIHNoaXBzLnB1c2goY3VycmVudFNoaXApO1xuICAgICAgc2hpcExlbmd0aHMucG9wKCk7XG4gICAgICBzaGlwTmFtZXMucG9wKCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzaGlwcztcbn1cblxuZXhwb3J0IHsgY2hvb3NlU3F1YXJlLCBnZXRQb3NzaWJsZUNob2ljZXMsIHJhbmRvbVNoaXBBcnJheSB9O1xuIiwiaW1wb3J0IGhhbmRsZVNxdWFyZUNsaWNrIGZyb20gXCIuL2luZGV4XCI7XG5pbXBvcnQgeyBkaXNwbGF5SG92ZXIsIHBsYWNlU2hpcCB9IGZyb20gXCIuL3BsYWNlbWVudFwiO1xuXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtY29udGFpbmVyXVwiKTtcblxuZnVuY3Rpb24gY3JlYXRlQm9hcmQoKSB7XG4gIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMTsgaSArPSAxKSB7XG4gICAgZm9yIChsZXQgaiA9IFwiYVwiOyBqICE9PSBcImtcIjsgaiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoai5jaGFyQ29kZUF0KDApICsgMSkpIHtcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInNxdWFyZVwiKTtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGAke2p9JHtpfWApO1xuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmIChzcXVhcmUucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXItYm9hcmRcIikpIHJldHVybjtcbiAgICAgICAgaWYgKHNxdWFyZS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImNvbXB1dGVyLWJvYXJkXCIpKVxuICAgICAgICAgIGhhbmRsZVNxdWFyZUNsaWNrKGosIGkpO1xuICAgICAgICBpZiAoc3F1YXJlLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2V0dXAtYm9hcmRcIikpIHtcbiAgICAgICAgICBwbGFjZVNoaXAoaiwgaSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoIXNxdWFyZS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcInNldHVwLWJvYXJkXCIpKSByZXR1cm47XG4gICAgICAgIGRpc3BsYXlIb3ZlcihqLCBpKTtcbiAgICAgIH0pO1xuICAgICAgYm9hcmQuY2xhc3NMaXN0LmFkZChcImJvYXJkXCIpO1xuICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJvYXJkO1xufVxuXG5mdW5jdGlvbiByZXNldCgpIHtcbiAgY29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSGVhZGVyKCkge1xuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuICBoZWFkZXIudGV4dENvbnRlbnQgPSBcIkJhdHRsZXNoaXBcIjtcbiAgcmV0dXJuIGhlYWRlcjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRm9vdGVyKCkge1xuICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9vdGVyXCIpO1xuICBmb290ZXIudGV4dENvbnRlbnQgPSBcIk1hZGUgYnkgV2lsbCBNb3JldHpcIjtcbiAgcmV0dXJuIGZvb3Rlcjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVGl0bGUodGV4dCkge1xuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHRpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0aXRsZVwiKTtcbiAgdGl0bGUudGV4dENvbnRlbnQgPSB0ZXh0O1xuICByZXR1cm4gdGl0bGU7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlHYW1lKCkge1xuICByZXNldCgpO1xuXG4gIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUhlYWRlcigpO1xuICBjb25zdCBmb290ZXIgPSBjcmVhdGVGb290ZXIoKTtcbiAgY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICBjb25zdCBjb21wdXRlclRpdGxlID0gY3JlYXRlVGl0bGUoXCJDb21wdXRlcidzIEJvYXJkXCIpO1xuICBjb25zdCBwbGF5ZXJUaXRsZSA9IGNyZWF0ZVRpdGxlKFwiWW91ciBCb2FyZFwiKTtcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG4gIGNvbXB1dGVyQm9hcmQuY2xhc3NMaXN0LmFkZChcImNvbXB1dGVyLWJvYXJkXCIpO1xuICBjb25zdCBwbGF5ZXJCb2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG4gIHBsYXllckJvYXJkLmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXItYm9hcmRcIik7XG5cbiAgc2VjdGlvbi5hcHBlbmRDaGlsZChjb21wdXRlclRpdGxlKTtcbiAgc2VjdGlvbi5hcHBlbmRDaGlsZChjb21wdXRlckJvYXJkLCBudWxsKTtcbiAgc2VjdGlvbi5hcHBlbmRDaGlsZChwbGF5ZXJUaXRsZSk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQocGxheWVyQm9hcmQpO1xuXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VjdGlvbik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb290ZXIpO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5R2FtZU92ZXIodGV4dCkge1xuICBjb25zdCBwb3BVcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHBvcFVwLmNsYXNzTGlzdC5hZGQoXCJwb3AtdXBcIik7XG5cbiAgY29uc3QgZ2FtZU92ZXJUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZ2FtZU92ZXJUZXh0LmNsYXNzTGlzdC5hZGQoXCJnYW1lLW92ZXItdGV4dFwiKTtcbiAgZ2FtZU92ZXJUZXh0LnRleHRDb250ZW50ID0gdGV4dDtcblxuICBjb25zdCByZXBsYXlCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICByZXBsYXlCdXR0b24udGV4dENvbnRlbnQgPSBcIlJlcGxheVwiO1xuICByZXBsYXlCdXR0b24uY2xhc3NMaXN0LmFkZChcInJlcGxheS1idXR0b25cIik7XG5cbiAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG92ZXJsYXkuY2xhc3NMaXN0LmFkZChcIm92ZXJsYXlcIik7XG5cbiAgcG9wVXAuYXBwZW5kQ2hpbGQoZ2FtZU92ZXJUZXh0KTtcbiAgcG9wVXAuYXBwZW5kQ2hpbGQocmVwbGF5QnV0dG9uKTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwb3BVcCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNoaXAoc3F1YXJlQW1vdW50LCBjbGFzc05hbWUpIHtcbiAgY29uc3Qgc2hpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHNoaXAuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICBzaGlwLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNxdWFyZUFtb3VudDsgaSsrKSB7XG4gICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzaGlwLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gIH1cbiAgcmV0dXJuIHNoaXA7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlTZXR1cCgpIHtcbiAgY29uc3QgaGVhZGVyID0gY3JlYXRlSGVhZGVyKCk7XG4gIGNvbnN0IGZvb3RlciA9IGNyZWF0ZUZvb3RlcigpO1xuICBjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gIGNvbnN0IHRpdGxlID0gY3JlYXRlVGl0bGUoXCJQbGFjZSBZb3VyIFNoaXBzIVwiKTtcbiAgY29uc3QgYm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICBib2FyZC5jbGFzc0xpc3QuYWRkKFwic2V0dXAtYm9hcmRcIik7XG5cbiAgY29uc3Qgc2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzaGlwc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwic2hpcHMtY29udGFpbmVyXCIpO1xuXG4gIGNvbnN0IGFpcmNyYWZ0Q2FycmllciA9IGNyZWF0ZVNoaXAoNSwgXCJhaXJjcmFmdC1jYXJyaWVyXCIpO1xuICBjb25zdCBiYXR0bGVzaGlwID0gY3JlYXRlU2hpcCg0LCBcImJhdHRsZXNoaXBcIik7XG4gIGNvbnN0IHN1Ym1hcmluZSA9IGNyZWF0ZVNoaXAoMywgXCJzdWJtYXJpbmVcIik7XG4gIGNvbnN0IGRlc3Ryb3llciA9IGNyZWF0ZVNoaXAoMywgXCJkZXN0cm95ZXJcIik7XG4gIGNvbnN0IHBhdHJvbEJvYXQgPSBjcmVhdGVTaGlwKDIsIFwicGF0cm9sLWJvYXRcIik7XG5cbiAgc2VjdGlvbi5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoYm9hcmQpO1xuXG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGFpcmNyYWZ0Q2Fycmllcik7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGJhdHRsZXNoaXApO1xuICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChzdWJtYXJpbmUpO1xuICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChkZXN0cm95ZXIpO1xuICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChwYXRyb2xCb2F0KTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNlY3Rpb24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2hpcHNDb250YWluZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcbn1cblxuZXhwb3J0IHsgZGlzcGxheUdhbWUsIGRpc3BsYXlTZXR1cCwgZGlzcGxheUdhbWVPdmVyIH07XG4iLCJjb25zdCBzaGlwID0gKGxlbikgPT4gKHtcbiAgbGVuZ3RoOiBsZW4sXG4gIGhpdHM6IDAsXG4gIGhpdCgpIHtcbiAgICB0aGlzLmhpdHMgKz0gMTtcbiAgfSxcbiAgaXNTdW5rKCkge1xuICAgIGlmICh0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG59KTtcblxuZnVuY3Rpb24gY3JlYXRlQm9hcmQoKSB7XG4gIGNvbnN0IGJvYXJkID0gW107XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgMTE7IGkrKykge1xuICAgIGNvbnN0IGNvbHVtbiA9IHt9O1xuICAgIE9iamVjdC5hc3NpZ24oY29sdW1uLCB7XG4gICAgICBjb2x1bW46IGksXG4gICAgICByb3c6IFtcbiAgICAgICAgeyBwb3NpdGlvbjogYGEke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGIke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGMke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGQke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGUke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGYke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGcke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGgke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGkke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgICAgeyBwb3NpdGlvbjogYGoke2l9YCwgaGFzU2hpcDogZmFsc2UgfSxcbiAgICAgIF0sXG4gICAgfSk7XG4gICAgYm9hcmQucHVzaChjb2x1bW4pO1xuICB9XG4gIHJldHVybiBib2FyZDtcbn1cblxuY29uc3QgZ2FtZUJvYXJkID0gKCkgPT4gKHtcbiAgYm9hcmQ6IGNyZWF0ZUJvYXJkKCksXG4gIGZpbmRTcXVhcmUoY29sLCByb3cpIHtcbiAgICBjb25zdCBzcXVhcmUgPSB0aGlzLmJvYXJkW3JvdyAtIDFdLnJvdy5maWx0ZXIoKG9iaikgPT4ge1xuICAgICAgcmV0dXJuIG9iai5wb3NpdGlvbiA9PT0gYCR7Y29sfSR7cm93fWA7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNxdWFyZTtcbiAgfSxcbiAgY2hlY2tQb3NpdGlvbihjb2wsIHJvdykge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuZmluZFNxdWFyZShjb2wsIHJvdyk7XG4gICAgY29uc3QgcG9zaXRpb24gPSBzcXVhcmVbMF0ucG9zaXRpb247XG4gICAgY29uc3QgaGFzU2hpcCA9IHNxdWFyZVswXS5oYXNTaGlwO1xuICAgIE9iamVjdC5hc3NpZ24ocmVzdWx0LCB7IHBvc2l0aW9uLCBoYXNTaGlwIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG4gIHNoaXBzOiBbXSxcbiAgcGxhY2VTaGlwKHN0YXJ0Q29sLCBlbmRDb2wsIHN0YXJ0Um93LCBlbmRSb3csIG5hbWUpIHtcbiAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICBsZXQgb2NjdXBpZWRTcXVhcmVzID0gW107XG4gICAgaWYgKHN0YXJ0Um93ICE9PSBlbmRSb3cpIHtcbiAgICAgIGZvciAobGV0IGkgPSBzdGFydFJvdzsgaSA8IGVuZFJvdyArIDE7IGkrKykge1xuICAgICAgICBjb25zdCBzcXVhcmUgPSB0aGlzLmZpbmRTcXVhcmUoc3RhcnRDb2wsIGkpO1xuICAgICAgICBzcXVhcmVbMF0uaGFzU2hpcCA9IHRydWU7XG4gICAgICAgIGxlbmd0aCArPSAxO1xuICAgICAgICBvY2N1cGllZFNxdWFyZXMucHVzaChgJHtzdGFydENvbH0ke2l9YCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBjdXJyZW50Q29sID0gc3RhcnRDb2w7XG4gICAgICB3aGlsZSAoY3VycmVudENvbCAhPT0gU3RyaW5nLmZyb21DaGFyQ29kZShlbmRDb2wuY2hhckNvZGVBdCgwKSArIDEpKSB7XG4gICAgICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuZmluZFNxdWFyZShjdXJyZW50Q29sLCBzdGFydFJvdyk7XG4gICAgICAgIHNxdWFyZVswXS5oYXNTaGlwID0gdHJ1ZTtcbiAgICAgICAgb2NjdXBpZWRTcXVhcmVzLnB1c2goYCR7Y3VycmVudENvbH0ke3N0YXJ0Um93fWApO1xuICAgICAgICBjdXJyZW50Q29sID0gU3RyaW5nLmZyb21DaGFyQ29kZShjdXJyZW50Q29sLmNoYXJDb2RlQXQoMCkgKyAxKTtcbiAgICAgICAgbGVuZ3RoICs9IDE7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2hpcHMucHVzaCh7XG4gICAgICBzcXVhcmVzOiBvY2N1cGllZFNxdWFyZXMsXG4gICAgICBuYW1lLFxuICAgICAgb2JqOiBzaGlwKGxlbmd0aCksXG4gICAgfSk7XG4gIH0sXG4gIGF0dGFja3M6IFtdLFxuICB0cmFja0F0dGFjayhwb3NpdGlvbiwgYXR0YWNrSGl0LCBzYW5rU2hpcCkge1xuICAgIHRoaXMuYXR0YWNrcy5wdXNoKHsgcG9zaXRpb24sIGF0dGFja0hpdCwgc2Fua1NoaXAgfSk7XG4gIH0sXG4gIGFsbFNoaXBzU3VuaygpIHtcbiAgICBpZiAodGhpcy5zaGlwcy5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcbiAgICBsZXQgc2hpcHNTdW5rID0gMDtcbiAgICB0aGlzLmF0dGFja3MuZm9yRWFjaCgoYXR0YWNrKSA9PiB7XG4gICAgICBpZiAoYXR0YWNrLnNhbmtTaGlwKSBzaGlwc1N1bmsgKz0gMTtcbiAgICB9KTtcbiAgICBpZiAoc2hpcHNTdW5rID49IHRoaXMuc2hpcHMubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG4gIGlzUmVwZWF0ZWRBdHRhY2soY29sLCByb3cpIHtcbiAgICBsZXQgcmVwZWF0ID0gZmFsc2U7XG4gICAgdGhpcy5hdHRhY2tzLmZvckVhY2goKGF0dGFjaykgPT4ge1xuICAgICAgaWYgKGF0dGFjay5wb3NpdGlvbiA9PT0gYCR7Y29sfSR7cm93fWApIHtcbiAgICAgICAgcmVwZWF0ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXBlYXQ7XG4gIH0sXG4gIHJlY2VpdmVBdHRhY2soY29sLCByb3cpIHtcbiAgICBpZiAodGhpcy5pc1JlcGVhdGVkQXR0YWNrKGNvbCwgcm93KSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBsZXQgYXR0YWNrZWRTaGlwID0gZmFsc2U7XG4gICAgdGhpcy5zaGlwcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpdGVtLnNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgICAgIGlmIChzcXVhcmUgPT09IGAke2NvbH0ke3Jvd31gKSBhdHRhY2tlZFNoaXAgPSBpdGVtO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKGF0dGFja2VkU2hpcCkge1xuICAgICAgYXR0YWNrZWRTaGlwLm9iai5oaXQoKTtcbiAgICAgIHRoaXMudHJhY2tBdHRhY2soYCR7Y29sfSR7cm93fWAsIHRydWUsIGF0dGFja2VkU2hpcC5vYmouaXNTdW5rKCkpO1xuICAgICAgcmV0dXJuIGF0dGFja2VkU2hpcC5uYW1lO1xuICAgIH1cbiAgICB0aGlzLnRyYWNrQXR0YWNrKGAke2NvbH0ke3Jvd31gLCBmYWxzZSwgZmFsc2UpO1xuICAgIHJldHVybiBgJHtjb2x9JHtyb3d9YDtcbiAgfSxcbn0pO1xuXG5leHBvcnQgeyBzaGlwLCBnYW1lQm9hcmQgfTtcbiIsImltcG9ydCB7IGRpc3BsYXlHYW1lLCBkaXNwbGF5R2FtZU92ZXIsIGRpc3BsYXlTZXR1cCB9IGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCB7IGdhbWVCb2FyZCB9IGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCB7IGNob29zZVNxdWFyZSwgcmFuZG9tU2hpcEFycmF5IH0gZnJvbSBcIi4vY29tcHV0ZXJcIjtcbmltcG9ydCB7IHNldEFjdGl2ZVNoaXBMZW5ndGggfSBmcm9tIFwiLi9wbGFjZW1lbnRcIjtcblxuY29uc3QgcGxheWVyQm9hcmQgPSBnYW1lQm9hcmQoKTtcbmNvbnN0IGNvbXB1dGVyQm9hcmQgPSBnYW1lQm9hcmQoKTtcbmxldCBnYW1lQWN0aXZlID0gdHJ1ZTtcblxuZnVuY3Rpb24gY3JlYXRlQm9hcmRGcm9tQXJyYXkoc2hpcHMsIGJvYXJkLCBib2FyZFR5cGUpIHtcbiAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIGxldCBmaXJzdCA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbmFtZSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbGFzdCA9IHVuZGVmaW5lZDtcbiAgICBzaGlwLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBuYW1lID0gc3F1YXJlLm5hbWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkKSBmaXJzdCA9IHsgY29sOiBzcXVhcmUuY29sLCByb3c6IHNxdWFyZS5yb3cgfTtcbiAgICAgIGxhc3QgPSB7IGNvbDogc3F1YXJlLmNvbCwgcm93OiBzcXVhcmUucm93IH07XG4gICAgICAvLyBEaXNwbGF5IFdoZXJlIFNoaXBzIEFyZVxuICAgICAgaWYgKGJvYXJkVHlwZSA9PT0gXCJwbGF5ZXJcIikge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnRcbiAgICAgICAgICAucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItYm9hcmRcIilcbiAgICAgICAgICAucXVlcnlTZWxlY3RvcihgLiR7c3F1YXJlLmNvbH0ke3NxdWFyZS5yb3d9YCk7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgYm9hcmQucGxhY2VTaGlwKGZpcnN0LmNvbCwgbGFzdC5jb2wsIGZpcnN0LnJvdywgbGFzdC5yb3csIG5hbWUpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdChwbGF5ZXJTaGlwcywgY29tcHV0ZXJTaGlwcykge1xuICBjcmVhdGVCb2FyZEZyb21BcnJheShyYW5kb21TaGlwQXJyYXkoKSwgcGxheWVyQm9hcmQsIFwicGxheWVyXCIpO1xuICBjcmVhdGVCb2FyZEZyb21BcnJheShyYW5kb21TaGlwQXJyYXkoKSwgY29tcHV0ZXJCb2FyZCwgXCJjb21wdXRlclwiKTtcbn1cblxuZnVuY3Rpb24gbWFya1NxdWFyZShib2FyZCwgY29sLCByb3csIGJvYXJkVHlwZSkge1xuICBib2FyZC5yZWNlaXZlQXR0YWNrKGNvbCwgcm93KTtcbiAgaWYgKGJvYXJkLmF0dGFja3NbYm9hcmQuYXR0YWNrcy5sZW5ndGggLSAxXS5hdHRhY2tIaXQpIHtcbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC4ke2JvYXJkVHlwZX0tYm9hcmRgKVxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC4ke2NvbH0ke3Jvd31gKVxuICAgICAgLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHtib2FyZFR5cGV9LWJvYXJkYClcbiAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHtjb2x9JHtyb3d9YClcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwibWlzc2VkXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVuZEdhbWUodGV4dCkge1xuICBnYW1lQWN0aXZlID0gZmFsc2U7XG4gIGRpc3BsYXlHYW1lT3Zlcih0ZXh0KTtcbn1cblxuLy8gQWR2YW5jZXMgR2FtZVxuZnVuY3Rpb24gaGFuZGxlU3F1YXJlQ2xpY2soY29sLCByb3cpIHtcbiAgaWYgKCFnYW1lQWN0aXZlIHx8IGNvbXB1dGVyQm9hcmQuaXNSZXBlYXRlZEF0dGFjayhjb2wsIHJvdykpIHJldHVybjtcblxuICBtYXJrU3F1YXJlKGNvbXB1dGVyQm9hcmQsIGNvbCwgcm93LCBcImNvbXB1dGVyXCIpO1xuICBpZiAoY29tcHV0ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgIGVuZEdhbWUoXCJZb3UgV2luIVwiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBjb21wdXRlckNob2ljZSA9IGNob29zZVNxdWFyZShwbGF5ZXJCb2FyZCk7XG4gIG1hcmtTcXVhcmUocGxheWVyQm9hcmQsIGNvbXB1dGVyQ2hvaWNlLmNvbCwgY29tcHV0ZXJDaG9pY2Uucm93LCBcInBsYXllclwiKTtcbiAgaWYgKHBsYXllckJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgZW5kR2FtZShcIlRoZSBDb21wdXRlciBXb25cIik7XG4gICAgcmV0dXJuO1xuICB9XG59XG5cbi8vIGRpc3BsYXlHYW1lKCk7XG4vLyBpbml0KCk7XG5kaXNwbGF5U2V0dXAoKTtcblxuY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNoaXBcIik7XG5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAvLyBUb2dnbGUgT2ZmXG4gICAgaWYgKHNoaXAuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2VsZWN0ZWRcIikpIHtcbiAgICAgIHNoaXAuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpO1xuICAgICAgc2V0QWN0aXZlU2hpcExlbmd0aCgwKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gRGVzZWxlY3QgT3RoZXIgU2hpcHNcbiAgICBzaGlwcy5mb3JFYWNoKChhU2hpcCkgPT4gYVNoaXAuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpKTtcbiAgICAvLyBTZWxlY3QgU2hpcFxuICAgIHNoaXAuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xuICAgIHNldEFjdGl2ZVNoaXBMZW5ndGgoc2hpcC5jaGlsZHJlbi5sZW5ndGgpO1xuICB9KTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVTcXVhcmVDbGljaztcbiIsImxldCBhY3RpdmVTaGlwTGVuZ3RoID0gMDtcbmxldCBkaXJlY3Rpb24gPSBcImNvbFNwYW5cIjtcbmxldCBwbGFjZW1lbnRWYWxpZCA9IGZhbHNlO1xuXG5mdW5jdGlvbiBzZXRBY3RpdmVTaGlwTGVuZ3RoKGxlbmd0aCkge1xuICBhY3RpdmVTaGlwTGVuZ3RoID0gbGVuZ3RoO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVEaXJlY3Rpb24oKSB7XG4gIGRpcmVjdGlvbiA9PT0gXCJyb3dTcGFuXCIgPyAoZGlyZWN0aW9uID0gXCJjb2xTcGFuXCIpIDogKGRpcmVjdGlvbiA9IFwicm93U3BhblwiKTtcbn1cblxuZnVuY3Rpb24gY2xlYXJIb3ZlcmVkKCkge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmhvdmVyZWRcIikuZm9yRWFjaCgoaG92ZXJlZCkgPT4ge1xuICAgIGhvdmVyZWQuY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyZWRcIik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5SG92ZXIoY29sLCByb3cpIHtcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0ZWRcIikgPT09IG51bGwpIHJldHVybjtcbiAgbGV0IGN1cnJlbnRDb2wgPSBjb2w7XG4gIGxldCBjdXJyZW50Um93ID0gcm93O1xuICBsZXQgaXRlcmF0aW9uc0xlZnQgPSBhY3RpdmVTaGlwTGVuZ3RoO1xuICBjb25zb2xlLmxvZyhpdGVyYXRpb25zTGVmdCk7XG5cbiAgY2xlYXJIb3ZlcmVkKCk7XG5cbiAgd2hpbGUgKGl0ZXJhdGlvbnNMZWZ0ID4gMCkge1xuICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2N1cnJlbnRDb2x9JHtjdXJyZW50Um93fWApO1xuICAgIGlmIChzcXVhcmUgPT09IG51bGwpIHtcbiAgICAgIHBsYWNlbWVudFZhbGlkID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKHNxdWFyZS5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwXCIpKSB7XG4gICAgICBwbGFjZW1lbnRWYWxpZCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJob3ZlcmVkXCIpO1xuICAgIGlmIChkaXJlY3Rpb24gPT09IFwicm93U3BhblwiKSBjdXJyZW50Um93ICs9IDE7XG4gICAgZWxzZSBjdXJyZW50Q29sID0gU3RyaW5nLmZyb21DaGFyQ29kZShjdXJyZW50Q29sLmNoYXJDb2RlQXQoMCkgKyAxKTtcblxuICAgIGl0ZXJhdGlvbnNMZWZ0IC09IDE7XG4gIH1cblxuICBpZiAoaXRlcmF0aW9uc0xlZnQgPT09IDApIHBsYWNlbWVudFZhbGlkID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcGxhY2VTaGlwKGNvbCwgcm93KSB7XG4gIGlmICghcGxhY2VtZW50VmFsaWQpIHJldHVybjtcbiAgbGV0IGN1cnJlbnRDb2wgPSBjb2w7XG4gIGxldCBjdXJyZW50Um93ID0gcm93O1xuICBsZXQgaXRlcmF0aW9uc0xlZnQgPSBhY3RpdmVTaGlwTGVuZ3RoO1xuICB3aGlsZSAoaXRlcmF0aW9uc0xlZnQgPiAwKSB7XG4gICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7Y3VycmVudENvbH0ke2N1cnJlbnRSb3d9YCk7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgIGlmIChkaXJlY3Rpb24gPT09IFwicm93U3BhblwiKSBjdXJyZW50Um93ICs9IDE7XG4gICAgZWxzZSBjdXJyZW50Q29sID0gU3RyaW5nLmZyb21DaGFyQ29kZShjdXJyZW50Q29sLmNoYXJDb2RlQXQoMCkgKyAxKTtcbiAgICBpdGVyYXRpb25zTGVmdCAtPSAxO1xuICB9XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0ZWRcIikucmVtb3ZlKCk7XG4gIGNsZWFySG92ZXJlZCgpO1xufVxuXG5leHBvcnQgeyBzZXRBY3RpdmVTaGlwTGVuZ3RoLCB0b2dnbGVEaXJlY3Rpb24sIGRpc3BsYXlIb3ZlciwgcGxhY2VTaGlwIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbImdldFBvc3NpYmxlQ2hvaWNlcyIsImJvYXJkIiwicG9zc2libGVTcXVhcmVzIiwiaSIsImoiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJjaGFyQ29kZUF0IiwiaXNSZXBlYXRlZEF0dGFjayIsInB1c2giLCJyb3ciLCJjb2wiLCJjaG9vc2VTcXVhcmUiLCJzcXVhcmVzIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibGVuZ3RoIiwicmFuZG9tU2hpcEFycmF5Iiwic2hpcExlbmd0aHMiLCJzaGlwTmFtZXMiLCJzaGlwcyIsIl9sb29wIiwidmFsaWRQbGFjZW1lbnQiLCJkaXJlY3Rpb24iLCJzdGFydFJvdyIsImNlaWwiLCJzdGFydENvbCIsImN1cnJlbnRTaGlwIiwibmFtZSIsImN1cnJlbnRDb2wiLCJjdXJyZW50Um93IiwiZm9yRWFjaCIsInNoaXAiLCJwb3AiLCJoYW5kbGVTcXVhcmVDbGljayIsImRpc3BsYXlIb3ZlciIsInBsYWNlU2hpcCIsImNvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNyZWF0ZUJvYXJkIiwiY3JlYXRlRWxlbWVudCIsIl9sb29wMiIsInNxdWFyZSIsImNsYXNzTGlzdCIsImFkZCIsImNvbmNhdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXJlbnRFbGVtZW50IiwiY29udGFpbnMiLCJhcHBlbmRDaGlsZCIsInJlc2V0IiwidGV4dENvbnRlbnQiLCJjcmVhdGVIZWFkZXIiLCJoZWFkZXIiLCJjcmVhdGVGb290ZXIiLCJmb290ZXIiLCJjcmVhdGVUaXRsZSIsInRleHQiLCJ0aXRsZSIsImRpc3BsYXlHYW1lIiwic2VjdGlvbiIsImNvbXB1dGVyVGl0bGUiLCJwbGF5ZXJUaXRsZSIsImNvbXB1dGVyQm9hcmQiLCJwbGF5ZXJCb2FyZCIsImRpc3BsYXlHYW1lT3ZlciIsInBvcFVwIiwiZ2FtZU92ZXJUZXh0IiwicmVwbGF5QnV0dG9uIiwib3ZlcmxheSIsImNyZWF0ZVNoaXAiLCJzcXVhcmVBbW91bnQiLCJjbGFzc05hbWUiLCJkaXNwbGF5U2V0dXAiLCJzaGlwc0NvbnRhaW5lciIsImFpcmNyYWZ0Q2FycmllciIsImJhdHRsZXNoaXAiLCJzdWJtYXJpbmUiLCJkZXN0cm95ZXIiLCJwYXRyb2xCb2F0IiwibGVuIiwiaGl0cyIsImhpdCIsImlzU3VuayIsImNvbHVtbiIsIk9iamVjdCIsImFzc2lnbiIsInBvc2l0aW9uIiwiaGFzU2hpcCIsImdhbWVCb2FyZCIsImZpbmRTcXVhcmUiLCJmaWx0ZXIiLCJvYmoiLCJjaGVja1Bvc2l0aW9uIiwicmVzdWx0IiwiZW5kQ29sIiwiZW5kUm93Iiwib2NjdXBpZWRTcXVhcmVzIiwiYXR0YWNrcyIsInRyYWNrQXR0YWNrIiwiYXR0YWNrSGl0Iiwic2Fua1NoaXAiLCJhbGxTaGlwc1N1bmsiLCJzaGlwc1N1bmsiLCJhdHRhY2siLCJyZXBlYXQiLCJyZWNlaXZlQXR0YWNrIiwidW5kZWZpbmVkIiwiYXR0YWNrZWRTaGlwIiwiaXRlbSIsInNldEFjdGl2ZVNoaXBMZW5ndGgiLCJnYW1lQWN0aXZlIiwiY3JlYXRlQm9hcmRGcm9tQXJyYXkiLCJib2FyZFR5cGUiLCJmaXJzdCIsImxhc3QiLCJlbGVtZW50IiwiaW5pdCIsInBsYXllclNoaXBzIiwiY29tcHV0ZXJTaGlwcyIsIm1hcmtTcXVhcmUiLCJlbmRHYW1lIiwiY29tcHV0ZXJDaG9pY2UiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVtb3ZlIiwiYVNoaXAiLCJjaGlsZHJlbiIsImFjdGl2ZVNoaXBMZW5ndGgiLCJwbGFjZW1lbnRWYWxpZCIsInRvZ2dsZURpcmVjdGlvbiIsImNsZWFySG92ZXJlZCIsImhvdmVyZWQiLCJpdGVyYXRpb25zTGVmdCIsImNvbnNvbGUiLCJsb2ciXSwic291cmNlUm9vdCI6IiJ9
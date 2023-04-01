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
  computerTitle.style.width = "50%";
  var playerTitle = createTitle("Your Board");
  playerTitle.style.width = "50%";
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
  title.style.width = "100%";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0Esa0JBQWtCQSxDQUFDQyxLQUFLLEVBQUU7RUFDakMsSUFBTUMsZUFBZSxHQUFHLEVBQUU7RUFDMUIsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsRUFBRSxFQUFFQSxDQUFDLEVBQUUsRUFBRTtJQUMzQixLQUFLLElBQUlDLENBQUMsR0FBRyxHQUFHLEVBQUVBLENBQUMsS0FBSyxHQUFHLEVBQUVBLENBQUMsR0FBR0MsTUFBTSxDQUFDQyxZQUFZLENBQUNGLENBQUMsQ0FBQ0csVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO01BQ3pFLElBQUksQ0FBQ04sS0FBSyxDQUFDTyxnQkFBZ0IsQ0FBQ0osQ0FBQyxFQUFFRCxDQUFDLENBQUMsRUFDL0JELGVBQWUsQ0FBQ08sSUFBSSxDQUFDO1FBQUVDLEdBQUcsRUFBRVAsQ0FBQztRQUFFUSxHQUFHLEVBQUVQO01BQUUsQ0FBQyxDQUFDO0lBQzVDO0VBQ0Y7RUFDQSxPQUFPRixlQUFlO0FBQ3hCO0FBRUEsU0FBU1UsWUFBWUEsQ0FBQ1gsS0FBSyxFQUFFO0VBQzNCLElBQU1ZLE9BQU8sR0FBR2Isa0JBQWtCLENBQUNDLEtBQUssQ0FBQztFQUN6QyxPQUFPWSxPQUFPLENBQUNDLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sRUFBRSxHQUFHSCxPQUFPLENBQUNJLE1BQU0sQ0FBQyxDQUFDO0FBQzVEO0FBRUEsU0FBU0MsZUFBZUEsQ0FBQSxFQUFHO0VBQ3pCLElBQU1DLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbkMsSUFBTUMsU0FBUyxHQUFHLENBQ2hCLGFBQWEsRUFDYixXQUFXLEVBQ1gsV0FBVyxFQUNYLFlBQVksRUFDWixrQkFBa0IsQ0FDbkI7RUFDRCxJQUFNQyxLQUFLLEdBQUcsRUFBRTtFQUFDLElBQUFDLEtBQUEsWUFBQUEsTUFBQSxFQUNjO0lBQzdCLElBQUlDLGNBQWMsR0FBRyxJQUFJO0lBQ3pCLElBQU1DLFNBQVMsR0FBR1YsSUFBSSxDQUFDRSxNQUFNLEVBQUUsR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLFNBQVM7SUFFN0QsSUFBTVMsUUFBUSxHQUFHWCxJQUFJLENBQUNZLElBQUksQ0FBQ1osSUFBSSxDQUFDRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDOUMsSUFBTVcsUUFBUSxHQUFHdEIsTUFBTSxDQUFDQyxZQUFZLENBQUMsRUFBRSxHQUFHUSxJQUFJLENBQUNZLElBQUksQ0FBQ1osSUFBSSxDQUFDRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUV4RSxJQUFNWSxXQUFXLEdBQUcsQ0FBQztNQUFFQyxJQUFJLEVBQUVULFNBQVMsQ0FBQ0EsU0FBUyxDQUFDSCxNQUFNLEdBQUcsQ0FBQztJQUFFLENBQUMsQ0FBQztJQUUvRCxJQUFJYSxVQUFVLEdBQUdILFFBQVE7SUFDekIsSUFBSUksVUFBVSxHQUFHTixRQUFRO0lBRXpCLEtBQUssSUFBSXRCLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR2dCLFdBQVcsQ0FBQ0EsV0FBVyxDQUFDRixNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUVkLENBQUMsRUFBRSxFQUFFO01BQzVEO01BQ0EsSUFBSTRCLFVBQVUsS0FBSyxFQUFFLEVBQUU7UUFDckJSLGNBQWMsR0FBRyxLQUFLO1FBQ3RCO01BQ0Y7TUFDQSxJQUFJTyxVQUFVLEtBQUssR0FBRyxFQUFFO1FBQ3RCUCxjQUFjLEdBQUcsS0FBSztRQUN0QjtNQUNGOztNQUVBO01BQ0FGLEtBQUssQ0FBQ1csT0FBTyxDQUFDLFVBQUNDLElBQUksRUFBSztRQUN0QixLQUFLLElBQUk3QixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUc2QixJQUFJLENBQUNoQixNQUFNLEVBQUViLENBQUMsRUFBRSxFQUFFO1VBQ3BDLElBQUkwQixVQUFVLEtBQUtHLElBQUksQ0FBQzdCLENBQUMsQ0FBQyxDQUFDTyxHQUFHLElBQUlvQixVQUFVLEtBQUtFLElBQUksQ0FBQzdCLENBQUMsQ0FBQyxDQUFDTSxHQUFHLEVBQUU7WUFDNURhLGNBQWMsR0FBRyxLQUFLO1lBQ3RCO1VBQ0Y7UUFDRjtNQUNGLENBQUMsQ0FBQztNQUVGLElBQUksQ0FBQ0EsY0FBYyxFQUFFO01BQ3JCSyxXQUFXLENBQUNuQixJQUFJLENBQUM7UUFBRUUsR0FBRyxFQUFFbUIsVUFBVTtRQUFFcEIsR0FBRyxFQUFFcUI7TUFBVyxDQUFDLENBQUM7TUFDdEQ7TUFDQSxJQUFJUCxTQUFTLEtBQUssU0FBUyxFQUFFTyxVQUFVLElBQUksQ0FBQyxDQUFDLEtBQ3hDRCxVQUFVLEdBQUd6QixNQUFNLENBQUNDLFlBQVksQ0FBQ3dCLFVBQVUsQ0FBQ3ZCLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckU7SUFFQSxJQUFJZ0IsY0FBYyxFQUFFO01BQ2xCRixLQUFLLENBQUNaLElBQUksQ0FBQ21CLFdBQVcsQ0FBQztNQUN2QlQsV0FBVyxDQUFDZSxHQUFHLEVBQUU7TUFDakJkLFNBQVMsQ0FBQ2MsR0FBRyxFQUFFO0lBQ2pCO0VBQ0YsQ0FBQztFQTdDRCxPQUFPZixXQUFXLENBQUNGLE1BQU0sR0FBRyxDQUFDO0lBQUFLLEtBQUE7RUFBQTtFQThDN0IsT0FBT0QsS0FBSztBQUNkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekVrRTtBQU03QztBQUVyQixJQUFNb0IsU0FBUyxHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztBQUU1RCxTQUFTQyxXQUFXQSxDQUFBLEVBQUc7RUFDckIsSUFBTTNDLEtBQUssR0FBR3lDLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLEtBQUssQ0FBQztFQUFDLElBQUF2QixLQUFBLFlBQUFBLE1BQUFuQixDQUFBLEVBQ1o7SUFBQSxJQUFBMkMsTUFBQSxZQUFBQSxPQUFBMUMsQ0FBQSxFQUM2QztNQUN6RSxJQUFNMkMsTUFBTSxHQUFHTCxRQUFRLENBQUNHLGFBQWEsQ0FBQyxRQUFRLENBQUM7TUFDL0NFLE1BQU0sQ0FBQ0MsU0FBUyxDQUFDQyxHQUFHLENBQUMsUUFBUSxDQUFDO01BQzlCRixNQUFNLENBQUNDLFNBQVMsQ0FBQ0MsR0FBRyxJQUFBQyxNQUFBLENBQUk5QyxDQUFDLEVBQUE4QyxNQUFBLENBQUcvQyxDQUFDLEVBQUc7TUFDaEM0QyxNQUFNLENBQUNJLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO1FBQ3JDLElBQUlKLE1BQU0sQ0FBQ0ssYUFBYSxDQUFDSixTQUFTLENBQUNLLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRTtRQUM3RCxJQUFJTixNQUFNLENBQUNLLGFBQWEsQ0FBQ0osU0FBUyxDQUFDSyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFDM0RsQix5REFBaUIsQ0FBQy9CLENBQUMsRUFBRUQsQ0FBQyxDQUFDO1FBQ3pCLElBQUk0QyxNQUFNLENBQUNLLGFBQWEsQ0FBQ0osU0FBUyxDQUFDSyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7VUFDMURoQix3REFBWSxDQUFDakMsQ0FBQyxFQUFFRCxDQUFDLENBQUM7VUFDbEJtQyxxREFBUyxDQUFDbEMsQ0FBQyxFQUFFRCxDQUFDLENBQUM7UUFDakI7TUFDRixDQUFDLENBQUM7TUFDRjRDLE1BQU0sQ0FBQ0ksZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFlBQU07UUFDekMsSUFBSSxDQUFDSixNQUFNLENBQUNLLGFBQWEsQ0FBQ0osU0FBUyxDQUFDSyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7UUFDN0RoQix3REFBWSxDQUFDakMsQ0FBQyxFQUFFRCxDQUFDLENBQUM7TUFDcEIsQ0FBQyxDQUFDO01BQ0ZGLEtBQUssQ0FBQytDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE9BQU8sQ0FBQztNQUM1QmhELEtBQUssQ0FBQ3FELFdBQVcsQ0FBQ1AsTUFBTSxDQUFDO0lBQzNCLENBQUM7SUFuQkQsS0FBSyxJQUFJM0MsQ0FBQyxHQUFHLEdBQUcsRUFBRUEsQ0FBQyxLQUFLLEdBQUcsRUFBRUEsQ0FBQyxHQUFHQyxNQUFNLENBQUNDLFlBQVksQ0FBQ0YsQ0FBQyxDQUFDRyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO01BQUF1QyxNQUFBLENBQUExQyxDQUFBO0lBQUE7RUFvQjNFLENBQUM7RUFyQkQsS0FBSyxJQUFJRCxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsRUFBRSxFQUFFQSxDQUFDLElBQUksQ0FBQztJQUFBbUIsS0FBQSxDQUFBbkIsQ0FBQTtFQUFBO0VBc0I5QixPQUFPRixLQUFLO0FBQ2Q7QUFFQSxTQUFTc0QsS0FBS0EsQ0FBQSxFQUFHO0VBQ2ZkLFNBQVMsQ0FBQ2UsV0FBVyxHQUFHLEVBQUU7QUFDNUI7QUFFQSxTQUFTQyxZQUFZQSxDQUFBLEVBQUc7RUFDdEIsSUFBTUMsTUFBTSxHQUFHaEIsUUFBUSxDQUFDRyxhQUFhLENBQUMsUUFBUSxDQUFDO0VBQy9DYSxNQUFNLENBQUNGLFdBQVcsR0FBRyxZQUFZO0VBQ2pDLE9BQU9FLE1BQU07QUFDZjtBQUVBLFNBQVNDLFlBQVlBLENBQUEsRUFBRztFQUN0QixJQUFNQyxNQUFNLEdBQUdsQixRQUFRLENBQUNHLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFDL0NlLE1BQU0sQ0FBQ0osV0FBVyxHQUFHLHFCQUFxQjtFQUMxQyxPQUFPSSxNQUFNO0FBQ2Y7QUFFQSxTQUFTQyxXQUFXQSxDQUFDQyxJQUFJLEVBQUU7RUFDekIsSUFBTUMsS0FBSyxHQUFHckIsUUFBUSxDQUFDRyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQzNDa0IsS0FBSyxDQUFDZixTQUFTLENBQUNDLEdBQUcsQ0FBQyxPQUFPLENBQUM7RUFDNUJjLEtBQUssQ0FBQ1AsV0FBVyxHQUFHTSxJQUFJO0VBQ3hCLE9BQU9DLEtBQUs7QUFDZDtBQUVBLFNBQVNDLFdBQVdBLENBQUEsRUFBRztFQUNyQlQsS0FBSyxFQUFFO0VBRVAsSUFBTUcsTUFBTSxHQUFHRCxZQUFZLEVBQUU7RUFDN0IsSUFBTUcsTUFBTSxHQUFHRCxZQUFZLEVBQUU7RUFDN0IsSUFBTU0sT0FBTyxHQUFHdkIsUUFBUSxDQUFDRyxhQUFhLENBQUMsU0FBUyxDQUFDO0VBQ2pELElBQU1xQixhQUFhLEdBQUdMLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQztFQUNyREssYUFBYSxDQUFDQyxLQUFLLENBQUNDLEtBQUssR0FBRyxLQUFLO0VBQ2pDLElBQU1DLFdBQVcsR0FBR1IsV0FBVyxDQUFDLFlBQVksQ0FBQztFQUM3Q1EsV0FBVyxDQUFDRixLQUFLLENBQUNDLEtBQUssR0FBRyxLQUFLO0VBQy9CLElBQU1FLGFBQWEsR0FBRzFCLFdBQVcsRUFBRTtFQUNuQzBCLGFBQWEsQ0FBQ3RCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGdCQUFnQixDQUFDO0VBQzdDLElBQU1zQixXQUFXLEdBQUczQixXQUFXLEVBQUU7RUFDakMyQixXQUFXLENBQUN2QixTQUFTLENBQUNDLEdBQUcsQ0FBQyxjQUFjLENBQUM7RUFFekNnQixPQUFPLENBQUNYLFdBQVcsQ0FBQ1ksYUFBYSxDQUFDO0VBQ2xDRCxPQUFPLENBQUNYLFdBQVcsQ0FBQ2dCLGFBQWEsRUFBRSxJQUFJLENBQUM7RUFDeENMLE9BQU8sQ0FBQ1gsV0FBVyxDQUFDZSxXQUFXLENBQUM7RUFDaENKLE9BQU8sQ0FBQ1gsV0FBVyxDQUFDaUIsV0FBVyxDQUFDO0VBRWhDOUIsU0FBUyxDQUFDYSxXQUFXLENBQUNJLE1BQU0sQ0FBQztFQUM3QmpCLFNBQVMsQ0FBQ2EsV0FBVyxDQUFDVyxPQUFPLENBQUM7RUFDOUJ4QixTQUFTLENBQUNhLFdBQVcsQ0FBQ00sTUFBTSxDQUFDO0FBQy9CO0FBRUEsU0FBU1ksZUFBZUEsQ0FBQ1YsSUFBSSxFQUFFO0VBQzdCLElBQU1XLEtBQUssR0FBRy9CLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLEtBQUssQ0FBQztFQUMzQzRCLEtBQUssQ0FBQ3pCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFFBQVEsQ0FBQztFQUU3QixJQUFNeUIsWUFBWSxHQUFHaEMsUUFBUSxDQUFDRyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQ2xENkIsWUFBWSxDQUFDMUIsU0FBUyxDQUFDQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7RUFDNUN5QixZQUFZLENBQUNsQixXQUFXLEdBQUdNLElBQUk7RUFFL0IsSUFBTWEsWUFBWSxHQUFHakMsUUFBUSxDQUFDRyxhQUFhLENBQUMsUUFBUSxDQUFDO0VBQ3JEOEIsWUFBWSxDQUFDbkIsV0FBVyxHQUFHLFFBQVE7RUFDbkNtQixZQUFZLENBQUMzQixTQUFTLENBQUNDLEdBQUcsQ0FBQyxlQUFlLENBQUM7RUFDM0MwQixZQUFZLENBQUN4QixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtJQUMzQ3lCLFlBQVksRUFBRTtJQUNkcEMsMERBQWMsRUFBRTtFQUNsQixDQUFDLENBQUM7RUFFRixJQUFNcUMsT0FBTyxHQUFHbkMsUUFBUSxDQUFDRyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQzdDZ0MsT0FBTyxDQUFDN0IsU0FBUyxDQUFDQyxHQUFHLENBQUMsU0FBUyxDQUFDO0VBRWhDd0IsS0FBSyxDQUFDbkIsV0FBVyxDQUFDb0IsWUFBWSxDQUFDO0VBQy9CRCxLQUFLLENBQUNuQixXQUFXLENBQUNxQixZQUFZLENBQUM7RUFFL0JsQyxTQUFTLENBQUNhLFdBQVcsQ0FBQ3VCLE9BQU8sQ0FBQztFQUM5QnBDLFNBQVMsQ0FBQ2EsV0FBVyxDQUFDbUIsS0FBSyxDQUFDO0FBQzlCO0FBRUEsU0FBU0ssVUFBVUEsQ0FBQ0MsWUFBWSxFQUFFQyxTQUFTLEVBQUU7RUFDM0MsSUFBTS9DLElBQUksR0FBR1MsUUFBUSxDQUFDRyxhQUFhLENBQUMsUUFBUSxDQUFDO0VBQzdDWixJQUFJLENBQUNlLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDK0IsU0FBUyxDQUFDO0VBQzdCL0MsSUFBSSxDQUFDZSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxlQUFlLENBQUM7RUFDbkMsS0FBSyxJQUFJOUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHNEUsWUFBWSxFQUFFNUUsQ0FBQyxFQUFFLEVBQUU7SUFDckMsSUFBTTRDLE1BQU0sR0FBR0wsUUFBUSxDQUFDRyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQzVDWixJQUFJLENBQUNxQixXQUFXLENBQUNQLE1BQU0sQ0FBQztFQUMxQjtFQUNBLE9BQU9kLElBQUk7QUFDYjtBQUVBLFNBQVMyQyxZQUFZQSxDQUFBLEVBQUc7RUFDdEJyQixLQUFLLEVBQUU7RUFFUCxJQUFNRyxNQUFNLEdBQUdELFlBQVksRUFBRTtFQUM3QixJQUFNRyxNQUFNLEdBQUdELFlBQVksRUFBRTtFQUM3QixJQUFNTSxPQUFPLEdBQUd2QixRQUFRLENBQUNHLGFBQWEsQ0FBQyxTQUFTLENBQUM7RUFDakQsSUFBTWtCLEtBQUssR0FBR0YsV0FBVyxDQUFDLG1CQUFtQixDQUFDO0VBQzlDRSxLQUFLLENBQUNJLEtBQUssQ0FBQ0MsS0FBSyxHQUFHLE1BQU07RUFDMUIsSUFBTW5FLEtBQUssR0FBRzJDLFdBQVcsRUFBRTtFQUMzQjNDLEtBQUssQ0FBQytDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGFBQWEsQ0FBQztFQUVsQyxJQUFNZ0MsT0FBTyxHQUFHdkMsUUFBUSxDQUFDRyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQzdDb0MsT0FBTyxDQUFDakMsU0FBUyxDQUFDQyxHQUFHLENBQUMsU0FBUyxDQUFDO0VBRWhDLElBQU1pQyxZQUFZLEdBQUd4QyxRQUFRLENBQUNHLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFDckRxQyxZQUFZLENBQUMxQixXQUFXLEdBQUcsWUFBWTtFQUN2QzBCLFlBQVksQ0FBQ2xDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGVBQWUsQ0FBQztFQUMzQ2lDLFlBQVksQ0FBQy9CLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0lBQzNDWiwyREFBZSxFQUFFO0VBQ25CLENBQUMsQ0FBQztFQUVGLElBQU00QyxXQUFXLEdBQUd6QyxRQUFRLENBQUNHLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFDcERzQyxXQUFXLENBQUMzQixXQUFXLEdBQUcsT0FBTztFQUNqQzJCLFdBQVcsQ0FBQ25DLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGNBQWMsQ0FBQztFQUN6Q2tDLFdBQVcsQ0FBQ2hDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0lBQzFDVixTQUFTLENBQUNlLFdBQVcsR0FBRyxFQUFFO0lBQzFCb0IsWUFBWSxFQUFFO0lBQ2RwQywwREFBYyxFQUFFO0VBQ2xCLENBQUMsQ0FBQztFQUVGLElBQU00QyxjQUFjLEdBQUcxQyxRQUFRLENBQUNHLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDcER1QyxjQUFjLENBQUNwQyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztFQUUvQyxJQUFNb0MsZUFBZSxHQUFHUCxVQUFVLENBQUMsQ0FBQyxFQUFFLGtCQUFrQixDQUFDO0VBQ3pELElBQU1RLFVBQVUsR0FBR1IsVUFBVSxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUM7RUFDOUMsSUFBTVMsU0FBUyxHQUFHVCxVQUFVLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQztFQUM1QyxJQUFNVSxTQUFTLEdBQUdWLFVBQVUsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDO0VBQzVDLElBQU1XLFVBQVUsR0FBR1gsVUFBVSxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUM7RUFFL0NiLE9BQU8sQ0FBQ1gsV0FBVyxDQUFDUyxLQUFLLENBQUM7RUFDMUJFLE9BQU8sQ0FBQ1gsV0FBVyxDQUFDckQsS0FBSyxDQUFDO0VBRTFCZ0YsT0FBTyxDQUFDM0IsV0FBVyxDQUFDNEIsWUFBWSxDQUFDO0VBQ2pDRCxPQUFPLENBQUMzQixXQUFXLENBQUM2QixXQUFXLENBQUM7RUFFaENDLGNBQWMsQ0FBQzlCLFdBQVcsQ0FBQytCLGVBQWUsQ0FBQztFQUMzQ0QsY0FBYyxDQUFDOUIsV0FBVyxDQUFDZ0MsVUFBVSxDQUFDO0VBQ3RDRixjQUFjLENBQUM5QixXQUFXLENBQUNpQyxTQUFTLENBQUM7RUFDckNILGNBQWMsQ0FBQzlCLFdBQVcsQ0FBQ2tDLFNBQVMsQ0FBQztFQUNyQ0osY0FBYyxDQUFDOUIsV0FBVyxDQUFDbUMsVUFBVSxDQUFDO0VBRXRDaEQsU0FBUyxDQUFDYSxXQUFXLENBQUNJLE1BQU0sQ0FBQztFQUM3QmpCLFNBQVMsQ0FBQ2EsV0FBVyxDQUFDVyxPQUFPLENBQUM7RUFDOUJ4QixTQUFTLENBQUNhLFdBQVcsQ0FBQzJCLE9BQU8sQ0FBQztFQUM5QnhDLFNBQVMsQ0FBQ2EsV0FBVyxDQUFDOEIsY0FBYyxDQUFDO0VBQ3JDM0MsU0FBUyxDQUFDYSxXQUFXLENBQUNNLE1BQU0sQ0FBQztFQUM3QnhCLDREQUFvQixFQUFFO0FBQ3hCOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkxBLElBQU1ILElBQUksR0FBRyxTQUFQQSxJQUFJQSxDQUFJeUQsR0FBRztFQUFBLE9BQU07SUFDckJ6RSxNQUFNLEVBQUV5RSxHQUFHO0lBQ1hDLElBQUksRUFBRSxDQUFDO0lBQ1BDLEdBQUcsV0FBQUEsSUFBQSxFQUFHO01BQ0osSUFBSSxDQUFDRCxJQUFJLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0RFLE1BQU0sV0FBQUEsT0FBQSxFQUFHO01BQ1AsSUFBSSxJQUFJLENBQUNGLElBQUksS0FBSyxJQUFJLENBQUMxRSxNQUFNLEVBQUUsT0FBTyxJQUFJO01BQzFDLE9BQU8sS0FBSztJQUNkO0VBQ0YsQ0FBQztBQUFBLENBQUM7QUFFRixTQUFTMkIsV0FBV0EsQ0FBQSxFQUFHO0VBQ3JCLElBQU0zQyxLQUFLLEdBQUcsRUFBRTtFQUNoQixLQUFLLElBQUlFLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsRUFBRSxFQUFFO0lBQzNCLElBQU0yRixNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCQyxNQUFNLENBQUNDLE1BQU0sQ0FBQ0YsTUFBTSxFQUFFO01BQ3BCQSxNQUFNLEVBQUUzRixDQUFDO01BQ1RPLEdBQUcsRUFBRSxDQUNIO1FBQUV1RixRQUFRLE1BQUEvQyxNQUFBLENBQU0vQyxDQUFDLENBQUU7UUFBRStGLE9BQU8sRUFBRTtNQUFNLENBQUMsRUFDckM7UUFBRUQsUUFBUSxNQUFBL0MsTUFBQSxDQUFNL0MsQ0FBQyxDQUFFO1FBQUUrRixPQUFPLEVBQUU7TUFBTSxDQUFDLEVBQ3JDO1FBQUVELFFBQVEsTUFBQS9DLE1BQUEsQ0FBTS9DLENBQUMsQ0FBRTtRQUFFK0YsT0FBTyxFQUFFO01BQU0sQ0FBQyxFQUNyQztRQUFFRCxRQUFRLE1BQUEvQyxNQUFBLENBQU0vQyxDQUFDLENBQUU7UUFBRStGLE9BQU8sRUFBRTtNQUFNLENBQUMsRUFDckM7UUFBRUQsUUFBUSxNQUFBL0MsTUFBQSxDQUFNL0MsQ0FBQyxDQUFFO1FBQUUrRixPQUFPLEVBQUU7TUFBTSxDQUFDLEVBQ3JDO1FBQUVELFFBQVEsTUFBQS9DLE1BQUEsQ0FBTS9DLENBQUMsQ0FBRTtRQUFFK0YsT0FBTyxFQUFFO01BQU0sQ0FBQyxFQUNyQztRQUFFRCxRQUFRLE1BQUEvQyxNQUFBLENBQU0vQyxDQUFDLENBQUU7UUFBRStGLE9BQU8sRUFBRTtNQUFNLENBQUMsRUFDckM7UUFBRUQsUUFBUSxNQUFBL0MsTUFBQSxDQUFNL0MsQ0FBQyxDQUFFO1FBQUUrRixPQUFPLEVBQUU7TUFBTSxDQUFDLEVBQ3JDO1FBQUVELFFBQVEsTUFBQS9DLE1BQUEsQ0FBTS9DLENBQUMsQ0FBRTtRQUFFK0YsT0FBTyxFQUFFO01BQU0sQ0FBQyxFQUNyQztRQUFFRCxRQUFRLE1BQUEvQyxNQUFBLENBQU0vQyxDQUFDLENBQUU7UUFBRStGLE9BQU8sRUFBRTtNQUFNLENBQUM7SUFFekMsQ0FBQyxDQUFDO0lBQ0ZqRyxLQUFLLENBQUNRLElBQUksQ0FBQ3FGLE1BQU0sQ0FBQztFQUNwQjtFQUNBLE9BQU83RixLQUFLO0FBQ2Q7QUFFQSxJQUFNa0csU0FBUyxHQUFHLFNBQVpBLFNBQVNBLENBQUE7RUFBQSxPQUFVO0lBQ3ZCbEcsS0FBSyxFQUFFMkMsV0FBVyxFQUFFO0lBQ3BCd0QsVUFBVSxXQUFBQSxXQUFDekYsR0FBRyxFQUFFRCxHQUFHLEVBQUU7TUFDbkIsSUFBTXFDLE1BQU0sR0FBRyxJQUFJLENBQUM5QyxLQUFLLENBQUNTLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQ0EsR0FBRyxDQUFDMkYsTUFBTSxDQUFDLFVBQUNDLEdBQUcsRUFBSztRQUNyRCxPQUFPQSxHQUFHLENBQUNMLFFBQVEsUUFBQS9DLE1BQUEsQ0FBUXZDLEdBQUcsRUFBQXVDLE1BQUEsQ0FBR3hDLEdBQUcsQ0FBRTtNQUN4QyxDQUFDLENBQUM7TUFDRixPQUFPcUMsTUFBTTtJQUNmLENBQUM7SUFDRHdELGFBQWEsV0FBQUEsY0FBQzVGLEdBQUcsRUFBRUQsR0FBRyxFQUFFO01BQ3RCLElBQU04RixNQUFNLEdBQUcsQ0FBQyxDQUFDO01BQ2pCLElBQU16RCxNQUFNLEdBQUcsSUFBSSxDQUFDcUQsVUFBVSxDQUFDekYsR0FBRyxFQUFFRCxHQUFHLENBQUM7TUFDeEMsSUFBTXVGLFFBQVEsR0FBR2xELE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQ2tELFFBQVE7TUFDbkMsSUFBTUMsT0FBTyxHQUFHbkQsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDbUQsT0FBTztNQUNqQ0gsTUFBTSxDQUFDQyxNQUFNLENBQUNRLE1BQU0sRUFBRTtRQUFFUCxRQUFRLEVBQVJBLFFBQVE7UUFBRUMsT0FBTyxFQUFQQTtNQUFRLENBQUMsQ0FBQztNQUM1QyxPQUFPTSxNQUFNO0lBQ2YsQ0FBQztJQUNEbkYsS0FBSyxFQUFFLEVBQUU7SUFDVGlCLFNBQVMsV0FBQUEsVUFBQ1gsUUFBUSxFQUFFOEUsTUFBTSxFQUFFaEYsUUFBUSxFQUFFaUYsTUFBTSxFQUFFN0UsSUFBSSxFQUFFO01BQ2xELElBQUlaLE1BQU0sR0FBRyxDQUFDO01BQ2QsSUFBSTBGLGVBQWUsR0FBRyxFQUFFO01BQ3hCLElBQUlsRixRQUFRLEtBQUtpRixNQUFNLEVBQUU7UUFDdkIsS0FBSyxJQUFJdkcsQ0FBQyxHQUFHc0IsUUFBUSxFQUFFdEIsQ0FBQyxHQUFHdUcsTUFBTSxHQUFHLENBQUMsRUFBRXZHLENBQUMsRUFBRSxFQUFFO1VBQzFDLElBQU00QyxNQUFNLEdBQUcsSUFBSSxDQUFDcUQsVUFBVSxDQUFDekUsUUFBUSxFQUFFeEIsQ0FBQyxDQUFDO1VBQzNDNEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDbUQsT0FBTyxHQUFHLElBQUk7VUFDeEJqRixNQUFNLElBQUksQ0FBQztVQUNYMEYsZUFBZSxDQUFDbEcsSUFBSSxJQUFBeUMsTUFBQSxDQUFJdkIsUUFBUSxFQUFBdUIsTUFBQSxDQUFHL0MsQ0FBQyxFQUFHO1FBQ3pDO01BQ0YsQ0FBQyxNQUFNO1FBQ0wsSUFBSTJCLFVBQVUsR0FBR0gsUUFBUTtRQUN6QixPQUFPRyxVQUFVLEtBQUt6QixNQUFNLENBQUNDLFlBQVksQ0FBQ21HLE1BQU0sQ0FBQ2xHLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtVQUNuRSxJQUFNd0MsT0FBTSxHQUFHLElBQUksQ0FBQ3FELFVBQVUsQ0FBQ3RFLFVBQVUsRUFBRUwsUUFBUSxDQUFDO1VBQ3BEc0IsT0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDbUQsT0FBTyxHQUFHLElBQUk7VUFDeEJTLGVBQWUsQ0FBQ2xHLElBQUksSUFBQXlDLE1BQUEsQ0FBSXBCLFVBQVUsRUFBQW9CLE1BQUEsQ0FBR3pCLFFBQVEsRUFBRztVQUNoREssVUFBVSxHQUFHekIsTUFBTSxDQUFDQyxZQUFZLENBQUN3QixVQUFVLENBQUN2QixVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1VBQzlEVSxNQUFNLElBQUksQ0FBQztRQUNiO01BQ0Y7TUFDQSxJQUFJLENBQUNJLEtBQUssQ0FBQ1osSUFBSSxDQUFDO1FBQ2RJLE9BQU8sRUFBRThGLGVBQWU7UUFDeEI5RSxJQUFJLEVBQUpBLElBQUk7UUFDSnlFLEdBQUcsRUFBRXJFLElBQUksQ0FBQ2hCLE1BQU07TUFDbEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNEMkYsT0FBTyxFQUFFLEVBQUU7SUFDWEMsV0FBVyxXQUFBQSxZQUFDWixRQUFRLEVBQUVhLFNBQVMsRUFBRUMsUUFBUSxFQUFFO01BQ3pDLElBQUksQ0FBQ0gsT0FBTyxDQUFDbkcsSUFBSSxDQUFDO1FBQUV3RixRQUFRLEVBQVJBLFFBQVE7UUFBRWEsU0FBUyxFQUFUQSxTQUFTO1FBQUVDLFFBQVEsRUFBUkE7TUFBUyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUNEQyxZQUFZLFdBQUFBLGFBQUEsRUFBRztNQUNiLElBQUksSUFBSSxDQUFDM0YsS0FBSyxDQUFDSixNQUFNLEtBQUssQ0FBQyxFQUFFLE9BQU8sS0FBSztNQUN6QyxJQUFJZ0csU0FBUyxHQUFHLENBQUM7TUFDakIsSUFBSSxDQUFDTCxPQUFPLENBQUM1RSxPQUFPLENBQUMsVUFBQ2tGLE1BQU0sRUFBSztRQUMvQixJQUFJQSxNQUFNLENBQUNILFFBQVEsRUFBRUUsU0FBUyxJQUFJLENBQUM7TUFDckMsQ0FBQyxDQUFDO01BQ0YsSUFBSUEsU0FBUyxJQUFJLElBQUksQ0FBQzVGLEtBQUssQ0FBQ0osTUFBTSxFQUFFLE9BQU8sSUFBSTtNQUMvQyxPQUFPLEtBQUs7SUFDZCxDQUFDO0lBQ0RULGdCQUFnQixXQUFBQSxpQkFBQ0csR0FBRyxFQUFFRCxHQUFHLEVBQUU7TUFDekIsSUFBSXlHLE1BQU0sR0FBRyxLQUFLO01BQ2xCLElBQUksQ0FBQ1AsT0FBTyxDQUFDNUUsT0FBTyxDQUFDLFVBQUNrRixNQUFNLEVBQUs7UUFDL0IsSUFBSUEsTUFBTSxDQUFDakIsUUFBUSxRQUFBL0MsTUFBQSxDQUFRdkMsR0FBRyxFQUFBdUMsTUFBQSxDQUFHeEMsR0FBRyxDQUFFLEVBQUU7VUFDdEN5RyxNQUFNLEdBQUcsSUFBSTtVQUNiO1FBQ0Y7TUFDRixDQUFDLENBQUM7TUFDRixPQUFPQSxNQUFNO0lBQ2YsQ0FBQztJQUNEQyxhQUFhLFdBQUFBLGNBQUN6RyxHQUFHLEVBQUVELEdBQUcsRUFBRTtNQUN0QixJQUFJLElBQUksQ0FBQ0YsZ0JBQWdCLENBQUNHLEdBQUcsRUFBRUQsR0FBRyxDQUFDLEVBQUUsT0FBTzJHLFNBQVM7TUFDckQsSUFBSUMsWUFBWSxHQUFHLEtBQUs7TUFDeEIsSUFBSSxDQUFDakcsS0FBSyxDQUFDVyxPQUFPLENBQUMsVUFBQ3VGLElBQUksRUFBSztRQUMzQkEsSUFBSSxDQUFDMUcsT0FBTyxDQUFDbUIsT0FBTyxDQUFDLFVBQUNlLE1BQU0sRUFBSztVQUMvQixJQUFJQSxNQUFNLFFBQUFHLE1BQUEsQ0FBUXZDLEdBQUcsRUFBQXVDLE1BQUEsQ0FBR3hDLEdBQUcsQ0FBRSxFQUFFNEcsWUFBWSxHQUFHQyxJQUFJO1FBQ3BELENBQUMsQ0FBQztNQUNKLENBQUMsQ0FBQztNQUNGLElBQUlELFlBQVksRUFBRTtRQUNoQkEsWUFBWSxDQUFDaEIsR0FBRyxDQUFDVixHQUFHLEVBQUU7UUFDdEIsSUFBSSxDQUFDaUIsV0FBVyxJQUFBM0QsTUFBQSxDQUFJdkMsR0FBRyxFQUFBdUMsTUFBQSxDQUFHeEMsR0FBRyxHQUFJLElBQUksRUFBRTRHLFlBQVksQ0FBQ2hCLEdBQUcsQ0FBQ1QsTUFBTSxFQUFFLENBQUM7UUFDakUsT0FBT3lCLFlBQVksQ0FBQ3pGLElBQUk7TUFDMUI7TUFDQSxJQUFJLENBQUNnRixXQUFXLElBQUEzRCxNQUFBLENBQUl2QyxHQUFHLEVBQUF1QyxNQUFBLENBQUd4QyxHQUFHLEdBQUksS0FBSyxFQUFFLEtBQUssQ0FBQztNQUM5QyxVQUFBd0MsTUFBQSxDQUFVdkMsR0FBRyxFQUFBdUMsTUFBQSxDQUFHeEMsR0FBRztJQUNyQjtFQUNGLENBQUM7QUFBQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RIcUU7QUFDcEM7QUFDd0I7QUFDRTtBQUU3RCxJQUFJNkQsV0FBVztBQUNmLElBQUlELGFBQWE7QUFFakIsU0FBU21ELG9CQUFvQkEsQ0FBQ3BHLEtBQUssRUFBRXBCLEtBQUssRUFBRXlILFNBQVMsRUFBRTtFQUNyRHJHLEtBQUssQ0FBQ1csT0FBTyxDQUFDLFVBQUNDLElBQUksRUFBSztJQUN0QixJQUFJMEYsS0FBSyxHQUFHTixTQUFTO0lBQ3JCLElBQUl4RixJQUFJLEdBQUd3RixTQUFTO0lBQ3BCLElBQUlPLElBQUksR0FBR1AsU0FBUztJQUNwQnBGLElBQUksQ0FBQ0QsT0FBTyxDQUFDLFVBQUNlLE1BQU0sRUFBSztNQUN2QixJQUFJbEIsSUFBSSxLQUFLd0YsU0FBUyxFQUFFO1FBQ3RCeEYsSUFBSSxHQUFHa0IsTUFBTSxDQUFDbEIsSUFBSTtRQUNsQjtNQUNGO01BQ0EsSUFBSThGLEtBQUssS0FBS04sU0FBUyxFQUFFTSxLQUFLLEdBQUc7UUFBRWhILEdBQUcsRUFBRW9DLE1BQU0sQ0FBQ3BDLEdBQUc7UUFBRUQsR0FBRyxFQUFFcUMsTUFBTSxDQUFDckM7TUFBSSxDQUFDO01BQ3JFa0gsSUFBSSxHQUFHO1FBQUVqSCxHQUFHLEVBQUVvQyxNQUFNLENBQUNwQyxHQUFHO1FBQUVELEdBQUcsRUFBRXFDLE1BQU0sQ0FBQ3JDO01BQUksQ0FBQztNQUMzQztNQUNBLElBQUlnSCxTQUFTLEtBQUssUUFBUSxFQUFFO1FBQzFCLElBQU1HLE9BQU8sR0FBR25GLFFBQVEsQ0FDckJDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FDOUJBLGFBQWEsS0FBQU8sTUFBQSxDQUFLSCxNQUFNLENBQUNwQyxHQUFHLEVBQUF1QyxNQUFBLENBQUdILE1BQU0sQ0FBQ3JDLEdBQUcsRUFBRztRQUMvQ21ILE9BQU8sQ0FBQzdFLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztNQUMvQjtJQUNGLENBQUMsQ0FBQztJQUNGaEQsS0FBSyxDQUFDcUMsU0FBUyxDQUFDcUYsS0FBSyxDQUFDaEgsR0FBRyxFQUFFaUgsSUFBSSxDQUFDakgsR0FBRyxFQUFFZ0gsS0FBSyxDQUFDakgsR0FBRyxFQUFFa0gsSUFBSSxDQUFDbEgsR0FBRyxFQUFFbUIsSUFBSSxDQUFDO0VBQ2pFLENBQUMsQ0FBQztBQUNKO0FBRUEsU0FBU2lHLElBQUlBLENBQUNDLFdBQVcsRUFBRUMsYUFBYSxFQUFFO0VBQ3hDaEUscURBQVcsRUFBRTtFQUNiTyxXQUFXLEdBQUc0QixnREFBUyxFQUFFO0VBQ3pCc0Isb0JBQW9CLENBQUNNLFdBQVcsRUFBRXhELFdBQVcsRUFBRSxRQUFRLENBQUM7RUFDeERELGFBQWEsR0FBRzZCLGdEQUFTLEVBQUU7RUFDM0JzQixvQkFBb0IsQ0FBQ08sYUFBYSxFQUFFMUQsYUFBYSxFQUFFLFVBQVUsQ0FBQztBQUNoRTtBQUVBLFNBQVMyRCxVQUFVQSxDQUFDaEksS0FBSyxFQUFFVSxHQUFHLEVBQUVELEdBQUcsRUFBRWdILFNBQVMsRUFBRTtFQUM5Q3pILEtBQUssQ0FBQ21ILGFBQWEsQ0FBQ3pHLEdBQUcsRUFBRUQsR0FBRyxDQUFDO0VBQzdCLElBQUlULEtBQUssQ0FBQzJHLE9BQU8sQ0FBQzNHLEtBQUssQ0FBQzJHLE9BQU8sQ0FBQzNGLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzZGLFNBQVMsRUFBRTtJQUNyRHBFLFFBQVEsQ0FDTEMsYUFBYSxLQUFBTyxNQUFBLENBQUt3RSxTQUFTLFlBQVMsQ0FDcEMvRSxhQUFhLEtBQUFPLE1BQUEsQ0FBS3ZDLEdBQUcsRUFBQXVDLE1BQUEsQ0FBR3hDLEdBQUcsRUFBRyxDQUM5QnNDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLEtBQUssQ0FBQztFQUN6QixDQUFDLE1BQU07SUFDTFAsUUFBUSxDQUNMQyxhQUFhLEtBQUFPLE1BQUEsQ0FBS3dFLFNBQVMsWUFBUyxDQUNwQy9FLGFBQWEsS0FBQU8sTUFBQSxDQUFLdkMsR0FBRyxFQUFBdUMsTUFBQSxDQUFHeEMsR0FBRyxFQUFHLENBQzlCc0MsU0FBUyxDQUFDQyxHQUFHLENBQUMsUUFBUSxDQUFDO0VBQzVCO0FBQ0Y7O0FBRUE7QUFDQSxTQUFTZCxpQkFBaUJBLENBQUN4QixHQUFHLEVBQUVELEdBQUcsRUFBRTtFQUNuQyxJQUFJNEQsYUFBYSxDQUFDOUQsZ0JBQWdCLENBQUNHLEdBQUcsRUFBRUQsR0FBRyxDQUFDLEVBQUU7RUFFOUN1SCxVQUFVLENBQUMzRCxhQUFhLEVBQUUzRCxHQUFHLEVBQUVELEdBQUcsRUFBRSxVQUFVLENBQUM7RUFDL0MsSUFBSTRELGFBQWEsQ0FBQzBDLFlBQVksRUFBRSxFQUFFO0lBQ2hDeEMseURBQWUsQ0FBQyxTQUFTLENBQUM7SUFDMUI7RUFDRjtFQUVBLElBQU0wRCxjQUFjLEdBQUd0SCx1REFBWSxDQUFDMkQsV0FBVyxDQUFDO0VBQ2hEMEQsVUFBVSxDQUFDMUQsV0FBVyxFQUFFMkQsY0FBYyxDQUFDdkgsR0FBRyxFQUFFdUgsY0FBYyxDQUFDeEgsR0FBRyxFQUFFLFFBQVEsQ0FBQztFQUN6RSxJQUFJNkQsV0FBVyxDQUFDeUMsWUFBWSxFQUFFLEVBQUU7SUFDOUJ4Qyx5REFBZSxDQUFDLGtCQUFrQixDQUFDO0lBQ25DO0VBQ0Y7QUFDRjtBQUVBOUIsUUFBUSxDQUFDUyxnQkFBZ0IsQ0FBQyxtQkFBbUIsRUFBRSxVQUFDZ0YsQ0FBQyxFQUFLO0VBQ3BETCxJQUFJLENBQUNLLENBQUMsQ0FBQ0MsTUFBTSxDQUFDQyxXQUFXLEVBQUVuSCwwREFBZSxFQUFFLENBQUM7QUFDL0MsQ0FBQyxDQUFDO0FBRUYsU0FBU2tCLG9CQUFvQkEsQ0FBQSxFQUFHO0VBQzlCLElBQU1mLEtBQUssR0FBR3FCLFFBQVEsQ0FBQzRGLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDO0VBQ3pEakgsS0FBSyxDQUFDVyxPQUFPLENBQUMsVUFBQ0MsSUFBSSxFQUFLO0lBQ3RCQSxJQUFJLENBQUNrQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtNQUNuQztNQUNBLElBQUlsQixJQUFJLENBQUNlLFNBQVMsQ0FBQ0ssUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ3ZDcEIsSUFBSSxDQUFDZSxTQUFTLENBQUN1RixNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ2pDZix5REFBYSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDcEI7TUFDRjtNQUNBO01BQ0FuRyxLQUFLLENBQUNXLE9BQU8sQ0FBQyxVQUFDd0csS0FBSztRQUFBLE9BQUtBLEtBQUssQ0FBQ3hGLFNBQVMsQ0FBQ3VGLE1BQU0sQ0FBQyxVQUFVLENBQUM7TUFBQSxFQUFDO01BQzVEO01BQ0F0RyxJQUFJLENBQUNlLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztNQUM5QnVFLHlEQUFhLENBQUN2RixJQUFJLENBQUN3RyxRQUFRLENBQUN4SCxNQUFNLEVBQUVnQixJQUFJLENBQUNlLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDLENBQUM7RUFDSixDQUFDLENBQUM7QUFDSjtBQUVBMEYsTUFBTSxDQUFDdkYsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQUNnRixDQUFDLEVBQUs7RUFDeEMsSUFBSUEsQ0FBQyxDQUFDUSxHQUFHLEtBQUssR0FBRyxFQUFFcEcsMkRBQWUsRUFBRTtBQUN0QyxDQUFDLENBQUM7QUFDRnFDLHNEQUFZLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuR2QsSUFBSWdFLGdCQUFnQixHQUFHLENBQUM7QUFDeEIsSUFBSUMsY0FBYyxHQUFHLEVBQUU7QUFDdkIsSUFBSXJILFNBQVMsR0FBRyxTQUFTO0FBQ3pCLElBQUlzSCxjQUFjLEdBQUcsS0FBSztBQUUxQixTQUFTdEIsYUFBYUEsQ0FBQ3ZHLE1BQU0sRUFBRVksSUFBSSxFQUFFO0VBQ25DK0csZ0JBQWdCLEdBQUczSCxNQUFNO0VBQ3pCNEgsY0FBYyxHQUFHaEgsSUFBSTtBQUN2QjtBQUVBLFNBQVNrSCxZQUFZQSxDQUFBLEVBQUc7RUFDdEJyRyxRQUFRLENBQUM0RixnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQ3RHLE9BQU8sQ0FBQyxVQUFDZ0gsT0FBTyxFQUFLO0lBQ3pEQSxPQUFPLENBQUNoRyxTQUFTLENBQUN1RixNQUFNLENBQUMsU0FBUyxDQUFDO0VBQ3JDLENBQUMsQ0FBQztBQUNKO0FBRUEsSUFBSTVHLFFBQVEsR0FBRyxFQUFFO0FBQ2pCLElBQUlGLFFBQVEsR0FBRyxFQUFFO0FBRWpCLFNBQVNjLGVBQWVBLENBQUEsRUFBRztFQUN6QmYsU0FBUyxLQUFLLFNBQVMsR0FBSUEsU0FBUyxHQUFHLFNBQVMsR0FBS0EsU0FBUyxHQUFHLFNBQVU7RUFDM0VhLFlBQVksQ0FBQ1YsUUFBUSxFQUFFRixRQUFRLENBQUM7QUFDbEM7QUFFQSxTQUFTWSxZQUFZQSxDQUFDMUIsR0FBRyxFQUFFRCxHQUFHLEVBQUU7RUFDOUIsSUFBSUMsR0FBRyxLQUFLLEVBQUUsSUFBSUQsR0FBRyxLQUFLLEVBQUUsRUFBRTtFQUM5QixJQUFJZ0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsV0FBVyxDQUFDLEtBQUssSUFBSSxFQUFFO0VBQ2xEaEIsUUFBUSxHQUFHaEIsR0FBRztFQUNkLElBQUltQixVQUFVLEdBQUduQixHQUFHO0VBQ3BCYyxRQUFRLEdBQUdmLEdBQUc7RUFDZCxJQUFJcUIsVUFBVSxHQUFHckIsR0FBRztFQUNwQixJQUFJdUksY0FBYyxHQUFHTCxnQkFBZ0I7RUFFckNHLFlBQVksRUFBRTtFQUVkLE9BQU9FLGNBQWMsR0FBRyxDQUFDLEVBQUU7SUFDekIsSUFBTWxHLE1BQU0sR0FBR0wsUUFBUSxDQUFDQyxhQUFhLEtBQUFPLE1BQUEsQ0FBS3BCLFVBQVUsRUFBQW9CLE1BQUEsQ0FBR25CLFVBQVUsRUFBRztJQUNwRSxJQUFJZ0IsTUFBTSxLQUFLLElBQUksRUFBRTtNQUNuQitGLGNBQWMsR0FBRyxLQUFLO01BQ3RCO0lBQ0Y7SUFDQSxJQUFJL0YsTUFBTSxDQUFDQyxTQUFTLENBQUNLLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtNQUNyQ3lGLGNBQWMsR0FBRyxLQUFLO01BQ3RCO0lBQ0Y7SUFFQS9GLE1BQU0sQ0FBQ0MsU0FBUyxDQUFDQyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBQy9CLElBQUl6QixTQUFTLEtBQUssU0FBUyxFQUFFTyxVQUFVLElBQUksQ0FBQyxDQUFDLEtBQ3hDRCxVQUFVLEdBQUd6QixNQUFNLENBQUNDLFlBQVksQ0FBQ3dCLFVBQVUsQ0FBQ3ZCLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFbkUwSSxjQUFjLElBQUksQ0FBQztFQUNyQjtFQUVBLElBQUlBLGNBQWMsS0FBSyxDQUFDLEVBQUVILGNBQWMsR0FBRyxJQUFJO0FBQ2pEO0FBRUEsSUFBSVQsV0FBVyxHQUFHLEVBQUU7QUFDcEIsU0FBUzdGLGNBQWNBLENBQUEsRUFBRztFQUN4QjZGLFdBQVcsQ0FBQ3BILE1BQU0sR0FBRyxDQUFDO0FBQ3hCO0FBRUEsU0FBU3FCLFNBQVNBLENBQUMzQixHQUFHLEVBQUVELEdBQUcsRUFBRTtFQUMzQixJQUFJLENBQUNvSSxjQUFjLEVBQUU7RUFDckIsSUFBSUksU0FBUyxHQUFHLENBQUM7SUFBRXJILElBQUksRUFBRWdIO0VBQWUsQ0FBQyxDQUFDO0VBQzFDLElBQUkvRyxVQUFVLEdBQUduQixHQUFHO0VBQ3BCLElBQUlvQixVQUFVLEdBQUdyQixHQUFHO0VBQ3BCLElBQUl1SSxjQUFjLEdBQUdMLGdCQUFnQjtFQUNyQyxPQUFPSyxjQUFjLEdBQUcsQ0FBQyxFQUFFO0lBQ3pCQyxTQUFTLENBQUN6SSxJQUFJLENBQUM7TUFBRUUsR0FBRyxFQUFFbUIsVUFBVTtNQUFFcEIsR0FBRyxFQUFFcUI7SUFBVyxDQUFDLENBQUM7SUFDcEQsSUFBTWdCLE1BQU0sR0FBR0wsUUFBUSxDQUFDQyxhQUFhLEtBQUFPLE1BQUEsQ0FBS3BCLFVBQVUsRUFBQW9CLE1BQUEsQ0FBR25CLFVBQVUsRUFBRztJQUNwRWdCLE1BQU0sQ0FBQ0MsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQzVCLElBQUl6QixTQUFTLEtBQUssU0FBUyxFQUFFTyxVQUFVLElBQUksQ0FBQyxDQUFDLEtBQ3hDRCxVQUFVLEdBQUd6QixNQUFNLENBQUNDLFlBQVksQ0FBQ3dCLFVBQVUsQ0FBQ3ZCLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkUwSSxjQUFjLElBQUksQ0FBQztFQUNyQjtFQUNBWixXQUFXLENBQUM1SCxJQUFJLENBQUN5SSxTQUFTLENBQUM7RUFFM0JILFlBQVksRUFBRTtFQUNkckcsUUFBUSxDQUFDQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM0RixNQUFNLEVBQUU7RUFDNUNPLGNBQWMsR0FBRyxLQUFLOztFQUV0QjtFQUNBLElBQUlwRyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLElBQUksRUFBRTtJQUNyRCxJQUFNd0csS0FBSyxHQUFHLElBQUlDLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRTtNQUNqRGhCLE1BQU0sRUFBRTtRQUFFQyxXQUFXLEVBQVhBO01BQVksQ0FBQztNQUN2QmdCLE9BQU8sRUFBRSxJQUFJO01BQ2JDLFVBQVUsRUFBRSxJQUFJO01BQ2hCQyxRQUFRLEVBQUU7SUFDWixDQUFDLENBQUM7SUFDRjdHLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUM2RyxhQUFhLENBQUNMLEtBQUssQ0FBQztFQUNqRTtBQUNGOzs7Ozs7O1VDM0ZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wdXRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBnZXRQb3NzaWJsZUNob2ljZXMoYm9hcmQpIHtcbiAgY29uc3QgcG9zc2libGVTcXVhcmVzID0gW107XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgMTE7IGkrKykge1xuICAgIGZvciAobGV0IGogPSBcImFcIjsgaiAhPT0gXCJrXCI7IGogPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGouY2hhckNvZGVBdCgwKSArIDEpKSB7XG4gICAgICBpZiAoIWJvYXJkLmlzUmVwZWF0ZWRBdHRhY2soaiwgaSkpXG4gICAgICAgIHBvc3NpYmxlU3F1YXJlcy5wdXNoKHsgcm93OiBpLCBjb2w6IGogfSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBwb3NzaWJsZVNxdWFyZXM7XG59XG5cbmZ1bmN0aW9uIGNob29zZVNxdWFyZShib2FyZCkge1xuICBjb25zdCBzcXVhcmVzID0gZ2V0UG9zc2libGVDaG9pY2VzKGJvYXJkKTtcbiAgcmV0dXJuIHNxdWFyZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc3F1YXJlcy5sZW5ndGgpXTtcbn1cblxuZnVuY3Rpb24gcmFuZG9tU2hpcEFycmF5KCkge1xuICBjb25zdCBzaGlwTGVuZ3RocyA9IFsyLCAzLCAzLCA0LCA1XTtcbiAgY29uc3Qgc2hpcE5hbWVzID0gW1xuICAgIFwiUGF0cm9sIEJvYXRcIixcbiAgICBcIlN1Ym1hcmluZVwiLFxuICAgIFwiRGVzdHJveWVyXCIsXG4gICAgXCJCYXR0bGVTaGlwXCIsXG4gICAgXCJBaXJjcmFmdCBDYXJyaWVyXCIsXG4gIF07XG4gIGNvbnN0IHNoaXBzID0gW107XG4gIHdoaWxlIChzaGlwTGVuZ3Rocy5sZW5ndGggPiAwKSB7XG4gICAgbGV0IHZhbGlkUGxhY2VtZW50ID0gdHJ1ZTtcbiAgICBjb25zdCBkaXJlY3Rpb24gPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gXCJyb3dTcGFuXCIgOiBcImNvbFNwYW5cIjtcblxuICAgIGNvbnN0IHN0YXJ0Um93ID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgY29uc3Qgc3RhcnRDb2wgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDk2ICsgTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAxMCkpO1xuXG4gICAgY29uc3QgY3VycmVudFNoaXAgPSBbeyBuYW1lOiBzaGlwTmFtZXNbc2hpcE5hbWVzLmxlbmd0aCAtIDFdIH1dO1xuXG4gICAgbGV0IGN1cnJlbnRDb2wgPSBzdGFydENvbDtcbiAgICBsZXQgY3VycmVudFJvdyA9IHN0YXJ0Um93O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3Roc1tzaGlwTGVuZ3Rocy5sZW5ndGggLSAxXTsgaSsrKSB7XG4gICAgICAvLyBPdXQgb2YgQm91bmRzXG4gICAgICBpZiAoY3VycmVudFJvdyA9PT0gMTEpIHtcbiAgICAgICAgdmFsaWRQbGFjZW1lbnQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudENvbCA9PT0gXCJrXCIpIHtcbiAgICAgICAgdmFsaWRQbGFjZW1lbnQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIC8vIE92ZXJsYXBcbiAgICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCBzaGlwLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnRDb2wgPT09IHNoaXBbal0uY29sICYmIGN1cnJlbnRSb3cgPT09IHNoaXBbal0ucm93KSB7XG4gICAgICAgICAgICB2YWxpZFBsYWNlbWVudCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKCF2YWxpZFBsYWNlbWVudCkgYnJlYWs7XG4gICAgICBjdXJyZW50U2hpcC5wdXNoKHsgY29sOiBjdXJyZW50Q29sLCByb3c6IGN1cnJlbnRSb3cgfSk7XG4gICAgICAvLyBJbmNyZW1lbnRcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwicm93U3BhblwiKSBjdXJyZW50Um93ICs9IDE7XG4gICAgICBlbHNlIGN1cnJlbnRDb2wgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGN1cnJlbnRDb2wuY2hhckNvZGVBdCgwKSArIDEpO1xuICAgIH1cblxuICAgIGlmICh2YWxpZFBsYWNlbWVudCkge1xuICAgICAgc2hpcHMucHVzaChjdXJyZW50U2hpcCk7XG4gICAgICBzaGlwTGVuZ3Rocy5wb3AoKTtcbiAgICAgIHNoaXBOYW1lcy5wb3AoKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHNoaXBzO1xufVxuXG5leHBvcnQgeyBjaG9vc2VTcXVhcmUsIGdldFBvc3NpYmxlQ2hvaWNlcywgcmFuZG9tU2hpcEFycmF5IH07XG4iLCJpbXBvcnQgeyBoYW5kbGVTcXVhcmVDbGljaywgaGFuZGxlUGxhY2VtZW50U2hpcHMgfSBmcm9tIFwiLi9pbmRleFwiO1xuaW1wb3J0IHtcbiAgZGlzcGxheUhvdmVyLFxuICBwbGFjZVNoaXAsXG4gIHRvZ2dsZURpcmVjdGlvbixcbiAgcmVzZXRQbGFjZW1lbnQsXG59IGZyb20gXCIuL3BsYWNlbWVudFwiO1xuXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtY29udGFpbmVyXVwiKTtcblxuZnVuY3Rpb24gY3JlYXRlQm9hcmQoKSB7XG4gIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMTsgaSArPSAxKSB7XG4gICAgZm9yIChsZXQgaiA9IFwiYVwiOyBqICE9PSBcImtcIjsgaiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoai5jaGFyQ29kZUF0KDApICsgMSkpIHtcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInNxdWFyZVwiKTtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGAke2p9JHtpfWApO1xuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmIChzcXVhcmUucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXItYm9hcmRcIikpIHJldHVybjtcbiAgICAgICAgaWYgKHNxdWFyZS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImNvbXB1dGVyLWJvYXJkXCIpKVxuICAgICAgICAgIGhhbmRsZVNxdWFyZUNsaWNrKGosIGkpO1xuICAgICAgICBpZiAoc3F1YXJlLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2V0dXAtYm9hcmRcIikpIHtcbiAgICAgICAgICBkaXNwbGF5SG92ZXIoaiwgaSk7XG4gICAgICAgICAgcGxhY2VTaGlwKGosIGkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsICgpID0+IHtcbiAgICAgICAgaWYgKCFzcXVhcmUucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJzZXR1cC1ib2FyZFwiKSkgcmV0dXJuO1xuICAgICAgICBkaXNwbGF5SG92ZXIoaiwgaSk7XG4gICAgICB9KTtcbiAgICAgIGJvYXJkLmNsYXNzTGlzdC5hZGQoXCJib2FyZFwiKTtcbiAgICAgIGJvYXJkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBib2FyZDtcbn1cblxuZnVuY3Rpb24gcmVzZXQoKSB7XG4gIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUhlYWRlcigpIHtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgaGVhZGVyLnRleHRDb250ZW50ID0gXCJCYXR0bGVzaGlwXCI7XG4gIHJldHVybiBoZWFkZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvb3RlcigpIHtcbiAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgZm9vdGVyLnRleHRDb250ZW50ID0gXCJNYWRlIGJ5IFdpbGwgTW9yZXR6XCI7XG4gIHJldHVybiBmb290ZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRpdGxlKHRleHQpIHtcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB0aXRsZS5jbGFzc0xpc3QuYWRkKFwidGl0bGVcIik7XG4gIHRpdGxlLnRleHRDb250ZW50ID0gdGV4dDtcbiAgcmV0dXJuIHRpdGxlO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5R2FtZSgpIHtcbiAgcmVzZXQoKTtcblxuICBjb25zdCBoZWFkZXIgPSBjcmVhdGVIZWFkZXIoKTtcbiAgY29uc3QgZm9vdGVyID0gY3JlYXRlRm9vdGVyKCk7XG4gIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgY29uc3QgY29tcHV0ZXJUaXRsZSA9IGNyZWF0ZVRpdGxlKFwiQ29tcHV0ZXIncyBCb2FyZFwiKTtcbiAgY29tcHV0ZXJUaXRsZS5zdHlsZS53aWR0aCA9IFwiNTAlXCI7XG4gIGNvbnN0IHBsYXllclRpdGxlID0gY3JlYXRlVGl0bGUoXCJZb3VyIEJvYXJkXCIpO1xuICBwbGF5ZXJUaXRsZS5zdHlsZS53aWR0aCA9IFwiNTAlXCI7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICBjb21wdXRlckJvYXJkLmNsYXNzTGlzdC5hZGQoXCJjb21wdXRlci1ib2FyZFwiKTtcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICBwbGF5ZXJCb2FyZC5jbGFzc0xpc3QuYWRkKFwicGxheWVyLWJvYXJkXCIpO1xuXG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoY29tcHV0ZXJUaXRsZSk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoY29tcHV0ZXJCb2FyZCwgbnVsbCk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQocGxheWVyVGl0bGUpO1xuICBzZWN0aW9uLmFwcGVuZENoaWxkKHBsYXllckJvYXJkKTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNlY3Rpb24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheUdhbWVPdmVyKHRleHQpIHtcbiAgY29uc3QgcG9wVXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBwb3BVcC5jbGFzc0xpc3QuYWRkKFwicG9wLXVwXCIpO1xuXG4gIGNvbnN0IGdhbWVPdmVyVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGdhbWVPdmVyVGV4dC5jbGFzc0xpc3QuYWRkKFwiZ2FtZS1vdmVyLXRleHRcIik7XG4gIGdhbWVPdmVyVGV4dC50ZXh0Q29udGVudCA9IHRleHQ7XG5cbiAgY29uc3QgcmVwbGF5QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgcmVwbGF5QnV0dG9uLnRleHRDb250ZW50ID0gXCJSZXBsYXlcIjtcbiAgcmVwbGF5QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyZXBsYXktYnV0dG9uXCIpO1xuICByZXBsYXlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkaXNwbGF5U2V0dXAoKTtcbiAgICByZXNldFBsYWNlbWVudCgpO1xuICB9KTtcblxuICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwib3ZlcmxheVwiKTtcblxuICBwb3BVcC5hcHBlbmRDaGlsZChnYW1lT3ZlclRleHQpO1xuICBwb3BVcC5hcHBlbmRDaGlsZChyZXBsYXlCdXR0b24pO1xuXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChvdmVybGF5KTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBvcFVwKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlU2hpcChzcXVhcmVBbW91bnQsIGNsYXNzTmFtZSkge1xuICBjb25zdCBzaGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgc2hpcC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIHNoaXAuY2xhc3NMaXN0LmFkZChcInBsYWNlbWVudFNoaXBcIik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3F1YXJlQW1vdW50OyBpKyspIHtcbiAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHNoaXAuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgfVxuICByZXR1cm4gc2hpcDtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVNldHVwKCkge1xuICByZXNldCgpO1xuXG4gIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUhlYWRlcigpO1xuICBjb25zdCBmb290ZXIgPSBjcmVhdGVGb290ZXIoKTtcbiAgY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICBjb25zdCB0aXRsZSA9IGNyZWF0ZVRpdGxlKFwiUGxhY2UgWW91ciBTaGlwcyFcIik7XG4gIHRpdGxlLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gIGNvbnN0IGJvYXJkID0gY3JlYXRlQm9hcmQoKTtcbiAgYm9hcmQuY2xhc3NMaXN0LmFkZChcInNldHVwLWJvYXJkXCIpO1xuXG4gIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBidXR0b25zLmNsYXNzTGlzdC5hZGQoXCJidXR0b25zXCIpO1xuXG4gIGNvbnN0IHJvdGF0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHJvdGF0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiUm90YXRlIChyKVwiO1xuICByb3RhdGVCdXR0b24uY2xhc3NMaXN0LmFkZChcInJvdGF0ZS1idXR0b25cIik7XG4gIHJvdGF0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHRvZ2dsZURpcmVjdGlvbigpO1xuICB9KTtcblxuICBjb25zdCByZXNldEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHJlc2V0QnV0dG9uLnRleHRDb250ZW50ID0gXCJSZXNldFwiO1xuICByZXNldEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicmVzZXQtYnV0dG9uXCIpO1xuICByZXNldEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgZGlzcGxheVNldHVwKCk7XG4gICAgcmVzZXRQbGFjZW1lbnQoKTtcbiAgfSk7XG5cbiAgY29uc3Qgc2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzaGlwc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwic2hpcHMtY29udGFpbmVyXCIpO1xuXG4gIGNvbnN0IGFpcmNyYWZ0Q2FycmllciA9IGNyZWF0ZVNoaXAoNSwgXCJhaXJjcmFmdC1jYXJyaWVyXCIpO1xuICBjb25zdCBiYXR0bGVzaGlwID0gY3JlYXRlU2hpcCg0LCBcImJhdHRsZXNoaXBcIik7XG4gIGNvbnN0IHN1Ym1hcmluZSA9IGNyZWF0ZVNoaXAoMywgXCJzdWJtYXJpbmVcIik7XG4gIGNvbnN0IGRlc3Ryb3llciA9IGNyZWF0ZVNoaXAoMywgXCJkZXN0cm95ZXJcIik7XG4gIGNvbnN0IHBhdHJvbEJvYXQgPSBjcmVhdGVTaGlwKDIsIFwicGF0cm9sLWJvYXRcIik7XG5cbiAgc2VjdGlvbi5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoYm9hcmQpO1xuXG4gIGJ1dHRvbnMuYXBwZW5kQ2hpbGQocm90YXRlQnV0dG9uKTtcbiAgYnV0dG9ucy5hcHBlbmRDaGlsZChyZXNldEJ1dHRvbik7XG5cbiAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQoYWlyY3JhZnRDYXJyaWVyKTtcbiAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQoYmF0dGxlc2hpcCk7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKHN1Ym1hcmluZSk7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlc3Ryb3llcik7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKHBhdHJvbEJvYXQpO1xuXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VjdGlvbik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b25zKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNoaXBzQ29udGFpbmVyKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZvb3Rlcik7XG4gIGhhbmRsZVBsYWNlbWVudFNoaXBzKCk7XG59XG5cbmV4cG9ydCB7IGRpc3BsYXlHYW1lLCBkaXNwbGF5U2V0dXAsIGRpc3BsYXlHYW1lT3ZlciB9O1xuIiwiY29uc3Qgc2hpcCA9IChsZW4pID0+ICh7XG4gIGxlbmd0aDogbGVuLFxuICBoaXRzOiAwLFxuICBoaXQoKSB7XG4gICAgdGhpcy5oaXRzICs9IDE7XG4gIH0sXG4gIGlzU3VuaygpIHtcbiAgICBpZiAodGhpcy5oaXRzID09PSB0aGlzLmxlbmd0aCkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxufSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkKCkge1xuICBjb25zdCBib2FyZCA9IFtdO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IDExOyBpKyspIHtcbiAgICBjb25zdCBjb2x1bW4gPSB7fTtcbiAgICBPYmplY3QuYXNzaWduKGNvbHVtbiwge1xuICAgICAgY29sdW1uOiBpLFxuICAgICAgcm93OiBbXG4gICAgICAgIHsgcG9zaXRpb246IGBhJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBiJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBjJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBkJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBlJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBmJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBnJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBoJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBpJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBqJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICBdLFxuICAgIH0pO1xuICAgIGJvYXJkLnB1c2goY29sdW1uKTtcbiAgfVxuICByZXR1cm4gYm9hcmQ7XG59XG5cbmNvbnN0IGdhbWVCb2FyZCA9ICgpID0+ICh7XG4gIGJvYXJkOiBjcmVhdGVCb2FyZCgpLFxuICBmaW5kU3F1YXJlKGNvbCwgcm93KSB7XG4gICAgY29uc3Qgc3F1YXJlID0gdGhpcy5ib2FyZFtyb3cgLSAxXS5yb3cuZmlsdGVyKChvYmopID0+IHtcbiAgICAgIHJldHVybiBvYmoucG9zaXRpb24gPT09IGAke2NvbH0ke3Jvd31gO1xuICAgIH0pO1xuICAgIHJldHVybiBzcXVhcmU7XG4gIH0sXG4gIGNoZWNrUG9zaXRpb24oY29sLCByb3cpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBjb25zdCBzcXVhcmUgPSB0aGlzLmZpbmRTcXVhcmUoY29sLCByb3cpO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gc3F1YXJlWzBdLnBvc2l0aW9uO1xuICAgIGNvbnN0IGhhc1NoaXAgPSBzcXVhcmVbMF0uaGFzU2hpcDtcbiAgICBPYmplY3QuYXNzaWduKHJlc3VsdCwgeyBwb3NpdGlvbiwgaGFzU2hpcCB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuICBzaGlwczogW10sXG4gIHBsYWNlU2hpcChzdGFydENvbCwgZW5kQ29sLCBzdGFydFJvdywgZW5kUm93LCBuYW1lKSB7XG4gICAgbGV0IGxlbmd0aCA9IDA7XG4gICAgbGV0IG9jY3VwaWVkU3F1YXJlcyA9IFtdO1xuICAgIGlmIChzdGFydFJvdyAhPT0gZW5kUm93KSB7XG4gICAgICBmb3IgKGxldCBpID0gc3RhcnRSb3c7IGkgPCBlbmRSb3cgKyAxOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gdGhpcy5maW5kU3F1YXJlKHN0YXJ0Q29sLCBpKTtcbiAgICAgICAgc3F1YXJlWzBdLmhhc1NoaXAgPSB0cnVlO1xuICAgICAgICBsZW5ndGggKz0gMTtcbiAgICAgICAgb2NjdXBpZWRTcXVhcmVzLnB1c2goYCR7c3RhcnRDb2x9JHtpfWApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgY3VycmVudENvbCA9IHN0YXJ0Q29sO1xuICAgICAgd2hpbGUgKGN1cnJlbnRDb2wgIT09IFN0cmluZy5mcm9tQ2hhckNvZGUoZW5kQ29sLmNoYXJDb2RlQXQoMCkgKyAxKSkge1xuICAgICAgICBjb25zdCBzcXVhcmUgPSB0aGlzLmZpbmRTcXVhcmUoY3VycmVudENvbCwgc3RhcnRSb3cpO1xuICAgICAgICBzcXVhcmVbMF0uaGFzU2hpcCA9IHRydWU7XG4gICAgICAgIG9jY3VwaWVkU3F1YXJlcy5wdXNoKGAke2N1cnJlbnRDb2x9JHtzdGFydFJvd31gKTtcbiAgICAgICAgY3VycmVudENvbCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY3VycmVudENvbC5jaGFyQ29kZUF0KDApICsgMSk7XG4gICAgICAgIGxlbmd0aCArPSAxO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNoaXBzLnB1c2goe1xuICAgICAgc3F1YXJlczogb2NjdXBpZWRTcXVhcmVzLFxuICAgICAgbmFtZSxcbiAgICAgIG9iajogc2hpcChsZW5ndGgpLFxuICAgIH0pO1xuICB9LFxuICBhdHRhY2tzOiBbXSxcbiAgdHJhY2tBdHRhY2socG9zaXRpb24sIGF0dGFja0hpdCwgc2Fua1NoaXApIHtcbiAgICB0aGlzLmF0dGFja3MucHVzaCh7IHBvc2l0aW9uLCBhdHRhY2tIaXQsIHNhbmtTaGlwIH0pO1xuICB9LFxuICBhbGxTaGlwc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuc2hpcHMubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgbGV0IHNoaXBzU3VuayA9IDA7XG4gICAgdGhpcy5hdHRhY2tzLmZvckVhY2goKGF0dGFjaykgPT4ge1xuICAgICAgaWYgKGF0dGFjay5zYW5rU2hpcCkgc2hpcHNTdW5rICs9IDE7XG4gICAgfSk7XG4gICAgaWYgKHNoaXBzU3VuayA+PSB0aGlzLnNoaXBzLmxlbmd0aCkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuICBpc1JlcGVhdGVkQXR0YWNrKGNvbCwgcm93KSB7XG4gICAgbGV0IHJlcGVhdCA9IGZhbHNlO1xuICAgIHRoaXMuYXR0YWNrcy5mb3JFYWNoKChhdHRhY2spID0+IHtcbiAgICAgIGlmIChhdHRhY2sucG9zaXRpb24gPT09IGAke2NvbH0ke3Jvd31gKSB7XG4gICAgICAgIHJlcGVhdCA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVwZWF0O1xuICB9LFxuICByZWNlaXZlQXR0YWNrKGNvbCwgcm93KSB7XG4gICAgaWYgKHRoaXMuaXNSZXBlYXRlZEF0dGFjayhjb2wsIHJvdykpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgbGV0IGF0dGFja2VkU2hpcCA9IGZhbHNlO1xuICAgIHRoaXMuc2hpcHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5zcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgICAgICBpZiAoc3F1YXJlID09PSBgJHtjb2x9JHtyb3d9YCkgYXR0YWNrZWRTaGlwID0gaXRlbTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmIChhdHRhY2tlZFNoaXApIHtcbiAgICAgIGF0dGFja2VkU2hpcC5vYmouaGl0KCk7XG4gICAgICB0aGlzLnRyYWNrQXR0YWNrKGAke2NvbH0ke3Jvd31gLCB0cnVlLCBhdHRhY2tlZFNoaXAub2JqLmlzU3VuaygpKTtcbiAgICAgIHJldHVybiBhdHRhY2tlZFNoaXAubmFtZTtcbiAgICB9XG4gICAgdGhpcy50cmFja0F0dGFjayhgJHtjb2x9JHtyb3d9YCwgZmFsc2UsIGZhbHNlKTtcbiAgICByZXR1cm4gYCR7Y29sfSR7cm93fWA7XG4gIH0sXG59KTtcblxuZXhwb3J0IHsgc2hpcCwgZ2FtZUJvYXJkIH07XG4iLCJpbXBvcnQgeyBkaXNwbGF5R2FtZSwgZGlzcGxheUdhbWVPdmVyLCBkaXNwbGF5U2V0dXAgfSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5pbXBvcnQgeyBnYW1lQm9hcmQgfSBmcm9tIFwiLi9nYW1lXCI7XG5pbXBvcnQgeyBjaG9vc2VTcXVhcmUsIHJhbmRvbVNoaXBBcnJheSB9IGZyb20gXCIuL2NvbXB1dGVyXCI7XG5pbXBvcnQgeyBzZXRBY3RpdmVTaGlwLCB0b2dnbGVEaXJlY3Rpb24gfSBmcm9tIFwiLi9wbGFjZW1lbnRcIjtcblxubGV0IHBsYXllckJvYXJkO1xubGV0IGNvbXB1dGVyQm9hcmQ7XG5cbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkRnJvbUFycmF5KHNoaXBzLCBib2FyZCwgYm9hcmRUeXBlKSB7XG4gIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBsZXQgZmlyc3QgPSB1bmRlZmluZWQ7XG4gICAgbGV0IG5hbWUgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgc2hpcC5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICAgIGlmIChuYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbmFtZSA9IHNxdWFyZS5uYW1lO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoZmlyc3QgPT09IHVuZGVmaW5lZCkgZmlyc3QgPSB7IGNvbDogc3F1YXJlLmNvbCwgcm93OiBzcXVhcmUucm93IH07XG4gICAgICBsYXN0ID0geyBjb2w6IHNxdWFyZS5jb2wsIHJvdzogc3F1YXJlLnJvdyB9O1xuICAgICAgLy8gRGlzcGxheSBXaGVyZSBTaGlwcyBBcmVcbiAgICAgIGlmIChib2FyZFR5cGUgPT09IFwicGxheWVyXCIpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50XG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLWJvYXJkXCIpXG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC4ke3NxdWFyZS5jb2x9JHtzcXVhcmUucm93fWApO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGJvYXJkLnBsYWNlU2hpcChmaXJzdC5jb2wsIGxhc3QuY29sLCBmaXJzdC5yb3csIGxhc3Qucm93LCBuYW1lKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXQocGxheWVyU2hpcHMsIGNvbXB1dGVyU2hpcHMpIHtcbiAgZGlzcGxheUdhbWUoKTtcbiAgcGxheWVyQm9hcmQgPSBnYW1lQm9hcmQoKTtcbiAgY3JlYXRlQm9hcmRGcm9tQXJyYXkocGxheWVyU2hpcHMsIHBsYXllckJvYXJkLCBcInBsYXllclwiKTtcbiAgY29tcHV0ZXJCb2FyZCA9IGdhbWVCb2FyZCgpO1xuICBjcmVhdGVCb2FyZEZyb21BcnJheShjb21wdXRlclNoaXBzLCBjb21wdXRlckJvYXJkLCBcImNvbXB1dGVyXCIpO1xufVxuXG5mdW5jdGlvbiBtYXJrU3F1YXJlKGJvYXJkLCBjb2wsIHJvdywgYm9hcmRUeXBlKSB7XG4gIGJvYXJkLnJlY2VpdmVBdHRhY2soY29sLCByb3cpO1xuICBpZiAoYm9hcmQuYXR0YWNrc1tib2FyZC5hdHRhY2tzLmxlbmd0aCAtIDFdLmF0dGFja0hpdCkge1xuICAgIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihgLiR7Ym9hcmRUeXBlfS1ib2FyZGApXG4gICAgICAucXVlcnlTZWxlY3RvcihgLiR7Y29sfSR7cm93fWApXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC4ke2JvYXJkVHlwZX0tYm9hcmRgKVxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC4ke2NvbH0ke3Jvd31gKVxuICAgICAgLmNsYXNzTGlzdC5hZGQoXCJtaXNzZWRcIik7XG4gIH1cbn1cblxuLy8gQWR2YW5jZXMgR2FtZVxuZnVuY3Rpb24gaGFuZGxlU3F1YXJlQ2xpY2soY29sLCByb3cpIHtcbiAgaWYgKGNvbXB1dGVyQm9hcmQuaXNSZXBlYXRlZEF0dGFjayhjb2wsIHJvdykpIHJldHVybjtcblxuICBtYXJrU3F1YXJlKGNvbXB1dGVyQm9hcmQsIGNvbCwgcm93LCBcImNvbXB1dGVyXCIpO1xuICBpZiAoY29tcHV0ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgIGRpc3BsYXlHYW1lT3ZlcihcIllvdSBXb25cIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgY29tcHV0ZXJDaG9pY2UgPSBjaG9vc2VTcXVhcmUocGxheWVyQm9hcmQpO1xuICBtYXJrU3F1YXJlKHBsYXllckJvYXJkLCBjb21wdXRlckNob2ljZS5jb2wsIGNvbXB1dGVyQ2hvaWNlLnJvdywgXCJwbGF5ZXJcIik7XG4gIGlmIChwbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgIGRpc3BsYXlHYW1lT3ZlcihcIlRoZSBDb21wdXRlciBXb25cIik7XG4gICAgcmV0dXJuO1xuICB9XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwbGFjZW1lbnRDb21wbGV0ZVwiLCAoZSkgPT4ge1xuICBpbml0KGUuZGV0YWlsLnBsYXllckFycmF5LCByYW5kb21TaGlwQXJyYXkoKSk7XG59KTtcblxuZnVuY3Rpb24gaGFuZGxlUGxhY2VtZW50U2hpcHMoKSB7XG4gIGNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZW1lbnRTaGlwXCIpO1xuICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgLy8gVG9nZ2xlIE9mZlxuICAgICAgaWYgKHNoaXAuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2VsZWN0ZWRcIikpIHtcbiAgICAgICAgc2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIik7XG4gICAgICAgIHNldEFjdGl2ZVNoaXAoMCwgXCJcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIERlc2VsZWN0IE90aGVyIFNoaXBzXG4gICAgICBzaGlwcy5mb3JFYWNoKChhU2hpcCkgPT4gYVNoaXAuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpKTtcbiAgICAgIC8vIFNlbGVjdCBTaGlwXG4gICAgICBzaGlwLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcbiAgICAgIHNldEFjdGl2ZVNoaXAoc2hpcC5jaGlsZHJlbi5sZW5ndGgsIHNoaXAuY2xhc3NMaXN0WzBdKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xuICBpZiAoZS5rZXkgPT09IFwiclwiKSB0b2dnbGVEaXJlY3Rpb24oKTtcbn0pO1xuZGlzcGxheVNldHVwKCk7XG5cbmV4cG9ydCB7IGhhbmRsZVNxdWFyZUNsaWNrLCBoYW5kbGVQbGFjZW1lbnRTaGlwcyB9O1xuIiwibGV0IGFjdGl2ZVNoaXBMZW5ndGggPSAwO1xubGV0IGFjdGl2ZVNoaXBOYW1lID0gXCJcIjtcbmxldCBkaXJlY3Rpb24gPSBcImNvbFNwYW5cIjtcbmxldCBwbGFjZW1lbnRWYWxpZCA9IGZhbHNlO1xuXG5mdW5jdGlvbiBzZXRBY3RpdmVTaGlwKGxlbmd0aCwgbmFtZSkge1xuICBhY3RpdmVTaGlwTGVuZ3RoID0gbGVuZ3RoO1xuICBhY3RpdmVTaGlwTmFtZSA9IG5hbWU7XG59XG5cbmZ1bmN0aW9uIGNsZWFySG92ZXJlZCgpIHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ob3ZlcmVkXCIpLmZvckVhY2goKGhvdmVyZWQpID0+IHtcbiAgICBob3ZlcmVkLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlcmVkXCIpO1xuICB9KTtcbn1cblxubGV0IHN0YXJ0Q29sID0gXCJcIjtcbmxldCBzdGFydFJvdyA9IFwiXCI7XG5cbmZ1bmN0aW9uIHRvZ2dsZURpcmVjdGlvbigpIHtcbiAgZGlyZWN0aW9uID09PSBcInJvd1NwYW5cIiA/IChkaXJlY3Rpb24gPSBcImNvbFNwYW5cIikgOiAoZGlyZWN0aW9uID0gXCJyb3dTcGFuXCIpO1xuICBkaXNwbGF5SG92ZXIoc3RhcnRDb2wsIHN0YXJ0Um93KTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheUhvdmVyKGNvbCwgcm93KSB7XG4gIGlmIChjb2wgPT09IFwiXCIgfHwgcm93ID09PSBcIlwiKSByZXR1cm47XG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdGVkXCIpID09PSBudWxsKSByZXR1cm47XG4gIHN0YXJ0Q29sID0gY29sO1xuICBsZXQgY3VycmVudENvbCA9IGNvbDtcbiAgc3RhcnRSb3cgPSByb3c7XG4gIGxldCBjdXJyZW50Um93ID0gcm93O1xuICBsZXQgaXRlcmF0aW9uc0xlZnQgPSBhY3RpdmVTaGlwTGVuZ3RoO1xuXG4gIGNsZWFySG92ZXJlZCgpO1xuXG4gIHdoaWxlIChpdGVyYXRpb25zTGVmdCA+IDApIHtcbiAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtjdXJyZW50Q29sfSR7Y3VycmVudFJvd31gKTtcbiAgICBpZiAoc3F1YXJlID09PSBudWxsKSB7XG4gICAgICBwbGFjZW1lbnRWYWxpZCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmIChzcXVhcmUuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcFwiKSkge1xuICAgICAgcGxhY2VtZW50VmFsaWQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiaG92ZXJlZFwiKTtcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcInJvd1NwYW5cIikgY3VycmVudFJvdyArPSAxO1xuICAgIGVsc2UgY3VycmVudENvbCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY3VycmVudENvbC5jaGFyQ29kZUF0KDApICsgMSk7XG5cbiAgICBpdGVyYXRpb25zTGVmdCAtPSAxO1xuICB9XG5cbiAgaWYgKGl0ZXJhdGlvbnNMZWZ0ID09PSAwKSBwbGFjZW1lbnRWYWxpZCA9IHRydWU7XG59XG5cbmxldCBwbGF5ZXJBcnJheSA9IFtdO1xuZnVuY3Rpb24gcmVzZXRQbGFjZW1lbnQoKSB7XG4gIHBsYXllckFycmF5Lmxlbmd0aCA9IDA7XG59XG5cbmZ1bmN0aW9uIHBsYWNlU2hpcChjb2wsIHJvdykge1xuICBpZiAoIXBsYWNlbWVudFZhbGlkKSByZXR1cm47XG4gIGxldCBzaGlwQXJyYXkgPSBbeyBuYW1lOiBhY3RpdmVTaGlwTmFtZSB9XTtcbiAgbGV0IGN1cnJlbnRDb2wgPSBjb2w7XG4gIGxldCBjdXJyZW50Um93ID0gcm93O1xuICBsZXQgaXRlcmF0aW9uc0xlZnQgPSBhY3RpdmVTaGlwTGVuZ3RoO1xuICB3aGlsZSAoaXRlcmF0aW9uc0xlZnQgPiAwKSB7XG4gICAgc2hpcEFycmF5LnB1c2goeyBjb2w6IGN1cnJlbnRDb2wsIHJvdzogY3VycmVudFJvdyB9KTtcbiAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtjdXJyZW50Q29sfSR7Y3VycmVudFJvd31gKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJyb3dTcGFuXCIpIGN1cnJlbnRSb3cgKz0gMTtcbiAgICBlbHNlIGN1cnJlbnRDb2wgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGN1cnJlbnRDb2wuY2hhckNvZGVBdCgwKSArIDEpO1xuICAgIGl0ZXJhdGlvbnNMZWZ0IC09IDE7XG4gIH1cbiAgcGxheWVyQXJyYXkucHVzaChzaGlwQXJyYXkpO1xuXG4gIGNsZWFySG92ZXJlZCgpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdGVkXCIpLnJlbW92ZSgpO1xuICBwbGFjZW1lbnRWYWxpZCA9IGZhbHNlO1xuXG4gIC8vIElmIGFsbCBzaGlwcyBhcmUgcGxhY2VkIGluaXQgdGhlIGdhbWVcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxhY2VtZW50U2hpcFwiKSA9PT0gbnVsbCkge1xuICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwicGxhY2VtZW50Q29tcGxldGVcIiwge1xuICAgICAgZGV0YWlsOiB7IHBsYXllckFycmF5IH0sXG4gICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgIGNvbXBvc2VkOiBmYWxzZSxcbiAgICB9KTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtY29udGFpbmVyXVwiKS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBzZXRBY3RpdmVTaGlwLFxuICB0b2dnbGVEaXJlY3Rpb24sXG4gIGRpc3BsYXlIb3ZlcixcbiAgcGxhY2VTaGlwLFxuICByZXNldFBsYWNlbWVudCxcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbImdldFBvc3NpYmxlQ2hvaWNlcyIsImJvYXJkIiwicG9zc2libGVTcXVhcmVzIiwiaSIsImoiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJjaGFyQ29kZUF0IiwiaXNSZXBlYXRlZEF0dGFjayIsInB1c2giLCJyb3ciLCJjb2wiLCJjaG9vc2VTcXVhcmUiLCJzcXVhcmVzIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibGVuZ3RoIiwicmFuZG9tU2hpcEFycmF5Iiwic2hpcExlbmd0aHMiLCJzaGlwTmFtZXMiLCJzaGlwcyIsIl9sb29wIiwidmFsaWRQbGFjZW1lbnQiLCJkaXJlY3Rpb24iLCJzdGFydFJvdyIsImNlaWwiLCJzdGFydENvbCIsImN1cnJlbnRTaGlwIiwibmFtZSIsImN1cnJlbnRDb2wiLCJjdXJyZW50Um93IiwiZm9yRWFjaCIsInNoaXAiLCJwb3AiLCJoYW5kbGVTcXVhcmVDbGljayIsImhhbmRsZVBsYWNlbWVudFNoaXBzIiwiZGlzcGxheUhvdmVyIiwicGxhY2VTaGlwIiwidG9nZ2xlRGlyZWN0aW9uIiwicmVzZXRQbGFjZW1lbnQiLCJjb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVCb2FyZCIsImNyZWF0ZUVsZW1lbnQiLCJfbG9vcDIiLCJzcXVhcmUiLCJjbGFzc0xpc3QiLCJhZGQiLCJjb25jYXQiLCJhZGRFdmVudExpc3RlbmVyIiwicGFyZW50RWxlbWVudCIsImNvbnRhaW5zIiwiYXBwZW5kQ2hpbGQiLCJyZXNldCIsInRleHRDb250ZW50IiwiY3JlYXRlSGVhZGVyIiwiaGVhZGVyIiwiY3JlYXRlRm9vdGVyIiwiZm9vdGVyIiwiY3JlYXRlVGl0bGUiLCJ0ZXh0IiwidGl0bGUiLCJkaXNwbGF5R2FtZSIsInNlY3Rpb24iLCJjb21wdXRlclRpdGxlIiwic3R5bGUiLCJ3aWR0aCIsInBsYXllclRpdGxlIiwiY29tcHV0ZXJCb2FyZCIsInBsYXllckJvYXJkIiwiZGlzcGxheUdhbWVPdmVyIiwicG9wVXAiLCJnYW1lT3ZlclRleHQiLCJyZXBsYXlCdXR0b24iLCJkaXNwbGF5U2V0dXAiLCJvdmVybGF5IiwiY3JlYXRlU2hpcCIsInNxdWFyZUFtb3VudCIsImNsYXNzTmFtZSIsImJ1dHRvbnMiLCJyb3RhdGVCdXR0b24iLCJyZXNldEJ1dHRvbiIsInNoaXBzQ29udGFpbmVyIiwiYWlyY3JhZnRDYXJyaWVyIiwiYmF0dGxlc2hpcCIsInN1Ym1hcmluZSIsImRlc3Ryb3llciIsInBhdHJvbEJvYXQiLCJsZW4iLCJoaXRzIiwiaGl0IiwiaXNTdW5rIiwiY29sdW1uIiwiT2JqZWN0IiwiYXNzaWduIiwicG9zaXRpb24iLCJoYXNTaGlwIiwiZ2FtZUJvYXJkIiwiZmluZFNxdWFyZSIsImZpbHRlciIsIm9iaiIsImNoZWNrUG9zaXRpb24iLCJyZXN1bHQiLCJlbmRDb2wiLCJlbmRSb3ciLCJvY2N1cGllZFNxdWFyZXMiLCJhdHRhY2tzIiwidHJhY2tBdHRhY2siLCJhdHRhY2tIaXQiLCJzYW5rU2hpcCIsImFsbFNoaXBzU3VuayIsInNoaXBzU3VuayIsImF0dGFjayIsInJlcGVhdCIsInJlY2VpdmVBdHRhY2siLCJ1bmRlZmluZWQiLCJhdHRhY2tlZFNoaXAiLCJpdGVtIiwic2V0QWN0aXZlU2hpcCIsImNyZWF0ZUJvYXJkRnJvbUFycmF5IiwiYm9hcmRUeXBlIiwiZmlyc3QiLCJsYXN0IiwiZWxlbWVudCIsImluaXQiLCJwbGF5ZXJTaGlwcyIsImNvbXB1dGVyU2hpcHMiLCJtYXJrU3F1YXJlIiwiY29tcHV0ZXJDaG9pY2UiLCJlIiwiZGV0YWlsIiwicGxheWVyQXJyYXkiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVtb3ZlIiwiYVNoaXAiLCJjaGlsZHJlbiIsIndpbmRvdyIsImtleSIsImFjdGl2ZVNoaXBMZW5ndGgiLCJhY3RpdmVTaGlwTmFtZSIsInBsYWNlbWVudFZhbGlkIiwiY2xlYXJIb3ZlcmVkIiwiaG92ZXJlZCIsIml0ZXJhdGlvbnNMZWZ0Iiwic2hpcEFycmF5IiwiZXZlbnQiLCJDdXN0b21FdmVudCIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwiY29tcG9zZWQiLCJkaXNwYXRjaEV2ZW50Il0sInNvdXJjZVJvb3QiOiIifQ==
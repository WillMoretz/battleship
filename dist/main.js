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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVYsV0FBVyxDQUFDM0gsSUFBSSxDQUFDc0ksU0FBUyxDQUFDO0VBRTNCSCxZQUFZLEVBQUU7RUFDZHBHLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDNkYsTUFBTSxFQUFFOztFQUU1QztFQUNBLElBQUk5RixRQUFRLENBQUNDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLElBQUksRUFBRTtJQUNyRCxJQUFNdUcsS0FBSyxHQUFHLElBQUlDLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRTtNQUNqRGQsTUFBTSxFQUFFO1FBQUVDLFdBQVcsRUFBWEE7TUFBWSxDQUFDO01BQ3ZCYyxPQUFPLEVBQUUsSUFBSTtNQUNiQyxVQUFVLEVBQUUsSUFBSTtNQUNoQkMsUUFBUSxFQUFFO0lBQ1osQ0FBQyxDQUFDO0lBQ0Y1RyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDNEcsYUFBYSxDQUFDTCxLQUFLLENBQUM7RUFDakU7QUFDRjs7Ozs7OztVQ3ZGQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kaXNwbGF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxhY2VtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZ2V0UG9zc2libGVDaG9pY2VzKGJvYXJkKSB7XG4gIGNvbnN0IHBvc3NpYmxlU3F1YXJlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IDExOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gXCJhXCI7IGogIT09IFwia1wiOyBqID0gU3RyaW5nLmZyb21DaGFyQ29kZShqLmNoYXJDb2RlQXQoMCkgKyAxKSkge1xuICAgICAgaWYgKCFib2FyZC5pc1JlcGVhdGVkQXR0YWNrKGosIGkpKVxuICAgICAgICBwb3NzaWJsZVNxdWFyZXMucHVzaCh7IHJvdzogaSwgY29sOiBqIH0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcG9zc2libGVTcXVhcmVzO1xufVxuXG5mdW5jdGlvbiBjaG9vc2VTcXVhcmUoYm9hcmQpIHtcbiAgY29uc3Qgc3F1YXJlcyA9IGdldFBvc3NpYmxlQ2hvaWNlcyhib2FyZCk7XG4gIHJldHVybiBzcXVhcmVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNxdWFyZXMubGVuZ3RoKV07XG59XG5cbmZ1bmN0aW9uIHJhbmRvbVNoaXBBcnJheSgpIHtcbiAgY29uc3Qgc2hpcExlbmd0aHMgPSBbMiwgMywgMywgNCwgNV07XG4gIGNvbnN0IHNoaXBOYW1lcyA9IFtcbiAgICBcIlBhdHJvbCBCb2F0XCIsXG4gICAgXCJTdWJtYXJpbmVcIixcbiAgICBcIkRlc3Ryb3llclwiLFxuICAgIFwiQmF0dGxlU2hpcFwiLFxuICAgIFwiQWlyY3JhZnQgQ2FycmllclwiLFxuICBdO1xuICBjb25zdCBzaGlwcyA9IFtdO1xuICB3aGlsZSAoc2hpcExlbmd0aHMubGVuZ3RoID4gMCkge1xuICAgIGxldCB2YWxpZFBsYWNlbWVudCA9IHRydWU7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/IFwicm93U3BhblwiIDogXCJjb2xTcGFuXCI7XG5cbiAgICBjb25zdCBzdGFydFJvdyA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGNvbnN0IHN0YXJ0Q29sID0gU3RyaW5nLmZyb21DaGFyQ29kZSg5NiArIE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogMTApKTtcblxuICAgIGNvbnN0IGN1cnJlbnRTaGlwID0gW3sgbmFtZTogc2hpcE5hbWVzW3NoaXBOYW1lcy5sZW5ndGggLSAxXSB9XTtcblxuICAgIGxldCBjdXJyZW50Q29sID0gc3RhcnRDb2w7XG4gICAgbGV0IGN1cnJlbnRSb3cgPSBzdGFydFJvdztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHNbc2hpcExlbmd0aHMubGVuZ3RoIC0gMV07IGkrKykge1xuICAgICAgLy8gT3V0IG9mIEJvdW5kc1xuICAgICAgaWYgKGN1cnJlbnRSb3cgPT09IDExKSB7XG4gICAgICAgIHZhbGlkUGxhY2VtZW50ID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnRDb2wgPT09IFwia1wiKSB7XG4gICAgICAgIHZhbGlkUGxhY2VtZW50ID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICAvLyBPdmVybGFwXG4gICAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgc2hpcC5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmIChjdXJyZW50Q29sID09PSBzaGlwW2pdLmNvbCAmJiBjdXJyZW50Um93ID09PSBzaGlwW2pdLnJvdykge1xuICAgICAgICAgICAgdmFsaWRQbGFjZW1lbnQgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmICghdmFsaWRQbGFjZW1lbnQpIGJyZWFrO1xuICAgICAgY3VycmVudFNoaXAucHVzaCh7IGNvbDogY3VycmVudENvbCwgcm93OiBjdXJyZW50Um93IH0pO1xuICAgICAgLy8gSW5jcmVtZW50XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBcInJvd1NwYW5cIikgY3VycmVudFJvdyArPSAxO1xuICAgICAgZWxzZSBjdXJyZW50Q29sID0gU3RyaW5nLmZyb21DaGFyQ29kZShjdXJyZW50Q29sLmNoYXJDb2RlQXQoMCkgKyAxKTtcbiAgICB9XG5cbiAgICBpZiAodmFsaWRQbGFjZW1lbnQpIHtcbiAgICAgIHNoaXBzLnB1c2goY3VycmVudFNoaXApO1xuICAgICAgc2hpcExlbmd0aHMucG9wKCk7XG4gICAgICBzaGlwTmFtZXMucG9wKCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzaGlwcztcbn1cblxuZXhwb3J0IHsgY2hvb3NlU3F1YXJlLCBnZXRQb3NzaWJsZUNob2ljZXMsIHJhbmRvbVNoaXBBcnJheSB9O1xuIiwiaW1wb3J0IGhhbmRsZVNxdWFyZUNsaWNrIGZyb20gXCIuL2luZGV4XCI7XG5pbXBvcnQgeyBkaXNwbGF5SG92ZXIsIHBsYWNlU2hpcCwgdG9nZ2xlRGlyZWN0aW9uIH0gZnJvbSBcIi4vcGxhY2VtZW50XCI7XG5cbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1jb250YWluZXJdXCIpO1xuXG5mdW5jdGlvbiBjcmVhdGVCb2FyZCgpIHtcbiAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IDExOyBpICs9IDEpIHtcbiAgICBmb3IgKGxldCBqID0gXCJhXCI7IGogIT09IFwia1wiOyBqID0gU3RyaW5nLmZyb21DaGFyQ29kZShqLmNoYXJDb2RlQXQoMCkgKyAxKSkge1xuICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwic3F1YXJlXCIpO1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoYCR7an0ke2l9YCk7XG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgaWYgKHNxdWFyZS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllci1ib2FyZFwiKSkgcmV0dXJuO1xuICAgICAgICBpZiAoc3F1YXJlLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29tcHV0ZXItYm9hcmRcIikpXG4gICAgICAgICAgaGFuZGxlU3F1YXJlQ2xpY2soaiwgaSk7XG4gICAgICAgIGlmIChzcXVhcmUucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJzZXR1cC1ib2FyZFwiKSkge1xuICAgICAgICAgIHBsYWNlU2hpcChqLCBpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoKSA9PiB7XG4gICAgICAgIGlmICghc3F1YXJlLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2V0dXAtYm9hcmRcIikpIHJldHVybjtcbiAgICAgICAgZGlzcGxheUhvdmVyKGosIGkpO1xuICAgICAgfSk7XG4gICAgICBib2FyZC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIik7XG4gICAgICBib2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYm9hcmQ7XG59XG5cbmZ1bmN0aW9uIHJlc2V0KCkge1xuICBjb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVIZWFkZXIoKSB7XG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIik7XG4gIGhlYWRlci50ZXh0Q29udGVudCA9IFwiQmF0dGxlc2hpcFwiO1xuICByZXR1cm4gaGVhZGVyO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGb290ZXIoKSB7XG4gIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb290ZXJcIik7XG4gIGZvb3Rlci50ZXh0Q29udGVudCA9IFwiTWFkZSBieSBXaWxsIE1vcmV0elwiO1xuICByZXR1cm4gZm9vdGVyO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVUaXRsZSh0ZXh0KSB7XG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdGl0bGUuY2xhc3NMaXN0LmFkZChcInRpdGxlXCIpO1xuICB0aXRsZS50ZXh0Q29udGVudCA9IHRleHQ7XG4gIHJldHVybiB0aXRsZTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheUdhbWUoKSB7XG4gIHJlc2V0KCk7XG5cbiAgY29uc3QgaGVhZGVyID0gY3JlYXRlSGVhZGVyKCk7XG4gIGNvbnN0IGZvb3RlciA9IGNyZWF0ZUZvb3RlcigpO1xuICBjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gIGNvbnN0IGNvbXB1dGVyVGl0bGUgPSBjcmVhdGVUaXRsZShcIkNvbXB1dGVyJ3MgQm9hcmRcIik7XG4gIGNvbnN0IHBsYXllclRpdGxlID0gY3JlYXRlVGl0bGUoXCJZb3VyIEJvYXJkXCIpO1xuICBjb25zdCBjb21wdXRlckJvYXJkID0gY3JlYXRlQm9hcmQoKTtcbiAgY29tcHV0ZXJCb2FyZC5jbGFzc0xpc3QuYWRkKFwiY29tcHV0ZXItYm9hcmRcIik7XG4gIGNvbnN0IHBsYXllckJvYXJkID0gY3JlYXRlQm9hcmQoKTtcbiAgcGxheWVyQm9hcmQuY2xhc3NMaXN0LmFkZChcInBsYXllci1ib2FyZFwiKTtcblxuICBzZWN0aW9uLmFwcGVuZENoaWxkKGNvbXB1dGVyVGl0bGUpO1xuICBzZWN0aW9uLmFwcGVuZENoaWxkKGNvbXB1dGVyQm9hcmQsIG51bGwpO1xuICBzZWN0aW9uLmFwcGVuZENoaWxkKHBsYXllclRpdGxlKTtcbiAgc2VjdGlvbi5hcHBlbmRDaGlsZChwbGF5ZXJCb2FyZCk7XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWN0aW9uKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZvb3Rlcik7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlHYW1lT3Zlcih0ZXh0KSB7XG4gIGNvbnN0IHBvcFVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgcG9wVXAuY2xhc3NMaXN0LmFkZChcInBvcC11cFwiKTtcblxuICBjb25zdCBnYW1lT3ZlclRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBnYW1lT3ZlclRleHQuY2xhc3NMaXN0LmFkZChcImdhbWUtb3Zlci10ZXh0XCIpO1xuICBnYW1lT3ZlclRleHQudGV4dENvbnRlbnQgPSB0ZXh0O1xuXG4gIGNvbnN0IHJlcGxheUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHJlcGxheUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiUmVwbGF5XCI7XG4gIHJlcGxheUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicmVwbGF5LWJ1dHRvblwiKTtcblxuICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwib3ZlcmxheVwiKTtcblxuICBwb3BVcC5hcHBlbmRDaGlsZChnYW1lT3ZlclRleHQpO1xuICBwb3BVcC5hcHBlbmRDaGlsZChyZXBsYXlCdXR0b24pO1xuXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChvdmVybGF5KTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBvcFVwKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlU2hpcChzcXVhcmVBbW91bnQsIGNsYXNzTmFtZSkge1xuICBjb25zdCBzaGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgc2hpcC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIHNoaXAuY2xhc3NMaXN0LmFkZChcInBsYWNlbWVudFNoaXBcIik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3F1YXJlQW1vdW50OyBpKyspIHtcbiAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHNoaXAuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgfVxuICByZXR1cm4gc2hpcDtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVNldHVwKCkge1xuICBjb25zdCBoZWFkZXIgPSBjcmVhdGVIZWFkZXIoKTtcbiAgY29uc3QgZm9vdGVyID0gY3JlYXRlRm9vdGVyKCk7XG4gIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgY29uc3QgdGl0bGUgPSBjcmVhdGVUaXRsZShcIlBsYWNlIFlvdXIgU2hpcHMhXCIpO1xuICBjb25zdCBib2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG4gIGJvYXJkLmNsYXNzTGlzdC5hZGQoXCJzZXR1cC1ib2FyZFwiKTtcblxuICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYnV0dG9ucy5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uc1wiKTtcblxuICBjb25zdCByb3RhdGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICByb3RhdGVCdXR0b24udGV4dENvbnRlbnQgPSBcIlJvdGF0ZSAocilcIjtcbiAgcm90YXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyb3RhdGUtYnV0dG9uXCIpO1xuICByb3RhdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICB0b2dnbGVEaXJlY3Rpb24oKTtcbiAgfSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xuICAgIGlmIChlLmtleSA9PT0gXCJyXCIpIHRvZ2dsZURpcmVjdGlvbigpO1xuICB9KTtcblxuICBjb25zdCBzaGlwc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHNoaXBzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJzaGlwcy1jb250YWluZXJcIik7XG5cbiAgY29uc3QgYWlyY3JhZnRDYXJyaWVyID0gY3JlYXRlU2hpcCg1LCBcImFpcmNyYWZ0LWNhcnJpZXJcIik7XG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBjcmVhdGVTaGlwKDQsIFwiYmF0dGxlc2hpcFwiKTtcbiAgY29uc3Qgc3VibWFyaW5lID0gY3JlYXRlU2hpcCgzLCBcInN1Ym1hcmluZVwiKTtcbiAgY29uc3QgZGVzdHJveWVyID0gY3JlYXRlU2hpcCgzLCBcImRlc3Ryb3llclwiKTtcbiAgY29uc3QgcGF0cm9sQm9hdCA9IGNyZWF0ZVNoaXAoMiwgXCJwYXRyb2wtYm9hdFwiKTtcblxuICBzZWN0aW9uLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgc2VjdGlvbi5hcHBlbmRDaGlsZChib2FyZCk7XG5cbiAgYnV0dG9ucy5hcHBlbmRDaGlsZChyb3RhdGVCdXR0b24pO1xuXG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGFpcmNyYWZ0Q2Fycmllcik7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGJhdHRsZXNoaXApO1xuICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChzdWJtYXJpbmUpO1xuICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChkZXN0cm95ZXIpO1xuICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChwYXRyb2xCb2F0KTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNlY3Rpb24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9ucyk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzaGlwc0NvbnRhaW5lcik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb290ZXIpO1xufVxuXG5leHBvcnQgeyBkaXNwbGF5R2FtZSwgZGlzcGxheVNldHVwLCBkaXNwbGF5R2FtZU92ZXIgfTtcbiIsImNvbnN0IHNoaXAgPSAobGVuKSA9PiAoe1xuICBsZW5ndGg6IGxlbixcbiAgaGl0czogMCxcbiAgaGl0KCkge1xuICAgIHRoaXMuaGl0cyArPSAxO1xuICB9LFxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbn0pO1xuXG5mdW5jdGlvbiBjcmVhdGVCb2FyZCgpIHtcbiAgY29uc3QgYm9hcmQgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMTsgaSsrKSB7XG4gICAgY29uc3QgY29sdW1uID0ge307XG4gICAgT2JqZWN0LmFzc2lnbihjb2x1bW4sIHtcbiAgICAgIGNvbHVtbjogaSxcbiAgICAgIHJvdzogW1xuICAgICAgICB7IHBvc2l0aW9uOiBgYSR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgYiR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgYyR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgZCR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgZSR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgZiR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgZyR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgaCR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgaSR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgaiR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgXSxcbiAgICB9KTtcbiAgICBib2FyZC5wdXNoKGNvbHVtbik7XG4gIH1cbiAgcmV0dXJuIGJvYXJkO1xufVxuXG5jb25zdCBnYW1lQm9hcmQgPSAoKSA9PiAoe1xuICBib2FyZDogY3JlYXRlQm9hcmQoKSxcbiAgZmluZFNxdWFyZShjb2wsIHJvdykge1xuICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuYm9hcmRbcm93IC0gMV0ucm93LmZpbHRlcigob2JqKSA9PiB7XG4gICAgICByZXR1cm4gb2JqLnBvc2l0aW9uID09PSBgJHtjb2x9JHtyb3d9YDtcbiAgICB9KTtcbiAgICByZXR1cm4gc3F1YXJlO1xuICB9LFxuICBjaGVja1Bvc2l0aW9uKGNvbCwgcm93KSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgY29uc3Qgc3F1YXJlID0gdGhpcy5maW5kU3F1YXJlKGNvbCwgcm93KTtcbiAgICBjb25zdCBwb3NpdGlvbiA9IHNxdWFyZVswXS5wb3NpdGlvbjtcbiAgICBjb25zdCBoYXNTaGlwID0gc3F1YXJlWzBdLmhhc1NoaXA7XG4gICAgT2JqZWN0LmFzc2lnbihyZXN1bHQsIHsgcG9zaXRpb24sIGhhc1NoaXAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcbiAgc2hpcHM6IFtdLFxuICBwbGFjZVNoaXAoc3RhcnRDb2wsIGVuZENvbCwgc3RhcnRSb3csIGVuZFJvdywgbmFtZSkge1xuICAgIGxldCBsZW5ndGggPSAwO1xuICAgIGxldCBvY2N1cGllZFNxdWFyZXMgPSBbXTtcbiAgICBpZiAoc3RhcnRSb3cgIT09IGVuZFJvdykge1xuICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0Um93OyBpIDwgZW5kUm93ICsgMTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuZmluZFNxdWFyZShzdGFydENvbCwgaSk7XG4gICAgICAgIHNxdWFyZVswXS5oYXNTaGlwID0gdHJ1ZTtcbiAgICAgICAgbGVuZ3RoICs9IDE7XG4gICAgICAgIG9jY3VwaWVkU3F1YXJlcy5wdXNoKGAke3N0YXJ0Q29sfSR7aX1gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGN1cnJlbnRDb2wgPSBzdGFydENvbDtcbiAgICAgIHdoaWxlIChjdXJyZW50Q29sICE9PSBTdHJpbmcuZnJvbUNoYXJDb2RlKGVuZENvbC5jaGFyQ29kZUF0KDApICsgMSkpIHtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gdGhpcy5maW5kU3F1YXJlKGN1cnJlbnRDb2wsIHN0YXJ0Um93KTtcbiAgICAgICAgc3F1YXJlWzBdLmhhc1NoaXAgPSB0cnVlO1xuICAgICAgICBvY2N1cGllZFNxdWFyZXMucHVzaChgJHtjdXJyZW50Q29sfSR7c3RhcnRSb3d9YCk7XG4gICAgICAgIGN1cnJlbnRDb2wgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGN1cnJlbnRDb2wuY2hhckNvZGVBdCgwKSArIDEpO1xuICAgICAgICBsZW5ndGggKz0gMTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zaGlwcy5wdXNoKHtcbiAgICAgIHNxdWFyZXM6IG9jY3VwaWVkU3F1YXJlcyxcbiAgICAgIG5hbWUsXG4gICAgICBvYmo6IHNoaXAobGVuZ3RoKSxcbiAgICB9KTtcbiAgfSxcbiAgYXR0YWNrczogW10sXG4gIHRyYWNrQXR0YWNrKHBvc2l0aW9uLCBhdHRhY2tIaXQsIHNhbmtTaGlwKSB7XG4gICAgdGhpcy5hdHRhY2tzLnB1c2goeyBwb3NpdGlvbiwgYXR0YWNrSGl0LCBzYW5rU2hpcCB9KTtcbiAgfSxcbiAgYWxsU2hpcHNTdW5rKCkge1xuICAgIGlmICh0aGlzLnNoaXBzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuICAgIGxldCBzaGlwc1N1bmsgPSAwO1xuICAgIHRoaXMuYXR0YWNrcy5mb3JFYWNoKChhdHRhY2spID0+IHtcbiAgICAgIGlmIChhdHRhY2suc2Fua1NoaXApIHNoaXBzU3VuayArPSAxO1xuICAgIH0pO1xuICAgIGlmIChzaGlwc1N1bmsgPj0gdGhpcy5zaGlwcy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbiAgaXNSZXBlYXRlZEF0dGFjayhjb2wsIHJvdykge1xuICAgIGxldCByZXBlYXQgPSBmYWxzZTtcbiAgICB0aGlzLmF0dGFja3MuZm9yRWFjaCgoYXR0YWNrKSA9PiB7XG4gICAgICBpZiAoYXR0YWNrLnBvc2l0aW9uID09PSBgJHtjb2x9JHtyb3d9YCkge1xuICAgICAgICByZXBlYXQgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcGVhdDtcbiAgfSxcbiAgcmVjZWl2ZUF0dGFjayhjb2wsIHJvdykge1xuICAgIGlmICh0aGlzLmlzUmVwZWF0ZWRBdHRhY2soY29sLCByb3cpKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGxldCBhdHRhY2tlZFNoaXAgPSBmYWxzZTtcbiAgICB0aGlzLnNoaXBzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0uc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICAgICAgaWYgKHNxdWFyZSA9PT0gYCR7Y29sfSR7cm93fWApIGF0dGFja2VkU2hpcCA9IGl0ZW07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZiAoYXR0YWNrZWRTaGlwKSB7XG4gICAgICBhdHRhY2tlZFNoaXAub2JqLmhpdCgpO1xuICAgICAgdGhpcy50cmFja0F0dGFjayhgJHtjb2x9JHtyb3d9YCwgdHJ1ZSwgYXR0YWNrZWRTaGlwLm9iai5pc1N1bmsoKSk7XG4gICAgICByZXR1cm4gYXR0YWNrZWRTaGlwLm5hbWU7XG4gICAgfVxuICAgIHRoaXMudHJhY2tBdHRhY2soYCR7Y29sfSR7cm93fWAsIGZhbHNlLCBmYWxzZSk7XG4gICAgcmV0dXJuIGAke2NvbH0ke3Jvd31gO1xuICB9LFxufSk7XG5cbmV4cG9ydCB7IHNoaXAsIGdhbWVCb2FyZCB9O1xuIiwiaW1wb3J0IHsgZGlzcGxheUdhbWUsIGRpc3BsYXlHYW1lT3ZlciwgZGlzcGxheVNldHVwIH0gZnJvbSBcIi4vZGlzcGxheVwiO1xuaW1wb3J0IHsgZ2FtZUJvYXJkIH0gZnJvbSBcIi4vZ2FtZVwiO1xuaW1wb3J0IHsgY2hvb3NlU3F1YXJlLCByYW5kb21TaGlwQXJyYXkgfSBmcm9tIFwiLi9jb21wdXRlclwiO1xuaW1wb3J0IHsgc2V0QWN0aXZlU2hpcCB9IGZyb20gXCIuL3BsYWNlbWVudFwiO1xuXG5jb25zdCBwbGF5ZXJCb2FyZCA9IGdhbWVCb2FyZCgpO1xuY29uc3QgY29tcHV0ZXJCb2FyZCA9IGdhbWVCb2FyZCgpO1xubGV0IGdhbWVBY3RpdmUgPSB0cnVlO1xuXG5mdW5jdGlvbiBjcmVhdGVCb2FyZEZyb21BcnJheShzaGlwcywgYm9hcmQsIGJvYXJkVHlwZSkge1xuICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgbGV0IGZpcnN0ID0gdW5kZWZpbmVkO1xuICAgIGxldCBuYW1lID0gdW5kZWZpbmVkO1xuICAgIGxldCBsYXN0ID0gdW5kZWZpbmVkO1xuICAgIHNoaXAuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG5hbWUgPSBzcXVhcmUubmFtZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGZpcnN0ID09PSB1bmRlZmluZWQpIGZpcnN0ID0geyBjb2w6IHNxdWFyZS5jb2wsIHJvdzogc3F1YXJlLnJvdyB9O1xuICAgICAgbGFzdCA9IHsgY29sOiBzcXVhcmUuY29sLCByb3c6IHNxdWFyZS5yb3cgfTtcbiAgICAgIC8vIERpc3BsYXkgV2hlcmUgU2hpcHMgQXJlXG4gICAgICBpZiAoYm9hcmRUeXBlID09PSBcInBsYXllclwiKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudFxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1ib2FyZFwiKVxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHtzcXVhcmUuY29sfSR7c3F1YXJlLnJvd31gKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBib2FyZC5wbGFjZVNoaXAoZmlyc3QuY29sLCBsYXN0LmNvbCwgZmlyc3Qucm93LCBsYXN0LnJvdywgbmFtZSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpbml0KHBsYXllclNoaXBzLCBjb21wdXRlclNoaXBzKSB7XG4gIGRpc3BsYXlHYW1lKCk7XG4gIGNyZWF0ZUJvYXJkRnJvbUFycmF5KHBsYXllclNoaXBzLCBwbGF5ZXJCb2FyZCwgXCJwbGF5ZXJcIik7XG4gIGNyZWF0ZUJvYXJkRnJvbUFycmF5KGNvbXB1dGVyU2hpcHMsIGNvbXB1dGVyQm9hcmQsIFwiY29tcHV0ZXJcIik7XG59XG5cbmZ1bmN0aW9uIG1hcmtTcXVhcmUoYm9hcmQsIGNvbCwgcm93LCBib2FyZFR5cGUpIHtcbiAgYm9hcmQucmVjZWl2ZUF0dGFjayhjb2wsIHJvdyk7XG4gIGlmIChib2FyZC5hdHRhY2tzW2JvYXJkLmF0dGFja3MubGVuZ3RoIC0gMV0uYXR0YWNrSGl0KSB7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHtib2FyZFR5cGV9LWJvYXJkYClcbiAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHtjb2x9JHtyb3d9YClcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihgLiR7Ym9hcmRUeXBlfS1ib2FyZGApXG4gICAgICAucXVlcnlTZWxlY3RvcihgLiR7Y29sfSR7cm93fWApXG4gICAgICAuY2xhc3NMaXN0LmFkZChcIm1pc3NlZFwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlbmRHYW1lKHRleHQpIHtcbiAgZ2FtZUFjdGl2ZSA9IGZhbHNlO1xuICBkaXNwbGF5R2FtZU92ZXIodGV4dCk7XG59XG5cbi8vIEFkdmFuY2VzIEdhbWVcbmZ1bmN0aW9uIGhhbmRsZVNxdWFyZUNsaWNrKGNvbCwgcm93KSB7XG4gIGlmICghZ2FtZUFjdGl2ZSB8fCBjb21wdXRlckJvYXJkLmlzUmVwZWF0ZWRBdHRhY2soY29sLCByb3cpKSByZXR1cm47XG5cbiAgbWFya1NxdWFyZShjb21wdXRlckJvYXJkLCBjb2wsIHJvdywgXCJjb21wdXRlclwiKTtcbiAgaWYgKGNvbXB1dGVyQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICBlbmRHYW1lKFwiWW91IFdpbiFcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgY29tcHV0ZXJDaG9pY2UgPSBjaG9vc2VTcXVhcmUocGxheWVyQm9hcmQpO1xuICBtYXJrU3F1YXJlKHBsYXllckJvYXJkLCBjb21wdXRlckNob2ljZS5jb2wsIGNvbXB1dGVyQ2hvaWNlLnJvdywgXCJwbGF5ZXJcIik7XG4gIGlmIChwbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgIGVuZEdhbWUoXCJUaGUgQ29tcHV0ZXIgV29uXCIpO1xuICAgIHJldHVybjtcbiAgfVxufVxuXG5kaXNwbGF5U2V0dXAoKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBsYWNlbWVudENvbXBsZXRlXCIsIChlKSA9PiB7XG4gIGluaXQoZS5kZXRhaWwucGxheWVyQXJyYXksIHJhbmRvbVNoaXBBcnJheSgpKTtcbn0pO1xuXG5jb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhY2VtZW50U2hpcFwiKTtcbnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIC8vIFRvZ2dsZSBPZmZcbiAgICBpZiAoc2hpcC5jbGFzc0xpc3QuY29udGFpbnMoXCJzZWxlY3RlZFwiKSkge1xuICAgICAgc2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIik7XG4gICAgICBzZXRBY3RpdmVTaGlwKDAsIFwiXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBEZXNlbGVjdCBPdGhlciBTaGlwc1xuICAgIHNoaXBzLmZvckVhY2goKGFTaGlwKSA9PiBhU2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIikpO1xuICAgIC8vIFNlbGVjdCBTaGlwXG4gICAgc2hpcC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gICAgc2V0QWN0aXZlU2hpcChzaGlwLmNoaWxkcmVuLmxlbmd0aCwgc2hpcC5jbGFzc0xpc3RbMF0pO1xuICB9KTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVTcXVhcmVDbGljaztcbiIsImxldCBhY3RpdmVTaGlwTGVuZ3RoID0gMDtcbmxldCBhY3RpdmVTaGlwTmFtZSA9IFwiXCI7XG5sZXQgZGlyZWN0aW9uID0gXCJjb2xTcGFuXCI7XG5sZXQgcGxhY2VtZW50VmFsaWQgPSBmYWxzZTtcblxuZnVuY3Rpb24gc2V0QWN0aXZlU2hpcChsZW5ndGgsIG5hbWUpIHtcbiAgYWN0aXZlU2hpcExlbmd0aCA9IGxlbmd0aDtcbiAgYWN0aXZlU2hpcE5hbWUgPSBuYW1lO1xufVxuXG5mdW5jdGlvbiBjbGVhckhvdmVyZWQoKSB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaG92ZXJlZFwiKS5mb3JFYWNoKChob3ZlcmVkKSA9PiB7XG4gICAgaG92ZXJlZC5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJlZFwiKTtcbiAgfSk7XG59XG5cbmxldCBzdGFydENvbCA9IFwiXCI7XG5sZXQgc3RhcnRSb3cgPSBcIlwiO1xuXG5mdW5jdGlvbiB0b2dnbGVEaXJlY3Rpb24oKSB7XG4gIGRpcmVjdGlvbiA9PT0gXCJyb3dTcGFuXCIgPyAoZGlyZWN0aW9uID0gXCJjb2xTcGFuXCIpIDogKGRpcmVjdGlvbiA9IFwicm93U3BhblwiKTtcbiAgZGlzcGxheUhvdmVyKHN0YXJ0Q29sLCBzdGFydFJvdyk7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlIb3Zlcihjb2wsIHJvdykge1xuICBpZiAoY29sID09PSBcIlwiIHx8IHJvdyA9PT0gXCJcIikgcmV0dXJuO1xuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RlZFwiKSA9PT0gbnVsbCkgcmV0dXJuO1xuICBzdGFydENvbCA9IGNvbDtcbiAgbGV0IGN1cnJlbnRDb2wgPSBjb2w7XG4gIHN0YXJ0Um93ID0gcm93O1xuICBsZXQgY3VycmVudFJvdyA9IHJvdztcbiAgbGV0IGl0ZXJhdGlvbnNMZWZ0ID0gYWN0aXZlU2hpcExlbmd0aDtcblxuICBjbGVhckhvdmVyZWQoKTtcblxuICB3aGlsZSAoaXRlcmF0aW9uc0xlZnQgPiAwKSB7XG4gICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7Y3VycmVudENvbH0ke2N1cnJlbnRSb3d9YCk7XG4gICAgaWYgKHNxdWFyZSA9PT0gbnVsbCkge1xuICAgICAgcGxhY2VtZW50VmFsaWQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoc3F1YXJlLmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIikpIHtcbiAgICAgIHBsYWNlbWVudFZhbGlkID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcImhvdmVyZWRcIik7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJyb3dTcGFuXCIpIGN1cnJlbnRSb3cgKz0gMTtcbiAgICBlbHNlIGN1cnJlbnRDb2wgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGN1cnJlbnRDb2wuY2hhckNvZGVBdCgwKSArIDEpO1xuXG4gICAgaXRlcmF0aW9uc0xlZnQgLT0gMTtcbiAgfVxuXG4gIGlmIChpdGVyYXRpb25zTGVmdCA9PT0gMCkgcGxhY2VtZW50VmFsaWQgPSB0cnVlO1xufVxuXG5jb25zdCBwbGF5ZXJBcnJheSA9IFtdO1xuXG5mdW5jdGlvbiBwbGFjZVNoaXAoY29sLCByb3cpIHtcbiAgaWYgKCFwbGFjZW1lbnRWYWxpZCkgcmV0dXJuO1xuICBsZXQgc2hpcEFycmF5ID0gW3sgbmFtZTogYWN0aXZlU2hpcE5hbWUgfV07XG4gIGxldCBjdXJyZW50Q29sID0gY29sO1xuICBsZXQgY3VycmVudFJvdyA9IHJvdztcbiAgbGV0IGl0ZXJhdGlvbnNMZWZ0ID0gYWN0aXZlU2hpcExlbmd0aDtcbiAgd2hpbGUgKGl0ZXJhdGlvbnNMZWZ0ID4gMCkge1xuICAgIHNoaXBBcnJheS5wdXNoKHsgY29sOiBjdXJyZW50Q29sLCByb3c6IGN1cnJlbnRSb3cgfSk7XG4gICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7Y3VycmVudENvbH0ke2N1cnJlbnRSb3d9YCk7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgIGlmIChkaXJlY3Rpb24gPT09IFwicm93U3BhblwiKSBjdXJyZW50Um93ICs9IDE7XG4gICAgZWxzZSBjdXJyZW50Q29sID0gU3RyaW5nLmZyb21DaGFyQ29kZShjdXJyZW50Q29sLmNoYXJDb2RlQXQoMCkgKyAxKTtcbiAgICBpdGVyYXRpb25zTGVmdCAtPSAxO1xuICB9XG4gIHBsYXllckFycmF5LnB1c2goc2hpcEFycmF5KTtcblxuICBjbGVhckhvdmVyZWQoKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RlZFwiKS5yZW1vdmUoKTtcblxuICAvLyBJZiBhbGwgc2hpcHMgYXJlIHBsYWNlZCBpbml0IHRoZSBnYW1lXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYWNlbWVudFNoaXBcIikgPT09IG51bGwpIHtcbiAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudChcInBsYWNlbWVudENvbXBsZXRlXCIsIHtcbiAgICAgIGRldGFpbDogeyBwbGF5ZXJBcnJheSB9LFxuICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICBjb21wb3NlZDogZmFsc2UsXG4gICAgfSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWNvbnRhaW5lcl1cIikuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH1cbn1cblxuZXhwb3J0IHsgc2V0QWN0aXZlU2hpcCwgdG9nZ2xlRGlyZWN0aW9uLCBkaXNwbGF5SG92ZXIsIHBsYWNlU2hpcCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJnZXRQb3NzaWJsZUNob2ljZXMiLCJib2FyZCIsInBvc3NpYmxlU3F1YXJlcyIsImkiLCJqIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiY2hhckNvZGVBdCIsImlzUmVwZWF0ZWRBdHRhY2siLCJwdXNoIiwicm93IiwiY29sIiwiY2hvb3NlU3F1YXJlIiwic3F1YXJlcyIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImxlbmd0aCIsInJhbmRvbVNoaXBBcnJheSIsInNoaXBMZW5ndGhzIiwic2hpcE5hbWVzIiwic2hpcHMiLCJfbG9vcCIsInZhbGlkUGxhY2VtZW50IiwiZGlyZWN0aW9uIiwic3RhcnRSb3ciLCJjZWlsIiwic3RhcnRDb2wiLCJjdXJyZW50U2hpcCIsIm5hbWUiLCJjdXJyZW50Q29sIiwiY3VycmVudFJvdyIsImZvckVhY2giLCJzaGlwIiwicG9wIiwiaGFuZGxlU3F1YXJlQ2xpY2siLCJkaXNwbGF5SG92ZXIiLCJwbGFjZVNoaXAiLCJ0b2dnbGVEaXJlY3Rpb24iLCJjb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVCb2FyZCIsImNyZWF0ZUVsZW1lbnQiLCJfbG9vcDIiLCJzcXVhcmUiLCJjbGFzc0xpc3QiLCJhZGQiLCJjb25jYXQiLCJhZGRFdmVudExpc3RlbmVyIiwicGFyZW50RWxlbWVudCIsImNvbnRhaW5zIiwiYXBwZW5kQ2hpbGQiLCJyZXNldCIsInRleHRDb250ZW50IiwiY3JlYXRlSGVhZGVyIiwiaGVhZGVyIiwiY3JlYXRlRm9vdGVyIiwiZm9vdGVyIiwiY3JlYXRlVGl0bGUiLCJ0ZXh0IiwidGl0bGUiLCJkaXNwbGF5R2FtZSIsInNlY3Rpb24iLCJjb21wdXRlclRpdGxlIiwicGxheWVyVGl0bGUiLCJjb21wdXRlckJvYXJkIiwicGxheWVyQm9hcmQiLCJkaXNwbGF5R2FtZU92ZXIiLCJwb3BVcCIsImdhbWVPdmVyVGV4dCIsInJlcGxheUJ1dHRvbiIsIm92ZXJsYXkiLCJjcmVhdGVTaGlwIiwic3F1YXJlQW1vdW50IiwiY2xhc3NOYW1lIiwiZGlzcGxheVNldHVwIiwiYnV0dG9ucyIsInJvdGF0ZUJ1dHRvbiIsIndpbmRvdyIsImUiLCJrZXkiLCJzaGlwc0NvbnRhaW5lciIsImFpcmNyYWZ0Q2FycmllciIsImJhdHRsZXNoaXAiLCJzdWJtYXJpbmUiLCJkZXN0cm95ZXIiLCJwYXRyb2xCb2F0IiwibGVuIiwiaGl0cyIsImhpdCIsImlzU3VuayIsImNvbHVtbiIsIk9iamVjdCIsImFzc2lnbiIsInBvc2l0aW9uIiwiaGFzU2hpcCIsImdhbWVCb2FyZCIsImZpbmRTcXVhcmUiLCJmaWx0ZXIiLCJvYmoiLCJjaGVja1Bvc2l0aW9uIiwicmVzdWx0IiwiZW5kQ29sIiwiZW5kUm93Iiwib2NjdXBpZWRTcXVhcmVzIiwiYXR0YWNrcyIsInRyYWNrQXR0YWNrIiwiYXR0YWNrSGl0Iiwic2Fua1NoaXAiLCJhbGxTaGlwc1N1bmsiLCJzaGlwc1N1bmsiLCJhdHRhY2siLCJyZXBlYXQiLCJyZWNlaXZlQXR0YWNrIiwidW5kZWZpbmVkIiwiYXR0YWNrZWRTaGlwIiwiaXRlbSIsInNldEFjdGl2ZVNoaXAiLCJnYW1lQWN0aXZlIiwiY3JlYXRlQm9hcmRGcm9tQXJyYXkiLCJib2FyZFR5cGUiLCJmaXJzdCIsImxhc3QiLCJlbGVtZW50IiwiaW5pdCIsInBsYXllclNoaXBzIiwiY29tcHV0ZXJTaGlwcyIsIm1hcmtTcXVhcmUiLCJlbmRHYW1lIiwiY29tcHV0ZXJDaG9pY2UiLCJkZXRhaWwiLCJwbGF5ZXJBcnJheSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZW1vdmUiLCJhU2hpcCIsImNoaWxkcmVuIiwiYWN0aXZlU2hpcExlbmd0aCIsImFjdGl2ZVNoaXBOYW1lIiwicGxhY2VtZW50VmFsaWQiLCJjbGVhckhvdmVyZWQiLCJob3ZlcmVkIiwiaXRlcmF0aW9uc0xlZnQiLCJzaGlwQXJyYXkiLCJldmVudCIsIkN1c3RvbUV2ZW50IiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJjb21wb3NlZCIsImRpc3BhdGNoRXZlbnQiXSwic291cmNlUm9vdCI6IiJ9
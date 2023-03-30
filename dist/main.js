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
  var overlay = document.createElement("div");
  overlay.classList.add("overlay");
  popUp.appendChild(gameOverText);
  popUp.appendChild(replayButton);
  container.appendChild(overlay);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0Esa0JBQWtCQSxDQUFDQyxLQUFLLEVBQUU7RUFDakMsSUFBTUMsZUFBZSxHQUFHLEVBQUU7RUFDMUIsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsRUFBRSxFQUFFQSxDQUFDLEVBQUUsRUFBRTtJQUMzQixLQUFLLElBQUlDLENBQUMsR0FBRyxHQUFHLEVBQUVBLENBQUMsS0FBSyxHQUFHLEVBQUVBLENBQUMsR0FBR0MsTUFBTSxDQUFDQyxZQUFZLENBQUNGLENBQUMsQ0FBQ0csVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO01BQ3pFLElBQUksQ0FBQ04sS0FBSyxDQUFDTyxnQkFBZ0IsQ0FBQ0osQ0FBQyxFQUFFRCxDQUFDLENBQUMsRUFDL0JELGVBQWUsQ0FBQ08sSUFBSSxDQUFDO1FBQUVDLEdBQUcsRUFBRVAsQ0FBQztRQUFFUSxHQUFHLEVBQUVQO01BQUUsQ0FBQyxDQUFDO0lBQzVDO0VBQ0Y7RUFDQSxPQUFPRixlQUFlO0FBQ3hCO0FBRUEsU0FBU1UsWUFBWUEsQ0FBQ1gsS0FBSyxFQUFFO0VBQzNCLElBQU1ZLE9BQU8sR0FBR2Isa0JBQWtCLENBQUNDLEtBQUssQ0FBQztFQUN6QyxPQUFPWSxPQUFPLENBQUNDLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sRUFBRSxHQUFHSCxPQUFPLENBQUNJLE1BQU0sQ0FBQyxDQUFDO0FBQzVEO0FBRUEsU0FBU0MsZUFBZUEsQ0FBQSxFQUFHO0VBQ3pCLElBQU1DLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbkMsSUFBTUMsU0FBUyxHQUFHLENBQ2hCLGFBQWEsRUFDYixXQUFXLEVBQ1gsV0FBVyxFQUNYLFlBQVksRUFDWixrQkFBa0IsQ0FDbkI7RUFDRCxJQUFNQyxLQUFLLEdBQUcsRUFBRTtFQUFDLElBQUFDLEtBQUEsWUFBQUEsTUFBQSxFQUNjO0lBQzdCLElBQUlDLGNBQWMsR0FBRyxJQUFJO0lBQ3pCLElBQU1DLFNBQVMsR0FBR1YsSUFBSSxDQUFDRSxNQUFNLEVBQUUsR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLFNBQVM7SUFFN0QsSUFBTVMsUUFBUSxHQUFHWCxJQUFJLENBQUNZLElBQUksQ0FBQ1osSUFBSSxDQUFDRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDOUMsSUFBTVcsUUFBUSxHQUFHdEIsTUFBTSxDQUFDQyxZQUFZLENBQUMsRUFBRSxHQUFHUSxJQUFJLENBQUNZLElBQUksQ0FBQ1osSUFBSSxDQUFDRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUV4RSxJQUFNWSxXQUFXLEdBQUcsQ0FBQztNQUFFQyxJQUFJLEVBQUVULFNBQVMsQ0FBQ0EsU0FBUyxDQUFDSCxNQUFNLEdBQUcsQ0FBQztJQUFFLENBQUMsQ0FBQztJQUUvRCxJQUFJYSxVQUFVLEdBQUdILFFBQVE7SUFDekIsSUFBSUksVUFBVSxHQUFHTixRQUFRO0lBRXpCLEtBQUssSUFBSXRCLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR2dCLFdBQVcsQ0FBQ0EsV0FBVyxDQUFDRixNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUVkLENBQUMsRUFBRSxFQUFFO01BQzVEO01BQ0EsSUFBSTRCLFVBQVUsS0FBSyxFQUFFLEVBQUU7UUFDckJSLGNBQWMsR0FBRyxLQUFLO1FBQ3RCO01BQ0Y7TUFDQSxJQUFJTyxVQUFVLEtBQUssR0FBRyxFQUFFO1FBQ3RCUCxjQUFjLEdBQUcsS0FBSztRQUN0QjtNQUNGOztNQUVBO01BQ0FGLEtBQUssQ0FBQ1csT0FBTyxDQUFDLFVBQUNDLElBQUksRUFBSztRQUN0QixLQUFLLElBQUk3QixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUc2QixJQUFJLENBQUNoQixNQUFNLEVBQUViLENBQUMsRUFBRSxFQUFFO1VBQ3BDLElBQUkwQixVQUFVLEtBQUtHLElBQUksQ0FBQzdCLENBQUMsQ0FBQyxDQUFDTyxHQUFHLElBQUlvQixVQUFVLEtBQUtFLElBQUksQ0FBQzdCLENBQUMsQ0FBQyxDQUFDTSxHQUFHLEVBQUU7WUFDNURhLGNBQWMsR0FBRyxLQUFLO1lBQ3RCO1VBQ0Y7UUFDRjtNQUNGLENBQUMsQ0FBQztNQUVGLElBQUksQ0FBQ0EsY0FBYyxFQUFFO01BQ3JCSyxXQUFXLENBQUNuQixJQUFJLENBQUM7UUFBRUUsR0FBRyxFQUFFbUIsVUFBVTtRQUFFcEIsR0FBRyxFQUFFcUI7TUFBVyxDQUFDLENBQUM7TUFDdEQ7TUFDQSxJQUFJUCxTQUFTLEtBQUssU0FBUyxFQUFFTyxVQUFVLElBQUksQ0FBQyxDQUFDLEtBQ3hDRCxVQUFVLEdBQUd6QixNQUFNLENBQUNDLFlBQVksQ0FBQ3dCLFVBQVUsQ0FBQ3ZCLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckU7SUFFQSxJQUFJZ0IsY0FBYyxFQUFFO01BQ2xCRixLQUFLLENBQUNaLElBQUksQ0FBQ21CLFdBQVcsQ0FBQztNQUN2QlQsV0FBVyxDQUFDZSxHQUFHLEVBQUU7TUFDakJkLFNBQVMsQ0FBQ2MsR0FBRyxFQUFFO0lBQ2pCO0VBQ0YsQ0FBQztFQTdDRCxPQUFPZixXQUFXLENBQUNGLE1BQU0sR0FBRyxDQUFDO0lBQUFLLEtBQUE7RUFBQTtFQThDN0IsT0FBT0QsS0FBSztBQUNkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6RXdDO0FBQ3hDLElBQU1lLFNBQVMsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsa0JBQWtCLENBQUM7QUFFNUQsU0FBU0MsV0FBV0EsQ0FBQSxFQUFHO0VBQ3JCLElBQU10QyxLQUFLLEdBQUdvQyxRQUFRLENBQUNHLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFBQyxJQUFBbEIsS0FBQSxZQUFBQSxNQUFBbkIsQ0FBQSxFQUNaO0lBQUEsSUFBQXNDLE1BQUEsWUFBQUEsT0FBQXJDLENBQUEsRUFDNkM7TUFDekUsSUFBTXNDLE1BQU0sR0FBR0wsUUFBUSxDQUFDRyxhQUFhLENBQUMsUUFBUSxDQUFDO01BQy9DRSxNQUFNLENBQUNDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFFBQVEsQ0FBQztNQUM5QkYsTUFBTSxDQUFDQyxTQUFTLENBQUNDLEdBQUcsSUFBQUMsTUFBQSxDQUFJekMsQ0FBQyxFQUFBeUMsTUFBQSxDQUFHMUMsQ0FBQyxFQUFHO01BQ2hDdUMsTUFBTSxDQUFDSSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtRQUNyQyxJQUFJSixNQUFNLENBQUNLLGFBQWEsQ0FBQ0osU0FBUyxDQUFDSyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFDN0RiLGtEQUFpQixDQUFDL0IsQ0FBQyxFQUFFRCxDQUFDLENBQUM7TUFDekIsQ0FBQyxDQUFDO01BQ0ZGLEtBQUssQ0FBQzBDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE9BQU8sQ0FBQztNQUM1QjNDLEtBQUssQ0FBQ2dELFdBQVcsQ0FBQ1AsTUFBTSxDQUFDO0lBQzNCLENBQUM7SUFWRCxLQUFLLElBQUl0QyxDQUFDLEdBQUcsR0FBRyxFQUFFQSxDQUFDLEtBQUssR0FBRyxFQUFFQSxDQUFDLEdBQUdDLE1BQU0sQ0FBQ0MsWUFBWSxDQUFDRixDQUFDLENBQUNHLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7TUFBQWtDLE1BQUEsQ0FBQXJDLENBQUE7SUFBQTtFQVczRSxDQUFDO0VBWkQsS0FBSyxJQUFJRCxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsRUFBRSxFQUFFQSxDQUFDLElBQUksQ0FBQztJQUFBbUIsS0FBQSxDQUFBbkIsQ0FBQTtFQUFBO0VBYTlCLE9BQU9GLEtBQUs7QUFDZDtBQUVBLFNBQVNpRCxLQUFLQSxDQUFBLEVBQUc7RUFDZmQsU0FBUyxDQUFDZSxXQUFXLEdBQUcsRUFBRTtBQUM1QjtBQUVBLFNBQVNDLFlBQVlBLENBQUEsRUFBRztFQUN0QixJQUFNQyxNQUFNLEdBQUdoQixRQUFRLENBQUNHLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFDL0NhLE1BQU0sQ0FBQ0YsV0FBVyxHQUFHLFlBQVk7RUFDakMsT0FBT0UsTUFBTTtBQUNmO0FBRUEsU0FBU0MsWUFBWUEsQ0FBQSxFQUFHO0VBQ3RCLElBQU1DLE1BQU0sR0FBR2xCLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLFFBQVEsQ0FBQztFQUMvQ2UsTUFBTSxDQUFDSixXQUFXLEdBQUcscUJBQXFCO0VBQzFDLE9BQU9JLE1BQU07QUFDZjtBQUVBLFNBQVNDLFdBQVdBLENBQUNDLElBQUksRUFBRTtFQUN6QixJQUFNQyxLQUFLLEdBQUdyQixRQUFRLENBQUNHLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDM0NrQixLQUFLLENBQUNmLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE9BQU8sQ0FBQztFQUM1QmMsS0FBSyxDQUFDUCxXQUFXLEdBQUdNLElBQUk7RUFDeEIsT0FBT0MsS0FBSztBQUNkO0FBRUEsU0FBU0MsV0FBV0EsQ0FBQSxFQUFHO0VBQ3JCVCxLQUFLLEVBQUU7RUFFUCxJQUFNRyxNQUFNLEdBQUdELFlBQVksRUFBRTtFQUM3QixJQUFNRyxNQUFNLEdBQUdELFlBQVksRUFBRTtFQUM3QixJQUFNTSxPQUFPLEdBQUd2QixRQUFRLENBQUNHLGFBQWEsQ0FBQyxTQUFTLENBQUM7RUFDakQsSUFBTXFCLGFBQWEsR0FBR0wsV0FBVyxDQUFDLGtCQUFrQixDQUFDO0VBQ3JELElBQU1NLFdBQVcsR0FBR04sV0FBVyxDQUFDLFlBQVksQ0FBQztFQUM3QyxJQUFNTyxhQUFhLEdBQUd4QixXQUFXLEVBQUU7RUFDbkN3QixhQUFhLENBQUNwQixTQUFTLENBQUNDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztFQUM3QyxJQUFNb0IsV0FBVyxHQUFHekIsV0FBVyxFQUFFO0VBQ2pDeUIsV0FBVyxDQUFDckIsU0FBUyxDQUFDQyxHQUFHLENBQUMsY0FBYyxDQUFDO0VBRXpDZ0IsT0FBTyxDQUFDWCxXQUFXLENBQUNZLGFBQWEsQ0FBQztFQUNsQ0QsT0FBTyxDQUFDWCxXQUFXLENBQUNjLGFBQWEsRUFBRSxJQUFJLENBQUM7RUFDeENILE9BQU8sQ0FBQ1gsV0FBVyxDQUFDYSxXQUFXLENBQUM7RUFDaENGLE9BQU8sQ0FBQ1gsV0FBVyxDQUFDZSxXQUFXLENBQUM7RUFFaEM1QixTQUFTLENBQUNhLFdBQVcsQ0FBQ0ksTUFBTSxDQUFDO0VBQzdCakIsU0FBUyxDQUFDYSxXQUFXLENBQUNXLE9BQU8sQ0FBQztFQUM5QnhCLFNBQVMsQ0FBQ2EsV0FBVyxDQUFDTSxNQUFNLENBQUM7QUFDL0I7QUFFQSxTQUFTVSxlQUFlQSxDQUFDUixJQUFJLEVBQUU7RUFDN0IsSUFBTVMsS0FBSyxHQUFHN0IsUUFBUSxDQUFDRyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQzNDMEIsS0FBSyxDQUFDdkIsU0FBUyxDQUFDQyxHQUFHLENBQUMsUUFBUSxDQUFDO0VBRTdCLElBQU11QixZQUFZLEdBQUc5QixRQUFRLENBQUNHLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDbEQyQixZQUFZLENBQUN4QixTQUFTLENBQUNDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztFQUM1Q3VCLFlBQVksQ0FBQ2hCLFdBQVcsR0FBR00sSUFBSTtFQUUvQixJQUFNVyxZQUFZLEdBQUcvQixRQUFRLENBQUNHLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFDckQ0QixZQUFZLENBQUNqQixXQUFXLEdBQUcsUUFBUTtFQUNuQ2lCLFlBQVksQ0FBQ3pCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGVBQWUsQ0FBQztFQUUzQyxJQUFNeUIsT0FBTyxHQUFHaEMsUUFBUSxDQUFDRyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQzdDNkIsT0FBTyxDQUFDMUIsU0FBUyxDQUFDQyxHQUFHLENBQUMsU0FBUyxDQUFDO0VBRWhDc0IsS0FBSyxDQUFDakIsV0FBVyxDQUFDa0IsWUFBWSxDQUFDO0VBQy9CRCxLQUFLLENBQUNqQixXQUFXLENBQUNtQixZQUFZLENBQUM7RUFFL0JoQyxTQUFTLENBQUNhLFdBQVcsQ0FBQ29CLE9BQU8sQ0FBQztFQUM5QmpDLFNBQVMsQ0FBQ2EsV0FBVyxDQUFDaUIsS0FBSyxDQUFDO0FBQzlCO0FBRUEsU0FBU0ksWUFBWUEsQ0FBQSxFQUFHO0VBQ3RCLElBQU1qQixNQUFNLEdBQUdELFlBQVksRUFBRTtFQUM3QixJQUFNRyxNQUFNLEdBQUdELFlBQVksRUFBRTtFQUM3QixJQUFNTSxPQUFPLEdBQUd2QixRQUFRLENBQUNHLGFBQWEsQ0FBQyxTQUFTLENBQUM7RUFDakQsSUFBTWtCLEtBQUssR0FBR0YsV0FBVyxDQUFDLG1CQUFtQixDQUFDO0VBQzlDLElBQU12RCxLQUFLLEdBQUdzQyxXQUFXLEVBQUU7RUFFM0JxQixPQUFPLENBQUNYLFdBQVcsQ0FBQ1MsS0FBSyxDQUFDO0VBQzFCRSxPQUFPLENBQUNYLFdBQVcsQ0FBQ2hELEtBQUssQ0FBQztFQUUxQm1DLFNBQVMsQ0FBQ2EsV0FBVyxDQUFDSSxNQUFNLENBQUM7RUFDN0JqQixTQUFTLENBQUNhLFdBQVcsQ0FBQ1csT0FBTyxDQUFDO0VBQzlCeEIsU0FBUyxDQUFDYSxXQUFXLENBQUNNLE1BQU0sQ0FBQztBQUMvQjs7Ozs7Ozs7Ozs7Ozs7OztBQ3RHQSxJQUFNdEIsSUFBSSxHQUFHLFNBQVBBLElBQUlBLENBQUlzQyxHQUFHO0VBQUEsT0FBTTtJQUNyQnRELE1BQU0sRUFBRXNELEdBQUc7SUFDWEMsSUFBSSxFQUFFLENBQUM7SUFDUEMsR0FBRyxXQUFBQSxJQUFBLEVBQUc7TUFDSixJQUFJLENBQUNELElBQUksSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDREUsTUFBTSxXQUFBQSxPQUFBLEVBQUc7TUFDUCxJQUFJLElBQUksQ0FBQ0YsSUFBSSxLQUFLLElBQUksQ0FBQ3ZELE1BQU0sRUFBRSxPQUFPLElBQUk7TUFDMUMsT0FBTyxLQUFLO0lBQ2Q7RUFDRixDQUFDO0FBQUEsQ0FBQztBQUVGLFNBQVNzQixXQUFXQSxDQUFBLEVBQUc7RUFDckIsSUFBTXRDLEtBQUssR0FBRyxFQUFFO0VBQ2hCLEtBQUssSUFBSUUsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLEVBQUUsRUFBRUEsQ0FBQyxFQUFFLEVBQUU7SUFDM0IsSUFBTXdFLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDakJDLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDRixNQUFNLEVBQUU7TUFDcEJBLE1BQU0sRUFBRXhFLENBQUM7TUFDVE8sR0FBRyxFQUFFLENBQ0g7UUFBRW9FLFFBQVEsTUFBQWpDLE1BQUEsQ0FBTTFDLENBQUMsQ0FBRTtRQUFFNEUsT0FBTyxFQUFFO01BQU0sQ0FBQyxFQUNyQztRQUFFRCxRQUFRLE1BQUFqQyxNQUFBLENBQU0xQyxDQUFDLENBQUU7UUFBRTRFLE9BQU8sRUFBRTtNQUFNLENBQUMsRUFDckM7UUFBRUQsUUFBUSxNQUFBakMsTUFBQSxDQUFNMUMsQ0FBQyxDQUFFO1FBQUU0RSxPQUFPLEVBQUU7TUFBTSxDQUFDLEVBQ3JDO1FBQUVELFFBQVEsTUFBQWpDLE1BQUEsQ0FBTTFDLENBQUMsQ0FBRTtRQUFFNEUsT0FBTyxFQUFFO01BQU0sQ0FBQyxFQUNyQztRQUFFRCxRQUFRLE1BQUFqQyxNQUFBLENBQU0xQyxDQUFDLENBQUU7UUFBRTRFLE9BQU8sRUFBRTtNQUFNLENBQUMsRUFDckM7UUFBRUQsUUFBUSxNQUFBakMsTUFBQSxDQUFNMUMsQ0FBQyxDQUFFO1FBQUU0RSxPQUFPLEVBQUU7TUFBTSxDQUFDLEVBQ3JDO1FBQUVELFFBQVEsTUFBQWpDLE1BQUEsQ0FBTTFDLENBQUMsQ0FBRTtRQUFFNEUsT0FBTyxFQUFFO01BQU0sQ0FBQyxFQUNyQztRQUFFRCxRQUFRLE1BQUFqQyxNQUFBLENBQU0xQyxDQUFDLENBQUU7UUFBRTRFLE9BQU8sRUFBRTtNQUFNLENBQUMsRUFDckM7UUFBRUQsUUFBUSxNQUFBakMsTUFBQSxDQUFNMUMsQ0FBQyxDQUFFO1FBQUU0RSxPQUFPLEVBQUU7TUFBTSxDQUFDLEVBQ3JDO1FBQUVELFFBQVEsTUFBQWpDLE1BQUEsQ0FBTTFDLENBQUMsQ0FBRTtRQUFFNEUsT0FBTyxFQUFFO01BQU0sQ0FBQztJQUV6QyxDQUFDLENBQUM7SUFDRjlFLEtBQUssQ0FBQ1EsSUFBSSxDQUFDa0UsTUFBTSxDQUFDO0VBQ3BCO0VBQ0EsT0FBTzFFLEtBQUs7QUFDZDtBQUVBLElBQU0rRSxTQUFTLEdBQUcsU0FBWkEsU0FBU0EsQ0FBQTtFQUFBLE9BQVU7SUFDdkIvRSxLQUFLLEVBQUVzQyxXQUFXLEVBQUU7SUFDcEIwQyxVQUFVLFdBQUFBLFdBQUN0RSxHQUFHLEVBQUVELEdBQUcsRUFBRTtNQUNuQixJQUFNZ0MsTUFBTSxHQUFHLElBQUksQ0FBQ3pDLEtBQUssQ0FBQ1MsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDQSxHQUFHLENBQUN3RSxNQUFNLENBQUMsVUFBQ0MsR0FBRyxFQUFLO1FBQ3JELE9BQU9BLEdBQUcsQ0FBQ0wsUUFBUSxRQUFBakMsTUFBQSxDQUFRbEMsR0FBRyxFQUFBa0MsTUFBQSxDQUFHbkMsR0FBRyxDQUFFO01BQ3hDLENBQUMsQ0FBQztNQUNGLE9BQU9nQyxNQUFNO0lBQ2YsQ0FBQztJQUNEMEMsYUFBYSxXQUFBQSxjQUFDekUsR0FBRyxFQUFFRCxHQUFHLEVBQUU7TUFDdEIsSUFBTTJFLE1BQU0sR0FBRyxDQUFDLENBQUM7TUFDakIsSUFBTTNDLE1BQU0sR0FBRyxJQUFJLENBQUN1QyxVQUFVLENBQUN0RSxHQUFHLEVBQUVELEdBQUcsQ0FBQztNQUN4QyxJQUFNb0UsUUFBUSxHQUFHcEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDb0MsUUFBUTtNQUNuQyxJQUFNQyxPQUFPLEdBQUdyQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUNxQyxPQUFPO01BQ2pDSCxNQUFNLENBQUNDLE1BQU0sQ0FBQ1EsTUFBTSxFQUFFO1FBQUVQLFFBQVEsRUFBUkEsUUFBUTtRQUFFQyxPQUFPLEVBQVBBO01BQVEsQ0FBQyxDQUFDO01BQzVDLE9BQU9NLE1BQU07SUFDZixDQUFDO0lBQ0RoRSxLQUFLLEVBQUUsRUFBRTtJQUNUaUUsU0FBUyxXQUFBQSxVQUFDM0QsUUFBUSxFQUFFNEQsTUFBTSxFQUFFOUQsUUFBUSxFQUFFK0QsTUFBTSxFQUFFM0QsSUFBSSxFQUFFO01BQ2xELElBQUlaLE1BQU0sR0FBRyxDQUFDO01BQ2QsSUFBSXdFLGVBQWUsR0FBRyxFQUFFO01BQ3hCLElBQUloRSxRQUFRLEtBQUsrRCxNQUFNLEVBQUU7UUFDdkIsS0FBSyxJQUFJckYsQ0FBQyxHQUFHc0IsUUFBUSxFQUFFdEIsQ0FBQyxHQUFHcUYsTUFBTSxHQUFHLENBQUMsRUFBRXJGLENBQUMsRUFBRSxFQUFFO1VBQzFDLElBQU11QyxNQUFNLEdBQUcsSUFBSSxDQUFDdUMsVUFBVSxDQUFDdEQsUUFBUSxFQUFFeEIsQ0FBQyxDQUFDO1VBQzNDdUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDcUMsT0FBTyxHQUFHLElBQUk7VUFDeEI5RCxNQUFNLElBQUksQ0FBQztVQUNYd0UsZUFBZSxDQUFDaEYsSUFBSSxJQUFBb0MsTUFBQSxDQUFJbEIsUUFBUSxFQUFBa0IsTUFBQSxDQUFHMUMsQ0FBQyxFQUFHO1FBQ3pDO01BQ0YsQ0FBQyxNQUFNO1FBQ0wsSUFBSTJCLFVBQVUsR0FBR0gsUUFBUTtRQUN6QixPQUFPRyxVQUFVLEtBQUt6QixNQUFNLENBQUNDLFlBQVksQ0FBQ2lGLE1BQU0sQ0FBQ2hGLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtVQUNuRSxJQUFNbUMsT0FBTSxHQUFHLElBQUksQ0FBQ3VDLFVBQVUsQ0FBQ25ELFVBQVUsRUFBRUwsUUFBUSxDQUFDO1VBQ3BEaUIsT0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDcUMsT0FBTyxHQUFHLElBQUk7VUFDeEJVLGVBQWUsQ0FBQ2hGLElBQUksSUFBQW9DLE1BQUEsQ0FBSWYsVUFBVSxFQUFBZSxNQUFBLENBQUdwQixRQUFRLEVBQUc7VUFDaERLLFVBQVUsR0FBR3pCLE1BQU0sQ0FBQ0MsWUFBWSxDQUFDd0IsVUFBVSxDQUFDdkIsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztVQUM5RFUsTUFBTSxJQUFJLENBQUM7UUFDYjtNQUNGO01BQ0EsSUFBSSxDQUFDSSxLQUFLLENBQUNaLElBQUksQ0FBQztRQUNkSSxPQUFPLEVBQUU0RSxlQUFlO1FBQ3hCNUQsSUFBSSxFQUFKQSxJQUFJO1FBQ0pzRCxHQUFHLEVBQUVsRCxJQUFJLENBQUNoQixNQUFNO01BQ2xCLENBQUMsQ0FBQztJQUNKLENBQUM7SUFDRHlFLE9BQU8sRUFBRSxFQUFFO0lBQ1hDLFdBQVcsV0FBQUEsWUFBQ2IsUUFBUSxFQUFFYyxTQUFTLEVBQUVDLFFBQVEsRUFBRTtNQUN6QyxJQUFJLENBQUNILE9BQU8sQ0FBQ2pGLElBQUksQ0FBQztRQUFFcUUsUUFBUSxFQUFSQSxRQUFRO1FBQUVjLFNBQVMsRUFBVEEsU0FBUztRQUFFQyxRQUFRLEVBQVJBO01BQVMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFDREMsWUFBWSxXQUFBQSxhQUFBLEVBQUc7TUFDYixJQUFJLElBQUksQ0FBQ3pFLEtBQUssQ0FBQ0osTUFBTSxLQUFLLENBQUMsRUFBRSxPQUFPLEtBQUs7TUFDekMsSUFBSThFLFNBQVMsR0FBRyxDQUFDO01BQ2pCLElBQUksQ0FBQ0wsT0FBTyxDQUFDMUQsT0FBTyxDQUFDLFVBQUNnRSxNQUFNLEVBQUs7UUFDL0IsSUFBSUEsTUFBTSxDQUFDSCxRQUFRLEVBQUVFLFNBQVMsSUFBSSxDQUFDO01BQ3JDLENBQUMsQ0FBQztNQUNGLElBQUlBLFNBQVMsSUFBSSxJQUFJLENBQUMxRSxLQUFLLENBQUNKLE1BQU0sRUFBRSxPQUFPLElBQUk7TUFDL0MsT0FBTyxLQUFLO0lBQ2QsQ0FBQztJQUNEVCxnQkFBZ0IsV0FBQUEsaUJBQUNHLEdBQUcsRUFBRUQsR0FBRyxFQUFFO01BQ3pCLElBQUl1RixNQUFNLEdBQUcsS0FBSztNQUNsQixJQUFJLENBQUNQLE9BQU8sQ0FBQzFELE9BQU8sQ0FBQyxVQUFDZ0UsTUFBTSxFQUFLO1FBQy9CLElBQUlBLE1BQU0sQ0FBQ2xCLFFBQVEsUUFBQWpDLE1BQUEsQ0FBUWxDLEdBQUcsRUFBQWtDLE1BQUEsQ0FBR25DLEdBQUcsQ0FBRSxFQUFFO1VBQ3RDdUYsTUFBTSxHQUFHLElBQUk7VUFDYjtRQUNGO01BQ0YsQ0FBQyxDQUFDO01BQ0YsT0FBT0EsTUFBTTtJQUNmLENBQUM7SUFDREMsYUFBYSxXQUFBQSxjQUFDdkYsR0FBRyxFQUFFRCxHQUFHLEVBQUU7TUFDdEIsSUFBSSxJQUFJLENBQUNGLGdCQUFnQixDQUFDRyxHQUFHLEVBQUVELEdBQUcsQ0FBQyxFQUFFLE9BQU95RixTQUFTO01BQ3JELElBQUlDLFlBQVksR0FBRyxLQUFLO01BQ3hCLElBQUksQ0FBQy9FLEtBQUssQ0FBQ1csT0FBTyxDQUFDLFVBQUNxRSxJQUFJLEVBQUs7UUFDM0JBLElBQUksQ0FBQ3hGLE9BQU8sQ0FBQ21CLE9BQU8sQ0FBQyxVQUFDVSxNQUFNLEVBQUs7VUFDL0IsSUFBSUEsTUFBTSxRQUFBRyxNQUFBLENBQVFsQyxHQUFHLEVBQUFrQyxNQUFBLENBQUduQyxHQUFHLENBQUUsRUFBRTBGLFlBQVksR0FBR0MsSUFBSTtRQUNwRCxDQUFDLENBQUM7TUFDSixDQUFDLENBQUM7TUFDRixJQUFJRCxZQUFZLEVBQUU7UUFDaEJBLFlBQVksQ0FBQ2pCLEdBQUcsQ0FBQ1YsR0FBRyxFQUFFO1FBQ3RCLElBQUksQ0FBQ2tCLFdBQVcsSUFBQTlDLE1BQUEsQ0FBSWxDLEdBQUcsRUFBQWtDLE1BQUEsQ0FBR25DLEdBQUcsR0FBSSxJQUFJLEVBQUUwRixZQUFZLENBQUNqQixHQUFHLENBQUNULE1BQU0sRUFBRSxDQUFDO1FBQ2pFLE9BQU8wQixZQUFZLENBQUN2RSxJQUFJO01BQzFCO01BQ0EsSUFBSSxDQUFDOEQsV0FBVyxJQUFBOUMsTUFBQSxDQUFJbEMsR0FBRyxFQUFBa0MsTUFBQSxDQUFHbkMsR0FBRyxHQUFJLEtBQUssRUFBRSxLQUFLLENBQUM7TUFDOUMsVUFBQW1DLE1BQUEsQ0FBVWxDLEdBQUcsRUFBQWtDLE1BQUEsQ0FBR25DLEdBQUc7SUFDckI7RUFDRixDQUFDO0FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEhxRTtBQUNwQztBQUN3QjtBQUUzRCxJQUFNc0QsV0FBVyxHQUFHZ0IsZ0RBQVMsRUFBRTtBQUMvQixJQUFNakIsYUFBYSxHQUFHaUIsZ0RBQVMsRUFBRTtBQUNqQyxJQUFJc0IsVUFBVSxHQUFHLElBQUk7QUFFckIsU0FBU0Msb0JBQW9CQSxDQUFDbEYsS0FBSyxFQUFFcEIsS0FBSyxFQUFFdUcsU0FBUyxFQUFFO0VBQ3JEbkYsS0FBSyxDQUFDVyxPQUFPLENBQUMsVUFBQ0MsSUFBSSxFQUFLO0lBQ3RCLElBQUl3RSxLQUFLLEdBQUdOLFNBQVM7SUFDckIsSUFBSXRFLElBQUksR0FBR3NFLFNBQVM7SUFDcEIsSUFBSU8sSUFBSSxHQUFHUCxTQUFTO0lBQ3BCbEUsSUFBSSxDQUFDRCxPQUFPLENBQUMsVUFBQ1UsTUFBTSxFQUFLO01BQ3ZCLElBQUliLElBQUksS0FBS3NFLFNBQVMsRUFBRTtRQUN0QnRFLElBQUksR0FBR2EsTUFBTSxDQUFDYixJQUFJO1FBQ2xCO01BQ0Y7TUFDQSxJQUFJNEUsS0FBSyxLQUFLTixTQUFTLEVBQUVNLEtBQUssR0FBRztRQUFFOUYsR0FBRyxFQUFFK0IsTUFBTSxDQUFDL0IsR0FBRztRQUFFRCxHQUFHLEVBQUVnQyxNQUFNLENBQUNoQztNQUFJLENBQUM7TUFDckVnRyxJQUFJLEdBQUc7UUFBRS9GLEdBQUcsRUFBRStCLE1BQU0sQ0FBQy9CLEdBQUc7UUFBRUQsR0FBRyxFQUFFZ0MsTUFBTSxDQUFDaEM7TUFBSSxDQUFDO01BQzNDLElBQUk4RixTQUFTLEtBQUssUUFBUSxFQUFFO1FBQzFCLElBQU1HLE9BQU8sR0FBR3RFLFFBQVEsQ0FDckJDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FDOUJBLGFBQWEsS0FBQU8sTUFBQSxDQUFLSCxNQUFNLENBQUMvQixHQUFHLEVBQUFrQyxNQUFBLENBQUdILE1BQU0sQ0FBQ2hDLEdBQUcsRUFBRztRQUMvQ2lHLE9BQU8sQ0FBQ2hFLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztNQUMvQjtJQUNGLENBQUMsQ0FBQztJQUNGM0MsS0FBSyxDQUFDcUYsU0FBUyxDQUFDbUIsS0FBSyxDQUFDOUYsR0FBRyxFQUFFK0YsSUFBSSxDQUFDL0YsR0FBRyxFQUFFOEYsS0FBSyxDQUFDL0YsR0FBRyxFQUFFZ0csSUFBSSxDQUFDaEcsR0FBRyxFQUFFbUIsSUFBSSxDQUFDO0VBQ2pFLENBQUMsQ0FBQztBQUNKO0FBRUEsU0FBUytFLElBQUlBLENBQUNDLFdBQVcsRUFBRUMsYUFBYSxFQUFFO0VBQ3hDUCxvQkFBb0IsQ0FBQ3JGLDBEQUFlLEVBQUUsRUFBRThDLFdBQVcsRUFBRSxRQUFRLENBQUM7RUFDOUR1QyxvQkFBb0IsQ0FBQ3JGLDBEQUFlLEVBQUUsRUFBRTZDLGFBQWEsRUFBRSxVQUFVLENBQUM7QUFDcEU7QUFFQSxTQUFTZ0QsVUFBVUEsQ0FBQzlHLEtBQUssRUFBRVUsR0FBRyxFQUFFRCxHQUFHLEVBQUU4RixTQUFTLEVBQUU7RUFDOUN2RyxLQUFLLENBQUNpRyxhQUFhLENBQUN2RixHQUFHLEVBQUVELEdBQUcsQ0FBQztFQUM3QixJQUFJVCxLQUFLLENBQUN5RixPQUFPLENBQUN6RixLQUFLLENBQUN5RixPQUFPLENBQUN6RSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMyRSxTQUFTLEVBQUU7SUFDckR2RCxRQUFRLENBQ0xDLGFBQWEsS0FBQU8sTUFBQSxDQUFLMkQsU0FBUyxZQUFTLENBQ3BDbEUsYUFBYSxLQUFBTyxNQUFBLENBQUtsQyxHQUFHLEVBQUFrQyxNQUFBLENBQUduQyxHQUFHLEVBQUcsQ0FDOUJpQyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxLQUFLLENBQUM7RUFDekIsQ0FBQyxNQUFNO0lBQ0xQLFFBQVEsQ0FDTEMsYUFBYSxLQUFBTyxNQUFBLENBQUsyRCxTQUFTLFlBQVMsQ0FDcENsRSxhQUFhLEtBQUFPLE1BQUEsQ0FBS2xDLEdBQUcsRUFBQWtDLE1BQUEsQ0FBR25DLEdBQUcsRUFBRyxDQUM5QmlDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFFBQVEsQ0FBQztFQUM1QjtBQUNGO0FBRUEsU0FBU29FLE9BQU9BLENBQUN2RCxJQUFJLEVBQUU7RUFDckI2QyxVQUFVLEdBQUcsS0FBSztFQUNsQnJDLHlEQUFlLENBQUNSLElBQUksQ0FBQztBQUN2QjtBQUVBLFNBQVN0QixpQkFBaUJBLENBQUN4QixHQUFHLEVBQUVELEdBQUcsRUFBRTtFQUNuQyxJQUFJLENBQUM0RixVQUFVLElBQUl2QyxhQUFhLENBQUN2RCxnQkFBZ0IsQ0FBQ0csR0FBRyxFQUFFRCxHQUFHLENBQUMsRUFBRTtFQUM3RHFHLFVBQVUsQ0FBQ2hELGFBQWEsRUFBRXBELEdBQUcsRUFBRUQsR0FBRyxFQUFFLFVBQVUsQ0FBQztFQUUvQyxJQUFJcUQsYUFBYSxDQUFDK0IsWUFBWSxFQUFFLEVBQUU7SUFDaENrQixPQUFPLENBQUMsVUFBVSxDQUFDO0lBQ25CO0VBQ0Y7RUFDQSxJQUFNQyxjQUFjLEdBQUdyRyx1REFBWSxDQUFDb0QsV0FBVyxDQUFDO0VBQ2hEK0MsVUFBVSxDQUFDL0MsV0FBVyxFQUFFaUQsY0FBYyxDQUFDdEcsR0FBRyxFQUFFc0csY0FBYyxDQUFDdkcsR0FBRyxFQUFFLFFBQVEsQ0FBQztFQUN6RSxJQUFJc0QsV0FBVyxDQUFDOEIsWUFBWSxFQUFFLEVBQUU7SUFDOUJrQixPQUFPLENBQUMsa0JBQWtCLENBQUM7SUFDM0I7RUFDRjtBQUNGO0FBRUFyRCxxREFBVyxFQUFFO0FBQ2JpRCxJQUFJLEVBQUU7QUFFTixpRUFBZXpFLGlCQUFpQjs7Ozs7O1VDM0VoQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kaXNwbGF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZ2V0UG9zc2libGVDaG9pY2VzKGJvYXJkKSB7XG4gIGNvbnN0IHBvc3NpYmxlU3F1YXJlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IDExOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gXCJhXCI7IGogIT09IFwia1wiOyBqID0gU3RyaW5nLmZyb21DaGFyQ29kZShqLmNoYXJDb2RlQXQoMCkgKyAxKSkge1xuICAgICAgaWYgKCFib2FyZC5pc1JlcGVhdGVkQXR0YWNrKGosIGkpKVxuICAgICAgICBwb3NzaWJsZVNxdWFyZXMucHVzaCh7IHJvdzogaSwgY29sOiBqIH0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcG9zc2libGVTcXVhcmVzO1xufVxuXG5mdW5jdGlvbiBjaG9vc2VTcXVhcmUoYm9hcmQpIHtcbiAgY29uc3Qgc3F1YXJlcyA9IGdldFBvc3NpYmxlQ2hvaWNlcyhib2FyZCk7XG4gIHJldHVybiBzcXVhcmVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNxdWFyZXMubGVuZ3RoKV07XG59XG5cbmZ1bmN0aW9uIHJhbmRvbVNoaXBBcnJheSgpIHtcbiAgY29uc3Qgc2hpcExlbmd0aHMgPSBbMiwgMywgMywgNCwgNV07XG4gIGNvbnN0IHNoaXBOYW1lcyA9IFtcbiAgICBcIlBhdHJvbCBCb2F0XCIsXG4gICAgXCJTdWJtYXJpbmVcIixcbiAgICBcIkRlc3Ryb3llclwiLFxuICAgIFwiQmF0dGxlU2hpcFwiLFxuICAgIFwiQWlyY3JhZnQgQ2FycmllclwiLFxuICBdO1xuICBjb25zdCBzaGlwcyA9IFtdO1xuICB3aGlsZSAoc2hpcExlbmd0aHMubGVuZ3RoID4gMCkge1xuICAgIGxldCB2YWxpZFBsYWNlbWVudCA9IHRydWU7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/IFwicm93U3BhblwiIDogXCJjb2xTcGFuXCI7XG5cbiAgICBjb25zdCBzdGFydFJvdyA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGNvbnN0IHN0YXJ0Q29sID0gU3RyaW5nLmZyb21DaGFyQ29kZSg5NiArIE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogMTApKTtcblxuICAgIGNvbnN0IGN1cnJlbnRTaGlwID0gW3sgbmFtZTogc2hpcE5hbWVzW3NoaXBOYW1lcy5sZW5ndGggLSAxXSB9XTtcblxuICAgIGxldCBjdXJyZW50Q29sID0gc3RhcnRDb2w7XG4gICAgbGV0IGN1cnJlbnRSb3cgPSBzdGFydFJvdztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHNbc2hpcExlbmd0aHMubGVuZ3RoIC0gMV07IGkrKykge1xuICAgICAgLy8gT3V0IG9mIEJvdW5kc1xuICAgICAgaWYgKGN1cnJlbnRSb3cgPT09IDExKSB7XG4gICAgICAgIHZhbGlkUGxhY2VtZW50ID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnRDb2wgPT09IFwia1wiKSB7XG4gICAgICAgIHZhbGlkUGxhY2VtZW50ID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICAvLyBPdmVybGFwXG4gICAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgc2hpcC5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmIChjdXJyZW50Q29sID09PSBzaGlwW2pdLmNvbCAmJiBjdXJyZW50Um93ID09PSBzaGlwW2pdLnJvdykge1xuICAgICAgICAgICAgdmFsaWRQbGFjZW1lbnQgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmICghdmFsaWRQbGFjZW1lbnQpIGJyZWFrO1xuICAgICAgY3VycmVudFNoaXAucHVzaCh7IGNvbDogY3VycmVudENvbCwgcm93OiBjdXJyZW50Um93IH0pO1xuICAgICAgLy8gSW5jcmVtZW50XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBcInJvd1NwYW5cIikgY3VycmVudFJvdyArPSAxO1xuICAgICAgZWxzZSBjdXJyZW50Q29sID0gU3RyaW5nLmZyb21DaGFyQ29kZShjdXJyZW50Q29sLmNoYXJDb2RlQXQoMCkgKyAxKTtcbiAgICB9XG5cbiAgICBpZiAodmFsaWRQbGFjZW1lbnQpIHtcbiAgICAgIHNoaXBzLnB1c2goY3VycmVudFNoaXApO1xuICAgICAgc2hpcExlbmd0aHMucG9wKCk7XG4gICAgICBzaGlwTmFtZXMucG9wKCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzaGlwcztcbn1cblxuZXhwb3J0IHsgY2hvb3NlU3F1YXJlLCBnZXRQb3NzaWJsZUNob2ljZXMsIHJhbmRvbVNoaXBBcnJheSB9O1xuIiwiaW1wb3J0IGhhbmRsZVNxdWFyZUNsaWNrIGZyb20gXCIuL2luZGV4XCI7XG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtY29udGFpbmVyXVwiKTtcblxuZnVuY3Rpb24gY3JlYXRlQm9hcmQoKSB7XG4gIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMTsgaSArPSAxKSB7XG4gICAgZm9yIChsZXQgaiA9IFwiYVwiOyBqICE9PSBcImtcIjsgaiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoai5jaGFyQ29kZUF0KDApICsgMSkpIHtcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInNxdWFyZVwiKTtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGAke2p9JHtpfWApO1xuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmIChzcXVhcmUucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXItYm9hcmRcIikpIHJldHVybjtcbiAgICAgICAgaGFuZGxlU3F1YXJlQ2xpY2soaiwgaSk7XG4gICAgICB9KTtcbiAgICAgIGJvYXJkLmNsYXNzTGlzdC5hZGQoXCJib2FyZFwiKTtcbiAgICAgIGJvYXJkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBib2FyZDtcbn1cblxuZnVuY3Rpb24gcmVzZXQoKSB7XG4gIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUhlYWRlcigpIHtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgaGVhZGVyLnRleHRDb250ZW50ID0gXCJCYXR0bGVzaGlwXCI7XG4gIHJldHVybiBoZWFkZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvb3RlcigpIHtcbiAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgZm9vdGVyLnRleHRDb250ZW50ID0gXCJNYWRlIGJ5IFdpbGwgTW9yZXR6XCI7XG4gIHJldHVybiBmb290ZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRpdGxlKHRleHQpIHtcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB0aXRsZS5jbGFzc0xpc3QuYWRkKFwidGl0bGVcIik7XG4gIHRpdGxlLnRleHRDb250ZW50ID0gdGV4dDtcbiAgcmV0dXJuIHRpdGxlO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5R2FtZSgpIHtcbiAgcmVzZXQoKTtcblxuICBjb25zdCBoZWFkZXIgPSBjcmVhdGVIZWFkZXIoKTtcbiAgY29uc3QgZm9vdGVyID0gY3JlYXRlRm9vdGVyKCk7XG4gIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgY29uc3QgY29tcHV0ZXJUaXRsZSA9IGNyZWF0ZVRpdGxlKFwiQ29tcHV0ZXIncyBCb2FyZFwiKTtcbiAgY29uc3QgcGxheWVyVGl0bGUgPSBjcmVhdGVUaXRsZShcIllvdXIgQm9hcmRcIik7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICBjb21wdXRlckJvYXJkLmNsYXNzTGlzdC5hZGQoXCJjb21wdXRlci1ib2FyZFwiKTtcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICBwbGF5ZXJCb2FyZC5jbGFzc0xpc3QuYWRkKFwicGxheWVyLWJvYXJkXCIpO1xuXG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoY29tcHV0ZXJUaXRsZSk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoY29tcHV0ZXJCb2FyZCwgbnVsbCk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQocGxheWVyVGl0bGUpO1xuICBzZWN0aW9uLmFwcGVuZENoaWxkKHBsYXllckJvYXJkKTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNlY3Rpb24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheUdhbWVPdmVyKHRleHQpIHtcbiAgY29uc3QgcG9wVXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBwb3BVcC5jbGFzc0xpc3QuYWRkKFwicG9wLXVwXCIpO1xuXG4gIGNvbnN0IGdhbWVPdmVyVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGdhbWVPdmVyVGV4dC5jbGFzc0xpc3QuYWRkKFwiZ2FtZS1vdmVyLXRleHRcIik7XG4gIGdhbWVPdmVyVGV4dC50ZXh0Q29udGVudCA9IHRleHQ7XG5cbiAgY29uc3QgcmVwbGF5QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgcmVwbGF5QnV0dG9uLnRleHRDb250ZW50ID0gXCJSZXBsYXlcIjtcbiAgcmVwbGF5QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyZXBsYXktYnV0dG9uXCIpO1xuXG4gIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoXCJvdmVybGF5XCIpO1xuXG4gIHBvcFVwLmFwcGVuZENoaWxkKGdhbWVPdmVyVGV4dCk7XG4gIHBvcFVwLmFwcGVuZENoaWxkKHJlcGxheUJ1dHRvbik7XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKG92ZXJsYXkpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQocG9wVXApO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5U2V0dXAoKSB7XG4gIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUhlYWRlcigpO1xuICBjb25zdCBmb290ZXIgPSBjcmVhdGVGb290ZXIoKTtcbiAgY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICBjb25zdCB0aXRsZSA9IGNyZWF0ZVRpdGxlKFwiUGxhY2UgWW91ciBTaGlwcyFcIik7XG4gIGNvbnN0IGJvYXJkID0gY3JlYXRlQm9hcmQoKTtcblxuICBzZWN0aW9uLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgc2VjdGlvbi5hcHBlbmRDaGlsZChib2FyZCk7XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWN0aW9uKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZvb3Rlcik7XG59XG5cbmV4cG9ydCB7IGRpc3BsYXlHYW1lLCBkaXNwbGF5U2V0dXAsIGRpc3BsYXlHYW1lT3ZlciB9O1xuIiwiY29uc3Qgc2hpcCA9IChsZW4pID0+ICh7XG4gIGxlbmd0aDogbGVuLFxuICBoaXRzOiAwLFxuICBoaXQoKSB7XG4gICAgdGhpcy5oaXRzICs9IDE7XG4gIH0sXG4gIGlzU3VuaygpIHtcbiAgICBpZiAodGhpcy5oaXRzID09PSB0aGlzLmxlbmd0aCkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxufSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkKCkge1xuICBjb25zdCBib2FyZCA9IFtdO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IDExOyBpKyspIHtcbiAgICBjb25zdCBjb2x1bW4gPSB7fTtcbiAgICBPYmplY3QuYXNzaWduKGNvbHVtbiwge1xuICAgICAgY29sdW1uOiBpLFxuICAgICAgcm93OiBbXG4gICAgICAgIHsgcG9zaXRpb246IGBhJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBiJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBjJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBkJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBlJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBmJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBnJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBoJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBpJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICAgIHsgcG9zaXRpb246IGBqJHtpfWAsIGhhc1NoaXA6IGZhbHNlIH0sXG4gICAgICBdLFxuICAgIH0pO1xuICAgIGJvYXJkLnB1c2goY29sdW1uKTtcbiAgfVxuICByZXR1cm4gYm9hcmQ7XG59XG5cbmNvbnN0IGdhbWVCb2FyZCA9ICgpID0+ICh7XG4gIGJvYXJkOiBjcmVhdGVCb2FyZCgpLFxuICBmaW5kU3F1YXJlKGNvbCwgcm93KSB7XG4gICAgY29uc3Qgc3F1YXJlID0gdGhpcy5ib2FyZFtyb3cgLSAxXS5yb3cuZmlsdGVyKChvYmopID0+IHtcbiAgICAgIHJldHVybiBvYmoucG9zaXRpb24gPT09IGAke2NvbH0ke3Jvd31gO1xuICAgIH0pO1xuICAgIHJldHVybiBzcXVhcmU7XG4gIH0sXG4gIGNoZWNrUG9zaXRpb24oY29sLCByb3cpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBjb25zdCBzcXVhcmUgPSB0aGlzLmZpbmRTcXVhcmUoY29sLCByb3cpO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gc3F1YXJlWzBdLnBvc2l0aW9uO1xuICAgIGNvbnN0IGhhc1NoaXAgPSBzcXVhcmVbMF0uaGFzU2hpcDtcbiAgICBPYmplY3QuYXNzaWduKHJlc3VsdCwgeyBwb3NpdGlvbiwgaGFzU2hpcCB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuICBzaGlwczogW10sXG4gIHBsYWNlU2hpcChzdGFydENvbCwgZW5kQ29sLCBzdGFydFJvdywgZW5kUm93LCBuYW1lKSB7XG4gICAgbGV0IGxlbmd0aCA9IDA7XG4gICAgbGV0IG9jY3VwaWVkU3F1YXJlcyA9IFtdO1xuICAgIGlmIChzdGFydFJvdyAhPT0gZW5kUm93KSB7XG4gICAgICBmb3IgKGxldCBpID0gc3RhcnRSb3c7IGkgPCBlbmRSb3cgKyAxOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gdGhpcy5maW5kU3F1YXJlKHN0YXJ0Q29sLCBpKTtcbiAgICAgICAgc3F1YXJlWzBdLmhhc1NoaXAgPSB0cnVlO1xuICAgICAgICBsZW5ndGggKz0gMTtcbiAgICAgICAgb2NjdXBpZWRTcXVhcmVzLnB1c2goYCR7c3RhcnRDb2x9JHtpfWApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgY3VycmVudENvbCA9IHN0YXJ0Q29sO1xuICAgICAgd2hpbGUgKGN1cnJlbnRDb2wgIT09IFN0cmluZy5mcm9tQ2hhckNvZGUoZW5kQ29sLmNoYXJDb2RlQXQoMCkgKyAxKSkge1xuICAgICAgICBjb25zdCBzcXVhcmUgPSB0aGlzLmZpbmRTcXVhcmUoY3VycmVudENvbCwgc3RhcnRSb3cpO1xuICAgICAgICBzcXVhcmVbMF0uaGFzU2hpcCA9IHRydWU7XG4gICAgICAgIG9jY3VwaWVkU3F1YXJlcy5wdXNoKGAke2N1cnJlbnRDb2x9JHtzdGFydFJvd31gKTtcbiAgICAgICAgY3VycmVudENvbCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY3VycmVudENvbC5jaGFyQ29kZUF0KDApICsgMSk7XG4gICAgICAgIGxlbmd0aCArPSAxO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNoaXBzLnB1c2goe1xuICAgICAgc3F1YXJlczogb2NjdXBpZWRTcXVhcmVzLFxuICAgICAgbmFtZSxcbiAgICAgIG9iajogc2hpcChsZW5ndGgpLFxuICAgIH0pO1xuICB9LFxuICBhdHRhY2tzOiBbXSxcbiAgdHJhY2tBdHRhY2socG9zaXRpb24sIGF0dGFja0hpdCwgc2Fua1NoaXApIHtcbiAgICB0aGlzLmF0dGFja3MucHVzaCh7IHBvc2l0aW9uLCBhdHRhY2tIaXQsIHNhbmtTaGlwIH0pO1xuICB9LFxuICBhbGxTaGlwc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuc2hpcHMubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgbGV0IHNoaXBzU3VuayA9IDA7XG4gICAgdGhpcy5hdHRhY2tzLmZvckVhY2goKGF0dGFjaykgPT4ge1xuICAgICAgaWYgKGF0dGFjay5zYW5rU2hpcCkgc2hpcHNTdW5rICs9IDE7XG4gICAgfSk7XG4gICAgaWYgKHNoaXBzU3VuayA+PSB0aGlzLnNoaXBzLmxlbmd0aCkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuICBpc1JlcGVhdGVkQXR0YWNrKGNvbCwgcm93KSB7XG4gICAgbGV0IHJlcGVhdCA9IGZhbHNlO1xuICAgIHRoaXMuYXR0YWNrcy5mb3JFYWNoKChhdHRhY2spID0+IHtcbiAgICAgIGlmIChhdHRhY2sucG9zaXRpb24gPT09IGAke2NvbH0ke3Jvd31gKSB7XG4gICAgICAgIHJlcGVhdCA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVwZWF0O1xuICB9LFxuICByZWNlaXZlQXR0YWNrKGNvbCwgcm93KSB7XG4gICAgaWYgKHRoaXMuaXNSZXBlYXRlZEF0dGFjayhjb2wsIHJvdykpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgbGV0IGF0dGFja2VkU2hpcCA9IGZhbHNlO1xuICAgIHRoaXMuc2hpcHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5zcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgICAgICBpZiAoc3F1YXJlID09PSBgJHtjb2x9JHtyb3d9YCkgYXR0YWNrZWRTaGlwID0gaXRlbTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmIChhdHRhY2tlZFNoaXApIHtcbiAgICAgIGF0dGFja2VkU2hpcC5vYmouaGl0KCk7XG4gICAgICB0aGlzLnRyYWNrQXR0YWNrKGAke2NvbH0ke3Jvd31gLCB0cnVlLCBhdHRhY2tlZFNoaXAub2JqLmlzU3VuaygpKTtcbiAgICAgIHJldHVybiBhdHRhY2tlZFNoaXAubmFtZTtcbiAgICB9XG4gICAgdGhpcy50cmFja0F0dGFjayhgJHtjb2x9JHtyb3d9YCwgZmFsc2UsIGZhbHNlKTtcbiAgICByZXR1cm4gYCR7Y29sfSR7cm93fWA7XG4gIH0sXG59KTtcblxuZXhwb3J0IHsgc2hpcCwgZ2FtZUJvYXJkIH07XG4iLCJpbXBvcnQgeyBkaXNwbGF5R2FtZSwgZGlzcGxheUdhbWVPdmVyLCBkaXNwbGF5U2V0dXAgfSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5pbXBvcnQgeyBnYW1lQm9hcmQgfSBmcm9tIFwiLi9nYW1lXCI7XG5pbXBvcnQgeyBjaG9vc2VTcXVhcmUsIHJhbmRvbVNoaXBBcnJheSB9IGZyb20gXCIuL2NvbXB1dGVyXCI7XG5cbmNvbnN0IHBsYXllckJvYXJkID0gZ2FtZUJvYXJkKCk7XG5jb25zdCBjb21wdXRlckJvYXJkID0gZ2FtZUJvYXJkKCk7XG5sZXQgZ2FtZUFjdGl2ZSA9IHRydWU7XG5cbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkRnJvbUFycmF5KHNoaXBzLCBib2FyZCwgYm9hcmRUeXBlKSB7XG4gIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBsZXQgZmlyc3QgPSB1bmRlZmluZWQ7XG4gICAgbGV0IG5hbWUgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgc2hpcC5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICAgIGlmIChuYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbmFtZSA9IHNxdWFyZS5uYW1lO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoZmlyc3QgPT09IHVuZGVmaW5lZCkgZmlyc3QgPSB7IGNvbDogc3F1YXJlLmNvbCwgcm93OiBzcXVhcmUucm93IH07XG4gICAgICBsYXN0ID0geyBjb2w6IHNxdWFyZS5jb2wsIHJvdzogc3F1YXJlLnJvdyB9O1xuICAgICAgaWYgKGJvYXJkVHlwZSA9PT0gXCJwbGF5ZXJcIikge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnRcbiAgICAgICAgICAucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItYm9hcmRcIilcbiAgICAgICAgICAucXVlcnlTZWxlY3RvcihgLiR7c3F1YXJlLmNvbH0ke3NxdWFyZS5yb3d9YCk7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgYm9hcmQucGxhY2VTaGlwKGZpcnN0LmNvbCwgbGFzdC5jb2wsIGZpcnN0LnJvdywgbGFzdC5yb3csIG5hbWUpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdChwbGF5ZXJTaGlwcywgY29tcHV0ZXJTaGlwcykge1xuICBjcmVhdGVCb2FyZEZyb21BcnJheShyYW5kb21TaGlwQXJyYXkoKSwgcGxheWVyQm9hcmQsIFwicGxheWVyXCIpO1xuICBjcmVhdGVCb2FyZEZyb21BcnJheShyYW5kb21TaGlwQXJyYXkoKSwgY29tcHV0ZXJCb2FyZCwgXCJjb21wdXRlclwiKTtcbn1cblxuZnVuY3Rpb24gbWFya1NxdWFyZShib2FyZCwgY29sLCByb3csIGJvYXJkVHlwZSkge1xuICBib2FyZC5yZWNlaXZlQXR0YWNrKGNvbCwgcm93KTtcbiAgaWYgKGJvYXJkLmF0dGFja3NbYm9hcmQuYXR0YWNrcy5sZW5ndGggLSAxXS5hdHRhY2tIaXQpIHtcbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC4ke2JvYXJkVHlwZX0tYm9hcmRgKVxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoYC4ke2NvbH0ke3Jvd31gKVxuICAgICAgLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHtib2FyZFR5cGV9LWJvYXJkYClcbiAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHtjb2x9JHtyb3d9YClcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwibWlzc2VkXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVuZEdhbWUodGV4dCkge1xuICBnYW1lQWN0aXZlID0gZmFsc2U7XG4gIGRpc3BsYXlHYW1lT3Zlcih0ZXh0KTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlU3F1YXJlQ2xpY2soY29sLCByb3cpIHtcbiAgaWYgKCFnYW1lQWN0aXZlIHx8IGNvbXB1dGVyQm9hcmQuaXNSZXBlYXRlZEF0dGFjayhjb2wsIHJvdykpIHJldHVybjtcbiAgbWFya1NxdWFyZShjb21wdXRlckJvYXJkLCBjb2wsIHJvdywgXCJjb21wdXRlclwiKTtcblxuICBpZiAoY29tcHV0ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgIGVuZEdhbWUoXCJZb3UgV2luIVwiKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgY29tcHV0ZXJDaG9pY2UgPSBjaG9vc2VTcXVhcmUocGxheWVyQm9hcmQpO1xuICBtYXJrU3F1YXJlKHBsYXllckJvYXJkLCBjb21wdXRlckNob2ljZS5jb2wsIGNvbXB1dGVyQ2hvaWNlLnJvdywgXCJwbGF5ZXJcIik7XG4gIGlmIChwbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgIGVuZEdhbWUoXCJUaGUgQ29tcHV0ZXIgV29uXCIpO1xuICAgIHJldHVybjtcbiAgfVxufVxuXG5kaXNwbGF5R2FtZSgpO1xuaW5pdCgpO1xuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVTcXVhcmVDbGljaztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOlsiZ2V0UG9zc2libGVDaG9pY2VzIiwiYm9hcmQiLCJwb3NzaWJsZVNxdWFyZXMiLCJpIiwiaiIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImNoYXJDb2RlQXQiLCJpc1JlcGVhdGVkQXR0YWNrIiwicHVzaCIsInJvdyIsImNvbCIsImNob29zZVNxdWFyZSIsInNxdWFyZXMiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJsZW5ndGgiLCJyYW5kb21TaGlwQXJyYXkiLCJzaGlwTGVuZ3RocyIsInNoaXBOYW1lcyIsInNoaXBzIiwiX2xvb3AiLCJ2YWxpZFBsYWNlbWVudCIsImRpcmVjdGlvbiIsInN0YXJ0Um93IiwiY2VpbCIsInN0YXJ0Q29sIiwiY3VycmVudFNoaXAiLCJuYW1lIiwiY3VycmVudENvbCIsImN1cnJlbnRSb3ciLCJmb3JFYWNoIiwic2hpcCIsInBvcCIsImhhbmRsZVNxdWFyZUNsaWNrIiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY3JlYXRlQm9hcmQiLCJjcmVhdGVFbGVtZW50IiwiX2xvb3AyIiwic3F1YXJlIiwiY2xhc3NMaXN0IiwiYWRkIiwiY29uY2F0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhcmVudEVsZW1lbnQiLCJjb250YWlucyIsImFwcGVuZENoaWxkIiwicmVzZXQiLCJ0ZXh0Q29udGVudCIsImNyZWF0ZUhlYWRlciIsImhlYWRlciIsImNyZWF0ZUZvb3RlciIsImZvb3RlciIsImNyZWF0ZVRpdGxlIiwidGV4dCIsInRpdGxlIiwiZGlzcGxheUdhbWUiLCJzZWN0aW9uIiwiY29tcHV0ZXJUaXRsZSIsInBsYXllclRpdGxlIiwiY29tcHV0ZXJCb2FyZCIsInBsYXllckJvYXJkIiwiZGlzcGxheUdhbWVPdmVyIiwicG9wVXAiLCJnYW1lT3ZlclRleHQiLCJyZXBsYXlCdXR0b24iLCJvdmVybGF5IiwiZGlzcGxheVNldHVwIiwibGVuIiwiaGl0cyIsImhpdCIsImlzU3VuayIsImNvbHVtbiIsIk9iamVjdCIsImFzc2lnbiIsInBvc2l0aW9uIiwiaGFzU2hpcCIsImdhbWVCb2FyZCIsImZpbmRTcXVhcmUiLCJmaWx0ZXIiLCJvYmoiLCJjaGVja1Bvc2l0aW9uIiwicmVzdWx0IiwicGxhY2VTaGlwIiwiZW5kQ29sIiwiZW5kUm93Iiwib2NjdXBpZWRTcXVhcmVzIiwiYXR0YWNrcyIsInRyYWNrQXR0YWNrIiwiYXR0YWNrSGl0Iiwic2Fua1NoaXAiLCJhbGxTaGlwc1N1bmsiLCJzaGlwc1N1bmsiLCJhdHRhY2siLCJyZXBlYXQiLCJyZWNlaXZlQXR0YWNrIiwidW5kZWZpbmVkIiwiYXR0YWNrZWRTaGlwIiwiaXRlbSIsImdhbWVBY3RpdmUiLCJjcmVhdGVCb2FyZEZyb21BcnJheSIsImJvYXJkVHlwZSIsImZpcnN0IiwibGFzdCIsImVsZW1lbnQiLCJpbml0IiwicGxheWVyU2hpcHMiLCJjb21wdXRlclNoaXBzIiwibWFya1NxdWFyZSIsImVuZEdhbWUiLCJjb21wdXRlckNob2ljZSJdLCJzb3VyY2VSb290IjoiIn0=
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/display.js":
/*!************************!*\
  !*** ./src/display.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayGame": () => (/* binding */ displayGame),
/* harmony export */   "displaySetup": () => (/* binding */ displaySetup)
/* harmony export */ });
var container = document.querySelector("[data-container]");
function updateBoardDisplay(board) {}
function createBoard(eventHandler) {
  var board = document.createElement("div");
  var _loop = function _loop(i) {
    var _loop2 = function _loop2(j) {
      var square = document.createElement("button");
      square.classList.add("square");
      square.classList.add("".concat(j).concat(i));
      square.addEventListener("click", function () {
        console.log("".concat(j).concat(i));
        eventHandler();
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
function displayGame(eventHandler) {
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
  section.appendChild(playerBoard, eventHandler);
  container.appendChild(header);
  container.appendChild(section);
  container.appendChild(footer);
}
function displaySetup(eventHandler) {
  var header = createHeader();
  var footer = createFooter();
  var section = document.createElement("section");
  var title = createTitle("Place Your Ships!");
  var board = createBoard(eventHandler);
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display */ "./src/display.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./src/game.js");


(0,_display__WEBPACK_IMPORTED_MODULE_0__.displayGame)();
var shipsArray = [[{
  name: "Patrol Boat"
}, {
  col: "a",
  row: 1
}, {
  col: "a",
  row: 2
}], [{
  name: "Battleship"
}, {
  col: "d",
  row: 9
}, {
  col: "e",
  row: 9
}, {
  col: "f",
  row: 9
}, {
  col: "g",
  row: 9
}], [{
  name: "Destroyer"
}, {
  col: "j",
  row: 6
}, {
  col: "j",
  row: 7
}, {
  col: "j",
  row: 8
}], [{
  name: "Aircraft Carrier"
}, {
  col: "c",
  row: 3
}, {
  col: "c",
  row: 4
}, {
  col: "c",
  row: 5
}, {
  col: "c",
  row: 6
}, {
  col: "c",
  row: 7
}], [{
  name: "Submarine"
}, {
  col: "e",
  row: 7
}, {
  col: "f",
  row: 7
}, {
  col: "g",
  row: 7
}]];
var gameInit = function () {
  var playerBoard = (0,_game__WEBPACK_IMPORTED_MODULE_1__.gameBoard)();
  var computerBoard = (0,_game__WEBPACK_IMPORTED_MODULE_1__.gameBoard)();
  function init(ships) {
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
        var element = document.querySelector(".player-board").querySelector(".".concat(square.col).concat(square.row));
        element.classList.add("ship");
      });
      playerBoard.placeShip(first.col, last.col, first.row, last.row, name);
    });
  }
  return {
    init: init
  };
}();
gameInit.init(shipsArray);
function advanceGame(col, row) {
  if (_game__WEBPACK_IMPORTED_MODULE_1__.gameBoard.isRepeatedAttack(col, row)) return;
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFHO0VBQUVOLEdBQUcsRUFBRTtBQUFFLENBQUMsRUFDcEI7RUFBRU0sR0FBRyxFQUFFLEdBQUc7RUFBRU4sR0FBRyxFQUFFO0FBQUUsQ0FBQyxFQUNwQjtFQUFFTSxHQUFHLEVBQUUsR0FBRztFQUFFTixHQUFHLEVBQUU7QUFBRSxDQUFDLEVBQ3BCO0VBQUVNLEdBQUcsRUFBRSxHQUFHO0VBQUVOLEdBQUcsRUFBRTtBQUFFLENBQUMsQ0FDckIsRUFDRCxDQUNFO0VBQUVpQixJQUFJLEVBQUU7QUFBWSxDQUFDLEVBQ3JCO0VBQUVYLEdBQUcsRUFBRSxHQUFHO0VBQUVOLEdBQUcsRUFBRTtBQUFFLENBQUMsRUFDcEI7RUFBRU0sR0FBRyxFQUFFLEdBQUc7RUFBRU4sR0FBRyxFQUFFO0FBQUUsQ0FBQyxFQUNwQjtFQUFFTSxHQUFHLEVBQUUsR0FBRztFQUFFTixHQUFHLEVBQUU7QUFBRSxDQUFDLENBQ3JCLEVBQ0QsQ0FDRTtFQUFFaUIsSUFBSSxFQUFFO0FBQW1CLENBQUMsRUFDNUI7RUFBRVgsR0FBRyxFQUFFLEdBQUc7RUFBRU4sR0FBRyxFQUFFO0FBQUUsQ0FBQyxFQUNwQjtFQUFFTSxHQUFHLEVBQUUsR0FBRztFQUFFTixHQUFHLEVBQUU7QUFBRSxDQUFDLEVBQ3BCO0VBQUVNLEdBQUcsRUFBRSxHQUFHO0VBQUVOLEdBQUcsRUFBRTtBQUFFLENBQUMsRUFDcEI7RUFBRU0sR0FBRyxFQUFFLEdBQUc7RUFBRU4sR0FBRyxFQUFFO0FBQUUsQ0FBQyxFQUNwQjtFQUFFTSxHQUFHLEVBQUUsR0FBRztFQUFFTixHQUFHLEVBQUU7QUFBRSxDQUFDLENBQ3JCLEVBQ0QsQ0FDRTtFQUFFaUIsSUFBSSxFQUFFO0FBQVksQ0FBQyxFQUNyQjtFQUFFWCxHQUFHLEVBQUUsR0FBRztFQUFFTixHQUFHLEVBQUU7QUFBRSxDQUFDLEVBQ3BCO0VBQUVNLEdBQUcsRUFBRSxHQUFHO0VBQUVOLEdBQUcsRUFBRTtBQUFFLENBQUMsRUFDcEI7RUFBRU0sR0FBRyxFQUFFLEdBQUc7RUFBRU4sR0FBRyxFQUFFO0FBQUUsQ0FBQyxDQUNyQixDQUNGO0FBRUQsSUFBTW9DLFFBQVEsR0FBSSxZQUFNO0VBQ3RCLElBQU0vQyxXQUFXLEdBQUdlLGdEQUFTLEVBQUU7RUFDL0IsSUFBTWhCLGFBQWEsR0FBR2dCLGdEQUFTLEVBQUU7RUFFakMsU0FBU2lDLElBQUlBLENBQUMxQixLQUFLLEVBQUU7SUFDbkJBLEtBQUssQ0FBQ2dCLE9BQU8sQ0FBQyxVQUFDcEMsSUFBSSxFQUFLO01BQ3RCLElBQUkrQyxLQUFLLEdBQUdOLFNBQVM7TUFDckIsSUFBSWYsSUFBSSxHQUFHZSxTQUFTO01BQ3BCLElBQUlPLElBQUksR0FBR1AsU0FBUztNQUNwQnpDLElBQUksQ0FBQ29DLE9BQU8sQ0FBQyxVQUFDL0QsTUFBTSxFQUFLO1FBQ3ZCLElBQUlxRCxJQUFJLEtBQUtlLFNBQVMsRUFBRTtVQUN0QmYsSUFBSSxHQUFHckQsTUFBTSxDQUFDcUQsSUFBSTtVQUNsQjtRQUNGO1FBQ0EsSUFBSXFCLEtBQUssS0FBS04sU0FBUyxFQUFFTSxLQUFLLEdBQUc7VUFBRWhDLEdBQUcsRUFBRTFDLE1BQU0sQ0FBQzBDLEdBQUc7VUFBRU4sR0FBRyxFQUFFcEMsTUFBTSxDQUFDb0M7UUFBSSxDQUFDO1FBQ3JFdUMsSUFBSSxHQUFHO1VBQUVqQyxHQUFHLEVBQUUxQyxNQUFNLENBQUMwQyxHQUFHO1VBQUVOLEdBQUcsRUFBRXBDLE1BQU0sQ0FBQ29DO1FBQUksQ0FBQztRQUMzQyxJQUFNd0MsT0FBTyxHQUFHdkYsUUFBUSxDQUNyQkMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUM5QkEsYUFBYSxLQUFBYSxNQUFBLENBQUtILE1BQU0sQ0FBQzBDLEdBQUcsRUFBQXZDLE1BQUEsQ0FBR0gsTUFBTSxDQUFDb0MsR0FBRyxFQUFHO1FBQy9Dd0MsT0FBTyxDQUFDM0UsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO01BQy9CLENBQUMsQ0FBQztNQUNGdUIsV0FBVyxDQUFDdUIsU0FBUyxDQUFDMEIsS0FBSyxDQUFDaEMsR0FBRyxFQUFFaUMsSUFBSSxDQUFDakMsR0FBRyxFQUFFZ0MsS0FBSyxDQUFDdEMsR0FBRyxFQUFFdUMsSUFBSSxDQUFDdkMsR0FBRyxFQUFFaUIsSUFBSSxDQUFDO0lBQ3ZFLENBQUMsQ0FBQztFQUNKO0VBRUEsT0FBTztJQUFFb0IsSUFBSSxFQUFKQTtFQUFLLENBQUM7QUFDakIsQ0FBQyxFQUFHO0FBRUpELFFBQVEsQ0FBQ0MsSUFBSSxDQUFDRixVQUFVLENBQUM7QUFFekIsU0FBU00sV0FBV0EsQ0FBQ25DLEdBQUcsRUFBRU4sR0FBRyxFQUFFO0VBQzdCLElBQUlJLDZEQUEwQixDQUFDRSxHQUFHLEVBQUVOLEdBQUcsQ0FBQyxFQUFFO0FBQzVDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1jb250YWluZXJdXCIpO1xuXG5mdW5jdGlvbiB1cGRhdGVCb2FyZERpc3BsYXkoYm9hcmQpIHt9XG5cbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkKGV2ZW50SGFuZGxlcikge1xuICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgMTE7IGkgKz0gMSkge1xuICAgIGZvciAobGV0IGogPSBcImFcIjsgaiAhPT0gXCJrXCI7IGogPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGouY2hhckNvZGVBdCgwKSArIDEpKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmVcIik7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChgJHtqfSR7aX1gKTtcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhgJHtqfSR7aX1gKTtcbiAgICAgICAgZXZlbnRIYW5kbGVyKCk7XG4gICAgICB9KTtcbiAgICAgIGJvYXJkLmNsYXNzTGlzdC5hZGQoXCJib2FyZFwiKTtcbiAgICAgIGJvYXJkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBib2FyZDtcbn1cblxuZnVuY3Rpb24gcmVzZXQoKSB7XG4gIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUhlYWRlcigpIHtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgaGVhZGVyLnRleHRDb250ZW50ID0gXCJCYXR0bGVzaGlwXCI7XG4gIHJldHVybiBoZWFkZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvb3RlcigpIHtcbiAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgZm9vdGVyLnRleHRDb250ZW50ID0gXCJNYWRlIGJ5IFdpbGwgTW9yZXR6XCI7XG4gIHJldHVybiBmb290ZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRpdGxlKHRleHQpIHtcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB0aXRsZS5jbGFzc0xpc3QuYWRkKFwidGl0bGVcIik7XG4gIHRpdGxlLnRleHRDb250ZW50ID0gdGV4dDtcbiAgcmV0dXJuIHRpdGxlO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5R2FtZShldmVudEhhbmRsZXIpIHtcbiAgcmVzZXQoKTtcblxuICBjb25zdCBoZWFkZXIgPSBjcmVhdGVIZWFkZXIoKTtcbiAgY29uc3QgZm9vdGVyID0gY3JlYXRlRm9vdGVyKCk7XG4gIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgY29uc3QgY29tcHV0ZXJUaXRsZSA9IGNyZWF0ZVRpdGxlKFwiQ29tcHV0ZXIncyBCb2FyZFwiKTtcbiAgY29uc3QgcGxheWVyVGl0bGUgPSBjcmVhdGVUaXRsZShcIllvdXIgQm9hcmRcIik7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICBjb21wdXRlckJvYXJkLmNsYXNzTGlzdC5hZGQoXCJjb21wdXRlci1ib2FyZFwiKTtcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICBwbGF5ZXJCb2FyZC5jbGFzc0xpc3QuYWRkKFwicGxheWVyLWJvYXJkXCIpO1xuXG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoY29tcHV0ZXJUaXRsZSk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoY29tcHV0ZXJCb2FyZCwgbnVsbCk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQocGxheWVyVGl0bGUpO1xuICBzZWN0aW9uLmFwcGVuZENoaWxkKHBsYXllckJvYXJkLCBldmVudEhhbmRsZXIpO1xuXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VjdGlvbik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb290ZXIpO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5U2V0dXAoZXZlbnRIYW5kbGVyKSB7XG4gIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUhlYWRlcigpO1xuICBjb25zdCBmb290ZXIgPSBjcmVhdGVGb290ZXIoKTtcbiAgY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICBjb25zdCB0aXRsZSA9IGNyZWF0ZVRpdGxlKFwiUGxhY2UgWW91ciBTaGlwcyFcIik7XG4gIGNvbnN0IGJvYXJkID0gY3JlYXRlQm9hcmQoZXZlbnRIYW5kbGVyKTtcblxuICBzZWN0aW9uLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgc2VjdGlvbi5hcHBlbmRDaGlsZChib2FyZCk7XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWN0aW9uKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZvb3Rlcik7XG59XG5cbmV4cG9ydCB7IGRpc3BsYXlHYW1lLCBkaXNwbGF5U2V0dXAgfTtcbiIsImNvbnN0IHNoaXAgPSAobGVuKSA9PiAoe1xuICBsZW5ndGg6IGxlbixcbiAgaGl0czogMCxcbiAgaGl0KCkge1xuICAgIHRoaXMuaGl0cyArPSAxO1xuICB9LFxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbn0pO1xuXG5mdW5jdGlvbiBjcmVhdGVCb2FyZCgpIHtcbiAgY29uc3QgYm9hcmQgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMTsgaSsrKSB7XG4gICAgY29uc3QgY29sdW1uID0ge307XG4gICAgT2JqZWN0LmFzc2lnbihjb2x1bW4sIHtcbiAgICAgIGNvbHVtbjogaSxcbiAgICAgIHJvdzogW1xuICAgICAgICB7IHBvc2l0aW9uOiBgYSR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgYiR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgYyR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgZCR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgZSR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgZiR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgZyR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgaCR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgaSR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgICB7IHBvc2l0aW9uOiBgaiR7aX1gLCBoYXNTaGlwOiBmYWxzZSB9LFxuICAgICAgXSxcbiAgICB9KTtcbiAgICBib2FyZC5wdXNoKGNvbHVtbik7XG4gIH1cbiAgcmV0dXJuIGJvYXJkO1xufVxuXG5jb25zdCBnYW1lQm9hcmQgPSAoKSA9PiAoe1xuICBib2FyZDogY3JlYXRlQm9hcmQoKSxcbiAgZmluZFNxdWFyZShjb2wsIHJvdykge1xuICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuYm9hcmRbcm93IC0gMV0ucm93LmZpbHRlcigob2JqKSA9PiB7XG4gICAgICByZXR1cm4gb2JqLnBvc2l0aW9uID09PSBgJHtjb2x9JHtyb3d9YDtcbiAgICB9KTtcbiAgICByZXR1cm4gc3F1YXJlO1xuICB9LFxuICBjaGVja1Bvc2l0aW9uKGNvbCwgcm93KSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgY29uc3Qgc3F1YXJlID0gdGhpcy5maW5kU3F1YXJlKGNvbCwgcm93KTtcbiAgICBjb25zdCBwb3NpdGlvbiA9IHNxdWFyZVswXS5wb3NpdGlvbjtcbiAgICBjb25zdCBoYXNTaGlwID0gc3F1YXJlWzBdLmhhc1NoaXA7XG4gICAgT2JqZWN0LmFzc2lnbihyZXN1bHQsIHsgcG9zaXRpb24sIGhhc1NoaXAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcbiAgc2hpcHM6IFtdLFxuICBwbGFjZVNoaXAoc3RhcnRDb2wsIGVuZENvbCwgc3RhcnRSb3csIGVuZFJvdywgbmFtZSkge1xuICAgIGxldCBsZW5ndGggPSAwO1xuICAgIGxldCBvY2N1cGllZFNxdWFyZXMgPSBbXTtcbiAgICBpZiAoc3RhcnRSb3cgIT09IGVuZFJvdykge1xuICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0Um93OyBpIDwgZW5kUm93ICsgMTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuZmluZFNxdWFyZShzdGFydENvbCwgaSk7XG4gICAgICAgIHNxdWFyZVswXS5oYXNTaGlwID0gdHJ1ZTtcbiAgICAgICAgbGVuZ3RoICs9IDE7XG4gICAgICAgIG9jY3VwaWVkU3F1YXJlcy5wdXNoKGAke3N0YXJ0Q29sfSR7aX1gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGN1cnJlbnRDb2wgPSBzdGFydENvbDtcbiAgICAgIHdoaWxlIChjdXJyZW50Q29sICE9PSBTdHJpbmcuZnJvbUNoYXJDb2RlKGVuZENvbC5jaGFyQ29kZUF0KDApICsgMSkpIHtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gdGhpcy5maW5kU3F1YXJlKGN1cnJlbnRDb2wsIHN0YXJ0Um93KTtcbiAgICAgICAgc3F1YXJlWzBdLmhhc1NoaXAgPSB0cnVlO1xuICAgICAgICBvY2N1cGllZFNxdWFyZXMucHVzaChgJHtjdXJyZW50Q29sfSR7c3RhcnRSb3d9YCk7XG4gICAgICAgIGN1cnJlbnRDb2wgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGN1cnJlbnRDb2wuY2hhckNvZGVBdCgwKSArIDEpO1xuICAgICAgICBsZW5ndGggKz0gMTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zaGlwcy5wdXNoKHtcbiAgICAgIHNxdWFyZXM6IG9jY3VwaWVkU3F1YXJlcyxcbiAgICAgIG5hbWUsXG4gICAgICBvYmo6IHNoaXAobGVuZ3RoKSxcbiAgICB9KTtcbiAgfSxcbiAgYXR0YWNrczogW10sXG4gIHRyYWNrQXR0YWNrKHBvc2l0aW9uLCBhdHRhY2tIaXQsIHNhbmtTaGlwKSB7XG4gICAgdGhpcy5hdHRhY2tzLnB1c2goeyBwb3NpdGlvbiwgYXR0YWNrSGl0LCBzYW5rU2hpcCB9KTtcbiAgfSxcbiAgYWxsU2hpcHNTdW5rKCkge1xuICAgIGlmICh0aGlzLnNoaXBzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuICAgIGxldCBzaGlwc1N1bmsgPSAwO1xuICAgIHRoaXMuYXR0YWNrcy5mb3JFYWNoKChhdHRhY2spID0+IHtcbiAgICAgIGlmIChhdHRhY2suc2Fua1NoaXApIHNoaXBzU3VuayArPSAxO1xuICAgIH0pO1xuICAgIGlmIChzaGlwc1N1bmsgPj0gdGhpcy5zaGlwcy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbiAgaXNSZXBlYXRlZEF0dGFjayhjb2wsIHJvdykge1xuICAgIGxldCByZXBlYXQgPSBmYWxzZTtcbiAgICB0aGlzLmF0dGFja3MuZm9yRWFjaCgoYXR0YWNrKSA9PiB7XG4gICAgICBpZiAoYXR0YWNrLnBvc2l0aW9uID09PSBgJHtjb2x9JHtyb3d9YCkge1xuICAgICAgICByZXBlYXQgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcGVhdDtcbiAgfSxcbiAgcmVjZWl2ZUF0dGFjayhjb2wsIHJvdykge1xuICAgIGlmICh0aGlzLmlzUmVwZWF0ZWRBdHRhY2soY29sLCByb3cpKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGxldCBhdHRhY2tlZFNoaXAgPSBmYWxzZTtcbiAgICB0aGlzLnNoaXBzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0uc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICAgICAgaWYgKHNxdWFyZSA9PT0gYCR7Y29sfSR7cm93fWApIGF0dGFja2VkU2hpcCA9IGl0ZW07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZiAoYXR0YWNrZWRTaGlwKSB7XG4gICAgICBhdHRhY2tlZFNoaXAub2JqLmhpdCgpO1xuICAgICAgdGhpcy50cmFja0F0dGFjayhgJHtjb2x9JHtyb3d9YCwgdHJ1ZSwgYXR0YWNrZWRTaGlwLm9iai5pc1N1bmsoKSk7XG4gICAgICByZXR1cm4gYXR0YWNrZWRTaGlwLm5hbWU7XG4gICAgfVxuICAgIHRoaXMudHJhY2tBdHRhY2soYCR7Y29sfSR7cm93fWAsIGZhbHNlLCBmYWxzZSk7XG4gICAgcmV0dXJuIGAke2NvbH0ke3Jvd31gO1xuICB9LFxufSk7XG5cbmV4cG9ydCB7IHNoaXAsIGdhbWVCb2FyZCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBkaXNwbGF5R2FtZSwgZGlzcGxheVNldHVwIH0gZnJvbSBcIi4vZGlzcGxheVwiO1xuaW1wb3J0IHsgZ2FtZUJvYXJkIH0gZnJvbSBcIi4vZ2FtZVwiO1xuXG5kaXNwbGF5R2FtZSgpO1xuXG5jb25zdCBzaGlwc0FycmF5ID0gW1xuICBbeyBuYW1lOiBcIlBhdHJvbCBCb2F0XCIgfSwgeyBjb2w6IFwiYVwiLCByb3c6IDEgfSwgeyBjb2w6IFwiYVwiLCByb3c6IDIgfV0sXG4gIFtcbiAgICB7IG5hbWU6IFwiQmF0dGxlc2hpcFwiIH0sXG4gICAgeyBjb2w6IFwiZFwiLCByb3c6IDkgfSxcbiAgICB7IGNvbDogXCJlXCIsIHJvdzogOSB9LFxuICAgIHsgY29sOiBcImZcIiwgcm93OiA5IH0sXG4gICAgeyBjb2w6IFwiZ1wiLCByb3c6IDkgfSxcbiAgXSxcbiAgW1xuICAgIHsgbmFtZTogXCJEZXN0cm95ZXJcIiB9LFxuICAgIHsgY29sOiBcImpcIiwgcm93OiA2IH0sXG4gICAgeyBjb2w6IFwialwiLCByb3c6IDcgfSxcbiAgICB7IGNvbDogXCJqXCIsIHJvdzogOCB9LFxuICBdLFxuICBbXG4gICAgeyBuYW1lOiBcIkFpcmNyYWZ0IENhcnJpZXJcIiB9LFxuICAgIHsgY29sOiBcImNcIiwgcm93OiAzIH0sXG4gICAgeyBjb2w6IFwiY1wiLCByb3c6IDQgfSxcbiAgICB7IGNvbDogXCJjXCIsIHJvdzogNSB9LFxuICAgIHsgY29sOiBcImNcIiwgcm93OiA2IH0sXG4gICAgeyBjb2w6IFwiY1wiLCByb3c6IDcgfSxcbiAgXSxcbiAgW1xuICAgIHsgbmFtZTogXCJTdWJtYXJpbmVcIiB9LFxuICAgIHsgY29sOiBcImVcIiwgcm93OiA3IH0sXG4gICAgeyBjb2w6IFwiZlwiLCByb3c6IDcgfSxcbiAgICB7IGNvbDogXCJnXCIsIHJvdzogNyB9LFxuICBdLFxuXTtcblxuY29uc3QgZ2FtZUluaXQgPSAoKCkgPT4ge1xuICBjb25zdCBwbGF5ZXJCb2FyZCA9IGdhbWVCb2FyZCgpO1xuICBjb25zdCBjb21wdXRlckJvYXJkID0gZ2FtZUJvYXJkKCk7XG5cbiAgZnVuY3Rpb24gaW5pdChzaGlwcykge1xuICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIGxldCBmaXJzdCA9IHVuZGVmaW5lZDtcbiAgICAgIGxldCBuYW1lID0gdW5kZWZpbmVkO1xuICAgICAgbGV0IGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgICBzaGlwLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgICAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbmFtZSA9IHNxdWFyZS5uYW1lO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlyc3QgPT09IHVuZGVmaW5lZCkgZmlyc3QgPSB7IGNvbDogc3F1YXJlLmNvbCwgcm93OiBzcXVhcmUucm93IH07XG4gICAgICAgIGxhc3QgPSB7IGNvbDogc3F1YXJlLmNvbCwgcm93OiBzcXVhcmUucm93IH07XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudFxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1ib2FyZFwiKVxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHtzcXVhcmUuY29sfSR7c3F1YXJlLnJvd31gKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgIH0pO1xuICAgICAgcGxheWVyQm9hcmQucGxhY2VTaGlwKGZpcnN0LmNvbCwgbGFzdC5jb2wsIGZpcnN0LnJvdywgbGFzdC5yb3csIG5hbWUpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHsgaW5pdCB9O1xufSkoKTtcblxuZ2FtZUluaXQuaW5pdChzaGlwc0FycmF5KTtcblxuZnVuY3Rpb24gYWR2YW5jZUdhbWUoY29sLCByb3cpIHtcbiAgaWYgKGdhbWVCb2FyZC5pc1JlcGVhdGVkQXR0YWNrKGNvbCwgcm93KSkgcmV0dXJuO1xufVxuIl0sIm5hbWVzIjpbImNvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInVwZGF0ZUJvYXJkRGlzcGxheSIsImJvYXJkIiwiY3JlYXRlQm9hcmQiLCJldmVudEhhbmRsZXIiLCJjcmVhdGVFbGVtZW50IiwiX2xvb3AiLCJpIiwiX2xvb3AyIiwiaiIsInNxdWFyZSIsImNsYXNzTGlzdCIsImFkZCIsImNvbmNhdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb25zb2xlIiwibG9nIiwiYXBwZW5kQ2hpbGQiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJjaGFyQ29kZUF0IiwicmVzZXQiLCJ0ZXh0Q29udGVudCIsImNyZWF0ZUhlYWRlciIsImhlYWRlciIsImNyZWF0ZUZvb3RlciIsImZvb3RlciIsImNyZWF0ZVRpdGxlIiwidGV4dCIsInRpdGxlIiwiZGlzcGxheUdhbWUiLCJzZWN0aW9uIiwiY29tcHV0ZXJUaXRsZSIsInBsYXllclRpdGxlIiwiY29tcHV0ZXJCb2FyZCIsInBsYXllckJvYXJkIiwiZGlzcGxheVNldHVwIiwic2hpcCIsImxlbiIsImxlbmd0aCIsImhpdHMiLCJoaXQiLCJpc1N1bmsiLCJjb2x1bW4iLCJPYmplY3QiLCJhc3NpZ24iLCJyb3ciLCJwb3NpdGlvbiIsImhhc1NoaXAiLCJwdXNoIiwiZ2FtZUJvYXJkIiwiZmluZFNxdWFyZSIsImNvbCIsImZpbHRlciIsIm9iaiIsImNoZWNrUG9zaXRpb24iLCJyZXN1bHQiLCJzaGlwcyIsInBsYWNlU2hpcCIsInN0YXJ0Q29sIiwiZW5kQ29sIiwic3RhcnRSb3ciLCJlbmRSb3ciLCJuYW1lIiwib2NjdXBpZWRTcXVhcmVzIiwiY3VycmVudENvbCIsInNxdWFyZXMiLCJhdHRhY2tzIiwidHJhY2tBdHRhY2siLCJhdHRhY2tIaXQiLCJzYW5rU2hpcCIsImFsbFNoaXBzU3VuayIsInNoaXBzU3VuayIsImZvckVhY2giLCJhdHRhY2siLCJpc1JlcGVhdGVkQXR0YWNrIiwicmVwZWF0IiwicmVjZWl2ZUF0dGFjayIsInVuZGVmaW5lZCIsImF0dGFja2VkU2hpcCIsIml0ZW0iLCJzaGlwc0FycmF5IiwiZ2FtZUluaXQiLCJpbml0IiwiZmlyc3QiLCJsYXN0IiwiZWxlbWVudCIsImFkdmFuY2VHYW1lIl0sInNvdXJjZVJvb3QiOiIifQ==
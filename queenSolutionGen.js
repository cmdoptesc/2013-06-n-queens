var qCount = 0;
var qSolutions = [];
var majDiHash = {};
var minDiHash = {};

var queenSolutionGenerator = function(array, sol) {
  if(array.length===0) {
    qSolutions.push(sol.slice());
    qCount++;
    return;
  }
  for(var i=0; i<array.length; i++) {
    var xArray = array.slice();
    var xSol = sol.slice();

    var newVal = (xArray.splice(i,1)[0])-1;

        // using xSol.length was probably the biggest debugging breakthrough.
        // i is *not* the row in our case

    if(!diHashCon(xSol.length, newVal)) {
      xSol.push(newVal);
      queenSolutionGenerator(xArray, xSol);     // recurse..
      undoDiHash(xSol.length-1, newVal);        // undo the hash because we're backing up
    }
  }
};

// discarded the second array (sol) to speed things up
// on n=14, we save about 15 seconds. we need to switch to bit-shifting
// or at the very least, ditch arrays

var queenCounter = function(arr, n) {
  if(arr.length===0) {
    qCount++;
    return;
  }
  for(var i=0; i<arr.length; i++) {
    var xArr = arr.slice();
    var nextCol = (xArr.splice(i,1)[0]);
    var row = n-xArr.length-1;

    if(!diHashCon(row, nextCol)) {
      queenCounter(xArr, n);
      undoDiHash(row, nextCol);
    }
  }
};

// Originally, we checked diagonals by comparing the latest index
// with its position to the other indicies (if the absolute value
// of the difference between the positions of the two indicies
// happen to match the absolute value diff of the two positions,
// then there was a conflict. Now we just hash.)

var diHashCon = function(row, col) {
  if(majDiHash[col-row]||minDiHash[col+row]) {
    return true;
  }
  majDiHash[col-row] = true;
  minDiHash[col+row] = true;
  return false;
};

var undoDiHash = function(row, col) {
  majDiHash[col-row] = false;
  minDiHash[col+row] = false;
};

// helper functions

var makeEmptyBoard = function(n) {
  var board = [];

  for (var i = 0; i < n; i++) {
    board.push([0]);
    for (var j = 1; j < n; j++) {
      board[i].push(0);
    }
  }

  return board;
};

// receives an array of column indicies and builds a board from it

var makeBoardFromIndicies = function(array) {
  var board = makeEmptyBoard(array.length);

  for(var i=0; i<array.length; i++) {
    var col = array[i]-1;
    board[i][col] = 1;
  }

  return board;
};

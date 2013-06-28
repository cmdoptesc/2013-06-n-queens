// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)


window.findNRooksSolution = function(n){
  if(n===0) {
    return 0;
  }
  rookSolutions = [];
  rookSolutionGenerator(_.range(n),[]);
  return rookSolutions[0];
};

window.countNRooksSolutions = function(n){
  var solutionCount = 1;

  for (var i = solutionCount; i <= n; i++) {
    solutionCount = solutionCount * i;
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.findNQueensSolution = function(n) {
  qCount = 0;
  qSolutions = [];
  majDiHash = {};
  minDiHash = {};

  queenSolutionGenerator(_.range(n),[]);

  if(qSolutions[0]) {
    //console.log("Queen solution for " +n+ " " + qSolutions[0]);
    return qSolutions[0];
  } else {
    console.log("No n-Queens solution available for an " +n+ "x" +n+ " board.");
    return makeEmptyBoard(n);
  }
};

window.countNQueensSolutions = function(n){
  qCount = 0;
  qSolutions = [];
  majDiHash = {};
  minDiHash = {};

  range = _.range(n);

  var timeBefore = new Date();      // counters

  queenCounter(_.range(n),n);       // actual function

  var timeAfter = new Date();
  var timeElapsed = timeAfter - timeBefore;

  console.log('Number of solutions for ' + n + '-Queens:' + qCount);
  console.log(timeElapsed + " ms");
  return qCount;
};


// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};

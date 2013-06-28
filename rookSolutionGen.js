var rookSolutions = [];
var queenSolutions = [];

var rookSolutionGenerator = function(array, sol) {
  if(array.length===0) {
    rookSolutions.push(sol.slice());
    return;
  }
  for(var i=0; i<array.length; i++) {
    xArray = array.slice();
    xSol = sol.slice();
    xSol.push(xArray.splice(i,1)[0]);
    rookSolutionGenerator(xArray, xSol);
  }
};
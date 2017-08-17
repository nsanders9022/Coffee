//global variables
var cellArray = [];
var base;
var desk = "desk";
var wall = "wall";
var coffee = "coffee";
var coffeeFound = false;
var currentLocation = [];
var pathArray = []
var previousCells = [];

//Object constructor for Cell objects
function Cell (row, column, id, type) {
  this.cellRow = row;
  this.cellColumn = column;
  this.cellId = id;
  this.cellType = type;
}

//Function to create new Cell objects
var createObjects = function(rowNum, colNum) {
  for (var i = 1; i <= rowNum * colNum; i++) {
    //calculates the row the object is in
    var row = Math.ceil(i / colNum);
    //calculates the column the object is in
    if (i % colNum == 0) {
      var col = colNum;
    } else {
      var col = (i % colNum);
    }
    //creates the Cell object using the constructor
    var newCell = new Cell (row, col, i, desk);

    //creates an array of Cell objects
    cellArray.push(newCell);
  }
}

//Gets the id value of a cell based on its row and column location
var computeId = function(numRows, numColumns, currentRow, currentColumn) {
  var id = (numColumns * currentRow) - (numColumns - currentColumn);
  return id;
}

var solve = function(id, numRows, numColumns) {
  // returns true if current location is a coffee machine
  if (cellArray[id - 1].cellType === coffee) {
    return true;
  }
  if (cellArray[id - 1].cellType === wall || previousCells.includes(id)) {
    return false;
  }
  previousCells.push(id);

  //if not on left edge
  if (id % numColumns !== 1) {
    if (solve(id-1, numRows, numColumns)) {
      pathArray.push(id);
      return true;
    }
  }
  //if not on right edge
  if (id % numColumns !== 0) {
    if (solve(id + 1, numRows, numColumns)) {
      pathArray.push(id);
      return true;
    }
  }
  //if not on top edge
  if (id > numRows) {
    if (solve(id - numColumns, numRows, numColumns)) {
      pathArray.push(id);
      return true;
    }
  }
  //if not on bottom edge
  if (id <= (numRows * numColumns) - numColumns) {
    if (solve(id + numColumns, numRows, numColumns)) {
      pathArray.push(id);
      return true;
    }
  }

  return false;


}


//main function
//Calculates number of steps to the coffee machine and calls upon other functions inside it
function DistanceToCoffee(numRows, numColumns, deskLocation, coffeeLocations, wallLocations) {
  //Calls function to create an array of Cell objects
  createObjects(numRows, numColumns);
  id = computeId(numRows, numColumns, deskLocation[0], deskLocation[1]);

  //Adds given desk location as the first item in the pathArray
  // pathArray.push(computeId(numRows, numColumns, currentLocation[0], currentLocation[1]));

  //Changes cellType of cell object to 'coffee' if it is in the coffeeLocations array
  //and changes cellType of cell object to 'wall' if it is in the wallLocations array
  for (var i = 0; i < cellArray.length; i++) {
    for (var j = 0; j <coffeeLocations.length; j++) {
      if (cellArray[i].cellRow === coffeeLocations[j][0] && cellArray[i].cellColumn === coffeeLocations[j][1]) {
        cellArray[i].cellType = coffee;
      }
    }
    for (var k = 0; k < wallLocations.length; k++) {
      if (cellArray[i].cellRow === wallLocations[k][0] && cellArray[i].cellColumn === wallLocations[k][1]) {
        cellArray[i].cellType = wall;
      }
    }
  }

  //returns number of steps here
  if (solve(id, numRows, numColumns)) {
    return pathArray.length;
  }
}

//Function called with arguments from the example passed in to the parameters
 DistanceToCoffee(3, 4, [2,1], [[1,3],[3,2]], [[2,2],[2,3],[3,1]]);


///Future things to implement
// * user input error handling
//      * coordinates in the wall and coffee arrays are in the bounds of the number of rows and columns
//      * a cell is not listed in both the coffee array and the wall array, only one type is allowed
// * find closest machine

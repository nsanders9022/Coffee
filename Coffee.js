//global variables
var cellArray = [];
var base;
var desk = "desk";
var wall = "wall";
var coffee = "coffee";
var coffeeFound = false;
var currentLocation = [];
var pathArray = []

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

//finds cell above the current location and returns its id if it is not a wall
Cell.prototype.northNeighbor = function(id, numRows, numColumns) {
  //variable to hold the id of the cell that will be moved up to
  var northCellId;
  //checks to make sure you are not on the top row
  //and assigns the northCellId to the cell directly above the current one
  if (id > numRows) {
    northCellId = id - numColumns;
    //if the north cell is not a wall the cell id is returned
    if (cellArray[northCellId -1].cellType !== wall) {
      return northCellId;
    }
  }
}
//finds cell below the current location and returns its id if it is not a wall
Cell.prototype.southNeighbor = function(id, numRows, numColumns) {
  var southCellId;
  //checks to make sure you are not on the bottom row
  //and assigns the southCellId to the cell directly below the current one
  if (id <= (numRows * numColumns) - numColumns) {
    southCellId = id + numColumns;
    //if the south cell is not a wall the cell id is returned
    if (cellArray[southCellId -1].cellType !== wall) {
      return southCellId;
    }
  }
}
//finds cell to the left of the current location and returns its id if it is not a wall
Cell.prototype.westNeighbor = function(id, numRows, numColumns) {
  var westCellId;
  //checks to make sure you are not on the left-most column
  //and assigns the westCellId to the cell left of the current one
  if (id % numColumns !== 1) {
    westCellId = id - 1;
    //if the west cell is not a wall the cell id is returned
    if (cellArray[westCellId -1].cellType !== wall) {
      return westCellId;
    }
  }
}
//finds cell to the right of the current location and returns its id if it is not a wall
Cell.prototype.eastNeighbor = function(id, numRows, numColumns) {
  var eastCellId;
  //checks to make sure you are not on the right-most column
  //and assigns the eastCellId to the cell right of the current one
  if (id % numColumns !== 0) {
    eastCellId = id + 1;
    //if the east cell is not a wall the cell id is returned
    if (cellArray[eastCellId -1].cellType !== wall) {
      return eastCellId;
    }
  }
}

//creates an array of the cells surrounding the current location that are a desk or coffee type
var findPassableNeighbors = function (deskLocation, numRows, numColumns) {
  var moveToNeighbors = [];

  deskLocationId = computeId(numRows, numColumns, deskLocation[0], deskLocation[1])
  var north = cellArray[deskLocationId].northNeighbor(deskLocationId, numRows, numColumns);
  var south = cellArray[deskLocationId].southNeighbor(deskLocationId, numRows, numColumns);
  var east = cellArray[deskLocationId].eastNeighbor(deskLocationId, numRows, numColumns);
  var west = cellArray[deskLocationId].westNeighbor(deskLocationId, numRows, numColumns);

  if (north != undefined) {
    moveToNeighbors.push(north)
  }

  if (south != undefined) {
    moveToNeighbors.push(south)
  }

  if (east != undefined) {
    moveToNeighbors.push(east)
  }

  if (west != undefined) {
    moveToNeighbors.push(west)
  }

  return moveToNeighbors;
}

// Cell.prototype.isCoffee = function() {
//   if (this.cellType = coffee) {
//     return true;
//   }
//   return false;
// }

//main function
//Calculates number of steps to the coffee machine and calls upon other functions inside it
function DistanceToCoffee(numRows, numColumns, deskLocation, coffeeLocations, wallLocations) {
  //Calls function to create an array of Cell objects
  createObjects(numRows, numColumns);
  currentLocation = deskLocation;

  //Adds given desk location as the first item in the pathArray
  pathArray.push(computeId(numRows, numColumns, currentLocation[0], currentLocation[1]));

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

  //eventually return number of steps here
}

//Function called with arguments from the example passed in to the parameters
// DistanceToCoffee(3, 4, [2,1], [[1,3],[3,2]], [[2,2],[2,3],[3,1]]);


///Future things to implement
// * user input error handling
//      * coordinates in the wall and coffee arrays are in the bounds of the number of rows and columns
//      * a cell is not listed in both the coffee array and the wall array, only one type is allowed

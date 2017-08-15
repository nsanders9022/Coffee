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

var moveUp = function(id, numRows, numColumns) {
  //variable to hold the id of the cell that will be moved up to
  var nextCellId;
  //checks to make sure you are not on the top row
  //and assigns the nextCellId to the cell directly above the current one
  if (id > numRows) {
    nextCellId = id - numColumns;
  }
  addToPathArray(nextCellId);
}

var moveDown = function(id, numRows, numColumns) {
  var nextCellId;
  //checks to make sure you are not on the bottom row
  //and assigns the nextCellId to the cell directly below the current one
  if (id <= (numRows * numColumns) - numColumns) {
    nextCellId = id + numColumns;
  }
    addToPathArray(nextCellId);
}

var moveLeft = function(id, numRows, numColumns) {
  var nextCellId;

  //checks to make sure you are not on the left-most column
  //and assigns the nextCellId to the cell left of the current one
  if (id % numColumns !== 1) {
    nextCellId = id - 1;
  }
  addToPathArray(nextCellId);
}

var moveRight = function(id, numRows, numColumns) {
  var nextCellId;

  //checks to make sure you are not on the right-most column
  //and assigns the nextCellId to the cell right of the current one
  if (id % numColumns !== 0) {
    nextCellId = id + 1;
  }
  addToPathArray(nextCellId);
}

//finds the object in the cellArray that contains this id
//and pushes it into the path array if the type is not a wall
//Sets current location to this
function addToPathArray(nextCellId) {
  for (var i = 0; i < cellArray.length; i++) {
    if (cellArray[i].cellId == nextCellId && cellArray[i].cellType !== wall) {
      pathArray.push(nextCellId);
      currentLocation = cellArray[i];
    }
  }
}

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

  moveUp(pathArray[0], numRows,numColumns)
  moveRight(pathArray[1], numRows,numColumns)
  moveRight(pathArray[2], numRows,numColumns)

  return pathArray;
}

DistanceToCoffee(3, 4, [2,1], [[1,3],[3,2]], [[2,2],[2,3],[3,1]]);

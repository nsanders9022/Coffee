//Global variables
var cellArray = [];
var base;
var desk = "desk";
var wall = "wall";
var coffee = "coffee";
var coffeeFound = false;
var currentLocation = [];
var pathArray = []
var previousCells = [];

//Constructor for Cell objects
function Cell (row, column, id, type) {
  this.cellRow = row;
  this.cellColumn = column;
  this.cellId = id;
  this.cellType = type;
}

//Function to dynamically create new Cell objects
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

//Gets the Id value of a cell based on its row and column location
var computeId = function(numRows, numColumns, currentRow, currentColumn) {
  var id = (numColumns * currentRow) - (numColumns - currentColumn);
  return id;
}

//Recursive function to create an array of cells in the path to the coffee machine
var solve = function(id, numRows, numColumns) {
  // returns true if current location is a coffee machine
  if (cellArray[id - 1].cellType === coffee) {
    return true;
  }
  //returns false if the cell is a wall of has been tried before
  if (cellArray[id - 1].cellType === wall || previousCells.includes(id)) {
    return false;
  }

  //adds current cell to the arrray
  previousCells.push(id);

  //if not on left edge
  if (id % numColumns !== 1) {
    //Calls function again
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
  //If no path is possible
  return false;
}

//Instantiates the array of cell Objects based on arguments
//Calculates number of steps to the coffee machine
//Error handles user input
function DistanceToCoffee(numRows, numColumns, deskLocation, coffeeLocations, wallLocations) {

  //USER INPUT ERROR HANDLING
  //Returns -1 if user enters a coffee machine, wall, or desklocation coordinate outside the bounds of the rows and columns
  var arrayList = [coffeeLocations, wallLocations];
  for (var i = 0; i < arrayList.length; i++) { //for both the wall/coffee location arrays
    for (var j = 0; j < arrayList[i].length; j++) {
      //if x coordinate is greater than or less than the number of rows return -1
      if (arrayList[i][j][0] > numRows || arrayList[i][j][0] < 1) {
        return -1;
      }
      //if y coordinate is greater than or less than the number of columns return -1
      if (arrayList[i][j][1] > numColumns || arrayList[i][j][1] < 1) {
        return -1;
      }
    }
  }
  //checks x and y coordinate for bounds of desk location
  if (deskLocation[0] > numRows || deskLocation[0] < 1) {
    return -1;
  }
  if (deskLocation[1] > numColumns || deskLocation[1] < 1) {
    return -1;
  }

  //Returns -1 if a cell is inputted as more than one type (eg in the coffee and the wall array)
  for (var i = 0; i < coffeeLocations.length; i++) {
    for (var j  = 0; j < wallLocations.length; j++) {
      if ((coffeeLocations[i][0] === wallLocations[j][0] && coffeeLocations[i][1] === wallLocations[j][1])) {
        return -1;
      }
      if ((coffeeLocations[i][0] === deskLocation[0] && coffeeLocations[i][1] === deskLocation[1])) {
        return -1;
      }
      if ((wallLocations[j][0] === deskLocation[0] && wallLocations[j][1] === deskLocation[1])) {
        return -1;
      }
    }
  }

  //Calls function to instantiate an array of Cell objects
  createObjects(numRows, numColumns);

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

  //calculates the Id of the cell located at the deskLocation coordinates
  id = computeId(numRows, numColumns, deskLocation[0], deskLocation[1]);
  //returns number of steps if the coffe machine is found
  if (solve(id, numRows, numColumns)) {
    return pathArray.length;
  }
  return -1;
    
}

 // DistanceToCoffee(3, 4, [2,1], [[1,3],[3,2]], [[2,2],[2,3],[3,1]]);

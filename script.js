// tiles Col numbered and mines will be assigned to their correspending number
const numRow = 3; //change here
const numCol = 3; //change here
const totalNumOfTiles = numRow * numCol;
const totalNumOfMines = 3; //change here
const container = document.querySelector(".container");

/////////////////////////////////////////////
//// Generating Board ////
/////////////////////////////////////////////

for (let i = 0; i < numRow; i++) {
  const divRow = document.createElement("div");
  container.append(divRow);
  for (let j = 0; j < numCol; j++) {
    const spanTile = document.createElement("span");
    spanTile.className = "tile";
    spanTile.id = `t${i * numCol + j}`;

    divRow.append(spanTile);
  }
}

/////////////////////////////////////////////
//// Generating Mines ////
/////////////////////////////////////////////

const mineLocations = [];

// generating random numbers to be set as mine's location
for (let i = 1; i < totalNumOfMines + 1; i++) {
  const eachMineLocation = Math.floor(Math.random() * totalNumOfTiles);
  mineLocations.push(eachMineLocation);
}

// removing the repeated elements
for (let i = 0; i < mineLocations.length; i++) {
  for (let j = 0; j < mineLocations.length; j++) {
    if (i != j) {
      continue;
    }
    console.log("Still may have repeats " + mineLocations);
    if (mineLocations[i] === mineLocations[j]) {
      mineLocations.splice(j, 1);
      // generating new element to replace the removed element
      mineLocations.push(Math.floor(Math.random() * totalNumOfTiles));
    }
  }
}
console.log("mine locations by Id: " + mineLocations);

// Setting each mine to correspond to a tile
for (let i = 0; i < mineLocations.length; i++) {
  const tile = document.querySelector(`#t${mineLocations[i]}`);
  tile.className = "tile mine";
  // tile.style.backgroundImage = 'url("mine30px.jpg")';
}
// console.log(document.querySelectorAll("span"));

/////////////////////////////////////////////
///// Assigning Values to CENTER Tiles //////
/////////////////////////////////////////////

// value will be assigned as the number of mines in direct contact with each tile
// if the tile itself is a mine, it will assigned a value of 9
const tileArr = document.querySelectorAll(".tile"); //array of HTML selected tiles
const mineArr = document.querySelectorAll(".mine"); //array of HTML selected mines
// tileVal is for inputting to value selector in HTML

// iterate thru tileArr and assign each tile of value 0 to start with
for (let i = 0; i < tileArr.length; i++) {
  tileArr[i].value = 0;
}

// iterate thru mineArr and assign each mine of value 9
for (let i = 0; i < mineArr.length; i++) {
  mineArr[i].value = 9;
}

// let's find the center tiles so we can consider them first
// i.e. the tiles NOT touching the edge of the board

// we can identify them using their row index and column index
const centerTilesArr = [];
const createCenterTiles = (row, col) => {
  return {
    row: row,
    col: col,
  };
};

for (let i = 1; i < numRow - 1; i++) {
  const row = i;
  for (let j = 1; j < numCol - 1; j++) {
    const col = j;
    centerTilesArr.push(createCenterTiles(row, col));
  }
}

// after getting their row and column index,
// we can use a formula to calculate their corresponding HTML id number
const centerTileIndexArr = [];

for (let i = 0; i < centerTilesArr.length; i++) {
  const centerTileIndex =
    centerTilesArr[i].row * numCol + centerTilesArr[i].col;
  centerTileIndexArr.push(centerTileIndex);
}
console.log("center tiles' index: " + centerTileIndexArr);

// this array generates the HTML id of the 8 surrounding tiles of each center tile
// num refers to the HTML id of the center tile u want to check
let surrCenterTileArr = [];
const surrCenterTile = (num) => {
  return (surrCenterTileArr = [
    num - numCol - 1,
    num - numCol,
    num - numCol + 1,
    num - 1,
    num + 1,
    num + numCol - 1,
    num + numCol,
    num + numCol + 1,
  ]);
};

// check how many of the surrounding 8 tiles of each center tile have a value of 9
for (let i = 0; i < centerTileIndexArr.length; i++) {
  surrCenterTile(centerTileIndexArr[i]);
  const somevalue = document.querySelector(`#t${centerTileIndexArr[i]}`);
  for (let j = 0; j < surrCenterTileArr.length; j++) {
    const surrCenterTile = document.querySelector(`#t${surrCenterTileArr[j]}`);

    if (surrCenterTile.value > 8) {
      const somevalue = document.querySelector(`#t${centerTileIndexArr[i]}`);
      somevalue.value += 1;
    }
  }
  console.log(document.querySelector(`#t${centerTileIndexArr[i]}`).value);
}

/////////////////////////////////////////////
///// Assigning Values to CORNER Tiles //////
/////////////////////////////////////////////

///// Top left Corner //////

const topLeftTile = document.querySelector("#t0");
const topLeftCornerValue = () => {
  let tileValue = 0;
  const tile1 = document.querySelector("#t1").value;
  const tile2 = document.querySelector(`#t${numCol}`).value;
  const tile3 = document.querySelector(`#t${numCol + 1}`).value;
  if (tile1 > 8) {
    tileValue += 1;
  }
  if (tile2 > 8) {
    tileValue += 1;
  }
  if (tile3 > 8) {
    tileValue += 1;
  }
  if (topLeftTile.className === "tile mine") {
    return (tileValue = 9);
  }
  return tileValue;
};
topLeftTile.value = topLeftCornerValue();
console.log(topLeftTile.value);

///// Top Right Corner //////

const topRightTile = document.querySelector(`#t${numCol - 1}`);
const topRightCornerValue = () => {
  let tileValue = 0;
  const tile1 = document.querySelector(`#t${numCol - 2}`).value;
  const tile2 = document.querySelector(`#t${2 * numCol - 2}`).value;
  const tile3 = document.querySelector(`#t${2 * numCol - 1}`).value;
  if (tile1 > 8) {
    tileValue += 1;
  }
  if (tile2 > 8) {
    tileValue += 1;
  }
  if (tile3 > 8) {
    tileValue += 1;
  }
  if (topRightTile.className === "tile mine") {
    return (tileValue = 9);
  }
  return tileValue;
};
topRightTile.value = topRightCornerValue();
console.log(topRightTile.value);

///// Bottom Left Corner //////

const bottomLeftTile = document.querySelector(`#t${(numRow - 1) * numCol}`);
const bottomLeftCornerValue = () => {
  let tileValue = 0;
  const tile1 = document.querySelector(`#t${(numRow - 2) * numCol}`).value;
  const tile2 = document.querySelector(`#t${(numRow - 2) * numCol + 1}`).value;
  const tile3 = document.querySelector(`#t${(numRow - 1) * numCol + 1}`).value;
  if (tile1 > 8) {
    tileValue += 1;
  }
  if (tile2 > 8) {
    tileValue += 1;
  }
  if (tile3 > 8) {
    tileValue += 1;
  }
  if (bottomLeftTile.className === "tile mine") {
    return (tileValue = 9);
  }
  return tileValue;
};
bottomLeftTile.value = bottomLeftCornerValue();
console.log(bottomLeftTile.value);

///// Bottom Right Corner //////

const bottomRightTile = document.querySelector(`#t${numRow * numCol - 1}`);
const bottomRightCornerValue = () => {
  let tileValue = 0;
  const tile1 = document.querySelector(`#t${(numRow - 1) * numCol - 2}`).value;
  const tile2 = document.querySelector(`#t${(numRow - 1) * numCol - 1}`).value;
  const tile3 = document.querySelector(`#t${numRow * numCol - 2}`).value;
  if (tile1 > 8) {
    tileValue += 1;
  }
  if (tile2 > 8) {
    tileValue += 1;
  }
  if (tile3 > 8) {
    tileValue += 1;
  }
  if (bottomRightTile.className === "tile mine") {
    return (tileValue = 9);
  }
  return tileValue;
};
bottomRightTile.value = bottomRightCornerValue();
console.log(bottomRightTile.value);

/////////////////////////////////////////////
/////// Assigning Values to EDGE Tiles //////
/////////////////////////////////////////////

//// Left Side /////

// this array generates the HTML id of the 5 surrounding tiles of each left-side tile
// num refers to the HTML id of the center tile u want to check
let surrLeftTileArr = [];
const surrLeftTile = (num) => {
  return (surrLeftTileArr = [
    num - numCol,
    num - numCol + 1,
    num + 1,
    num + numCol,
    num + numCol + 1,
  ]);
};

// generate the list of HTML id of left tiles using numRow and numCol
let leftTileArr = [];
const generateLeftTiles = () => {
  for (let i = 3; i < numRow + 1; i++) {
    leftTileArr.push(numRow * (i - 2));
  }
};
generateLeftTiles();
console.log(leftTileArr);

// for each left tile, loop through its surrounding 5 tiles to check the number of surrounding mines
for (const eachLeftTile of leftTileArr) {
  console.log(eachLeftTile);
  const surrEachLeftTile = surrLeftTile(eachLeftTile);
  console.log(surrEachLeftTile);

  let somevalue = 0;
  for (const eachSurrEachLeftTile of surrEachLeftTile) {
    const theHorribleTile = document.querySelector(`#t${eachSurrEachLeftTile}`);
    const theHorribleTileVal = theHorribleTile.value;

    const theTileInQuestion = document.querySelector(`#t${eachLeftTile}`);
    const theTileInQuestionVal = theTileInQuestion.value;
    if (theHorribleTileVal > 8) {
      somevalue += 1;
    }
    if (theTileInQuestionVal > 8) {
      somevalue = 9;
    }
    theTileInQuestion.value = somevalue;
  }
  console.log(somevalue);
}

//// Right Side /////

// this array generates the HTML id of the 5 surrounding tiles of each right-side tile
// num refers to the HTML id of the right-side tile u want to check
let surrRightTileArr = [];
const surrRightTile = (num) => {
  return (surrRightTileArr = [
    num - numCol - 1,
    num - numCol,
    num - 1,
    num + numCol - 1,
    num + numCol,
  ]);
};

// generate the list of HTML id of right tiles using numRow and numCol
let rightTileArr = [];
const generateRightTiles = () => {
  for (let i = 3; i < numRow + 1; i++) {
    rightTileArr.push(numCol * (i - 1) - 1);
  }
};
generateRightTiles();
console.log(rightTileArr);

// for each right-side tile, loop through its surrounding 5 tiles to check the number of surrounding mines
for (const eachRightTile of rightTileArr) {
  console.log(eachRightTile);
  const surrEachRightTile = surrRightTile(eachRightTile);
  console.log(surrEachRightTile);

  let somevalue = 0;
  for (const eachSurrEachRightTile of surrEachRightTile) {
    const theHorribleTile = document.querySelector(
      `#t${eachSurrEachRightTile}`
    );
    const theHorribleTileVal = theHorribleTile.value;

    const theTileInQuestion = document.querySelector(`#t${eachRightTile}`);
    const theTileInQuestionVal = theTileInQuestion.value;
    if (theHorribleTileVal > 8) {
      somevalue += 1;
    }
    if (theTileInQuestionVal > 8) {
      somevalue = 9;
    }
    theTileInQuestion.value = somevalue;
  }
  console.log(somevalue);
}

/////////////////////////////////////////////
//// Opening Tile Mechanism ////
/////////////////////////////////////////////

// making the tiles "open" on click
container.addEventListener(
  "click",
  (myFunction = (e) => {
    console.log(e.target);
    const clickedTile = e.target;
    if (clickedTile.className === "tile mine") {
      clickedTile.style.backgroundImage = 'url("mine30px.jpg")';
    } else if (clickedTile.className === "tile") {
      clickedTile.innerText = clickedTile.value;
    } else if (clickedTile.value === 0) {
      console.log("Have to do Ripple effect");
    }
  })
);

/////////////////////////////////////////////////////
//// Ripple Effect when tile value = 0 is opened ////
/////////////////////////////////////////////////////

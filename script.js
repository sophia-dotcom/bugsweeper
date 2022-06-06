// tiles are numbered and mines will be assigned to their correspending number
const numRow = 4; //change here
const numCol = 4; //change here
const totalNumOfTiles = numRow * numCol;
const totalNumOfMines = 4; //change here
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
//// Assigning Values to Each Tile ////
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
    // isMine counts how many mines are surroung center tile
    let isMine = 0;
    if (surrCenterTile.value === 9) {
      const somevalue = document.querySelector(`#t${centerTileIndexArr[i]}`);
      somevalue.value += 1;
    }
    // console.log(
    //   "#t" + centerTileIndexArr[i] + " has " + somevalue.value + " mines"
    // );
  }
  console.log(document.querySelector(`#t${centerTileIndexArr[i]}`).value);
}

// const eachSurrTile = document.querySelector()
// if (eachSurrTile.value === 9) {
//   thisTile.value += 1;
// }

// if (checkingTile.value === "9") {
//   tileVal += 1;
//   console.log(tileVal);
// }

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
      clickedTile.innerText = tileVal;
    }
  })
);

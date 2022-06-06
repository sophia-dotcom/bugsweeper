/////////////////////////////////////////////
//// Generating Mines ////
/////////////////////////////////////////////

// tiles are numbered and mines will be assigned to their correspending number
const numRow = 3;
const numCol = 3;
const totalNumOfTiles = numRow * numCol;
const totalNumOfMines = 3;
const mineLocations = [];

// generating random numbers to be set as mine's location
for (let i = 1; i < totalNumOfMines + 1; i++) {
  const eachMineLocation = Math.floor(Math.random() * totalNumOfTiles);
  mineLocations.push(eachMineLocation);
}

// removing the repeated elements
for (let i = 0; i < mineLocations.length; i++) {
  for (let j = 0; j < mineLocations.length; j++) {
    if (i === j) {
      break;
    }
    if (mineLocations[i] === mineLocations[j]) {
      mineLocations.splice(i, 1);
      // generating new element to replace the removed element
      mineLocations.push(Math.floor(Math.random() * totalNumOfTiles));
    }
  }
}
console.log(mineLocations);

// Setting each mine to correspond to a tile
for (let i = 0; i < mineLocations.length; i++) {
  const tile = document.querySelector(`#t${mineLocations[i]}`);
  tile.className = "tile mine";
  // tile.style.backgroundImage = 'url("mine30px.jpg")';
}
// console.log(document.querySelectorAll("span"));

/////////////////////////////////////////////
//// Opening Tile Mechanism ////
/////////////////////////////////////////////

// value will be assigned as the number of mines in direct contact with each tile
// if the tile itself is a mine, it will assigned a value of 9
const container = document.querySelector(".container");
const tileArr = document.querySelectorAll(".tile"); //array of HTML selected tiles
const mineArr = document.querySelectorAll(".mine"); //array of HTML selected mines
// tileVal is for inputting to value selector in HTML
const tileVal = 0;

// first, iterate thru mineArr and assign each mine of value 9
for (let i = 0; i < mineArr.length; i++) {
  mineArr[i].value = 9;
}

console.log(tileArr);
console.log(mineArr);

// this array is for identifying the surrounding 8 tiles to check for mines
// const surr = [
//   `${i - numCol - 1}`,
//   `${i - numCol}`,
//   `${i - numCol + 1}`,
//   `${i - 1}`,
//   `${i + 1}`,
//   `${i + numCol - 1}`,
//   `${i + numCol}`,
//   `${i + numCol + 1}`,
// ];

// check if any of the surrounding 8 tiles have a value of 9
for (let i = 0; i < tileArr.length; i++) {
  // first, exclude the cases where this tile itself has a value of 9
  if (tileArr[i].value != 9) {
    continue;
  }
  // this array is for identifying the surrounding 8 tiles to check for mines
  // iterate through the surrounding 8 tiles of each tile
  console.log(tileArr[i]);
  // for (let j = 0; j < 8; j++) {
  //   const surr = [
  //     j - numCol - 1,
  //     j - numCol,
  //     j - numCol + 1,
  //     j - 1,
  //     j + 1,
  //     j + numCol - 1,
  //     j + numCol,
  //     j + numCol + 1,
  //   ];
  //   // removing edge tiles first (less than 8 surrounding tiles)
  //   if (surr[j] < 0 || surr[j] > tileArr.length) {
  //     console.log("hi");
  //   }

  //   // const eachSurrTile = document.querySelector(`#t${surr[4]}`);
  //   // console.log(eachSurrTile);
  //   // if (eachSurrTile.value === 9) {
  //   //   thisTile.value += 1;
  //   // }
  // }
}
console.log(tileArr);

// if (checkingTile.value === "9") {
//   tileVal += 1;
//   console.log(tileVal);
// }

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

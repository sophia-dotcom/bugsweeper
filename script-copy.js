// Board Set Up // => can add some buttons in UI to change values
// must be at least 3x3
const numRow = 10; //change here
const numCol = 10; //change here
const totalNumOfMines = 15; //change here
// ::::::: CODE STARTS :::::: //

const totalNumOfTiles = numRow * numCol;
const container = document.querySelector(".container");

/////////////////////////////////////////////
//// Generating Board ////
/////////////////////////////////////////////

for (let i = 0; i < numRow; i++) {
  const divRow = document.createElement("div");
  container.append(divRow);

  for (let j = 0; j < numCol; j++) {
    const spanTile = document.createElement("span");
    spanTile.className = `tile r${i} c${j}`;
    spanTile.id = `t${i * numCol + j}`;

    divRow.append(spanTile);
  }
}

/////////////////////////////////////////////
//// Generating Mines ////
/////////////////////////////////////////////

const mineLocationsByClass = [];
const minesSelectedByJquery = [];

// randomising r,c classes to be set as mines
for (let i = 0; i < totalNumOfMines; i++) {
  const mineRow = Math.floor(Math.random() * numRow);
  const mineCol = Math.floor(Math.random() * numCol);

  const mineClass = ".tile.r" + mineRow + ".c" + mineCol;
  const tile = document.querySelector(`${mineClass}`);

  tile.className += " mine";
  mineLocationsByClass.push(tile.className);
  minesSelectedByJquery.push(tile);
}

/////////////////////////////////////////////
///// Assigning Values //////
/////////////////////////////////////////////

/////////////////////////////////////////////
///// Assigning 0 & 9 //////
/////////////////////////////////////////////

// value will be assigned as the number of mines in direct contact with each tile
// if the tile itself is a mine, it will assigned a value of 9
const tileArrJquery = document.querySelectorAll(".tile"); //array of HTML selected tiles
const mineArrJquery = document.querySelectorAll(".mine"); //array of HTML selected mines
// tileVal is for inputting to value selector in HTML

// iterate thru tileArr and assign each tile of value 0 to start with
for (let i = 0; i < tileArrJquery.length; i++) {
  tileArrJquery[i].value = 0;
}

// iterate thru mineArr and assign each mine of value 9
for (let i = 0; i < mineArrJquery.length; i++) {
  mineArrJquery[i].value = 9;
}

console.log(mineLocationsByClass);
console.log(minesSelectedByJquery);

/////////////////////////////////////////////
///// Assigning values 0 - 8 //////
/////////////////////////////////////////////

// this function generates the classes of the 8 surrounding tiles of each tile
for (const tile of tileArrJquery) {
  const row = parseInt(tile.className.split(" ")[1][1]);
  const col = parseInt(tile.className.split(" ")[2][1]);

  // return the `r# c#` class of each surrounding tile
  // will be used twice
  const surrTileGenerator = (row, col) => {
    return (surrTileArrByClass = [
      `.tile.r${row - 1}.c${col - 1}`,
      `.tile.r${row - 1}.c${col}`,
      `.tile.r${row - 1}.c${col + 1}`,
      `.tile.r${row}.c${col - 1}`,
      `.tile.r${row}.c${col + 1}`,
      `.tile.r${row + 1}.c${col - 1}`,
      `.tile.r${row + 1}.c${col}`,
      `.tile.r${row + 1}.c${col + 1}`,
    ]);
  };

  surrTileGenerator(row, col);
  // console.log(surrTileArrByClass);

  // get the 8 surrounding tiles' values using their classes
  for (const eachsurrTileArrByClass of surrTileArrByClass) {
    // console.log(eachsurrTileArrByClass);
    someTile = document.querySelector(eachsurrTileArrByClass);
    // console.log(someTile);

    if (someTile != null) {
      // console.log(someTile.value);
      if (someTile.value > 8) {
        tile.value += 1;
      }
    }

    tile.innerText = tile.value;
  }
}

/////////////////////////////////////////////
//// Opening Tile Mechanism ////
/////////////////////////////////////////////

container.addEventListener(
  "click",
  (myFunction = (e) => {
    console.log(e.target);
    const clickedTile = e.target;
    const clickedClass = clickedTile.className;
    // console.log(clickedClass);

    // making the tiles "open" on click
    if (clickedClass[clickedClass.length - 1] == "e") {
      clickedTile.style.backgroundImage = 'url("mine30px.jpg")';
    } else if (clickedTile.value === 0) {
      clickedTile.innerText = "";
    } else if (clickedTile[0] === "t") {
      clickedTile.innerText = clickedTile.value;
    }
  })
);

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

// console.log(mineLocationsByClass);
// console.log(minesSelectedByJquery);

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
  }
}

/////////////////////////////////////////////
//// Opening Tile Mechanism ////
/////////////////////////////////////////////

container.addEventListener(
  "click",
  (myFunction = (e) => {
    // console.log(e.target);
    const clickedTile = e.target;
    const clickedClass = clickedTile.className;
    // console.log(clickedClass);

    // making the tiles "open" on click
    if (clickedClass[clickedClass.length - 1] == "e") {
      clickedTile.style.backgroundImage = 'url("bug.png")';
      clickedTile.style.backgroundColor = "rgb(209, 20, 20)";
      clickedTile.style.borderColor = "rgb(80, 80, 80)";
      // clickedTile.style.width = "30px";
      // clickedTile.style.height = "32px";
      // clickedTile.style.padding = "2px";
      // set Time Interval

      for (const eachMine of minesSelectedByJquery) {
        // console.log(eachMine);
        // const foundYouMine = document.querySelector(`.${eachMine}`);
        // console.log(foundYouMine);
        eachMine.style.backgroundImage = 'url("bug.png")';
        eachMine.style.border = "1px solid rgb(80, 80, 80)";
        eachMine.style.width = "30px";
        eachMine.style.height = "30px";
        eachMine.style.padding = "2px";
        // setTimeout(
        //   ((eachMine.style.backgroundImage = 'url("bug.png")'), 5000)
        // );
      }
    } else if (clickedTile.value === 0) {
      // clickedTile.innerText = "";
      clickedTile.style.border = "1px solid rgb(80, 80, 80)";
      clickedTile.style.width = "30px";
      clickedTile.style.height = "30px";
      clickedTile.style.padding = "2px";

      let zeroArray = [];

      // this function generates the classes of the 8 surrounding tiles of each tile

      const row = parseInt(clickedTile.className.split(" ")[1][1]);
      const col = parseInt(clickedTile.className.split(" ")[2][1]);

      // return the `r# c#` class of each surrounding tile
      // will be used twice
      const surrTileGenerator = (row, col) => {
        let anotherArr = [];

        if (row > -1 && col > -1 && row < numRow && col < numCol) {
          surrTileArrByClass = [
            `.tile.r${row - 1}.c${col - 1}`,
            `.tile.r${row - 1}.c${col}`,
            `.tile.r${row - 1}.c${col + 1}`,
            `.tile.r${row}.c${col - 1}`,
            `.tile.r${row}.c${col + 1}`,
            `.tile.r${row + 1}.c${col - 1}`,
            `.tile.r${row + 1}.c${col}`,
            `.tile.r${row + 1}.c${col + 1}`,
          ];
          // .tile.r4.c5

          for (let i = 0; i < surrTileArrByClass.length; i++) {
            let row4 = surrTileArrByClass[i].split(".")[2];
            row4 = row4.substring(1);
            parseInt(row4);

            let col4 = surrTileArrByClass[i].split(".")[3];
            col4 = col4.substring(1);
            parseInt(col4);

            if (
              row4 < 0 ||
              col4 < 0 ||
              row4 > numRow - 1 ||
              col4 > numCol - 1
            ) {
              // console.log("removing the junk");
              anotherArr.push(i);
            }
          }
        }
        // console.log(anotherArr);
        for (let i = anotherArr.length - 1; i > -1; i--) {
          surrTileArrByClass.splice(anotherArr[i], 1);
        }
        // console.log(surrTileArrByClass);
      };
      // now surrTileGenerates the classNames of all valid tiles
      surrTileGenerator(row, col);

      // get the 8 surrounding tiles' values using their classes
      for (const eachsurrTileArrByClass of surrTileArrByClass) {
        // console.log(eachsurrTileArrByClass);

        someTile = document.querySelector(eachsurrTileArrByClass);
        // console.log(someTile);

        //prevent repeats
        for (let i = 0; i < zeroArray.length; i++) {
          if (someTile === zeroArray[i]) {
            zeroArray.splice(i, 1);
          }
        }

        if (someTile.value === 0) {
          zeroArray.push(someTile);
        }
      }
      // console.log(zeroArray);

      for (let i = 0; i < totalNumOfTiles; i++) {
        for (const item of zeroArray) {
          const row2 = parseInt(item.className.split(" ")[1][1]);
          const col2 = parseInt(item.className.split(" ")[2][1]);
          // console.log(row2);
          // return the `.tile.r#.c#` class of each surrounding tile
          // will be used twice

          surrTileGenerator(row2, col2);
          // console.log(surrTileArrByClass);

          // get the 8 surrounding tiles' values using their classes
          for (const eachsurrTileArrByClass of surrTileArrByClass) {
            someTile = document.querySelector(eachsurrTileArrByClass); //line doesnt work
            // console.log(someTile);

            //prevent repeats
            for (let i = 0; i < zeroArray.length; i++) {
              if (someTile === zeroArray[i]) {
                zeroArray.splice(i, 1);
              }
            }

            if (someTile.value === 0) {
              zeroArray.push(someTile);
            }
          }
        }
      }
      // console.log(zeroArray);

      //after finalising the zero array, open all surrounding tiles of the zero array

      for (const cursedZero of zeroArray) {
        cursedZero.innerText = "";

        const row2 = parseInt(cursedZero.className.split(" ")[1][1]);
        const col2 = parseInt(cursedZero.className.split(" ")[2][1]);

        surrTileGenerator(row2, col2);
        // return surrTileArrByClass
        // console.log(surrTileArrByClass);

        for (const eachCursedSurrTile of surrTileArrByClass) {
          const theCursed = document.querySelector(eachCursedSurrTile);

          theCursed.innerText = theCursed.value;
          theCursed.style.border = "1px solid rgb(80, 80, 80)";
          theCursed.style.width = "30px";
          theCursed.style.height = "30px";
          theCursed.style.padding = "2px";

          if (theCursed.innerText === "0") {
            theCursed.innerText = "";
          } else if (theCursed.innerText === "1") {
            theCursed.style.color = "blue";
          } else if (theCursed.innerText === "2") {
            theCursed.style.color = "green";
          } else if (theCursed.innerText === "3") {
            theCursed.style.color = "rgb(209, 20, 20)";
          }
        }
      }
    } else if (clickedClass[0] === "t") {
      clickedTile.innerText = clickedTile.value;
      clickedTile.style.border = "1px solid rgb(80, 80, 80)";
      clickedTile.style.width = "30px";
      clickedTile.style.height = "30px";
      clickedTile.style.padding = "2px";

      if (clickedTile.innerText === "1") {
        clickedTile.style.color = "blue";
      } else if (clickedTile.innerText === "2") {
        clickedTile.style.color = "green";
      } else if (clickedTile.innerText === "3") {
        clickedTile.style.color = "rgb(209, 20, 20)";
      }
    }
  })
);

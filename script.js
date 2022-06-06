/////////////////////////////////////////////
//// Generating Mines ////
/////////////////////////////////////////////

// tiles are numbered and mines will be assigned to their correspending number
const totalNumOfTiles = 9;
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
      continue;
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
console.log(document.querySelectorAll("span"));

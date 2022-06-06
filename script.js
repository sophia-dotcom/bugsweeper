//// Randomise mines and prevent repeats
const totalNumOfTiles = 9;
const totalNumOfMines = 3;
const mineLocations = [];

for (let i = 1; i < totalNumOfMines + 1; i++) {
  const eachMineLocation = Math.floor(Math.random() * totalNumOfTiles);
  mineLocations.push(eachMineLocation);
}
console.log(mineLocations);

// removing the repeated element
for (let i = 0; i < mineLocations.length; i++) {
  for (let j = 0; j < mineLocations.length; j++) {
    if (i === j) {
      continue;
    }
    // console.log(mineLocations[j]);
    if (mineLocations[i] === mineLocations[j]) {
      console.log(mineLocations[i]);
      mineLocations.splice(i, 1);
      console.log(mineLocations);
      // generating a new element to replace the removed element
      mineLocations.push(Math.floor(Math.random() * totalNumOfTiles));
      console.log(mineLocations);
    }
  }
}

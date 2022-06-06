//// Randomise mines and prevent repeats
const totalNumOfTiles = 9;
const totalNumOfMines = 3;
const mineLocations = [];

for (let i = 1; i < totalNumOfMines + 1; i++) {
  const eachMineLocation = Math.floor(Math.random() * totalNumOfTiles);
  mineLocations.push(eachMineLocation);
}
console.log(mineLocations);
for (let i = 0; i < mineLocations.length; i++) {
  for (let j = 0; j < mineLocations.length; j++) {
    if (i === j) {
      continue;
    }
    // console.log(mineLocations[i]);
    // console.log(mineLocations[j]);
    if (mineLocations[i] === mineLocations[j]) {
      console.log("Repeated MIne");
      console.log(mineLocations[i]);
    }
  }
}

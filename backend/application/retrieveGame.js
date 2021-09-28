const { stringToObjectId } = require('./connection');

/**
 * findGame
 * @param db -- the database connection
 * @param gameid -- the gameid to find
 * @return gameid if found.  Otherwise, null.
 */
const findGame = async (db, gameid) => {

	if (!gameid) {
		return null;
	}
	let gameCollection = db.collection("game");

	let game = await gameCollection.distinct("_id", {"_id": gameid});
	return game.length > 0 ? game[0] : null;
};

const retrieveGameInitial = async (db, gameid, role, team) => {
  const game = await retrieveGame(db, gameid, {assetGrid: 0});

  let gameData = {};
  gameData.grid = removeColorFromGrid(game.grid, role);
  gameData.rowSize = game.size.split("x")[0];

  return gameData;
}

const retrieveGame = async (db, gameid, projection) => {
  if (!gameid) {
    throw "Game id is required.";
  }
  const gameCollection = db.collection("game");

  const game = await gameCollection.findOne({_id: gameid}, projection);

  if (!game) {
    throw "Game was not found.";
  }

  return game;
}

const retrieveGameAssets = async (db, gameid) => {
  const game = await retrieveGame(db, gameid, {assetGrid: 1});
  return game.assetGrid;
}

const retrieveGameChanges = async (db, gameid, role, team) => {
  const game = await retrieveGame(db, gameid, {
    grid: 1
  });

  let gameData = {};
  gameData.grid = removeColorFromGrid(game.grid, role);

  return gameData;
}

const removeColorFromGrid = (grid, role) => {

  // If player, do not send the color attribute.
  if (role !== "M") {
    grid = grid.map((elem, index) => {
      delete elem.color;
      return elem;
    });
  }
  return grid;
}

module.exports = {
	retrieveGameInitial,
  retrieveGameAssets,
  retrieveGameChanges,
	findGame
};

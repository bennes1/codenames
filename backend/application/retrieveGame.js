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

/**
 * retrieveGameInitial
 * Retrieve the game with setup information.  Does not include asset info.
 * @param db -- the database connection
 * @param gameid -- the game id (objectid)
 * @param role -- the role of the logged in user (RM, BM, RP, BP)
 * @return gameData -- all needed data to setup (except for asset info.)
 */
const retrieveGameInitial = async (db, gameid, role) => {
  const game = await retrieveGame(db, gameid, {assetGrid: 0});

  let gameData = {};
  gameData.grid = removeColorFromGrid(game.grid, role);
  gameData.rowSize = game.size.split("x")[0];

  return gameData;
}

/**
 * retrieveGame
 * Main function to get the data from the game.  It is called multiple times
 * with the only difference being the projection.
 * @param db -- the database connection
 * @param gameid -- the game id (objectid)
 * @param projection -- the projection of the game using normal find rules
 * @return -- the game record from the database
 */
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

/**
 * retrieveGameAssets
 * @param db -- the database connection
 * @param gameid -- the game id (objectid)
 * @return assetGrid -- a list of asset info: picture data or words
 */
const retrieveGameAssets = async (db, gameid) => {
  const game = await retrieveGame(db, gameid, {assetGrid: 1});
  return game.assetGrid;
}

/**
 * retrieveGameChanges
 * @param db -- the database connection
 * @param gameid -- the game id (objectid)
 * @return gameData -- only the parts of the game that changed
 */
const retrieveGameChanges = async (db, gameid, role) => {
  const game = await retrieveGame(db, gameid, {
    grid: 1
  });

  let gameData = {};
  gameData.grid = removeColorFromGrid(game.grid, role);

  return gameData;
}

/**
 * removeColorFromGrid
 * For convenience, the color info is in the main grid.  This is unused for the
 * player and so, do not send it to the client.
 * @grid -- the game.grid property
 * @role -- the role of the logged in user: RM, BM, RP, BP.
 * @return -- grid without the color property if player
 */
const removeColorFromGrid = (grid, role) => {

  // If player, do not send the color attribute.
  if (["RM", "BM"].indexOf(role) === -1) {
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
  retrieveGame,
	findGame
};

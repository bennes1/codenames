const { stringToObjectId } = require("./connection.js");

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

	let objectId = stringToObjectId(gameid);
	if (!objectId) {
		return null;
	}

	let game = await gameCollection.distinct("_id", {"_id": objectId});
	return game.length > 0 ? game[0] : null;
}

/**
 * retrieveGameGrid
 * @param db -- the database connection
 * @param gameid -- the gameid to retrieve
 * @param role -- "M" for codemaster, "P" for player.  If codemaster, color info
 * is returned.
 * @return double array grid with assetids, colors, and if asset is covered.
 * @throws if the game cannot be found.
 *
 * @TODO: I have not figured out I want to get and retrieve role information.
 */
const retrieveGameGrid = async (db, gameid, role) => {

	if (!gameid) {
		throw "Game id is required.";
	}
	let gameCollection = db.collection("game");

	let objectId = stringToObjectId(gameid);
	if (!objectId) {
		throw "Game was not found.";
	}

	let game = await gameCollection.findOne({_id: objectId});

	if (!game) {
		throw "Game was not found.";
	}

	return rearrangeGameGrid(game, role);
}

/**
 * rearrangeGameGrid
 * @param game -- the game document from the database.
 * @param role -- "M" for codemaster and "P" for player.
 * @return double array grid with assetids, colors, and if asset is covered.
 *
 * @TODO: Add covers from guesses.
 */
const rearrangeGameGrid = (game, role) => {
	data = {};
	data.grid = [];
	data.starter = game.starter;
	let [x,y] = game.size.split("x");
	let counter = 0;
	for(i = 0; i != y; i++) {
		let row = [];
		for (j = 0; j != x; j++) {
			let record = {};

			if (game.type === "B") {
				record.type = counter % 2 === 1 ? "P" : "W";
			} else {
				record.type = game.type;
			}
			record.cover = "T";

			if (role === "M") {
				record.color = game.colorList[counter];
			}
			record.assetid = game.wpList[counter];
			row.push(record);
			counter++;
		}
		data.grid.push(row);
	}
	return data;
}

/**
 * retrieveAsset
 * @param db -- the database connection
 * @param assetid -- the asset id to retrieve
 * @return base64 encoding of picture or word from database
 * @throws if asset was not found
 */
const retrieveAsset = async (db, assetid) => {
	if (!assetid) {
		throw "Asset id is required.";
	}
	let assetCollection = db.collection("asset");

	let objectId = stringToObjectId(assetid);
	if (!objectId) {
		throw "Asset was not found.";
	}

	let asset = await assetCollection
		.findOne({_id: objectId}, {name: 0, collection: 0});
	if (!asset) {
		throw "Asset was not found.";
	}
	return asset;
}

module.exports = {
	retrieveGameGrid,
	findGame,
	retrieveAsset
};

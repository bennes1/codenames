const { getGuessesAfter } = require('./manipulateGuess');
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
	const gameCollection = db.collection("game");

	const game = await gameCollection.findOne({_id: gameid});

	if (!game) {
		throw "Game was not found.";
	}

	const guesses = await getGuessesAfter(db, gameid);

	let lastid = null, guessMap = {};
	if (guesses && guesses.length > 0) {
		for(let i = 0; i != guesses.length; i++) {
			if (i == 0) {
				lastid = guesses[i]._id;
			}
			guessMap[guesses[i].position] = guesses[i].result;
		}
	}

	let [grid, rowSize] = rearrangeGameGrid(game, role, guessMap);
	lastid = (guesses && guesses.length > 0 ? guesses[0]._id : null);
	if (!lastid) {
		lastid = stringToObjectId();
	}

	return {
		starter: game.starter,
		grid: grid,
		rowSize: rowSize,
		lastid: lastid
	};
};

/**
 * rearrangeGameGrid
 * @param game -- the game document from the database.
 * @param role -- "M" for codemaster and "P" for player.
 * @return double array grid with assetids, colors, and if asset is covered.
 */
const rearrangeGameGrid = (game, role, guessMap) => {
	let grid = [];
	let [x,y] = game.size.split("x");
	let counter = 0;
	for(i = 0; i != y; i++) {
		let row = [];
		for (j = 0; j != x; j++) {
			let record = {};
			record.key = counter;

			if (game.type === "B") {
				record.type = counter % 2 === 1 ? "P" : "W";
			} else {
				record.type = game.type;
			}
			record.cover = guessMap[counter] ? guessMap[counter] : "T";

			if (role === "M") {
				record.color = game.colorList[counter];
			}
			record.assetid = game.wpList[counter];
			row.push(record);
			counter++;
		}
		grid.push(row);
	}
	return [grid, x];
};

module.exports = {
	retrieveGameGrid,
	findGame
};

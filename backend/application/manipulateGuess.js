const { retrieveAssetColor } = require('./retrieveAsset');

/**
 * tryGuess
 * @param db -- the database connection
 * @param gameid -- the game id (object id)
 * @param position -- the position in the grid
 * @param team -- the team (red|blue).  If the guess is not the right color,
 * turn ends.
 * @return true|false -- true if still same turn.
 *
 * @TODO: Change turn if last guess or wrong result.
 */
const tryGuess = async(db, gameid, position, team) => {

	if (["R", "B"].indexOf(team) === -1) {
		throw "Team needs to be red or blue.";
	}
	const colorResult = await retrieveAssetColor(db, gameid, position);

	let guesses = db.collection("guess");
	let doc = {
		gameid: gameid,
		position: position,
		team: team,
		result: colorResult
	}

	let inserted = await guesses.insertOne(doc);

	let success = team === colorResult;
	return success;
}

/**
 * getGuessesAfter
 * Get the guesses after the lastid known for the game.
 * @param db -- the database connection
 * @param gameid -- the game id (object id)
 * @param lastid -- the last guess id known (object id)
 * If the lastid is not enter or is null, it will return all guesses.
 * @return list of guesses after lastid
 */
const getGuessesAfter = async(db, gameid, lastid = null) => {
	if (!gameid) {
		throw "Game id is required.";
	}

	let guessCollection = db.collection("guess");

	let filter = {
		gameid: gameid
	};

	// This is possible because the first 4 bytes are the timestamp
	if (lastid) {
		filter._id = {$gt: lastid};
	}

	let guesses = await guessCollection
		.find()
		.filter(filter)
		.sort({_id: -1})
		.toArray();
	return guesses;
}

module.exports = {
	tryGuess,
	getGuessesAfter
};

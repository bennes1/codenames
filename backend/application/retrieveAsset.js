
/**
 * retrieveAsset
 * @param db -- the database connection
 * @param assetid -- the asset id to retrieve
 * @return base64 encoding of picture or word from database
 * @throws if asset was not found
 */
const retrieveAsset = async (db, assetid, type) => {
	if (!assetid) {
		throw "Asset id is required.";
	}
	let assetCollection = db.collection("asset");

	let asset = await assetCollection
		.findOne({_id: assetid}, {name: 0, collection: 0});
	if (!asset) {
		throw "Asset was not found.";
	}

	if (type !== asset.type) {
		throw "Asset is wrong type.";
	}

	return asset.value;
};

/**
 * retrieveAssetColor
 * This retrieves the color of the asset.  This is used when the player guesses.
 * @param db -- the database connection
 * @param gameid -- the game id (object id)
 * @param position -- the position of the asset to retrieve
 * @return string -- the color: "B", "R", "W", "A"
 */
const retrieveAssetColor = async (db, gameid, position) => {
	if (!gameid) {
		throw "Game id is required.";
	}
	let gameCollection = db.collection("game");

	let results = await gameCollection.aggregate([
		{ $match: {
			_id: gameid
		}},
		{ $project: {
			result: {
				$slice: ["$colorList", position, 1]
			},
			_id: 0
		}}
	]).next();

	let color = results.result;
	if (color.length > 0) {
		color = color[0];
	} else {
		throw "Color was not found.";
	}
	return color;
};

module.exports = {
	retrieveAsset,
	retrieveAssetColor
};

/**
 * function createGame
 * This function sets up the game id and the parameters necessary.
 * I intend to read from a frontend form and save it in the database.
 * @todo Should I include options to include or exclude collections?
 *
 * @param size -- currently the opstions are "5X5" or "5X4"
 * @param type -- Pictures, words, or both
 * @return null (but at this point the document is saved.)
 */
async function createGame(db, size, type) {
	if (!size || size.trim() == "") {
		throw "Size is required.";
	}
	if (!type || type.trim() == "") {
		throw "Type is required.";
	}
	if (["5x5", "5x4"].indexOf(size) == -1) {
		throw "Size is not allowed.";
	}
	if (["W", "P", "B"].indexOf(type) == -1) {
		throw "Type is not allowed.";
	}

	let gameCollection = db.collection("game");
	let assetCollection = db.collection("asset");
	let amount = size == "5x5" ? 25 : 20;

	let doc = {size: size, type: type};

	// Create array of words or picture object ids
	doc.wpList = await setupGridAssets(assetCollection, amount, type);

	// Create colors
	results = setupGridColors(size);
	doc.colorList = results[1];
	doc.starter = results[0];

	let inserted = await gameCollection.insertOne(doc);

	return inserted.insertedId;
};

/**
 * function returnRandAssetArray
 * This pulls out the entire ids of either pics or words within the asset
 * collection, randomizes and picks the amount of object ids and returns the
 * array.
 *
 * @param collection -- handle to the asset collection
 * @param type -- the type of asset: "picture" or "word"
 * @param amount -- the total length of the array
 * @return string array of asset object ids
 */
async function returnRandAssetArray(collection, type, amount) {
	let cursor = await collection
		.distinct("_id", {type: type});
	cursor.sort(function (a, b) {
		return Math.random() - 0.5
	});
	return cursor.slice(0, amount);
	let wpList = [];
	for(let i = 0; i != amount; i++ ) {
		wpList[i] = cursor[i].str;
	}
	return wpList;
}

/**
 * function setupGridAssets
 * This creates an array of pictures, words, or both (depending on type.)
 *
 * @param collection -- the asset collection
 * @param amount -- the length of the array
 * @param type -- "picture", "word", or "both": this determines what assets.
 * @return string array of asset object ids (in particular type.)
 */
async function setupGridAssets(collection, amount, type) {

	let wpList = [];
	if (type == "both") {
		// This is different
		let picAmount = amount % 2 == 1 ? amount / 2 + 1 : amount / 2;
		let wordAmount = amount / 2;
		let pics = await returnRandAssetArray(
			collection, "picture", picAmount
		);
		let words = await returnRandAssetArray(
			collection, "word", wordAmount
		);

		// It needs to alternate between pictures and words
		for(let i = 0; i != amount; i++) {
			if (i % 2 == 1) {
				wpList.push(pics[i]);
			} else {
				wpList.push(words[i]);
			}
		}
	} else {
		wpList = await returnRandAssetArray(collection, type, amount);
	}

	return wpList;
}

/**
 * function setupGridColors
 * This sets up a grid of colors according to the official codenames numbers.
 * There is always (currently) one assassin but there is no reason why I
 * couldn't open up a scenario with multiple later.  Blue and red are about
 * the same number except one is more which also determines who starts.  I set
 * white to the reminder.
 *
 * @param size -- "5x5" or "5x4": there are specific rules determining colors.
 */
function setupGridColors(size) {
	// "5x5" grid for regular game
	let assassins = 1, blues = 8, reds = 8, amount = 25;
	if (size == "5x4") {
		blues = 7;
		reds = 7;
		amount = 20;
	}

	// Determine which team has the extra tile and starts.
	let coinflip = Math.random();
	let starter = null;
	if (coinflip >= 0.5) {
		blues++;
		starter = "B";
	} else {
		reds++;
		starter = "R";
	}

	let whites = amount - assassins - blues - reds;
	let colorGrid = "W".repeat(whites)
		+ "A".repeat(assassins)
		+ "B".repeat(blues)
		+ "R".repeat(reds);
	colorGrid = colorGrid.split("").sort((a, b) => {
		return Math.random() - 0.5;
	});

	return [starter, colorGrid];
}

module.exports = createGame;

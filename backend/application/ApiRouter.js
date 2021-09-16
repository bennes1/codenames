// server.js
const express = require("express");
const router = express.Router();
const { mongoConnect, stringToObjectId } = require("./connection");
const url = require('url');
const createGame = require("./createGame");
const { retrieveGameGrid, findGame, retrieveAsset } = require("./retrieveGame");

/**
 * "/initializeGame" route.  This create a new game document with pics/words
 * & color setup.  It does not start the game.
 */
router.post("/initializeGame", (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	let size = req.body.size;
	let type = req.body.type;
	let dbConnection = null;

	mongoConnect()
		.catch((err) => {
			console.error(err);
			let json = {status: "999", error: "Connection error."};
			res.end(JSON.stringify(json));
		}).then((client) => {
			let db = client.db("codenames");
			dbConnection = client;
			return createGame(db, size, type);
		}).then((result) => {
			let json = {status: "000", error: "", gameid: result};
			res.end(JSON.stringify(json));
		}).catch((err) => {
			console.error(err);
			let json = {status: "998", error: err};
			res.end(JSON.stringify(json));

		}).finally(() => {
			dbConnection.close();
		});
});

/**
 * findGame
 * This will return the gameid if it is found.  Otherwise, it will return empty.
 */
router.get("/findGame", (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	const queryObject = url.parse(req.url,true).query;

	let gameid = stringToObjectId(queryObject.gameid);
	let dbConnection = null;

	mongoConnect()
		.catch((err) => {
			console.error(err);
			let json = {status: "999", error: "Connection error."};
			res.end(JSON.stringify(json));
		}).then((client) => {
			let db = client.db("codenames");
			dbConnection = client;
			return findGame(db, gameid);
		}).then((result) => {
			let json = {status: "000", error: "", found: result};
			res.end(JSON.stringify(json));
		}).catch((err) => {
			console.error(err);
			let json = {status: "998", error: err};
			res.end(JSON.stringify(json));
		}).finally(() => {
			dbConnection.close();
		});
});

/**
 * retrieveGameGrid
 * This will return all the information required for showing the grid.  This is
 * dependent on the role.  For codemasters, the color information is returned.
 */
router.get("/retrieveGameGrid", (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	const queryObject = url.parse(req.url,true).query;

	let gameid = stringToObjectId(queryObject.gameid);
	let role = queryObject.role;
	let dbConnection = null;

	mongoConnect()
		.catch((err) => {
			console.error(err);
			let json = {status: "999", error: "Connection error."};
			res.end(JSON.stringify(json));
		}).then((client) => {
			let db = client.db("codenames");
			dbConnection = client;
			return retrieveGameGrid(db, gameid, role);
		}).then((result) => {
			let json = {status: "000", error: "", gameData: result};
			res.end(JSON.stringify(json));
		}).catch((err) => {
			console.error(err);
			let json = {status: "998", error: err};
			res.end(JSON.stringify(json));
		}).finally(() => {
			dbConnection.close();
		});
});

/**
 * retrieveAsset
 * This returns the content for each asset.  This can be the base64 encoding of
 * an image or it can be a word.
 */
router.get("/retrieveAsset", (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	const queryObject = url.parse(req.url,true).query;

	let assetid = stringToObjectId(queryObject.assetid);
	let type = queryObject.type;
	let dbConnection = null;

	mongoConnect()
		.catch((err) => {
			console.error(err);
			let json = {status: "999", error: "Connection error."};
			res.end(JSON.stringify(json));
		}).then((client) => {
			let db = client.db("codenames");
			dbConnection = client;
			return retrieveAsset(db, assetid);
		}).then((result) => {
			let json = {status: "000", error: ""};
			if (type !== result.type) {
				json.status = "997";
				json.error = "Asset is wrong type.";
			} else {
				json.value = result.value;
			}
			res.end(JSON.stringify(json));
		}).catch((err) => {
			console.error(err);
			let json = {status: "998", error: err};
			res.end(JSON.stringify(json));
		}).finally(() => {
			dbConnection.close();
		});
});

/**
 * "/test" route.  This tests a simple output of an image in the database.
 */
router.get("/test", async (req, res) => {
	let client = await mongoConnect();
	let db = client.db("codenames");

	let asset = await db
		.collection("asset")
		.find({name: /businessman/})
		.next();

	if (!asset) {
		res.send("No asset found.");
		return;
	}

	await client.close();

	let image = "<img src=\"data:image/jpeg;base64," + asset.value + "\"/>";
	res.send(image);
});

module.exports = router;




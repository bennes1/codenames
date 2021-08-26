// server.js
const express = require("express");
const router = express.Router();
const mongoConnect = require("./connection");
const PORT = 8080;
const createGame = require("./createGame");

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
			let json = {status: "666", error: err};
			res.end(JSON.stringify(json));
		}).then((client) => {
			let db = client.db("codenames");
			dbConnection = client;
			return createGame(db, size, type);
		}).catch((err) => {
			console.error(err);
			let json = {status: "666", error: err};
			res.end(JSON.stringify(json));
		}).then((result) => {

			let json = {status: "000", error: "", gameid: result};
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




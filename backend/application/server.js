// server.js
const express = require("express");
const app = express();
const mongoConnect = require("./connection");
const PORT = 8080;
const createGame = require("./createGame");

/**
 * "/" route.  Keep for testing if server is up.
 */
app.get("/", (req, res) => {
	res.send("Successful response");
});

/**
 * "/test" route.  This tests a simple output of an image in the database.
 */
app.get("/test", async (req, res) => {
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

/**
 * "/createGame" route.  This create a new game document with pics/words
 * & color setup.  It does not start the game.
 */
app.get("/createGame", (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	let size = req.query.size;
	let type = req.query.type;
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

app.listen(PORT, function() {
 console.log(`Listening on ${PORT}`);
});




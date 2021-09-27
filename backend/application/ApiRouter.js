// server.js
const express = require("express");
const router = express.Router();
const { mongoConnect, stringToObjectId } = require("./connection");
const url = require('url');
const createGame = require("./createGame");
const { retrieveGameGrid, findGame } = require("./retrieveGame");
const { tryGuess, getGuessesAfter } = require("./manipulateGuess");
const { retrieveAsset } = require("./retrieveAsset");

/**
 * runDBRequest
 * Opens a json request.  Opens the mongo connection.  Runs the function to
 * execute.  Closes the mongo connection.
 * This logic was repeated multiple times in this file.
 *
 * @param res -- the response of the router.
 * @param callback -- the callback to execute.  Provides the db handle.
 */
const runDBRequest = (res, callback) => {
	let dbConnection = null;
	res.setHeader('Content-Type', 'application/json');

	mongoConnect()
		.catch((err) => {
			console.error(err);
			const json = {status: "999", error: "Connection error."};
			res.end(JSON.stringify(json));
		}).then((client) => {
			const db = client.db("codenames");
			dbConnection = client;

			return callback(db);
		}).then((data) => {
			const json = {status: "000", error: "", data: data};
			res.end(JSON.stringify(json));
		}).catch((err) => {
			console.error(err);
      let json = {};
      if (typeof err === "string") {
        // User defined
        json.status = "998";
        json.error = err;
      } else {
        json.status = "997";
        json.error = "Error from the database.  Probably Syntax.";
      }
			res.end(JSON.stringify(json));

		}).finally(() => {
			dbConnection.close();
		});
}

/**
 * "/initializeGame" route.  This create a new game document with pics/words
 * & color setup.  It does not start the game.
 */
router.post("/initializeGame", (req, res) => {

	let size = req.body.size;
	let type = req.body.type;

	runDBRequest(res, (db) => createGame(db, size, type));
});

/**
 * findGame
 * This will return the gameid if it is found.  Otherwise, it will return empty.
 */
router.get("/findGame", (req, res) => {

	const queryObject = url.parse(req.url,true).query;
	let gameid = stringToObjectId(queryObject.gameid);

	runDBRequest(res, (db) => findGame(db, gameid));
});

/**
 * retrieveGameGrid
 * This will return all the information required for showing the grid.  This is
 * dependent on the role.  For codemasters, the color information is returned.
 */
router.get("/retrieveGameGrid", (req, res) => {

	const queryObject = url.parse(req.url,true).query;
	let gameid = stringToObjectId(queryObject.gameid);
	let role = queryObject.role;

	runDBRequest(res, (db) => retrieveGameGrid(db, gameid, role));
});

/**
 * retrieveAsset
 * This returns the content for each asset.  This can be the base64 encoding of
 * an image or it can be a word.
 */
router.get("/retrieveAsset", (req, res) => {

	const queryObject = url.parse(req.url,true).query;
	let assetid = stringToObjectId(queryObject.assetid);
	let type = queryObject.type;

	runDBRequest(res, (db) => retrieveAsset(db, assetid, type));
});

/**
 * tryGuess
 * This simulates a red or blue team member touching a card.  It records the
 * guess and any turn or clue changes.
 */
router.post("/tryGuess", (req, res) => {

	let gameid = stringToObjectId(req.body.gameid);
	let position = req.body.position;
	let team = req.body.team;

	runDBRequest(res, (db) => tryGuess(db, gameid, position, team));
});

/**
 * getMoreGuesses
 * This gets the most recent guesses for the game.  The most recent guessid
 * found is used for retrieval.
 */
router.get("/getMoreGuesses", async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	const queryObject = url.parse(req.url,true).query;
	let gameid = stringToObjectId(queryObject.gameid);
	let lastid = stringToObjectId(queryObject.lastid);
	let type = queryObject.type;

	runDBRequest(res, (db) => getGuessesAfter(db, gameid, lastid));
});

module.exports = router;

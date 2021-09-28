// server.js
const express = require("express");
const router = express.Router();
const url = require('url');

const {
  mongoConnect,
  stringToObjectId
} = require("./connection");

const {
  createGame
} = require("./createGame");
const {
  retrieveGameInitial,
  retrieveGameAssets,
  retrieveGameChanges,
  findGame
} = require("./retrieveGame");
const {
  tryGuess,
  upsertRole
} = require("./modifyGame");

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
router.get("/retrieveGameInitial", (req, res) => {

	const queryObject = url.parse(req.url,true).query;
	const gameid = stringToObjectId(queryObject.gameid);
	const role = queryObject.role;
  const team = queryObject.team;

	runDBRequest(res, (db) => retrieveGameInitial(db, gameid, role, team));
});

router.get("/retrieveGameChanges", (req, res) => {

  const queryObject = url.parse(req.url,true).query;
  const gameid = stringToObjectId(queryObject.gameid);
  const role = queryObject.role;
  const team = queryObject.team;

  runDBRequest(res, (db) => retrieveGameChanges(db, gameid, role, team));
});

router.get("/retrieveGameAssets", (req, res) => {

  const queryObject = url.parse(req.url,true).query;
  const gameid = stringToObjectId(queryObject.gameid);

  runDBRequest(res, (db) => retrieveGameAssets(db, gameid));
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
 * upsertRole
 * Creates or updates the role of the user.  (Depends on if the roleid is null.)
 */
router.post("/upsertRole", (req, res) => {

  const gameid = stringToObjectId(req.body.gameid);

  // roleid comes in as null or an objectid.
  let roleid = req.body.roleid;
  if (roleid) {
    roleid = stringToObjectId(roleid);
  }

  const team = req.body.team;
  const role = req.body.role;

  runDBRequest(res, (db) => upsertRole(db, gameid, roleid, team, role));
});

module.exports = router;

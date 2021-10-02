const { stringToObjectId } = require("./connection");
const { retrieveGame } = require("./retrieveGame");
const { getRoleMessages } = require("./verifyGame");

/**
 * tryGuess
 * @param db -- the database connection
 * @param gameid -- the game id (object id)
 * @param position -- the position in the grid
 * @param role -- roles of (r)ed or (b)lue code(m)asters or (p)layers.
 * @return true|false -- true if still same turn.
 *
 * @TODO: Change turn if last guess or wrong result.
 */
const tryGuess = async(db, gameid, position, role) => {

  if (["RP", "BP"].indexOf(role) === -1) {
    throw "You cannot guess.";
  }

  const game = await retrieveGame(db, gameid, {turn: 1});

  if (game.turn !== role) {
    throw "It is not your turn.";
  }

  let gameCollection = db.collection("game");

  // Returns like:
  // [ { _id: ObjectId("6154896f55e87e002a651621"), element: 'R' } ]
  const colorRec = await gameCollection.aggregate([
    {$match: {
      _id: gameid
    }},
    {$project: {
      color: {
        $arrayElemAt: ["$grid.color", position]
      }
    }}
  ]).next();

  if (!colorRec) {
    throw "Color was not found.";
  }

  const colorResult = colorRec.color;

  let updateObj = {};
  updateObj["grid." + (position + "") + ".cover"] = colorResult;

  // Wrap update in set so that it updates the changes.
  updateObj = {"$set": updateObj};

  const updateRec = await gameCollection.updateOne(
    {_id: gameid},
    updateObj
  );

  let success = updateRec.modifiedCount && role === colorResult + "P";
  return success;
}

/**
 * upsertRole
 * Either adds or updates the role of the user.
 *
 * @param db -- the database connection
 * @param gameid -- the game id of the game (objectId)
 * @param roleid -- the role id (objectId).  If null, inserts instead.
 * @param role -- roles of (r)ed or (b)lue code(m)asters or (p)layers.
 *
 * @return the id of the role inserted or updated.
 *
 * @TODO: remove objectid and use index of array as key?
 */
const upsertRole = async(db, gameid, roleid, role) => {

  if (["RM", "RP", "BM", "BP"].indexOf(role) === -1) {
    throw "Red or blue, master or player.";
  }
  if (!gameid) {
    throw "Gameid needs to be defined.";
  }

  let findObj = {_id: gameid};
  let updateObj = {};
  if (!roleid) {
    // Add to array
    roleid = stringToObjectId();
    updateObj.key = roleid;
    updateObj.role = role;
    updateObj = {roles: updateObj};
    updateObj = {$push: updateObj};
  } else {
    // Update key in array
    findObj["roles.key"] = roleid;
    updateObj["roles.$.role"] = role;
    updateObj = {$set: updateObj};
  }

  const coll = db.collection("game");
  const updatedRec = await coll.updateOne(
    findObj,
    updateObj
  );

  return roleid;
};

/**
 * startGame
 * Check if there are the correct roles and set the start date.
 * @param db -- the database connection
 * @param gameid -- the game id of the game (objectid)
 * @return startDate -- when the game starts
 */
const startGame = async(db, gameid) => {
  const game = await retrieveGame(db, gameid, {
    startDate: 1,
    roles: 1
  });

  if (game.startDate) {
    throw "Game is already started.";
  }

  const messages = getRoleMessages(game.roles);
  if (messages.length) {
    throw messages;
  }

  const startDate = new Date();

  // Update game record
  const updatedGame = await db.collection("game").updateOne(
    {_id: gameid},
    {
      $set: {
        startDate: startDate
      }
    }
  );

  return startDate;
};

module.exports = {
  tryGuess,
  upsertRole,
  startGame
};

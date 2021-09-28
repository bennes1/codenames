const { stringToObjectId } = require("./connection");

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

  let success = updateRec.modifiedCount && team === colorResult;
  return success;
}

/**
 * upsertRole
 * Either adds or updates the role of the user.
 *
 * @param db -- the database connection
 * @param gameid -- the game id of the game (objectId)
 * @param roleid -- the role id (objectId).  If null, inserts instead.
 * @param team -- the team to add role ((R)ed or (B)lue)
 * @param role -- the type to add role (Code (M)aster or (P)layer)
 *
 * @return the id of the role inserted or updated.
 */
const upsertRole = async(db, gameid, roleid, team, role) => {

  if (["R", "B"].indexOf(team) === -1) {
    throw "Team needs to be red or blue.";
  }
  if (["M", "P"].indexOf(role) === -1) {
    throw "Role needs to be master or player.";
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
    updateObj.role = "" + team + role;
    updateObj = {roles: updateObj};
    updateObj = {$push: updateObj};
  } else {
    // Update key in array
    findObj["roles.key"] = roleid;
    updateObj["roles.$.role"] = "" + team + role;
    updateObj = {$set: updateObj};
  }

  const coll = db.collection("game");
  const updatedRec = await coll.updateOne(
    findObj,
    updateObj
  );

  return roleid;
};

module.exports = {
  tryGuess,
  upsertRole
};

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

  const collection = db.collection("role");
  let record = {
    team: team,
    role: role
  };

  let id = null;
  if (!roleid) {
    record.gameid = gameid;
    const inserted = await collection.insertOne(record);
    id = inserted.insertedId;
  } else {
    const updated = await collection.updateOne(
      {_id: roleid},
      {$set: record}
    );
    id = updated.upsertedId;
  }
  return id;
};

module.exports = {
  upsertRole
};

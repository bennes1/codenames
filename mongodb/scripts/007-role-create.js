use codenames;

//Set up the schema
db.createCollection("role", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        gameid: {
          bsonType: "objectId",
          description: "The gameid of the current game."
        },
        team: {
          enum: ["R", "B"],
          description: "The team that you are a part of."
        },
        role: {
          enum: ["M", "P"],
          description: "Codemaster or player."
        }
      }
    }
  }
});

db.role.createIndex({"gameid": 1});

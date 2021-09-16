use codenames;

//Set up the schema
db.createCollection("guess", {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			properties: {
				gameid: {
					bsonType: "objectId",
					description: "The gameid of the current game."
				},
				position: {
					bsonType: "int",
					description: "The index in the game grid."
				},
				team: {
					enum: ["R", "B"],
					description: "The team that guessed."
				},
				result: {
					enum: ["R", "B", "A", "W"],
					description: "The color of the asset."
				}
			}
		}
	}
});

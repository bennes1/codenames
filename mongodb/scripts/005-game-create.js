use codenames;

//Set up the schema
db.createCollection("game", {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			properties: {
				size: {
					enum: ["5x5", "5x4"],
					description: "5 x 5 is words or 5 x 4 is pictures."
					// Make this flexible in case there are more sizes to try.
				},
				type: {
					enum: ["W", "P", "B"],
					description: "Game could have pictures and/or words."
				},
				startDate: {
					bsonType: "date",
					description: "When the game is initialized and started."
				},
				completeDate: {
					bsonType: "date",
					description: "The time that the game is completed."
				},
				// Arrays should be the same length and correspond to the size
				// of the grid.  It goes left to right, top to bottom in the
				// grid.
				wpList: {
					bsonType: "array",
					description: "Array of ids from picture or word assets."
				},
				colorList: {
					bsonType: "array",
					description: "Array of: red, blue, assassin, and neutral."
				},
				starter: {
					enum: ["B", "R"],
					description: "This is which team starts the game."
				}
			}
		}
	}
});

db.game.createIndex({"startDate": 1, "completeDate": 1});

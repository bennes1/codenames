use codenames;

//Set up the schema
db.createCollection("game", {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			properties: {
				size: {
					enum: ["5x5", "5x4"],
					description: "Five x five is for word only and 5 x 4 is pictures."
					// Make this flexible in case there are more sizes to try.
				},
				type: {
					enum: ["W", "P", "B"],
					description: "The type of game could have pictures and/or words."
				},
				startDate: {
					bsonType: "date",
					description: "The time that the game is initialized and started."
				},
				completeDate: {
					bsonType: "date",
					description: "The time that the game is completed."
				},
				// Arrays should be the same length and correspond to the size of the grid.
				// It goes left to right, top to bottom in the grid.
				wpList: {
					bsonType: "array",
					description: "This is an array of ids from random picture or word assets."
				},
				colorList: {
					bsonType: "array",
					description: "This is an array of the four colors: black, white, red & blue."
				},
				starter: {
					enum: ["B", "R"],
					description: "This is which team starts the game."
				}
			}
		}
	}
});

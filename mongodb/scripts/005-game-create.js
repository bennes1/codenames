use codenames;

//Set up the schema
db.createCollection("game", {
	validator: {
		$jsonSchema: {
			bsonType: "object",
      additionalProperties: false,
			properties: {
        _id: {
          bsonType: "objectId",
          description: "Need to add this or additional properties fails."
        },
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
        grid: {
          bsonType: "array",
          description: "Single array of non-asset values.",
          additionalProperties: false,
          items: {
            bsonType: "object",
            required: ["type", "cover", "color"],
            properties: {
              type: {
                enum: ["P", "W"],
                description: "Picture or word."
              },
              cover: {
                enum: ["T", "A", "W", "R", "B"],
                description: "T if not guessed, otherwise color of asset."
              },
              color: {
                enum: ["A", "W", "R", "B"],
                description: "Array of: red, blue, assassin, and neutral."
              },
              asset: {
                bsonType: "null",
                description: "Always null.  Assets are initialized one time."
              }
            }
          }
        },
				// Arrays should be the same length and correspond to the size
				// of the grid.  It goes left to right, top to bottom in the
				// grid.
				assetGrid: {
					bsonType: "array",
					description: "Single array of asset contents: binary file or word.",
          additionalProperties: false,
          items: {
            bsonType: "string",
            description: "Data of a picture or a word."
          }
				},
        roles: {
          bsonType: "array",
          description: "Single array of users in game.",
          additionalProperties: false,
          items: {
            bsonType: "object",
            properties: {
              key: {
                bsonType: "objectId",
                description: "To identify player in game."
              },
              role: {
                enum: ["RM", "RP", "BM", "BP"],
                description: "Red or blue, codemaster or player."
              }
            }
          }
        },
        turn: {
          enum: ["RM", "RP", "BM", "BP"],
          description: "Whose turn it is."
        }
			}
		}
	}
});

db.game.createIndex({"startDate": 1, "completeDate": 1});


use codenames;

//Set up the schema
db.createCollection("asset", {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			required: ["type", "name", "value", "collection"],
			properties: {
				type: {
					enum: ["W", "P"],
					description: "This must be word or picture."
				},
				name: {
					bsonType: "string",
					description: "The word or the picture source filepath."
				},
				value: {
					bsonType: "string",
					description: "This contains the word or picture used."
				},
				collection: {
					bsonType: "string",
					description: "The collection that the asset was uploaded as."
				}
			}
		}
	}
});

db.asset.createIndex({"type" : 1, "name" : 1}, {unique : true});

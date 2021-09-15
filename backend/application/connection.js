/**
 * Simple function to get access to the mongo connection.
 * I chose not to use Mongoose as I have collection defs
 * in the database setup.  Using Mongoose would require
 * me to define them twice.
 */
async function mongoConnect() {
	const {MongoClient} = require('mongodb');
	const uri = "mongodb://user:pass@mong:27017/codenames";
	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	let connection = await client.connect();
	return connection;
}

/**
 * stringToObjectId
 * This is a helper function to return the object id.  I wrapped the error
 * message as my usage is to try it without knowing if it is a valid object id
 * or not.
 */
const stringToObjectId = (id) => {
	const {ObjectId} = require("mongodb");
	// Nasty error if objectId does not exist.  Don't need to look if doesn't
	// exist.
	let objectId = null;
	try {
		objectId = new ObjectId(id);
		return objectId;
	} catch (e) {
		return null;
	}
}

module.exports = {
	mongoConnect,
	stringToObjectId
};

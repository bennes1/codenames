const {MongoClient, ObjectId} = require('mongodb');

/**
 * Simple function to get access to the mongo connection.
 * I chose not to use Mongoose as I have collection defs
 * in the database setup.  Using Mongoose would require
 * me to define them twice.
 */
async function mongoConnect() {
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
 *
 * @param id -- string of the objectId or null.  If null, creates objectId with
 * the date part set to now and zeroes for the rest.
 * @return objectId | null -- return objectId if it is was successful
 */
const stringToObjectId = (id = null) => {
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

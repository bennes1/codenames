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

module.exports = mongoConnect;

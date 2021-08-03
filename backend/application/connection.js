const {MongoClient} = require('mongodb');
const uri = "mongodb://user:pass@mong:27017/codenames";
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

client.connect()
.catch(console.log("Mongo connection failed."))
.then(console.log("Mongo connected."));

module.exports = client.db("codenames");

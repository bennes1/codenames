// connection.js
const mongoose = require("mongoose");
const connection = "mongodb://mongodb:27017/codenames";

mongoose.connect(connection, {
	useNewUrlParser: true,
	useUnifiedTopology:true 
})
	.then("Mongo connected.")
	.catch(error => handleError(error));

// setup schema
const User = require("./User.model");

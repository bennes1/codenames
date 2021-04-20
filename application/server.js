// server.js
const express = require("express");
const app = express();
const connectDb = require("./connection");
const PORT = 8080;
const User = require("./User.model");

app.get("/", (req, res) => {
	res.send("Successful response");
});
app.get("/users", async (req, res) => {
	const users = await User.find({});

	res.json(users);
});
app.get("/user-create", (req, res) => {
	const user = new User ({username: "userTest" });
	user.save()
		.then(() => console.log("User created"))
		.catch(() => console.log("User failed creation"));
	res.send("User created \n");
})
app.listen(PORT, function() {
 console.log(`Listening on ${PORT}`);
});

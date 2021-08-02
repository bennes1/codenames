// server.js
const express = require("express");
const app = express();
const client = require("./connection");
const PORT = 8080;

app.get("/", (req, res) => {
	res.send("Successful response");
});

app.get("/test", async (req, res) => {
	const asset = await client
		.collection("asset")
		.find({name: /businessman/})
		.next();

	let image = "<img src=\"data:image/jpeg;base64," + asset.value + "\"/>";
	res
		.status(200)
		.send(image);
});

app.listen(PORT, function() {
 console.log(`Listening on ${PORT}`);
});

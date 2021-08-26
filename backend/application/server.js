// server.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const apiRouter = require("./ApiRouter");

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use("/api", apiRouter);

/**
 * "/" route.  Keep for testing if server is up.
 */
app.get("/", (req, res) => {
	res.send("Successful response");
});

app.listen(PORT, function() {
 console.log(`Listening on ${PORT}`);
});

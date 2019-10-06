const express = require("express");
const cors = require("cors");
const app = express();
const port = 4444;
const short = require("short-uuid");
const data = require("./data.json");
const updatedData = data.map(movie => {
	const id = short.generate();
	movie.id = id;
	return movie;
});
console.log(data);
app.use(cors());
app.get("/movies", (req, res) => res.send(updatedData));
app.listen(port, () => console.log("App listening at port ", port));

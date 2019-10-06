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
// console.log(data);
const pageSize = 10;
app.use(cors());
app.get("/movies", (req, res) => res.send(updatedData));
app.get("/fetchPaginatedData", (req, res) => {
  let pageNo = parseInt(req.query.page);
  console.log("page :: ", pageNo);
  let dataSet = updatedData.slice(
    pageNo * pageSize,
    pageNo * pageSize + pageSize
  );
  let hasMoreData = updatedData.length - pageNo * pageSize > 0 ? true : false;
  setTimeout(() => {
    res.send({
      content: dataSet,
      hasMoreData
    });
  }, 3000);
});
app.listen(port, () => console.log("App listening at port ", port));

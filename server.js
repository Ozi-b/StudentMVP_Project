const express = require("express");
const app = express();
const port = 4000;
const { Pool } = require("pg");

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

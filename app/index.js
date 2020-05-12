const express = require("express");

const app = express();

const PORT = process.env.PORT || 8080;

app.get("/hello", (req, res) => {
  res.send({ value: "hello" }).status(200);
});

app.get("/addtwo/:num", (req, res) => {
  res.send({ value: parseInt(req.params.num, 10) + 2 }).status(200);
});

app.get("/addthree/:num", (req, res) => {
  res.send({value: parseInt(req.param.num)}).status(200);
});

app.get("/error", (req, res) => {
  res.send("Error!").status(500);
});

app.listen(PORT, () => {
  console.log(`Server listening to port ${PORT}`); // eslint-disable-line no-console
});

module.exports = app;

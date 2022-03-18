const express = require("express");
const { getTopics } = require("./controllers/topics");
const {
  handleWrongPath,
  handle500,
  handlePSQLErrors,
  handleCustomErrors,
} = require("./errors");
const apiRouter = require("./routes/api");
const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handle500);

app.all("*", handleWrongPath);

module.exports = app;

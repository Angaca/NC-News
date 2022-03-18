const express = require("express");
const { getTopics } = require("./controllers/topics");
const { handleWrongPath } = require("./errors");
const apiRouter = require("./routes/api");
const app = express();

app.use("/api", apiRouter);

app.all("*", handleWrongPath);

module.exports = app;

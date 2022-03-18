const articlesRouter = require("./articles");
const topicsRouter = require("./topics");
const apiRouter = require("express").Router();

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);

module.exports = apiRouter;

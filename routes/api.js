const articlesRouter = require("./articles");
const topicsRouter = require("./topics");
const userRouter = require("./users");
const apiRouter = require("express").Router();

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/users", userRouter);

module.exports = apiRouter;

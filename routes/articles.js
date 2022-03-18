const { getArticleById } = require("../controllers/articles");
const articlesRouter = require("express").Router();

articlesRouter.get("/:article_id", getArticleById);

module.exports = articlesRouter;

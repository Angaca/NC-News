const {
  getArticleById,
  patchArticleById,
  getArticles,
} = require("../controllers/articles");
const articlesRouter = require("express").Router();

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById);

articlesRouter.get("/", getArticles);

module.exports = articlesRouter;

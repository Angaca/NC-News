const db = require("../db/connection");

exports.selectArticleById = async (articleId) => {
  const { rows } = await db.query(
    "SELECT * FROM articles WHERE article_id = $1;",
    [articleId]
  );
  if (!rows[0]) {
    return Promise.reject({ status: 404, msg: "Article not available" });
  }
  return rows[0];
};

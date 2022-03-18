const db = require("../db/connection");
const { promiseReject } = require("../errors");

exports.selectArticleById = async (articleId) => {
  const { rows } = await db.query(
    "SELECT * FROM articles WHERE article_id = $1;",
    [articleId]
  );
  if (!rows[0]) return promiseReject();
  return rows[0];
};

exports.updateArticleById = async (articleId, incVotes) => {
  const { rows } = await db.query(
    `UPDATE articles
    SET 
    votes = votes + $2
    WHERE article_id = $1
    RETURNING *;`,
    [articleId, incVotes]
  );
  if (!rows[0]) return promiseReject();
  return rows[0];
};

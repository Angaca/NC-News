const db = require("../db/connection");
const { promiseReject } = require("../errors");

exports.selectArticleById = async (articleId) => {
  const { rows } = await db.query(
    `SELECT articles.*, CAST(SUM(comments.article_id) AS INTEGER) AS comment_count FROM articles
    JOIN comments
    ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;`,
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

exports.selectArticles = async () => {
  const { rows } = await db.query(
    `SELECT * FROM articles 
    ORDER BY created_at DESC;`
  );
  return rows;
};

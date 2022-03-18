const { selectTopics } = require("../models/topics");

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((topics) => {
      res.send({ topics });
    })
    .catch(next);
};

const { selectUsers } = require("../models/users");

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((users) => res.send({ users }))
    .catch(next);
};
